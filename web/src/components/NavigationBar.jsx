import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';

import './styles/NavigationBar.css';

class NavigationBar extends Component {
  render() {
    return (
      <div className="NavigationBar">
        <Navbar color="faded">
          <NavbarBrand href="/">cinder</NavbarBrand>
          <Nav className="navItem" navbar>
            <NavItem>
              <img
                src={this.props.userIcon}
                alt="User's Portrait"
                className="UserImage"
              />
            </NavItem>
            <NavItem>
              <h5 className="UserName">{this.props.userName}</h5>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
