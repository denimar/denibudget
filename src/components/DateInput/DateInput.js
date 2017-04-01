import React from 'react'
import ReactPikaday from 'react-pikaday';
import 'pikaday/css/pikaday.css'
import './DateInput.scss'

class DateInput extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReactPikaday
        className="date-input-container form-control"
        value={this.props.value}
        onChange={this.props.onChange}
        initialOptions= {{
          format: 'dddd, DD [de] MMMM [de] YYYY',
        }}
      />
    )
  }

}

export default DateInput
