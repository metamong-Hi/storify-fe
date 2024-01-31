import React, { useState } from 'react';
import FriendDrawer from './friend';
import FriendRequest from './friendRequestPage';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  useDisclosure,
  Button
} from '@nextui-org/react';
const FriendPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
    <div>
      <button
        onClick={toggleDrawer}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isDrawerOpen ? 'Close Drawer' : 'Open Drawer'}
      </button>
      <FriendDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
      <button
        onClick={onOpen}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        친구신청
      </button>
      {/* <Button
                  onClick={onOpen}
                  className="font-bold text-[##B68973] border-[##B68973] border-2 bg-[#B68973]  hover:bg-gray-200 "

                  variant="flat"
                >
                  친구신청
                </Button> */}
    </div>
     <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent className="flex flex-col justify-center items-center p-4">
      {(_onClose: any) => (
        <>
        <ModalHeader className="flex flex-col gap-1"> 친구 요청 </ModalHeader>
        <ModalBody className="flex justify-center items-center">
         <FriendRequest/>
        </ModalBody>
        <ModalFooter>
          {/* <Button color="danger" variant='light' onPress={onClose}>
          닫기
        </Button> */}
       </ModalFooter>
      </>
    )}
  </ModalContent>
  </Modal>
  </>
  );
};

export default FriendPage;
