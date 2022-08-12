import './Eventos.css'
import { useNavigate } from 'react-router-dom';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import api from "../services/api"

import { logout } from '../services/auth';



const Eventos = () => {

  const [eventos, setEventos] = useState([])
  const navigate = useNavigate()


  api
    .get("eventos_diarios")
    .then((response) => setEventos(response.data))
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });


    const handleExit = () => {
       
        logout()

        navigate('/')
    }

  return (
    <div className="styles.eventos eventos mx-auto w-75 ">

      <button onClick={handleExit} className='btn btn-danger'>Sair</button>

      <h3 className="text-center mb-4">Página de Eventos</h3>

      {eventos.map((evento) => {
        return (
          <div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Título</th>
                  <th scope="col">Descrição</th>
                  <th scope="col">Data</th>
                  <th scope="col">Cor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>

                  <td>{evento.titulo}</td>
                  <td>{evento.descricao}</td>
                  <td>{evento.data}</td>
                  <td>{evento.cor}</td>
                  <td >

                    <FontAwesomeIcon icon={faTrash} className="mx-4" />
                    <FontAwesomeIcon icon={faEdit} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" />

                    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Editar Eventos</h5>
                            <div className="close" data-dismiss="modal" aria-label="Close">

                              <FontAwesomeIcon icon={faTrash} aria-hidden="true" className="mx-4 btn btn-danger" />
                            </div>
                          </div>
                          <div className="modal-body">
                            <input className="form-control mb-3" type="text" placeholder='Título' />
                            <input className="form-control" type="text" placeholder='Descrição' />
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Sair</button>
                            <button type="button" className="btn btn-primary">Editar eventos</button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      })}


    </div>
  );
}

export default Eventos;