import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'js-cookie'

import Nav from './pages/Nav';
import Home from './pages/Home';
import Logup from './pages/Logup';
import BookResults from './pages/BookResults';
import NewClubForm from './pages/NewClub';
import Club from './pages/BookClub'
import Profile from './pages/Profile'
import ClubsList from './pages/ClubsList'
import Footer from './components/Footer'

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
            <Route path='books/:query' element={<BookResults />} />
            <Route path='clubs/'>
              <Route path='newClub' element={<NewClubForm />} />
              <Route path=':bookId' element={<ClubsList />} />
            </Route>
            <Route path='club/:clubId' element={<Club />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
