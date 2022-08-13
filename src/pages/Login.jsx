import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

import api from '../services/api';

import { login } from '../services/auth';

// 'adm@email.com'
// '123123'


const Login = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
  


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('email', userName);
        data.append('password', password);


        api.post('/login/adm', data)
            .then((response) => {
                login(response.data.token)
                window.location.reload()
             } )
             .catch((response) => console.log(response))


    }


    return (
        <>
            <div className="container login">

                <div class="w-50 mx-auto border p-3  mt-4  rounded  bg-light">


                    <h2 class="text-center">Cadastrar Usuário</h2>

                    <form onSubmit={handleSubmit} >



                        <label class="form-label" for="email">Email:</label>
                        <input class="form-control" type="email" name="email" id="email" placeholder="Digite seu email"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}

                        />

                        <label class="form-label" for="senha">Senha:</label>
                        <input class="form-control" type="password" name="senha" id="senha" placeholder="Digite sua senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}


                        />

                        <button type='submit' className='btn btn-primary mt-4'>Entrar</button>

                    </form>



                </div>









            </div>
        </>
    );
}

export default Login;