import React, {useRef, useState} from "react";
import {
  AlertDialog, Box,
  Button,
} from "native-base";

const AlertDialogComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const initialRef = React.useRef(null)
  return (
    <Box>
      <AlertDialog
        leastDestructiveRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset={"fade"}
      >
        <AlertDialog.Content>
          <AlertDialog.Header fontSize="lg" fontWeight="bold">
            Delete Account?
          </AlertDialog.Header>
          <AlertDialog.Body>
            By Clicking "Delete Account" we will delete your account and all of your data within 30 days.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button ref={cancelRef} onPress={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onPress={() => {
              props.onDeletePressed();
              onClose();
            }} ml={3}>
              Delete Account
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Button colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
        Delete Account
      </Button>
    </Box>
  );
};

export default AlertDialogComponent;
