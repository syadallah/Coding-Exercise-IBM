import { ApolloClient, InMemoryCache } from "@apollo/client";

const baseurl = "localhost:4000";

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: `http://${baseurl}/graphql`
  });