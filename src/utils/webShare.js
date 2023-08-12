
import { toUrl } from "./formatString";
import { config } from "../configs";


export const webShare = ({ title = '', text = '', url }) => {
  if (!navigator.share) {
    return;
  }

  // get url
  const shareUrl = url || window.location.href;

  navigator
    .share({ title, text, url: shareUrl })
    .then(() => {
      console.log('Successfully shared');
    })
    .catch(err => {
      console.warn('ERR sharing', err);
    });
};


export const shareProduct = ({ title, id, mrp, sprice }) => {
  webShare({
    title,
    url: `${config.DOMAIN}/products/${toUrl(title)}/${id}`,
    text: `${title}\nPrice: ₹${sprice} ~${mrp}~,\n\n`,
  });
}
