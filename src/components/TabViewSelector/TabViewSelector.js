import React from 'react'
import './TabViewSelector.scss';

class TabViewSelector extends React.Component {

  constructor() {
    super();
    this.state = {
      tabIndex: 0
    }
  }

  TabViewSelectorItemClick(tabIndex) {
    this.setState({
      tabIndex: tabIndex
    })
  }

  render() {

    return (
      <div className="tab-view-selector-container">
        <div className="tab-view-selector">
          <div className="tab-view-selector-label">visão :</div>
          <div className={'tab-view-selector-item' + (this.state.tabIndex === 0 ? ' selected' : '')} onClick={ this.TabViewSelectorItemClick.bind(this, 0) }>Fluxo</div>
          <div className={'tab-view-selector-item' + (this.state.tabIndex === 1 ? ' selected' : '')} onClick={ this.TabViewSelectorItemClick.bind(this, 1) }>Concluídas</div>
        </div>
      </div>
    )

  }

}

export default TabViewSelector;
