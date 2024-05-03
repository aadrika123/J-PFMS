import React from "react";
import Popup from "./Popup";

interface ErrorConfirmPopupProps {
  message: string;
  handleContinueButton: () => void;
}

const ErrorConfirmPopup: React.FC<ErrorConfirmPopupProps> = (
  props
) => {
  const { message, handleContinueButton } = props;
  return (
    <Popup title="" zindex={50}>
      <div className="flex flex-col justify-center items-center w-auto">
        <div
          className="absolute top-3 right-3 cursor-pointer"
          onClick={handleContinueButton}
        >
          <svg
            width="45"
            height="38"
            viewBox="0 0 45 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect width="45" height="38" fill="url(#pattern0)" />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_184_9507"
                  transform="matrix(0.00938272 0 0 0.0111111 0.0777778 0)"
                />
              </pattern>
              <image
                id="image0_184_9507"
                width="90"
                height="90"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7UlEQVR4nO2cQU7DMBBFZzXh5DTnYRHlQlBuMVVRkFBVBG3i8f/j/yRvWKDnp9ZtqRkzIYQQQgghhBBCCHGPycxmMztva95+xgKFv5vZm5nFzVrN7MXwofD/TRJSltX/L0koWVb//0oGgiyr/6OSARabwv/6Srw8IRnbWjq/mtP4zzsko3PsvZG/1ylD9nyAaHQ4Rp49Lu6tT6bQkRj7yMjX9Z7g/PW0OUo4Eo6Ro46Ln+u1oW9T8aVRbCbXlKdiNDhGGBzpN+LAbmU25IBOh4C0MQdyaQLCBh3AIYWeG/VRIvfcsI8WucfGfdTImQF89MgZIVyRcz4CLw1+J9w33o/iDR59wx8XbLFXxjOZLfZaMTJa7NKRUWIPEbl37KEi94o9ZOTs2ENHzoqtyAmxFfkGhU7AdXTwRw4dIaa3dxm4PrDUjRwjHSOuPyqNEzkqP7IdLHLJ2A4auVRsfTmbgK4bJKALNAnoSlgCuuSYgK7tJoBwF84BHJqCtEEHcjkUxI05oNMukDfkwG7lNuIEjmX+7Xcicm0yryMSxVvEpprXEcRjJKjmdazEg1Fo5nUs5KN+KOZ1LBpeVWycWRV/igF9VfwpRk5W8acYolrFn2IscBX/aXvr97GtE9m//U7k/kIIIYQQQgghhBCWxQVCVmav1FT2GAAAAABJRU5ErkJggg=="
              />
            </defs>
          </svg>
        </div>
        <svg
          className="mt-6"
          xmlns="http://www.w3.org/2000/svg"
          width="191"
          height="191"
          viewBox="0 0 191 191"
          fill="none"
        >
          <path
            d="M95.5 0C42.8386 0 0 42.8386 0 95.5C0 148.161 42.8386 191 95.5 191C148.161 191 191 148.161 191 95.5C191 42.8386 148.161 0 95.5 0ZM152.8 64.1214C152.8 64.1214 102.867 119.239 91.68 132.336C80.4929 145.433 71.7614 132.336 71.7614 132.336L39.2914 98.7743C39.2914 98.7743 34.1071 90.8614 43.3843 83.4943C52.1157 76.4 59.21 83.4943 59.21 83.4943L82.13 107.506L139.157 54.2986C139.157 54.2986 144.614 50.4786 150.344 55.39C154.71 59.4829 152.8 64.1214 152.8 64.1214Z"
            fill="#12743B"
          />
        </svg>
        <span className="text-[20px] text-black my-8">{message}</span>
      </div>
    </Popup>
  );
};

export default ErrorConfirmPopup;
