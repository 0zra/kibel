import React from "react";

export default function Timer(props) {
  const [time, setTime] = React.useState(false)

  React.useEffect(()=>{
    function calculateTimePast() {

      const timeStart = new Date(props.time*1000);
      const timeNow = Date.now();
    
      const timeLeft = (timeNow - timeStart) / 1000;
      setTime (`${Math.floor(timeLeft / 60)}:${Math.floor((timeLeft % 60))}`)
    }

    
    const timerInterval = setInterval(calculateTimePast, 1000);
    return ()=> {
      clearInterval(timerInterval);
    }
  }, [])

  return <>{time}</>
}





