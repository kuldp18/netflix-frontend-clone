import React from 'react';
import './App.css';
import requests from './requests';
const Row = React.lazy(() => import('./Row'));
const Banner = React.lazy(() => import('./Banner'));
const Nav = React.lazy(() => import('./Nav'));

function App() {
  return (
    <div className="app">
      <React.Suspense fallback={<p>Loading...</p>}>
        <Nav />
        <Banner />

        <Row
          title="Netflix Originals"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        <Row title="Action" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Science Fiction" fetchUrl={requests.fetchSciFiMovies} />
        <Row title="Crime" fetchUrl={requests.fetchCrimeMovies} />
      </React.Suspense>
    </div>
  );
}

export default App;
