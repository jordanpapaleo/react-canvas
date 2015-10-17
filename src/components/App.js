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

    this.renderVideoSection = this.renderVideoSection.bind(this)
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

    if(window.innerWidth > 768) {
      vid = <VideoController />
    }

    return vid
  }
}

export default App
