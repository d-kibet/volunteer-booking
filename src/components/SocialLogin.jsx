// src/components/SocialLogin.jsx
import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import './SocialLogin.css';

const SocialLogin = ({ onSocialLoginSuccess, onSocialLoginFailure }) => {
  const handleGoogleSuccess = (response) => {
    onSocialLoginSuccess('google', response.tokenId);
  };

  const handleGoogleFailure = (response) => {
    onSocialLoginFailure('google', response);
  };

  const handleFacebookResponse = (response) => {
    if (response.accessToken) {
      onSocialLoginSuccess('facebook', response.accessToken);
    } else {
      onSocialLoginFailure('facebook', response);
    }
  };

  return (
    <div className="social-login-container">
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <button className="social-btn google-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <FaGoogle className="social-btn-icon" />
            <span>Login with Google</span>
          </button>
        )}
      />

      <FacebookLogin
        appId="YOUR_FACEBOOK_APP_ID"
        autoLoad={false}
        fields="id,name,email"
        callback={handleFacebookResponse}
        render={(renderProps) => (
          <button className="social-btn facebook-btn" onClick={renderProps.onClick}>
            <FaFacebookF className="social-btn-icon" />
            <span>Login with Facebook</span>
          </button>
        )}
      />
    </div>
  );
};

export default SocialLogin;
