import axios from 'axios';

const productApi = axios.create({
  baseURL: 'http://localhost:5050/api/',
  timeout: 5000,
});

export const GetAllProducts = async () => {
  try {
    const response = await productApi.get('product');
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GetOneProducts = async (productId: any) => {
  try {
    const response = await productApi.get(`product/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const DeleteProduct = async (productId: any) => {
  try {
    const response = await productApi.delete(`product/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const AddProduct = async (productData: any) => {
  try {
    console.log(productData)
    const response = await productApi.post('product', productData);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editProduct = async (productId: any, productData: any) => {
  try {
    const response = await productApi.put(`product/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};
