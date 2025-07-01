import React from 'react';
import Button from '@/components/ui/Button/Button';

const CustomStyledComponent = () => {
  return (
    <div>
      {/* Button with additional custom className */}
      <Button 
        className="mt-4 shadow-lg hover:shadow-xl transition-shadow"
        variant="primary"
      >
        Custom Styled Button
      </Button>

      {/* Button with inline styles if needed */}
      <div className="flex gap-4">
        <Button className="flex-1" variant="third">
          Full Width
        </Button>
        <Button className="w-32" variant="third">
          Fixed Width
        </Button>
      </div>
    </div>
  );
};

export default CustomStyledComponent;