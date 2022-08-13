import './Eventos.css'
import { NavLink } from "react-router-dom";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import api from "../services/api"

import { getToken, logout } from '../services/auth';



const Eventos = () => {

  const [eventos, setEventos] = useState([])
  const [confirmModal, setConfirmModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState('')


  const getAllEvents = () => {

    api
      .get("eventos_diarios")
      .then((response) => setEventos(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  useEffect(() => {
    getAllEvents()
  }, [])


  const handleDelete = () => {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` }
    };

    api.delete(`eventos_diarios/${idToDelete}`, config).then((response) => {
      getAllEvents()
    })

    setConfirmModal(false)

  }


  const handleEdit = () => {

  }

  const handleCreate = () => {

  }


  const handleExit = () => {

    logout()

    window.location.reload()
  }

  return (
    <div className=" eventos mx-auto w-75 ">

      <div className="d-flex justify-content-between">
        <button onClick={handleExit} className='btn btn-danger'>Sair</button>

        <NavLink to="/cadastrar">
          <button onClick={''} className='btn btn-success' >Cadastrar</button>
        </NavLink>

      </div>




      <h3 className="text-center mb-4">Página de Eventos</h3>

      {eventos.map((evento, index) => {
        return (
          <div key={index}>

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



                    <FontAwesomeIcon type='button' icon={faTrash} className="mx-4"
                      onClick={() => {
                        setConfirmModal(true)
                        setIdToDelete(evento.id)
                      }}
                    />


                    <FontAwesomeIcon icon={faEdit} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" />

                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Editar Eventos</h5>

                          </div>
                          <div className="modal-body">
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


      {confirmModal &&
        <div className='confirm-modal' >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Deletar Evento</h5>
                <button type="button" className="btn-close"
                  onClick={() => setConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Voçê deseja excluir!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary"
                  onClick={() => setConfirmModal(false)}
                >Cancelar</button>
                <button type="button" className="btn btn-primary"
                  onClick={handleDelete}
                >Confirmar</button>
              </div>
            </div>
          </div>
        </div>}

    </div>
  );
}

export default Eventos;