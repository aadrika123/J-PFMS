"use client";
import React from "react";
import Popup from "../global/molecules/Popup";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closePopup } from "@/redux/reducers/PopupReducers";
import { useDispatch } from "react-redux";
import { FormikWrapperProps } from "@/utils/types/formikTypes";

const PopupFormikHOC = <P extends FormikWrapperProps>(
  WrappedComponent: React.ComponentType<any>
): React.FC<any> => {
  const HOCComponent: React.FC<P> = (props) => {
    const { resetInitialValue, title } = props;
    const dispatch = useDispatch();
    const isPopupOpen = useSelector((state: RootState) => state.popup.isOpen);
    const handleClosePopup = () => {
      if (resetInitialValue) {
        resetInitialValue();
      }
      dispatch(closePopup());
    };
    return (
      <>
        {isPopupOpen && (
          <Popup title={title}>
            <WrappedComponent {...props} onClose={handleClosePopup} removeShadow={true} />
          </Popup>
        )}
      </>
    );
  };

  return HOCComponent;
};

export default PopupFormikHOC;
