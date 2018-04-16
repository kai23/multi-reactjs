import React, { Component } from 'react';
import request from '../../utils/request';

import Login from '../Login';
import Profil from '../Profil';

import './App.css';

class App extends Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    // Récupération de la session
    try {
      const user = await request('/user/session');
      this.updateUser(user);
    } catch (err) {
      if (err.statusCode === 401) {
        // je ne suis pas connecté
        this.updateUser(null);
      }
    }
  }

  updateUser = (user) => {
    this.setState({ user });
  }

  render() {
    const ComponentToShow =
      this.state.user ?
        <Profil user={this.state.user} updateUser={this.updateUser} /> :
        <Login updateUser={this.updateUser} />;

    return ComponentToShow;
  }
}

export default App;
