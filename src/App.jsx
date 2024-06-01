import './App.css';
import Header from './components/header.jsx';
import Calendar from './components/calendar/calendar.jsx';
import Registr from './components/lk/registration';
import Add from './components/add/add.jsx';
import Gallery from './components/gallery/gallery.jsx';
import {
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom';
import Groups from './components/groups/groups';
import GalleryItem from './components/gallery/galleryItem';



function App() {
  return (
    <div className='window'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Lk" element={<Registr />} />
          <Route path="/Add" element={<Add />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/Groups" element={<Groups />} />
          <Route path="/GalleryItem/:id" element={<GalleryItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// коннект к бд mongodb+srv://iliait2005:<password>@cluster0.pflh5da.mongodb.net/