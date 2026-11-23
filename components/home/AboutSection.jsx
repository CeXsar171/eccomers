import "../../styles/home/AboutSection.css";

function AboutSection() {

    return (

        <section className="about">

            <div className="container about-container">

                <div className="about-image">

                    <img
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80"
                        alt="Ferretería"
                    />

                </div>

                <div className="about-content">

                    <span>NUESTRA EMPRESA</span>

                    <h2>

                        Más de 20 años construyendo confianza

                    </h2>

                    <p>

                        Somos una ferretería comprometida con brindar
                        productos de alta calidad para profesionales,
                        empresas y hogares.

                    </p>

                    <p>

                        Contamos con herramientas, materiales eléctricos,
                        plomería, pinturas, seguridad industrial y mucho
                        más.

                    </p>

                </div>

            </div>

        </section>

    )

}

export default AboutSection;