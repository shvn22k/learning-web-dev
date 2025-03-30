import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Avatar,
  Text,
  Card,
  CardHeader,
  CardBody,
  Flex,
  IconButton,
  useColorMode,
  Image,
  useToast,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, MoonIcon, SunIcon, AddIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import AddFriendModal from './components/AddFriendModal';
import EditFriendModal from './components/EditFriendModal';

const API_URL = import.meta.env.VITE_API_URL || '';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [friends, setFriends] = useState([]);
  const toast = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Fetch friends from API
  const fetchFriends = async () => {
    try {
      const response = await fetch(`${API_URL}/api/friends`);
      if (!response.ok) throw new Error('Failed to fetch friends');
      const data = await response.json();
      setFriends(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Delete friend
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/friends/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete friend');
      
      toast({
        title: 'Success',
        description: 'Friend deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Refresh friends list
      fetchFriends();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Load friends when component mounts
  useEffect(() => {
    fetchFriends();
  }, []);

  const handleEdit = (friend) => {
    setSelectedFriend(friend);
    setIsEditModalOpen(true);
  };

  return (
    <Box>
      {/* Floating Navbar */}
      <Box 
        as="nav" 
        bg={colorMode === 'dark' ? 'brand.primary' : 'white'} 
        py={4} 
        px={8} 
        position="fixed"
        top={4}
        left="50%"
        transform="translateX(-50%)"
        width="95%"
        maxW="container.xl"
        borderRadius="xl"
        boxShadow="lg"
        zIndex={1000}
      >
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={2}>
            <Text 
              fontSize="xl" 
              fontWeight="bold"
              color={colorMode === 'dark' ? 'brand.secondary' : 'brand.primary'}
            >
              My Frens
            </Text>
            <Text 
              fontSize="sm" 
              color={colorMode === 'dark' ? 'whiteAlpha.700' : 'blackAlpha.700'}
            >
              | Fren Management App (no one needs that lol)
            </Text>
          </Flex>
          <IconButton
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            _hover={{
              bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.200',
            }}
          />
        </Flex>
      </Box>

      {/* Main Content - Add padding-top to account for fixed navbar */}
      <Box 
        minH="100vh" 
        bg={colorMode === 'dark' ? 'brand.primary' : 'brand.secondary'}
        pt="100px" // Add padding top to account for floating navbar
      >
        <Container maxW="container.xl" py={8}>
          {/* Header */}
          <Flex justify="space-between" align="center" mb={8}>
            <Heading 
              color={colorMode === 'dark' ? 'olivine.100' : 'nyanza.500'} 
              size="xl"
              fontWeight="black"
            >
              MY FRENS 
            </Heading>
            <Button
              variant="solid"
              size="lg"
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<AddIcon />}
            >
              Add Friend
            </Button>
          </Flex>

          {/* Cards Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {friends.map((friend) => (
              <Card 
                key={friend.id} 
                transition="all 0.2s"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'md',
                }}
              >
                <CardHeader>
                  <Flex spacing="4">
                    <Flex flex="1" gap="4" alignItems="center">
                      <Avatar 
                        name={friend.name} 
                        src={friend.imgUrl}
                        size="lg"
                        boxShadow="sm" 
                      />
                      <Box>
                        <Text 
                          fontWeight="bold" 
                          fontSize="lg"
                        >
                          {friend.name}
                        </Text>
                        <Text 
                          fontSize="sm" 
                          color={colorMode === 'dark' ? 'olivine.100' : 'nyanza.500'}
                          opacity={0.8}
                        >
                          {friend.role}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex gap={2}>
                      <IconButton
                        variant="ghost"
                        colorScheme={colorMode === 'dark' ? 'whiteAlpha' : 'blackAlpha'}
                        aria-label="Edit friend"
                        icon={<EditIcon />}
                        onClick={() => handleEdit(friend)}
                      />
                      <IconButton
                        variant="ghost"
                        colorScheme={colorMode === 'dark' ? 'whiteAlpha' : 'blackAlpha'}
                        aria-label="Delete friend"
                        icon={<DeleteIcon />}
                        onClick={() => handleDelete(friend.id)}
                      />
                    </Flex>
                  </Flex>
                </CardHeader>
                <CardBody pt={0}>
                  <Text 
                    opacity={0.9}
                    fontSize="md"
                  >
                    {friend.description}
                  </Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <AddFriendModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onFriendAdded={fetchFriends}
      />

      <EditFriendModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedFriend(null);
        }}
        onFriendEdited={fetchFriends}
        friend={selectedFriend}
      />
    </Box>
  );
}

export default App;
