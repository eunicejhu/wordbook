import React from "react";

const ArrowRight = props => {
  let { width, height, color, classes } = props;

  return (
    <svg width={width || 20} height={height || 20} viewBox="0 0 129 129">
      <title>arrow_right</title>
      <path
        d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"
        fill={color || "#c8e7ea"}
      />
    </svg>
  );
};

export default ArrowRight;
