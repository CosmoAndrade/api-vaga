
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from '../services/api'
import { getToken } from "../services/auth";



const Cadastrar = () => {

    const [createEvents, setCreateEvents] = useState([])
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [cor, setCor] = useState('')
    const [date, setDate] = useState('')


    const postCreateEvents = () => {
        api
            .get("eventos_diarios")
            .then((response) => {setCreateEvents(response.data)
                    console.log(response.data)
            
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });


    }


    useEffect(() => {
        postCreateEvents()
    }, [])


    const handleCreate = (e) => {
        const request = {
            titulo,
            descricao,
            data: moment(date).format('YYYY-MM-DD'),
            cor
        }
    
       

        const config = {
            headers: { Authorization: `Bearer ${getToken()}` }
        };

        api.post('eventos_diarios', request, config )
            .then((response) => {

                postCreateEvents()
            })
    }




    return (
        <div className="d-flex flex-column  ">
            <h1 className="text-center mt-4 mb-4">Cadastrar eventos</h1>

            <div className="w-50 mx-auto" >
                <div className="mb-3">

                    <input type="text"
                        className="form-control"
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />

                </div>
                <div className="mb-3">

                    <input type="text"
                        className="form-control"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>

                <div className="mb-3">

                    <input type="date"
                        className="form-control"
                        placeholder="Data"
                        value={date}
                        onChange={(e) => {setDate(e.target.value) ; console.log(e.target.value)}}
                    />
                </div>


                <div className="mb-3">

                    <input type="text"
                        className="form-control"
                        placeholder="Cor"
                        value={cor}
                        onChange={(e) => setCor(e.target.value)}
                    />
                </div>

                <NavLink to="/eventos">
                    <button onClick={handleCreate} className="btn btn-primary">Cadastrar</button>
                </NavLink>

            </div>

        </div>
    );
}

export default Cadastrar;