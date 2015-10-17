import React, { Component, PropTypes } from 'react'
import {VIDEO_WIDTH, VIDEO_HEIGHT} from '../../constants/VideoConstants.js'

class Video extends Component {
  static get propTypes () {
    return {
      isPlaying: PropTypes.bool.isRequired
    }
  }

  static get defaultProps () {
    return {
      isPlaying: undefined
    }
  }

  constructor (props) {
    super(props)
    this.state = { VIDEO_WIDTH, VIDEO_HEIGHT }

    this.fullBleedVideo = this.fullBleedVideo.bind(this)
  }

  componentDidMount () {
    this.video = this.refs['video'].getDOMNode()
  }

  fullBleedVideo () {
/*    const videoNode = React.getDOMNode(this.refs['video'])
    let width = video.clientWidth
    let height = video.clientHeight*/
  }

  render () {
    if (this.props.isPlaying && this.video) {
      this.video.play()
    } else if (!this.props.isPlaying && this.video) {
      this.video.pause()
    }

    const containerStyle = {
      visibility: (this.props.isPlaying) ? 'visible' : 'hidden',
      position: 'fixed',
      width: this.props.componentWidth,
      height: this.props.componentHeight,
      top: 0,
      zIndex: 2,
      overflow: 'hidden'
    }

    const vidSrc = require('../../assets/bindmovie.mp4')

    const ratio = VIDEO_WIDTH / VIDEO_HEIGHT
    const currentRatio = this.props.componentWidth / this.props.componentHeight
    const isLandscape = (ratio < currentRatio)
    let width, height, offsetX, offsetY

    if (isLandscape) {
      width = this.props.componentWidth
      height = this.props.componentWidth / ratio
      offsetX = (this.props.componentWidth - width) * -0.5
      offsetY = 0
    } else {
      width = this.props.componentHeight * ratio
      height = this.props.componentHeight
      offsetX = 0
      offsetY = (this.props.componentHeight - height)  * -0.5
    }

    const videoStyle = {
      width,
      height,
      marginLeft: offsetX,
      marginTop: offsetY
    }

    return (
      <div className='videoContainer' id='videoContainer' style={containerStyle}>
        <video ref='video' style={videoStyle}>
          <source src={vidSrc} type='video/mp4' />
          Your browser does not support HTML5 video.
        </video>
      </div>
    )
  }
}

export default Video
