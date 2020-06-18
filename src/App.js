
import React, { Component } from 'react';
//import food and snake components
import Snake from './Components/Snake';
import Food from './Components/Food';

const getRandomCoordinates = () => {
   //generate random coordinates
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {
  //call random co ordinates function
  food: getRandomCoordinates(),
  //determine the starting speed of the snake
  speed:200,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [2,0]
  ]
}

class App extends Component {
//set the snakes starting position
  state = initialState;

  componentDidMount() {
    //once component is mounted listen to key down events
    setInterval(this.moveSnake, this.state.speed);
    //call key down functions
    document.onkeydown = this.onKeyDown;
  }
 
  //call all methods that update the state 
  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }
  //  e is the events object
  onKeyDown = (e) => {
    e = e || window.event;
    // switch statement that switches between the different key down cases/instances this causes the directions to change with the arrow buttons
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    // the head is the last item of the array ie the last item of the array
    let head = dots[dots.length - 1];
    // this switch statement determines what happens to the blocks(dots) when an arrow button is clicked, increment by 2
    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    // push will add to the array (adds to the front/head)
    dots.push(head);
    // shift will remove the first item of the array(removes from the back/tail)
    dots.shift();
    // save to the state
    this.setState({
      snakeDots: dots
    })
  }
//check if the snake leaves or touches the block borders
  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    // if statement to check X and Y coordinates
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      //call game over function wich alerts game over
      this.onGameOver();
    }
  }
 //check if the snake bumps into itself
  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  onGameOver() {
    //alert the game is over and show the length of the snake
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState)
  }

  render() {
    return (
      <div className="game-area">
        {/* pass in snake props from state */}
        <Snake snakeDots={this.state.snakeDots}/>
        <Food dot={this.state.food}/>
      </div>
    );
  }
}

export default App;