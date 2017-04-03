import React from 'react'
import './Account.scss';
import PageBody from '../../../components/PageBody';
import PageHeaderCrud from '../../../components/PageHeaderCrud';
import AccountModal from './AccountModal'
import { CRUD_ACTION_BUTTON_DELETE, CRUD_ACTION_BUTTON_EDIT } from '../../../constants'
import Dialog from 'react-bootstrap-dialog'
import moment from 'moment'

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAccounts();
  }

  newAccountModal() {
    let me = this;
    me.refs.AccountModal.open()
      .then(accountToAdd => {
        me.props.addAccount(accountToAdd);
      });
  }

  delAccountClick(id) {
    this.refs.dialog.show({
      body: 'Confirm Account Deletion?',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction('Confirm', () => {
          this.props.delAccount(id);
        }, 'btn-danger')
      ],
      onHide: (dialog) => {}
    })

  }

  render() {
    let accounts = this.props.accounts;

    const mappedAccounts = accounts.data.map((account, index) => {
      let startDate = moment(account.startDate);
      return (
        <div
          className="account-item"
          key={index}>
          <div className="account-name">{account.name}</div>
          <div className="account-start-date">{startDate.format('MM/DD/YYYY HH:MM')}</div>
          <div className="action-buttons">
            <span onClick={this.delAccountClick.bind(this, account._id)}>
              {(CRUD_ACTION_BUTTON_DELETE)}
            </span>
            {(CRUD_ACTION_BUTTON_EDIT)}
          </div>
        </div>
      )
    });

    const header = (
      <PageHeaderCrud
        newRecordButtonClick={this.newAccountModal.bind(this)}
      />
    );

    const body = (
      <div className="account-container">
        <div className="column-headers">
          <div className="column-header account-name">Name</div>
          <div className="column-header account-start-date">Start Date</div>
        </div>
        <div className="menu-items">
          <div>{mappedAccounts}</div>
        </div>
        <div className="account-statement">
        </div>
      </div>
    );

    return (
      <div className="account-viewport">
        <AccountModal ref='AccountModal'/>
        <Dialog ref='dialog'/>

        <PageBody header={header} body={body} />
      </div>
    )

  }

}

export default Account
