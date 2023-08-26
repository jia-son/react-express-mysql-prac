import './App.css';
import axios from 'axios';

function App() {

  const selectAll = async() => {
    const res = await axios.get('/get');
    console.log(res.data);
  };

  return (
    <div className="App">
      <h1>React-express-MySQl 연동 확인</h1>
      <button onClick={selectAll}>전체 목록 조회</button>
    </div>
  );
}

export default App;
