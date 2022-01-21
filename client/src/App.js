import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'js-cookie'

import Nav from './pages/Nav';
import Home from './pages/Home';
import Logup from './pages/Logup';

const httpLink = createHttpLink({
  uri: '/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({})
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' element={<Nav />}>
            <Route index element={<Home />} />
            <Route path='logup' element={<Logup />} />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
