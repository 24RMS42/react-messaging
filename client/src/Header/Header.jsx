import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class Header extends React.Component {
  onLogout() {
    this.props.dispatch(userActions.logout());
  }
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">React Chat</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={2} onClick={() => this.onLogout()}>
              Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const connectedHeader = connect()(Header);
export { connectedHeader as Header };
