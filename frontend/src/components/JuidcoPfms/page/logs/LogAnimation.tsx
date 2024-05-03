import React from 'react'
import Lottie from 'react-lottie';
import animationCelebration from "@/json/celebration.json"
import animationBear from "@/json/bear.json"
import animationEmoji from "@/json/emoji.json"

export const CelebrationAnimation = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationCelebration,
      renderer: "svg",
    };
    return <Lottie options={defaultOptions} height={600} width={900} />;
  };

  export const BearAnimation = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationBear,
      renderer: "svg",
    };
    return <Lottie options={defaultOptions} height={400} width={500} />;
  };

  export const EmojiAnimation = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationEmoji,
      renderer: "svg",
    };
    return <Lottie options={defaultOptions} height={80} width={80} />;
  };