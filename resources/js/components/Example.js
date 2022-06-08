// import React from 'react';
import React, { Component } from 'react';
import { Card, Form, Button } from "react-bootstrap";
import ReactDOM from 'react-dom';

// function Example() {
//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 <div className="col-md-8">
//                     <div className="card">
//                         <div className="card-header">Example Component</div>

//                         <div className="card-body">I'm an example component!</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
class Example extends Component {
    constructor(props){
     super(props);
     this.state = {
         email:"",
         password:"",
     }
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
     this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(event) {
     console.log('submit');
    }
    render(){
     return(
         <>
         <div className="container">
             <div className="home-body">
                 <Form encType="multipart/form-data">
                     <h3 className="text-center">Welcome Omnify</h3>
                     <div className="title">Please login</div>
                     <Card className="p-3 shadow mt-4">
                         <Card.Body>
                             <div className="row">
                                 <div className="col">
                                     <Form.Group>
                                         <Form.Label className="control-label">Email</Form.Label>
                                         <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                                     </Form.Group>
                                     {/*<span className="error">{props.errors.firstName}</span>*/}
                                 </div>
                             </div>
                             <div className="row">
                                 <div className="col">
                                     <Form.Group className="mt-3">
                                         <Form.Label className="control-label">Password</Form.Label>
                                         <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                                     </Form.Group>
                                     {/*<span className="error">{props.errors.lastName}</span>*/}
                                 </div>
                             </div>
                         </Card.Body>
                         <div className="text-center mt-3">
                             <Button type="button" className="btn btn-custom" onClick={this.handleSubmit}> Login </Button>
                         </div>
                         <div className="mt-3 mb-3 text-center">
                             <span>Don't have an account? <a href="/signup">Signup</a></span>
                         </div>
                     </Card>
                 </Form>
                </div>
            </div>
         </>
     );
    }
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
