//
import { useSnackbar } from 'notistack';
import useAuth from './useAuth';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { setCache, clearCache } from '../redux/slices/api';
//
import urls from '../configs/urls';
// import { config } from '../configs';
import axios from '../utils/axios';
import { getPayload, hashCode } from '../utils/formatString';

// -----------------------------------------------

const useApi = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { caches } = useSelector((state) => state.api);




    const get = async ({
        url,
        key,
        data = {},
        token = false,
        cache = true,
        withCredentials = false,
        refetch = false,
    }) => {

        // if (user?.token) {
        //     headers.Authorization = user.token;
        // }

        const payload = getPayload(data);

        if (key) {
            url = urls[key];
        }

        const endpoint = `${url}${payload.length > 0 ? `?${payload}` : ''}`;
        let hash;

        // check in cahe
        if (cache) {
            hash = hashCode(endpoint);
            // check in cache
            if (caches[hash]) {
                if (refetch) {
                    // delete cache
                    dispatch(clearCache(hash))
                } else {
                    return caches[hash];
                }
            }
        }


        const options = {}
        if (withCredentials) {
            options.withCredentials = true;
        }



        if (token) {
            options.headers = {
                Authorization: user?.token || token
            };
        }


        return axios.get(endpoint, options).then(res => {
            if (cache) {
                dispatch(setCache({ key: hash, value: res }))
            }

            return res;
        });

    }







    const post = async ({
        url,
        key,
        data = {},
        token = false,
        method = 'POST',
        withCredentials = false,
        toast = true
    }) => {

        const headers = {};

        if (token && user?.token) {
            headers.Authorization = user.token;
        }

        const options = {
            method,
            url: key ? urls[key] : url,
            headers,
            data,
            withCredentials
        };



        try {
            const res = await axios(options)
            if (res.error) {
                throw new Error(res.error)
            }

            return res;
        }
        catch (error) {
            console.error("useApi/104", error);
            if (toast) {
                enqueueSnackbar(error?.message || 'Error EUA124', { variant: 'error' });
            }

            return error;
        }
    }






    return {
        get,
        post
    }
}



export default useApi;
