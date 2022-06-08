import React, { Component } from 'react';
import { Card, Form, Button } from "react-bootstrap";
import ReactDOM from 'react-dom';
import validator from 'validator';
import axios from "axios";

const current_url = window.location.href;
const base_url = current_url.slice(0, current_url.lastIndexOf('/'));

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			email:"",
			password:"",
			register_url:base_url+'/register',
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
		const {email,password} = this.state;
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
	            email: this.state.email,
	            password: this.state.password
	        };
	        axios.post(base_url+'/login', data)
	            .then( response =>{
	                window.location.reload();
	            })
	            .catch(error => {
	            	var res = error.response.data;
	            	if(res.errors){
	                	error.invalid = res.errors.email[0];
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
						<h3 className="text-center">Welcome Omnify</h3>
						<div className="title">Please login</div>
						<Card className="p-3 shadow mt-4">
		                	<span className="error mb-3 text-center">{this.state.errors.invalid}</span>
		                	<Card.Body>
		                		<div className="row">
					            	<div className="col">
					            		<Form.Group>
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
					                		<Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
					                	</Form.Group>
					                	<span className="error">{this.state.errors.password}</span>
					              	</div>
					            </div>
		                	</Card.Body>
		                	<div className="text-center mt-3">
		                		<Button type="button" className="btn btn-custom" onClick={this.handleSubmit}> Login </Button>
		                	</div>
		                	<div className="mt-3 mb-3 text-center">
		                		<span>Don't have an account? <a href={this.state.register_url}>Signup</a></span>
		                	</div>
		                </Card>
		            </Form>
	            </div>
            </div>
			</>
		);
	}
}

export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}