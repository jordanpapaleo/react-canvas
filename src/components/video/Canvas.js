import React, { Component } from 'react'

class Canvas extends Component {
  constructor (props) {
    super(props)


    /*
    - Canvas width and height same as video and passed in as props
    - Visibility goes hidden on the same event that shows the video
    - Canvas opens and closes on scroll until hidden
    - aboslute and visible until play event, then fixed and hidden
    */
  }

  componentWillReceiveProps (props) {
    const video = (this.props.video) ? this.props.video.getDOMNode() : null;
    const canvas = this.refs['canvas'].getDOMNode()
    const context = canvas.getContext('2d')

    if (context && video) {
      context.fillRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
      context.drawImage(video, 0, 0, this.props.canvasWidth, this.props.canvasHeight)
    }
  }

  render () {
    console.log('this.props', this.props)

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
