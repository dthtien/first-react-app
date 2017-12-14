import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CreateReactClass from 'create-react-class'
import App from './App';
import './index.css';

var players = [
    {
      id: 1,
      name: "Anthony", 
      score: 1
    },
    {
      id: 2,
      name: "Jason", 
      score: 2
    },
    {
      id: 3,
      name: "TheK", 
      score: 3
    },
  ],
  nextID = 4;

function Stats(props) {
  var totalPlayers = props.players.length,
    totalPoints = props.players.reduce((total, player) => total + player.score, 0);

  return (
    <table>
      <tbody>
        <tr>
          <td>Players: </td>
          <td>{totalPlayers}</td>
        </tr> 
        <tr>
          <td>Total points: </td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}

Stats.propTypes = {
  players: PropTypes.array.isRequired
}

var Stopwatch = CreateReactClass({
  getInitialState: function(){
    return {
      running: false,
    }
  }, 

  onStart: function(){
    
  },

  render: function(){
    return (
      <div className='stopwatch'>
        <h2>StopWatch</h2>
        <div className='stopwatch-time'>0</div>
        { this.state.running ? 
          <button onClick={this.onStop}>Stop</button> 
          : 
          <button onClick={this.onStart}>Start</button> }
        <button>Reset</button>
      </div>
    );
  }
});

var AddPlayerForm = CreateReactClass({
  propTypes: {
    onAdd: PropTypes.func.isRequired,
  },

  getInitialState: function(){
    return {
      name: '',
    }
  },

  onSubmit: function(e){
    e.preventDefault();

    this.props.onAdd(this.state.name);
    this.setState({name: ''});
  },

  onNameChange: function(e){
    this.setState({name: e.target.value});
  },

  render: function() {
    return(
      <div className='add-player-form'>
        <form onSubmit={this.onSubmit}>
          <input type='text' value = {this.state.name} onChange={this.onNameChange}/>
          <input type='submit' value = "Add player" />
        </form> 
      </div>
    );
  }
});
function Score(props) {
  return(
    <div className='player-score'>
      <div className='counter'>
        <button className='counter-action decrement'
          onClick={function() {props.onChange(-1);}}> - </button>
        <div className='counter-score'> {props.score} </div>
        <button className='counter-action increment' 
          onClick={function() {props.onChange(1);}}> + </button>
      </div>
    </div>
  );
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

var Application = CreateReactClass({
  propTypes: {
    title: PropTypes.string,
    initialPlayers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
      })).isRequired
  },

  getDefaultProps: function() {
    return {
      title: 'ScoreBoard'
    };
  },

  getInitialState: function(){
    return {
      players: this.props.initialPlayers,
    }
  },

  onScoreChange: function(index, delta) {
    this.state.players[index].score += delta
    this.setState(this.state);
  },

  onPlayerAdd: function(name){
    this.state.players.push({
      name: name,
      score: 0,
      id: nextID,
    });
    this.setState(this.state);

    nextID += 1
  },

  onRemovePlayer: function(index){
    this.state.players.splice(index, 1);
    this.setState(this.state)
  },

  render: function() {
    return(
      <div className="application">
        <Header title = {this.props.title} players = {this.state.players}/>
        {
          this.state.players.map(function(player, index){
            return(
              <Player 
                onRemove = {function(){this.onRemovePlayer(index)}.bind(this)}
                onScoreChange = {
                  function(delta) {
                    this.onScoreChange(index, delta)}.bind(this)
                }
                name={player.name} 
                score={player.score} 
                key={player.id}/>
            );
          }.bind(this))
        }
        <AddPlayerForm onAdd={this.onPlayerAdd}/>
      </div>
    );
  }
});

function Header(props){
  return(
    <div className='header'>
      <Stats players = {props.players} />
      <Stopwatch />
      <h1> {props.title} </h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  players: PropTypes.array.isRequired
}

function Player(props){
  return(
    <div className='players'>
      <div className = 'player'>
        <div className='player-name'>
          <a className='remove-player' onClick={props.onRemove}>X</a>
          {props.name}
        </div>
        
        <Score score={props.score} onChange={props.onScoreChange}/>
      </div>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onScoreChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,

}




ReactDOM.render(
  <Application initialPlayers = {players}/>,
  document.getElementById('root')
);
