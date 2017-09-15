import React, {Component} from 'react'
import {Radio, Timeline, Icon, Tag} from 'antd'
import 'whatwg-fetch'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class OptionInput extends Component {
  state = {
    line: 'ME1'
  }
  onChangeLine = (e) => {
    this.props.onChangeLine(e)
    this.setState({line: e.target.value})
  }

  render() {
    const {direction} = this.props
    const directionButton = (this.state.line === 'ME1') ?
      [<RadioButton value="ME1">4 Cantons State</RadioButton>,
      <RadioButton value="ME1_R">CHU-Eurasanté</RadioButton>]
      : [<RadioButton value="ME2">C.H. Dron</RadioButton>,
        <RadioButton value="ME2_R">St. Philibert</RadioButton>]
    return(
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{ marginTop: 16 }}>
          <RadioGroup onChange={this.onChangeLine} defaultValue="ME1" size="large">
            <RadioButton value="ME1">Ligne 1</RadioButton>
            <RadioButton value="ME2">Ligne 2</RadioButton>
          </RadioGroup>
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

  onChangeLine = (e) => {
    this.setState({
      line: e.target.value,
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
      <div>
        <OptionInput
          onChangeLine={this.onChangeLine}
          onChangeDirection={this.onChangeDirection}
          onChangeStartStation={this.onChangeStartStation}
          direction={direction}
        />
        {waiting? '' : (loading ? '' :
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