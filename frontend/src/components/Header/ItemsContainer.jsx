import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_POKEMONS, POKEMON_TYPES, GET_FAVORITE_POKEMONS } from "../../apollo/queries";
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
  // Backdrop,
  // CircularProgress,
} from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import ViewModuleIcon from "@material-ui/icons/ViewModule";

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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
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

  const [getPokemons, { data }] = useLazyQuery(
    showAll ? GET_POKEMONS : GET_FAVORITE_POKEMONS,
    getQueryOptions()
  );
  const { data: types } = useQuery(POKEMON_TYPES);

  const handleTabChange = (_, newValue) => {
    setShowAll(!newValue);
  };

  const handleTypeChange = (ev) => {
    setType(ev.target.value);
  };

  useEffect(() => {
    getPokemons(getQueryOptions());
  }, [search, type, showAll]);

  return (
    <div className={classes.root}>
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
            {types && types.pokemonTypes.map((t) => (
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
      <ul>
        {data && data.pokemons.edges.map((e) => <li key={e.name}>{e.name}</li>)}
      </ul>
    </div>
  );
};

export default ItemsContainer;
