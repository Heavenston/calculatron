import * as React from "react";
import styled from "styled-components";
import * as mathjs from "mathjs";

import Button from "./components/Button";

const math = mathjs.create(mathjs.all, {
  number: "number"
}) as mathjs.MathJsStatic;

const Screen = styled.div`
display: flex;

justify-content: flex-end;
align-items: center;

padding-right: 0.5em;

grid-column-start: 1;
grid-column-end: 5;
`;

const Container = styled.div`
display: grid;

grid-template-columns: repeat(4, 1fr);
grid-template-rows: 0.75fr repeat(5, 1fr);

grid-gap: 5px;

padding: 5px;

position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
`;

const enum Operation {
  add = "+",
  sub = "-",
  divide = "/",
  mul = "x"
}

export default class Index extends React.Component {
  constructor() {
    // @ts-ignore
    super();
    this.delete = this.delete.bind(this);
    this.enableDecimals = this.enableDecimals.bind(this);
    this.invert = this.invert.bind(this);

    this.evaluate = this.evaluate.bind(this);
    this.clear = this.clear.bind(this);
  }

  state = {
    screen: "0",
    currentNumber: 0 as number,
    decimal: false,
    clearOnChange: false,
    currentCalc: [] as [number, Operation][]
  }

  addNumber(n: number) {
    let ns = this.state.currentNumber.toString(10);
    if (this.state.clearOnChange)
      ns = "";
    this.state.decimal ? ns += "." : {};
    ns += n;
    let num = Number(ns);
    this.setState({currentNumber: num, decimal: Math.floor(num) === num ? this.state.decimal : false, clearOnChange: false});
  }
  enableDecimals() {
    this.setState({decimal: true});
  }
  invert() {
    this.setState({currentNumber: -this.state.currentNumber});
  }

  evaluate() {
    let value = "";

    for (let op of this.state.currentCalc) {
      if (math.isNegative(op[0]))
        value += "("+math.format(op[0])+")";
      else
        value += math.format(op[0]);
      value += op[1];
    }

    if (this.state.currentNumber < 0)
      value += "(";
    value += this.state.currentNumber;
    if (this.state.currentNumber < 0)
      value += ")";
    
    value = value.replace(/x/g, "*");

    this.setState({
      currentNumber: math.evaluate(value),
      currentCalc: [],
      decimal: false,
      clearOnChange: true
    });
  }

  delete() {
    let ns = this.state.currentNumber.toString(10);
    ns = ns.replace(/.$/, "");
    this.setState({currentNumber: Number(ns)});
  }

  clear() {
    this.setState({currentNumber: 0, currentCalc: [], decimal: false, clearOnChange: false});
  }

  validOp(op: Operation) {
    this.state.currentCalc.push([this.state.currentNumber, op]);
    this.setState({currentNumber: 0});
  }

  render() {
    let screen = "";

    for (let op of this.state.currentCalc) {
      if (mathjs.isNegative(op[0]))
        screen += "("+math.format(op[0], {fraction: "ratio", precision: 3})+")";
      else
        screen += math.format(op[0], {fraction: "ratio", precision: 3});
      screen += op[1];
    }

    if (math.isNegative(this.state.currentNumber))
      screen += "(";
    screen += math.format(this.state.currentNumber, {fraction: "decimal", precision: 3});
    this.state.decimal ? screen += "," : {};
    if (math.isNegative(this.state.currentNumber))
      screen += ")";

    screen = screen.replace(/\./g, ",");

    return <>

    <Container>
      <Screen>
        <span>
          {screen}
        </span>
      </Screen>

      <Button secondary onClick={this.clear}>CE</Button>
      <Button secondary onClick={this.delete}>{"<-"}</Button>

      <Button secondary onClick={() => this.validOp(Operation.divide)}>/</Button>
      <Button secondary onClick={() => this.validOp(Operation.mul)}>x</Button>

      <Button onClick={() => this.addNumber(7)}>7</Button>
      <Button onClick={() => this.addNumber(8)}>8</Button>
      <Button onClick={() => this.addNumber(9)}>9</Button>

      <Button secondary onClick={() => this.validOp(Operation.sub)}>-</Button>

      <Button onClick={() => this.addNumber(4)}>4</Button>
      <Button onClick={() => this.addNumber(5)}>5</Button>
      <Button onClick={() => this.addNumber(6)}>6</Button>

      <Button secondary onClick={() => this.validOp(Operation.add)}>+</Button>

      <Button onClick={() => this.addNumber(1)}>1</Button>
      <Button onClick={() => this.addNumber(2)}>2</Button>
      <Button onClick={() => this.addNumber(3)}>3</Button>

      <Button secondary onClick={this.evaluate} style={{gridRow: "5 / 7", gridColumn: "4"}}>=</Button>

      <Button secondary onClick={this.invert}>+/-</Button>
      <Button onClick={() => this.addNumber(0)}>0</Button>
      <Button secondary onClick={this.enableDecimals}>,</Button>

    </Container>

    </>
  }
}