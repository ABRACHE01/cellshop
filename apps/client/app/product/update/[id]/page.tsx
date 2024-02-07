'use client';
import UpdateProduct from '@/product/productCrud/updateProduct'; 
import Navbar from '@/shared/component/Navbar'; 

import React from 'react';
const page = () => {
  return (
    <React.Fragment>
      <Navbar />
      <UpdateProduct />
    </React.Fragment>
  );
};

export default page;
