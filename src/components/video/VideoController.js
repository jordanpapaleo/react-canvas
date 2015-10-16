import React, { Component } from 'react'
import PositionObserver from '../../PositionObserver'
import Canvas from './Canvas'
import Video from './Video'
import SideMenu from './SideMenu'
import Statement from './Statement'

const ViewportMetrics = require('react/lib/ViewportMetrics')

class VideoController extends Component {
  constructor (props) {
    super(props)

    this.state = {
      statements: [
        'NATURAL NAVIGATION, EVERYTHING YOU NEED WITHIN THE REACH OF YOUR THUMB',
        'LIVE CARDS QUICKLY KEEP TRACK OF EVERYTHING IMPORTANT AND MOVE PROJECTS FORWARD',
        'USE INTELLIGENT SHORTCODES TO INVITE, GENERATE, CALCULATE AND MORE FROM ONE PLACE',
        'LIKE PEOPLE ARE SITTING NEXT TO YOU. COMMUNICATE AND COLLABORATE IN REAL-TIME'
      ],
      menuItems: [
        'SMART TOUCH',
        'LIVE CARDS',
        'ACTIVE TYPE',
        'REAL-TIME'
      ]
    }

    this.onScroll = this.onScroll.bind(this)
    this.screenShotVideo = this.screenShotVideo.bind(this)
    this.canvasScrolling = this.canvasScrolling.bind(this)
  }

  componentWillMount () {
    PositionObserver.subscribe((positions) => {
      console.log('VideoController', positions)
      this.setState({positions})
    })

    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    })
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScroll, false)

    let positions = PositionObserver.observable
    const node = this.refs.videoController.getDOMNode()
    positions['videoController'] = node.offsetTop
    positions['viewportY'] = window.innerHeight
    PositionObserver.update(positions)

    this.screenShotVideo(null)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  // bottomBoundary is optional
  screenShotVideo (bottomBoundary) {
    let vidComponent = this.refs['video-componet']
    let videoNode = vidComponent.refs.video.getDOMNode()

    if (bottomBoundary && this.state.positions) {
      this.setState({
        offsetY: bottomBoundary - this.state.positions.videoController,
        video: vidComponent.refs.video
      })
    } else {
      this.setState({
        offsetY: 0,
        video: vidComponent.refs.video
      })
    }
  }

  canvasScrolling (scrollTop) {
    if(!this.state.positions) {
      return
    }

    const scrollBottom = scrollTop + window.innerHeight
    const topVidController = this.state.positions.videoController

    if (scrollBottom > topVidController) {
      let scrolledIntoView = scrollBottom - topVidController
      this.setState({
        canvasInView: scrolledIntoView
      })
    } else {
      this.setState({
        canvasInView: 0
      })
    }
  }

  onScroll (e) {
    let scrollTop = ViewportMetrics.currentScrollTop
    this.canvasScrolling(scrollTop)

    this.setState({ scrollTop })

    let topBoundary = this.state.positions.videoController
    let bottomBoundary = this.state.positions.touch - this.state.windowHeight

    if (scrollTop > topBoundary && scrollTop < bottomBoundary) {
      // Only hit play once
      if(!this.state.isPlaying) {
        this.setState({
          isPlaying: true
        })
      }
    } else {
      // only pause once
      if(this.state.isPlaying) {
        this.setState({
          isPlaying: false
        })
      }

      if(scrollTop >= bottomBoundary) {
        // Changes the absolute position of the canvas
        this.screenShotVideo(bottomBoundary)
      } else {
        // Uses the default 0 absolute position for canvas
        this.screenShotVideo()
      }
    }
  }

  render () {
    const style = {
      height: 5000,
      backgroundColor: 'orange',
      position: 'relative'
    }

    return (
      <div ref='videoController' className='video-controller' style={style}>
        <Canvas video={this.state.video} inView={this.state.canvasInView} canvasWidth={1320} canvasHeight={724} offsetY={this.state.offsetY} isPlaying={this.state.isPlaying} />
        <Video ref='video-componet' isPlaying={this.state.isPlaying} />

        {this.state.statements.map((statement) => {
          <Statement message={statement} />
        })}

        <SideMenu items={this.state.menuItems} />
      </div>
    )
  }
}

export default VideoController
