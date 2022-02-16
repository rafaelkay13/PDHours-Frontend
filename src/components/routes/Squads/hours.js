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
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useParams } from 'react-router-dom';
import '../../../styles.css'
import api from '../../../services/api'

let emptyFilter = {
    squadId: 0,
    begin: '',
    end: ''
}

function Hours() {

    const [data, setData] = useState([])
    const [filter, setFilter] = useState(emptyFilter)
    const [squad, setSquad] = useState({})
    const [media, setMedia] = useState(0)
    const [total, setTotal] = useState(0)
    const { id } = useParams();

    useEffect(() => {

        let _filter = filter;
        _filter.squadId = parseInt(id);
        setFilter(_filter)

        const getData = async () => {
            try {
                const response = await api.get(`/reports`)
                setData(response.data)
                const _squad = await api.get(`/squad/${id}`)
                setSquad(_squad.data[0])
                
            } catch (err) {
                console.log(err)
                alert('Ocorreu um erro!')
            }
        }
        getData();

    }, [])

    const convertDate = (dateValue) => {
        let fullDate = dateValue.split('T');
        let date = fullDate[0].split('-');
        let time = fullDate[1].split('.');
        let convertDate = `${date[2]}/${date[1]}/${date[0]} ${time[0]}`
        return convertDate
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

    const handleChange = (name, value) => {
        setFilter(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleFilter = async () => {
        console.log(filter)
        const _total = await api.post(`/totalHours`, filter)
        console.log(_total.data.result)
        setTotal(_total.data.result)
        const _media = await api.post(`/mediaHours`, filter)
        console.log(_media.data)
        setMedia(_media.data)
    }

    return (
        <div className='fullpage'>

            <React.Fragment>
                <h2>Squad {squad.name}</h2>
                <br />
                <div className='dateDiv'>
                    <div className='dateBegin'>
                        <h6>INICIO</h6>
                        <TextField value={filter.begin} type="datetime-local" onChange={(e) => handleChange('begin', e.target.value)} />
                    </div>
                    <div className='dateEnd'>
                        <h6>FIM</h6>
                        <TextField value={filter.end} type="datetime-local" onChange={(e) => handleChange('end', e.target.value)} />
                    </div>
                    <Button variant='contained' onClick={handleFilter}>Filtrar</Button>
                </div>

                <main className="main">
                    <div className='centerStyle'>
                        <h2>Horas por Membro</h2>
                    </div>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Membro</StyledTableCell>
                                    <StyledTableCell>Descrição</StyledTableCell>
                                    <StyledTableCell align="right">Horas</StyledTableCell>
                                    <StyledTableCell align="right">Criado em</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row.id}>
                                        <StyledTableCell component="th" scope="row">{row.employee_id}</StyledTableCell>
                                        <StyledTableCell>{row.description}</StyledTableCell>
                                        <StyledTableCell align="right">{row.spent_hours}</StyledTableCell>
                                        <StyledTableCell align="right">{convertDate(row.created_at)}</StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br /><br />
                    <div className='centerStyle'>
                        <h3>Horas totais da squad</h3><br /><br />
                        <h1 className='respStyle'>{total} Horas</h1><br /><br />
                        <h3>Média de horas por dia</h3><br /><br />
                        <h1 className='respStyle'>{media} Horas/Dia</h1><br /><br />
                    </div>
                </main>
            </React.Fragment>
            <br /><br />
        </div>
    );
}

export default Hours;
