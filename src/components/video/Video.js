import React, { Component, PropTypes } from 'react'

class Video extends Component {
  static get propTypes () {
    isPlaying: PropTypes.bool.isRequired
  }

  static get defaultProps () {
    isPlaying: undefined
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.video = this.refs['video'].getDOMNode()
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
      width: window.innerWidth,
      height: window.innerHeight,
      top: 0,
      zIndex: 2
    }

    const vidSrc = require('../../assets/bindmovie.mp4')

    return (
      <div className='videoContainer' id='videoContainer' style={containerStyle}>
        <video ref='video' loop='loop' style={{width: '100%'}}>
          <source src={vidSrc} type='video/mp4' />
          Your browser does not support HTML5 video.
        </video>
      </div>
    )
  }
}

export default Video
