import React, { Component } from 'react'

import Header from './header'
import Home from './home'
import Roadmap from './roadmap'
import Touch from './touch'
import VideoController from './video'
import Footer from './footer'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.renderVideoSection = this.renderVideoSection.bind(this)
  }

  componentWillMount () {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    })
  }

  render () {
    return (
      <div>
        <Header />
        <Home />
        {this.renderVideoSection()}
        <Touch />
        <Roadmap />
        <Footer />
      </div>
    )
  }

  renderVideoSection () {
    var vid

    if (this.state.windowWidth > 768) {
      vid = <VideoController windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight} />
    }

    return vid
  }
}

export default App
