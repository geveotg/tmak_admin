import CONSTANTS from "../config";

const URLS = {
    login: `${CONSTANTS?.API_HOST}/admin/login`,
    staff: `${CONSTANTS?.API_HOST}/staff`,
    categories: `${CONSTANTS?.API_HOST}/staff`,
    publications: `${CONSTANTS?.API_HOST}/publications`,
    subcategory: `${CONSTANTS?.API_HOST}/subcategory`,
    news: `${CONSTANTS?.API_HOST}/news`,
    admin_devices: `${CONSTANTS?.API_HOST}/admin/devices`,
    product_images: `${CONSTANTS?.API_HOST}/product-images`,
    product_size: `${CONSTANTS?.API_HOST}/product-size/`,
    email: `${CONSTANTS?.API_HOST}/email`,

    ///////////////////////////
    admin_languages: `${CONSTANTS?.API_HOST}/admin/languages`,
    admin_translations: `${CONSTANTS?.API_HOST}/admin/translations`,
    admin_reseller: `${CONSTANTS?.API_HOST}/admin/reseller`,
    DISABLE: `${CONSTANTS?.API_HOST}/admin/disable`,
    activation_package: `${CONSTANTS?.API_HOST}/admin/activation_package`,
    referral_status: `${CONSTANTS?.API_HOST}/admin/referral_status`,
};

export default URLS;
