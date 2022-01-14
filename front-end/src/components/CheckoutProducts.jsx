import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import formatPrice from '../helper/formatPrice';

const calculateTotalPrice = (products) => {
  const totalPrice = products.reduce((acc, product) => {
    const { price, quantity } = product;
    const subTotal = Number(price) * Number(quantity);
    return acc + subTotal;
  }, 0);

  return totalPrice;
};

function CheckoutProducts({ cart, removeItem, page, saleTotalPrice = 0 }) {
  const [totalPrice, setTotalPrice] = useState(0);

  let role = 'customer';

  if (/seller/.test(window.location.href)) {
    role = 'seller';
  }

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cart));
  }, [cart]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
            {page === 'checkout' ? <th>Remover Item</th> : null}
          </tr>
        </thead>
        <tbody>
          {
            cart.map((product, index) => {
              const { name, quantity, price, id } = product;
              return (
                <tr key={ index }>
                  <td
                    data-testid={
                      `${role}_${page}__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}
                  </td>
                  <td
                    data-testid={
                      `${role}_${page}__element-order-table-name-${index}`
                    }
                  >
                    {name}
                  </td>
                  <td
                    data-testid={
                      `${role}_${page}__element-order-table-quantity-${index}`
                    }
                  >
                    {quantity}
                  </td>
                  <td
                    data-testid={
                      `${role}_${page}__element-order-table-unit-price-${index}`
                    }
                  >
                    {formatPrice(Number(price))}
                  </td>
                  <td
                    data-testid={
                      `${role}_${page}__element-order-table-sub-total-${index}`
                    }
                  >
                    {formatPrice(Number(price) * Number(quantity))}
                  </td>
                  {page === 'checkout' ? (
                    <td
                      data-testid={
                        `${role}_${page}__element-order-table-remove-${index}`
                      }
                    >
                      <button
                        type="button"
                        onClick={ () => removeItem(id) }
                      >
                        Remover
                      </button>
                    </td>
                  ) : null}
                </tr>
              );
            })
          }
        </tbody>
      </table>
      {
        page === 'checkout'
          ? (
            <p
              data-testid={ `${role}_${page}__element-order-total-price` }
            >
              Total: R$
              {formatPrice(totalPrice)}
            </p>
          ) : (
            <p>
              Total: R$
              <span
                data-testid={ `${role}_${page}__element-order-total-price` }
              >
                {formatPrice(saleTotalPrice)}
              </span>
            </p>
          )
      }
    </>
  );
}

export default CheckoutProducts;

CheckoutProducts.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeItem: PropTypes.func,
  page: PropTypes.string.isRequired,
  saleTotalPrice: PropTypes.number,
};

CheckoutProducts.defaultProps = {
  removeItem: () => {},
  saleTotalPrice: 0,
};
