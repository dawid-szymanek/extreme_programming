import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorValue: "weight",
      kilogramValue: 0,
      gramValue: 0,
      poundValue: 0,
      meterValue: 0,
      kilometerValue: 0,
      centimeterValue: 0,
      feetValue: 0,
      inchValue: 0,
      hourValue: 0,
      minuteValue: 0,
      secondValue: 0
    }
    this.onSelectorChange = this.onSelectorChange.bind(this);
    this.onWeightValueChange = this.onWeightValueChange.bind(this);
    this.onDistanceValueChange = this.onDistanceValueChange.bind(this);
    this.onTimeValueChange = this.onTimeValueChange.bind(this);
  }

  roundNumber(num) {
    return Math.round(num * 100) / 100;
  }

  onSelectorChange(e) {
    e.preventDefault();
    this.setState({selectorValue: e.target.value});
  }

  onWeightValueChange(e) {
    e.preventDefault();
    if(e.target.name=="kilograms") {
      this.setState({kilogramValue: this.roundNumber(e.target.value),
        gramValue: this.roundNumber(e.target.value*1000),
        poundValue: this.roundNumber(e.target.value*2.2046)});
    }
    if(e.target.name=="grams") {
      this.setState({gramValue: this.roundNumber(e.target.value),
        kilogramValue: this.roundNumber(e.target.value/1000),
        poundValue: this.roundNumber(e.target.value*0.0022046)});
    }
    if(e.target.name=="pounds") {
      this.setState({poundValue: this.roundNumber(e.target.value),
        gramValue: this.roundNumber(e.target.value/0.0022046),
        kilogramValue: this.roundNumber(e.target.value/2.2046)});
    }
  }

  onDistanceValueChange(e) {
    e.preventDefault();
    if(e.target.name=="meters") {
      this.setState({meterValue: this.roundNumber(e.target.value),
        kilometerValue: this.roundNumber(e.target.value/1000),
        centimeterValue: this.roundNumber(e.target.value*100),
        feetValue: this.roundNumber(e.target.value*3.2808399),
        inchValue: this.roundNumber(e.target.value*39.3700787)});
    }
    if(e.target.name=="kilometers") {
      this.setState({kilometerValue: this.roundNumber(e.target.value),
        meterValue: this.roundNumber(e.target.value*1000),
        centimeterValue: this.roundNumber(e.target.value*100000),
        feetValue: this.roundNumber(e.target.value*3280.8399),
        inchValue: this.roundNumber(e.target.value*39370.0787)});
    }
    if(e.target.name=="centimeters") {
      this.setState({centimeterValue: this.roundNumber(e.target.value),
        meterValue: this.roundNumber(e.target.value/100),
        kilometerValue: this.roundNumber(e.target.value/100000),
        feetValue: this.roundNumber(e.target.value*0.032808399),
        inchValue: this.roundNumber(e.target.value*0.393700787)});
    }
    if(e.target.name=="feet") {
      this.setState({feetValue: this.roundNumber(e.target.value),
        meterValue: this.roundNumber(e.target.value*0.3048),
        centimeterValue: this.roundNumber(e.target.value*30.48),
        kilometerValue: this.roundNumber(e.target.value*0.0003048),
        inchValue: this.roundNumber(e.target.value*12)});
    }
    if(e.target.name=="inches") {
      this.setState({inchValue: this.roundNumber(e.target.value),
        meterValue: this.roundNumber(e.target.value*0.0254),
        kilometerValue: this.roundNumber(e.target.value*0.00000254),
        centimeterValue: this.roundNumber(e.target.value*2.54),
        feetValue: this.roundNumber(e.target.value*0.0833333333)});
    }
  }

  onTimeValueChange(e) {
    e.preventDefault();
    if(e.target.name=="hours") {
      this.setState({hourValue: this.roundNumber(e.target.value),
        minuteValue: this.roundNumber(e.target.value*60),
        secondValue: this.roundNumber(e.target.value*3600)});
    }
    if(e.target.name=="seconds") {
      this.setState({secondValue: this.roundNumber(e.target.value),
        hourValue: this.roundNumber(e.target.value/3600),
        minuteValue: this.roundNumber(e.target.value/60)});
    }
    if(e.target.name=="minutes") {
      this.setState({minuteValue: this.roundNumber(e.target.value),
        secondValue: this.roundNumber(e.target.value*60),
       hourValue: this.roundNumber(e.target.value/60)});
    }
  }


  render() {
    return(
      <>
        <Select selectorValue={this.state.selectorValue} onSelectorChange={this.onSelectorChange}/>
        <Calculator selectorValue={this.state.selectorValue}
          kilogramValue={this.state.kilogramValue}
          gramValue={this.state.gramValue}
          poundValue={this.state.poundValue}
          onWeightValueChange={this.onWeightValueChange}

          meterValue={this.state.meterValue}
          kilometerValue={this.state.kilometerValue}
          centimeterValue={this.state.centimeterValue}
          feetValue={this.state.feetValue}
          inchValue={this.state.inchValue}
          onDistanceValueChange={this.onDistanceValueChange}

          hourValue = {this.state.hourValue}
          secondValue = {this.state.secondValue}
          minuteValue = {this.state.minuteValue}
          onTimeValueChange = {this.onTimeValueChange}/>
        </>
    );
  }
}

function Select(props) {
  return(
    <div id='selector'>
      <select value={props.selectorValue} onChange={props.onSelectorChange}>
        <option value="weight">Weight</option>
        <option value="distance">Distance</option>
        <option value="time">Time</option>  
      </select>
    </div>
  );
}

function Calculator(props) {
  let calculator;
  if(props.selectorValue=="weight") calculator=<WeightCalculator
        kilogramValue={props.kilogramValue}
        gramValue={props.gramValue}
        poundValue={props.poundValue}
        onWeightValueChange={props.onWeightValueChange}/>;
  if(props.selectorValue=="distance") calculator=<DistanceCalculator
        meterValue={props.meterValue}
        kilometerValue={props.kilometerValue}
        centimeterValue={props.centimeterValue}
        feetValue={props.feetValue}
        inchValue={props.inchValue}
        onDistanceValueChange={props.onDistanceValueChange}/>;
  if(props.selectorValue=="time") calculator=<TimeCalculator
        hourValue = {props.hourValue}
        secondValue = {props.secondValue}
        minuteValue = {props.minuteValue}
        onTimeValueChange = {props.onTimeValueChange}
  />;



 // if(props.selectorValue=="temperature") calculator=<TemperatureCalculator/>; <option value="temperature">temperature</option>
  return(
    <div id="backgrounds">{calculator}</div>
  );
}

function WeightCalculator(props) {
  return(
    <div id="weight_calculator">
      <h2>Kilograms</h2><input name="kilograms" type="number" value={props.kilogramValue} onChange={props.onWeightValueChange}/><br/>
      <h2>Grams</h2><input name="grams" type="number" value={props.gramValue} onChange={props.onWeightValueChange}/><br/>
      <h2>Pounds</h2><input name="pounds" type="number" value={props.poundValue} onChange={props.onWeightValueChange}/><br/>
    </div>
  )
}

function DistanceCalculator(props) {
  return(
    <div id="distance_calculator">
      <h2>Meters</h2><input name="meters" type="number" value={props.meterValue} onChange={props.onDistanceValueChange}/><br/>
      <h2>Kilometers</h2><input name="kilometers" type="number" value={props.kilometerValue} onChange={props.onDistanceValueChange}/><br/>
      <h2>Centimeters</h2><input name="centimers" type="number" value={props.centimeterValue} onChange={props.onDistanceValueChange}/><br/>
      <h2>Feet</h2><input name="feet" type="number" value={props.feetValue} onChange={props.onDistanceValueChange}/><br/>
      <h2>Inches</h2><input name="inches" type="number" value={props.inchValue} onChange={props.onDistanceValueChange}/><br/>
    </div>
  )
}

function TimeCalculator(props) {
  return(
    <div id="time_calculator">
    <h2>Minutes</h2><input name="minutes" type="number"  value={props.minuteValue} onChange={props.onTimeValueChange}/><br/>
    <h2>Seconds</h2><input name="seconds" type="number"  value={props.secondValue} onChange={props.onTimeValueChange}/><br/>
    <h2>Hours</h2><input  name="hours" type="number" value={props.hourValue} onChange={props.onTimeValueChange}/><br/>
  </div>
  )
}
/*
function TemperatureCalculator(props) {
  return(
    <div id="temperature_calculator">
    <h2>Kelvins</h2><input type="number"/><br/>
    <h2>Fahrenheit</h2><input type="number"/><br/>
    <h2>Celcius</h2><input type="number"/><br/>
  </div>
  )
}*/



ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);

reportWebVitals();
