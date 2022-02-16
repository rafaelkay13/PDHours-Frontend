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
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import '../../../styles.css'
import EmployeeModal from '../../../components/modals/employeeModal'
import api from '../../../services/api'

function ReportList() {

  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(prev => !prev)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/employees`)
        setData(response.data)
      } catch (err) {
        console.log(err)
        alert('Ocorreu um erro!')
      }
    }
    getData();

  }, [showModal])

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
      {showModal ? (
        <EmployeeModal showModal={showModal} setShowModal={setShowModal} />
      ) : (
<React.Fragment>

        <h2>Lista de Usuários</h2>
        <Button variant="contained" onClick={openModal} startIcon={<PersonAddAlt1Icon />}>Novo Usuário</Button>
<br/><br/>
        <main className="main">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nome</StyledTableCell>
                  <StyledTableCell align="right">Horas</StyledTableCell>
                  <StyledTableCell align="right">Squad ID</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.estimated_hours}</StyledTableCell>
                    <StyledTableCell align="right">{row.squad_id}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </main>

      </React.Fragment>
      )}
      <br /><br />
    </div>
  );
}

export default ReportList;
