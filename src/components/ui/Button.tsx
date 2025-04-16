import React from 'react';
import classNames from 'classnames';
import styles from '@/styles/button.module.css'; // Giả định có file CSS Module cho kiểu dáng




// Định nghĩa interface cho props của Button
interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'third';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

// Component Button với TypeScript
const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  className,
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