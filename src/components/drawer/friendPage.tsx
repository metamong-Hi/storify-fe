import React, { useState } from 'react';
import FriendDrawer from './friend';

const FriendPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <button
        onClick={toggleDrawer}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isDrawerOpen ? 'Close Drawer' : 'Open Drawer'}
      </button>
      <FriendDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </div>
  );
};

export default FriendPage;
