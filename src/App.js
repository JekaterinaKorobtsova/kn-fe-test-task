
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from './components/Table';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;