import {useState} from 'react'
import axios from 'axios'
import {useHistory, Redirect, Link} from 'react-router-dom'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [showPassword, setShow] = useState(false)
  const [loader, setLoader] = useState(false)
  const [errMsg, setErr] = useState('')
  const [showSubmitError, setShowsubmitError] = useState(false)
  const history = useHistory()

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  const handleRegister = async e => {
    e.preventDefault()
    setLoader(true)
    try {
      const response = await axios.post(
        'https://video-mangement.onrender.com/register',
        {
          username,
          email,
          password,
        },
      )
      history.push('/login')
      setLoader(false)
    } catch (error) {
      setLoader(false)
      setErr(error.response.data)
      setShowsubmitError(true)
    }
  }
  const handleTogglePassword = () => {
    setShow(prev => !prev)
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
        onSubmit={handleRegister}
        autoComplete="off"
      >
        <img
          src="https://www.johnsoncontrols.com/-/media/project/jci-global/johnson-controls/us-region/united-states-johnson-controls/security/video-surviellance/video-management-systems/product-images/victor-vms-american-dynamics.png?la=en&h=564&w=752&hash=93FFBD7AB04706AABBFBF30924B62E0F"
          className="login-website-logo-desktop-image"
          alt="website logo"
        />
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            autoComplete="new-password"
            type="text"
            id="username"
            className="username-input-field"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="email">
            EMAIL
          </label>
          <input
            autoComplete="new-password"
            type="email"
            id="email"
            className="username-input-field"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-container">
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
                onChange={e => setPassword(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            )}
            <span
              className="password-toggle-icon"
              onClick={handleTogglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button type="submit" className="login-button">
          {loader ? (
            <Loader type="ThreeDots" color="#ffffff" height="30" width="40" />
          ) : (
            <p>Register</p>
          )}
        </button>
        <div>
          <p className="registerMsg">
            Already have account@
            <Link to="/login">
              <span>Login</span>
            </Link>
          </p>
        </div>
        {showSubmitError && <p className="error-message">*{errMsg}</p>}
      </form>
    </div>
  )
}

export default Register
