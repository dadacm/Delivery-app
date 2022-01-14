import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import OrderCard from '../components/OrderCard';
import { getApiWithToken } from '../helper/api';

function Orders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getApiWithToken('/seller/orders', setSales);
  }, []);

  return (
    <>
      <Header />
      <OrderCard sales={ sales } />
    </>
  );
}

export default Orders;
