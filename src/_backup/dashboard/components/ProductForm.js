/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// import { Link as RouterLink } from 'react-router-dom';
// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui 
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';


// components
import Iconify from '../../../components/micro/Iconify';
import { FormProvider, RHFTextField, RHFSelect, RHFSwitch } from '../../../components/hook-form';
// import { RHFUploadSingleFile } from '../../../components/hook-form/RHFUpload';
// import DisplayFile from './DisplayFile';
// import RHFKitchen from '../../../components/hook-form/RHFKitchen';
import AddProductImage from './AddProductImage';
// hooks
import useCategory from '../../../hooks/useCategory';
import useProducts from '../../../hooks/useProducts';
//
// import urls from '../../../configs/urls';
import { PATHS } from '../../../routes/paths';
// redux
// import { useSelector } from '../../../redux/store';



// -----------------------------------------------



// -----------------------------------------------

// list of all categories
// const categories = [
//   'Option 1',
//   'Cooking fuel',
//   'Food',
//   'Option 4',
//   'Option 5',
// ];


// validation schema
const ProductSchema = Yup.object().shape({
  images: Yup.array().of(Yup.string()),
  title: Yup.string()
    .required('Product name required'),
  category: Yup.string()
    .required('Category required'),
  mrp: Yup.string()
    .min(0.1, "MRP is invalid")
    .max(100000, "< 1 Lakh")
    .required('MRP is required'),
  sprice: Yup.string()
    .min(0.1, "Selling price is invalid")
    .max(100000, "< 1 Lakh")
    .required('Selling price is required'),
  qty: Yup.string()
    .required('Quantity is required'),
  description: Yup.string()
    .required('Description required'),
  // keyword: Yup.array().of(Yup.string()),
  stock: Yup.boolean()
});


// default values
const defaultValues = {
  id: '',
  title: '',
  mrp: '',
  sprice: '',
  category: '1',
  qty: '1',
  stock: true,
  images: [],
  description: '',
  // keyword: [],
};

// -----------------------------------------------



// -----------------------------------------------

export default function AddProducts({ data }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { categories } = useCategory();
  const { addProducts, deleteProduct } = useProducts({});


  // const [keywords, setKeywords] = useState([]);
  const [images, setImages] = useState([]);


  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues: { ...defaultValues, ...data }
  });

  const {
    getValues,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;



  useEffect(() => {
    // setKeywords(getValues().keyword || []);
    setImages(getValues().images || []);
  }, []);


  const onImageChange = (images) => {
    setValue('images', images);
    setImages(images);
  }

  // const onKeywordChange = (keywords) => {
  //   setValue('keyword', keywords);
  //   setKeywords(keywords);
  // }


  const onDelete = async () => {
    await deleteProduct(data.id);
    navigate(-1);
  }


  const onSubmit = async (payload) => {
    try {
      // make API call
      await addProducts(payload, !!data.id);
      if (data.id) {
        enqueueSnackbar('Product updated', { variant: 'success' });
      }
      else {
        navigate(PATHS.dashboard.products);
      }
    } catch (error) {
      console.error(error);
    }
  };




  return (<>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {
        !data.id && <AddProductImage images={images} onChange={onImageChange} />
      }

      <Grid container spacing={2}>

        <IconText icon='mdi:archive-outline' text='Basic details' />

        <Grid item xs={12}>
          <RHFTextField name="title" label="Product name" />
        </Grid>
        <Grid item xs={12}>
          <RHFSelect name="category" label="Category">
            {Object.keys(categories).map((key) => (
              <MenuItem key={key} value={key}>
                {categories[key]}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>



        <IconText icon='mdi:numeric' text='Numerics' />

        <Grid item xs={6}>
          <RHFTextField
            name="mrp"
            type='number'
            label="MRP"
          />
        </Grid>
        <Grid item xs={6}>
          <RHFTextField
            name="sprice"
            type='number'
            label="Selling price"
          />
        </Grid>

        <Grid item xs={12}>
          <RHFTextField
            name="qty"
            label="Quantity"
          />
        </Grid>




        <IconText icon='mdi:file-document-outline' text='Details' />

        <Grid item xs={12}>
          <RHFTextField
            name="description"
            label="Description"
            multiline
            rows={4}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <RHFTags
            name='keyword'
            values={keywords}
            onChange={onKeywordChange}
            textfieldProps={{
              label: "Enter keyword...",
              fullWidth: true,
            }}
          />
        </Grid> */}

        <RHFSwitch
          value='1'
          name='stock'
          labelPlacement="start"
          label='Available in stock'
          sx={{ width: '100%', justifyContent: 'space-between' }}
          color='success'
        />


        <Grid item xs={12} className="mt-6">
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          // onSubmit={() => handleSubmit(onSubmit)}
          // disabled={!isDirty}
          >
            {data.id ? 'Update' : 'Add'} Product
          </LoadingButton>


          {
            data.id && <Stack direction='row' className='jc-sb ai-c mt-6 pt-5'>
              <span>Permanetly delete</span>
              <IconButton onClick={onDelete}>
                <Iconify icon='mdi:delete' />
              </IconButton>
            </Stack>
          }
        </Grid>


      </Grid>

    </FormProvider>
  </>)
}

AddProducts.propTypes = {
  data: PropTypes.object,
};



function IconText({ icon, text }) {
  return <Grid item xs={12} sx={{ mt: 3 }}>
    <Typography variant='h6' color='text.secondary'>
      <Iconify icon={icon} height={20} width={20} sx={{ mr: 1, mb: '-3px' }} inline />
      {text}
    </Typography>
  </Grid>
}
IconText.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string
};



