import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS, POKEMON_TYPES } from "../../apollo/queries";
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
}));

const ItemsContainer = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const [type, setType] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [viewType, setViewType] = useState("grid");

  const { loading: loadingPokemons, data } = useQuery(GET_POKEMONS, {
    variables: { search: "", type: "" },
  });
  const { loading: loadingTypes, data: types } = useQuery(POKEMON_TYPES);

  const handleTabChange = (_, newValue) => {
    setShowAll(!newValue);
  };

  const handleTypeChange = (ev) => {
    setType(ev.target.value);
  };

  if (loadingPokemons || loadingTypes) return null;
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
        />
        <FormControl variant="filled" className={classes.dropdown}>
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={handleTypeChange}>
            {types.pokemonTypes.map((t) => (
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
      <h2>Pokemons:</h2>
      <ul>
        {data.pokemons.edges.map((e) => (
          <li key={e.name}>{e.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsContainer;
