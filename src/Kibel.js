import React from 'react';
import { stringify } from 'qs';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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



export default function Kibel() {
  const [user, setUser] = React.useState(null);
  const [zauzimatelj, setZauzimatelj] = React.useState(null);
  const [zajete, setZajete] = React.useState(false)
  const [zajmuje, setZajmuje] = React.useState(false)
  const [fieldValue, setFieldValue] = React.useState('');
  const [type, setType] = React.useState('');
  const classes = useStyles();
  React.useEffect(()=>{
    async function  getStatus() {
      const kibelUser = localStorage.getItem('kibelUser');
      if(kibelUser) {
        setUser(kibelUser);
      }
      let response = await fetch(
        `https://dfranczu.webd.pro/dmajka/kibel/public/api/7589deed-d338-4a90-8000-e93ad76428b6/status`,
        {
          method: "GET", 
          headers: { 
            // "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "no-cors"
          }
        }
      );
    
      let data = await response.json();
      console.log(data);
      setZajete(data['is_occupied']);
      setZauzimatelj(data['occupied_by']);
      setType(data['occupation_type'])
    };
    setInterval(getStatus, 10000);
    getStatus();
  }, [])


  return (
    <div className={classes.root}>
      <Grid container spacing={5}  justify="flex-end"
        alignItems="center">
          {!user ?
          <>
            <Grid item xs={12}>
          <TextField 
          label="Użytkownik" 
          variant="outlined" 
          color="primary"
          fullWidth
          value={fieldValue}
          onChange={(e)=>setFieldValue(e.target.value)}
          style={{marginLeft: "10px", marginRight: '10px', backgroundColor: 'white'}}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            fullWidth 
            style={{padding: '20px', fontSize: '30px', fontWeight: 700}}
            onClick={() => { 
              localStorage.setItem('kibelUser', fieldValue)
              setUser(fieldValue);
            }}
          >
            Potwierdź
          </Button>
        </Grid>
          </> : <>
        <Grid item xs={12}>
          <Paper className={classes.paper}>{zajete ? `Zajęte: ${zauzimatelj}(${type})` : 'Wolne'}</Paper>
        </Grid>
        {!zajmuje && <Grid item xs={12} md={6}>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            fullWidth 
            style={{padding: '20px', fontSize: '30px', fontWeight: 700}}
            disabled={zajete}
            onClick={() => { 
              setZajmuje(true);
              // async function  setOccupate() {
              //   const queries = stringify({'occupied_by': user}, { skipNulls: true })
              //   let response = await fetch(
              //     `https://dfranczu.webd.pro/dmajka/kibel/public/api/7589deed-d338-4a90-8000-e93ad76428b6/occupate?${queries}`,
              //     {method: "GET", }
              //   );
              
              //   let data = await response.json();
              //   setZajete(data['is_occupied']);
              // };
              // setOccupate();
            }}
          >
            Zajmij
          </Button>
        </Grid>}
        {zajmuje && <Grid item xs={4} >
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            fullWidth 
            style={{padding: '20px', fontSize: '30px', fontWeight: 700}}
            disabled={zajete}
            onClick={() => { 
              async function  setOccupate() {
                const queries = stringify({'occupied_by': user, 'occupation_type': 'pee'}, { skipNulls: true })
                let response = await fetch(
                  `https://dfranczu.webd.pro/dmajka/kibel/public/api/7589deed-d338-4a90-8000-e93ad76428b6/occupate?${queries}`,
                  {method: "GET", }
                );
                let data = await response.json();
                setZajete(data['is_occupied']);
                setZajmuje(false);
              };
              setOccupate();
            }}
          >
            💦
          </Button>
        </Grid>}
        {zajmuje && <Grid item xs={4} >
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            fullWidth 
            style={{padding: '20px', fontSize: '30px', fontWeight: 700}}
            disabled={zajete}
            onClick={() => { 
              async function  setOccupate() {
                const queries = stringify({'occupied_by': user, 'occupation_type': 'poop'}, { skipNulls: true })
                let response = await fetch(
                  `https://dfranczu.webd.pro/dmajka/kibel/public/api/7589deed-d338-4a90-8000-e93ad76428b6/occupate?${queries}`,
                  {method: "GET", }
                );
                let data = await response.json();
                setZajete(data['is_occupied']);
                setZajmuje(false);
              };
              setOccupate();
            }}
          >
            💩
          </Button>
        </Grid>}
        {zajmuje && <Grid item xs={4} >
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            fullWidth 
            style={{padding: '20px', fontSize: '30px', fontWeight: 700, }}
            disabled={zajete}
            onClick={() => { 
              async function  setOccupate() {
                const queries = stringify({'occupied_by': user, 'occupation_type': 'shower'}, { skipNulls: true })
                let response = await fetch(
                  `https://dfranczu.webd.pro/dmajka/kibel/public/api/7589deed-d338-4a90-8000-e93ad76428b6/occupate?${queries}`,
                  {method: "GET", }
                );
                let data = await response.json();
                setZajete(data['is_occupied']);
                setZajmuje(false);
              };
              setOccupate();
            }}
          >
           🚿
          </Button>
        </Grid>}
        <Grid item xs={12} md={6}>
        {(zauzimatelj === user || !zauzimatelj)&& <Button 
            variant="contained" 
            color="primary" 
            size="large"
            fullWidth 
            style={{padding: '20px', fontSize: '30px', fontWeight: 700}}
            disabled={!zajete}
            onClick={() => { 
              async function  setFree() {
                let response = await fetch(
                  `https://dfranczu.webd.pro/dmajka/kibel/public/api/7589deed-d338-4a90-8000-e93ad76428b6/make-free`,
                  {
                    method: "GET", 
                    headers: { 
                      // "Content-Type": "application/json",
                    // "Access-Control-Allow-Origin": "no-cors"
                    }
                  }
                );
              
                let data = await response.json();
                console.log(data);
                setZajete(data['is_occupied']);
              };
              setFree();
            }}
          >
            Uwolnij
          </Button>}
        </Grid>
        </>}
       
      </Grid>
    </div>
  );
}
