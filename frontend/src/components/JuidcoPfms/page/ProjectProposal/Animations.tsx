'use client'
import React from 'react'
import Lottie from "react-lottie";
import animationRunning from "@/json/running.json";

export const RunningAnimation = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationRunning,
      renderer: "svg",
    };
    return <Lottie options={defaultOptions} height={50} width={50} />;
  };