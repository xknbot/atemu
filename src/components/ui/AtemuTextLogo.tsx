import React from 'react';
import Image from 'next/image';

interface TextLogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const TextLogo: React.FC<TextLogoProps> = ({ src, alt, width = 300, height = 111, className }) => {
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

export default TextLogo;
