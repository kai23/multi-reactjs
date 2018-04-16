import React from 'react';
import PropTypes from 'prop-types';
import request from '../../utils/request';


class Profil extends React.Component {
  logout = async () => {
    try {
      await request('/user/logout');
      this.props.updateUser(null);
    } catch (err) {
      console.log('whaaaat', err);
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        Hello, je suis connecté avec l&apos;utilisateur {user.login} ! <br />
        <button type="button" className="btn btn-primary" onClick={this.logout}>Déconnexion</button>
      </div>
    );
  }
}


Profil.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default Profil;
