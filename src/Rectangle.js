import React, { useRef, useEffect, useState } from 'react';
import demo from './demo.jpg'
import './Rectangle.css'

function Rectangle() {
  const imageUrl =  demo
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [cordx,setCordx ] = useState(0)
  const [cordy, setCordy] = useState(0)
  const [recbutton , setRecButoon]= useState(false)
  const [elipbutton, setEllipButton] = useState(false)
  const [x , setX] = useState(0)
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.scale(1,1)
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context;
  }, [])
  const Recbutton = ()=>
  {
    setRecButoon(true)
    if(setEllipButton){
    setEllipButton(false)
    }
  }
  const Elipbutton = () =>
  {
    setEllipButton(true)
    if(setRecButoon){
    setRecButoon(false)
    }
  }

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    let prevW = offsetX;
    let prevH = offsetY;
    //console.log(cordx, cordy)
    setIsDrawing(true)
    setCordx( cordx + prevW)
    setCordy(cordy + prevH)
  }

  const finishDrawing = () => {
   contextRef.current.closePath()
   setIsDrawing(false)
   setCordx (cordx - cordx)
   setCordy (cordy - cordy)
  }
  
  
  const draw = ( {nativeEvent}) => {
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    let prevX = offsetX;
    let prevY = offsetY;
    let cur_width = prevX - cordx
    let cur_height = prevY - cordy
    if(recbutton){
      if(x>0){
    contextRef.current.beginPath()
    contextRef.current.rect(cordx, cordy,cur_width, cur_height)
    contextRef.current.stroke()
      }
      setX (x+1)
      console.log(x)
      drawing(prevX , prevY)
    }
    else{
      Eliipdrawing(prevX, prevY)
    }  
  }
  const drawing = (prevX ,prevY)=>
    { 
  if(cordx && cordy ===0){
     return
   }
    let cur_width = prevX - cordx
    let cur_height = prevY - cordy
    contextRef.current.clearRect(0, 0,window.innerWidth ,window.innerHeight)
    contextRef.current.beginPath()
    contextRef.current.rect(cordx, cordy,cur_width, cur_height)
    contextRef.current.stroke()
}
   const Eliipdrawing = (prevX ,prevY)=>
    { 
   if(cordx && cordy ===0){
     return
   }
    let radiusX = prevX - cordx
    let radiusY = prevY - cordy/2
    if(radiusX < 0){
      radiusX = -1* radiusX
    }
    if(radiusY < 0){
       radiusY = -1 * radiusY
    }
    contextRef.current.clearRect(0,0, window.innerWidth ,window.innerHeight)
   contextRef.current.clearRect(0,0, window.innerWidth ,window.innerHeight)
    contextRef.current.beginPath();
    contextRef.current.ellipse(cordx, cordy, radiusX, radiusY, Math.PI / 2, 0, 2 * Math.PI);
    contextRef.current.stroke()
}

  return (
    <div style = {{position: `relative`}}>
      <button onClick = {Recbutton}>rec</button>
      <button onClick = {Elipbutton}>ellip</button>
      <canvas
      width ={window.innerWidth}
      height= {window.innerHeight}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
   
  </div>
    
  );
}
export default Rectangle