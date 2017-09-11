import React, {Component} from 'react'
import {Radio, Timeline, Icon, Tag} from 'antd'
import 'whatwg-fetch'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class OptionInput extends Component {
  render() {
    return(
      <div>
        <div style={{ marginTop: 16 }}>
          <RadioGroup onChange={this.props.onChangeLine} defaultValue="ME1">
            <RadioButton value="ME1">Ligne 1</RadioButton>
            <RadioButton value="ME2">Ligne 2</RadioButton>
          </RadioGroup>
        </div>
        <div style={{ marginTop: 16 }}>
          <RadioGroup onChange={this.props.onChangeDirection} defaultValue="ME1">
            <RadioButton value="ME1">4 Cantons</RadioButton>
            <RadioButton value="ME2_R">CHU</RadioButton>
          </RadioGroup>
        </div>
      </div>
    )
  }
}

class ResultsDisplay extends Component {
  render() {
    const themeColor = (this.props.line === 'ME1') ? '#f7fe2e' : 'red'
    const colors = ['red', 'orange', 'green', 'cyan', 'blue']
    const showRouteNumber = 4
    const {transpoleData} = this.props
    const timelineItems = transpoleData ? transpoleData.stations.map(station=><Timeline.Item color={themeColor}>
      <p style={{fontSize: 14, paddingBottom: 10}}>{station.name}</p>
      {station.timetable.length > showRouteNumber ?
      station.timetable.slice(0,showRouteNumber).map((time, idx)=><Tag color={colors[idx]}>{time}</Tag>)
        : station.timetable.map((time, idx)=><Tag color={colors[idx]}>{time} </Tag>)
      }
      </Timeline.Item>)
      : ''
    return(
      <div style={{ marginTop: 16 }}>
        <Timeline style={{borderColor: 'yellow'}}>
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
    startStation: 0
  }

  onChangeLine = (e) => {
    console.log(e.target.value)
  }

  onChangeDirection = (e) => {
    console.log(e.target.value)
  }

  onChangeStartStation = (e) => {
    console.log(e.target.value)
  }

  fetchData = () => {
    fetch('/transpole.json').then(res=>res.json()).then(transpoleData=>this.setState({transpoleData})).catch(e=>console.log(e))
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const {transpoleData, line, direction, startStation} = this.state
    return(
      <div>
        <OptionInput
          onChangeLine={this.onChangeLine}
          onChangeDirection={this.onChangeDirection}
          onChangeStartStation={this.onChangeStartStation}/>
        <ResultsDisplay
          transpoleData={transpoleData}
          line={line}
          direction={direction}
          startStation={startStation}
        />
      </div>
    )
  }
}