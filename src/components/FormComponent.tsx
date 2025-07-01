import React, { useState } from 'react';
import Button from '@/components/ui/Button/Button';

const FormComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked!', e);
    setCount(count + 1);
  };

  const handleSubmit = () => {
    alert('Form submitted!');
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <p>Count: {count}</p>
      
      {/* Button with click handler */}
      <Button onClick={handleClick}>
        Increment Count
      </Button>

      {/* Submit button */}
      <Button type="submit" variant="primary" onClick={handleSubmit}>
        Submit Form
      </Button>

      {/* Reset button */}
      <Button type="reset" variant="secondary">
        Reset
      </Button>
    </form>
  );
};

export default FormComponent;