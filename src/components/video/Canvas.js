import React, { Component } from 'react'

class Canvas extends Component {
  constructor (props) {
    super(props)

    this.state = {}


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
      context,
      width: canvas.clientWidth,
      height: canvas.clientHeight,
      x: canvas.clientWidth / 2,
      y: canvas.clientHeight / 2
    })
  }

  componentWillReceiveProps (props) {
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
    console.log('Canvas', props.inView)

    if(!this.state.video && this.props.video) {
      this.setState({
        video: this.props.video.getDOMNode()
      })
    }

    if(this.state.video && this.props.inView) {
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
      position: (this.props.isPlaying) ? 'fixed' : 'absolute',
      top: this.props.offsetY,
      left: 0,
      overflow: 'hidden',
      visibility: (this.props.isPlaying) ? 'hidden' : 'visible'
    }

    return (
      <canvas ref='canvas' width={this.props.canvasWidth} height={this.props.canvasHeight} style={style} />
    )
  }
}

export default Canvas
