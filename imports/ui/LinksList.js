import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount(){
    console.log('component mounted')
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      let links = Links.find({
          visible: Session.get('showVisible')
        }
      ).fetch();
      this.setState({links});
    })

  }
  componentWillUnmount(){
    console.log('component unmounted');
    this.linksTracker.stop();
  }
  renderLinksListItem(){
    console.log(this.state.links.length);
    if (this.state.links.length === 0) {
      return (
        <div className='item'>
          <p className='item__status-message'>No Links Found</p>
        </div>
      )
    }
    return this.state.links.map((links) => {
      const shortUrl = Meteor.absoluteUrl(links._id);
      return <LinksListItem key={links._id} shortUrl={shortUrl} {...links}/>;
      // return <p key={links._id}>{links.url}</p>
    });

  }
  render() {
    return(
      <div>
        <div>
          <FlipMove>
            {this.renderLinksListItem()}
          </FlipMove>
        </div>
      </div>
    )
  }
}
