import {useEffect, useState, useContext} from 'react'
import useSound from 'use-sound'
import hit from './Sounds/hit0.mp3'
import bgm from './Sounds/bgmtest.mp3'
import {myContext} from './appContext'



export const BoopButton = () => {
  const { enableTooltip, mouseLeaver } = useContext(myContext)
  const [play] = useSound(hit);

  return <button onClick={play} onMouseMove={e=>enableTooltip(e.clientX, e.clientY, `makes attack sound`)} onMouseLeave={mouseLeaver}>Boop!</button>
}

export const BgmButton = () => {
  const { enableTooltip, mouseLeaver } = useContext(myContext)
  const [play, {stop}] = useSound(bgm)
  const [loop, setLoop] = useState(``)
  
  const loopSound = () => {
    console.log(bgm)
    play()
    const bgmLoop = setInterval(play, 28000)
    setLoop(bgmLoop)
  }

  const stopSound = () => {
    stop()
    clearInterval(loop)
    setLoop(``)
  }

  useEffect(()=>{
    return () => {
      stop()
      clearInterval(loop)
      setLoop(``)
      console.log(loop)
    }
  },[])
  
  return (
      <div>
        {loop ? <button onClick={stopSound} onMouseMove={e=>enableTooltip(e.clientX, e.clientY, `Stops BGM`)} onMouseLeave={mouseLeaver}>Stop</button> : 
                <button onClick={loopSound} onMouseMove={e=>enableTooltip(e.clientX, e.clientY, `starts BGM`)} onMouseLeave={mouseLeaver}>BGM</button>}   
      </div>
  )
}