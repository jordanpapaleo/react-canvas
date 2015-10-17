import React, { Component } from 'react'
import {VIDEO_WIDTH, VIDEO_HEIGHT} from '../../constants/VideoConstants.js'

class Canvas extends Component {
  constructor (props) {
    super(props)

    const ratio = VIDEO_WIDTH / VIDEO_HEIGHT
    const currentRatio = this.props.componentWidth / this.props.componentHeight
    const isLandscape = (ratio < currentRatio)
    let width, height, offsetX, offsetY, x, y

    if (isLandscape) {
      width = this.props.componentWidth
      height = this.props.componentWidth / ratio
      offsetX = 0
      offsetY = (this.props.componentHeight - height) * 0.5
      x = (width / 2)
      y = height / 2
    } else {
      width = this.props.componentHeight * ratio
      height = this.props.componentHeight
      offsetX = (this.props.componentWidth - width)  * 0.5
      offsetY = 0
      x = width / 2
      y = (height / 2)
    }


    this.state = { VIDEO_WIDTH, VIDEO_HEIGHT, width, height, offsetX, offsetY, x, y }

    /*
    - Canvas width and height same as video and passed in as props
    - Visibility goes hidden on the same event that shows the video
    - Canvas opens and closes on scroll until hidden
    - aboslute and visible until play event, then fixed and hidden
    */
  }

  componentDidMount () {
    const canvas = this.refs['canvas'].getDOMNode()
    const context = canvas.getContext('2d')

    this.setState({
      canvas,
      context
    })
  }

  componentWillReceiveProps (props) {
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
    if (!this.state.video && this.props.video) {
      this.setState({
        video: this.props.video.getDOMNode()
      })
    }

    if (this.state.video && this.props.inView) {
      const { context, video, width, height, x, y } = this.state
      let r = this.props.inView

      context.save()
      context.drawImage(video, 0, 0, width, height)
      context.globalCompositeOperation = 'destination-in'
      context.beginPath()
      context.arc(x, y, r, 0, Math.PI * 2, false)
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
