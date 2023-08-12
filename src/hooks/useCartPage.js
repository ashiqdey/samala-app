import { useState, useEffect, useRef } from 'react';
// import { useSnackbar } from 'notistack';
import { debounce } from "lodash";
// redux
import { useDispatch, useSelector } from '../redux/store';
import {
    addCartItems,
    changeCartQty,
    removeCartItem,
    clearCart,
    // getOrders,
    removeOrder,
} from '../redux/slices/cart';
// utils
import useApi from './useApi';
import useTransform from './useTransform';
// import { transformOrder } from '../utils/formatString';

// -----------------------------------------------


const useCartPage = (wishlist = false) => {
    const { carts, orders, wishlists, cartNextId, wishlistNextId } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const { transfromProducts } = useTransform();
    const { get, post } = useApi();
    const [loading, setLoading] = useState(false);

    // toggle wishlis tand cart
    const debouncedChangeQty = useRef(
        debounce(async (params) => {
            const { id, qty } = params;

            const data = { product_id: id, cart_qty: qty };

            const res = await post({ key: 'changeQty', token: true, data })

            if (!res || res.error) {
                // revert back wishlist/cart toggle
                dispatch(changeCartQty({ id, qty, revert: true }))
            }
        }, 1000)
    ).current;



    const fetchCart = async () => {
        try {
            setLoading(true);

            const data = {
                wishlist: wishlist ? '1' : null,
                next_id: wishlist ? wishlistNextId : null
            };
            const response = await get({ key: wishlist ? 'cart' : 'getCart', cache: wishlist, token: true, data });
            dispatch(addCartItems({
                products: transfromProducts(response.products),
                nextId: response.next_id,
                wishlist
            }));

            // if (response.orders) {
            //     dispatch(getOrders({ orders: response.orders.map(transformOrder) }));
            // }
        } catch (error) {
            console.warn("h/ucp/31", error);
        }
        finally {
            setLoading(false);
        }
    }

    const deleteOrder = async (orderId) => {
        try {
            dispatch(removeOrder({ id: orderId }));

            await post({ key: 'deleteOrder', token: true, data: { order_id: orderId } });
        } catch (error) {
            console.warn("h/ucp/31", error);
        }
    }



    const changeQty = (id, qty) => {
        const params = { id, qty };

        if (qty <= 0) {
            dispatch(removeCartItem({ id, wishlist: false }))
        }
        else {
            dispatch(changeCartQty(params))
        }

        debouncedChangeQty(params)
    }


    const onClearCart = () => {
        dispatch(clearCart())

        // referesh cart
        fetchCart(null);
    }






    useEffect(() => {
        // fetch first row
        if (
            (wishlist && wishlistNextId === null) ||
            (!wishlist && cartNextId === null)
        ) {
            fetchCart(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return {
        orders,
        carts,
        cartNextId,
        wishlists,
        wishlistNextId,
        loading,
        fetchCart,
        changeQty,
        onClearCart,
        deleteOrder
    }
}



export default useCartPage;
