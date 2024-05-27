import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, MainContent,Register} from "./containers/public";

function App() {
  return (
    <div className="h-screen bg-primary">
      <Router>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<MainContent />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
