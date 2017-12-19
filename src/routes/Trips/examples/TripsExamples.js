import React from 'react';
import Trips from '../components/Trips';
import './TripsExamples.scss'

class TripsExamples extends React.Component {

  tripsArray() {
    return [
      {
        id: 1,
        arrivalTime: '04:50',
        departureTime: '05:00',
        vehicle: {
          prefix: '65489',
          companyInitials: 'TRANS'
        }
      },
      {
        id: 2,
        arrivalTime: '07:00',
        departureTime: '07:18',
        vehicle: {
          prefix: '15987',
          companyInitials: 'INSU'
        }
      },
      {
        id: 3,
        arrivalTime: '09:02',
        departureTime: '09:05',
        vehicle: {
          prefix: '65412',
          companyInitials: 'TRANS'
        }
      },
      {
        id: 4,
        arrivalTime: '10:08',
        departureTime: '10:05',
        vehicle: {
          prefix: '5486',
          companyInitials: 'ESTR'
        }
      },
      {
        id: 5,
        arrivalTime: '10:50',
        departureTime: '11:00',
        vehicle: {
          prefix: '3189',
          companyInitials: 'TRANS'
        }
      },
      {
        id: 6,
        arrivalTime: '12:30',
        departureTime: '12:45',
        vehicle: {
          prefix: '29578',
          companyInitials: 'ENFLO'
        }
      }
    ]
  }

  render() {
    return (
      <div className="trips-example-container">
        <Trips trips={ this.tripsArray() } />
      </div>
    );
  }

}

export default TripsExamples
