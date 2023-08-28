import './App.css';
import { Route, Routes } from "react-router-dom";
import NoticeViews from './components/notice/NoticeViews';
import CreatePost from './components/notice/CreatePost';
import DetailPost from './components/notice/DetailPost';
import MainPage from './components/main/Main.js';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/notice' element={<NoticeViews />} />
        <Route path='/createPost' element={<CreatePost />} />
        <Route path='/detailPost/:postId' element={<DetailPost />} />
      </Routes>
    </>
  );
}

export default App;
