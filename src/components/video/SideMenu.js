import React, { Component, PropTypes } from 'react'

class SideMenu extends Component {
  static get propTypes () {
    return {
      items: PropTypes.array.isRequired
    }
  }

  static get defaultProps () {
    return {
      items: []
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      height: 718,
      menuItems: props.items.length,
      sections: props.items.length + 1,
      ticksPerSection: 3
    }

    this.state.sectionHeight = this.state.height / this.state.sections
  }

  render () {
    console.log('state', this.state)

    const styles = {
      position: 'fixed',
      top: 0,
      right: 15,
      height: this.state.height,
      zIndex: 3,
      width: 125
    }

    // ---------------------------
    let menuTexts = []
    this.props.items.forEach((item, i) => {
      const textStyle= {
        position: 'absolute',
        right: 0,
        top: this.state.sectionHeight * (i + 1),
        color: 'hotpink'
      }

      menuTexts.push(
        <div className='menu-text' key={i} ref={`menutext${i}`} style={textStyle}>
          {item}
        </div>
      )
    })

    // ---------------------------
    let menuTicks = []
    let tickCount = this.state.sections * this.state.ticksPerSection
    let tickOffset = this.state.height / tickCount

    while (tickCount--) {
      let size = 10

      const tickStyle= {
        position: 'absolute',
        right: 0,
        borderRadius: '50%',
        width: size,
        height: size,
        top: tickOffset * tickCount,
        backgroundColor: 'hotpink'
      }

      console.log('tick', tickCount)

      menuTicks.push(
        <div className='menu-tick' key={tickCount} style={tickStyle}></div>
      )
    }

    console.log(menuTicks)

    return (
      <div ref={'side-menu'} className='side-menu' style={styles}>
        {menuTexts}
        {menuTicks}
      </div>
    )
  }
}

export default SideMenu
