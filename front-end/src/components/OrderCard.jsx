import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function OrderCard({ sales }) {
  const redirect = useNavigate();

  let page = 'seller';

  if (/customer/.test(window.location.href)) {
    page = 'customer';
  }

  return (
    <div>
      {
        sales.map((sale) => (
          <button
            type="button"
            key={ sale.id }
            onClick={ () => redirect(`/${page}/orders/${sale.id}`) }
          >
            <p>
              pedido:
              <span
                data-testid={ `${page}_orders__element-order-id-${sale.id}` }
              >
                {sale.id}
              </span>
            </p>
            <p
              data-testid={ `${page}_orders__element-delivery-status-${sale.id}` }
            >
              {sale.status}

            </p>
            <p
              data-testid={ `${page}_orders__element-order-date-${sale.id}` }
            >
              {sale.saleDate.replace(/T.*/i, '').split('-').reverse().join('/')}

            </p>
            <p
              data-testid={ `${page}_orders__element-card-price-${sale.id}` }
            >
              {Number(sale.totalPrice).toFixed(2).toString().replace('.', ',')}
            </p>
            {
              page === 'seller'
                ? (
                  <p
                    data-testid={ `seller_orders__element-card-address-${sale.id}` }
                  >
                    {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
                  </p>
                ) : null
            }
          </button>
        ))
      }
    </div>
  );
}

export default OrderCard;

OrderCard.propTypes = {
  sales: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
