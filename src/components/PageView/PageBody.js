import React from 'react'
import './PageBody.scss'

class PageBody extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-body-viewport">
        <div className="page-body-container">
          <div className="page-body-view">
            <div className="header">
              {this.props.header}
            </div>
            <div className="body">
              {this.props.body}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default PageBody
