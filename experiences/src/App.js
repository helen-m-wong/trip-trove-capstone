import logo from './logo.svg';
import './App.css';
import {Component} from 'react';
class App extends Component{

  constructor(props){
    super(props);
    this.state= {
      experiences:[]
    }
  }

API_URL= "http://localhost:3000/";

componentDidMount(){
  this.refreshExperiences();
}

async refreshExperiences() {
  fetch(this.API_URL+"api/test/GetExperiences").then(response=> response.json())
  .then(data=>{
    this.setState({experiences:data});
})
}

async addClick() {
  var title=document.getElementById("title").value;
  var location=document.getElementById("location").value;
  var details=document.getElementById("details").value;

  const data = new FormDataEvent();
  data.append("title", title);
  data.append("location", location);
  data.append("details", details);


  fetch(this.API_URL+"api/test/AddExperiences", {
    method: "POST",
    body:data
  }).then(res=>res.json())
  .then((result)=>{
    alert(result);
    this.refreshExperiences();
  })
}

async deleteClick(id) {
  fetch(this.API_URL+"api/test/DeleteExperiences?id="+id, {
    method: "DELETE",
  }).then(res=>res.json())
  .then((result)=>{
    alert(result);
    this.refreshExperiences();
  })
}

render() {
  const{experiences}=this.state;
  return (
    <div className="App">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Trip Planner</title>
        <link rel="stylesheet" href="./style.css" />
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <div className="wrapper">
          <form action="">
            <h1>Add Your Experience</h1>
            <div className="input-box">
              <input id="title" type="text" placeholder="Title" required />
            </div>
            <div className="input-box">
              <input id="location" type="text" placeholder="Location" required />
            </div>
            <div className="input-box">
              <textarea id="details" placeholder="Details" required></textarea>
            </div>
            <button onClick={()=>this.addClick()}>Add</button>
          </form>
        </div>
      </body>
      {experiences.map(experience=>
        <p>
          <b>* {experience.description} </b>
          <button onClick={()=>this.deleteClick(experience.id)}>Delete</button>
        </p>
      )}
    </div>
  );
}
}

export default App;