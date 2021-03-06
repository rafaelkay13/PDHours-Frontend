import React, { useState, useEffect, useRef } from 'react';
import './modal.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import api from '../../utils/api'

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

const SquadModal = ({ open, setOpen }) => {

    const emptySquad = {
        name: ''
    }

    const emptyValidate = {
        error: false,
        text: ''
    }

    const [squad, setSquad] = useState(emptySquad)
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
        setSquad(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const createSquad = async () => {
        for (let i = 0; i < Object.entries(squad).length; i++) {
            if (Object.entries(squad)[i][1] === '') {
                let error = {
                    error: true,
                    text: 'Todos os campos precisam ser preenchidos!'
                }

                setValidate(error)

                return;
            }
        }

        api.post('/squad', squad).then(res => {
            console.log(res.data)
            alert('Squad cadastrado com sucesso!')
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
                >
                    <Box sx={style}>
                        <br />
                        <h1>Criar Squad</h1>
                        <br /><br /><br />
                        {
                            validate.error && (
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert onClose={resetValidate} severity="error">{validate.text}</Alert><br /><br />
                                </Stack>
                            )
                        }

                        <FormControl fullWidth>
                            <TextField required placeholder='NOME DO SQUAD' value={squad.employeeId} label="NOME DO SQUAD"
                                onChange={(e) => handleChange('name', e.target.value)} />
                            <br />
                        </FormControl>
                        <br />
                        <br /><br />
                        <Button variant='contained' size="large" onClick={createSquad}>Criar Squad</Button>
                    </Box>
                </Modal>
                <br />
            </div>
        )
    )
};

export default SquadModal;