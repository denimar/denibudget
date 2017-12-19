import React from 'react'
import './Trips.scss'
import Trip from '../../Trip/components/Trip'

class Trips extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="trips-container">
        {
          this.props.trips.map(trip => {
            return (
              <Trip key={ trip.id } trip={trip} />
            )
          })
        }
      </div>
    )
  }

}

export default Trips
