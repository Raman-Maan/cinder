import React, { Component } from 'react';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { loginUser } from '../actions';
import { connect } from 'react-redux';
import './styles/Login.css';
import logo from '../assets/logo.svg';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.setInput = this.setInput.bind(this);
    this.userLogin = this.userLogin.bind(this);

    this.state = {
      email: '',
      password: ''
    };
  }

  setInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  userLogin(e) {
    e.preventDefault();
    this.props.loginUser({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    if (this.props.isAuthenticated) {
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      return <Redirect exact to={from} />;
    }

    return (
      <div className="Login">
        <Container>
          <div className="logo">
            <h1 className="display-3">cinder</h1>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <hr />
          {this.props.errored && (
            <Alert color="danger">{this.props.message}</Alert>
          )}
          <Form className="login-form" onSubmit={e => this.userLogin(e)}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                required
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.setInput}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                required
                id="password"
                type="password"
                name="password"
                onChange={this.setInput}
                placeholder="Password"
              />
            </FormGroup>

            <FormGroup>
              <Button id="submitBtn" outline block color="dark" type="submit">
                Log In
              </Button>

              <Button
                id="signUpBtn"
                outline
                block
                color="secondary"
                tag={Link}
                to="/signup"
              >
                Sign Up
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.auth.message,
  isAuthenticated: state.auth.isAuthenticated,
  errored: state.auth.errored
});

const mapDispatchToProps = dispatch => ({
  loginUser: creds => dispatch(loginUser(creds))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
