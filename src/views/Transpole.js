import React, {Component} from 'react'
import {Radio, Timeline, Tag} from 'antd'
import 'whatwg-fetch'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ChooseLine extends Component {
  onChangeline = (line) => {
    this.props.onChangeLine(line)
  }

  onClick1 = () => {
    console.log('click 1')
    this.onChangeline('ME1')
    document.getElementById('line1').className = "choose-line-button choose-line-active"
    document.getElementById('line2').className = "choose-line-button"
  }
  onClick2 = () => {
    console.log('click 2')
    this.onChangeline('ME2')
    document.getElementById('line2').className = "choose-line-button choose-line-active"
    document.getElementById('line1').className = "choose-line-button"
  }
  render() {
    return(
      <div>
        <button id="line1" style={{backgroundColor: '#f7fe2e'}} onClick={this.onClick1} className="choose-line-button choose-line-active">
          <div className="choose-line-title">Ligne 1</div></button>
        <button id="line2" style={{backgroundColor: '#ee655b'}} onClick={this.onClick2} className="choose-line-button">
          <div className="choose-line-title">Ligne 2</div></button>
      </div>
    )
  }
}


class OptionInput extends Component {
  state = {
    line: 'ME1'
  }
  onChangeLine = (line) => {
    this.props.onChangeLine(line)
    this.setState({line: line})
  }

  render() {
    const {direction} = this.props
    const directionButton = (this.state.line === 'ME1') ?
      [<RadioButton value="ME1">4 Cantons Stade</RadioButton>,
      <RadioButton value="ME1_R">CHU-Eurasanté</RadioButton>]
      : [<RadioButton value="ME2">C.H. Dron</RadioButton>,
        <RadioButton value="ME2_R">St. Philibert</RadioButton>]
    return(
      <div className="container">
        <div style={{ marginTop: 16 }}>
          {/*<RadioGroup onChange={this.onChangeLine} defaultValue="ME1" size="large">*/}
            {/*<RadioButton value="ME1">Ligne 1</RadioButton>*/}
            {/*<RadioButton value="ME2">Ligne 2</RadioButton>*/}
          {/*</RadioGroup>*/}
          <ChooseLine onChangeLine={this.onChangeLine}/>
        </div>
        <div style={{ marginTop: 16 }}>
          <RadioGroup onChange={this.props.onChangeDirection} defaultValue={direction} size="large">
            {directionButton}
          </RadioGroup>
        </div>
      </div>
    )
  }
}

class ResultsDisplay extends Component {
  render() {
    const themeColor = (this.props.line === 'ME1') ? '#f7fe2e' : '#ee655b'
    const colors = ['red', 'orange', 'green', 'cyan', 'blue']
    const showRouteNumber = 4
    const {transpoleData} = this.props
    const timelineItems = transpoleData ? transpoleData.stations.map(station=><Timeline.Item color={themeColor} lineColor={themeColor}>
      <p style={{fontSize: 14, paddingBottom: 10}}>{(station.name.length > 33)?station.name.substring(0,30)+'...' : station.name}</p>
      {station.timetable.length > showRouteNumber ?
      station.timetable.slice(0,showRouteNumber).map((time, idx)=><Tag color={colors[idx]}>{time}</Tag>)
        : station.timetable.map((time, idx)=><Tag color={colors[idx]}>{time} </Tag>)
      }
      </Timeline.Item>)
      : ''
    return(
      <div style={{ marginTop: 16 }}>
        <Timeline>
          {timelineItems}
        </Timeline>
      </div>
    )
  }
}

export default class Transpole extends Component {
  state = {
    transpoleData: null,
    line: 'ME1',
    direction: 'ME1',
    startStation: 0,
    loading: false,
    waiting: true  //waiting for the completion of choice
  }

  onChangeLine = (line) => {
    this.setState({
      line: line,
      waiting: true
    })
  }

  onChangeDirection = (e) => {
    console.log(e.target.value)
    this.setState({direction: e.target.value}, () => this.fetchData())
  }

  onChangeStartStation = (e) => {
    console.log(e.target.value)
  }

  fetchData = () => {
    const {line, direction, startStation} = this.state
    this.setState({loading: true, waiting: false}, ()=>{
      console.log('fetching data...')
      console.log(window.apiUrl+`/api/transpole/${line}/${direction}/${startStation}`)
      // fetch('/transpole.json')
      // offline on the train : )
      fetch(window.apiUrl+`/api/transpole/${line}/${direction}/${startStation}`)
        .then(res=>res.json())
        .then(transpoleData=>this.setState({transpoleData, loading: false}))
        .catch(e=>console.log(e))
    })

  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const {transpoleData, line, direction, startStation, loading, waiting} = this.state
    return(
      <div className="container">
        <OptionInput
          onChangeLine={this.onChangeLine}
          onChangeDirection={this.onChangeDirection}
          onChangeStartStation={this.onChangeStartStation}
          direction={direction}
        />
        {waiting? 'quelle direction ?' : (loading ? 'chargement...' :
          <ResultsDisplay
            transpoleData={transpoleData}
            line={line}
            direction={direction}
            startStation={startStation}
          />)
        }
      </div>
    )
  }
}