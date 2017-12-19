import React from 'react';
import './ChipsStationSelector.scss';
import stationsJson from './stations.json';
import FaCheckSquareO from 'react-icons/lib/fa/check-square-o';
import FaCog from 'react-icons/lib/fa/cog';

class ChipsStationSelector extends React.Component {

  stationSelectorButtonClick() {
    alert('TODO: Implement here a dialog window which will be used to select terminals');
  }

  render() {
    return (
      <div className="chips-station-selector-container">
        <div className="chips-station-selector-title">Terminais:</div>      
        <div className="chips-station-selector">
          <div className="chips-station-selector-items">
            {
              stationsJson.stations.station.map(station => {
                return (
                  <div className="chips-station-selector-item">{ station.code }</div>
                )
              })
            }
            <FaCog className="chips-station-selector-chooser" onClick={ this.stationSelectorButtonClick.bind(this) } />
          </div>
        </div>
      </div>
    )
  }

}

export default ChipsStationSelector;
