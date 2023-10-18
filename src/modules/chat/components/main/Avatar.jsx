import React from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../../../redux/uiSlice";
import {
  getStatusBorderColor,
  getStatusColor,
} from "../../../../utils/helpers";

export const Avatar = ({ imageUrl, altText, size, status, type }) => {
  const darkMode = useSelector(selectDarkMode);

  const avatarStyle = {
    width: size,
    height: size,
    // borderRadius: "100%",
    // objectFit: "cover",
    // position: "relative",
  };

  const statusCircleStyle = {
    position: "absolute",
    bottom: "0px",
    right: type === "profile" ? "32px" : type === "feed" ? "10px" : "0",
    width: type === "profile" ? "28px" : type === "feed" ? "21px" : "12px",
    height: type === "profile" ? "28px" : type === "feed" ? "21px" : "12px",
    borderRadius: "100%",
    backgroundColor: getStatusColor(status),
    border: `2px solid ${getStatusBorderColor(status, darkMode)}`,
  };

  return (
    <div className="relative rounded-full">
      <img
        src={imageUrl}
        alt={altText}
        style={avatarStyle}
        className="w-full h-full object-cover inline-block rounded-full transform hover:scale-[1.02] hover:saturate-[1.4] duration-500 ease-in-out dark:ring-gray-800"
      />
      <div style={statusCircleStyle} />
    </div>
  );
};
