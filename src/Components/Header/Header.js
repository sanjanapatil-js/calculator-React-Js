import React, { useEffect, useRef } from 'react'
import "./Header.css";
function Header(props) {
  const resultRef=useRef();
useEffect(()=>{
  resultRef.current.scrollIntoView({behavior:"smooth"});
},[]);


  return (
    <div className="header custom-scroll">
     <div className="header_history">
     {
      props.history &&
      props.history?.map((item,index)=><p key={item+Math.random()*44}>{item}</p>)
     }
      </div>
      <br/>
     <div className="header_expression custom-scroll">
      <p>{props.expression}</p>
     </div>
     <p ref={resultRef} className="header_result">{props.result}</p>
    </div>
  );
}

export default Header
