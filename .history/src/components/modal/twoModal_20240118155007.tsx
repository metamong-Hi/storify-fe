""
import React, { useState } from 'react';
import OneModal from './oneModal';

const twoModal = () => {
  const [firstModalShow, setFirstModalShow] = useState(false);
  const [secondModalShow, setSecondModalShow] = useState(false);

  return (
    <div>
      <button onClick={() => setFirstModalShow(true)}>Open First Modal</button>
      <button onClick={() => setSecondModalShow(true)}>Open Second Modal</button>
      <div className="flex">
        <OneModal show={firstModalShow} onClose={() => setFirstModalShow(false)}>
          <p>Content for the first modal</p>
        </OneModal>
        <OneModal show={secondModalShow} onClose={() => setSecondModalShow(false)}>
          <p>Content for the second modal</p>
        </OneModal>
      </div>
    </div>
  );
};

export default twoModal;
