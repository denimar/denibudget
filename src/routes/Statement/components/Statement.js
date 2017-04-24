import Moment from 'moment';
import React from 'react'
import './Statement.scss';
import PageBody from '../../../components/PageBody';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import AccountService from '../../Account/modules/AccountService'


class Statement extends React.Component {

  constructor(props) {
    super(props);
    this.state = { form: {} };
  }

  componentWillMount() {
    //this.props.fetchAccounts();
  }

  currentAccountInputChange(account) {
    let form = Object.assign({}, this.state.form, {currentAccount: account});
    this.setState({form: form});

    this.props.fetchStatement(account._id);
  }

  render() {
    let accountsObj = this.props.accounts;

    // const accounts = accountsObj.data || [];
    // const sortedAccounts = accounts.sort((account1, account2) => {
    //   if (account1.name < account2.name) return -1;
    //   if (account1.name > account2.name) return 1;
    //   return 0;
    // });

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
            value={ this.state.form.currentAccount ? this.state.form.currentAccount._id : null }
            onChange={ this.currentAccountInputChange.bind(this) }
          />
        </div>
      </div>
    );

    let statmentItems = this.props.statement ? this.props.statement.data : [];
    let statmentItemsElem = [];
    statmentItems.map(statementItem => {
      statmentItemsElem.push((
        <div className="statement-item" key={ statementItem._id }>
          <div className="statement-item-field date">{ Moment(new Date(statementItem.date)).format("MMMM, DD") }</div>
          <div className="statement-item-field category">{statementItem.category.path }</div>
          <div className="statement-item-field description">{statementItem.description }</div>
          <div className="statement-item-field value">{statementItem.value }</div>
          <div className="statement-item-field type">{statementItem.type }</div>
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
