import { useEffect, useState } from 'react';


interface RandomNumberData{
  randomNumber: number,
  time: number
}

export function useDailyRandomNumber(id: string, n: number) {
  const expires_after = 24*60*60*1000; // milliseconds => day
  const [randomNumber, setRandomNumber] = useState<number>(0);

  useEffect(() => {
    const time = new Date().getTime();
    const d = localStorage.getItem(id);

    let generateNew  = false;
    if(d == null) generateNew = true;
    else{
      const data:RandomNumberData = JSON.parse(d) as RandomNumberData;
      if(time - data.time >= expires_after){
        generateNew = true;
      }else{
        setRandomNumber(data.randomNumber);
      }
    }

    if(generateNew){
      const newNumber = Math.ceil(Math.random()*1000);
      localStorage.setItem(id, JSON.stringify({randomNumber: newNumber, time: time}));
      setRandomNumber(newNumber);
    }
  });

  return randomNumber%n;
}