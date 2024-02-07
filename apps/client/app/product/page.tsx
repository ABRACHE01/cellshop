'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/shared/component/Navbar';
import Card from '@/product/component/Card';
import Link from 'next/link';
import { search } from '@/product/Api/searchApi';
import { Product } from '@/product/models/productModel';
import { GetAllProducts } from '@/product/Api/productApi';

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllProducts();
        console.log('API Response:', response.products);

        if (Array.isArray(response.products)) {
          setProducts(response.products);
          setFilteredProducts(response.products);
          console.log('Product data:', response);
        } else {
          console.error('Invalid data format. Expected an array.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event: any) => {
    event.preventDefault();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };


  return (
    <React.Fragment>
      <Navbar />
      <div className="flex flex-col justify-center items-center my-16">
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
          Create and search for products
        </h1>
        <div className="mt-8 flex gap-x-4 sm:justify-center">
          <div id="search-bar" className="w-120 bg-white rounded-md shadow-lg z-10">
            <form className="flex items-center justify-center p-2" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search here"
                className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-800 text-white rounded-md px-4 py-1 ml-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                Search
              </button>
            </form>
          </div>
          <Link
            className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg  
          focus:outline-none focus:shadow-outline"
            href="/product/create"
          >
            Create Product
          </Link>
        </div>
      </div>
      <Card products={filteredProducts} setProducts={setProducts} />
    </React.Fragment>
  );
};

export default Page;