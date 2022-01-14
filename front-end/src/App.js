import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import SellerOrders from './pages/SellerOrders';
import OrderDetails from './pages/OrderDetails';
import SellerOrderDetails from './pages/SellerOrderDetails';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Navigate to="/login" /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/customer/products" element={ <Products /> } />
          <Route path="/customer/checkout" element={ <Checkout /> } />
          <Route path="/customer/orders" element={ <Orders /> } />
          <Route path="/seller/orders" element={ <SellerOrders /> } />
          <Route path="/customer/orders/:orderId" element={ <OrderDetails /> } />
          <Route path="/seller/orders/:orderId" element={ <SellerOrderDetails /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
