import React, { Component } from 'react';
import { Card, Form, Button, Modal,CloseButton } from "react-bootstrap";
import ReactDOM from 'react-dom';
import validator from 'validator';
import axios from "axios";
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const current_url = window.location.href;
const base_url = current_url.slice(0, current_url.lastIndexOf('/'));

class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			name:"",
			description:"",
			start_time:"",
			end_time:"",
			day_of_week:[],
			errors:{},
			eventList:[],
			modal_show: false,
			week_options: [{ value:1, label: 'Monday' }, { value:2, label: 'Tuesday' }, { value:3, label: 'Wednesday' },
						{ value:4, label: 'Thursday' }, { value:5, label: 'Friday' },
					  { value:6, label: 'Saturday' }, { value:7, label: 'Sunday' }],
			
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		axios.get(base_url+'/get_event')
		        .then( response =>{
		            if(response.data.events.length != 0){
		            	this.setState({eventList:response.data.events[0]});
		            }
		        })
		        .catch(error => {
		        	console.log(error);
		        	alert("Something wrong, Please try again...");  
			    });
	}
	handleChange(event) {
		if(Array.isArray(event)){
			var days = [];
			event.map((day,i) => {
				days[i] = day.value;
			});
			this.setState({day_of_week:days});
		}else{
			this.setState({[event.target.name]: event.target.value});
		}
	}
	handleSubmit(event) {
		console.log(this.state);
		const {name,description,start_time,end_time,day_of_week} = this.state;
		var error = {};
		if(name === ""){
			error.name = "Event name is require";
		}
		if(description === ""){
			error.description = "Event description is require";
		}
		if(start_time === ""){
			error.start_time = "Start time is require";
		}
		if(end_time === ""){
			error.end_time = "End time is require";
		}
		if(Object.keys(day_of_week).length === 0){
			error.day_of_week = "Select an option";
		}
		if(Object.keys(error).length === 0){
			const data = {
		        name: this.state.name,
		        description: this.state.description,
		        start_time: this.state.start_time,
		        end_time: this.state.end_time,
		        day_of_week: this.state.day_of_week,
		    };
		    axios.post(base_url+'/add_event', data)
		        .then( response =>{
		           	this.setState({eventList:response.data.events[0], modal_show:false, name:"", start_time:"", end_time:"", description:"", day_of_week:[]});
		        })
		        .catch(error => {
		        	alert("Something wrong, Please try again");  
			    });
		}else {
			this.setState({errors:error});
		}
	}
	handleClose = () => { 
    	this.setState({ modal_show: false });
  	}
  	handleShow = () => {
    	this.setState({ modal_show: true });
  	}

	render(){
		return(
			<>
			<div className="container">
				<div className="event-button">
					<Button onClick={this.handleShow}>Scheduled Event</Button>
				</div>
				<div className="calendar">
		      	<FullCalendar
			        plugins={[ dayGridPlugin,interactionPlugin,timeGridPlugin ]}
			        initialView="dayGridMonth"
			        headerToolbar={{
			        	center: 'title',
					  	start: 'dayGridMonth,timeGridWeek,timeGridDay',
					  	end: 'today prev,next'
					}}
					aspectRatio='2' 
			        events= {this.state.eventList }
			    />	
			    </div>
			</div>
			<Modal show={this.state.modal_show} onHide={this.handleClose} centered>
		    	<Modal.Body>
			    	<div className="text-end"> <CloseButton onClick={this.handleClose} /> </div>
			   		<h5> Schedule Your New Event </h5>
			   		<Form onSubmit={this.handleSubmit}>
						<Card>
							<Card.Body>
								<div className="row">
					            	<div className="col">
					            		<Form.Group>
					                		<Form.Label className="control-label">Event Name</Form.Label>
					                		<Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChange} />
					                	</Form.Group>
					                	<span className="error">{this.state.errors.name}</span>
					            	</div>
					            </div>
					            <div className="row">
					            	<div className="col">
					               		<Form.Group className="mt-3">
					                		<Form.Label className="control-label">Description</Form.Label>
					                		<Form.Control type="text" name="description" value={this.state.description} onChange={this.handleChange} />
					                	</Form.Group>
					                	<span className="error">{this.state.errors.description}</span>
					              	</div>
					            </div>
					            <div className="row">
					            	<div className="col">
					            		<Form.Group className="mt-3">
					                		<Form.Label className="control-label">Start Time</Form.Label>
					                		<Form.Control type="datetime-local" name="start_time" value={this.state.start_time} onChange={this.handleChange} />
					                	</Form.Group>
					                	<span className="error">{this.state.errors.start_time}</span>
					            	</div>
					            </div>
					            <div className="row">
					            	<div className="col">
					               		<Form.Group className="mt-3">
					                		<Form.Label className="control-label">End Time</Form.Label>
					                		<Form.Control type="datetime-local" name="end_time" value={this.state.end_time} onChange={this.handleChange} />
					                	</Form.Group>
					                	<span className="error">{this.state.errors.end_time}</span>
					              	</div>
					            </div>
					            <div className="row">
					            	<div className="col">
					                   <Form.Group className="mt-3">
					                		<Form.Label className="control-label">Day of Week</Form.Label>
					                		<Select options={this.state.week_options} name="day_of_week" isMulti onChange={this.handleChange} />
					                	</Form.Group>
					                	<span className="error">{this.state.errors.day_of_week}</span>
					              	</div>
					            </div>
							</Card.Body>
							<div className="text-center mt-3 mb-3">
								<Button type="button" className="btn btn-custom" onClick={this.handleSubmit}> Save </Button>
							</div>
						</Card>
					</Form>		          
		        </Modal.Body>
		    </Modal>
			</>
		);
	}
}

export default Home;

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}