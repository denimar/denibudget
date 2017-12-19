import React from 'react'
import './ItineraryPanel.scss'
import Trips from '../../Trips/components/Trips'
import FaRefresh from 'react-icons/lib/fa/refresh';
import FaClose from 'react-icons/lib/fa/close';
import TiRefresh from 'react-icons/lib/ti/refresh';

class ItineraryPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  refreshButtonClick() {
    alert('TODO: implement itinerary panel refresh button click')
  }

  closeButtonClick() {
    alert('TODO: implement itinerary panel close button click')
  }

  render() {
    return (
      <div className="itinerary-panel-container">
        <div className="itinerary-panel">
          <div className="itinerary-panel-header">
            <span className="itinerary-panel-header-title">{ `${this.props.itinerary.route} - ${this.props.itinerary.direction}` }</span>
            <div className="itinerary-panel-action-buttons">
              <FaRefresh className="itinerary-panel-action-button" onClick={ this.refreshButtonClick.bind(this) } />
              <FaClose className="itinerary-panel-action-button" onClick={ this.closeButtonClick.bind(this) } />
            </div>
          </div>
          <div className="itinerary-panel-body">
            <Trips trips={ this.props.itinerary.trips } />
          </div>
        </div>
      </div>
    )
  }

}

export default ItineraryPanel
