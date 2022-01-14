import React from 'react';
import { Navigate } from 'react-router-dom';

import Header from '../components/Header';
import ProductsBoard from '../components/ProductsBoard';

function Products() {
  if (!localStorage.getItem('user')) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <ProductsBoard />
    </>
  );
}

export default Products;
