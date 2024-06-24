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


export const ThickPath = ({ traversed }: PathProps) => {
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

export const Stepper = ({ items, currentStep, allChecked }: StepperProps) => {
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
