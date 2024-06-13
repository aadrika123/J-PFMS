import { Authorization, baseURL } from "@/lib/axiosConfig";
import axios from "axios";
import React, { ChangeEvent, createRef } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";


const MIN_FILE_SIZE = 1024 * 10 ;
const MAX_FILE_SIZE = 1024 * 1024 * 5;


interface DocumentInputSingleProps {
    caption: string;
}




const fileValidation = Yup.object({
    size: Yup.number().required().min(MIN_FILE_SIZE, "File size below lower limit. (10kb)").max(MAX_FILE_SIZE, "File size above max limit (2MB)"),
    type: Yup.string().required().oneOf([
        "application/pdf",
    ], "This file format is not supported."),
    name: Yup.string().required()
});


interface DocumentInputSingleState {
    errorMessage: string;
    isUploading: boolean;
    progressValue: number;
    isUploaded: boolean;
    docToken: string;
}






export default class DocumentInputSingle extends React.Component<DocumentInputSingleProps> {
    private fileInputElementRef = createRef<HTMLInputElement>();
    private formRef = createRef<HTMLFormElement>();
    

    public state: DocumentInputSingleState;
    constructor(props: DocumentInputSingleProps) {
        super(props);
        this.state = {
            errorMessage: "",
            isUploading: false,
            progressValue: 0,
            isUploaded: false,
            docToken: "",
        };

        this.onChange = this.onChange.bind(this);
        this.setProgressValue = this.setProgressValue.bind(this);
        this.setIsUploaded = this.setIsUploaded.bind(this);
        this.setIsUploading = this.setIsUploading.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);
        this.setDocToken = this.setDocToken.bind(this);

        this.getDocToken = this.getDocToken.bind(this);
    }

    getDocToken() {
        const {docToken} = this.state;
        return docToken;
    }



    setProgressValue(value: number) {
        this.setState({ progresValue: value });
    }

    setIsUploading(value: boolean) {
        this.setState({ isUploading: value });
    }

    setIsUploaded(value: boolean) {
        this.setState({ isUploaded: value });
    }

    setErrorMessage(msg: string) {
        this.setState({ errorMessage: msg });
    }


    setDocToken(token: string){
        this.setState({docToken: token});
    }


    async onChange(el: ChangeEvent<HTMLInputElement>) {
        console.log("Change", el);


        const axiosWithMultipartFormdata = axios.create({
            baseURL: baseURL,
            headers: {
                "Authorization": Authorization,
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                console.log(progressEvent);
                if (progressEvent.total)
                    this.setProgressValue(progressEvent.loaded / progressEvent.total);
            },
        });



        try {
            const files = this.fileInputElementRef.current?.files;
            if (files) {

                const file = files[0];


                // validate
                await fileValidation.validate({
                    name: file.name,
                    type: file.type,
                    size: file.size
                });


                // upload to backend

                if (this.formRef?.current) {
                    const formData = new FormData(this.formRef.current);

                    this.setIsUploading(true);
                    this.setIsUploaded(false);

                    axiosWithMultipartFormdata({
                        method: "post",
                        url: `${baseURL}/project-verification/measurements/ref-doc-upload`,
                        data: formData,
                    })
                        .then((response) => {
                            console.log("Response: ", response);
                            const data = response.data;
                            if(!data.status) throw new Error(data?.data);
                            const token = response.data?.data?.file_token;
                            // props.onFileUploaded(props.name, token);
                            // console.log("Token: " , token);
                            this.setDocToken(token);
                            this.setIsUploading(false);
                            this.setIsUploaded(true);
                        })
                        .catch((error) => {
                            // toast.error(error.toString());
                            this.setErrorMessage(error.toString());
                            console.log(error);
                        });

                }

                // receive the response

                // accordingly either show an error message or get ready to allow another document upload
            }


        } catch (error: any) {
            this.setErrorMessage(error.toString());
        }
    }

    render() {
        const { errorMessage, isUploading, progressValue, isUploaded } = this.state;
        return (
            <>

                <form ref={this.formRef}>
                    <div className="flex justify-between">
                        <div className="mx-2 flex items-center text-blue-800">
                            {this.props.caption}
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
                                    if (this.fileInputElementRef) {
                                        (this.fileInputElementRef.current as HTMLInputElement).click();
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
                                ref={this.fileInputElementRef}
                                onChange={this.onChange}
                            />

                            
                        </div>
                        <div className="text-red-500 ml-10" >{errorMessage}</div>


                    </div>
                </form>



            </>
        );
    }
}
