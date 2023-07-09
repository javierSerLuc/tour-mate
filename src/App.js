import './App.css';
import { Rutas } from './Routing/Rutas';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Rutas></Rutas>
      </div>
    </LocalizationProvider>
  );
}

export default App;
