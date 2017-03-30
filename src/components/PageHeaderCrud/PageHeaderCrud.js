import React from 'react'
import './PageHeaderCrud.scss'
import FaPlusCircle from 'react-icons/lib/fa/plus-circle'

class PageHeaderCrud extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-header-crud-viewport">
        <div className="buttons">
          <div className="header-button" onClick={this.props.newRecordButtonClick}>
            <div className="button">
              <FaPlusCircle color='#006699' size="22" />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

PageHeaderCrud.propTypes = {
  newRecordButtonClick: React.PropTypes.func
}

export default PageHeaderCrud
