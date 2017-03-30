import React from 'react'
import './Account.scss';
import PageBody from '../../../components/PageBody';
import PageHeaderCrud from '../../../components/PageHeaderCrud';

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAccounts();
  }

  render() {
    let accounts = this.props.accounts;

    const mappedAccounts = accounts.data.map((account, index) => <div className="account-item" key={index}>{account.name}</div> );

    const header = (
      <PageHeaderCrud
      />
    );

    const body = (
      <div>{mappedAccounts}</div>
    );

    return (
      <div className="account-viewport">
        <PageBody header={header} body={body} />
      </div>
    )

  }

}

export default Account
