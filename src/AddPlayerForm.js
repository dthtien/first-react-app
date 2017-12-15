import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddPlayerForm extends Component{


  onSubmit(e){
    e.preventDefault();

    this.props.onAdd(this.state.name);
    this.setState({name: ''});
  }

  onNameChange(e){
    this.setState({name: e.target.value});
  }

  render() {
    return(
      <div className='add-player-form'>
        <form onSubmit={this.onSubmit}>
          <input type='text' value = {this.state.name} onChange={this.onNameChange}/>
          <input type='submit' value = "Add player" />
        </form> 
      </div>
    );
  }
}

AddPlayerForm.propTypes = {
  onAdd: PropTypes.func.isRequired
} 

AddPlayerForm.defaultProps = {
  name: ''
}

export default AddPlayerForm;