import React from 'react'
import './ItinerariesPanel.scss'
import ItineraryPanel from '../../Itinerary/components/ItineraryPanel'

class ItinerariesPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="itineraries-panel-container">
        {
          this.props.itineraries.map((itinerary) => {
            return (
              <ItineraryPanel key={ itinerary.id } itinerary={itinerary} />
            )
          })
        }
      </div>
    )
  }

}

export default ItinerariesPanel
