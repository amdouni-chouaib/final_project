import Navbar from './Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Home from './pages/Home'
import Posts from './pages/Posts'
import SinglePost from './pages/SinglePost'
import Reg from './pages/reg'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Create from './pages/Create'
import { Context } from './context/Context'
import { useContext } from 'react'


function App() {
  const {user} = useContext(Context)
  // const user = false
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/Posts">
          <Posts />
        </Route>
        <Route exact path="/posts/:id">
          <SinglePost />
        </Route>
        <Route exact path="/login">
          {user ? <Home /> : <Login />}
        </Route>
        <Route exact path="/reg">
          {user ? <Home /> : <Reg />}
        </Route>
        <Route exact path="/settings">
          {user ? <Settings /> : <Reg />}
        </Route>
        <Route exact path="/create">
          {user ? <Create /> : <Reg />}
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
