import React, {Component} from 'react'
import MobileContainer from '../components/MobileContainer'
import AppHeader from '../components/AppHeader'

export default class PlaqueTranspole extends Component {
  render() {
    return(<MobileContainer>
      <AppHeader/>
      <StationName />
      <StationTimetable />
      <StationTimetable />
    </MobileContainer>)
  }
}

const StationName = (props) => {
  return(<div style={styles.stationName}>
    Station Name Demo station
  </div>)
};

class StationTimetable extends Component {
  render() {
    return(<div style={styles.stationTimetable}>
      <div style={{background: 'linear-gradient(to right, #e96443, #904e95)'}}>
        <div style={styles.stationTimetableHeader}>direction</div>
        <div style={styles.stationTimetableTitle}>4 Cantons Stade</div>
      </div>
      <div style={styles.stationTimetableBody}>
        <TimetableItem>Prochain train: 20h20</TimetableItem>
        <TimetableItem>Prochain train: 20h20</TimetableItem>
        <TimetableItem>Prochain train: 20h20</TimetableItem>
        <TimetableItem>...</TimetableItem>
        <TimetableItem>Dernier train: 20h20</TimetableItem>
      </div>
      <div style={styles.stationTimetableFooter}></div>
    </div>)
  }
}

const TimetableItem = (props) => {
  return(<div style={styles.timetableItem}>
    {props.children}
  </div>)
}

const styles = {
  stationName: {
    padding: '20px 0',
    textAlign: 'center',
    backgroundColor: 'white',
    border: '5px solid brown',
    width: '90%',
    fontSize: 30,
    fontWeight: 500,
    marginTop: 10,
    borderRadius: 15
  },
  stationTimetable: {
    width: "90%",
    backgroundColor: 'white',
    marginTop: 15,
    borderRadius: 10,
    overflow: 'hidden'
  },
  stationTimetableTitle: {
    textAlign: 'center',
    fontSize: 20,
    margin: '0 15',
    color: 'white',
  },
  stationTimetableHeader: {
    textAlign: 'center',
    fontSize: 12,
    color: 'white',
    padding: 4
  },
  stationTimetableBody: {
    paddingBottom: 10
  },
  timetableItem: {
    textAlign: 'center',
    paddingTop: 10
  },
  stationTimetableFooter: {

  }
};