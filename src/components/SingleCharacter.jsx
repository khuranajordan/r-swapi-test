import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CircularProgress,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PropTypes } from "prop-types";
import "./SingleCharacter.css"; 

const SingleCharacter = ({ name, height, mass, dob }) => {
  const [image, setImage] = useState("../assets/loading-image.jpg");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://picsum.photos/340/240").then((response) =>
      setImage(response.url)
    );
    setLoading(false);
  }, []);

  if (loading) {
    return <CircularProgress isIndeterminate color="green.300" />;
  }

  return (
    <Card
      maxW="sm"
      border="1px"
      borderColor="gray.200"
      borderRadius={10}
      p={5}
      className="character-card" // Add class name for styling
    >
      <CardBody>
        <Image
          src={image}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          className="character-image" // Add class name for styling
        />
        <Stack mt="6" spacing="3">
          <Heading as="h1" fontSize={"24px"} textAlign={"center"}>
            {name}
          </Heading>
          <Text textAlign={"center"}>
            <Text as={"span"} fontWeight={"bold"}>
              Height:
            </Text>{" "}
            {height} m
          </Text>
          <Text textAlign={"center"}>
            <Text as={"span"} fontWeight={"bold"}>
              Mass:
            </Text>{" "}
            {mass} kg
          </Text>
          <Text textAlign={"center"}>
            <Text as={"span"} fontWeight={"bold"}>
              Date of Birth:
            </Text>{" "}
            {dob}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
    </Card>
  );
};

SingleCharacter.propTypes = {
  name: PropTypes.string,
  height: PropTypes.string,
  mass: PropTypes.string,
  dob: PropTypes.string,
};

export default SingleCharacter;
