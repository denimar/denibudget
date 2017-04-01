import React from 'react'
import './Statement.scss';
import PageBody from '../../../components/PageBody';

class Statement extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAccounts();
  }

  render() {
    let accounts = this.props.accounts;

    const mappedAccounts = accounts.data.map((account, index) => <div className="account-item" key={index}>{account.name}</div> );

    const body = (
      <div className="account-container">
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

        <PageBody body={body} />
      </div>
    )

  }

}

export default Statement
