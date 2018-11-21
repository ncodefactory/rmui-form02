import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      args: [],
      channel: null,
    };
  }

  componentDidMount() {
    window.addEventListener('message', this.handleParentMessage);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleParentMessage);
  }

  handleParentMessage = (e) => {
    if (
      e.data.type
      && e.data.type === 'rmui-forms-comm'
      && e.data.direction === 'from-parent-to-child'
    ) {
      this.setState({ args: e.data.args, channel: e.data.channel });
    }
  };

  sendToParent = (data) => {
    const { channel } = this.state;
    window.parent.postMessage(
      {
        channel,
        args: data,
        type: 'rmui-forms-comm',
        direction: 'from-child-to-parent',
      },
      '*',
    );
  };

  render() {
    const { args } = this.state;
    const info = `${args.length} args recieved from parent.`;
    return (
      <div className="App">
        <h1>rmui-form02</h1>
        <h2>{info}</h2>
        <h3>send back to parent</h3>
        <button type="button" onClick={() => { this.sendToParent([args[0]]); }}>
          Arg0
        </button>
        <button type="button" onClick={() => { this.sendToParent([args[1]]); }}>
          Arg1
        </button>
        <button type="button" onClick={() => { this.sendToParent([args[2]]); }}>
          Arg2
        </button>
      </div>
    );
  }
}

export default App;
