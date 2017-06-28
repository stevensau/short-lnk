import { Meteor } from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';





export default class LinkListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false
    }
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', () => {
      this.setState({justCopied: true});
      setTimeout(() => this.setState({justCopied: false}), 1000);

    }).on('error', () => {
      alert('unable to copy');
    })
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let vistitedMessage = null
    if (typeof this.props.lastVisitedAt === 'number') {
      vistitedMessage = `- (visited ${moment(this.props.lastVisitedAt).fromNow()})`
    }
    return <p className='item__message'>{this.props.visitedCount} {visitMessage} {vistitedMessage}</p>
  }
  render() {
    return (
      <div className='item'>
        <h2>{this.props.url}</h2>
        <p className='item__message'>{this.props.shortUrl}</p>
        {this.renderStats()}
        <a className='button button--pills button--link' href={this.props.shortUrl} target='blank'>Visit</a>
        <button className='button button--pills' ref='copy' data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied ? 'copied' : 'copy'}
        </button>
        <button className='button button--pills' onClick={() => {
          Meteor.call('links.setVisible', this.props._id, !this.props.visible);
        }}>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    )
  }
}


LinkListItem.PropTypes = {
  _id:  React.PropTypes.string.isRequired,
  url:  React.PropTypes.string.isRequired,
  userId:  React.PropTypes.string.isRequired,
  shortUrl:  React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  lastVisitedAt: React.PropTypes.number.isRequire,
  visitedCount: React.PropTypes.number
}
