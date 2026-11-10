import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

import "../../styles/admin/DashboardChart.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

function DashboardChart() {

    const data = {
        labels: [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun"
        ],

        datasets: [
            {
                label: "Ventas",

                data: [
                    250,
                    400,
                    300,
                    600,
                    800,
                    750
                ],

                borderColor: "#1565C0",

                backgroundColor: "rgba(21,101,192,.15)",

                tension: .4,

                fill: true
            }
        ]
    };

    return (

        <div className="dashboard-chart">

            <h3>Ventas del semestre</h3>

            <Line data={data} />

        </div>

    );

}

export default DashboardChart;