import React, { Component, PropTypes } from 'react'

class Statement extends Component {
  static get propTypes () {
    return {
      message: PropTypes.string.isRequired
    }
  }

  static get defaultProps () {
    return {
      message: ''
    }
  }

  render () {
    const overlayStyle = {
      left: 0,
      marginLeft: 0,
      position: 'fixed',
      zIndex: 2,
      top: window.innerHeight * 1.25,
      width: '100%',
      backgrounColor: 'rgba(255,255,255,0)',
      visibility: (this.props.isPlaying) ? 'visible' : 'hidden'
    }

    let blar = window.innerWidth / 2

    const statementStyle = {
      position: 'absolute',
      width: blar,
      marginLeft: `-${blar / 2}`,
      left: '50%',
      color: '#FFFFFF',
      fontSize: 36,
      backgrounColor: 'rgba(255,255,255,0)'
    }

    return (
      <div className='overlay' style={overlayStyle}>
        <div className='statement' style={statementStyle}>{this.props.text}</div>
      </div>
    )
  }
}

export default Statement
