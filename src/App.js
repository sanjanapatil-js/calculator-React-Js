
import "./App.css";
import React, { useState }  from 'react';

import Header from "./Components/Header/Header";
import Keypad from "./Components/Keypad/Keypad";

import moonicon from "./assets/moon.png";
import sunicon from "./assets/sun.png";

import "./App.css";

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];


function App() {
    const[isDarkMode,setIsDarkMode]=useState(false);
    const[expression,setExpression]=useState("");
    const[result,setResult]=useState("");
    const [history, setHistory] = useState(
      JSON.parse(localStorage.getItem("calculator-app-history")) || []
  );

    const handleKeyPress=(keycode,key)=>{
      if (!keycode)return;
      if(!usedKeyCodes.includes(keycode))return;
      if (numbers.includes(key)) {
        if (key === "0") {
          if (expression.length === 0) return;
        }
        calculateResult(expression + key);
        setExpression(expression + key);
      }
      else if(operators.includes(key)){
      if(!expression)return

      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === ".") return;
      setExpression(expression + key); 
      }
      
      else if(key==="."){
        if(expression)return
        const lastChar=expression.slice(-1)
        if(!numbers.includes(lastChar)) return
        setExpression(expression+ key);
      }
      else if(keycode=== 8){
        if(expression)return
        calculateResult(expression)
        setExpression(expression.slice(0,-1))
      }
      else if(keycode ===13){
        if(expression)return
        calculateResult(expression);
        const tempHistory =[...history];
        if(tempHistory.length>20)tempHistory= tempHistory.splice
        (0,1);
        tempHistory.push(expression); 
       setHistory(tempHistory);
      }
    };
      const calculateResult = (exp) => {
        if (!exp) return; 
        const lastChar= exp.slice(-1);
        if (!numbers.includes(lastChar)) exp.slice(0,-1);

        const answer= eval(exp).toFixed(2) + "";
        setResult(answer);
        
    };
     return (
     <div 
     className="app"
      tabIndex="0"
      onKeyDown={(event) => handleKeyPress(event.keyCode, event.key)}
      data-theme={isDarkMode ? "dark" : ""}>
     <div className="app_calculator">
      <div className="app_calculator_navbar">
     
      <div className="app_calculator_navbar_toggle"
      onClick={()=> setIsDarkMode(!isDarkMode)}
      >
       <div className={`app_calculator_navbar_toggle_circle ${
       isDarkMode ?
        "app_calculator_navbar_toggle_circle_active"
      : ""
  }`}
/>
        </div>
        <img src ={isDarkMode ? moonicon : sunicon} alt="mode"/>
       
        
        
         </div>
         <Header expression={expression}result={result} history ={history}/>
         <Keypad handleKeyPress={handleKeyPress}/>
         </div>
         </div>
  );
}

export default App;
