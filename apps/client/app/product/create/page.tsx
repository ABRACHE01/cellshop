import React from 'react';
import Navbar from '@/shared/component/Navbar';
import CreateProduct from '@/product/productCrud/createProduct'; 

const page = () => {
  return (
    <React.Fragment>
      <Navbar />
      <CreateProduct />
    </React.Fragment>
  );
};

export default page;
