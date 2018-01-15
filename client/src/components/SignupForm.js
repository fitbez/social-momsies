import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import Nav from './Nav';
const host = "http://localhost:8080";
class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null,
			message: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		event.preventDefault()
		// TODO - validate!
		axios
			.post(`${host}/auth/signup`, {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				if (!response.data.error && response.status === 200) {
					this.setState({
						message: 'Registration successful'
					});
					setTimeout(() => {
						this.props._saveUser(response.data)
					}, 3000);
				} else {
					this.setState({
						message: response.data.error
					});
				}
			})
	}
	render() {
		if (this.props.user && this.props.user._id) {
			return <Redirect to="main" />
		}
		return (
			<div className="app">
				<Nav />
				<div className="main">
				<div className="SignupForm">
					<h1>Signup form</h1>
					<div className="field-row">
						<label htmlFor="username">Username: </label>
						<input
							type="text"
							name="username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</div>

					<div className="field-row">
						<label htmlFor="password">Password: </label>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</div>

					<div className="field-row">
						<label htmlFor="confirmPassword">Confirm Password: </label>
						<input
							type="password"
							name="confirmPassword"
							value={this.state.confirmPassword}
							onChange={this.handleChange}
						/>
					</div>

					<div className="field-row">
						{this.state.message}
					</div>

					<div className="field-row">
						<button className="btn" onClick={this.handleSubmit}>Sign up</button>
					</div>
				</div>
				</div>
			</div>

		)
	}
}

export default SignupForm
