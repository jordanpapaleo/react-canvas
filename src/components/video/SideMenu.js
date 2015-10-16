import React, { Component, PropTypes } from 'react'

class SideMenu extends Component {
  static get propTypes () {
    items: PropTypes.array.isRequired
  }

  static get defaultProps () {
    items: []
  }

  constructor (props) {
    super(props)
  }

  render () {
    const styles = {
      position: 'fixed',
      top: 0,
      zIndex: 3,
      left: 30
    }

    return (
      <div className='sideMenu' styles={styles}>
        {this.props.items.map((item) => {
          <SideMenuItem item={item}  />
        })}
      </div>
    )
  }
}

class SideMenuItem extends Component {
  static get propTypes () {
    item: PropTypes.string.isRequired
  }

  static get defaultProps () {
    items: ''
  }

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>{this.props.item}</div>
    )
  }
}

export default SideMenu
