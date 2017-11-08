import React from 'react';
import './Account.scss';
import PageBody from '../../../components/PageBody';
import PageHeaderCrud from '../../../components/PageHeaderCrud';
import AccountModal from './AccountModal';
import AccountTransferModal from './AccountTransferModal'
import { CRUD_ACTION_BUTTON_TRANSFER, CRUD_ACTION_BUTTON_DELETE, CRUD_ACTION_BUTTON_EDIT } from '../../../constants'
import Dialog from 'react-bootstrap-dialog';
import Moment from 'moment';
import routine from '../../../../common/common.routine';
import ReactEcharts from 'echarts-for-react';
import FaExchange from 'react-icons/lib/fa/exchange';
import { I18n, Translate } from 'react-redux-i18n';

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    _initialization(this);
  }

  accountModal(account) {
    let me = this;
    me.refs.AccountModal.open(account)
      .then(accountReturned => {
        if (account) { //Editing
          me.props.updAccount(accountReturned);
        } else { //Inserting
          me.props.addAccount(accountReturned);
        }
      });
  }

  accountTransferModal() {
    this.refs.AccountTransferModal.open(this.props.accounts.data, () => {
      _initialization(this);
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

  onChartReadyCallback() {
    //
  }

  getEChartOption(labelsGraph, dataGraph, howMuchMoneyIHaveToday) {
    return {
      title: {
        x: 'center',
        text: I18n.t('account.howMuchMoneyDoIHave'),
        subtext: I18n.t('account.todayIHave', {value: routine.formatNumber(howMuchMoneyIHaveToday)})
      },
      tooltip: {
        trigger: 'item'
      },
      grid: {
        borderWidth: 0,
        y: 80,
        y2: 60
      },
      xAxis: [
        {
          type: 'category',
          show: true,
          data: labelsGraph
        }
      ],
      yAxis: [
        {
          type: 'value',
          show: false
        }
      ],
      series: [
        {
          type: 'bar',
          itemStyle: {
            normal: {
              color: function(params) {
                // build a color map.
                var colorList = [
                  '#26C0C0',
                  '#B5C334',
                  '#C1232B',
                  '#FCCE10',
                  '#E87C25',
                  '#27727B',
                  '#FE8463',
                  '#9BCA63',
                  '#FAD860',
                  '#F3A43B',
                  '#60C0DD',
                  '#D7504B',
                  '#C6E579',
                  '#F4E001',
                  '#F0805A'
                ];
                return colorList[params.dataIndex]
              },
              label: {
                show: true,
                position: 'top',
                formatter: (barItem) => {
                  return routine.formatNumber(barItem.value)
                }
              }
            }
          },
          data: dataGraph
        }
      ]

    }
  }

  render() {
    let accounts = this.props.accounts;
    let howMuchMoneyIHaveToday = 0;

    const mappedAccounts = accounts.data.map((account, index) => {
      howMuchMoneyIHaveToday += account.currentBalance;
      return (
        <div className="account-item" key={index}>
          <div className="account-name">{ account.name }</div>
          <div className="account-start-date">{ routine.formatDate(account.startDate, I18n.t('date.short')) }</div>
          <div className="account-balance">{ routine.formatNumber(account.currentBalance) }</div>
          <div className="action-buttons">
            <span onClick={ this.delAccountClick.bind(this, account._id) }>
              {(CRUD_ACTION_BUTTON_DELETE)}
            </span>
            <span onClick={ this.accountModal.bind(this, account) }>
              {(CRUD_ACTION_BUTTON_EDIT)}
            </span>
          </div>
        </div>
      )
    });

    const additionalButtons = [
      (
        <div key="1" className="button" onClick={ this.accountTransferModal.bind(this) }>
          <FaExchange color='#006699' size="22" />
          <span className="button-text"><Translate value="account.transfers"/></span>
        </div>
      )
    ];

    const header = (
      <div>
        <PageHeaderCrud additionalButtons={ additionalButtons } newRecordButtonClick={ this.accountModal.bind(this, null) }/>
      </div>
    );

    let labelsGraph = [];
    let dataGraph = [];
    let howMuchMoneyBudgets = this.props.howMuchMoneyBudgets.data || [];
    howMuchMoneyBudgets.forEach(howMuchMoneyBudget => {
      labelsGraph.push(howMuchMoneyBudget.description);
      dataGraph.push(howMuchMoneyBudget.value);
    });

    const body = (
      <div className="account-container">
        <div className="column-headers">
          <div className="column-header account-name"><Translate value="account.name"/></div>
          <div className="column-header account-start-date"><Translate value="account.startDate"/></div>
          <div className="column-header account-balance"><Translate value="account.balance"/></div>
        </div>
        <div className="accounts-items">
          <div>{mappedAccounts}</div>
        </div>
        <div className="how-much-money">
          <div className="balance-graph">
            { howMuchMoneyBudgets.length > 0
              ? (<ReactEcharts option={this.getEChartOption(labelsGraph, dataGraph, howMuchMoneyIHaveToday)} notMerge={true} lazyUpdate={true} onChartReady={this.onChartReadyCallback}/>)
              : null
            }
          </div>
        </div>
      </div>
    );

    return (
      <div className="account-viewport">
        <AccountModal ref='AccountModal'/>
        <AccountTransferModal ref='AccountTransferModal'/>
        <Dialog ref='dialog'/>

        <PageBody header={header} body={body}/>
      </div>
    )

  }

}

function _initialization(self) {
  self.props.fetchAccounts();
  self.props.fetchHowMuchMoneyReducerAtTheEndOfBudgets();
}


export default Account
