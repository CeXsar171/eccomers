import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CategoryCard from "./CategoryCard";

import "../../styles/home/CategoryCard.css";

function Categories({
  categorias,
  cargando,
  categoriaActiva,
  onSeleccionar
}) {

  // Sin categorías activas no se ocupa espacio en la página.
  if (!cargando && categorias.length === 0) {
    return null;
  }

  return (

    <section className="categories" id="categorias">

      <div className="container">

        <h2 className="section-title">

          Explora nuestras categorías

        </h2>

        <p className="section-subtitle">

          Desliza y elige una categoría para ver sus productos.

        </p>

        {cargando ? (

          <div className="categories-skeleton">

            <span /><span /><span /><span />

          </div>

        ) : (

          <Swiper

            className="categories-carousel"

            modules={[Autoplay, Navigation, Pagination]}

            navigation

            pagination={{ clickable: true }}

            autoplay={{
              delay: 3500,
              pauseOnMouseEnter: true,
              disableOnInteraction: false
            }}

            rewind

            spaceBetween={18}

            slidesPerView={1.25}

            breakpoints={{
              480: { slidesPerView: 2.2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 }
            }}

          >

            {categorias.map((categoria) => (

              <SwiperSlide key={categoria.id}>

                <CategoryCard
                  category={categoria}
                  activa={categoriaActiva?.id === categoria.id}
                  onSelect={onSeleccionar}
                />

              </SwiperSlide>

            ))}

          </Swiper>

        )}

      </div>

    </section>

  );

}

export default Categories;
