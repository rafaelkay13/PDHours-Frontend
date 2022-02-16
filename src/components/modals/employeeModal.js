import React, { useState, useEffect, useRef } from 'react';
import './modal.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import api from '../../services/api'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    padding: '25px',
    alignItems: 'center',
    p: 4,
};

const EmployeeModal = ({ open, setOpen }) => {

    const emptyEmployee = {
        name: "",
        estimatedHours: 0,
        squadId: ""
    }

    const [employee, setEmployee] = useState(emptyEmployee)
    const [squadList, setSquadList] = useState([])

    const handleClose = () => setOpen(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`/squads`)
                setSquadList(response.data)
            } catch (err) {
                console.log(err)
                alert('Ocorreu um erro!')
            }
        }
        getData();

    }, [])

    const handleChange = (name, value) => {
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const createEmployee = async () => {
        console.log(employee)
        api.post('/employee', employee).then(res => {
            console.log(res.data)
            alert('Usuário cadastrado com sucesso!')
            setOpen(false)
        }).catch(err => {
            console.log(err)
            alert('Ocorreu um erro!')
        })

    }

    return (
        open && (
                <div className='modalContainer'>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                        <br />
                    <h1>Criar Usuário</h1>
                    <br /><br /><br />
                            <FormControl fullWidth>
                                <TextField placeholder='NOME' value={employee.name} label="NOME"
                                    onChange={(e) => handleChange('name', e.target.value)} />
                                <br />
                                <TextField placeholder='HORAS ESTIMADAS DE TRABALHO' type="number" label="HORAS ESTIMADAS DE TRABALHO"
                                    value={employee.estimated_hours} onChange={(e) => handleChange('estimatedHours', e.target.value)} />
                            </FormControl>
                            <br />
                            <FormControl fullWidth>
                                <InputLabel>SQUAD</InputLabel>
                                <Select
                                    value={employee.squad_id}
                                    onChange={(e) => handleChange('squadId', e.target.value)}
                                >
                                    {
                                        squadList.map(squad => {
                                            return (<MenuItem value={squad.id}>{squad.name}</MenuItem>)
                                        })
                                    }

                                </Select>
                            </FormControl>
                            <br /><br />
                            <Button variant='contained' size="large" onClick={createEmployee}>Criar Usuário</Button>
                        </Box>
                    </Modal>
                    <br />
                </div>
        )
    )
};

export default EmployeeModal;