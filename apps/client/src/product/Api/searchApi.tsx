import axios from 'axios';

const BrandApi = axios.create({
  baseURL: 'http://localhost:5050/api/',
  timeout: 5000,
});

export const search = async (query : any ) => {
    try {
      const response = await BrandApi.get('product/search', {
        params: {
          q: query,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

