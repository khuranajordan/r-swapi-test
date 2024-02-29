import { useEffect, useState } from "react";
import { Grid, Button, Input } from "@chakra-ui/react";
import SingleCharacter from "./SingleCharacter";
import { PropTypes } from "prop-types";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import debounce from "debounce";

const AllCharacters = ({ people = [] }) => {
  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const filteredCharacters = people.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const charactersPerPage = 1;
  const indexOfLastCharacter = (currentPage + 1) * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  return (
    <div>
      <Grid gap={6} m={10} placeItems={"center"}>
        <Input
          placeholder="Search character..."
          value={searchQuery}
          onChange={(e) => debounce(handleSearch(e), 500)}
          mb={4}
          border={"1px solid #cecece"}
          padding={2}
          borderRadius={5}
        />
        {currentCharacters.length > 0 ? (
          currentCharacters.map((person) => (
            <>
              <SingleCharacter
                key={person.url}
                name={person.name}
                height={person.height}
                mass={person.mass}
                dob={person.birth_year}
              />
            </>
          ))
        ) : (
          <p>No matching results found.</p>
        )}
      </Grid>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button onClick={prevPage} isDisabled={currentPage === 0}>
          <ChevronLeftIcon />
          &nbsp;Previous
        </Button>
        {filteredCharacters.map((_, idx) => (
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
          isDisabled={indexOfLastCharacter >= filteredCharacters.length}
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
