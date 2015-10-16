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
  }

  render () {
    return (
      <div>
        <Header />
        <Home />
        <VideoController />
        <Touch />
        <Roadmap />
        <Footer />
      </div>
    )
  }
}

export default App
