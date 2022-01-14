import React from 'react';
import PropTypes from 'prop-types';

import { putApiWithToken } from '../helper/api';

const handleDeliveredButton = async (id, setUpdate) => {
  try {
    await putApiWithToken(`/seller/orders/${id}`, {
      status: 'Entregue',
    });
    setUpdate(true);
  } catch (err) {
    setError(err.message);
  }
};

function OrderDetailsHeader({ order, setShouldUpdate }) {
  const { id, seller, saleDate, status } = order;

  return (
    <div>
      <p
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        {id}
      </p>
      <p
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {saleDate}
      </p>
      <p
        data-testid="customer_order_details__element-order-details-label-seller-name"
      >
        {seller.name}
      </p>
      <p
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        {status}
      </p>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        disabled={ status !== 'Em Trânsito' }
        onClick={ () => handleDeliveredButton(id, setShouldUpdate) }
      >
        MARCAR COMO ENTREGUE
      </button>
    </div>
  );
}

export default OrderDetailsHeader;

OrderDetailsHeader.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object),
  setShouldUpdate: PropTypes.func,
}.isRequired;
