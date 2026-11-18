import { useState } from "react";

import {
  FaMoneyBillWave,
  FaCreditCard,
  FaUniversity,
  FaStore
} from "react-icons/fa";

import { AVISO_EFECTIVO, TARJETAS, BANCOS } from "../../data/pagos";

import "../../styles/home/PaymentSection.css";

const METODOS = [
  { id: "efectivo", titulo: "Efectivo", Icono: FaMoneyBillWave },
  { id: "tarjetas", titulo: "Tarjetas", Icono: FaCreditCard },
  { id: "transferencia", titulo: "Transferencia", Icono: FaUniversity },
];

function PaymentSection(){

    // Método abierto; tocar el mismo otra vez lo cierra.
    const [abierto, setAbierto] = useState(null);

    return(

        <section className="payment" id="pagos">

            <div className="container">

                <h2 className="section-title">

                    Formas de Pago

                </h2>

                <p className="section-subtitle">

                    Toca un método para ver los detalles.

                </p>

                <div className="payment-grid">

                    {METODOS.map(({ id, titulo, Icono }) => (

                        <button
                            type="button"
                            key={id}
                            className={abierto === id ? "payment-card activa" : "payment-card"}
                            aria-expanded={abierto === id}
                            onClick={() => setAbierto(abierto === id ? null : id)}
                        >

                            <Icono/>

                            <h3>{titulo}</h3>

                        </button>

                    ))}

                </div>

                {abierto && (

                    <div className="payment-panel">

                        {abierto === "efectivo" && (

                            <p className="payment-aviso">

                                <FaStore/>

                                {AVISO_EFECTIVO}

                            </p>

                        )}

                        {abierto === "tarjetas" && (

                            <>

                                <h4>Tarjetas de crédito y débito</h4>

                                <ul className="payment-fichas">

                                    {TARJETAS.map(({ nombre, marca, texto }) => (

                                        <li key={marca}>

                                            <span
                                                className={"ficha tarjeta-" + marca}
                                                role="img"
                                                aria-label={nombre}
                                            >
                                                {texto}
                                            </span>

                                        </li>

                                    ))}

                                </ul>

                            </>

                        )}

                        {abierto === "transferencia" && (

                            <>

                                <h4>Transferencias bancarias</h4>

                                <ul className="payment-fichas">

                                    {BANCOS.map((banco) => (

                                        <li key={banco}>

                                            <span className="ficha ficha-banco">

                                                <FaUniversity/>

                                            </span>

                                            <small>{banco}</small>

                                        </li>

                                    ))}

                                </ul>

                            </>

                        )}

                    </div>

                )}

            </div>

        </section>

    )

}

export default PaymentSection;
