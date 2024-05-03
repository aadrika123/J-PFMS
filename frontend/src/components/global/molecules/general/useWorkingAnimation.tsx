import React, { ReactNode, useState } from 'react';
import WorkingPopup from './WorkingPopup';


export function useWorkingAnimation(): [ReactNode, () => void, ()=> void] {
  const [show, setShow] = useState<boolean>(false);

  const activateWorkingAnimation = () => {setShow(true);}

  const hideWorkingAnimation = () => {setShow(false);}

  const workingAnimation = show? <WorkingPopup/> : <></>;

  return [workingAnimation, activateWorkingAnimation, hideWorkingAnimation];
}