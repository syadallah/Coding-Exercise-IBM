import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { useQuery, useMutation } from "@apollo/client";
import { POKEMON_BY_NAME } from "../apollo/queries";
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../apollo/mutations";
import {
  makeStyles,
  Card,
  CardActions,
  Typography,
  IconButton,
  Divider,
	Grid,
	CardActionArea,
	Link,
	CardMedia,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f3f3f3",
  },
  imageContainer: {
    width: "100%",
    backgroundColor: "white",
    border: "solid #f3f3f3",
    borderRadius: 20,
  },
  volumeIcon: {
    fontSize: 40,
    color: "#71c1a1",
  },
  image: {
    height: 400,
    objectFit: "scale-down",
    width: "100%",
  },
  favoriteBtn: {
    color: red[900],
    marginLeft: "auto",
  },
  nameHeading: {
    fontWeight: 600,
    fontSize: 32,
  },
  cardActions: {
		justifyContent: "space-between",
		backgroundColor: "#f3f3f3"
  },
  bar: {
    flex: "auto",
    borderRadius: 20,
    minHeight: 10,
  },
  barCP: {
    backgroundColor: "#9f9fff",
  },
  barHP: {
    backgroundColor: "#71c1a1",
  },
  barInfo: {
    minWidth: 80,
  },
  generalInfo: {
    flex: 1,
    textAlign: "center",
    fontSize: 25,
		fontWeight: 600,
		backgroundColor: "#f3f3f3"
  },
  range: {
    fontSize: 15,
    fontWeight: 300,
  },
}));

const PokemonDetails = (props) => {
  const classes = useStyles();
  const name = props.match.params.name;
  const { loading, data } = useQuery(POKEMON_BY_NAME, {
    variables: { name },
  });
  const pokemon = data && data.pokemonByName;
  const audio =
    data &&
    data.pokemonByName &&
    data.pokemonByName.sound &&
    new Audio(data.pokemonByName.sound);
  const [addToFavorites] = useMutation(ADD_TO_FAVORITES);
  const [removeFromFavorites] = useMutation(REMOVE_FROM_FAVORITES);

  const handleFavorite = (id, isFavorite) => {
    if (isFavorite) {
      removeFromFavorites({ variables: { id } });
    } else {
      addToFavorites({ variables: { id } });
    }
  };

  if (loading) return null;

  return pokemon ? (
    <div className={classes.root}>
      <Card>
        <div className={classes.imageContainer}>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className={classes.image}
          />
          <IconButton
            onClick={() => {
              audio.play();
            }}
          >
            <VolumeUpIcon className={classes.volumeIcon} />
          </IconButton>
        </div>
        <CardActions className={classes.cardActions}>
          <span>
            <Typography className={classes.nameHeading}>
              {pokemon.name}
            </Typography>
            <Typography variant="subtitle2">
              {pokemon.types.join(", ")}
            </Typography>
          </span>
          <IconButton
            aria-label="add to favorites"
            className={classes.favoriteBtn}
            onClick={() => {
              handleFavorite(pokemon.id, pokemon.isFavorite);
            }}
          >
            {pokemon.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </CardActions>
        <CardActions className={classes.cardActions}>
          <span className={`${classes.bar} ${classes.barCP}`} />
          <span className={classes.barInfo}>CP: {pokemon.maxCP}</span>
        </CardActions>
        <CardActions className={classes.cardActions}>
          <span className={`${classes.bar} ${classes.barHP}`} />
          <span className={classes.barInfo}>CP: {pokemon.maxHP}</span>
        </CardActions>
        <Divider />
        <CardActions className={`${classes.cardFooter} ${classes.cardActions}`}>
          <span className={classes.generalInfo}>
            Weight
            <p className={classes.range}>{`${pokemon.weight.minimum} - ${
              pokemon.weight.maximum
            }`}</p>
          </span>
          <Divider orientation="vertical" flexItem />
          <span className={classes.generalInfo}>
            Height
            <p className={classes.range}>{`${pokemon.height.minimum} - ${
              pokemon.height.maximum
            }`}</p>
          </span>
        </CardActions>
      </Card>
			<h2>
				Evolutions
			</h2>
			<Grid container justify="center" spacing={2}>
          {pokemon &&
            pokemon.evolutions.map((p) => (
              <Grid key={p.name} item>
                <Card className={classes.paper}>
                  <CardActionArea className={classes.imageContainer}>
                    <Link
                      to={`/${p.name}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <CardMedia
                        component="img"
                        image={p.image}
                        title={p.name}
                        classes={{ media: classes.image }}
                      />
                    </Link>
                  </CardActionArea>
                  <CardActions className={classes.cardActions}>
                    <Link
                      to={`/${p.name}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <Typography className={classes.nameHeading}>
                        {p.name}
                      </Typography>
                    </Link>
                    <IconButton
                      aria-label="add to favorites"
                      className={classes.favoriteBtn}
                      onClick={() => {
                        handleFavorite(p.id, p.isFavorite);
                      }}
                    >
                      {p.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
    </div>
  ) : (
    <div>Pokemon {name} Not Found</div>
  );
};

export default PokemonDetails;
