const isProduction = process.env.NODE_ENV === 'production';

const localApiUrl = 'https://ecommerce-api-pro.up.railway.app/api';
const productionApiUrl = 'https://ecommerce-api-pro.up.railway.app/api';

const localMediaUrl = 'https://ecommerce-api-pro.up.railway.app/media/';
const productionMediaUrl = 'https://ecommerce-api-pro.up.railway.app/media/';

export const getApiUrl = () => {
    return isProduction ? productionApiUrl : localApiUrl;
};

export const getMediaUrl = () => {
    return isProduction ? productionMediaUrl : localMediaUrl;
};