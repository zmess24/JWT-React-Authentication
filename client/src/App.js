import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import httpClient from './utlities/httpClient';
import Home from './components/Home';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Signup from './components/Signup/Signup';
import VIP from './components/VIP/VIP';
import Logout from './components/Logout/Logout';
import Layout from './components/common/Layout';
import './App.css';

class App extends Component {
	state = { currentUser: httpClient.getCurrentUser() };

	onAuthSuccess = () => {
		this.setState({ currentUser: httpClient.getCurrentUser() });
	}

	logOut = () => {
		httpClient.logOut();
		this.setState({ currentUser: null });
	}

	render() {
		let { currentUser } = this.state;
		let { logOut, onAuthSuccess } = this;
		return (
			<Layout currentUser={currentUser}>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/login" render={(props) => {
						return <Login {...props} onLoginSuccess={onAuthSuccess}/>	
					}}/>
					<Route path="/logout" render={() => {
						return <Logout logOut={logOut}/>
					}}/>
					<Route path="/signup" render={(props) => {
						return <Signup {...props} onLoginSuccess={onAuthSuccess}/>
					}}/>
					<Route path="/profile" render={(props) => {
						return <Profile {...props} currentUser={currentUser} onUpdateSuccess={onAuthSuccess}/>
					}}/>
					<Route path="/vip" render={() => {
						return currentUser ? <VIP/> : <Redirect to="/login"/>
					}}/>
				</Switch>
			</Layout>
		);
	}
}

export default App;
