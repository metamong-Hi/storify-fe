// 예를 들어, 이것이 부모 컴포넌트인 경우
import React, { useState } from 'react';
import ResponsiveModal2 from './twoModal';

const ParentComponent = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      <button onClick={() => setShowModal(!showModal)}>Toggle Modal</button>
      <div className="flex justify-center items-center space-x-4"> {/* Flex 컨테이너 */}
        <ResponsiveModal2 show={showModal} onClose={() => setShowModal(false)}>
          <p>This is the content of the first modal!</p>
        </ResponsiveModal2>
        <ResponsiveModal2 show={showModal} onClose={() => setShowModal(false)}>
          <p>This is the content of the second modal!</p>
        </ResponsiveModal2>
      </div>
    </div>
  );
};

export default ParentComponent;
