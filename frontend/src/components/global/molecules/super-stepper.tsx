import React from 'react';
import { Stepper, ThickPath } from './stepper';

/*
add custom variables to theme file for setting the colours, widths of the cells etc.
*/




export interface GroupDict {
    [idx: string]: string[]
}

interface SuperStepperProps {
    items: GroupDict | undefined,
    activeStep: number | undefined
}

const SuperStepper = ({ items, activeStep }: SuperStepperProps) => {

    if(!items) return (<>Loading Stepper...</>);

    if (!activeStep) activeStep = 0;
    // validate the input
    const groupNames = Object.keys(items);

    let error = null;

    const currentStep: [number, number] = [0,0];

    // const stepBack = () => {
    //     if (currentStep[0] > 0) {
    //         if (currentStep[1] > 0) {
    //             currentStep[1]--;
    //         } else {
    //             currentStep[0]--;
    //             currentStep[1] = items[groupNames[currentStep[0] - 1]].length - 1;
    //         }
    //     }
    // }

    const stepAhead = () => {
        if (currentStep[0] < groupNames.length - 1) {
            if (currentStep[1] < items[groupNames[currentStep[0]]].length - 1) {
                currentStep[1] ++;
            } else {
                currentStep[0]++;
                currentStep[1]= 0;
            }
        }
    }


    for(let i=0;i<activeStep;i++){
        stepAhead();
    }
    


    if (currentStep[0] < 0 || currentStep[0] >= groupNames.length)
        error = `step index (${currentStep[0]}) is invalid.`;

    else if (currentStep[1] < 0 || currentStep[1] >= items[groupNames[currentStep[0]]].length)
        error = `substep index (${currentStep[1]}) for '${groupNames[currentStep[0]]}' is invalid.`;


    return (
        error ? (<div className="border border-1 rounded p-2 border-red-600">
            Cannot Render
            <span className="font-bold text-red-600 m-2">vSuperStepper</span>
            because {error}
        </div>
        ) : (
            <>

                <div className="flex">

                    {
                        groupNames.map((groupName, index) => {
                            return (
                                <div key={index} className="flex justify-center items-center">
                                    <div className="flex flex-col justify-center">
                                        {/* <div className="text-center">{items[groupName].length==1?"":groupName}</div> */}
                                        <div className="text-center">{groupName}</div>
                                        <div className={
                                            index <= currentStep[0] ?
                                                "border-4  border-indigo-400 justify-center items-center p-2 rounded-lg" :
                                                "border justify-center items-center p-2 rounded-lg"
                                        }>
                                            <Stepper items={items[groupName]} currentStep={index == currentStep[0] ? currentStep[1] : -1} allChecked={index < currentStep[0]} />
                                        </div>
                                    </div>
                                    {index < groupNames.length - 1 ? <ThickPath traversed={index < currentStep[0]} /> : <></>}
                                </div>


                            );
                        })
                    }

                </div>

            </>
        )
    )
}


export default SuperStepper;