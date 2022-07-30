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
import { Dialog } from "@material-ui/core";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3068";

const Custom = () => {
  const [quizInfoList, setQuizInfo] = React.useState([]);

  const [openGame, setOpenGame] = React.useState(false);

  const [wrongChoice, setWrongChoice] = React.useState(false);

  const [rightChoice, setRightChoice] = React.useState(false);

  const [noChoice, setNoChoice] = React.useState(false);

  const [selectedDirector, setSelectedDirector] = React.useState(0);

  const quizInfo = () => {
    callApiQuizInfo()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setQuizInfo(parsed);
      })
  }

  const callApiQuizInfo = async () => {
    const url = serverURL + "/api/MyPage";
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
    quizInfo();
  }, []);

  const submitAnswer = () => {
    if (selectedDirector == 3) {
      setRightChoice(true);
    } else if (!selectedDirector) {
      setNoChoice(true);
    } else {
      setWrongChoice(true);
    }
    setOpenGame(false);
  }

  const gamePop = () => {
    setOpenGame(true);
  }


  const successPop = () => {
    setOpenGame(false);
  }

  const wrongPopUp = () => {
    setWrongChoice(false);
  }

  const rightPopUp = () => {
    setRightChoice(false);
  }

  const noChoicePop = () => {
    setNoChoice(false);
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
      <Typography variant="h3" style={{
        marginTop: "15px",
        textAlign: 'center',
      }}>
        Rotten Pienapples' Movie Guess!
      </Typography>
      <Typography variant="h5" style={{
        textAlign: 'center',
      }}>
        Who Directed...
      </Typography>

      <Typography variant="body1" style={{
        textAlign: 'center',
      }}>
        In this game, you will guess the director of a famous film (This is my favourite film of all time)! Both the directors and movie title were pulled from the SQL Database.
      </Typography>

      <Grid container spacing={2} style={{
        marginTop: "200px",
        marginLeft: "685px",
      }}>

        <Grid item xs={2} style ={{
          marginLeft: "-15px"
        }}>
          <Button onClick={gamePop}>Start</Button>
        </Grid>
      </Grid>

      <Dialog open={openGame} close={successPop}>
        <DialogTitle align= "center">{"Guess The Director"}</DialogTitle>
        <DialogContent>
          <ReviewRating onChange={setSelectedDirector} quizInfoList={quizInfoList}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitAnswer} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={rightChoice} close={rightPopUp}>
        <DialogTitle align="center">Correct!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Your Answer was Correct!</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={rightPopUp} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={wrongChoice} close={wrongPopUp}>
        <DialogTitle align ="center">Wrong!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Your Answer Was Wrong. Play Again.</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={wrongPopUp} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={noChoice} close={noChoicePop}>
        <DialogTitle align = "center">No Answer Selected!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>You Didn't Select An Answer. Play Again.</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={noChoicePop} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const ReviewRating = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  let x = 50
  let y = 85
  let z = 26

  return (
    <div>
      <FormLabel component="legend" align = "center">Select The Director For:</FormLabel>
      <FormLabel component="legend" align = "center">{props.quizInfoList[x].name}</FormLabel>
      <RadioGroup
        row
        onChange={handleChange}
      >
        <FormControlLabel
          value="1"
          control={<Radio color="primary" />}
          label={props.quizInfoList[y].directorName}
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="2"
          control={<Radio color="primary" />}
          label={props.quizInfoList[z].directorName}
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="3"
          control={<Radio color="primary" />}
          label={props.quizInfoList[x].directorName}
          labelPlacement="bottom"
        />
      </RadioGroup>
    </div>
  );
};




export default Custom;