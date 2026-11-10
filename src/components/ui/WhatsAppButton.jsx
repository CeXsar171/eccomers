import { FaWhatsapp } from "react-icons/fa";
import company from "../../data/company";
import "../../styles/ui/WhatsAppButton.css";

function WhatsAppButton(){

    return(

        <a

            href={`https://wa.me/${company.whatsapp}`}

            target="_blank"

            rel="noreferrer"

            className="whatsapp"

        >

            <FaWhatsapp/>

        </a>

    )

}

export default WhatsAppButton;