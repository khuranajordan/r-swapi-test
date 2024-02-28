import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from "@chakra-ui/react";
import "./App.css";

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <h1>Star Wars App</h1>
    </ChakraBaseProvider>
  );
}
export default App;
