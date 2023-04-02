import React, { useState, useEffect } from "react";
import "./Home.scss";
import axios from "axios";
import "@reactsax/reactsax/dist/index.css";
// import {Card} from "@reactsax/reactsax";
import InfiniteScroll from "react-infinite-scroller";
import characterModel from "../../models/character.model";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Home: React.FC = () => {
  const hash = "64506aa54c63bd86354d3a55db0f8732";
  const [character, setCharacter] = useState<Array<characterModel>>([]);
  let characterDataArray: Array<characterModel> = [];
  let limit: number = 8;
  const getCharacter = async () => {
    const res = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?ts=100&limit=${limit}&&apikey=e326f980b574fb6ebf0822efc81e20d3&hash=64506aa54c63bd86354d3a55db0f8732`
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
          comicsArray: item.comics.items
      });
    });
   
    setCharacter(characterDataArray);
  };
  useEffect(() => {
    getCharacter();
  }, []);

  return (
    <div className="App">
      <div className="home">
       
        <InfiniteScroll
          dataLength={character.length}
          loadMore={() => {
            limit = character.length + 8;
            getCharacter();
          }}
          hasMore={true}
          loader={<h4 className="loading">Loading...</h4>}
        >
          <div className="container">
            {character.map((character, index: number) => {
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
                      alt="green iguana"
                      style={{
                        width: "300px",
                        margin: " 30px",
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {character.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
