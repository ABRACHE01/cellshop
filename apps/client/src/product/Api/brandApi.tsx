import axios from 'axios';

const BrandApi = axios.create({
  baseURL: 'http://localhost:5050/api/',
  timeout: 5000,
});

export const getAllBrands = async () => {
  try {
    const response = await BrandApi.get('brand');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

