import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';

import '../../../styles.css'
import SquadModal from '../../../components/modals/squadModal'
import api from '../../../services/api'

function SquadList() {

  const [data, setData] = useState([])
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/squads`)
        setData(response.data)
      } catch (err) {
        console.log(err)
        alert('Ocorreu um erro!')
      }
    }
    getData();

  }, [open])

  const handleOpen = () => {
    setOpen(true);
  }

  function handleNavigate(id) {
    console.log(id)
    return navigate(`/squads/${id}`)
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#4263EB',
      color: '#FFF',
      fontSize: 18
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 18

    },
  }));

  return (
    <div className='fullpage'>

      <React.Fragment>
        <h2>Lista de Squads</h2>
        <Button variant="contained" onClick={handleOpen} startIcon={<GroupIcon />}>Criar Squad</Button>
        <br /><br />
        <main className="main">
          {Object.keys(data).length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align="right">Nome</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.name}</StyledTableCell>
                      <StyledTableCell align="right"><Button variant='contained' onClick={() => handleNavigate(row.id)}>Visitar Squad</Button></StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div className='imgDiv'>
              <img className='img' src={require('../../../services/img1.png')} />
              <h3 className='dateDiv'>Nenhuma squad cadastrada. Crie uma squad para começar</h3>
            </div>
          )}

        </main>
        <div>

        </div>
        <SquadModal open={open} setOpen={setOpen} />
      </React.Fragment>
      <br /><br />
    </div>
  );
}

export default SquadList;
