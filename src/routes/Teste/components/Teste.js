import React from 'react'
import './Teste.scss';
import PageBody from '../../../components/PageBody'
import PageHeaderCrud from '../../../components/PageHeaderCrud'

const classNameTeste = 'teste-item'

class Teste extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const body = (
      <div>now test</div>
    )

    return (
      <div className="teste-viewport">
        <PageBody header={PageHeaderCrud} body={body} />
      </div>
    )
  }

}

export default Teste
