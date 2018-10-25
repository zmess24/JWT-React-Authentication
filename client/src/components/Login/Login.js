import React, { Component } from 'react';
import Header from '../common/Header/Header';
import httpClient from '../../utlities/httpClient';

class Login extends Component {
    state = { 
        email: "",
        password: ""
    };

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        let { email, password } = this.state;
        let user = await httpClient.authenticate({ email, password }, "/api/users/authenticate");
        this.setState({ email: "", password: "" });
        if (user) {
            this.props.onLoginSuccess();
            this.props.history.push('/');
        }
    };

    render() {
        let { email, password } = this.state;
        let { handleChange, handleSubmit } = this;
        return (
            <div>
                <Header text={"Login"}/>
                <div className="row">
                    <div className="column column-50 column-offset-25">
                        <form onSubmit={handleSubmit}>
                            <label>Email: </label>
                            <input
                                type="text"
                                name="email"
                                placeholder="john@applseed.com" 
                                onChange={handleChange}
                                value={email}
                                />
                            <label>Password: </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Secret Password..." 
                                onChange={handleChange}
                                value={password}
                                />
                            <input type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;