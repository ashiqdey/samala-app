import { useState } from 'react';
// import { useSnackbar } from 'notistack';
// hooks
import useApi from './useApi';
import useTransform from './useTransform';
// redux
import { useDispatch } from '../redux/store';
import {
    deleteFeatured,
    getFeaturedSuccess
} from '../redux/slices/products';


// -----------------------------------------------


const useFeatured = ({ id }) => {
    // const { featured } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const { transfromProducts } = useTransform();

    const { post } = useApi();
    // already api call is going on
    const [actions, setActions] = useState([]);


    const addFeatured = async (_id) => {
        const temp = id || _id;
        setActions(prev => [...prev, temp]);

        try {
            const response = await post({ key: 'addFeatured', token: true, data: { id: temp } });
            dispatch(getFeaturedSuccess({
                products: transfromProducts(response.products),
            }));
        }
        finally {
            setActions(prev => prev.filter(e => e !== temp));
        }
    }

    const removeFeatured = async (_id) => {
        const temp = id || _id;
        try {
            setActions(prev => [...prev, temp]);
            dispatch(deleteFeatured(temp));

            await post({ key: 'removeFeatured', data: { id: temp }, token: true });
        }
        finally {
            setActions(prev => prev.filter(e => e !== temp));
        }
    }


    return {
        actions,
        addFeatured,
        removeFeatured,
    }
}



export default useFeatured;
