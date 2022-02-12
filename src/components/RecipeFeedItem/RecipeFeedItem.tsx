import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import React from "react";
import {useHistory} from "react-router-dom";
import {Recipe} from "../App/App";

interface RecipeFeedItemProps {
  recipe: Recipe
}


export const RecipeFeedItem = ({recipe}: RecipeFeedItemProps) => {
  const history = useHistory();
  return (
    <Grid item key={recipe.id} xs={12} sm={6} md={4}>
      <Card raised={true}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="220"
            image={recipe.imgUrl}
            title={recipe.title}
            onClick={() => {history.push(`/recipes/${recipe.id}`)}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {recipe.title}
            </Typography>
            <Typography variant="subtitle1">
              {recipe.description}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" align="right">
              {recipe.owner}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}