import React from 'react'
import './Account.scss';
import PageBody from '../../../components/PageBody';
import PageHeaderCrud from '../../../components/PageHeaderCrud';
import AccountModal from './AccountModal'
import {CRUD_ACTION_BUTTON_DELETE, CRUD_ACTION_BUTTON_EDIT} from '../../../constants'
import Dialog from 'react-bootstrap-dialog'
import Moment from 'moment'
import routine from '../../../../common/common.routine';
import {defaults, Bar} from 'react-chartjs-2';
import ReactEcharts from 'echarts-for-react';

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAccounts();
    this.props.fetchHowMuchMoneyReducerAtTheEndOfBudgets();
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
        text: 'How Much Money do I Have?',
        subtext: 'Today: $' + routine.formatNumber(howMuchMoneyIHaveToday)
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
      let startDate = Moment(account.startDate);
      return (
        <div className="account-item" key={index}>
          <div className="account-name">{ account.name }</div>
          <div className="account-start-date">{ startDate.format('MM/DD/YYYY') }</div>
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

    const header = (<PageHeaderCrud newRecordButtonClick={ this.accountModal.bind(this, null) }/>);

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
          <div className="column-header account-name">Name</div>
          <div className="column-header account-start-date">Start Date</div>
          <div className="column-header account-balance">Balance</div>
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
        <Dialog ref='dialog'/>

        <PageBody header={header} body={body}/>
      </div>
    )

  }

}

export default Account
