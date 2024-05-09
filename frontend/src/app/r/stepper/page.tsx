import React from "react";
import StepperTech from "@/components/JuidcoPfms/page/Contract-management/stepperTech";
import PageLayout from "@/components/Layouts/PageLayout";

export default function Contract() {
    const activeStepper: number = 1; // Set the initial active stepper number

    return (
        <PageLayout>
            <StepperTech activeStepper={activeStepper} />
        </PageLayout>
    );
}
