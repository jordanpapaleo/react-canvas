import React, { Component, PropTypes } from 'react'

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
    this.state = {
      VID_WIDTH: 640,
      VID_HEIGHT: 360
    }

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

    const ratio = this.state.VID_WIDTH / this.state.VID_HEIGHT
    let videoWidth = ratio * this.props.componentWidth
    let videoHeight = this.props.componentHeight
    let videoOffset = videoWidth - this.props.componentWidth

    const videoStyle = {
      width: videoWidth,
      height: videoHeight,
      marginLeft: videoOffset * -0.5
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
