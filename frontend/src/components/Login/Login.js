import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Login extends Component{


    state={
        name:'',
        password:"",
    }


    loginHandling = (e) => {
        e.preventDefault();
        this.props.loginHandling(this.state.name,this.state.password)
        this.setState({
            name:'',
            password:''
        })
    }

    changeHandling = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        return(
            <div className="container mt-5 text-uppercase">
                <h2>Login</h2>
                <form onSubmit={this.loginHandling} >
                    <div className="form-group mb-3">
                        <input onChange={this.changeHandling} name="name" value={this.state.name} autoFocus className="form-control" type="text" placeholder="Username"/>
                    </div>
                    <div className="form-group mb-3">
                        <input onChange={this.changeHandling} name="password" value={this.state.password} className="form-control" type="password" placeholder="Password"/>
                    </div>
                    <input className="btn btn-dark" type="submit" value="Login"/>
                    <span style={{float: 'right'}}>if you <span className="text-danger">do not</span> have an account please <Link to="/register">REGISTER</Link></span>
                </form>
            </div>
        );
    }
}

export default Login