import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/ui/WhatsAppButton";

function MainLayout({children}){

    return(

        <>

            <Navbar/>

            {children}

            <Footer/>

            <WhatsAppButton/>

        </>

    )

}

export default MainLayout;