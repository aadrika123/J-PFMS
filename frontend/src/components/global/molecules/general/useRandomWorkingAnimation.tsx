import React, { ReactNode, useState } from 'react';
import RandomWorkingPopup from './RandomWorkingPopup';


export function useRandomWorkingAnimation(): [ReactNode, () => void, ()=> void] {
  const [show, setShow] = useState<boolean>(false);

  const activateWorkingAnimation = () => {setShow(true);}

  const hideWorkingAnimation = () => {setShow(false);}

  const workingAnimation = (<RandomWorkingPopup show={show}/>);

  return [workingAnimation, activateWorkingAnimation, hideWorkingAnimation];
}