import React from 'react';
import Modal from '../src';

class App extends React.Component {

  render() {
    return (
      <div>
        <Modal type="alert" header="我是标题" content="我是内容" />
        <Modal type="confirm" header="我是标题" content="我是内容" />
      </div>
    );
  }
}

export default App;
