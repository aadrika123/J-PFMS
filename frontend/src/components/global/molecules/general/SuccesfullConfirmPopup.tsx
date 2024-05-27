import React from "react";
import Popup from "./Popup";

interface SuccesfullConfirmPopupProps {
  message: string;
}

const SuccesfullConfirmPopup: React.FC<SuccesfullConfirmPopupProps> = (
  props
) => {
  const { message } = props;
  return (
    <Popup title="" zindex={50}>
      <div className="flex flex-col justify-center items-center w-auto">
        <svg
          width="191"
          height="191"
          viewBox="0 0 191 191"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <circle cx="87.6773" cy="87.6631" r="86.8785" fill="#4338CA" />
          <rect
            x="43"
            y="43"
            width="90"
            height="90"
            fill="url(#pattern0_1268_586)"
          />
          <defs>
            <pattern
              id="pattern0_1268_586"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlinkHref="#image0_1268_586" transform="scale(0.0111111)" />
            </pattern>
            <image
              id="image0_1268_586"
              width="90"
              height="90"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAABa0lEQVR4nO3ZsUoDQRRG4TWF0cLnthELu3Q+g0XYJ7ITRCKWRxZXECxMIvPP7M75IBDYIvcehrDZDIMkSZIkSZIkSZIUAWyBO+AFOAA74Drz6X1F3vPbrvZsPUSevNWer4fIk9faM/YQeXJfe84eIk/Xt7VnXSzgEnj6I/IIXNWedbGMHGDkACMHGDnAyAFGDjBygJEDjBxg5AAjBxg5wMgBRg4wcoCRA4wcYOSAxUcGNsDF0DCW/EcqcAM8Ah/AO/DQ4qAsOfJkjtz0wKwg8mY+yc0OztIj/wh9aHUB1hD52/yd3NwirClyqwvR4EyruzeloVlWuyANzBBRc1F6iVxzYXqLXGNxeo2cDEDvkRMhMHL5IBi5fBiMXD4QRj7Of0Jh5NOcEwwjn+eUcBg59oRtv7qncGlHnta+f4w0EHs0cvnYo5HLn+zRyOVjj0YuH3s0cplbv1vgeX5N772FkyRJkiRJkiRJ0vDlEzK9oz9IQJAwAAAAAElFTkSuQmCC"
            />
          </defs>
        </svg>

        <span className="text-[20px] text-black my-8">{message}</span>
      </div>
    </Popup>
  );
};

export default SuccesfullConfirmPopup;
