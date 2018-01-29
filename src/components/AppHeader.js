import React from 'react'

const AppHeader = (props) => {
  return(<div style={style}>
    Métro Lille
  </div>)
};

const style = {
  textAlign: 'center',
  background: 'linear-gradient(to right, #FFC837, #FF8008)',
  width: '100vw',
  padding: '20px 0',
  fontSize: 20,
  color: 'white',
  fontStyle: 'italic'
}

export default AppHeader