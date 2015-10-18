import React, { Component, PropTypes } from 'react'
import {VIDEO_WIDTH, VIDEO_HEIGHT} from '../../constants/VideoConstants.js'
import RatioUtil from '../../RatioUtil.js'

class Video extends Component {
  static get propTypes () {
    return {
      isPlaying: PropTypes.bool.isRequired,
      componentWidth: PropTypes.number.isRequired,
      componentHeight: PropTypes.number.isRequired
    }
  }

  componentDidMount () {
    this.video = this.refs['video'].getDOMNode()
    this.video.onended = () => {
      this.props.completeHandler()
    }
  }

  render () {
    // const vidSrc = require('../../assets/bindmovie.mp4')
    const vidSrc = require('../../assets/small.mp4')

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

    let dimensions = RatioUtil.getDimensions(VIDEO_WIDTH, VIDEO_HEIGHT, this.props.componentWidth, this.props.componentHeight)

    const videoStyle = {
      width: dimensions.width,
      height: dimensions.height,
      marginLeft: dimensions.offsetX,
      marginTop: dimensions.offsetY
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
