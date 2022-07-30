import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import { Dialog } from "@material-ui/core";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import history from '../Navigation/history';
import Link from '@material-ui/core/Link';

//Dev mode
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3068"; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";
//3068

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: "#000000"
    },
    primary: {
      main: "#52f1ff",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

});


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  render() {
    const { classes } = this.props;

    const mainMessage = (
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        className={classes.mainMessageContainer}
      >
        <Grid item>

          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            {this.state.mode === 0 ? (
              <React.Fragment>
                Welcome to MSCI245!
              </React.Fragment>
            ) : (
              <React.Fragment>
                Welcome back!
              </React.Fragment>
            )}
          </Typography>

        </Grid>
      </Grid>
    )
    return (
      <div>
        <Review />
      </div>
    );
  }
}

const Review = () => {
  const [movieList, setMovieList] = React.useState([]); //import imbd movies

  const [selectedMovie, setSelectedMovie] = React.useState("");
  const [missingMovie, setMissingMovie] = React.useState(false);

  const [enteredTitle, setEnteredTitle] = React.useState("");
  const [missingTitle, setMissingTitle] = React.useState(false);

  const [enteredReview, setEnteredReview] = React.useState("");
  const [missingReview, setMissingReview] = React.useState(false);

  const [selectedRating, setSelectedRating] = React.useState(0); 
  const [missingRating, setMissingRating] = React.useState(false);

  const [submitSucess, setSubmitSucess] = React.useState(false);

  const getMovies = () => {
    callApiGetMovies()
    .then(res => {
    var parsed = JSON.parse(res.express);
      setMovieList(parsed);
    })
  }

  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";
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
      getMovies();
    }, []);
    
  const submitSQLReview = (SQLReview) => {
    callApiAddReview(SQLReview)
    .then(res => {
    })
  }

  const callApiAddReview = async (SQLReview) => {
    const url = serverURL + "/api/addReview";
      console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: SQLReview
      })
    });
    
    const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
      return body;
    }


  const submitReview = (event) => {
    if (selectedMovie && enteredTitle && enteredReview && selectedRating) {
      var newReview = {
        "userID": 1,
        "movieID": selectedMovie.substring(0, selectedMovie.indexOf(": ")),
        "reviewTitle": enteredTitle,
        "reviewContent": enteredReview,
        "reviewScore": parseInt(selectedRating)
      };
      
    setSubmitSucess(true);
    
    submitSQLReview(newReview);

    } else if (!selectedMovie) {
      setMissingMovie(true);
    } else if (!enteredTitle) {
      setMissingTitle(true);
    } else if (!enteredReview) {
      setMissingReview(true);
    } else if (!selectedRating) {
      setMissingRating(true);
    }
  }

  const moviePop = () => {
    setMissingMovie(false);
  }

  const titlePop = () => {
    setMissingTitle(false);
  }

  const reviewPop = () => {
    setMissingReview(false);
  }

  const ratingPop = () => {
    setMissingRating(false);
  }

  const successPop = () => {
    setSubmitSucess(false);
  }

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
        <Grid container spacing={3} rowSpacing ={5}>
          <Grid item xs={12}>
  
            <Typography variant="h3" style={{
              marginTop: '25px',
              textAlign: 'center',
            }}>
              Let's Review a Movie!
            </Typography>
  
          </Grid>
  
          <Grid item xs={6} style={{
            textAlign: 'right',
            marginTop: "20px",
            marginLeft: "30px",
          }}>
            <MovieSelection onChange={setSelectedMovie} movieList = {movieList} />
          </Grid>

          <Grid container spacing={3} style= {{
              marginTop: "20px",
              marginLeft: "480px",
          }}>
          <Grid item xs={4}>
            <ReviewTitle onChange={setEnteredTitle} />
          </Grid>

          <Grid item xs={4}>
            <ReviewBody onChange={setEnteredReview}/>
          </Grid>
        </Grid>

        <Grid item xs={4} style = {{
            marginTop: "50px",
            marginLeft: "535px",
        }}>
            <ReviewRating onChange={setSelectedRating} />
          </Grid>
        
        <Grid item xs={12} style={{
            textAlign: 'center',
            marginLeft: "4px",
            marginTop: "50px",
          }}>
  
            <Button variant="outlined" color="primary" onClick = {submitReview}>
              Submit Review
            </Button>
        </Grid>

        </Grid>

        <Dialog open={missingMovie} close={moviePop}>
        <DialogTitle>{"Incomplete Review!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Please Select A Movie</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={moviePop} color="primary">
            OK
          </Button>
        </DialogActions>
        </Dialog>

        <Dialog open={missingTitle} close={titlePop}>
        <DialogTitle>{"Incomplete Review!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Please Enter Your Review Title</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={titlePop} color="primary">
            OK
          </Button>
        </DialogActions>
        </Dialog>

        <Dialog open={missingReview} close={reviewPop}>
        <DialogTitle>{"Incomplete Review!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Please Enter Your Review</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={reviewPop} color="primary">
            OK
          </Button>
        </DialogActions>
        </Dialog>

        <Dialog open={missingRating} close={ratingPop}>
        <DialogTitle>{"Incomplete Review!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Please Select A Rating</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ratingPop} color="primary">
            OK
          </Button>
        </DialogActions>
        </Dialog>

        <Dialog open={submitSucess} close={successPop}>
        <DialogTitle>{"Sucesssfully Submitted"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your Review Has Been Received
            <p>Movie: {selectedMovie}</p>
            <p>Title: {enteredTitle}</p>
            <p>Review: {enteredReview}</p>
            <p>Rating: {selectedRating}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={successPop} color="primary">
            OK
          </Button>
        </DialogActions>
        </Dialog>
      </div>
    )
}

const MovieSelection = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div>
      <FormControl >
        <InputLabel>Movie</InputLabel>
        <Select
          required
          onChange={handleChange}
        >
          {props.movieList.map((movies) => (
          <MenuItem value = {movies.id + ": " + movies.name}>{movies.name}</MenuItem>
          ))}

        </Select>
      </FormControl>
    </div>
  );
};

const ReviewTitle = (props) => {
   const handleChange = (event) => {
     props.onChange(event.target.value);
   };

  return (
    <div>
      <form>
          <TextField
            label="Enter Review Title"
            maxLength={200}
            required
            onChange = {handleChange}
          />
      </form>
    </div>
  );
};

const ReviewBody = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

 return (
   <div>
     <form>
         <TextField
           label="Enter Review Body"
           multiline
           maxLength={200}
           required
           onChange = {handleChange}
         />
     </form>
   </div>
 );
};

const ReviewRating = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
      <div>
        <FormLabel component="legend">Select a Rating</FormLabel>
        <RadioGroup
         row
         onChange={handleChange}
         >
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label="1"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="2"
            control={<Radio color="primary" />}
            label="2"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="3"
            control={<Radio color="primary" />}
            label="3"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="4"
            control={<Radio color="primary" />}
            label="4"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="5"
            control={<Radio color="primary" />}
            label="5"
            labelPlacement="bottom"
          />
        </RadioGroup>
      </div>
    );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Home);
