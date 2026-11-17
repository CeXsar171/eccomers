import { FaWhatsapp } from "react-icons/fa";
import { enlaceWhatsApp } from "../../utils/whatsapp";
import "../../styles/ui/WhatsAppButton.css";

function WhatsAppButton(){

    return(

        <a

            href={enlaceWhatsApp()}

            target="_blank"

            rel="noreferrer"

            className="whatsapp"

            aria-label="Escríbenos por WhatsApp"

            title="Escríbenos por WhatsApp"

        >

            <FaWhatsapp/>

        </a>

    )

}

export default WhatsAppButton;