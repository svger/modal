import React from 'react';
import Modal from '../src';

class App extends React.Component {
  handleClick_Alert = () => {
    Modal.open({
      type: 'alert',
      header: '我是标题',
      content: '我是内容'
    })
  }
  handleClick_Confirm = () => {
    Modal.open({
      type: 'confirm',
      header: '我是标题',
      content: '我是内容'
    })
  }

  render() {
    return (
      <div className="container">
        <div onClick={this.handleClick_Alert} className="modal">
          点我弹Alert框
        </div>
        <div onClick={this.handleClick_Confirm} className="modal">
          点我弹Confirm框
        </div>
      </div>
    );
  }
}

export default App;
