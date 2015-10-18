import React, { Component } from 'react'
import PositionObserver from '../../PositionObserver'

class Footer extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    let positions = PositionObserver.observable
    const node = this.refs.footer.getDOMNode()
    positions['footer'] = node.offsetTop
    PositionObserver.update(positions)
  }

  render () {
    const style = {
      'WebkitTransform': 'rotate(-90deg)',
      'MozTransform': 'rotate(-90deg)',
      'msTransform': 'rotate(-90deg)'
    }

    const footerStyle = {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      zIndex: -1
    }

    return (
      <footer ref='footer' className='footer' style={footerStyle}>
        <nav className='navbar footer-main-nav' role='navigation'>
          <ul className='nav navbar-nav navbar-center'>
            <li className='nav-item'>
              <a href='#' className='nav-link'>
                <span aria-hidden='true' className='iconic iconic-md iconic-social-twitter'></span><br />@bind
              </a>
            </li>
            <li className='nav-item'>
              <a href='#' className='nav-link'>
                <span aria-hidden='true' className='iconic iconic-social-facebook'></span><br />Bind
              </a>
            </li>
            <li className='nav-item'>
              <a href='#' className='nav-link'>
                <span aria-hidden='true' style={style} className='iconic iconic-action-redo'></span><br />help
              </a>
            </li>
            <li className='nav-item'>
              <a href='#' className='nav-link'>
                <span aria-hidden='true' className='iconic iconic-cloud-transfer-download'></span><br />Press kit
              </a>
            </li>
            <li className='nav-item'>
              <a href='#' className='nav-link'>
                <span aria-hidden='true' className='iconic iconic-envelope-closed'></span><br />mail
              </a>
            </li>
          </ul>
        </nav>

        <nav className='navbar footer-sub-nav' role='navigation'>
          <ul className='nav navbar-nav navbar-center'>
            <li className='nav-item'>
              <a className='nav-link'>&copy; Bind, 2015</a>
            </li>
            <li className='nav-item'>
              <a href='#' className='nav-link special'>Privacy</a>
            </li>
            <li className='nav-item'>
              <a href='#' className='nav-link special'>Terms</a>
            </li>
          </ul>
        </nav>
      </footer>
    )
  }
}

export default Footer
