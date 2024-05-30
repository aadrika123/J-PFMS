import Image from "next/image";
import React, { useState, useRef, ChangeEvent } from "react";
import { LuCloudy } from "react-icons/lu";
import { ImBin } from "react-icons/im";
import { IoCheckmarkCircle } from "react-icons/io5";
import CoverIcon from "@/assets/svg/Parchment.svg";

type ImageUploadUiPropType = {
  handleUpload: (file: any) => void;
  handleDeleteFile: (type: string, index: number) => void;
  fileInfo: any;
};

const ImageUploadUi: React.FC<ImageUploadUiPropType> = (props) => {
  const { handleUpload, handleDeleteFile, fileInfo } = props;
  const inputFileRef = useRef<any>();
  const [state, setState] = useState({
    inProgress: false,
    error: "",
    fileUrl: "",
    fileType: "",
  });

  const { inProgress, error } = state;

  const handleUploadDoc = () => {
    inputFileRef.current.click();
  };

  ///////////// Checking File Type
  const validateFileType = (file: any) => {
    const fileTypes = ["jpeg", "jpg", "pdf"];

    return fileTypes.some((type) => file?.type?.includes(type));
  };

  ////// Handle Upload
  const interalHandleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    let status: any = {
      file: null,
      file_name: "",
      size: 0,
    };
    setState((prev: any) => {
      return { ...prev, inProgress: true };
    });
    try {
      if (e.target.files?.length) {
        const file = e.target.files[0];
        if (file.size > 2 * 1024 * 1024 || file.size! < 9 * 1024) {
          throw Error(`file size should be between 10 kb to 2 mb`);
        }
        if (!validateFileType(file)) {
          throw Error(`'${file.type.split("/")[1]}' file not allowed`);
        }
        status = {
          ...status,
          size: file.size,
          file_name: file.name,
          file: file,
        };

        setState((prev) => ({
          ...prev,
          fileType: file?.type?.includes("pdf") ? "pdf" : "",
          fileUrl: URL.createObjectURL(file),
        }));

        handleUpload(status);
      }
    } catch (error: any) {
      status.error = error.message;
      console.log(error);
    } finally {
      setState((prev: any) => ({
        ...prev,
        inProgress: false,
        error: status.error,
      }));
      status.delete = error;
      e.target.value = '';
    }
  };

  return (
    <>
      <div className="my-2 border-[3px] rounded-xl border-dashed flex justify-center items-center flex-col">
        {inProgress == false && (
          <>
            <div className="rounded-md mt-8">
              <LuCloudy className="text-[1.5rem]" />
            </div>
            <h3 className="text-xl text-black font-openSans">Choose a file </h3>
            <h1 className="text-gray-400 text-sm">
              JPEG, PNG, JPG, and PDF formats, up to 2MB
            </h1>
          </>
        )}

        <div className="mb-4">
          <input
            type="file"
            accept=".jpg, .jpeg, .pdf .png"
            className="hidden"
            ref={inputFileRef}
            onChange={interalHandleUpload}
          />

          {error && <p className="text-red-500 text-sm m-2">{error}</p>}

          <div className="flex justify-center">
            <button
              className={`bg-white border-gray-300 border text-gray-150 text-sm px-14 py-1 mt-2 hover:bg-gray-200 hover:text-gray-500  rounded leading-5 shadow-lg`}
              onClick={handleUploadDoc}
            >
              Browse File
            </button>
          </div>
        </div>
      </div>
      {/* Document List */}
      <div className="grid gap-3">
        {fileInfo?.files?.length > 0 &&
          fileInfo?.files.map((file: any, index: number) => (
            <div
              key={index}
              className="bg-gray-100 px-4 py-1 flex items-center justify-between rounded-lg"
            >
              <div className="flex items-center">
                <Image
                  src={CoverIcon}
                  height={30}
                  width={30}
                  alt="tender-icon"
                />
                <div className="ml-1">
                  <span className="text-sm">{file?.file_name}</span>
                  <div className="flex items-center text-xs text-secondary">
                    <span>{file?.size} kb</span>
                    <div className="flex items-center ml-2">
                      <IoCheckmarkCircle className="" />
                      <span>completed</span>
                    </div>
                  </div>
                </div>
              </div>
              <ImBin
                className="cursor-pointer"
                onClick={() => handleDeleteFile(fileInfo?.type, index)}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default ImageUploadUi;
