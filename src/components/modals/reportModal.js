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
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
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

const ReportModal = ({ open, setOpen }) => {

    const emptyReport = {
        description: "",
        spentHours: 0,
        employeeId: 0
    }

    const emptyValidate = {
        error: false,
        text: ''
    }

    const [report, setReport] = useState(emptyReport)

    const [validate, setValidate] = useState(emptyValidate)

    const handleClose = () => setOpen(false);

    useEffect(() => {
        const getData = async () => {
            try {
                // const response = await api.get(`/squads`)
                // setSquadList(response.data)
            } catch (err) {
                console.log(err)
                alert('Ocorreu um erro!')
            }
        }
        getData();

    }, [])

    const handleChange = (name, value) => {
        setReport(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const createReport = async () => {

        for (let i = 0; i < Object.entries(report).length; i++) {
            if (Object.entries(report)[i][1] === '') {
                let error = {
                    error: true,
                    text: 'Todos os campos precisam ser preenchidos!'
                }

                setValidate(error)

                return;
            }
        }

        let value = await api.get(`/employee/${report.employeeId}`);
        console.log(value)
        if (value.data.length === 0) {
            let error = {
                error: true,
                text: 'Não existe usuário com esse id!'
            }
            setValidate(error)
            return;
        }

    api.post('/report', report).then(res => {
        console.log(res.data)
        alert('Lançamento cadastrado com sucesso!')
        setOpen(false)
    }).catch(err => {
        console.log(err)
        alert('Ocorreu um erro!')
    })

}

const resetValidate = () => setValidate(emptyValidate)

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
                    <h1>Criar Lançamento</h1>
                    <br /><br /><br />
                    {
                        validate.error && (
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert onClose={resetValidate} severity="error">{validate.text}</Alert><br /><br />
                            </Stack>
                        )
                    }
                    <FormControl fullWidth>
                        <TextField placeholder='ID DO USUÁRIO' value={report.employeeId} label="ID DO USUÁRIO"
                            onChange={(e) => handleChange('employeeId', e.target.value)} />
                        <br />
                        <TextField placeholder='HORAS GASTAS' type="number" label="HORAS ESTIMADAS DE TRABALHO"
                            value={report.spentHours} onChange={(e) => handleChange('spentHours', e.target.value)} />
                        <br />
                        <TextField placeholder='DESCRIÇÃO' type="text" label="DESCRIÇÃO"
                            value={report.description} onChange={(e) => handleChange('description', e.target.value)} />
                    </FormControl>
                    <br />
                    <br /><br />
                    <Button variant='contained' size="large" onClick={createReport}>Criar Lançamento</Button>
                </Box>
            </Modal>
            <br />
        </div>
    )
)
};

export default ReportModal;