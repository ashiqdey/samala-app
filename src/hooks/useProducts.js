/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
// import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from '../redux/store';
import {
    getProductsSuccess,
    getProduct,
    startLoading,
    getSuggestionsSuccess,
    getSearchedProducts,
    getProductsDetails,
    removeProduct,
    setSearchTitle,
    // setFilters,
} from '../redux/slices/products';
// hooks
import useApi from './useApi';
import useAuth from './useAuth';
import useCategory from './useCategory';
import useTransform from './useTransform';
// utils
import urls from '../configs/urls';
// import { config } from '../configs';
import {
    getPayload,
    // reverseTransfromImage,
    // transfromImage
} from '../utils/formatString';

// -----------------------------------------------


const useProducts = ({ fetchAllProducts }) => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { config } = useAuth();
    const { categories } = useCategory();
    const { transfromSingle, transfromProducts, transfromImage, reverseTransfromImage } = useTransform();

    const { products, searchPage, suggestions } = useSelector((state) => state.products);
    const [loading, setLoading] = useState(false);
    const [prevFilter, setPrevFilter] = useState(null);
    const [searchSuggestions, setSearchSuggestions] = useState([]);

    const { get, post } = useApi();

    // const [searchedProducts, setSearchedProducts] = useState([]);


    const fetchProducts = async () => {
        if (products.length > 0) {
            return;
        }
        try {
            dispatch(startLoading());

            const response = await get({ key: 'products' });
            dispatch(getProductsSuccess({
                products: transfromProducts(response.products),
                nextId: response.next_id
            }));
        } catch (error) {
            console.warn("h/up/61", error);
        }
    }


    const fetchSuggestions = async (nextId = 0) => {
        try {
            setLoading(true);
            const response = await get({ key: 'suggestion', data: { max: 2000, next_id: nextId } });
            dispatch(getSuggestionsSuccess(response.products));

            setLoading(false);

            if (response.next_id && response.next_id > 0) {
                fetchSuggestions(response.next_id);
            }
        } catch (error) {
            console.warn("h/up/56", error);
        }
    }


    const searchProducts = async (filter) => {
        try {
            // remove suggestions
            if (searchSuggestions.length > 0) {
                setSearchSuggestions([]);
            }

            let pageNumber = searchPage;
            const payload = getPayload({ ...filter });


            if (prevFilter === payload && searchPage === 0) {
                return;
            }


            setPrevFilter(payload);
            setLoading(true);

            pageNumber = (prevFilter !== payload) ? 1 : pageNumber + 1;

            const response = await get({ url: `${urls.search}?page=${pageNumber}&${payload}` });
            const { page, last_page: lastPage, products } = response;


            dispatch(getSearchedProducts({
                lastPage,
                page,
                products: transfromProducts(products)
            }));

            setLoading(false);
        } catch (error) {
            console.warn("h/up/56", error);
        }
    }



    const fetchDetails = async ({ id, full }) => {
        try {
            // add caching
            const response = await get({ url: `${urls.productsDetails}?id=${id}&full=${full}` });
            dispatch(getProductsDetails(transfromSingle(response)));
        } catch (error) {
            console.warn("h/up/82", error);
        }
    }






    const addProducts = async (data, update) => {
        try {
            const res = await post({ key: update ? 'productUpdate' : 'productAdd', token: true, data })

            const product = transfromSingle(res.data);

            if (product.id && product.title) {
                // add to suggestion
                dispatch(getSuggestionsSuccess([{ id: product.id, title: product.title }]));
            }

            if (!update) {
                dispatch(getProduct({ product }));
            }
            else {
                // update product details
                dispatch(getProductsDetails(product));

                // also update product in products
                delete product.description;
                delete product.similars;
                delete product.images;
                delete product.image;

                dispatch(getProduct({ product }));
            }
        } catch (error) {
            console.warn("h/up/82", error);
        }
    }


    const deleteProduct = async (id) => {
        try {
            await post({ key: 'productDelete', token: true, data: { id } })

            dispatch(removeProduct(id));
        } catch (error) {
            console.warn("h/up/82", error);
        }
    }




    const updateImages = async (data) => {
        try {
            data.images = reverseTransfromImage(data.images);

            const res = await post({ key: 'imageUpdate', token: true, data })

            if (res.type === 'add') {
                enqueueSnackbar('Image uploaded', { variant: 'success' });
            }
            else if (res.type === 'reorder') {
                enqueueSnackbar('Order updated', { variant: 'success' });
            }

            const { id, images } = res;
            const product = {
                id,
                image: images.length > 0 ? transfromImage(images[0].image || '', images[0].cdn) : null,
            }

            // also update product in products
            dispatch(getProduct({ product }));
        } catch (error) {
            console.warn("h/up/138", error);
        }
    }





    const onSearchChange = (e) => {
        const { value } = e.target;

        dispatch(setSearchTitle(value));

        if (loading) {
            return;
        }
        if (!suggestions || suggestions.length === 0) {
            return fetchSuggestions(0);
        }
        if (value.length === 0) {
            return setSearchSuggestions([]);
        }

        // 1. simple - search suggestions
        // const regex = new RegExp(value.split(" ").join("|"), "i")
        // const results = suggestions.filter(f => f.title.search(regex) > -1);

        // 2. full word search
        const searchQuery = value.split(" ");
        const regexs = searchQuery.map(e => new RegExp(`\\b${e}`, "i"));
        const results = [];
        const MAX = 5;

        for (let i = 0; i < suggestions.length; i++) {
            let score = 0;
            regexs.forEach(_regex => {
                if (suggestions[i].title.search(_regex) > -1) {
                    score += 1;
                }
            })

            if (score > 0) {
                results.push({ ...suggestions[i], score });
            }
        }

        setSearchSuggestions(results.sort((a, b) => b.score - a.score).slice(0, MAX));
    }



    useEffect(() => {
        // for admin
        // restrict here with access role
        if (fetchAllProducts) {
            fetchProducts()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories]);


    return {
        products,
        transfromProducts,

        searchSuggestions,
        fetchSuggestions,

        searchProducts,
        loading,
        fetchDetails,

        addProducts,

        updateImages,
        deleteProduct,

        onSearchChange,
    }
}



export default useProducts;
