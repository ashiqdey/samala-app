import { useRef, useState } from 'react';
// import { useSnackbar } from 'notistack';
import { debounce } from "lodash";
// redux
import { useDispatch, useSelector } from '../redux/store';
import {
    getCartId,
    removeCartItem,
    addCartItem,
} from '../redux/slices/cart';
// utils
import useApi from './useApi';
// import { getPayload } from '../utils/formatString';
import { shareProduct as shareProductApi } from '../utils/webShare';
import useTransform from './useTransform';

// -----------------------------------------------


const useCart = ({
    id,
    title,
    categoryLabel,
    mrp,
    sprice,
    url
}) => {
    const { wishlistIds, cartIds, cartNextId, wishlistNextId } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const { transfromProducts } = useTransform();

    const liked = wishlistIds.includes(id)
    const inCart = cartIds.includes(id)
    // adding to cart
    const [isAdding, setAdding] = useState(false);


    const { post } = useApi();

    // const [searchedProducts, setSearchedProducts] = useState([]);

    // toggle wishlis tand cart
    const debouncedToggle = useRef(
        debounce(async (params) => {
            const { id, wishlist, add, exists } = params;
            // check if exists in wishlist
            // check if exists in cart

            if ((wishlist && add === exists) || (!wishlist && add === exists)) {
                return;
            }


            const data = { product_id: id, wishlist, products: false };

            // for wishlist, if wishlist already fetched
            // for cart, if cart already fetched
            // then request products

            if (add && ((wishlist && wishlistNextId !== null) || (!wishlist && cartNextId !== null))) {
                data.products = true;
            }


            const res = await post({ key: add ? 'cartAdd' : 'cartRemove', token: true, data })
            if (!res || res.error) {
                // revert back wishlist/cart toggle
                dispatch(getCartId({ ...params, add: !add }))
                return;
            }

            if (res.add) {
                setAdding(false);

                if (res?.products.length > 0) {
                    dispatch(addCartItem({
                        products: transfromProducts(res.products),
                        wishlist: res.wishlist
                    }));
                }
            }
            else {
                dispatch(removeCartItem({ id, wishlist }))
            }
        }, 1000)
    ).current;


    const toggleLike = () => {
        const params = { id, wishlist: true, add: !liked, exists: liked };
        dispatch(getCartId(params))
        debouncedToggle(params)
    }

    const toggleCart = () => {
        const params = { id, wishlist: false, add: !inCart, exists: inCart };
        dispatch(getCartId(params))
        setAdding(true); // adding to cart
        debouncedToggle(params)
    }

    const shareProduct = () => {
        shareProductApi({
            id,
            title,
            url,
            categoryLabel,
            mrp,
            sprice
        });
    }

    // useEffect(() => {
    //     console.log(111, wishlistIds);
    // }, [wishlistIds])


    return {
        liked,
        toggleLike,
        inCart,
        toggleCart,
        shareProduct,
        isAdding
    }
}



export default useCart;
