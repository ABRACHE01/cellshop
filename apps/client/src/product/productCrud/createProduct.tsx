'use client';

import React, { useEffect, useState, ChangeEvent } from 'react';
import { Product } from '../models/productModel';
import { getAllBrands } from '../Api/brandApi';
import { Brand } from '../models/productModel';
import { AddProduct } from '../Api/productApi';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { UploadButton } from '@/utils/uploadthing';

const CreateProduct = () => {
  const [product, setProducts] = useState<Product[]>([]);
  const [brands , setBrands] = useState<Brand[]>([]);
  const [imageUrl , setImageUrl] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBrands();
        setBrands(response);
        console.log('API Response:', response);
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

    setProducts((prevProduct) => ({
      ...prevProduct,
      [name]: numericValue,
    }));
  };
  const handelBrandChange = (selectedBrands: any) => {
    setProducts((pervbrand) => ({
      ...pervbrand,
      categorieId: String(selectedBrands.target.value),
    }));
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(product);
      const productWithImage = {
        ...product,
        image: imageUrl,
      };
      const response = await AddProduct(productWithImage);
      router.push(`/product`)

    } catch (error) {
      console.error('Error creating product:', error);
      Swal.fire('Error', 'Failed to create the product.', 'error');
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
            <h1 className="font-bold uppercase text-4xl  ">
              Add a new Product
            </h1>
          </div>
          <div className='m-9'>
          <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImageUrl(res[0].url)
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              name="name"
              type="text"
              onChange={handelChange}
              placeholder="Product Name*"
            />
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              name="price"
              type="number"
              placeholder="Product Price*"
              onChange={handelChange}
            />
          </div>
          <div className="my-4">
            <textarea
              placeholder="Product Description*"
              name="description"
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
};

export default CreateProduct;
