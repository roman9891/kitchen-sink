import './App.css';
import {BoopButton, BgmButton} from './SfxButtons'
import {useState} from 'react'
import {Provider} from './appContext'

function App() {
  const [show, setShow] = useState(true)
  const [hover, setHover] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [info, setInfo] = useState(`Hides/reveals other buttons`)
  const [thisInfo, setThisInfo] = useState(`Hides/reveals other buttons`)

  const setXY = (x, y, info) => {
    setHover(true)
    setMouseX(x)
    setMouseY(y)
    setInfo(info)
  }

  const mouseLeaver = e => {
    setHover(false)
  }

  const enableTooltip = (x, y, info) => {
    console.log('test')
    setXY(x,y,info)
  }

  const tooltipStyle = {
    position: 'fixed', 
    top: `${mouseY}px`, 
    left: `${mouseX}px`, 
    // border: `1px solid black`, 
    background: `grey`, 
    borderRadius: `3px`, 
    color: `white`,
    padding: `5px`
  }

  return (
    <Provider value={{
      setInfo: setInfo, 
      setXY: setXY, 
      setMouseX: setMouseX, 
      setMouseY: setMouseY, 
      setHover: setHover,
      enableTooltip: enableTooltip,
      mouseLeaver: mouseLeaver
      }}>
      <div className="App">
        <button onClick={() => setShow(!show)} onMouseMove={e=>enableTooltip(e.clientX, e.clientY, thisInfo)} onMouseLeave={mouseLeaver}>Show</button>
        {show && <BoopButton/>}
        {show && <BgmButton/>}
        {hover && (<p style={tooltipStyle}>{info}</p>)}
      </div>
    </Provider>
  );
}

export default App;