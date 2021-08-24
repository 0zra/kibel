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
const [time/*, setTime*/] = React.useState(undefined);
  const classes = useStyles();

  async function  setOccupate(type) {
    const queries = stringify({'occupied_by': user, 'occupation_type': type}, { skipNulls: true })
    let response = await fetch(
      `https://dfranczu.webd.pro/dmajka/kibel/public/api/7589deed-d338-4a90-8000-e93ad76428b6/occupate?${queries}`,
      {method: "GET", }
    );
    let data = await response.json();
    setZajete(data['is_occupied']);
    setZajmuje(false);
  };

  React.useEffect(()=>{
    async function  getStatus() {
      const kibelUser = localStorage.getItem('kibelUser');
      if(kibelUser) {
        setUser(kibelUser);
      }
      let response = await fetch(
        `https://dfranczu.webd.pro/dmajka/kibel/public/api/7589deed-d338-4a90-8000-e93ad76428b6/status`,
      );
    
      let data = await response.json();
      // console.log(data);
      setZajete(data['is_occupied']);
      setZauzimatelj(data['occupied_by']);
      setType(data['occupation_type'])
      if(data['occupied_since']) {
        const {minutes , seconds} = calculateTimePast(data['occupied_since']);
        console.log(`Juz ${minutes} minut & ${seconds} sekund`)
        // setTime(`Juz ${minutes} minut & ${seconds} sekund`)
      }
    };
    setInterval(getStatus, 10000);
    getStatus();
  }, [zajmuje])

const displayEmoji = type === 'pee'? '💦' : 
type === 'poop' ? '💩' :
type === 'shower'? '🚿' : '';
  return (
    <div className={classes.root}>
      {time && calculateTimePast(time)}
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
          <Paper className={classes.paper}>{zajete ? `Zajęte: ${zauzimatelj}(${displayEmoji})` : 'Wolne'}</Paper>
        </Grid>
        {!zajmuje && <Grid item xs={12} md={6}>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            fullWidth 
            style={{padding: '20px', fontSize: '30px', fontWeight: 700}}
            disabled={zajete}
            onClick={() => { setZajmuje(true);}}
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
            onClick={() => { setOccupate('pee');}}
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
            onClick={() => { setOccupate('poop');}}
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
            onClick={() => { setOccupate('shower');}}
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
                );
              
                let data = await response.json();
                // console.log(data);
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






function calculateTimePast(start) {

  const timeStart = new Date(start*1000);
  const timeNow = Date.now();

  const timeLeft = (timeNow - timeStart) / 1000;
console.log(Math.floor(timeLeft / 60), 'minutes')
console.log(Math.floor(timeLeft / 60), 'seconds')
  return {
    minutes: Math.floor(timeLeft / 60),
    seconds: Math.floor((timeLeft % 60)),
  };
}