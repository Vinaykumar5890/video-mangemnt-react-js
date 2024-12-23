import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Log from './components/Log'
import Register from './components/Register'
import ChangePassword from './components/ChangePassword'
import AddVideo from "./components/AddVideo"
import Home from './components/Home'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Log} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/changePassword" component={ChangePassword} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/add-video" component={AddVideo}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
