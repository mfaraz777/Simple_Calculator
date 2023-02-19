class Calculator{
  
  
  constructor(previousOperandTextElement,currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
   
  //clearing screen
  clear(){
    this.currentOperand = '';
    this.previousOperand= '';
    this.operation = undefined;
  }

  //deleting last digit
  delete(){
    if(this.currentOperand === '' ) return;
    else this.currentOperand = this.currentOperand.toString().slice(0,-1);
  }

  //adding new digit
  appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.') ) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  
  
  //getting operation and performing calculation
  chooseOperation(operation){
    if(this.currentOperand === '') return;
    if(this.previousOperand !== ''){
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  //displaying a number(or float)
  getDisplay(number){
    const num = number.toString();
    const integerdigits = parseFloat(num.split('.')[0]); //integral part
    const decimaldigits = num.split('.')[1];  //decimal part

    let integerdisplay;
    if(isNaN(integerdigits))
    {
      integerdisplay = '';
    }
    else
    {
      integerdisplay = integerdigits.toLocaleString('en', { maximumFractionDigits:0} );
    }
    if(decimaldigits != null)
    {
      return `${integerdisplay}.${decimaldigits}`;
    }
    else
    {
      return integerdisplay;
    }
  }
  
  
  //  calculating answer
  compute(){
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(curr)) return;
    switch(this.operation){
      case '+' :
         computation = prev+curr;
         break
      case '-' :
          computation = prev - curr;
          break
      case '*' :
          computation = prev * curr;
          break
      case '÷' :
          computation = prev / curr;
          break
      default :
        return
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay(){
    this.currentOperandTextElement.innerText = this.getDisplay(this.currentOperand);
    if(this.operation != null)
    {
        this.previousOperandTextElement.innerText =
        `${this.previousOperand} ${this.operation}`;
    }
    else {
         this.previousOperandTextElement.innerText = this.getDisplay(this.previousOperand);
    }
  }
}


const numberButtons =  document.querySelectorAll('[data-number]');
const operationButtons  = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click',() => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})


operationButtons.forEach(button => {
  button.addEventListener('click',() => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

deleteButton.addEventListener('click',button => {
  calculator.delete();
  calculator.updateDisplay();
})


equalsButton.addEventListener('click',button => {
  calculator.compute();
  calculator.updateDisplay();
})


allClearButton.addEventListener('click',button => {
  calculator.clear();
  calculator.updateDisplay();
})
