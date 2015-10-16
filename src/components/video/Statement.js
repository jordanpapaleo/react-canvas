import React, { Component, PropTypes } from 'react'

class Statement extends Component {
  static get propTypes () {
    message: PropTypes.string.isRequired
  }

  static get defaultProps () {
    message: ''
  }

  constructor (props) {
    super(props)
    console.log(props)
  }

  render () {
    const overlayStyle = {
      left: 0,
      marginLeft: 0,
      position: 'fixed',
      zIndex: 2,
      top: window.innerHeight * 1.25,
      width: '100%',
      // visibility: 'hidden'
    }

    let blar = window.innerWidth / 4


    const statementStyle = {
      position: 'absolute',
      width: blar,
      marginLeft: `-${blar / 2}`,
      left: '50%'
    }

    return (
      <div className='overlay' style={overlayStyle}>
        <div className='statement' style={statementStyle}>{this.props.text}</div>
      </div>
    )
  }
}

export default Statement
