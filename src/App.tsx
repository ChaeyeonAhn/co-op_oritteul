import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Feed from './pages/Feed';
import FeedDetail from './pages/FeedDetail';
import Create from './pages/Create';
import Community from './pages/Community';
import Guestbook from './pages/Guestbook';
import Layout from './layout/layout';
import My from './pages/My';

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="feed" element={<Feed />} />
                <Route path="feed/:id" element={<FeedDetail />} />
                <Route path="create" element={<Create />} />
                <Route path="community" element={<Community />} />
                <Route path="guestbook" element={<Guestbook />} />
                <Route path="my" element={<My />} />
            </Route>
        </Routes>
      </Router>
  );
}

export default App;