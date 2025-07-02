import React from 'react';
import Image from 'next/image';

interface LogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ src, alt, width = 100, height = 141, className }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`max-w-none ${className}`}
    />
  );
};

export default Logo;
