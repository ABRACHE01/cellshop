'use client';
import React, { useEffect, useState } from 'react';
import { GetAllProducts, DeleteProduct } from '../Api/productApi';
import { Product } from '../models/productModel';
import Swal from 'sweetalert2';
import Link from 'next/link';
import Image from 'next/image';


const Card = ({ products, setProducts }: { products: Product[]; setProducts: React.Dispatch<React.SetStateAction<Product[]>> }) => {

  const handleDelete = async (productId: any) => {
    try {
      const deleteResponse = await DeleteProduct(productId);
      console.log(deleteResponse);

      if (deleteResponse) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId.id),
        );
        Swal.fire('Deleted!', 'Product has been deleted.', 'success');
        window.location.reload();
        console.log('Product deleted');
      } else {
        Swal.fire('Error', 'Failed to delete the Product.', 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mx-4 sm:mx-8 lg:mx-12 xl:mx-16 mt-10">
      { 
      products.map((product, index) => (
        <div
          key={index}
          className="max-w-sm rounded overflow-hidden shadow-lg transition-colors duration-200 hover:bg-gray-100"
        >
          <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80">
            <Image
              className="object-cover w-full h-full"
              src={product.image ? product.image : "" }
              alt="Image"
              width="500"
              height="500"
            />
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 truncate">
              {product.name}
            </div>
            <p className="text-gray-700 text-base h-6 truncate">
              {product.description}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
          
          </div>
          <div className="px-6 py-4">
            <p className="text-blue-800 text-lg font-semibold">
              Price: ${product.price}
            </p>
          </div>
          <div className="px-6 py-4 flex justify-between">
            <Link
              href="/product/update/[id]"
              as={`/product/update/${product.id}`}
              className="ml-2 text-green-600 hover:text-green-900 font-bold"
            >
              Edit
            </Link>

            <button
              className="ml-2 text-red-600 hover:text-red-900 font-bold"
              onClick={() => handleDelete(product.id) }
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
