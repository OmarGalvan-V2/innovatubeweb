import * as packageJson from '../../../package.json';

const BASE_URL  = 'http://localhost:8090';
export const environment = {
  production: false,
  ENDPOINT_PERSONAL: `${BASE_URL}/Usuarios`,
  RECAPTCHA_SITE_KEY: '6LfIIQ8sAAAAALnFMRoAtfbOaD2XUE9dKpj3VtOk',
  YOUTUBE_API: 'AIzaSyCHxlRUXgQXNjDoGEP0yDDjGyh9Tr_iLgU',
  ENDPOINT_YOUTUBE : 'https://www.googleapis.com/youtube/v3/'
};