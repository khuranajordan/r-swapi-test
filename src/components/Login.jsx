import { useState } from "react";
import { Button, Input, Flex, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  //   const handleLogout = () => {
  //     localStorage.removeItem('token');
  //   };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background:
          "url(https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1200px-Star_Wars_Logo.svg.png)",
        objectFit: "cover",
        backgroundRepeat: "no-repeat",
        backgroundSize:"cover"
      }}
    >
      <Flex
        direction="column"
        alignItems={"center"}
        justifyContent={"center"}
        border={"1px solid #cecece"}
        borderRadius={5}
        opacity={"0.9"}
        w={"30%"}
        padding={10}
      >
        <Text mb={5} as="h1" fontSize={"30px"}>
          LOGIN
        </Text>
        <Box>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            border={"1px"}
            padding={3}
          />
        </Box>
        <Box mt={4}>
          <Input
            placeholder="Password"
            type="password"
            border={"1px"}
            padding={3}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button onClick={handleLogin} mt={4}>
          Login
        </Button>
        {error && (
          <Text color="red" mt={2}>
            {error}
          </Text>
        )}
      </Flex>
    </div>
  );
};

export default Login;
