import Moment from 'moment';
import React from 'react'
import './Statement.scss';
import PageBody from '../../../components/PageBody';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import AccountService from '../../Account/modules/AccountService'
import DateIntervalPicker from '../../../components/DateIntervalPicker';
//import DateRangePicker from 'react-bootstrap-daterangepicker'
// var DateRangePicker = require('react-bootstrap-daterangepicker');
// import 'react-bootstrap-daterangepicker/css/daterangepicker.css';

class Statement extends React.Component {

  constructor(props) {
    super(props);
    this.state = { form: {} };
  }

  componentWillMount() {
    //this.props.fetchAccounts();
  }

  currentAccountInputChange(account) {
    this.props.statement.currentAccount = account;

    const startDate = Moment(new Date(2017, 3, 22));
    const endDate = Moment(new Date(2017, 3, 22));

    this.props.fetchStatement(account._id, startDate, endDate);
    this.forceUpdate();
  }

  render() {
    let accountsObj = this.props.accounts;

    const header = (
      <div className="page-header-elements">
        <div className="page-header-content">
          <span className="label-budget">Account :</span>
          <Select.Async
            className="select-account"
            loadOptions={ AccountService.getAccountsForSelects }
            labelKey="name"
            valueKey="_id"
            clearable={false}
            value={ this.props.statement.currentAccount ? this.props.statement.currentAccount._id : null }
            onChange={ this.currentAccountInputChange.bind(this) }
          />

          <DateIntervalPicker />

        </div>
      </div>
    );

    let statmentItems = this.props.statement ? this.props.statement.data : [];
    let statmentItemsElem = [];
    statmentItems.map(statementItem => {
      statmentItemsElem.push((
        <div className="statement-item" key={ statementItem._id }>
          <div className="statement-item-field date">{ Moment(new Date(statementItem.date)).format("MMMM, DD") }</div>
          <div className="statement-item-field category">{ statementItem.category.path }</div>
          <div className="statement-item-field description">{ statementItem.description }</div>
          <div className="statement-item-field value">{ statementItem.value }</div>
          <div className="statement-item-field type">{ statementItem.type }</div>
        </div>
      ));
    })

    const body = (
      <div className="statement-container">
        <div className="statement">
          { statmentItemsElem }
        </div>
      </div>
    );

    return (
      <div className="statement-viewport">
        <PageBody header={header} body={body} />
      </div>
    )

  }

}

export default Statement
