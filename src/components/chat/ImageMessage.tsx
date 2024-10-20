import React from 'react';
import {
  Flex,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  Avatar,
  Image,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { AiOutlineUser } from 'react-icons/ai';
import AppMenuList from '../AppComponents/AppMenuList';

interface ImageMessageProps {
  src: string;
  alt: string;
  isMine: boolean;
  isDeleted: boolean;
  content: string;
  item: any;
  conversationType: 'group' | 'pm';
  deleteMessageHandler: (item: any) => Promise<void>;
}

const ImageMessage: React.FC<ImageMessageProps> = ({
  src,
  alt,
  isMine,
  isDeleted,
  content,
  item,
  conversationType,
  deleteMessageHandler,
}) => {
  return (
    <Flex
      alignSelf={isMine ? 'flex-end' : 'flex-start'}
      justifyContent={isMine ? 'flex-end' : 'flex-start'}
      my={isMine ? 1 : 2}
      bg={isDeleted ? 'black' : 'transparent'}
      p={isDeleted ? 3 : 0}
      position="relative"
    >
      {conversationType === 'group' && !isMine && (
        <Flex>
          <Avatar
            mr={2}
            size="xs"
            bg="black"
            name={item.sender.username}
            icon={<AiOutlineUser fontSize="1.5rem" />}
          />
        </Flex>
      )}

      {!isDeleted ? (
        <Flex position="relative" w="100%">
          <Image
            src={src}
            alt={alt}
            objectFit="cover"
            width="300px"
            height="300px"
          />
        </Flex>
      ) : (
        <Text color="gray.400" fontStyle="italic">
          {content}
        </Text>
      )}

      {isMine && !isDeleted && (
        <Menu>
          <MenuButton
            bg="black"
            ml={2}
            size="xs"
            as={IconButton}
            aria-label="Options"
            icon={<ChevronDownIcon />}
            variant="unstyled"
          />
          <AppMenuList
            bg="red.500"
            color="black"
            border="none"
            borderRadius={0}
          >
            <MenuItem
              size="xs"
              bg="red.500"
              color="black"
              fontSize="sm"
              border="none"
              onClick={() => deleteMessageHandler(item)}
            >
              Delete message
            </MenuItem>
          </AppMenuList>
        </Menu>
      )}
    </Flex>
  );
};

export default ImageMessage;
