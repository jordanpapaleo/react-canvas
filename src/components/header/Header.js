import React, { Component } from 'react'
import classnames from 'classnames'
import TweenMax from 'gsap/src/minified/TweenMax.min.js'
import PositionObserver from '../../PositionObserver'

class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isUnactive: {
        bind: false,
        roadmap: false,
        contact: false
      }
    }

    PositionObserver.subscribe((payload) => {
      let state = this.state
      state.positions = payload
      this.setState(state)
    })

    this.mouseOut = this.mouseOut.bind(this)
  }

  componentDidMount () {
    let positions = PositionObserver.observable
    const node = this.refs.header.getDOMNode()
    positions['header'] = node.offsetTop
    PositionObserver.update(positions)
  }

  mouseOver (link) {
    let isUnactive = this.state.isUnactive

    for (let key in isUnactive) {
      if (key !== link) {
        isUnactive[key] = true
      }
    }

    this.setState({
      isUnactive
    })
  }

  mouseOut () {
    this.setState({
      isUnactive: {
        bind: false,
        roadmap: false,
        contact: false
      }
    })
  }

  mouseUp (link) {
    let yPos

    switch (link) {
      case 'bind':
        yPos = 0
        break
      case 'video':
          yPos = this.state.positions.video
          break
      case 'touch':
        yPos = this.state.positions.touch
        break
      case 'roadmap':
        yPos = this.state.positions.roadmap
        break
      case 'contact':
        yPos = this.state.positions.footer
        break
      default:
        yPos = 0
    }

    TweenMax.fromTo(
      window,
      1,
      {scrollTo: {y: window.scrollY}},
      {scrollTo: {y: yPos, ease: Expo.easeInOut}}
    )
  }

  render () {
    const logoPath = require('../../assets/bind_icon.svg')

    return (
      <header ref='header' className='header clearfix'>
        <nav className='navbar navbar-fixed-top'>
          <a href='#' className='navbar-brand'><img src={logoPath} /> Bind</a>
          <ul className='nav navbar-nav pull-right'>
            <li className='nav-item'>
              <button className='btn btn-primary cta-button'>Get the App</button>
            </li>
          </ul>
          <ul className='nav navbar-nav navbar-center'>
            <li className={classnames('nav-item', {'un-active': this.state.isUnactive.bind})} onMouseUp={this.mouseUp.bind(this, 'bind')} onMouseOver={this.mouseOver.bind(this, 'bind')} onMouseOut={this.mouseOut}>
              <a href='#' className='nav-link'>Bind</a>
            </li>
            <li className={classnames('nav-item', {'un-active': this.state.isUnactive.roadmap})} onMouseUp={this.mouseUp.bind(this, 'roadmap')} onMouseOver={this.mouseOver.bind(this, 'roadmap')} onMouseOut={this.mouseOut}>
              <a href='#' className='nav-link'>Roadmap</a>
            </li>
            <li className={classnames('nav-item', {'un-active': this.state.isUnactive.contact})} onMouseUp={this.mouseUp.bind(this, 'contact')} onMouseOver={this.mouseOver.bind(this, 'contact')} onMouseOut={this.mouseOut}>
              <a href='#' className='nav-link'>Contact</a>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
