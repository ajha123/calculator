import React from "react";
import Button from "./Button";
import Display from "./Display";
import "./App.css";
import ClearButton from "./ClearButton";


class App extends React.Component {
  state = {
    input: '0',
    previousNumber: null,
    waitingForSecondOperand: false,
    operator: null
  };

  //created a calculatoroperations object that handles the math
  CalculatorOperations = {
    "/": (prevValue, nextValue) => prevValue / nextValue,
    "*": (prevValue, nextValue) => prevValue * nextValue,
    "+": (prevValue, nextValue) => prevValue + nextValue,
    "-": (prevValue, nextValue) => prevValue - nextValue,
    "=": (prevValue, nextValue) => nextValue
  };

  //When the numbers are clicked the display gets updated
  updateDisplay = val => {
    if (this.state.waitingForSecondOperand === true) {
      this.setState({ 
        waitingForSecondOperand: false,
        input: String(val) 
      });
    } else {
      const input =
        this.state.input === '0' ? String(val) : this.state.input + val;
        this.setState({ input: input });
    }

  };

  
  //Handling the decimal
  handleDecimal = () => {
    if (this.state.waitingForSecondOperand === true) return;

    if (!/\./.test(this.state.input)) {
      this.setState({
        input: this.state.input + ".",
        waitingForSecondOperand: false
      });
    }
    // console.log(this.state);
  };

  //Handling the operations
  //Also support the feature where user can do multiple calculations beforing requiring an equal sign
  performOperation = operator => {
    const inputValue = parseFloat(this.state.input);

    if (this.state.operator && this.state.waitingForSecondOperand) {
      this.setState({ operator: operator });
      return;
    }
    if (this.state.previousNumber === null) {
      this.setState({
        previousNumber: inputValue
      });
    } else if (this.state.operator) {
      const currentNumber = this.state.previousNumber || 0;
      const result = this.CalculatorOperations[this.state.operator](
        currentNumber,
        inputValue
      );
      this.setState({
        input: String(result),
        previousNumber: result
      });
    }

    this.setState({
      waitingForSecondOperand: true,
      operator: operator
    });
    console.log(this.state);
  };
  //Returning jxs that is displayed on the screen

  render() {
    return (
      <div className="calc-app">
        <div className="calc-wrapper">
          <Display input={this.state.input}></Display>
          <div className="row">
            <Button handleClick={this.updateDisplay}>7</Button>
            <Button handleClick={this.updateDisplay}>8</Button>
            <Button handleClick={this.updateDisplay}>9</Button>
            <Button handleClick={this.performOperation}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.updateDisplay}>4</Button>
            <Button handleClick={this.updateDisplay}>5</Button>
            <Button handleClick={this.updateDisplay}>6</Button>
            <Button handleClick={this.performOperation}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.updateDisplay}>1</Button>
            <Button handleClick={this.updateDisplay}>2</Button>
            <Button handleClick={this.updateDisplay}>3</Button>
            <Button handleClick={this.performOperation}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.handleDecimal}>.</Button>
            <Button handleClick={this.updateDisplay}>0</Button>
            <Button handleClick={this.performOperation}>=</Button>
            <Button handleClick={this.performOperation}>-</Button>
          </div>
          <div className="row">
            <ClearButton
              handleClear={() =>
                this.setState({
                  input: '0',
                  previousNumber: null,
                  waitingForSecondOperand: false,
                  operator: null
                })
              }
            >
              Clear
            </ClearButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
