import React from "react";
import './Button.css';

//Checking to see if the valur entered is a dot or an equal or numbers
//If the val is not any of them then we do nothing if the val is an operator we color it orange
const isOperator = val => {
  return !isNaN(val) || val === "." || val === "=";
}
const Button = props => {
  const classname = isOperator(props.children) ? " " : "operator";
 
  return (
    
    <div 
      className = {`button-wrapper ${classname}`}
      onClick = {() => props.handleClick(props.children)}
    >
      {props.children}
    </div>
  );
}

export default Button;
