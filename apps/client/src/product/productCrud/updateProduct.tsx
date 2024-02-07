'use client';

import React, { useEffect, useState, ChangeEvent } from 'react';
import { Product } from '../models/productModel';
import { getAllBrands } from '../Api/brandApi';
import { Brand } from '../models/productModel';
import {  GetOneProducts, editProduct } from '../Api/productApi';
import Swal from 'sweetalert2';
import { useParams , useRouter } from 'next/navigation';

function UpdateProduct() {
  const [product, setProduct] = useState<Product>();
  const [brands, setBrands] = useState<Brand[]>([]);
  const rooter = useRouter();
  
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsResp = await getAllBrands();
        const productResp = await GetOneProducts(id);
        const prod  = productResp.product
        setProduct({...prod ,  price : parseFloat(prod.price) });
        setBrands(brandsResp.brands);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handelChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const numericValue = name === 'price' ? parseFloat(value) : value;

    setProduct((prevProduct : any ) => ({
      ...prevProduct,
      [name]: numericValue,
    }));
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(product);
      const response = await editProduct( id , product);
      console.log(response);
      rooter.push(`/product`)
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form
      className="flex justify-center items-center h-screen bg-white"
      onSubmit={handelSubmit}
    >
      <div className="container mx-auto my-4 px-4 lg:px-20">
        <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
          <div className="flex">
            <h1 className="font-bold uppercase text-5xl">
              Update <br /> Product
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              name="name"
              type="text"
              value={product?.name || ''}
              onChange={handelChange}
              placeholder="Product Name*"
            />
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              name="price"
              value={product?.price || ''}
              type="number"
              placeholder="Product Price*"
              onChange={handelChange}
            />
          </div>
          
          <div className="my-4">
            <textarea
              placeholder="Product Description*"
              name="description"
              value={product?.price || ''}
              className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              onChange={handelChange}
            ></textarea>
          </div>
          <div className="my-2 w-1/2 lg:w-1/4">
            <button
              className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                          focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default UpdateProduct;
