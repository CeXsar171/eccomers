import "../../styles/admin/StatCard.css";

function StatCard({

title,

value,

icon,

color

}) {

    return (

        <div
            className="stat-card"
            style={{
                borderTop: `6px solid ${color}`
            }}
        >

            <div
                className="stat-icon"
                style={{
                    color
                }}
            >

                {icon}

            </div>

            <div className="stat-info">

                <span>

                    {title}

                </span>

                <h2>

                    {value}

                </h2>

            </div>

        </div>

    );

}

export default StatCard;