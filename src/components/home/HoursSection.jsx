import "../../styles/home/HoursSection.css";

function HoursSection() {
  const sucursales = [
    {
      nombre: "Sucursal Matriz",
      horario: [
        { dia: "Lunes - Viernes", hora: "07:30 - 18:00" },
        { dia: "Sábado", hora: "07:30 - 13:00" },
        { dia: "Domingo", hora: "Cerrado" },
      ],
    },
    {
      nombre: "Sucursal Norte",
      horario: [
        { dia: "Lunes - Viernes", hora: "07:30 - 18:00" },
        { dia: "Sábado", hora: "08:00 - 13:00" },
        { dia: "Domingo", hora: "Cerrado" },
      ],
    },
    {
      nombre: "Sucursal Sur",
      horario: [
        { dia: "Lunes - Viernes", hora: "07:30 - 18:00" },
        { dia: "Sábado", hora: "07:30 - 13:00" },
        { dia: "Domingo", hora: "08:00 - 12:00" },
      ],
    },
  ];

  return (
    <section className="hours">
      <div className="container">

        <h2 className="section-title">
          Horarios de Atención
        </h2>

        <div className="branches-grid">

          {sucursales.map((sucursal, index) => (
            <div className="branch-card" key={index}>

              <h3>{sucursal.nombre}</h3>

              {sucursal.horario.map((item, i) => (
                <div className="day" key={i}>
                  <strong>{item.dia}</strong>
                  <p>{item.hora}</p>
                </div>
              ))}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HoursSection;