import React from "react";
import SearchAppBar from "../components/Appbar";
import SearchBar from "../components/SearchBar";
import { Box, Grid, Typography } from "@mui/material";
import Spacing from "../components/Spacing";
import { searchResults } from "../utils/api/end-points";
import ResultCard from "../components/ResultCard";
import LinearProgress from "@mui/material/LinearProgress";

function Home() {
  const [parameter, setParameter] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [buckets, setBuckets] = React.useState([]);
  const [status, setStatus] = React.useState("");

  const handleParameterChange = (event) => {
    setParameter(event.target.value);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    setStatus("");
    setBuckets([]);
    setResults([]);
    event.preventDefault();
    const res = await searchResults(parameter);
    if (res.status === 200) {
      const records = res.data.hits;
      const temp = [];
      records.map((record) => temp.push(record._source));
      temp.length === 0 && setStatus("No results found");
      setBuckets(res.data.aggregations.PoemName.buckets);
      setLoading(false);
      setResults(temp);
    } else {
      console.log(res);
      setLoading(false);
      setStatus("Something went wrong");
    }
  };

  return (
    <>
      <SearchAppBar />
      <Spacing size={20} />
      <Typography
        variant="subtitle2"
        display="block"
        gutterBottom
        align="center"
        sx={{ color: "#630330" }}
      >
        <b>Search Metaphors and Sinhala Poetry</b>
      </Typography>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            height: "50px",
          }}
        >
          <SearchBar
            parameter={parameter}
            handleParameterChange={handleParameterChange}
            handleSubmit={handleSubmit}
          />
        </Box>
        {buckets.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {buckets.map((bucket, id) => (
              <Typography
                variant="subtitle1"
                display="block"
                gutterBottom
                key={id}
              >
                <b>{bucket.doc_count}</b> {bucket.doc_count < 2 ? "result" : "results"} from {bucket.key} &nbsp;
              </Typography>
            ))}
            <Typography variant="subtitle1" display="block" gutterBottom>
              found.
            </Typography>
          </Box>
        )}

        {status && (
          <Typography variant="button" display="block" gutterBottom>
            {status}
          </Typography>
        )}
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {results &&
            results.map((result, id) => (
              <ResultCard key={id} result={result} />
            ))}
        </Grid>
      </Box>
    </>
  );
}

export default Home;
