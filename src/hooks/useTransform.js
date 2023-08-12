import useCategory from './useCategory';
// import { transfromImage } from '../utils/formatString';
import useAuth from './useAuth';

// -----------------------------------------------


const useTransform = () => {
    const { categories } = useCategory();
    const { config } = useAuth();

    const transfromProducts = (products) => (
        products.map(transfromSingle)
    )

    const transfromSingle = (e) => {
        const product = { ...e }

        product.categoryLabel = categories[product.category] || '-';
        product.mrp = parseFloat(product?.mrp || 0, 10);
        product.sprice = parseFloat(product?.sprice || 0, 10);
        product.stock = !!parseInt(product?.stock || 0, 10);

        // cart qty
        if (product.cart_qty) {
            product.cartQty = parseInt(product.cart_qty, 10);
            delete product.cart_qty;
        }

        // description
        if (product.description) {
            product.description = product.description.replace(/\\n/g, '\n');
        }

        // images
        if (product.images) {
            product.images = product.images.map(({ image, cdn }) => transfromImage(image, cdn))
        }
        if (product.image) {
            product.image = transfromImage(product?.image, product?.cdn)
        }

        return product;
    }







    const transfromImage = (image, cdn = '0') => {
        if (!image || image?.length < 10) return null;
        if (image.startsWith('http')) {
            return image;
        }

        // try cdn, else base
        let base = config.image_root;

        // eslint-disable-next-line eqeqeq
        if (cdn == '1') {
            base = config.image_cdn;
        }

        return `${base}${image}`;
    }

    const reverseTransfromImage = (images) => {
        // remove both config.image_root, config.image_cdn, /images/product

        if (Array.isArray(images)) {
            return images.map(removePrefix);
        }
        return removePrefix(images);

        function removePrefix(img) {
            let temp = img.replace(config.image_root, "");
            temp = temp.replace(config.image_cdn, "");
            temp = temp.replace("/images/product", "")
            return temp;
        }
    }



    return {
        transfromProducts,
        transfromSingle,

        transfromImage,
        reverseTransfromImage
    }
}



export default useTransform;
