// @flow
import * as React from 'react';
import { autoBindMethodsForReact } from 'class-autobind-decorator';
import { AUTOBIND_CFG } from '../../common/constants';
import moment from 'moment';

type Props = {
  timestamp: number | Date | string,
  intervalSeconds?: number,
  className?: string,
  capitalize?: boolean,
};

type State = {
  text: string,
};

@autoBindMethodsForReact(AUTOBIND_CFG)
class TimeFromNow extends React.PureComponent<Props, State> {
  _interval: any;

  constructor(props: any) {
    super(props);
    this._interval = null;
    this.state = {
      text: '',
    };
  }

  _update() {
    const { timestamp, capitalize } = this.props;

    let text = moment(timestamp).fromNow();

    // Shorten default case
    if (text === 'a few seconds ago') {
      text = 'just now';
    }

    // Capitalize if needed
    if (capitalize) {
      text = text.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

    this.setState({ text });
  }

  componentDidMount() {
    const intervalSeconds = this.props.intervalSeconds || 5;
    this._interval = setInterval(this._update, intervalSeconds * 1000);
    this._update();
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    const { className, timestamp } = this.props;
    const { text } = this.state;

    return (
      <span title={moment(timestamp).toString()} className={className}>
        {text}
      </span>
    );
  }
}

export default TimeFromNow;
