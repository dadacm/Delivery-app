import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getApiWithToken } from '../helper/api';

import Header from '../components/Header';
import SellerOrderDetailsHeader from '../components/SellerOrderDetailsHeader';
import CheckoutProducts from '../components/CheckoutProducts';

const adjustProductsObject = ({ products }) => (
  products.map((product) => {
    const { SalesProducts, ...info } = product;
    return ({
      ...info,
      quantity: SalesProducts.quantity,
    });
  })
);

function SellerOrderDetails() {
  const { orderId } = useParams();

  const [order, setOrder] = useState({ loading: true, products: [] });
  const [products, setProducts] = useState([]);

  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    if (shouldUpdate) {
      getApiWithToken(`/customer/orders/${orderId}`, setOrder);
      setShouldUpdate(false);
    }
  }, [shouldUpdate, orderId]);

  useEffect(() => {
    setProducts(adjustProductsObject(order));
  }, [order]);

  if (order.loading) {
    return (
      <p>Carregando...</p>
    );
  }

  return (
    <div>
      <Header />
      <h1>Detalhe do Pedido</h1>
      <SellerOrderDetailsHeader
        order={ order }
        setShouldUpdate={ setShouldUpdate }
      />
      <CheckoutProducts
        cart={ products }
        page="order_details"
        saleTotalPrice={ Number(order.totalPrice) }
      />
    </div>
  );
}

export default SellerOrderDetails;
