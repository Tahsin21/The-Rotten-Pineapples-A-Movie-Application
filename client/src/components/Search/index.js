import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import history from '../Navigation/history';
import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';

const serverURL = "";

const SearchPage = () => {
  const [searchActor, setSearchedActor] = React.useState("");
  const [searchMovie, setSearchedMovie] = React.useState("");
  const [searchDirector, setSearchedDirector] = React.useState("");

  const [searchData, setSearchData] = React.useState([]);
  const [finalList, setFinalList] = React.useState([]);

  const searchInfo = () => {
    callApiSearchInfo()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setSearchData(parsed);
      })
  }

  const callApiSearchInfo = async () => {
    const url = serverURL + "/api/Search";
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  React.useEffect(() => {
    searchInfo();
  }, []);

  const searchFunction = (event) => {
    var finalList = [];
    for (var i in searchData) {
      var currentMovie = searchData[i];
      if (searchData[i].name == searchMovie) {
        finalList.push(currentMovie);
      }
      if (searchData[i].director == searchDirector && !finalList.includes(currentMovie)) {
        finalList.push(currentMovie);
      }
      if (searchData[i].actor.includes(searchActor) && !finalList.includes(currentMovie)) {
        finalList.push(currentMovie);
      }
    }
    setFinalList(finalList);
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push('/')}
            >
              <Button color="inherit">Home</Button>
            </Link>

            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push('/Review')}
            >
              <Button color="inherit">Write Review</Button>
            </Link>

            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push('/Search')}
            >
              <Button color="inherit">Search</Button>
            </Link>

            <Link
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => history.push('/myPage')}
            >
              <Button color="inherit">Game</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <Typography variant="h3" style={{
        marginTop: "15px",
        textAlign: 'center',
      }}>
        Search
      </Typography>
      <Typography variant="h5" style={{
        textAlign: 'center',
      }}>
        Find Your Favourite Actors, Directions, and Movies
      </Typography>

      <Grid container spacing={2} style={{
        marginTop: "50px",
        marginLeft: "400px",
      }}>
        <Grid item xs={2}>
          <SearchActor onChange={setSearchedActor} />
        </Grid>

        <Grid item xs={2}>
          <SearchMovie onChange={setSearchedMovie} />
        </Grid>

        <Grid item xs={2}>
          <SearchDirector onChange={setSearchedDirector} />
        </Grid>
      </Grid>


      <Grid container spacing={2} style={{
        marginTop: "50px",
        marginLeft: "680px",
      }}>
        <Button onClick={searchFunction}>
          Submit
        </Button>
      </Grid>
      <Grid>
        <List finalList={finalList} />
      </Grid>
    </div>
  )
}

const List = (props) => {

  return (
    <ul>
      {props.finalList.map((item) => {
        return (
          <div>
            <RecipePaper>
              <CardContent>

                <Typography variant={"h4"} color="Black">
                  {item.name}
                </Typography>


                <Typography variant={"h4"} color="Black" >
                  Director: {item.director}
                </Typography>

                <Typography variant={"h4"} color="Black" >
                  Score: {item.score}
                </Typography>
              </CardContent>
            </RecipePaper>
          </div>
        );
      })}
    </ul>
  )
};




const RecipePaper = styled(Paper)(({ theme }) => ({
  opacity: 0.7,
  backgroundColor: theme.palette.primary.background,
  padding: 8,
  borderRadius: 4,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));



const SearchActor = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div>
      <form>
        <TextField
          label="Search Actor"
          maxLength={200}
          required
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

const SearchMovie = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div>
      <form>
        <TextField
          label="Search Movie"
          maxLength={200}
          required
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

const SearchDirector = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div>
      <form>
        <TextField
          label="Search Director"
          maxLength={200}
          required
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default SearchPage;