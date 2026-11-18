import { motion } from "framer-motion";
import "../../styles/home/HeroBanner.css";

function HeroBanner(){

return(

<motion.section

className="hero"

initial={{opacity:0}}

animate={{opacity:1}}

transition={{duration:1}}

>

<div className="overlay">

<motion.div

className="hero-content"

initial={{x:-120}}

animate={{x:0}}

transition={{duration:1}}

>

<span className="subtitle">

BIENVENIDO A NUESTRA FERRETERÍA

</span>

<h1>

Todo para tu

<br/>

construcción y hogar

</h1>

<p>

Herramientas, electricidad,
plomería, pinturas,
seguridad industrial
y mucho más.

</p>

<a href="#productos" className="hero-btn">

Ver Productos

</a>

</motion.div>

</div>

</motion.section>

)

}

export default HeroBanner;