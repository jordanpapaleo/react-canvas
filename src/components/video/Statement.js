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
  }

  render () {
    const overlayStyle = {
      left: 0,
      marginLeft: 0,
      position: 'fixed',
      zIndex: 2,
      top: 0,
      width: '100%',
      marginTop: '-200px',
      visibility: 'hidden'
    }

    const statementStyle = {
      position: 'absolute',
      width: 620,
      marginLeft: '-310px',
      left: '50%'
    }

    // Individually move a statement into play
    // visibility: visible; transform: translate3d(0px, 468.505px, 0px);

    return (
      <div className='overlay'>
        <div className='statement'>{this.props.message}</div>
      </div>
    )
  }
}

export default Statement
