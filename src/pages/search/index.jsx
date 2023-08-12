/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import { useCallback, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Badge from '@mui/material/Badge';

// components
import NoData from '../../components/micro/NoData';
import Page from '../../components/micro/Page';
import GridSwitch from '../../components/micro/GridSwitch';
import Iconify from '../../components/micro/Iconify';
import FilterSearch from '../../dialogs/FilterSearch';
import ProductCard from '../../widgets/ProductCard';
import ProductCardAdmin from '../../widgets/ProductCardAdmin';
import ProductSuggetion from '../../widgets/ProductSuggetion';
import ProductSuggetionAdmin from '../../widgets/ProductSuggetionAdmin';
// hooks
import useSettings from '../../hooks/useSettings';
import useProducts from '../../hooks/useProducts';
//
import { PATHS } from '../../routes/paths';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { setFilters, setSearchTitle } from '../../redux/slices/products';

// -----------------------------------------------

export default function SearchPage({ admin }) {
  const { pathname, state } = useLocation();

  const { grid } = useSettings();
  const dispatch = useDispatch();

  const {
    // suggestions,
    searchedProducts,
    filters,
    searchTitle,
    lastPage,
  } = useSelector((state) => state.products);

  const { searchSuggestions, searchProducts, loading, onSearchChange } = useProducts({ fetchAllProducts: false });

  const onEnter = (e) => {
    if (e === 'search' || e.key === 'Enter') {
      // make api call to search
      searchProducts({ ...filters, title: searchTitle });
    }
  };

  const search = () => {
    searchProducts({ ...filters, title: searchTitle });
  };

  const onRemoveFilters = () => {
    dispatch(setFilters({}));
    searchProducts({ title: searchTitle });
  };

  useEffect(() => {
    // url changed
    const params = new URL(window.location.href).searchParams;

    if (params.get('categories') && params.get('categories').length > 0) {
      const newFilter = { categories: params.get('categories')?.split(',') || null };

      // update filter
      dispatch(setFilters(newFilter));
    }

    if (params?.get('q')?.length > 0) {
      dispatch(setSearchTitle(params.get('q')));
    } else {
      dispatch(setSearchTitle(''));
    }
  }, [pathname]);

  useEffect(() => {
    // filter changes, so fetch result
    if (Object.keys(filters).length > 0) {
      search();
    }
  }, [filters]);

  return (
    <Page title="Search" color="paper">
      <SearchBox admin={admin} onEnter={onEnter} onChange={onSearchChange} focus={state?.focus || false} />

      <Container maxWidth="xl" sx={{ pt: 2 }}>
        <Grid container spacing={2}>
          {searchedProducts.map((e) => (
            <Grid key={e.id} item xs={grid ? 6 : 12}>
              {!admin ? <ProductCard {...e} grid={grid} /> : <ProductCardAdmin action="admin" {...e} grid={grid} />}
            </Grid>
          ))}
        </Grid>

        {!loading ? (
          <>
            {searchedProducts.length === 0 && (
              <NoData
                width={180}
                sx={{ pt: '100px!important' }}
                text="Products not found"
                description={
                  Object.keys(filters).length > 0 ? 'Try removing filters' : 'Try searching with different keyword'
                }
              >
                {Object.keys(filters).length > 0 && (
                  <Button color="error" onClick={onRemoveFilters}>
                    Remove filters
                  </Button>
                )}
              </NoData>
            )}

            {!lastPage && searchedProducts.length > 0 && (
              <Stack direction="row" className="w-100 py-4 jc-c">
                <Button onClick={search} variant="soft">
                  Load more
                </Button>
              </Stack>
            )}
          </>
        ) : (
          <Stack direction="row" className="w-100 py-6 mt-6 jc-c">
            <CircularProgress />
          </Stack>
        )}
      </Container>

      {admin ? (
        <ProductSuggetionAdmin suggestions={searchSuggestions} />
      ) : (
        <ProductSuggetion suggestions={searchSuggestions} />
      )}
    </Page>
  );
}
SearchPage.propTypes = {
  admin: PropTypes.bool,
};

function SearchBox({ onEnter, onChange, focus, admin }) {
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(null);
  const { filters, searchTitle } = useSelector((state) => state.products);

  const filterCount = useCallback(() => {
    const t = { ...filters };
    delete t.sort;

    return Object.keys(t).length;
  }, [filters]);

  useEffect(() => {
    // clear applied filter on clicking search input
    if (focus) {
      dispatch(setFilters({}));
    }
  }, [focus]);

  return (
    <Stack className="p-s t-0 zi-10" sx={{ backdropFilter: 'blur(8px)' }}>
      <Stack direction="row" sx={{ bgcolor: 'background.paper' }} className="p-05 ai-c w-100 jc-sb" spacing={1}>
        <IconButton size="large" component={Link} to={admin ? PATHS.dashboard.app : PATHS.app.root}>
          <Iconify icon="mdi:arrow-left" width={24} height={24} color="grey.700" />
        </IconButton>

        <Box
          component="input"
          className="p-2 input"
          placeholder="Search medicine..."
          value={searchTitle}
          onChange={onChange}
          onKeyDown={onEnter}
          autoFocus={focus}
          autoComplete="off"
          sx={{
            width: 'calc(100% - 70px)',
            height: '50px',
            pl: '0!important',
          }}
        />

        <IconButton size="large" onClick={() => onEnter('search')}>
          <Iconify icon="mdi:magnify" width={20} height={20} color="grey.500" />
        </IconButton>
      </Stack>

      <Stack
        direction="row"
        sx={{
          color: 'var(--grey-900)',
          bgcolor: 'background.paper',
          backdropFilter: 'blur(3px)',
          borderTop: `1px solid var(--grey-200)`,
          pr: 2,
          opacity: 0.9,
        }}
        className="ai w-100 jc-sb"
      >
        <ButtonBase
          color="inherit"
          className="w-50 p-15 d-flex ai-c jc-c"
          sx={{ borderRight: `1px solid var(--grey-200)` }}
          onClick={() => setDrawer('sort')}
        >
          <Iconify icon="mdi:sort" width={20} height={20} sx={{ mr: 1.5 }} />
          <Box className="pr-2">Sort</Box>
          <Badge badgeContent={filters.sort ? 1 : 0} color="secondary" />
        </ButtonBase>

        <ButtonBase className="w-50 p-15 d-flex ai-c jc-c" onClick={() => setDrawer('filter')}>
          <Iconify icon="mdi:filter-outline" width={20} height={20} sx={{ mr: 1.5 }} />
          <Box className="pr-2">Filter</Box>
          <Badge badgeContent={filterCount() || 0} color="secondary" />
        </ButtonBase>

        <GridSwitch />
      </Stack>

      <FilterSearch open={!!drawer} onClose={() => setDrawer(null)} defaultActive={drawer === 'sort' ? 3 : 0} />
    </Stack>
  );
}
SearchBox.propTypes = {
  onEnter: PropTypes.func,
  onChange: PropTypes.func,
  focus: PropTypes.bool,
};
