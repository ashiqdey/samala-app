import { useState, useEffect } from 'react';
// import { useSnackbar } from 'notistack';
// hooks
import useApi from './useApi';
import useTransform from './useTransform';
// redux
import { useSelector, useDispatch } from '../redux/store';
import {
    saveSimilars,
    removeSimilar as removeSimilarRedux,
} from '../redux/slices/products';

// -----------------------------------------------


const useSimilar = ({ id, fetch }) => {
    const dispatch = useDispatch();
    const { transfromProducts } = useTransform();
    const { details, products } = useSelector((state) => state.products);

    const { get, post } = useApi();

    // -1: dont fetch, 1: fetching, 0: fetched
    const [loading, setLoading] = useState(-1);
    const [similars, setSimilars] = useState([]);

    // already api call is going on
    const [actions, setActions] = useState([]);


    const fetchSimilar = async () => {
        setLoading(1);

        try {
            // const res = await get({ url: `${urls.similar}?id=${id}` });
            const res = await get({ key: 'similar', data: { id } });

            const tempSimilars = transfromProducts(res.products);
            setSimilars(tempSimilars);

            // save in redux, update product details
            dispatch(saveSimilars({
                id,
                similars: tempSimilars
            }));
        } catch (err) {
            console.warn("u/us/4761", err);
            // dispatch(slice.actions.hasError(error));
        } finally {
            setLoading(0);
        }
    }


    const addSimilar = async (similar) => {
        // app call going on
        setActions(prev => [...prev, similar]);

        const res = await post({ key: 'addSimilar', token: true, data: { product_id: id, similar } });

        // save in redux cache
        const tempSimilars = transfromProducts(res.products);
        dispatch(saveSimilars({
            id,
            similars: tempSimilars,
        }));

        // update similars on page
        // setSimilars([...similars, ...tempSimilars]);

        setActions(prev => prev.filter(e => e !== similar));
    }

    const removeSimilar = async (similar) => {
        // app call going on
        setActions(prev => [...prev, similar]);

        await post({ key: 'removeSimilar', data: { product_id: id, similar }, token: true });

        // remove from cache in redux
        dispatch(removeSimilarRedux({ similar, id }));
        setActions(prev => prev.filter(e => e !== similar));
    }


    useEffect(() => {
        if (id && details[id] && details[id].similars) {
            const similarsIds = details[id].similars;

            // filter out the requried products
            const tempSimilars = products.filter(e => similarsIds.includes(e.id));

            setSimilars(tempSimilars);
            setLoading(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);


    useEffect(() => {
        // if (id && details[id] && details[id].similars) {
        //     const similarsIds = details[id].similars;

        //     // filter out the requried products
        //     const tempSimilars = products.filter(e => similarsIds.includes(e.id));

        //     console.log('u/us.83', tempSimilars);
        //     setSimilars(tempSimilars);
        //     setLoading(0);
        // }
        // else 
        if (fetch) {
            fetchSimilar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    return {
        loading,
        setLoading,
        similars,
        setSimilars,
        fetchSimilar,

        actions,
        addSimilar,
        removeSimilar,
    }
}



export default useSimilar;
