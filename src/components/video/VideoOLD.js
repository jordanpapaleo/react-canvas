import React, { Component } from 'react'
import TweenMax from 'gsap/src/minified/TweenMax.min.js'
import classnames from 'classnames'
const ViewportMetrics = require('react/lib/ViewportMetrics')

class Video extends Component {
  constructor (props) {
    super(props)

    this.CONSTS = {
      videoPlayAt: 628,
      videoPauseAt: 1410,
      topNavWidth: 65,
      videoSectionTopPadding: 90
    }

    this.state = {
      scrollTop: 0,
      isPlaying: false,
      hasPlayed: false
    }

    this.state.styles = {}

    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.renderOverlays = this.renderOverlays.bind(this)
    this.renderMenu = this.renderMenu.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScroll, false)
    this.video = this.refs['my-video'].getDOMNode()


    this.height = this.video.clientHeight
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  onScroll (e) {
    var scrollTop = ViewportMetrics.currentScrollTop

    this.setState({
      scrollTop: scrollTop
    })

    if (scrollTop > this.CONSTS.videoPlayAt && scrollTop < this.CONSTS.videoPauseAt) {
      if (!this.state.isPlaying) {
        this.setState({
          isPlaying: true,
          hasPlayed: true,
          styles: {
            position: 'fixed',
            left: 0,
            top: this.CONSTS.topNavWidth + this.CONSTS.videoSectionTopPadding
          }
        })

        this.play()
      }
    } else if (this.state.hasPlayed && this.state.isPlaying) {
      this.setState({
        styles: {
          position: 'absolute',
          left: 0,
          top: scrollTop + this.CONSTS.topNavWidth + this.CONSTS.videoSectionTopPadding
        }
      })

      this.setState({
        isPlaying: false
      })

      this.pause()
    }
  }

  play () {
    if (this.video) {
      this.video.play()
    }
  }

  pause () {
    if (this.video) {
      this.video.pause()
    }
  }

  render () {
    const video = require('../../assets/bindmovie.mp4')
    console.log('this', this)

    return (
      <section className='video' style={{height: this.CONSTS.videoPauseAt + 180}}>
        <video ref='my-video' style={this.state.styles}>
          <source src={video} type='video/mp4' />
          Your browser does not support HTML5 video.
        </video>
        {this.renderMenu()}
        {this.renderOverlays()}
      </section>
    )
  }

  renderMenu () {
    return (
      <div className='vid-menu' style={this.state.styles}>
        <button type='button' className='btn btn-link' data-refMatch='1' onClick={this.showStatement}>SMART TOUCH</button><br />
        <button type='button' className='btn btn-link' data-refMatch='2'>LIVE CARDS</button><br />
        <button type='button' className='btn btn-link' data-refMatch='3'>ACTIVE TYPE</button><br />
        <button type='button' className='btn btn-link' data-refMatch='4'>REAL-TIME</button>
      </div>
    )
  }

  renderOverlays () {
    const blar = [
      'NATURAL NAVIGATION, EVERYTHING YOU NEED WITHIN THE REACH OF YOUR THUMB',
      'LIVE CARDS QUICKLY KEEP TRACK OF EVERYTHING IMPORTANT AND MOVE PROJECTS FORWARD',
      'USE INTELLIGENT SHORTCODES TO INVITE, GENERATE, CALCULATE AND MORE FROM ONE PLACE',
      'LIKE PEOPLE ARE SITTING NEXT TO YOU. COMMUNICATE AND COLLABORATE IN REAL-TIME'
    ]

    var statements = blar.map(function (statement, i) {
      return <Statement ref={i} statement={statement} />
    })

    return (
      <div>
        {statements}
      </div>
    )
  }
}

class Statement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      styles: {
        position: 'fixed',
        top: window.innerHeight,
        color: 'hotpink',
        width: 250,
        marginRight: 'auto',
        marginLeft: 'auto'
      }
    }

    this.show = this.show.bind(this)
  }

  show () {
    let styles = this.state.styles
    styles['visibility'] = 'visible'
    this.setState({ styles })

    var node = React.findDOMNode(this)
    console.log('node', node)

    TweenMax.to(node, 250, {y: window.scrollY - (window.innerHeight / 2)})
  }

  render () {
    /*setTimeout(() => {
      this.show()
    }, 2000)*/

    return (
      <div className='video-overlay' style={this.state.styles}>
        {this.props.statement}
      </div>
    )
  }
}

export default Video
