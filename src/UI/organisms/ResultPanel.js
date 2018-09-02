import React, {Component} from 'react'
import { connect } from 'react-redux'
import Item from '../molecules/Item'
import Pagination from '../atoms/Pagination'
import './ResultPanel.css'

class ResultPanel extends Component {
  render() {
    let {hits} = this.props
    let renderSearchResult = hits && hits.map((item, index) => <Item key={index} index={index} item={item} showImage={true} showCategory={true} />)
    return (<div className="resultpanel-wrapper">
      <div className="result">{renderSearchResult}</div>
      <div>
        {/* <Pagination pages={50} current={1} /> */}
      </div>
    </div>)
  }
}

const mapStateToProps = state => ({
  hits: state.reducer.hits
})

export default connect(mapStateToProps)(ResultPanel)