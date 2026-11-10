import { motion } from "framer-motion";
import "../../styles/home/CategoryCard.css";

function CategoryCard({category}){

return(

<motion.div

className="category-card"

whileHover={{scale:1.05}}

transition={{duration:.3}}

>

<img

src={category.image}

alt={category.name}

/>

<div className="category-info">

<h3>{category.name}</h3>

</div>

</motion.div>

)

}

export default CategoryCard;