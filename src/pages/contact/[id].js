import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";

const styles = {
  sectionContainer: {
    my: 4,
  },
  headerCell: {
    color: "white.main",
    width: "100px",
    backgroundColor: "primary.main",
  },
};

const PersonalInfoCard = ({ title, value }) => {
  return (
    <Box display="flex" alignItems="center" sx={{ my: 2 }}>
      <Typography sx={{ width: "100px" }}>{title} :</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};

const CharacterPage = (prop) => {
  let character = prop.character;
  let episodes = Array.isArray(prop.episodes) ? prop.episodes : [prop.episodes];
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{character.name} - SleekFlow</title>
        <meta
          name="description"
          content={`View information about ${character.name}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          backgroundColor: "background.main",
          width: "100vw",
          minHeight: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: "20px", lg: "50px" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1080px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Box>
            <Button
              onClick={() => router.push(`/`)}
              variant="outlined"
              sx={{ fontSize: 20 }}
            >
              <ArrowBack sx={{ mr: "14px", fontSize: 20 }} /> Return
            </Button>
          </Box>

          <Box
            sx={{
              backgroundColor: "white.main",
              borderRadius: 4,
              my: 4,
              boxShadow: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "secondary.main",
                p: {
                  xs: "2%",
                  sm: "5%",
                },
                borderTopRightRadius: "inherit",
                borderTopLeftRadius: "inherit",
              }}
            >
              <Box
                component="img"
                src={character.image}
                sx={{
                  width: "150px",
                  mr: "40px",
                  borderRadius: "50%",
                  border: 2,
                  boxShadow: 10,
                  borderColor: "primary.main",
                }}
              />
              <Typography variant="h1" color="primary.main">
                {character.name}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 3,
              }}
            >
              <Box sx={styles.sectionContainer}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: `${24 * 1.5}px`,
                  }}
                >
                  Personal info
                </Typography>
                <Divider />
                <PersonalInfoCard title="Status" value={character.status} />
                <PersonalInfoCard title="Gender" value={character.gender} />
                <PersonalInfoCard title="Species" value={character.species} />
                <PersonalInfoCard
                  title="Location"
                  value={character.location.name}
                />
                <PersonalInfoCard
                  title="Origin"
                  value={character.origin.name}
                />
              </Box>

              <Box sx={styles.sectionContainer}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: `${24 * 1.5}px`,
                  }}
                >
                  Episodes
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <TableContainer component={Paper} sx={{ maxHeight: "600px" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={styles.headerCell}>Name</TableCell>
                        <TableCell sx={styles.headerCell}>Air dates</TableCell>
                        <TableCell sx={styles.headerCell}>Episodes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {episodes?.map((episode, index) => (
                        <TableRow
                          sx={{
                            "&:hover": {
                              backgroundColor: "background.main",
                              cursor: "default",
                            },
                          }}
                          key={index}
                        >
                          <TableCell>{episode.name}</TableCell>
                          <TableCell>{episode.air_date}</TableCell>
                          <TableCell>{episode.episode}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const posts = await res.json();

  const paths = [];
  for (let i = 1; i <= posts.info.count; i++) {
    paths.push({
      params: { id: i.toString() },
    });
  }

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const resCharacter = await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );
  const character = await resCharacter.json();

  const episodeList = character.episode.map((episode) => {
    let episodeSplit = episode.split("/");
    return episodeSplit[episodeSplit.length - 1];
  });

  const resEpisode = await fetch(
    `https://rickandmortyapi.com/api/episode/${episodeList.toString()}`
  );

  const episodes = await resEpisode.json();

  return {
    props: {
      character,
      episodes,
    },
  };
};

export default CharacterPage;
