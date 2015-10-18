import React, { Component, PropTypes } from 'react'
import {VIDEO_WIDTH, VIDEO_HEIGHT} from '../../constants/VideoConstants.js'
import RatioUtil from '../../RatioUtil.js'

class Canvas extends Component {
  static get propTypes () {
    return {
      isPlaying: PropTypes.bool.isRequired,
      componentWidth: PropTypes.number.isRequired,
      componentHeight: PropTypes.number.isRequired,
      inView: PropTypes.bool.isRequired
      // yOffset:
      // video
    }
  }

  constructor (props) {
    super(props)
    let dimensions = RatioUtil.getDimensions(VIDEO_WIDTH, VIDEO_HEIGHT, this.props.componentWidth, this.props.componentHeight)
    this.state = dimensions
  }

  componentDidMount () {
    const canvas = this.refs['canvas'].getDOMNode()
    const context = canvas.getContext('2d')
    this.setState({ canvas, context })
  }

  componentWillReceiveProps (props) {
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
    if (!this.state.video && this.props.video) {
      this.setState({
        video: this.props.video.getDOMNode()
      })
    }

    if (this.state.video && this.props.inView) {
      const { context, video, width, height, xCenter, yCenter } = this.state

      let radius = this.props.inView

      context.save()
      context.drawImage(video, 0, 0, width, height)
      context.globalCompositeOperation = 'destination-in'
      context.beginPath()
      context.arc(xCenter, yCenter, radius, 0, Math.PI * 2, false)
      context.fill()
      context.restore()
    }
  }

  render () {
    const style = {
      marginLeft: this.state.offsetX,
      marginTop: this.state.offsetY,
      position: (this.props.isPlaying) ? 'fixed' : 'absolute',
      top: this.props.offsetY,
      left: 0,
      overflow: 'hidden',
      visibility: (this.props.isPlaying) ? 'hidden' : 'visible'
    }

    return (
      <canvas ref='canvas' style={style} width={this.state.width} height={this.state.height} />
    )
  }
}

export default Canvas
