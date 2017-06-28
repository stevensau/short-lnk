import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';


export default class AddLinks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: 'http://',
      isOpen: false,
      error: ''
    }
  }


  onSubmit(e){
    const {url} = this.state //ES6 FUN = this.state.url
    e.preventDefault();
    console.log(url);
    if (url) {
        Meteor.call('links.insert', url, (err, res) => {
          if (!err) {
            this.handleModalClose();
          }else {
            this.setState({error: err.reason});
          }
        });
    }
  }
  onChange(e){
    let newUrl = `${e.target.value.trim()}`
    this.setState({
      url: newUrl
    })
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      url: 'http://',
      error: ''
    });
  }
  render(){
    return(
      <div>
        <button className='button' onClick={()=> this.setState({isOpen: true})}>+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel='Add Link'
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className='boxed-view__box'
          overlayClassName='boxed-view boxed-view--modal'>
          <h1>Add Links</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className='boxed-view__form'>
            <input
              onChange={this.onChange.bind(this)}
              type='text'
              ref='url'
              placeholder='URL'
              value={this.state.url}
            />
            <button className='button'>Add Link</button>
            <button type='button' className='button button--secondary' onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    )
  }
}
