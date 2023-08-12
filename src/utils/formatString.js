/* eslint-disable no-bitwise */
import { PATHS } from '../routes/paths';
import { config } from '../configs';
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

export function toUrl(str) {
  return str.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s]/g, '-')
    .replace(/--+/g, '-');
}



export function productUrl(title, id, dashboard = false) {
  return `${dashboard ? PATHS.dashboard.products : PATHS.app.products}/${toUrl(title)}/${id}`
}


export function getPayload(data) {
  if (!data || typeof data !== 'object') return '';

  // generate payload
  const payload = Object.keys(data).map(key => {

    const val = data[key];

    if (val || val === 0) {

      // convert array to string
      if (Array.isArray(val)) {
        return `${key}=${val.join(',')}`
      }

      if (typeof val === 'number' || (typeof val === 'string' && val.length > 0)) {
        return `${key}=${val}`
      }
    }
    return null;
  });


  return payload.filter(e => e !== null).join("&");
}


export function hashCode(str) {
  if (str.length === 0) {
    return 0;
  }

  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}


export const transfromImage = (image, cdn) => {

  if (!image || image?.length < 10) return null;
  if (image.startsWith('http')) {
    return image;
  }

  // try cdn, else base


  let base = config.image_root;

  // eslint-disable-next-line eqeqeq
  if (cdn == '1') {
    base = appConfig.image_cdn;
  }


  return `${base}${image}`
}

export const reverseTransfromImage = (images) => {
  if (Array.isArray(images)) {
    return images.map(img => img.replace(config.BASEURL, ""));
  }
  return images.replace(config.BASEURL, "");
}


export const transformOrder = (order) => ({
  ...order,
  "mrpTotal": parseFloat(order.mrp_total, 10),
  "total": parseFloat(order.total, 10),
  "discount": parseFloat(order?.discount || 0, 10),
  "delivery": parseInt(order?.delivery || 0, 10),
})


