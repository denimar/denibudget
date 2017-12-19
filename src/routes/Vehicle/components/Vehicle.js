import React from 'react'
import './Vehicle.scss'
import image from '../../../images/vehicle-lateral.png'

class Vehicle extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="vehicle-container">
        <div className="vehicle-image-container">
          <img className="vehicle-image" src={ image } />
          <span className="vehicle-prefix-label">{ this.props.vehiclePrefix }</span>
          <span className="company-label">{ this.props.companyInitials }</span>
        </div>
      </div>
    )
  }

}

export default Vehicle
