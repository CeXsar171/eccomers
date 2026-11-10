import {
FaMoneyBillWave,
FaCreditCard,
FaUniversity
} from "react-icons/fa";

import "../../styles/home/PaymentSection.css";

function PaymentSection(){

    return(

        <section className="payment">

            <div className="container">

                <h2 className="section-title">

                    Formas de Pago

                </h2>

                <div className="payment-grid">

                    <div className="payment-card">

                        <FaMoneyBillWave/>

                        <h3>Efectivo</h3>

                    </div>

                    <div className="payment-card">

                        <FaCreditCard/>

                        <h3>Tarjetas</h3>

                    </div>

                    <div className="payment-card">

                        <FaUniversity/>

                        <h3>Transferencia</h3>

                    </div>

                </div>

            </div>

        </section>

    )

}

export default PaymentSection;