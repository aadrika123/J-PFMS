"use client";
import React from "react";

////////// Resuable Paragraph
export const Paragraph = ({ desc }: { desc: string }) => {
  return <p className="text-gray-500">{desc}</p>;
};
