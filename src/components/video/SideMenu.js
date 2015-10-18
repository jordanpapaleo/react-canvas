import React, { Component, PropTypes } from 'react'
import ProgressObserver from '../../ProgressObserver'

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
    // this.onClick = this.onClick.bind(this)
  }

  onClick (i) {
    ProgressObserver.update(i)
  }

  render () {
    const styles = {
      position: 'fixed',
      top: 0,
      right: 20,
      height: this.state.height,
      zIndex: 3,
      width: 125,
      fontSize: 12,
      fontWeight: 700,
      opacity: (this.props.isPlaying) ? 1 : 0
    }

    // ---------------------------
    let menuTexts = []
    this.props.items.forEach((item, i) => {
      i = i + 1

      const textStyle= {
        position: 'absolute',
        right: 20,
        top: this.state.sectionHeight * i,
        color: '#FFFFFF',
        cursor: 'pointer'
      }

      menuTexts.push(
        <div className='menu-text' key={i} ref={`menutext${i}`} style={textStyle} onClick={this.onClick.bind(true, i)}>
          {item}
        </div>
      )
    })

    // ---------------------------
    let menuTicks = []
    let tickCount = this.state.sections * this.state.ticksPerSection
    let tickOffset = this.state.height / tickCount
    let i = 1

    while (i <= tickCount) {
      let size = 5

      const tickStyle= {
        position: 'absolute',
        right: 0,
        borderRadius: '50%',
        width: size,
        height: size,
        top: tickOffset * i,
        backgroundColor: '#FFFFFF'
      }

      menuTicks.push(
        <div className='menu-tick' key={i} style={tickStyle}></div>
      )

      i++
    }

    return (
      <div ref={'side-menu'} className='side-menu' style={styles}>
        {menuTexts}
        {menuTicks}
      </div>
    )
  }
}

export default SideMenu
