import React, { useRef, useState } from "react";
import { baseURL, Authorization } from "@/lib/axiosConfig";
import axios from "axios";

/**
 * | Author- Bijjoy Paitandi
 * | Created On- 18-04-2024
 * | Created for- File input button to be used in forms
 * | Status- under development, does not seem to work, backend is not able to read the file
 */

interface FileInputButtonProps {
  name: string;
  onFileUploaded: (name: string, token: string) => void
}

const FileInputButton: React.FC<FileInputButtonProps> = (props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [progressValue, setProgressValue] = useState<number>(0);

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

  const onChange = () => {
    // event.preventDefault();

    if (ref.current?.files) {
      const file = ref.current.files[0];
      console.log(file);

      const formData = new FormData();
      formData.append("doc", file);

      axiosWithMultipartFormdata({
        method: "post",
        url: "/file-handler/upload-single-doc",
        data: formData,
      })
        .then(function (response) {
          console.log(response);
          const token = response.data?.data?.file_token;
          props.onFileUploaded(props.name, token);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="flex">
        <div>
          <button
            className="rounded-2xl bg-primary_bg_indigo hover:text-grey text-white p-2"
            onClick={(event) => {
              if (ref) {
                (ref.current as HTMLInputElement).click();
              }
              event.preventDefault();
            }}
          >
            Upload
          </button>

          <input
            type="file"
            className="hidden"
            ref={ref}
            onChange={onChange}
          />
        </div>
        <div className="mx-2 flex items-center">
          <div>
            <progress value={progressValue} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FileInputButton;
