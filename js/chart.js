/**
 * ChartX
 * Chart Rendering Engine
 *
 * Handles:
 * - Chart creation
 * - Chart updates
 * - Chart destruction
 * - Chart downloads
 */

let chartInstance = null;


/* =========================================================
   CHART COLORS
   ========================================================= */

const CHART_COLORS = [
    "#4f46e5",
    "#06b6d4",
    "#16a34a",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6"
];


/* =========================================================
   GET CANVAS
   ========================================================= */

function getChartCanvas() {
    return document.getElementById("chartCanvas");
}


/* =========================================================
   DESTROY CHART
   ========================================================= */

function destroyChart() {

    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }

}


/* =========================================================
   CREATE CHART
   ========================================================= */

function createChart({
    type = "bar",
    title = "Chart",
    data = []
}) {

    const canvas = getChartCanvas();

    if (!canvas) {
        console.error("ChartX: Canvas element not found.");
        return;
    }


    if (typeof Chart === "undefined") {

        console.error(
            "ChartX: Chart.js failed to load."
        );

        alert(
            "Chart.js could not be loaded. Check your internet connection and refresh the page."
        );

        return;
    }


    if (!Array.isArray(data) || data.length === 0) {

        console.error(
            "ChartX: No valid chart data."
        );

        return;
    }


    destroyChart();


    const labels = data.map(item =>
        String(item.label)
    );


    const values = data.map(item =>
        Number(item.value)
    );


    /* =====================================================
       CHART DATA
       ===================================================== */

    const dataset = {

        label: title,

        data: values,

        backgroundColor:
            type === "pie" || type === "doughnut"
                ? CHART_COLORS.slice(0, values.length)
                : "rgba(79, 70, 229, 0.85)",

        borderColor:
            type === "pie" || type === "doughnut"
                ? "#ffffff"
                : "#4f46e5",

        borderWidth:
            type === "pie" || type === "doughnut"
                ? 2
                : 1,

        borderRadius:
            type === "bar"
                ? 6
                : 0,

        tension:
            type === "line"
                ? 0.35
                : 0,

        pointRadius:
            type === "line"
                ? 4
                : undefined,

        pointHoverRadius:
            type === "line"
                ? 6
                : undefined
    };


    /* =====================================================
       SCATTER
       ===================================================== */

    if (type === "scatter") {

        dataset.data = data.map(
            (item, index) => ({
                x: index + 1,
                y: Number(item.value)
            })
        );

        dataset.backgroundColor =
            "#4f46e5";

        dataset.borderColor =
            "#4f46e5";

        dataset.borderWidth = 2;

    }


    /* =====================================================
       OPTIONS
       ===================================================== */

    const circular =
        type === "pie" ||
        type === "doughnut";


    const options = {

        responsive: true,

        maintainAspectRatio: false,

        animation: {
            duration: 700
        },

        plugins: {

            legend: {

                display: circular,

                position: "bottom",

                labels: {

                    usePointStyle: true,

                    padding: 18

                }

            },

            title: {

                display: true,

                text: title,

                font: {
                    size: 17,
                    weight: "700"
                },

                padding: {
                    bottom: 20
                }

            }

        }

    };


    /* =====================================================
       CARTESIAN AXES
       ===================================================== */

    if (!circular) {

        options.scales = {

            x: {

                grid: {
                    color: "#eef0f4"
                },

                ticks: {
                    color: "#667085"
                }

            },

            y: {

                beginAtZero: true,

                grid: {
                    color: "#eef0f4"
                },

                ticks: {
                    color: "#667085"
                }

            }

        };

    }


    /* =====================================================
       CREATE CHART
       ===================================================== */

    try {

        chartInstance = new Chart(
            canvas.getContext("2d"),
            {
                type: type,
                data: {
                    labels: labels,
                    datasets: [dataset]
                },
                options: options
            }
        );


        canvas.style.display = "block";


        const emptyState =
            document.getElementById("chartEmpty");


        if (emptyState) {
            emptyState.style.display = "none";
        }


        console.log(
            "ChartX: Chart generated successfully."
        );

    } catch (error) {

        console.error(
            "ChartX: Chart generation failed:",
            error
        );

        alert(
            "Unable to generate the chart. Open the browser console for details."
        );

    }

}


/* =========================================================
   DOWNLOAD CHART
   ========================================================= */

function downloadChart() {

    if (!chartInstance) {

        alert(
            "Please generate a chart before downloading."
        );

        return;
    }


    const link =
        document.createElement("a");


    link.download =
        "chartx-chart.png";


    link.href =
        chartInstance.toBase64Image();


    link.click();

}


/* =========================================================
   CLEAR CHART
   ========================================================= */

function clearChart() {

    destroyChart();


    const canvas =
        getChartCanvas();


    if (canvas) {
        canvas.style.display = "none";
    }


    const emptyState =
        document.getElementById("chartEmpty");


    if (emptyState) {
        emptyState.style.display = "flex";
    }

}