import React from 'react'

const MobileContainer = (props) => {
  return(<div style={containerStyle}>
    {props.children}
  </div>)
}

const containerStyle = {
  width: '100vw',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

export default MobileContainer