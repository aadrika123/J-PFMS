import Button from "@/components/global/atoms/buttons/Button";
import React from "react";

interface AddMeasurementComponentProps {
    onBack: () => void,
}

export const AddMeasurementComponent = ({ onBack }: AddMeasurementComponentProps) => {
    return (
        <>
            <div className="flex justify-self-start m-5">
                <b>Add Measurement</b>
            </div>
            {/* secoond task  */}
            <div className="flex justify-between   m-5 rounded-xl">
                <div className="">
                    <label htmlFor="input1">Length</label>
                    <br />
                    <br />
                    <input
                        id="input1"
                        type="text"
                        placeholder="XYZ VALUE"
                        style={{
                            border: "2px solid #cccc",
                            height: "30px",
                            width: "200px",
                            padding: "20px",
                            borderRadius: "5px",
                            // marginBottom: "60px"
                        }}
                    />
                </div>
                <div className="">
                    <label htmlFor="input2">Breadth</label>
                    <br />
                    <br />
                    <input
                        id="input1"
                        type="text"
                        placeholder="XYZ VALUE"
                        style={{
                            border: "2px solid #cccc",
                            height: "30px",
                            width: "200px",
                            padding: "20px",
                            borderRadius: "5px",
                            // marginBottom: "60px"
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="input3">Height</label>
                    <br />
                    <br />
                    <input
                        id="input1"
                        type="text"
                        placeholder="XYZ VALUE"
                        style={{
                            border: "2px solid #cccc",
                            height: "30px",
                            width: "200px",
                            padding: "20px",
                            borderRadius: "5px",
                        }}
                    />
                </div>
            </div>
            {/* third task */}
            <div className="flex items-end gap-3 m-5">
                <div>
                    <label htmlFor="input1">Add Qunatities & Rates</label>
                    <br />
                    <br />
                    <input
                        id="input1"
                        type="text"
                        placeholder="Quantities"
                        style={{
                            border: "2px solid #cccc",
                            height: "30px",
                            width: "200px",
                            padding: "20px",
                            borderRadius: "10px",
                            // marginBottom: "60px"
                        }}
                    />
                </div>
                <div>
                    <input
                        id="input2"
                        type="text"
                        placeholder="Rates"
                        style={{
                            border: "2px solid #cccc",
                            height: "30px",
                            width: "200px",
                            padding: "20px",
                            // marginTop: "10px",
                            borderRadius: "10px",
                            // marginBottom: "10px",
                        }}
                    />
                </div>

                <div>
                    <button className="flex justify-between ">
                        <svg
                            width="37"
                            height="37"
                            viewBox="0 0 37 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18.155 36.31C8.12831 36.31 2.88671e-05 28.1818 2.88671e-05 18.155C2.88671e-05 8.12828 8.12831 0 18.155 0C28.1818 0 36.3101 8.12828 36.3101 18.155C36.3101 28.1818 28.1818 36.31 18.155 36.31Z"
                                fill="#4338CA"
                            />
                            <path
                                d="M17.6039 26.5387V10.668"
                                stroke="white"
                                strokeWidth="2.26725"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9.66852 18.6035H25.5393"
                                stroke="white"
                                strokeWidth="2.26725"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <br />
            {/* fourth task */}
            <div className="flex items-end m-5">
                <div>
                    <label htmlFor="input1">Schedule of Rates</label>
                    <br />
                    <br />
                    <select
                        id="input1"
                        style={{
                            border: "2px solid #000000",
                            height: "40px",
                            width: "200px",
                            padding: "5px",
                            borderRadius: "10px",
                            backgroundColor: "#ffffff",
                        }}
                    >
                        <option value="option1">Drop Down</option>
                        <option value="option2">Drop Down</option>
                        <option value="option3">Drop Down</option>
                    </select>
                </div>
            </div>
            <br />
            <br />
            {/* fifth task */}

            <div className="flex gap-2 justify-end">
                <div>
                    <Button variant="primary">Save and Acknowledge</Button>
                </div>
                <div>
                   <Button variant="primary" onClick={onBack}>Back</Button>
                </div>
            </div>
            
        </>
    );
}