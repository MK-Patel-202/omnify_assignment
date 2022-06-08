import React, { Component } from 'react';
import { Card, Form, Button } from "react-bootstrap";
import ReactDOM from 'react-dom';
import validator from 'validator';
import axios from "axios";

const current_url = window.location.href;
const base_url = current_url.slice(0, current_url.lastIndexOf('/'));

class Signup extends Component {
	constructor(props){
		super(props);
		this.state = {
			first_name:"",
			last_name:"",
			email:"",
			password:"",
			login_url:base_url+'/login',
			errors:{},
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}
	handleSubmit(event) {
		var error = {};
		const {first_name,last_name,email,password} = this.state;
		if(first_name === ""){
			error.first_name = "First name is require";
		}
		if(last_name === ""){
			error.last_name = "Last name is require";
		}
		if(email === ""){
			error.email = "Email is require";
		}else if(!validator.isEmail(email)) {
			error.email = "Invalid email address";
		}
		if(password === ""){
			error.password = "Password is require";
		}
		if(Object.keys(error).length === 0){
			const data = {
				first_name: this.state.first_name,
				last_name: this.state.last_name,
	            email: this.state.email,
	            password: this.state.password
	        };
	        axios.post(base_url+'/register', data)
	            .then( response => {
	                window.location.reload();
	            })
	            .catch(error => {
	            	var res = error.response.data;
	            	if(res.errors){
	                	error.email = res.errors.email[0];
		            	this.setState({errors:error});
	                }else{
	                	this.setState({errors:{}});
	                }
	        });
	    }else {
	    	this.setState({errors:error});
	    }
	}
	render(){
		return(
			<>
			<div className="container">
				<div className="home-body">
					<Form className="wc-4">
						<h3 className="text-center">Register your account!</h3>
						<Card className="p-3 shadow mt-4">
		                	<Card.Body>
		                		<div className="row">
					            	<div className="col">
					            		<Form.Group>
					                		<Form.Label className="control-label">First Name</Form.Label>
					                		<Form.Control type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
					                	</Form.Group>
					                	<span className="error">{this.state.errors.first_name}</span>
					            	</div>
					            </div>
					            <div className="row">
					            	<div className="col">
					               		<Form.Group className="mt-3">
					                		<Form.Label className="control-label">Last Name</Form.Label>
					                		<Form.Control type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
					                	</Form.Group>
					                	<span className="error">{this.state.errors.last_name}</span>
					              	</div>
					            </div>
		                		<div className="row">
					            	<div className="col">
					            		<Form.Group className="mt-3">
					                		<Form.Label className="control-label">Email</Form.Label>
					                		<Form.Control type="text" name="email" value={this.state.email} onChange={this.handleChange} />
					                	</Form.Group>
					                	<span className="error">{this.state.errors.email}</span>
					            	</div>
					            </div>
					            <div className="row">
					            	<div className="col">
					               		<Form.Group className="mt-3">
					                		<Form.Label className="control-label">Password</Form.Label>
					                		<Form.Control type="text" name="password" value={this.state.password} onChange={this.handleChange} />
					                	</Form.Group>
					                	<span className="error">{this.state.errors.password}</span>
					              	</div>
					            </div>
		                	</Card.Body>
		                	<div className="text-center mt-3">
		                		<Button type="button" className="btn btn-custom" onClick={this.handleSubmit}> Signup </Button>
		                	</div>
		                	<div className="mt-3 mb-3 text-center">
		                		<span>Already have an account? <a href={this.state.login_url}>Login</a></span>
		                	</div>
		                </Card>
		            </Form>
	            </div>
            </div>
			</>
		);
	}
}

export default Signup;

if (document.getElementById('signup')) {
    ReactDOM.render(<Signup />, document.getElementById('signup'));
}