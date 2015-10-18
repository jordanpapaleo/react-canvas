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
      backgrounColor: 'rgba(255,255,255,0)',
      left: 0,
      marginLeft: 0,
      position: 'fixed',
      top: window.innerHeight * 1.25,
      // visibility: (this.props.isPlaying) ? 'visible' : 'hidden',
      width: '100%',
      zIndex: 2
    }

    let blar = window.innerWidth / 2

    const statementStyle = {
      backgrounColor: 'rgba(255,255,255,0)',
      color: 'hotpink',
      fontSize: 36,
      left: '50%',
      marginLeft: `-${blar / 2}`,
      position: 'absolute',
      width: blar
    }

    return (
      <div className='overlay' style={overlayStyle}>
        <div className='statement' style={statementStyle}>{this.props.text}</div>
      </div>
    )
  }
}

export default Statement
