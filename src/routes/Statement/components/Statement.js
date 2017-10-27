import Moment from 'moment';
import React from 'react'
import './Statement.scss';
import PageBody from '../../../components/PageBody';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import AccountService from '../../Account/modules/AccountService'
import DateIntervalPicker from '../../../components/DateIntervalPicker';
import routine from '../../../../common/common.routine';
import FaFileTextO from 'react-icons/lib/fa/file-text-o';
import { Translate } from 'react-redux-i18n';

class Statement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    //this.props.fetchAccounts();
  }

  currentAccountInputChange(account) {
    this.props.statement.currentAccount = account;

    this.tryToGetAccountStatement();
  }

  dateIntervalChange(jsonDates) {
    this.setState({
      startDate: jsonDates.startDate,
      endDate: jsonDates.endDate,
    });

    this.tryToGetAccountStatement();
  }

  getAcccountBalances(account) {
    AccountService.getAccountBalance(account._id, this.state.startDate)
      .then((startAccountBalance) => {
        this.setState({
          startAccountBalance: startAccountBalance
        })
      })

    AccountService.getAccountBalance(account._id, this.state.endDate)
      .then((endAccountBalance) => {
        this.setState({
          endAccountBalance: endAccountBalance
        })
      })
  }

  tryToGetAccountStatement() {
    if (this.props.statement.currentAccount && this.state.startDate && this.state.endDate) {
      this.props.fetchStatement(this.props.statement.currentAccount._id, this.state.startDate, this.state.endDate);
      this.getAcccountBalances(this.props.statement.currentAccount);
      this.forceUpdate();
    }
  }

  getAccounts() {
    return AccountService.getAccountsForSelects(this.refs.selectAccount, (data) => {
      if (!this.props.statement.currentAccount) {
        this.props.statement.currentAccount = data[0]
        this.currentAccountInputChange(data[0]);
      }
    })
  }

  onClickDetails(transactionId) {
    alert('Show the details here... Under Construction...');
  }

  render() {
    let accountsObj = this.props.accounts;

    const header = (
      <div className="page-header-elements">
        <div className="page-header-content">
          <span className="label-budget"><Translate value="statement.account" /> :</span>
          <Select.Async
            ref="selectAccount"
            className="select-account"
            loadOptions={ this.getAccounts.bind(this) }
            labelKey="name"
            valueKey="_id"
            clearable={false}
            value={ this.props.statement.currentAccount ? this.props.statement.currentAccount._id : null }
            onChange={ this.currentAccountInputChange.bind(this) }
            placeholder="select an account"
          />

        <DateIntervalPicker
          onChange={ this.dateIntervalChange.bind(this) }
        />

        </div>
      </div>
    );

    let statmentItems = this.props.statement ? this.props.statement.data : [];
    let statmentItemsElem = [];
    statmentItems.map(statementItem => {
      let statementItemDate = routine.parseDateWithTimeZone(statementItem.date);

      statmentItemsElem.push((
        <div className="statement-item" key={ statementItem._id }>
          <div className="statement-item-field date">{ statementItemDate.format("MM/DD/YYYY") }</div>
          <div className="statement-item-field description">{ statementItem.description }</div>
          <div className="statement-item-field value">{ routine.formatNumber(statementItem.value) }</div>
          <div className="statement-item-field type">{ statementItem.type }</div>
          {
            statementItem._id ? (
              <div className="statement-item-field details" onClick={ this.onClickDetails.bind(this, statementItem._id) }><FaFileTextO /></div>
            ) : null
          }
        </div>
      ));
    })

    const body = this.props.statement.currentAccount ? (
      <div className="statement-container">
        <div className="previous-balance">
          <span className="title"><Translate value="statement.previousBalance" /> :</span>
          <span className="value">{ routine.formatNumber(this.state.startAccountBalance) }</span>
        </div>
        <div className="statement">
          { statmentItemsElem }
        </div>
        <div className="current-balance">
          <span className="title"><Translate value="statement.currentBalance" /> :</span>
          <span className="value">{ routine.formatNumber(this.state.endAccountBalance) }</span>
        </div>
      </div>
    ) : null;

    return (
      <div className="statement-viewport">
        <PageBody header={header} body={body} />
      </div>
    )

  }

}

export default Statement
