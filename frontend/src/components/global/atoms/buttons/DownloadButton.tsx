import React from "react";

interface DownloadButtonProps {
  url: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  ...props
}) => {
  return (
    <span className="ml-2 mt-1 flex items-center justify-center" title="download">

      <a href={props.url} download>
        <svg width="32" height="32" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.395114" y="0.395114" width="13.2098" height="12.7424" rx="3.55602" stroke="#726E6E" strokeWidth="0.790227" />
          <path d="M7 3.5V10M7 10L9 7.8125M7 10L5 7.8125" stroke="#726E6E" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </span>

  );
};

export default DownloadButton;
