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
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("");
  const [firstPageOfSet, setFirstPageOfSet] = useState(0); // First page of the current set

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

  const sortedCharacters = filteredCharacters.slice().sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });

  const charactersPerPage = 1;
  const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);
  const indexOfLastCharacter = (currentPage + 1) * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = sortedCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    if (currentPage + 1 >= firstPageOfSet + 3 && firstPageOfSet + 3 < totalPages) {
      setFirstPageOfSet((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    if (currentPage > 0 && currentPage === firstPageOfSet) {
      setFirstPageOfSet((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setSortBy("name");
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
        <Button onClick={handleSort} mb={4}>
          Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </Button>
        {currentCharacters.length > 0 ? (
          currentCharacters.map((person) => (
            <SingleCharacter
              key={person.url}
              name={person.name}
              height={person.height}
              mass={person.mass}
              dob={person.birth_year}
            />
          ))
        ) : (
          <p>No matching results found.</p>
        )}
      </Grid>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <Button onClick={prevPage} isDisabled={currentPage === 0}>
          <ChevronLeftIcon />
          &nbsp;Previous
        </Button>
        {Array.from({ length: 3 }).map((_, idx) => {
          const page = firstPageOfSet + idx;
          return (
            page < totalPages && (
              <Button
                key={idx}
                style={{
                  margin: "0 5px",
                  backgroundColor: currentPage === page ? "#adadc9" : "",
                }}
                onClick={() => setCurrentPage(page)}
              >
                {page + 1}
              </Button>
            )
          );
        })}
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
