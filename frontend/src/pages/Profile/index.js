import React, { useState, useEffect } from 'react'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'
import logoImg from '../../assets/logo.svg'

import api from "../../services/api"

export default props => {

    const [Incedents, setIncedents] = useState([])

    const ongName = localStorage.getItem("ongName")
    const ongId = localStorage.getItem("ongId")
    const history = useHistory()

    useEffect(() => {
        api.get("/profile", {
            headers: {
                Authorization: ongId
            }
        }).then(res => {
            setIncedents(res.data)})
    }, [ongId])

    async function handleDelete( id ){

        try{

            await api.delete(`/incidents/${id}`,{
                headers:{
                    Authorization: ongId
                }
            })

            setIncedents(Incedents.filter(incident => incident.id !== id ))

        }catch(err){
            alert("Erro ao deletar caso, tente novamente!")
        }
    }

    function handleLogout(){

        localStorage.clear();

        history.push("/")
    }

    return (

        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo, {ongName}</span>

                <Link to="/incidents/new" className="button">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>

            </header>
            <h1>Casos Cadastrados</h1>

            <ul>
                {
                    Incedents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR',{ style: "currency", currency: "BRL"}).format(incident.value)}</p>

                            <button type="button" onClick={() => handleDelete(incident.id)}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))
                }

               
            </ul>

        </div>
    )
}