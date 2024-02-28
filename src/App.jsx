import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
  CircularProgress,
  Flex,
} from "@chakra-ui/react";
import "./App.css";
import AllCharacters from "./components/AllCharacters";
import { useEffect, useState } from "react";

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://swapi.dev/api/people")
      .then((response) => {
        return response.json();
      })
      .then((data) => setPeople(data.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} height={"70vh"}>
        <CircularProgress isIndeterminate size="120px" />
      </Flex>
    );
  }
  return (
    <ChakraBaseProvider theme={theme}>
      <AllCharacters people={people} />
    </ChakraBaseProvider>
  );
}
export default App;
