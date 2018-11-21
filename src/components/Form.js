import React, { Component } from 'react';

class Form extends Component {
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
}
