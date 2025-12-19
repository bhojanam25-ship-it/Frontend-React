import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { applyCoupon } from './Store';


function CuponApply() {
    let [input , setInput] = useState("")
    let dispatch = useDispatch();
    const handleapply = (() =>{
        dispatch(applyCoupon(input))
    })  
  return (
    <div className="cuopon-b0x">
        <input
        type="text"
        placeholder="Enter cupon code"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleapply}>Apply Cupon</button>
      
    </div>
  )
}
export default CuponApply;
