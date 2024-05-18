import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

const customFetch = (uri, options) => {
  const requestBody = JSON.parse(options.body);
  return fetch(
    "https://french-locations.000webhostapp.com/graphql",
    {
      method: "POST",
      body: JSON.stringify(requestBody)
    }
  );
};

const link = new HttpLink({ fetch: customFetch, fetchOptions: { mode: 'no-cors'} });

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);