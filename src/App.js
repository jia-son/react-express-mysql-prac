import './App.css';
import { Route, Routes } from "react-router-dom";
import MainPage from './components/main/Main.js';
import NoticeViews from './components/notice/NoticeViews';
import CreatePost from './components/notice/CreatePost';
import DetailPost from './components/notice/DetailPost';
import UpdatePost from './components/notice/UpdatePost';
import MapPage from './components/map/Map';
import CalendarPrac from './components/calendar/CalendarPrac.js';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/notice' element={<NoticeViews />} />
        <Route path='/createPost' element={<CreatePost />} />
        <Route path='/detailPost/:postId' element={<DetailPost />} />
        <Route path='/updatePost/:postId' element={<UpdatePost />} />

        <Route path='/map' element={<MapPage />} />
        <Route path='/calendarPrac' element={<CalendarPrac />}/>
      </Routes>
    </>
  );
}

export default App;
