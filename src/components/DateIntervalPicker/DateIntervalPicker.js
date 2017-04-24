var moment = require('moment');
import React from 'react'
var BS = require('react-bootstrap');
var DateRangePicker = require('react-bootstrap-daterangepicker/lib');
import './daterangepicker.css';
import './DateIntervalPicker.scss';
import 'bootstrap/dist/css/bootstrap.css'

class DateIntervalPicker extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ranges: {
				'Today': [moment(), moment()],
				'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				'Last 30 Days': [moment().subtract(29, 'days'), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
				'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			},
			startDate: moment().subtract(29, 'days'),
			endDate: moment()
    }
  }

	handleEvent(event, picker) {
		this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate
		});
	}

  render() {
		var start = this.state.startDate.format('YYYY-MM-DD');
		var end = this.state.endDate.format('YYYY-MM-DD');
		var label = start + ' - ' + end;
		if (start === end) {
			label = start;
		}

    return (
			<DateRangePicker className="date-interval-picker-container" startDate={this.state.startDate} endDate={this.state.endDate} ranges={ this.state.ranges } onEvent={ this.handleEvent.bind(this) }>
				<BS.Button className="selected-date-range-btn" style={{width:'100%'}}>
					<div className="pull-left">
            <BS.Glyphicon glyph="calendar" />
          </div>
					<div className="pull-right">
						<span>
							{label}
						</span>
						<span className="caret"></span>
					</div>
				</BS.Button>
			</DateRangePicker>
    )
  }

}

export default DateIntervalPicker;
