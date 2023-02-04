import {
  Box,
  Button,
  Card,
  CircularProgress,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import useQuery from "../hooks/useQuery";
import { getPosts } from "../API";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useQuery(getPosts);

  return (
    <Box>
      <Heading mb={5}>Posts</Heading>

      {isLoading ? (
        <CircularProgress
          size="1.5rem"
          isIndeterminate
          color="blue.300"
          mb={5}
        />
      ) : (
        <Button variant="outline" colorScheme="green" mb={5} onClick={refetch}>
          Refetch
        </Button>
      )}
      {error && <Text color="red.300">{error}</Text>}
      {isSuccess && (
        <VStack spacing={4} maxW="22rem" m="0 auto">
          {posts.map(({ id, title, body }) => (
            <Card maxW="inherit" textAlign="left" p={8} key={id}>
              <Text fontSize="lg" mb={5} fontWeight="bold">
                {title}
              </Text>
              <Text
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                mb={5}
              >
                {body}
              </Text>
              <Button onClick={() => navigate(`/posts/${id}/edit`)}>
                Edit
              </Button>
            </Card>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Posts;
