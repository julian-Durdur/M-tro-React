import React, { Component } from 'react';
import '../style/App.css';
import axios from "axios";
import Info from "./Info";
import Input from "./Input";

class App extends Component {
  
  state = {
    json: {},
    json2: {},
    dataInput : "6",
    dataInput2 : "Nationale",
    insert: "",
    insertRecherche: [],
    allStations: [],
    allLines: []
  }

  componentDidMount() {
    this.getDataFromApi();
    this.getDataFromApi2();
    this.getAllLines();
    setInterval(this.getDataFromApi, 30000)
    if(this.state.dataInput && this.state.dataInput2){
      setInterval(this.getDataFromApi2, 1000);    
    }
  }

  getDataFromInput = (event) => {
    this.setState({
      dataInput: event.target.value
    }, () => {
      console.log(this.state.dataInput)
      this.getAllStations();
    })
  }
  getDataFromInput2 = (event) => {
    this.setState({
      dataInput2: event.target.value
    }, () => {
      console.log(this.state.dataInput2);
      
    })
  }

  clickBtn = () => {
    this.setState({
      insert : this.state.dataInput2
    },() => {
      this.getDataFromApi2();
    })
    
  }

  getAllStations = () => {
    axios.get(`https://api-ratp.pierre-grimaud.fr/v3/stations/metros/${this.state.dataInput}`)
    .then((response) => {
      // console.log(response.data.result.stations)
      this.setState({
        allStations : response.data.result.stations
      }, () => {
        console.log(this.state.allStations)
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getDataFromApi = () => {
    axios.get('https://api-ratp.pierre-grimaud.fr/v3/schedules/metros/9/croix+de+chavaux/A+R')
      .then((response) => {
        this.setState({
          json : response.data.result.schedules
        }, () => {
          // console.log(this.state.json)
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getDataFromApi2 = () => {
   
      axios.get(`https://api-ratp.pierre-grimaud.fr/v3/schedules/metros/${this.state.dataInput}/${this.state.dataInput2}/A+R`)
      .then((response) => {
        this.setState({
          json2 : response.data.result.schedules
        }, () => {
          // console.log(this.state.json2)
        })
      })
      .catch((error) => {
        console.log(error);
      })
    }
   
  
  getAllLines = () => {
    axios.get('https://api-ratp.pierre-grimaud.fr/v3/lines/metros')
      .then((response) => {
        // console.log(response.data.result.metros)
        this.setState({
          allLines : response.data.result.metros
        }, () => {
          console.log(this.state.allLines)
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  

  beforeRender = () => {
    if (this.state.json[0] && this.state.json2[0]){
      return (
        <div>
          <Info station="Croix de Chavaux" data={this.state.json} />
          <Info station={this.state.insert || "Nationale"} data={this.state.json2} />
        </div>
      )
    }
  }

  render() {
    return (
      <div style={{marginTop: "30px"}} className="App">
        <div  className="container">
          <h1>Métro</h1>
          <Input allLines={this.state.allLines} allStation={this.state.allStations} btnF={this.clickBtn} input={this.getDataFromInput} input2={this.getDataFromInput2}/>
          {this.beforeRender()}
        </div>
      </div>
    );
  }
}

export default App;
