import React from 'react'
import Header from '../../components/Header'
import TabViewSelector from '../../components/TabViewSelector'
import ChipsStationSelector from '../../components/ChipsStationSelector'
import './CoreLayout.scss'
import '../../styles/core.scss'

class CoreLayout extends React.Component {

  render() {
    return (
      <div className='core-layout'>
        <Header />
        <TabViewSelector />
        <ChipsStationSelector />
        <div className='core-layout-viewport'>
          { this.props.children }
        </div>
      </div>
    )
  }

}

export default CoreLayout
