import React from 'react';
import Trip from '../components/Trip';
import './TripExamples.scss'

class TripExamples extends React.Component {

  tripObj() {
    return {
      id: 1,
      arrivalTime: '10:18',
      departureTime: '10:30',
      vehicle: {
        prefix: '65489',
        companyInitials: 'TRANS'
      }
    };
  }

  render() {
    return (
      <div className="trip-example-container">
        <Trip trip={ this.tripObj() } />
      </div>
    );
  }

}

export default TripExamples
