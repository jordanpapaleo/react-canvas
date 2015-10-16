import React, { Component } from 'react'
import PositionObserver from '../../PositionObserver'

class Home extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    let positions = PositionObserver.observable
    const node = this.refs.home.getDOMNode()
    positions['home'] = node.offsetTop
    PositionObserver.update(positions)
  }

  render () {
    const homeImage = require('../../assets/bind_iphone6.png')
    const bindLogo = require('../../assets/bind_logo.svg')

    return (
      <section ref='home' className='home'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-7'>
              <img className='home-img' src={homeImage} />
            </div>
            <div className='col-md-5'>
              <img className='bind-logo' src={bindLogo} />
              <h1>Communication changes<br />everything</h1>
              <p>We redisgned the way you communicat to make it light, fast, and mobile-friendly.  It's a whole new way to connect, communicate, and collaborate.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home
