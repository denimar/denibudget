import React from 'react'
import './Trip.scss'
import Vehicle from '../../Vehicle/components/Vehicle'
import FaArrowRight from 'react-icons/lib/fa/arrow-right';
import FaLongArrowRight from 'react-icons/lib/fa/long-arrow-right';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';

class Trip extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    let vehicle = this.props.trip.vehicle || {};
    return (
      <div className="trip-container">
        <div className="vehicle-container">
          <Vehicle vehiclePrefix={ vehicle.prefix } companyInitials={ vehicle.companyInitials } />
        </div>
        <div className="trip-info-container">
          <span className="arrival-time-label">{ this.props.trip.arrivalTime }</span>
          <MdArrowForward className="trip-time-separator" />
          <span className="departure-time-label">{ this.props.trip.departureTime }</span>
        </div>
      </div>
    )
  }

}

export default Trip
