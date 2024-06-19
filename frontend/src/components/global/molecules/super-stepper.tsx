import React from 'react';

/*
add custom variables to theme file for setting the colours, widths of the cells etc.
*/


const CheckMark = () => {
    return <span className="text-2xl">✓</span>;
}

const Padding = () => {
    return (
        <div className="w-10 flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
    );
}


interface PathProps {
    traversed: boolean
}

const Path = ({ traversed }: PathProps) => {
    return (
        <div className={
            traversed ?
                "w-10 h-[2px] flex-1 bg-indigo-400 group-last:hidden dark:bg-neutral-700" :
                "w-10 h-[2px] flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"
        }>

        </div>
    );
}


const ThickPath = ({ traversed }: PathProps) => {
    return (
        <div className={
            traversed ?
                "w-10 h-1 flex-1 bg-indigo-400 group-last:hidden dark:bg-neutral-700" :
                "w-10 h-1 flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"
        }>
        </div>
    );
}

interface StepProps {
    first: boolean;
    last: boolean;
    checked: boolean;  // set it to make it always check irrespective of stepNumber and currentStep
    stepNumber: number;  // stepNumber of this Step Component
    currentStep: number; // index of the active step of the stepper

}

const InactiveStep = ({ first, last, stepNumber, currentStep, checked }: StepProps) => {
    return (
        <div className="flex justify-center items-center">
            {first ? <Padding /> : <Path traversed={checked || stepNumber <= currentStep} />}
            <div className={
                stepNumber <= currentStep || checked ? "border bg-indigo-400 rounded-full h-10 w-10 justify-center items-center flex" :
                    "border bg-gray-400 opacity-20 rounded-full h-10 w-10 justify-center items-center flex"
            }>
                <CheckMark />
            </div>
            {last ? <Padding /> : <Path traversed={checked || currentStep > stepNumber} />}
        </div>
    );
}



const ActiveStep = ({ first, last, stepNumber, currentStep }: StepProps) => {
    return (
        <div className="flex justify-center items-center">
            {first ? <Padding /> : <Path traversed={stepNumber <= currentStep} />}
            <div className="h-10 w-10 justify-center items-center flex">
                <span className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-indigo-800"></span>
                </span>
            </div>
            {last ? <Padding /> : <Path traversed={currentStep > stepNumber} />}
        </div>

    );
}

interface StepLabelProps {
    label: string;
}

const StepLabel = ({ label }: StepLabelProps) => {
    return (
        <div className="justify-center items-center flex text-center">{label}</div>
    );
}

interface StepperProps {
    items: string[];
    currentStep: number;
    allChecked: boolean;
}

const Stepper = ({ items, currentStep, allChecked }: StepperProps) => {
    return (
        <div className="table">
            <div className="table-row">
                {items.map((item, index) => {

                    if (index < items.length - 1) {

                        if (index == currentStep) return (
                            <>
                                <div className="table-cell align-middle justify-center items-center">
                                    <ActiveStep
                                        first={index == 0}
                                        last={index == items.length - 1}
                                        checked={allChecked || index < currentStep}
                                        stepNumber={index}
                                        currentStep={currentStep}
                                    />
                                </div>

                                <div className="table-cell align-middle">
                                    <Path traversed={allChecked || currentStep > index} />
                                </div>
                            </>

                        );
                        else return (
                            <>
                                <div className="table-cell align-middle">
                                    <InactiveStep
                                        first={index == 0}
                                        last={index == items.length - 1}
                                        checked={allChecked || index < currentStep}
                                        stepNumber={index}
                                        currentStep={currentStep}
                                    />

                                </div>
                                <div className="table-cell align-middle">
                                    <Path traversed={allChecked || currentStep > index} />
                                </div>


                            </>
                        );
                    }
                    else {
                        if (index == currentStep) return (<div className="table-cell" key={index}>
                            <ActiveStep
                                first={index == 0}
                                last={index == items.length - 1}
                                checked={allChecked || index < currentStep}
                                stepNumber={index}
                                currentStep={currentStep}
                            />
                        </div>);
                        else return (
                            <div className="table-cell" key={index}>
                                <InactiveStep
                                    first={index == 0}
                                    last={index == items.length - 1}
                                    checked={allChecked || index < currentStep}
                                    stepNumber={index}
                                    currentStep={currentStep}
                                />
                            </div>
                        );
                    }
                })}
            </div>



            <div className="table-row">
                {items.map((item, index) => {

                    if (index < items.length - 1) {

                        if (index == currentStep) return (
                            <>
                                <div className="table-cell align-middle">
                                    <StepLabel label={item} />
                                </div>

                                <div className="table-cell align-middle">

                                </div>
                            </>

                        );
                        else return (
                            <>
                                <div className="table-cell align-middle">
                                    <StepLabel label={item} />

                                </div>
                                <div className="table-cell align-middle">


                                </div>


                            </>
                        );
                    }
                    else return (
                        <div className="table-cell" key={index}>
                            <StepLabel label={item} />
                        </div>
                    );
                })}
            </div>





        </div>
    );
}


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