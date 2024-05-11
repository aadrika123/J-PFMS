import React from "react";

interface DebouncedSearchForFilterPanelProps {
  onSearching?: (e: boolean) => void;
  onChange: (e: string) => void;
  debounceDuration?: number | 1000; // default 1 second
  onRef?: (element: any) => void;
}

const DebouncedSearchForFilterPanel: React.FC<DebouncedSearchForFilterPanelProps> = (props) => {
  const debounceTime = props.debounceDuration;
  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      if(props.onSearching) props.onSearching(false);
      props.onChange(searchText);
    }, debounceTime);
    return () => clearTimeout(delayInputTimeoutId);
  }, [searchText, debounceTime]);

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const st = event.target.value;
      
      if(props.onSearching) props.onSearching(true);
      
      setSearchText(st);
  }

  return (
    <>
      <div className="relative text-sm">
        <div className="absolute top-[4px] left-3 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <g clipPath="url(#clip0_319_2858)">
              <path
                d="M15.365 14.2618L11.2844 10.1812C12.1751 9.01037 12.5878 7.5449 12.439 6.08131C12.2903 4.61771 11.5911 3.26527 10.483 2.29759C9.37495 1.32991 7.94067 0.819245 6.47038 0.868911C5.00008 0.918578 3.60354 1.52487 2.56329 2.56512C1.52304 3.60537 0.916747 5.00191 0.86708 6.47221C0.817414 7.9425 1.32808 9.37678 2.29576 10.4849C3.26344 11.5929 4.61588 12.2921 6.07948 12.4409C7.54307 12.5896 9.00854 12.1769 10.1794 11.2862L14.26 15.3668C14.4078 15.511 14.6061 15.5917 14.8125 15.5917C15.019 15.5917 15.2172 15.511 15.365 15.3668C15.5114 15.2202 15.5937 15.0215 15.5937 14.8143C15.5937 14.6072 15.5114 14.4084 15.365 14.2618ZM2.46877 6.68747C2.46877 5.85308 2.71619 5.03743 3.17975 4.34366C3.64332 3.64989 4.30219 3.10916 5.07307 2.78985C5.84395 2.47055 6.69219 2.387 7.51055 2.54978C8.32891 2.71256 9.08062 3.11436 9.67062 3.70436C10.2606 4.29437 10.6624 5.04608 10.8252 5.86443C10.988 6.68279 10.9044 7.53104 10.5851 8.30192C10.2658 9.07279 9.7251 9.73167 9.03133 10.1952C8.33756 10.6588 7.5219 10.9062 6.68752 10.9062C5.56904 10.9049 4.49675 10.46 3.70587 9.66912C2.91499 8.87823 2.47009 7.80595 2.46877 6.68747Z"
                fill="#1F2733"
              />
            </g>
            <defs>
              <clipPath id="clip0_319_2858">
                <rect
                  width="15"
                  height="15"
                  fill="white"
                  transform="translate(0.75 0.75)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <input
          onChange={handleChange}
          ref={(element) => {if (props.onRef) props.onRef(element)}}
          type="text"
          placeholder="Type here"
          className="border rounded bg-transparent border-zinc-400 w-full max-w-xs pl-10"
        />
      </div>
    </>
  );
};

export default DebouncedSearchForFilterPanel;