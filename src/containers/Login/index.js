import React, { Component } from 'react';
import PropTypes from 'prop-types';

import request from '../../utils/request';

export default class Login extends Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
  }

  state = {
    login: '',
    password: '',
    loginFailed: false,
  }


  onInputChange = (ev) => {
    this.setState({ [ev.target.id]: ev.target.value });
  }

  login = async (ev) => {
    ev.preventDefault();
    this.setState({ loginFailed: false });
    const { login, password } = this.state;
    try {
      await request('/user/authenticate', { body: { login, password }, method: 'POST' });
      const user = await request('/user/session');
      this.props.updateUser(user);
    } catch (err) {
      if (err.status === 400) {
        this.setState({ loginFailed: true });
      }
    }
  }


  render() {
    return (
      <form className="form-signin">
        <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Connexion</h1>
        {this.state.loginFailed && (
          <div className="alert alert-warning" role="alert">
            Nom d&apos;utilisateur ou mot de passe incorrect
          </div>
        )}
        <label htmlFor="login" className="sr-only">Identifiant</label>
        <input type="text" id="login" onChange={this.onInputChange} className="form-control" placeholder="Identifiant" required autoFocus />
        <label htmlFor="password" className="sr-only">Mot de passe</label>
        <input type="password" onChange={this.onInputChange} id="password" className="form-control" placeholder="Mot de passe" required />
        <div className="checkbox mb-3">
          <label htmlFor="checkbox">
            <input type="checkbox" value="remember-me" /> Se souvenir de moi
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" onClick={this.login}>Connexion</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
      </form>
    );
  }
}
