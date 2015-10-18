import React, { Component, PropTypes } from 'react'
import TimelineMax from 'gsap/src/uncompressed/TimelineMax.js'
import PositionObserver from '../../PositionObserver'
import ProgressObserver from '../../ProgressObserver'
import Canvas from './Canvas'
import Video from './Video'
import SideMenu from './SideMenu'
import Statement from './Statement'

var statementScrollPos = 0
var lastScrollPos
var timer

const ViewportMetrics = require('react/lib/ViewportMetrics')

class VideoController extends Component {
  static get propTypes () {
    return {
      windowWidth: PropTypes.number.isRequired,
      windowHeight: PropTypes.number.isRequired
    }
  }

  static get defaultProps () {
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }
  }

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
    this.statementScrolling = this.statementScrolling.bind(this)
    this.menuScrolling = this.menuScrolling.bind(this)
    this.initTimeline = this.initTimeline.bind(this)

    this.videoDone = this.videoDone.bind(this)
  }

  componentWillMount () {
    PositionObserver.subscribe((positions) => {
      this.setState({positions})
    })

    ProgressObserver.subscribe((i) => {
      let progress = 0

      switch (i) {
        case 1:
          progress = 0
          break
        case 2:
          progress = 0.25
          break
        case 3:
          progress = 0.5
          break
        case 4:
          progress = 0.75
          break
        default:
          progress = 0
      }

      console.log('progress', progress)

      // this.state.timeline.progress(progress)
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

    this.initTimeline()
  }

  initTimeline () {
    let timeline = new TimelineMax()

    let s0 = React.findDOMNode(this.refs['statement0'])
    let s1 = React.findDOMNode(this.refs['statement1'])
    let s2 = React.findDOMNode(this.refs['statement2'])
    let s3 = React.findDOMNode(this.refs['statement3'])

    const transitionIn = {
      top: window.innerHeight / 2,
      ease: Circ.easeOut
    }

    const transitionOut = {
      top: window.innerHeight * -0.25,
      ease: Circ.easeIn
    }

    const duration = 0.75
    const delay = '+=5'

    timeline.to(s0, duration, transitionIn, '+=.5').to(s0, duration, transitionOut, delay)
    timeline.to(s1, duration, transitionIn).to(s1, duration, transitionOut, delay)
    timeline.to(s2, duration, transitionIn).to(s2, duration, transitionOut, delay)
    timeline.to(s3, duration, transitionIn).to(s3, duration, transitionOut, delay)

    timeline.pause()

    this.setState({
      timeline
    })

    this.screenShotVideo(null)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  // bottomBoundary is optional
  screenShotVideo (bottomBoundary) {
    let vidComponent = this.refs['video-componet']

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
    if (!this.state.positions) {
      return
    }

    const scrollBottom = scrollTop + window.innerHeight
    const topVidController = this.state.positions.videoController
    const bottomBoundary = this.state.positions.touch - this.state.windowHeight

    // Order of these is specific to state, do not change
    if (scrollTop > bottomBoundary) {
      const scrolledInView = this.state.positions.touch - scrollTop

      this.setState({
        canvasInView: (scrolledInView >= 0) ? scrolledInView : 0
      })
    } else if (scrollBottom > topVidController) {
      let scrolledInView = scrollBottom - topVidController
      this.setState({
        canvasInView: scrolledInView
      })
    } else {
      this.setState({
        canvasInView: 0
      })
    }
  }

  statementScrolling (scrollPos) {
    // On scroll end event
    /* if (timer) {
      clearTimeout(timer)
      //then play
    }
    timer = setTimeout(() => {
      this.state.timeline.play()
    }, 150)
    */
    if (!this.state.positions) {
      return
    }

    if (!lastScrollPos) {
      lastScrollPos = scrollPos
    }

    this.state.timeline.pause()

    const topBoundary = this.state.positions.videoController
    const bottomBoundary = this.state.positions.touch - this.state.windowHeight

    // math is not interger base so we reset the timeline when above the start
    if (scrollPos < topBoundary) {
      this.state.timeline.restart()
      statementScrollPos = 0
    }

    if (scrollPos > topBoundary && scrollPos < bottomBoundary) {
      // the physical pixel distance that needs to be covered during the timeline
      const scrollDistance = bottomBoundary - topBoundary

      // TimelineMax uses a time scale of 0 - 1
      // tick is that percentage of time / the distance needed to cover
      const scrollTick = 1 / scrollDistance

      let scrollDiff = Math.abs(scrollPos - lastScrollPos)
      let timelineDiff = scrollDiff * scrollTick

      // if scrolling up or down
      if (scrollPos >= lastScrollPos) {
        statementScrollPos += timelineDiff
      } else if (scrollPos < lastScrollPos) {
        statementScrollPos -= timelineDiff
      }

      // set max and min scroll
      if (statementScrollPos > 1) {
        statementScrollPos = 1
      } else if (statementScrollPos < 0) {
        statementScrollPos = 0
      }

      console.log('statement scroll', statementScrollPos)

      this.state.timeline.progress(statementScrollPos)
    }

    lastScrollPos = scrollPos
  }

  menuScrolling () {

  }

  onScroll (e) {
    let scrollTop = ViewportMetrics.currentScrollTop
    this.canvasScrolling(scrollTop)
    this.statementScrolling(scrollTop)

    this.setState({ scrollTop })

    let topBoundary = this.state.positions.videoController
    let bottomBoundary = this.state.positions.touch - this.state.windowHeight

    if (scrollTop > topBoundary && scrollTop < bottomBoundary) {
      // Only hit play once
      if (!this.state.isPlaying) {
        this.setState({
          isPlaying: true
        })
      }
    } else {
      // only pause once
      if (this.state.isPlaying) {
        this.setState({
          isPlaying: false
        })
      }

      if (scrollTop >= bottomBoundary) {
        // Changes the absolute position of the canvas
        this.screenShotVideo(bottomBoundary)
      } else {
        // Uses the default 0 absolute position for canvas
        this.screenShotVideo()
      }
    }
  }

  videoDone () {
    console.info('Video done from parent', this.state)

    window.scrollTo(0, this.state.positions.touch - window.innerHeight)

    this.setState({
      isPlaying: false
    })
  }

  render () {
    let statements = []
    this.state.statements.forEach((statement, i) => {
      statements.push(
        <Statement key={i} ref={`statement${i}`} text={statement} isPlaying={this.state.isPlaying} />
      )
    })

    const style = {
      height: 2000,
      backgroundColor: '#221F26',
      position: 'relative',
      overflow: 'hidden'
    }

    return (
      <div ref='videoController' className='video-controller' style={style}>
        <Canvas video={this.state.video} inView={this.state.canvasInView} componentWidth={this.props.windowWidth} componentHeight={this.props.windowHeight} offsetY={this.state.offsetY} isPlaying={this.state.isPlaying} />
        <Video
          ref='video-componet'
          isPlaying={this.state.isPlaying}
          componentWidth={this.props.windowWidth}
          componentHeight={this.props.windowHeight}
          completeHandler={this.videoDone}
          />
        {statements}
        <SideMenu items={this.state.menuItems} isPlaying={this.state.isPlaying} />
      </div>
    )
  }
}

export default VideoController
