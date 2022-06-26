import React from 'react';
import Nav from './components/nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme';
import Loading from './components/loading';

const Popular = React.lazy(() => import('./components/popular'));
const Battle = React.lazy(() => import('./components/battle'));
const Result = React.lazy(() => import('./components/result'));

export default function App() {
  const [theme, setTheme] = React.useState('light');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className='container'>
            <Nav toggleTheme={toggleTheme} />
            <React.Suspense fallback={<Loading />}>
              <Routes>
                <Route path='/' element={<Popular />} />
                <Route path='/battle' element={<Battle />} />
                <Route path='/battle/results' element={<Result />} />
                <Route path='*' element={<h1>404 Not Found</h1>} />
              </Routes>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}
