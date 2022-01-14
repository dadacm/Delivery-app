import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const redirect = useNavigate();

  const localStorageUser = localStorage.getItem('user');
  const { name, role } = JSON.parse(localStorageUser);

  const userCheckout = () => {
    localStorage.removeItem('user');
    redirect('/');
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark">
        <Container
          style={ {
            width: '90%',
            margin: '0 auto',
          } }
        >
          <Navbar.Brand
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { name }
          </Navbar.Brand>
          <Nav
            className="me-auto"
            style={ {
              width: '100%',
              display: 'flex',
              justifyContent: 'space-evenly',
            } }
          >
            <Nav.Link
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ () => redirect('/customer/orders') }
            >
              {
                role === 'customer'
                  ? 'MEUS PEDIDOS'
                  : 'PEDIDOS'
              }
            </Nav.Link>
            {
              role === 'customer'
                ? (
                  <Nav.Link
                    data-testid="customer_products__element-navbar-link-products"
                    onClick={ () => redirect('/customer/products') }
                  >
                    PRODUTOS

                  </Nav.Link>
                )
                : null
            }
            <Nav.Link
              href="#pricing"
              data-testid="customer_products__element-navbar-link-logout"
              onClick={ () => userCheckout() }
            >
              SAIR

            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
