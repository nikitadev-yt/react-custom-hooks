import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import EditPost from "./components/EditPost";
import Posts from "./components/Posts";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" m="3rem auto" p={5} maxW={700}>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
}

export default App;
