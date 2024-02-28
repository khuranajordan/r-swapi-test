import { Grid } from "@chakra-ui/react";
import SingleCharacter from "./SingleCharacter";
import { PropTypes } from "prop-types";

const AllCharacters = ({ people = [] }) => {
  console.log({ people });
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6} m={10} placeItems={"center"}>
      {people.map((person) => (
        <SingleCharacter
          key={person.url}
          name={person.name}
          height={person.height}
          mass={person.mass}
          dob={person.birth_year}
        />
      ))}
    </Grid>
  );
};

export default AllCharacters;

AllCharacters.propTypes = {
  people: PropTypes.array,
};
