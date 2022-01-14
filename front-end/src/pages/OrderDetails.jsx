import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getApi } from '../helper/api';

import Header from '../components/Header';
import OrderDetailsHeader from '../components/OrderDetailsHeader';
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

function OrderDetails() {
  const { orderId } = useParams();

  const [order, setOrder] = useState({ loading: true, products: [] });
  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    if (shouldUpdate) {
      getApi(`/customer/orders/${orderId}`, setOrder);
      setShouldUpdate(false);
    }
  }, [orderId, shouldUpdate]);

  if (order.loading) {
    return (
      <p>Carregando...</p>
    );
  }

  return (
    <div>
      <Header />
      <h1>Detalhe do Pedido</h1>
      <OrderDetailsHeader
        order={ order }
        setShouldUpdate={ setShouldUpdate }
      />
      <CheckoutProducts
        cart={ adjustProductsObject(order) }
        page="order_details"
        saleTotalPrice={ Number(order.totalPrice) }
      />
    </div>
  );
}

export default OrderDetails;
