const isProduction = process.env.NODE_ENV === 'production';

const localApiUrl = 'http://127.0.0.1:8000/api';
const productionApiUrl = 'https://ecommerce-api-pro.up.railway.app/api';

const localMediaUrl = 'http://127.0.0.1:8000/media/';
const productionMediaUrl = 'https://ecommerce-api-pro.up.railway.app/media/';

export const getApiUrl = () => {
    return isProduction ? productionApiUrl : localApiUrl;
};

export const getMediaUrl = () => {
    return isProduction ? productionMediaUrl : localMediaUrl;
};