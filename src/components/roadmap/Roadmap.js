import React, { Component } from 'react'
import PositionObserver from '../../PositionObserver'

class Roadmap extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    let positions = PositionObserver.observable
    const node = this.refs.roadmap.getDOMNode()
    positions['roadmap'] = node.offsetTop
    PositionObserver.update(positions)
  }

  render () {
    const ios = require('../../assets/iOS.svg')
    const android = require('../../assets/android.svg')
    const web = require('../../assets/web.svg')
    const osx = require('../../assets/osx.svg')

    return (
      <section ref='roadmap' className='roadmap'>
        <h1>Our roadmap</h1>
        <p>Now available for <strong>iOS</strong> and <strong>Android</strong> and soon to be launched on <strong>web</strong> and <strong>OS X</strong>.</p>
        <p>Demand for Bind is incredible, and in order to deliver a world class experience we're filling reservations on a first come, first served basis. Download the app to get your place in line.  Everyone can watch the line move in real-rime from inside the app.</p>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <img className='device-icon' src={ios} /><br />
              <button className='btn btn-primary'>iOS</button><br />
              <strong>Get the app</strong>
            </div>
            <div className='col-md-3'>
              <img className='device-icon' src={android} /><br />
              <button className='btn btn-primary'>Android</button><br />
              <strong>Get the app</strong>
            </div>
            <div className='col-md-3'>
              <img className='device-icon' src={web} /><br />
              <button className='btn btn-secondary'>Web (beta)</button><br />
              <strong>Get the app</strong>
            </div>
            <div className='col-md-3'>
              <img className='device-icon' src={osx} /><br />
              <button className='btn btn-secondary'>OS X (beta)</button><br />
              <strong>Get the app</strong>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Roadmap
