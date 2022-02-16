import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './styles.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import EmployeesList from './components/routes/Employee/list';
import SquadList from './components/routes/Squads/list';
import Hours from './components/routes/Squads/hours';
import ReportModal from './components/modals/reportModal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function Root() {

  useEffect(() => {
  }, [])

  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);
  let navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  }

  const handleChange = (event, newValue) => {
    if(newValue === 0){
      setValue(newValue)
      return navigate('/squads')
    } 
    setValue(newValue)
    return navigate('/employees')
  };

  return (
    <div className='fullpage'>
      <header className="header">
        <div className='top'>
          <h1 className="title">PD Hours</h1>
          <Button style={{ marginLeft: '800px' }} variant="contained" size='large' onClick={handleOpen}>Lançar Horas</Button>
        </div>

        <div className='tags'>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Squads" />
                <Tab label="Usuários"  />
              </Tabs>
            </Box>
          </Box>

        </div>
      </header>

      <div className="container">
          <Routes>
            <Route path='/' element={null} />
            <Route path='/employees' element={<EmployeesList />} />
            <Route path='/squads' element={<SquadList />} />
            <Route path='/squads/:id' element={<Hours />} />
          </Routes>
        <ReportModal open={open} setOpen={setOpen} />
      </div>
      <br /><br />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;
