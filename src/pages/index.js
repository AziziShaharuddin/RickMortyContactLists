import Head from "next/head";
import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RickMortyTextField from "@/components/TextField/RickMortyTextField";
import useDebounce from "@/helper";

const styles = {
  headerCell: {
    color: "white.main",
    backgroundColor: "primary.main",
  },
};

export default function Home() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [characters, setCharacters] = useState({
    info: { count: 0, pages: 1, next: "", previous: "" },
    results: [],
  });

  const router = useRouter();

  const debouncedFilter = useDebounce(filter, 500);

  const handleFetch = () => {
    try {
      fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}&name=${debouncedFilter}`
      )
        .then((res) => res.json())
        .then((data) => setCharacters(data));
    } catch (error) {
      // this is for demo purpose only
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetch();
  }, [page]);

  useEffect(() => {
    setPage(1);
    if (page === 1) {
      handleFetch();
    }
  }, [debouncedFilter]);

  return (
    <>
      <Head>
        <title>Contact List - SleekFlow</title>
        <meta
          name="description"
          content="View our list of contacts with their related information."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          backgroundColor: "background",
          width: "100vw",
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          px: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              my: "16px",
            }}
          >
            <Typography variant="h1" sx={{ color: "secondary.main" }}>
              Contacts
            </Typography>
            <RickMortyTextField
              placeholder="Search here"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              endAdornment={
                filter !== "" && (
                  <Close
                    color="secondary"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setFilter("")}
                  />
                )
              }
            />
          </Box>
          <TableContainer component={Paper} sx={{ height: "60%" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {/* if theres alot of columns, the title will be placed in an array and will be mapped out */}
                  <TableCell sx={styles.headerCell}>Name</TableCell>
                  <TableCell sx={styles.headerCell}>Status</TableCell>
                  <TableCell sx={styles.headerCell}>Species</TableCell>
                  <TableCell sx={styles.headerCell}>Gender</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {characters?.results?.map((character, index) => (
                  <TableRow
                    key={index}
                    onClick={() => router.push(`contact/${character.id}`)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "background.main",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell>{character.name}</TableCell>
                    <TableCell>{character.status}</TableCell>
                    <TableCell>{character.species}</TableCell>
                    <TableCell>{character.gender}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            sx={{
              my: 3,
            }}
            count={characters?.info?.pages}
            onChange={(_, value) => setPage(value)}
            page={page}
            siblingCount={2}
          />
        </Box>
      </Box>
    </>
  );
}
