import React, { Component } from 'react';
import Header from '../common/Header/Header';
import TextInput from '../common/Inputs/TextInput';
import httpClient from '../../utlities/httpClient';

class Signup extends Component {
    state = { 
        email: "",
        password: "",
        name: ""
    };

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        let { email, password, name } = this.state;
        let user = await httpClient.authenticate({ email, password, name }, "/api/users/");
        this.setState({ email: "", password: "", name: "" });
        if (user) {
            this.props.onLoginSuccess();
            this.props.history.push('/');
        }
    };

    render() {
        let { email, password, name } = this.state;
        let { handleChange, handleSubmit } = this;
        return (
            <div>
                <Header text={"Signup"}/>
                <div className="row">
                    <div className="column column-50 column-offset-25">
                        <form onSubmit={handleSubmit}>
                            <label>Name: </label>
                            <TextInput
                                field="name"
                                placeholder={"Johnny Appleseed"}
                                handleChange={handleChange}
                                value={name}
                            />
                            <label>Email: </label>
                            <TextInput
                                field="email"
                                placeholder={"john@appleseed.com"}
                                handleChange={handleChange}
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

export default Signup;