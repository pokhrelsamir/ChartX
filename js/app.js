/**
 * ChartX
 * Application Controller
 *
 * Handles:
 * - UI initialization
 * - Data table rendering
 * - User interactions
 * - Chart generation
 * - Row management
 * - Reset functionality
 * - Chart download
 */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const dataTableBody =
    document.getElementById("dataTableBody");

const addRowBtn =
    document.getElementById("addRowBtn");

const generateBtn =
    document.getElementById("generateBtn");

const downloadBtn =
    document.getElementById("downloadBtn");

const resetBtn =
    document.getElementById("resetBtn");

const chartTitle =
    document.getElementById("chartTitle");

const chartType =
    document.getElementById("chartType");

const currentYear =
    document.getElementById("currentYear");


/* =========================================================
   INITIALIZE APPLICATION
   ========================================================= */

function initializeApp() {

    renderDataTable();

    updateYear();

}


/* =========================================================
   RENDER DATA TABLE
   ========================================================= */

function renderDataTable() {

    if (!dataTableBody) {
        return;
    }


    dataTableBody.innerHTML = "";


    const data = getChartData();


    data.forEach((item, index) => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${index + 1}
            </td>

            <td>

                <input
                    type="text"
                    class="label-input"
                    data-index="${index}"
                    value="${escapeHTML(item.label)}"
                    placeholder="Label"
                >

            </td>

            <td>

                <input
                    type="number"
                    class="value-input"
                    data-index="${index}"
                    value="${item.value}"
                    placeholder="Value"
                    step="any"
                >

            </td>

            <td>

                <button
                    type="button"
                    class="remove-row"
                    data-index="${index}"
                    title="Remove row"
                >
                    ×
                </button>

            </td>

        `;


        dataTableBody.appendChild(row);

    });

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =========================================================
   HANDLE LABEL INPUT
   ========================================================= */

dataTableBody.addEventListener(
    "input",
    event => {

        if (
            event.target.classList.contains(
                "label-input"
            )
        ) {

            const index =
                Number(event.target.dataset.index);


            updateDataPoint(
                index,
                "label",
                event.target.value
            );

        }


        if (
            event.target.classList.contains(
                "value-input"
            )
        ) {

            const index =
                Number(event.target.dataset.index);


            updateDataPoint(
                index,
                "value",
                event.target.value
            );

        }

    }
);


/* =========================================================
   REMOVE DATA ROW
   ========================================================= */

dataTableBody.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(".remove-row");


        if (!button) {
            return;
        }


        const index =
            Number(button.dataset.index);


        removeDataPoint(index);


        renderDataTable();

    }
);


/* =========================================================
   ADD DATA ROW
   ========================================================= */

addRowBtn.addEventListener(
    "click",
    () => {

        addDataPoint(
            `Item ${getChartData().length + 1}`,
            0
        );


        renderDataTable();


        const inputs =
            dataTableBody.querySelectorAll(
                ".label-input"
            );


        const lastInput =
            inputs[inputs.length - 1];


        if (lastInput) {

            lastInput.focus();

        }

    }
);


/* =========================================================
   GENERATE CHART
   ========================================================= */

generateBtn.addEventListener(
    "click",
    generateChart
);


function generateChart() {

    const validation =
        validateChartData();


    if (!validation.valid) {

        alert(validation.message);

        return;

    }


    const title =
        chartTitle.value.trim() ||
        "ChartX Visualization";


    const type =
        chartType.value;


    createChart({

        type,

        title,

        data: validation.data

    });

}


/* =========================================================
   DOWNLOAD CHART
   ========================================================= */

downloadBtn.addEventListener(
    "click",
    () => {

        downloadChart();

    }
);


/* =========================================================
   RESET APPLICATION
   ========================================================= */

resetBtn.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Are you sure you want to reset ChartX?"
            );


        if (!confirmed) {
            return;
        }


        resetData();


        chartTitle.value =
            "Monthly Sales";


        chartType.value =
            "bar";


        renderDataTable();


        clearChart();

    }
);


/* =========================================================
   UPDATE FOOTER YEAR
   ========================================================= */

function updateYear() {

    if (!currentYear) {
        return;
    }


    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         * Ctrl + Enter
         * Generate chart
         */

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            generateChart();

        }


        /*
         * Escape
         * Clear chart
         */

        if (
            event.key === "Escape"
        ) {

            clearChart();

        }

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

initializeApp();