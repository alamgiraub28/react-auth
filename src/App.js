
import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import NoMatch from './components/NoMatch/NoMatch';
import Login from './components/Login/Login';
import SearchInfo from './components/SearchInfo/SearchInfo';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';


export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value ={[loggedInUser, setLoggedInUser]}>
 <Router>
   <Header></Header>
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
          <Login></Login>
          </Route>
          <PrivateRoute path="/search/:title">
            <SearchInfo></SearchInfo>
          </PrivateRoute>
          
          <Route path="/*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
    </Router>
    </UserContext.Provider>
   
  );
}

export default App;
