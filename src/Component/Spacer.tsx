import React from 'react';

interface SpacerProps {
  height?: number | string;
  width?: number | string;
}

const Spacer = ({ height = 0, width = 10 }: SpacerProps) => {
  const styles: React.CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
    width: typeof width === 'number' ? `${width}px` : width,
  };

  return <div style={styles} />;
};

export default Spacer;
