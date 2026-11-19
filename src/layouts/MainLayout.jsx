import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import ElegirWhatsApp from "../components/ui/ElegirWhatsApp";

function MainLayout({children}){

    return(

        <>

            <Navbar/>

            {children}

            <Footer/>

            <WhatsAppButton/>
            <ElegirWhatsApp/>

        </>

    )

}

export default MainLayout;