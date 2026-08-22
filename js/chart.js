/**
 * ChartX
 * Chart Rendering Engine
 *
 * Handles:
 * - Chart creation
 * - Chart updates
 * - Chart destruction
 * - Chart customization
 * - Chart downloads
 */


/* =========================================================
   CHART INSTANCE
   ========================================================= */

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

    return document.getElementById(
        "chartCanvas"
    );

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

    data = [],

    color = "#4f46e5",

    showLegend = true,

    showGrid = true,

    beginAtZero = true

} = {}) {


    /* =====================================================
       CANVAS
       ===================================================== */

    const canvas =
        getChartCanvas();


    if (!canvas) {

        console.error(
            "ChartX: Canvas element not found."
        );

        return false;

    }


    /* =====================================================
       CHART.JS CHECK
       ===================================================== */

    if (
        typeof Chart === "undefined"
    ) {

        console.error(
            "ChartX: Chart.js failed to load."
        );

        alert(
            "Chart.js could not be loaded. Check your internet connection and refresh the page."
        );

        return false;

    }


    /* =====================================================
       DATA VALIDATION
       ===================================================== */

    if (
        !Array.isArray(data) ||
        data.length === 0
    ) {

        console.error(
            "ChartX: No valid chart data."
        );

        alert(
            "Please provide valid chart data."
        );

        return false;

    }


    /* =====================================================
       CLEAN DATA
       ===================================================== */

    const validData =
        data.filter(item => {

            return (

                item &&

                String(
                    item.label ?? ""
                ).trim() !== "" &&

                Number.isFinite(
                    Number(item.value)
                )

            );

        });


    if (!validData.length) {

        alert(
            "Please provide valid labels and numeric values."
        );

        return false;

    }


    /* =====================================================
       DESTROY PREVIOUS CHART
       ===================================================== */

    destroyChart();


    /* =====================================================
       LABELS & VALUES
       ===================================================== */

    const labels =
        validData.map(item =>
            String(item.label)
        );


    const values =
        validData.map(item =>
            Number(item.value)
        );


    /* =====================================================
       CHART TYPE
       ===================================================== */

    const circular =
        type === "pie" ||
        type === "doughnut";


    /* =====================================================
       DATASET
       ===================================================== */

    const dataset = {

        label: title,

        data: values,

        backgroundColor:
            circular
                ? CHART_COLORS.slice(
                    0,
                    values.length
                )
                : color,

        borderColor:
            circular
                ? "#ffffff"
                : color,

        borderWidth:
            circular
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
                : undefined,

        pointBackgroundColor:
            type === "line"
                ? color
                : undefined,

        pointBorderColor:
            type === "line"
                ? "#ffffff"
                : undefined,

        pointBorderWidth:
            type === "line"
                ? 2
                : undefined

    };


    /* =====================================================
       SCATTER CHART
       ===================================================== */

    if (type === "scatter") {

        dataset.data =
            validData.map(
                (item, index) => ({

                    x: index + 1,

                    y: Number(item.value)

                })
            );


        dataset.backgroundColor =
            color;


        dataset.borderColor =
            color;


        dataset.borderWidth = 2;


        dataset.pointRadius = 5;


        dataset.pointHoverRadius = 7;

    }


    /* =====================================================
       CHART OPTIONS
       ===================================================== */

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        animation: {

            duration: 700

        },


        interaction: {

            intersect: false,

            mode:
                type === "scatter"
                    ? "nearest"
                    : "index"

        },


        plugins: {

            legend: {

                display: showLegend,

                position: "bottom",

                labels: {

                    usePointStyle: true,

                    padding: 18,

                    color: "#475467",

                    font: {

                        size: 12

                    }

                }

            },


            title: {

                display:
                    title.trim() !== "",

                text: title,

                color: "#172033",

                font: {

                    size: 17,

                    weight: "700"

                },

                padding: {

                    bottom: 20

                }

            },


            tooltip: {

                backgroundColor:
                    "rgba(23, 32, 51, 0.95)",

                titleFont: {

                    size: 12,

                    weight: "700"

                },

                bodyFont: {

                    size: 12

                },

                padding: 10,

                cornerRadius: 8,

                displayColors: true

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

                    display: showGrid,

                    color: "#eef0f4"

                },

                ticks: {

                    color: "#667085",

                    font: {

                        size: 11

                    }

                }

            },


            y: {

                beginAtZero: beginAtZero,

                grid: {

                    display: showGrid,

                    color: "#eef0f4"

                },

                ticks: {

                    color: "#667085",

                    font: {

                        size: 11

                    }

                }

            }

        };

    }


    /* =====================================================
       CREATE CHART
       ===================================================== */

    try {

        const context =
            canvas.getContext("2d");


        chartInstance =
            new Chart(
                context,
                {

                    type: type,

                    data: {

                        labels: labels,

                        datasets: [
                            dataset
                        ]

                    },

                    options: options

                }
            );


        /* =================================================
           SHOW CANVAS
           ================================================= */

        canvas.style.display =
            "block";


        const emptyState =
            document.getElementById(
                "chartEmpty"
            );


        if (emptyState) {

            emptyState.style.display =
                "none";

        }


        console.log(
            "ChartX: Chart generated successfully."
        );


        return true;

    } catch (error) {

        console.error(
            "ChartX: Chart generation failed:",
            error
        );


        alert(
            "Unable to generate the chart. Please check the browser console for details."
        );


        return false;

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

        return false;

    }


    try {

        const link =
            document.createElement("a");


        link.download =
            "chartx-chart.png";


        link.href =
            chartInstance.toBase64Image(
                "image/png",
                1
            );


        link.click();


        return true;

    } catch (error) {

        console.error(
            "ChartX: Chart download failed:",
            error
        );


        alert(
            "Unable to download the chart."
        );


        return false;

    }

}


/* =========================================================
   CLEAR CHART
   ========================================================= */

function clearChart() {

    destroyChart();


    const canvas =
        getChartCanvas();


    if (canvas) {

        canvas.style.display =
            "none";

    }


    const emptyState =
        document.getElementById(
            "chartEmpty"
        );


    if (emptyState) {

        emptyState.style.display =
            "flex";

    }

}


/* =========================================================
   UPDATE CHART
   ========================================================= */

function updateChart(settings = {}) {

    if (!chartInstance) {

        return false;

    }


    const {

        color = "#4f46e5",

        showLegend = true,

        showGrid = true,

        beginAtZero = true

    } = settings;


    const currentType =
        chartInstance.config.type;


    const circular =
        currentType === "pie" ||
        currentType === "doughnut";


    /* =====================================================
       UPDATE LEGEND
       ===================================================== */

    chartInstance.options.plugins.legend.display =
        showLegend;


    /* =====================================================
       UPDATE DATASET COLORS
       ===================================================== */

    const dataset =
        chartInstance.data.datasets[0];


    if (circular) {

        dataset.backgroundColor =
            CHART_COLORS.slice(
                0,
                chartInstance.data.labels.length
            );

        dataset.borderColor =
            "#ffffff";

    } else {

        dataset.backgroundColor =
            color;

        dataset.borderColor =
            color;

    }


    /* =====================================================
       UPDATE AXES
       ===================================================== */

    if (!circular && chartInstance.options.scales) {

        chartInstance.options.scales.x.grid.display =
            showGrid;


        chartInstance.options.scales.y.grid.display =
            showGrid;


        chartInstance.options.scales.y.beginAtZero =
            beginAtZero;

    }


    chartInstance.update();


    return true;

}