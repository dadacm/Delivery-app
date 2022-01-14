import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { putApiWithToken } from '../helper/api';

const handlePreparingButton = async (id, setUpdate, setError) => {
  try {
    await putApiWithToken(`/seller/orders/${id}`, {
      status: 'Preparando',
    });
    setUpdate(true);
  } catch (err) {
    setError(err.message);
  }
};

const handleDeliveryButton = async (id, setUpdate, setError) => {
  try {
    await putApiWithToken(`/seller/orders/${id}`, {
      status: 'Em Trânsito',
    });
    setUpdate(true);
  } catch (err) {
    setError(err.message);
  }
};

function SellerOrderDetailsHeader({ order, setShouldUpdate }) {
  const { id, seller, saleDate, status } = order;

  const [error, setError] = useState('');

  return (
    <div>
      <p
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        {id}
      </p>
      <p
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        {saleDate}
      </p>
      <p
        data-testid="seller_order_details__element-order-details-label-seller-name"
      >
        {seller.name}
      </p>
      <p
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        {status}
      </p>
      <button
        type="button"
        data-testid="seller_order_details__button-preparing-check"
        disabled={ status !== 'Pendente' }
        onClick={
          () => handlePreparingButton(id, setShouldUpdate, setError)
        }
      >
        PREPARAR PEDIDO
      </button>
      <button
        type="button"
        data-testid="seller_order_details__button-dispatch-check"
        disabled={ status !== 'Preparando' }
        onClick={ () => handleDeliveryButton(id, setShouldUpdate, setError) }
      >
        SAIU PARA ENTREGA
      </button>
      {
        error === ''
          ? null
          : <p>{error}</p>
      }
    </div>
  );
}

export default SellerOrderDetailsHeader;

SellerOrderDetailsHeader.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object),
  setShouldUpdate: PropTypes.func,
}.isRequired;
