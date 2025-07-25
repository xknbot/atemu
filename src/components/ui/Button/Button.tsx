import React from 'react';
import styles from '@/styles/button.module.css'; // Giả định có file CSS Module cho kiểu dáng




// Định nghĩa interface cho props của Button
interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'third';
  size?: 'small' | 'large' | 'medium';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isFlameEffect?: boolean; 
}

// Component Button với TypeScript
const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'small',
  disabled = false,
  loading = false,
  onClick,
  className,
  isFlameEffect = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  const buttonClasses = `
    ${styles.button}
    ${styles[`button--${variant}`]}
    ${styles[`button--${size}`]}
    ${disabled ? styles['button--disabled'] : ''}
    ${loading ? styles['button--loading'] : ''}
    ${disabled ? styles['no-hover'] : ''}
    ${isFlameEffect ? styles['button--flame'] : ''}
    ${className} // Thêm className từ props vào cuối
  `;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={handleClick}
    >
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  );
};



export default Button;