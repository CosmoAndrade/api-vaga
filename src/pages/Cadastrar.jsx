
import { NavLink } from "react-router-dom";

const Cadastrar = () => {
    return (
        <div className="d-flex flex-column  ">
            <h1 className="text-center mt-4 mb-4">Cadastrar eventos</h1>

            <form className="w-50 mx-auto">
                <div class="mb-3">

                    <input type="text" class="form-control" placeholder="Título" />

                </div>
                <div className="mb-3">

                    <input type="text" class="form-control" placeholder="Descrição" />
                </div>

                <div className="mb-3">

                    <input type="text" className="form-control" placeholder="Cor" />
                </div>

                <NavLink to="/eventos">
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </NavLink>

            </form>

        </div>
    );
}

export default Cadastrar;