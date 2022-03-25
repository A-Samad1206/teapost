import { DeleteIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useField } from "formik";
import { GrGallery } from "react-icons/gr";
import TSButton from "@compo/UI/TSButton";
import { ChangeEvent, useState } from "react";
import { submitStory } from "@lib/api/storyApi";
import { uploadImage } from "@lib/api/imageApi";
const ImageModal = ({
  isOpen,
  onClose,
  file,
  handleStoryTitleImage,
}: {
  isOpen: boolean;
  onClose: () => void;
  file: File;
  handleStoryTitleImage: (url: string) => void;
}) => {
  const [{ value }] = useField("_id");
  const isLoading = useDisclosure();
  const toast = useToast();
  const handleUploadImage = async () => {
    isLoading.onOpen();
    uploadImage(file)
      .then(({ result }) => {
        handleStoryTitleImage(result[0].url);
        onClose();
      })
      .catch((err) => {
        toast({
          status: "error",
          title: "Unable to upload plz try again",
          variant: "top-accent",
          position: "bottom",
          isClosable: true,
        });
      });
  };
  return (
    <Modal
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={() => onClose()}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Title Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid gridColumn="repeat(1,1fr)">
            <Image
              src={URL.createObjectURL(file)}
              alt="Dan Abramov"
              fallbackSrc="https://bit.ly/dan-abramov"
            />
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            mr={3}
            variant="outline"
            colorScheme="red"
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            isLoading={isLoading.isOpen}
            loadingText="Saving..."
            variant="solid"
            colorScheme="blue"
            onClick={handleUploadImage}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ImageModal;