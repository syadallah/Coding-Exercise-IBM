import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  GET_POKEMONS,
  POKEMON_TYPES,
  GET_FAVORITE_POKEMONS,
} from "../../apollo/queries";
import {
  Tabs,
  Tab,
  makeStyles,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  Typography,
  Backdrop,
  CircularProgress,
  List,
  Avatar,
  ListItemAvatar,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Divider,
} from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    borderColor: "#71c1a1",
    color: "#71c1a1",
  },
  selectedTab: {
    backgroundColor: "#71c1a1",
    color: "#fff",
  },
  viewButtons: {
    flex: 1,
  },
  dropdown: {
    flex: 4,
  },
  inputField: {
    flex: 8,
  },
  fields: {
    display: "flex",
    marginBottom: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  paper: {
    height: 350,
    width: 200,
  },
  imageContainer: {
    height: 290,
  },
  image: {
    height: "100%",
    objectFit: "scale-down",
  },
  favoriteBtn: {
    color: red[900],
    marginLeft: "auto",
  },
  nameHeading: {
    fontWeight: 600,
  },
  cardActions: {
    justifyContent: "space-between",
  },
}));

const ItemsContainer = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [viewType, setViewType] = useState("grid");

  const getQueryOptions = () => {
    let variables = {
      search,
      type,
    };
    return { variables };
  };

  const [getPokemons, { loading: loadingData, data }] = useLazyQuery(
    showAll ? GET_POKEMONS : GET_FAVORITE_POKEMONS,
    getQueryOptions()
  );
  const { loading: loadingType, data: types } = useQuery(POKEMON_TYPES);

  const handleTabChange = (_, newValue) => {
    setShowAll(!newValue);
  };

  const handleTypeChange = (ev) => {
    setType(ev.target.value);
  };

  useEffect(() => {
    getPokemons(getQueryOptions());
  }, [search, type, showAll]);

  console.log("data", data);
  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={loadingType || loadingData}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Tabs
        value={Number(!showAll)}
        onChange={handleTabChange}
        variant="fullWidth"
      >
        <Tab
          label="All"
          className={showAll ? classes.selectedTab : classes.tab}
        />
        <Tab
          label="Favourites"
          className={showAll ? classes.tab : classes.selectedTab}
        />
      </Tabs>
      <div className={classes.fields}>
        <TextField
          label="Search"
          className={classes.inputField}
          variant="filled"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          focused={true}
        />
        <FormControl variant="filled" className={classes.dropdown}>
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={handleTypeChange}>
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {types &&
              types.pokemonTypes.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <span className={classes.viewButtons}>
          <IconButton
            color="primary"
            component="span"
            onClick={() => {
              setViewType("list");
            }}
          >
            <ListIcon />
          </IconButton>
          <IconButton
            color="primary"
            component="span"
            onClick={() => {
              setViewType("grid");
            }}
          >
            <ViewModuleIcon />
          </IconButton>
        </span>
      </div>
      {viewType === "list" ? (
        <List dense={true}>
          {data &&
            data.pokemons.edges.map((p) => (
              <>
                <ListItem key={p.id}>
                  <ListItemAvatar>
                    <Avatar src={p.image} alt={p.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={p.name}
                    secondary={p.types.join(", ")}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="favorite"
                      className={classes.favoriteBtn}
                    >
                      {p.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
        </List>
      ) : (
        <Grid container justify="center" spacing={2}>
          {data &&
            data.pokemons.edges.map((p) => (
              <Grid key={p.name} item>
                <Card className={classes.paper}>
                  <CardActionArea className={classes.imageContainer}>
                    <CardMedia
                      component="img"
                      image={p.image}
                      title={p.name}
                      classes={{ media: classes.image }}
                    />
                  </CardActionArea>
                  <CardActions className={classes.cardActions}>
                    <span>
                      <Typography className={classes.nameHeading}>
                        {p.name}
                      </Typography>
                      <Typography variant="subtitle2">
                        {p.types.join(", ")}
                      </Typography>
                    </span>
                    <IconButton
                      aria-label="add to favorites"
                      className={classes.favoriteBtn}
                      onClick={() => {}}
                    >
                      {p.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
};

export default ItemsContainer;
