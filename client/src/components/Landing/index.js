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

const Landing = () => {
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
            <Typography variant="h2" style={{
                marginTop: "15px",
                textAlign: 'center',
            }}>
                Rotten Pineapples
            </Typography>
            <Typography variant="h5" style={{
                textAlign: 'center',
            }}>
                Your Stop to Great Movies
            </Typography>

            <Typography variant="h5" style={{
                marginTop: "45px",
                textAlign: 'center',
            }}>
                Top Trending Movies
            </Typography>

            <Grid container spacing={3} style= {{
              marginLeft: "60px",
              marginTop: "10px"
          }}>
            <Grid>
            <img src = "https://m.media-amazon.com/images/M/MV5BYmMxZWRiMTgtZjM0Ny00NDQxLWIxYWQtZDdlNDNkOTEzYTdlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" 
            style = {{ 
              width: "275px",
              marginLeft: "40px", 
             }}
            />
            </Grid>

            <Grid>
            <img src = "https://m.media-amazon.com/images/M/MV5BOWQwOTA1ZDQtNzk3Yi00ZmVmLWFiZGYtNjdjNThiYjJhNzRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg" 
            style = {{ 
              width: "280px", 
              marginLeft: "40px",
              }}
            />
            </Grid>

            <Grid>
            <img src = "https://m.media-amazon.com/images/I/812SwQ1toSL._AC_SY679_.jpg" 
            style = {{ 
              width: "275px", 
              marginLeft: "40px",
              }}
            />
            </Grid>


            <Grid>
            <img src = "https://m.media-amazon.com/images/I/71Fzm85rLfL._AC_SL1353_.jpg" 
            style = {{ 
              width: "271px", 
              marginLeft: "40px",
              }}
            />
            </Grid>
            </Grid>

            <Typography variant="h5" style={{
                marginTop: "45px",
                textAlign: 'left',
                marginLeft: "10px"
            }}>
                About Rotten Pineapples®
            </Typography>

            <Typography variant="body1" style={{
                marginTop: "10px",
                textAlign: 'left',
                marginLeft: "10px"
            }}>
                Rotten Pineapples and the Pineapplemeter score are the world’s most trusted recommendation resources for quality entertainment. As the leading online aggregator of movie and TV show reviews from critics, we provide fans with a comprehensive guide to what’s Fresh – and what’s Rotten – in theaters and at home. And the Pineapplemeter is just the beginning. We also serve movie and TV fans with original editorial content on our site and through social channels, produce fun and informative video series, and hold live events for fans across the country, with our ‘Your Opinion Sucks’ live shows. If you’re an entertainment fan looking for a recommendation, or to share an opinion, you’ve come to the right place.
            </Typography>




    </div>
    )
}

export default Landing;