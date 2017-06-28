import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';


export default class LinksListFilters extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true
    }
  }
  componentDidMount(){
    this.checkboxTracker = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible')
      });
    });
  }
  componentWillUnmount(){
    this.checkboxTracker.stop();
  }
  onChange(e) {
    Session.set('showVisible', !e.target.checked)
  }


  render() {
    return (
      <div>
        <label className='checkbox'>
          <input
            type='checkbox'
            onChange={this.onChange.bind(this)}
            checked={!this.state.showVisible}
            className='checkbox__box'
          />
          show hidden links
        </label>
      </div>

    );
  }
}
