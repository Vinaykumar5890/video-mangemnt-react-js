import {useState} from 'react'
import axios from 'axios'
import {useHistory, Redirect, Link} from 'react-router-dom'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const ChangePassword = () => {
  const [email, setEmail] = useState('')
  const [oldPassword, setOld] = useState('')
  const [newPassword, setNew] = useState('')
  const [loader, setLoader] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
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
      const response = await axios.put(
        'https://video-mangement.onrender.com/changePassword',
        {
          email,
          oldPassword,
          newPassword,
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
  const handleTogglePassword1 = () => {
    setShowPassword1(prev => !prev)
  }
  const handleTogglePassword2 = () => {
    setShowPassword2(prev => !prev)
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
          <label className="input-label" htmlFor="Oldpassword">
            OLD PASSWORD
          </label>
          <div className="password-input-container">
            {showPassword1 ? (
              <input
                type="text"
                id="Oldpassword"
                autoComplete="new-password"
                className="password-input-field"
                value={oldPassword}
                onChange={e => setOld(e.target.value)}
                placeholder="Old Password"
                required
              />
            ) : (
              <input
                type="password"
                id="Oldpassword"
                autoComplete="new-password"
                className="password-input-field"
                value={oldPassword}
                onChange={e => setOld(e.target.value)}
                placeholder="Old Password"
                required
              />
            )}
            <span
              className="password-toggle-icon"
              onClick={handleTogglePassword1}
            >
              {showPassword1 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="Newpassword">
            NEW PASSWORD
          </label>
          <div className="password-input-container">
            {showPassword2 ? (
              <input
                type="text"
                id="Newpassword"
                autoComplete="new-password"
                className="password-input-field"
                value={newPassword}
                onChange={e => setNew(e.target.value)}
                placeholder="New Password"
                required
              />
            ) : (
              <input
                type="password"
                id="Newpassword"
                autoComplete="new-password"
                className="password-input-field"
                value={newPassword}
                onChange={e => setNew(e.target.value)}
                placeholder="New Password"
                required
              />
            )}
            <span
              className="password-toggle-icon"
              onClick={handleTogglePassword2}
            >
              {showPassword2 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button type="submit" className="login-button">
          {loader ? (
            <Loader type="ThreeDots" color="#ffffff" height="30" width="40" />
          ) : (
            <p>Change Password</p>
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

export default ChangePassword
