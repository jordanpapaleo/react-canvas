import React, { Component } from 'react'
import PositionObserver from '../../PositionObserver'

class Touch extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    let positions = PositionObserver.observable
    const node = this.refs.touch.getDOMNode()
    positions['touch'] = node.offsetTop
    PositionObserver.update(positions)
  }

  render () {
    const pointerImg = require('../../assets/pointer.svg')
    const phoneImage = require('../../assets/iphone-front.png')

    return (
      <section ref='touch' className='touch'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <img className='phone-img' src={phoneImage} />
            </div>
            <div className='col-md-5 col-right'>
              <img className='pointer-img' src={pointerImg} /><br />
              <h1>SMART TOUCH</h1>
              <p>Natural navigation. Everything you need within reach of your thumb</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Touch
