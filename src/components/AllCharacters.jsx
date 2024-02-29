import { useState } from "react";
import { Grid, Button } from "@chakra-ui/react";
import SingleCharacter from "./SingleCharacter";
import { PropTypes } from "prop-types";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const AllCharacters = ({ people = [] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const charactersPerPage = 1;
  const indexOfLastCharacter = (currentPage + 1) * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = people.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );
  console.log({ indexOfFirstCharacter, indexOfLastCharacter }, people.length, indexOfLastCharacter === people.length);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <Grid gap={6} m={10} placeItems={"center"}>
        {currentCharacters.map((person) => (
          <SingleCharacter
            key={person.url}
            name={person.name}
            height={person.height}
            mass={person.mass}
            dob={person.birth_year}
          />
        ))}
      </Grid>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button onClick={prevPage} isDisabled={currentPage === 0}>
          <ChevronLeftIcon />
          &nbsp;Previous
        </Button>
        {people.map((_, idx) => (
          <Button
            key={idx}
            style={{ margin: "0 5px" }}
            onClick={() => setCurrentPage(idx)}
          >
            {idx + 1}
          </Button>
        ))}
        <Button
          onClick={nextPage}
          isDisabled={indexOfLastCharacter === people.length}
        >
          Next&nbsp;
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

AllCharacters.propTypes = {
  people: PropTypes.array,
};

export default AllCharacters;
