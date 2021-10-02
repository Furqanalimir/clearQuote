import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Users from './components/Users';
import UpdateUser from './components/UpdateUser';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/user/getall');
      setUsers(data);
    };
    fetchData();
  }, [])


  return (
    <div className="App">
      <Router>
        <Route path="/" component={Header} />
        <Switch>
          <Route exact path='/' ><Users users={users} /></Route>
          <Route exact path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <PrivateRoute path='/update' component={UpdateUser} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
