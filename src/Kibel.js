import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '40vh'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

async function  getStatus() {
  let response = await fetch(
    `http://dfranczu.webd.pro/dmajka/kibel/public/api/7589deed-d338-4a90-8000-e93ad76428b6/status`,
    {
      method: "GET", 
      headers: { "Content-Type": "application/json" }
    }
  );

  let data = await response.json();
  console.log(data)

}

export default function Kibel() {
  const classes = useStyles();
  React.useEffect(()=>{
    getStatus()
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={5}  justify="flex-end"
        alignItems="center">
        <Grid item xs={12}>
          <Paper className={classes.paper}>Zajenty</Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            fullWidth 
            style={{padding: '20px', fontSize: '30px', fontWeight: 700}}
          >
            Zajmij
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
        <Button 
            variant="contained" 
            color="primary" 
            size="large"
            fullWidth 
            style={{padding: '20px', fontSize: '30px', fontWeight: 700}}
          >
            Uwolni
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
