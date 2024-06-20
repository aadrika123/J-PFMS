import React from "react";
import Lottie from "react-lottie";
import animationLogin from "@/json/LoginAnime.json"

export const LoginAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationLogin,
    renderer: "svg",
  };
  return <Lottie options={defaultOptions} height={450} width={600} />;
};