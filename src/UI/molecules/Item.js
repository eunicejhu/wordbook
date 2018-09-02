import React, {Component} from 'react'
import ReactImageFallback from "react-image-fallback"
import { IMG_FAILURE_LOADING} from '../../constants'
import './Item.css'

class Item extends Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    let {index} = this.props
    setTimeout(() => {
      this.setState({
        show:true
      })
    }, index * 100)
  }

  render() {
    let {show} = this.state
    let {category, image, link, name} = this.props.item
    let {showImage, showCategory} = this.props
    return (<a href={link} target="_blank" title={name} className={`item-wrapper ${show ? 'show' : ''}`}>
      {showImage &&  <ReactImageFallback
        src={image}
        fallbackImage={IMG_FAILURE_LOADING}
        initialImage={IMG_FAILURE_LOADING}
        className="image" />}
      <div className="name">{name}</div>
      <div className="bottom">
        {showCategory && <div className="category">{category}</div>}
      </div>
    </a>)
  }
}

export default Item