import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Create from './pages/Create';
import Guestbook from './pages/Guestbook';
import Layout from './layout/layout';

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="feed" element={<Feed />} />
                <Route path="create" element={<Create />} />
                <Route path="guestbook" element={<Guestbook />} />
            </Route>
        </Routes>
      </Router>
  );
}

export default App;