// import { useEffect } from 'react';
// redux
import {
    // useDispatch,
    useSelector
} from '../redux/store';
// import { getCategorySuccess, startLoading } from '../redux/slices/keyvalue';
// utils
// import axios from '../utils/axios';
// import urls from '../configs/urls';

// -----------------------------------------------

const useCategory = () => {
    // const dispatch = useDispatch();
    const {
        categories,
        // categoryFetched
    } = useSelector((state) => state.keyvalue);

    // const fetchCategory = async () => {
    //     if (categoryFetched) {
    //         return;
    //     }

    //     // fetch category
    //     dispatch(startLoading());
    //     try {
    //         const response = await axios.get(urls.category)
    //         dispatch(getCategorySuccess(response.categories));

    //         // return categoriesTemp;
    //     } catch (error) {
    //         console.warn("h/uc/29", error);
    //         // dispatch(hasError(error));
    //     }
    // }


    // useEffect(() => {
    //     fetchCategory();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);


    return { categories }
}



export default useCategory;
