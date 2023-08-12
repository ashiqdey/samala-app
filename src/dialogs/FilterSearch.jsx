import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { setFilters } from '../redux/slices/products';
// hooks
import useCategory from '../hooks/useCategory';

// -----------------------------------------------

const filterField = ["Category", "In Stock", "Price", "Sort"];

const DEFAULT_FILTERS = {
  categories: [],
  stock: 'all',
  price_min: '0',
  price_max: '0',
  sort: 'none',
}
// -----------------------------------------------


const SortSearch = ({ open, onClose, defaultActive }) => {
  const { filters } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [active, setActive] = useState(0);
  const [localFilters, setLocalFilter] = useState({ ...DEFAULT_FILTERS });

  const onApply = () => {
    const temp = { ...localFilters };
    if (temp.categories === null || temp?.categories?.length === 0) {
      delete temp.categories;
    }
    if (temp.stock === 'all') {
      delete temp.stock;
    }
    if (temp.sort === 'none') {
      delete temp.sort;
    }

    temp.price_min = parseInt(temp.price_min, 10);
    temp.price_max = parseInt(temp.price_max, 10);

    if (temp.price_min > temp.price_max) {
      // swap
      const max = temp.price_min;
      temp.price_min = temp.price_max;
      temp.price_max = max;
    }
    if (temp.price_min === 0) {
      delete temp.price_min;
    }
    if (temp.price_max === 0 || (temp.price_max === temp.price_min)) {
      delete temp.price_max;
    }

    dispatch(setFilters(temp));
    onClose();
  }

  const onClear = () => {
    dispatch(setFilters({}));
    onClose();
  }



  const onChange = (key, val) => {
    setLocalFilter({ ...localFilters, [key]: val });
  }



  useEffect(() => {
    setLocalFilter(prev => ({ ...prev, ...filters }));
    setActive(defaultActive);
  }, [filters, defaultActive]);

  useEffect(() => {
    if (!open) {
      // clear local filters
      setLocalFilter({ ...DEFAULT_FILTERS });
    }
  }, [open]);



  return (
    <Drawer
      anchor='bottom'
      open={open}
      onClose={onClose}
      // onOpen={() => null}
      PaperProps={{ elevation: 0, sx: { borderRadius: '16px 16px 0 0' } }}
    >
      <Stack direction='row'>
        <Stack sx={{ width: 100, pt: 3, pl: 2 }} spacing={2}>
          {
            filterField.map((e, i) => <Button
              key={e}
              variant={active === i ? "contained" : "text"}
              color={active === i ? 'primary' : 'inherit'}
              onClick={() => setActive(i)}
              className='w-100 jc-fs'
              sx={{ pl: 1.5, }}
            >
              {e}
            </Button>)
          }
        </Stack>
        <Box sx={{ maxHeight: 250, minHeight: 220, overflow: 'auto', pt: 3, pl: 1 }}>
          {active === 0 && <Categories onChange={onChange} filter={localFilters.categories || []} />}
          {active === 1 && <Stock onChange={onChange} filter={localFilters.stock} />}
          {active === 2 && <Price onChange={onChange} filter={localFilters} />}
          {active === 3 && <Sort onChange={onChange} filter={localFilters.sort} />}
        </Box>
      </Stack>

      <Stack direction='row' className='p-1'>
        <Button className='w-33' color='inherit' onClick={onClose}>Cancel</Button>
        <Button className='w-33 mr-1' color='error' variant='soft' onClick={onClear}>Clear</Button>
        <Button className='w-33' color='primary' variant='contained' onClick={onApply}>Apply</Button>
      </Stack>
    </Drawer>
  );
}

SortSearch.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  defaultActive: PropTypes.number,
  // filters: PropTypes.object,
  // setFilters: PropTypes.func,
};

export default SortSearch;





function Categories({ filter, onChange }) {
  const { categories } = useCategory();


  const handleClick = (id) => {
    let temp = filter || [];

    if (temp.includes(id)) {
      temp = temp.filter(e => e !== id);
    }
    else {
      temp = [...temp, id].slice(-4);
    }

    onChange('categories', temp);
  }

  return (<Stack direction="row" spacing={1} className='fw-w'>
    {Object.keys(categories).map(id => <Chip
      key={id}
      label={categories[id]}
      onClick={() => handleClick(id)}
      color={filter.includes(id) ? "primary" : "default"}
      sx={{ m: ' 0 6px 6px 0 !important' }}
    />)}
    {/* for (key in object) { */}
  </Stack>)
}

Categories.propTypes = {
  filter: PropTypes.array,
  onChange: PropTypes.func,
};





function Stock({ filter, onChange }) {
  const handleChange = (e) => {
    onChange('stock', e.target.value)
  }
  return (<Stack direction="row" spacing={1} className='pl-2'>
    <RadioGroup
      name="stock-radio"
      value={filter}
      onChange={handleChange}
    >
      <FormControlLabel value="in-stock" control={<Radio />} label="In stock only" />
      <FormControlLabel value="out-of-stock" control={<Radio />} label="Out of stock only" />
      <FormControlLabel value="all" control={<Radio />} label="All" />
    </RadioGroup>
  </Stack>)
}

Stock.propTypes = {
  filter: PropTypes.array,
  onChange: PropTypes.func,
};



function Price({ filter, onChange }) {

  const handleChange = (key, e) => {
    const v = parseInt(e.target.value, 10);
    onChange(key, Number.isNaN(v) || v < 0 ? 0 : v);
  }

  return (<Stack spacing={3} className='pl-2 py-3'>
    <TextField
      id="price_min"
      label="Minimum price"
      value={filter.price_min}
      onChange={(e) => handleChange('price_min', e)}
      inputProps={{ maxLength: 6 }}
    />
    <TextField
      id="price_max"
      label="Maximum price"
      value={filter.price_max}
      onChange={(e) => handleChange('price_max', e)}
      inputProps={{ maxLength: 6 }}
    />
  </Stack>)
}
Price.propTypes = {
  filter: PropTypes.array,
  onChange: PropTypes.func,
};



function Sort({ filter, onChange }) {
  const handleChange = (e) => {
    onChange('sort', e.target.value)
  }
  return (<Stack direction="row" spacing={1} className='pl-2'>
    <RadioGroup
      name="sort-radio"
      value={filter}
      onChange={handleChange}
    >
      <FormControlLabel value="price-low" control={<Radio />} label="Price (low to high)" />
      <FormControlLabel value="price-high" control={<Radio />} label="Price (high to low)" />
      <FormControlLabel value="none" control={<Radio />} label="None" />
    </RadioGroup>
  </Stack>)
}
Sort.propTypes = {
  filter: PropTypes.array,
  onChange: PropTypes.func,
};