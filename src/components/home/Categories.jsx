import CategoryCard from "./CategoryCard";
import categories from "../../data/categories";

function Categories() {

    return (

        <section className="categories">

            <div className="container">

                <h2 className="section-title">

                    Explora nuestras categorías

                </h2>

                <div className="categories-grid">

                    {

                        categories.map(category => (

                            <CategoryCard
                                key={category.id}
                                category={category}
                            />

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default Categories;