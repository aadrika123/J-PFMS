import { Stepper, Step } from 'react-form-stepper';
import React from 'react';

interface Step {
    title: string;
  }
  
  interface HorizontalStepperProps {
    steps: Step[];
    activeStep: number;
  }
  
  const HorizontalStepper: React.FC<HorizontalStepperProps> = ({
    steps,
    activeStep,
  }) => {
    return (
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
            return (<Step key={`step${index}`} label={step.title}/>);
        })}
      </Stepper>
  
    );
  }

  export default HorizontalStepper;
  