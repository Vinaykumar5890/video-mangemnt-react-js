import {useState, Component} from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import './index.css'

class Log extends Component {
  state = {
    email: '',
    password: '',
    loader: false,
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password} = this.state
    const userDetails = {email, password}
    const {history} = this.props
    this.setState({loader: true})
    try {
      const response = await axios.post(
        'https://video-mangement.onrender.com/login',
        userDetails,
      )
      Cookies.set('jwt_token', await response.data.jwtToken, {
        expires: 30,
        path: '/',
      })
      const m = localStorage.setItem('user', email)
      history.replace('/')
      this.setState({loader: false})
    } catch (error) {
      this.setState({
        loader: false,
        showSubmitError: true,
        errorMsg: error.response.data,
      })
    }
  }
  togglePasswordVisibility = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }
  renderPasswordField = () => {
    const {password, showPassword} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <div className="password-input-container">
          {showPassword ? (
            <input
              type="text"
              id="password"
              autoComplete="new-password"
              className="password-input-field"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Password"
              required
            />
          ) : (
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              className="password-input-field"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Password"
              required
            />
          )}
          <span
            className="password-toggle-icon "
            onClick={this.togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </>
    )
  }

  renderUsernameField = () => {
    const {email} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          EMAIL
        </label>
        <input
          autoComplete="new-password"
          type="email"
          id="username"
          className="username-input-field"
          value={email}
          onChange={this.onChangeUsername}
          placeholder="Email"
          required
        />
      </>
    )
  }

  render() {
    const {loader, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img
          src="https://i.ytimg.com/vi/9TFLg1HLwcM/maxresdefault.jpg"
          className="login-image"
          alt="website login"
        />
        <form
          className="form-container"
          onSubmit={this.submitForm}
          autoComplete="off"
        >
          <img
            src="https://www.johnsoncontrols.com/-/media/project/jci-global/johnson-controls/us-region/united-states-johnson-controls/security/video-surviellance/video-management-systems/product-images/victor-vms-american-dynamics.png?la=en&h=564&w=752&hash=93FFBD7AB04706AABBFBF30924B62E0F"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>

          <Link to="/changePassword">
            {' '}
            <p className="changePassword">change-password?</p>{' '}
          </Link>

          <button type="submit" className="login-button">
            {loader ? (
              <Loader type="ThreeDots" color="#ffffff" height="30" width="40" />
            ) : (
              <p>Login</p>
            )}
          </button>
          <div>
            <p className="registerMsg">
              Don't have account@
              <Link to="/register">
                <span>Register</span>
              </Link>
            </p>
          </div>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Log
