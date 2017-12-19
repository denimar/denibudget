import React from 'react';
import Vehicle from '../components/Vehicle';
import './VehicleExamples.scss'

class VehicleExamples extends React.Component {

  render() {
    return (
      <div className="example-container">
        <Vehicle vehiclePrefix="6325" companyInitials="ENFLO" />
      </div>
    );
  }

}

export default VehicleExamples
