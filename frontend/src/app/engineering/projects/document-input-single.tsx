import { Authorization, baseURL } from "@/lib/axiosConfig";
import axios from "axios";
import React, { ChangeEvent, forwardRef, useImperativeHandle, useRef, useState } from "react";
import { MeasurementRecordValidation } from "pfmslib";



interface DocumentInputSingleProps {
    caption: string;
}


export interface CanProvideFileToken {
    getFileToken(): Promise<any>;
}


const DocumentInputSingle = forwardRef<CanProvideFileToken, DocumentInputSingleProps>((props: DocumentInputSingleProps, ref) => {

    const fileInputElementRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const [progressValue, setProgressValue] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [docToken, setDocToken] = useState<string | null>(null);


    useImperativeHandle(ref, () => ({
        async getFileToken() {
            return docToken;
        }
    }));


    const axiosWithMultipartFormdata = axios.create({
        baseURL: baseURL,
        headers: {
            "Authorization": Authorization,
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
            console.log(progressEvent);
            if (progressEvent.total)
                setProgressValue(progressEvent.loaded / progressEvent.total);
        },
    });


    // getDocToken() {
    //     return this.docToken;
    // }


    const onChange = async (el: ChangeEvent<HTMLInputElement>) => {
        setErrorMessage("");
        console.log("Change", el);


        try {
            const files = fileInputElementRef.current?.files;
            if (files) {

                const file = files[0];


                // validate
                await MeasurementRecordValidation.MeasurementReferenceDocValidation.validate({
                    name: file.name,
                    type: file.type,
                    size: file.size
                });


                // upload to backend

                if (formRef?.current) {
                    const formData = new FormData(formRef.current);

                    setIsUploading(true);
                    setIsUploaded(false);

                    axiosWithMultipartFormdata({
                        method: "post",
                        url: `${baseURL}/project-verification/measurements/ref-doc-upload`,
                        data: formData,
                    })
                        .then((response) => {
                            console.log("Response: ", response);
                            const data = response.data;
                            if (!data.status) throw new Error(data?.data);
                            const token = response.data?.data?.file_token;
                            // props.onFileUploaded(props.name, token);
                            console.log("Token: ", token);
                            // docToken = token;
                            setDocToken(token);
                            setIsUploading(false);
                            setIsUploaded(true);
                        })
                        .catch((error) => {
                            // toast.error(error.toString());
                            setErrorMessage(error.toString());
                            console.log(error);
                        });

                }

                // receive the response

                // accordingly either show an error message or get ready to allow another document upload
            }


        } catch (error: any) {
            setErrorMessage(error.toString());
        }
    }


    return (
        <>
            <form ref={formRef}>
                <div className="flex justify-between">
                    <div className="mx-2 flex items-center text-blue-800">
                        {props.caption}
                    </div>

                    {isUploading && (
                            <div className="mx-2 flex items-center">
                                <div>
                                    <progress value={progressValue} />
                                </div>
                            </div>
                        )}


                    {isUploaded && (
                        <div className="mx-2 flex items-center text-green-800">Uploaded</div>
                    )}


                    <div>
                        <button
                            className="rounded-2xl bg-primary_bg_indigo hover:text-grey text-white p-2"
                            onClick={(event) => {
                                if (fileInputElementRef) {
                                    (fileInputElementRef.current as HTMLInputElement).click();
                                }
                                event.preventDefault();
                            }}
                        >
                            Upload
                        </button>
                        <input
                            type="file"
                            name='doc'
                            className="hidden"
                            ref={fileInputElementRef}
                            onChange={onChange}
                        />


                    </div>
                    <div className="text-red-500 ml-10" >{errorMessage}</div>


                </div>
            </form>



        </>
    );
});

DocumentInputSingle.displayName = "DocumentInputSingle";


export default DocumentInputSingle;
