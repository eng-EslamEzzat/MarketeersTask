import './App.css';
import React, {Component} from 'react';
import Table from './components/Table/Table';
import axios from 'axios';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Login from './components/Login/Login';
import Register from './components/Register/Register';

class App extends Component{

  state = {
    numpers: [],
    token: localStorage.getItem('token')||'',
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/apis/numbers/`)
      .then(res => {
        const numpers = res.data;
        this.setState({ numpers });
      })
  }

  loginHandling = async(user,pass) => {
    await axios.post(`http://127.0.0.1:8000/apis/api-token-auth`,
    {username:user,password:pass})
    .then(res =>{
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('username',res.data.username);
        localStorage.setItem('userid',res.data.user_id);
        console.log(res.data);
        window.location.reload();
    })
    .catch(err => console.error(err))
  }

  registerHandling = (username,password,email)=>{
    axios.post(`http://127.0.0.1:8000/apis/users/`,
    {username:username,password:password,email:email})
    .then(res =>{
      window.location.href="http://localhost:3000/login";
    })
    .catch(err => console.error(err))
  }

  logoutHandling = ()=>{localStorage.clear();window.location.reload();}

  render(){
    return (
      <div>        
        <BrowserRouter>
        {this.state.token?
            <Switch>
            <Route path='/' exact  render={ ()=> <Table numpers={this.state.numpers} logoutHandling={this.logoutHandling}/> }/>
            <Redirect from="/:any" to="/"/>
            </Switch>:
            <Switch>
            <Route path='/login' exact component={()=><Login loginHandling={this.loginHandling}/>} />
            <Route path='/register' exact render={()=><Register registerHandling={this.registerHandling}/>} />
            <Redirect from="/" to="/login"/>
            </Switch>
          }
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
