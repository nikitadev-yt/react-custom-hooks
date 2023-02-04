import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../API";
import useQuery from "../hooks/useQuery";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const {
    data: initialPost,
    isLoading,
    isSuccess,
    error,
  } = useQuery(() => getPostById(id), {
    onSuccess: (data) => {
      setPost(data);
    },
  });

  const { title, body } = post;

  const handleChange = ({ target }) =>
    setPost((prev) => ({ ...prev, [target.name]: target.value }));

  return (
    <Box w="100%" maxW="800px" m="0 auto">
      <Button
        variant="outline"
        display="flex"
        mb={5}
        onClick={() => navigate("/posts")}
      >{`<`}</Button>
      <Card p={6} color="gray.400">
        <Box>
          {isLoading && <Text>Loading...</Text>}
          {error && <Text color="red.300">{error}</Text>}

          {isSuccess && (
            <VStack spacing={3} alignItems="flex-start">
              <Text>Title</Text>
              <Input name="title" value={title} onChange={handleChange} />
              <Text>Body</Text>
              <Textarea
                rows={10}
                name="body"
                value={body}
                onChange={handleChange}
              />
            </VStack>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default EditPost;
