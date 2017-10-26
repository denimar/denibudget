import React from 'react'
import ReactPikaday from 'react-pikaday';
import 'pikaday/css/pikaday.css'
import './DateInput.scss'
import { I18n } from 'react-redux-i18n';
import 'moment';

if (I18n.t('lang') != 'en') {
  require('moment/locale/' + I18n.t('lang'));
}  

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
          format: 'dddd, MMMM DD, YYYY',
          //format: 'dddd DD MMMM YYYY   (DD/MM/YYYY)',
          i18n: {
            previousMonth : I18n.t('calendar.previousMonth'),
            nextMonth     : I18n.t('calendar.nextMonth'),
            months        : I18n.t('calendar.months'),
            weekdays      : I18n.t('calendar.weekdays'),
            weekdaysShort : I18n.t('calendar.weekdaysShort')
          }
        }}
      />
    )
  }

}

export default DateInput
