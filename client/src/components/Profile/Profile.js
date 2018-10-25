import React, { Component } from 'react';
import Header from '../common/Header/Header';
import TextInput from '../common/Inputs/TextInput';
import httpClient from '../../utlities/httpClient';

class Profile extends Component {
    state = { 
        email: "",
        name: "",
        password: ""
    };

    async componentDidMount() {
        let { name, email } = this.props.currentUser;
        this.setState({ email, name }); 
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        let { email, name } = this.state;
        let user = await httpClient.authenticate({ email, name }, "/api/users/");
        if (user) {
            this.props.onUpdateSuccess();
            this.props.history.push('/');
        }
    };

    render() {
        let { email, name } = this.state;
        let { handleChange, handleSubmit } = this;
        return (
            <div>
                <Header text={"Profile"}/>
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
                            <input type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;