import React, {useState, useEffect} from 'react';
import './Filter.scss';
import axios from "axios";
import characterModel from "../../models/character.model";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import commicListModel from '../../models/comicList.model';

const  Filter:React.FC = () => {
    const [text, setText] = React.useState('')
    const [comicName, setComicName] = React.useState('')
    const [comicNameSelected, setComicNameSelected] = React.useState('')
    const [character, setCharacter] = useState<Array<characterModel> | undefined>([]);
    let characterDataArray: Array<characterModel> = [ ];
    let comicList: Array<commicListModel> = []
    const getCharacter = async () => {
      const res = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?ts=100&limit=60&&apikey=e326f980b574fb6ebf0822efc81e20d3&hash=64506aa54c63bd86354d3a55db0f8732`
      );
      const data = await res.data.data.results;
        data.forEach((item: any) => {
          characterDataArray.push({
            id: item.id,
            name: item.name,
            image:
              item.thumbnail.path +
              "/portrait_fantastic." +
              item.thumbnail.extension,
             comicsArray: item.comics.items[0]
        });
        });
      const findComic = characterDataArray.find((c)=>{
        
        let com = c.comicsArray
       
        if(com != "" && com !== undefined) {
          c.comics = com.name.toString()
          
        }
      })
      
      setCharacter(characterDataArray);
    };

  
    useEffect(() => {
      getCharacter();
    }, [text =='']);
   
   
    const handleOnClick = () => {
       const findChar = character && character?.length != 0 ? character?.filter((c => c.name.toLowerCase().includes(text))) : undefined;
       setCharacter(findChar)
       console.log("findCha",findChar)
    }
    
   

    const filterByComics = () => {
        const findComic = character && character.length != 0 ? character?.filter((c)=>{
          if(c.comics != "" && c.comics !== undefined) {
          return  c.comics.includes('Avengers')
          } else {
            return
          }
         }) : undefined;
         console.log("find",findComic)
      setCharacter(findComic)
    }
    const filterByComics2 = () => {
      const findComic = character && character.length != 0 ? character?.filter((c)=>{
        if(c.comics != "" && c.comics !== undefined) {
        return  c.comics.includes('X-Men')
        } else {
          return
        }
       }) : undefined;
       console.log("find",findComic)
    setCharacter(findComic)
  }
   
  const filterByComics3 = () => {
    getCharacter();
}
 
  return (
    <div >
          <div className='searchBox'>
                <div>Enter Character's Name</div>
                <div>
                  <input type='text' placeholder='search characters' value={text} 
                  onChange={(e) => {
                    setText(e.target.value)
                    
                     ; 
                     }}/>
                  <button disabled={!text} onClick={handleOnClick}>Search</button>
                </div>
                
          </div>
          <div>
              
              <Box sx={{ width: 320 }} id="boxFilter">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter by Comics</InputLabel>
      
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={comicNameSelected}
          label="comicName"
          onChange={(e) => {setComicNameSelected(e.target.value) }}
          
        >
          <MenuItem value={'All'} onClick={filterByComics3} >All</MenuItem>
         <MenuItem value={'Avengers'} onClick={filterByComics} >Avengers</MenuItem>
         <MenuItem value={'X-Men'} onClick={filterByComics2}>X-Men</MenuItem>
        </Select>
      </FormControl>
    </Box>
          </div>
          <div className="container">
            {character?.length == 0 && 
            <h3>Character Not Found</h3>
            }
            {character && character?.map((character, index: number) => {
             
              return (
                <Card
                  key={character.id}
                  sx={{ maxWidth: 345 }}
                  style={{
                    margin: "30px",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="340"
                      image={character.image}
                      style={{
                        width: "300px",
                        margin: " 30px",
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {character.name}
                      </Typography>
                      <div> 
                       {character.comics}
                      </div>
                      
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </div>
    </div>
  );
}

export default Filter;