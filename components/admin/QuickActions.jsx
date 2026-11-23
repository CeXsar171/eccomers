import { Link } from "react-router-dom";

import {
    FaPlus,
    FaTag,
    FaStar
} from "react-icons/fa";

import "../../styles/admin/QuickActions.css";

function QuickActions(){

    return(

        <div className="quick-actions">

            <Link to="/admin/nuevo-producto">

                <FaPlus/>

                Nuevo Producto

            </Link>

            <Link to="/admin/categorias">

                <FaTag/>

                Categorías

            </Link>

            <Link to="/admin/promociones">

                <FaStar/>

                Promociones

            </Link>

        </div>

    )

}

export default QuickActions;