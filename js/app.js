/**
 * ChartX
 * Application Controller
 *
 * Handles:
 * - UI initialization
 * - Data table rendering
 * - User interactions
 * - Chart generation
 * - Chart settings
 * - Row management
 * - CSV import
 * - Reset functionality
 * - Chart download
 * - Keyboard shortcuts
 */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const csvFileInput =
    document.getElementById("csvFileInput");

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
   OPTIONAL CHART SETTINGS
   ========================================================= */

const chartColor =
    document.getElementById("chartColor");

const showLegend =
    document.getElementById("showLegend");

const showGrid =
    document.getElementById("showGrid");

const beginAtZero =
    document.getElementById("beginAtZero");


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


    const data =
        getChartData();


    data.forEach(
        (item, index) => {

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
                        value="${item.value === "" ? "" : item.value}"
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
                        aria-label="Remove row"
                    >
                        ×
                    </button>

                </td>

            `;


            dataTableBody.appendChild(row);

        }
    );

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value ?? "")

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   HANDLE DATA TABLE INPUT
   ========================================================= */

if (dataTableBody) {

    dataTableBody.addEventListener(
        "input",
        event => {

            const target =
                event.target;


            if (
                target.classList.contains(
                    "label-input"
                )
            ) {

                const index =
                    Number(
                        target.dataset.index
                    );


                updateDataPoint(
                    index,
                    "label",
                    target.value
                );

            }


            if (
                target.classList.contains(
                    "value-input"
                )
            ) {

                const index =
                    Number(
                        target.dataset.index
                    );


                updateDataPoint(
                    index,
                    "value",
                    target.value
                );

            }

        }
    );

}


/* =========================================================
   REMOVE DATA ROW
   ========================================================= */

if (dataTableBody) {

    dataTableBody.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".remove-row"
                );


            if (!button) {

                return;

            }


            const index =
                Number(
                    button.dataset.index
                );


            if (
                removeDataPoint(index)
            ) {

                renderDataTable();

            }

        }
    );

}


/* =========================================================
   ADD DATA ROW
   ========================================================= */

if (addRowBtn) {

    addRowBtn.addEventListener(
        "click",
        () => {

            const nextNumber =
                getDataCount() + 1;


            addDataPoint(
                `Item ${nextNumber}`,
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

                lastInput.select();

            }

        }
    );

}


/* =========================================================
   GET CHART SETTINGS
   ========================================================= */

function getChartSettings() {

    return {

        color:
            chartColor?.value ||
            "#4f46e5",

        showLegend:
            showLegend
                ? showLegend.value === "true" ||
                  showLegend.checked === true
                : true,

        showGrid:
            showGrid
                ? showGrid.value === "true" ||
                  showGrid.checked === true
                : true,

        beginAtZero:
            beginAtZero
                ? beginAtZero.value === "true" ||
                  beginAtZero.checked === true
                : true

    };

}


/* =========================================================
   GENERATE CHART
   ========================================================= */

if (generateBtn) {

    generateBtn.addEventListener(
        "click",
        generateChart
    );

}


function generateChart() {

    /* -----------------------------------------------------
       Validate data
       ----------------------------------------------------- */

    const validation =
        validateChartData();


    if (!validation.valid) {

        alert(
            validation.message
        );

        return false;

    }


    /* -----------------------------------------------------
       Get title
       ----------------------------------------------------- */

    const title =
        chartTitle?.value.trim() ||
        "ChartX Visualization";


    /* -----------------------------------------------------
       Get chart type
       ----------------------------------------------------- */

    const type =
        chartType?.value ||
        "bar";


    /* -----------------------------------------------------
       Get settings
       ----------------------------------------------------- */

    const settings =
        getChartSettings();


    /* -----------------------------------------------------
       Create chart
       ----------------------------------------------------- */

    const success =
        createChart({

            type,

            title,

            data: validation.data,

            color:
                settings.color,

            showLegend:
                settings.showLegend,

            showGrid:
                settings.showGrid,

            beginAtZero:
                settings.beginAtZero

        });


    return success;

}


/* =========================================================
   DOWNLOAD CHART
   ========================================================= */

if (downloadBtn) {

    downloadBtn.addEventListener(
        "click",
        () => {

            downloadChart();

        }
    );

}


/* =========================================================
   RESET APPLICATION
   ========================================================= */

if (resetBtn) {

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


            if (chartTitle) {

                chartTitle.value =
                    "Monthly Sales";

            }


            if (chartType) {

                chartType.value =
                    "bar";

            }


            resetChartSettings();


            renderDataTable();


            clearChart();

        }
    );

}


/* =========================================================
   RESET CHART SETTINGS
   ========================================================= */

function resetChartSettings() {

    if (chartColor) {

        chartColor.value =
            "#4f46e5";

    }


    if (showLegend) {

        if (
            showLegend.type === "checkbox"
        ) {

            showLegend.checked =
                true;

        } else {

            showLegend.value =
                "true";

        }

    }


    if (showGrid) {

        if (
            showGrid.type === "checkbox"
        ) {

            showGrid.checked =
                true;

        } else {

            showGrid.value =
                "true";

        }

    }


    if (beginAtZero) {

        if (
            beginAtZero.type === "checkbox"
        ) {

            beginAtZero.checked =
                true;

        } else {

            beginAtZero.value =
                "true";

        }

    }

}


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
   CHART SETTING EVENTS
   ========================================================= */

function handleSettingChange() {

    /*
     * If a chart already exists,
     * update it immediately.
     */

    if (
        typeof chartInstance !== "undefined" &&
        chartInstance
    ) {

        updateChart(
            getChartSettings()
        );

    }

}


if (chartColor) {

    chartColor.addEventListener(
        "input",
        handleSettingChange
    );

}


if (showLegend) {

    showLegend.addEventListener(
        "change",
        handleSettingChange
    );

}


if (showGrid) {

    showGrid.addEventListener(
        "change",
        handleSettingChange
    );

}


if (beginAtZero) {

    beginAtZero.addEventListener(
        "change",
        handleSettingChange
    );

}


/* =========================================================
   CSV IMPORT
   ========================================================= */

if (csvFileInput) {

    csvFileInput.addEventListener(
        "change",
        handleCSVImport
    );

}


function handleCSVImport(event) {

    const file =
        event.target.files[0];


    if (!file) {

        return;

    }


    const fileName =
        file.name.toLowerCase();


    if (
        !fileName.endsWith(".csv")
    ) {

        alert(
            "Please select a valid CSV file."
        );


        event.target.value =
            "";


        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function () {

            try {

                const csv =
                    String(
                        reader.result || ""
                    );


                const importedData =
                    parseCSV(csv);


                if (
                    importedData.length === 0
                ) {

                    alert(
                        "No valid data was found in the CSV file."
                    );

                    return;

                }


                setChartData(
                    importedData
                );


                renderDataTable();


                /*
                 * Automatically generate
                 * chart after successful import.
                 */

                generateChart();

            }

            catch (error) {

                console.error(
                    "ChartX: CSV import failed:",
                    error
                );


                alert(
                    "Unable to import the CSV file."
                );

            }

        };


    reader.onerror =
        function () {

            alert(
                "Unable to read the CSV file."
            );

        };


    reader.readAsText(file);


    /*
     * Allow the same file to be selected again.
     */

    event.target.value =
        "";

}


/* =========================================================
   CSV PARSER
   ========================================================= */

function parseCSV(csv) {

    if (
        typeof csv !== "string" ||
        !csv.trim()
    ) {

        return [];

    }


    const lines =
        csv
            .trim()
            .split(/\r?\n/);


    if (lines.length < 2) {

        return [];

    }


    const data = [];


    /*
     * ChartX expects:
     *
     * Label,Value
     * January,120
     * February,180
     *
     * The first row is treated as
     * the header.
     */

    for (
        let i = 1;
        i < lines.length;
        i++
    ) {

        const line =
            lines[i].trim();


        if (!line) {

            continue;

        }


        const columns =
            parseCSVLine(line);


        if (
            columns.length < 2
        ) {

            continue;

        }


        const label =
            columns[0]
                .trim()
                .replace(/^"|"$/g, "");


        const valueText =
            columns[1]
                .trim()
                .replace(/^"|"$/g, "");


        const value =
            Number(valueText);


        if (
            label !== "" &&
            Number.isFinite(value)
        ) {

            data.push({

                label,

                value

            });

        }

    }


    return data;

}


/* =========================================================
   CSV LINE PARSER
   ========================================================= */

function parseCSVLine(line) {

    const result = [];

    let current = "";

    let insideQuotes =
        false;


    for (
        let i = 0;
        i < line.length;
        i++
    ) {

        const character =
            line[i];


        /*
         * Handle escaped quotes:
         *
         * ""
         */

        if (
            character === '"' &&
            insideQuotes &&
            line[i + 1] === '"'
        ) {

            current += '"';

            i++;

            continue;

        }


        if (
            character === '"'
        ) {

            insideQuotes =
                !insideQuotes;

            continue;

        }


        if (
            character === "," &&
            !insideQuotes
        ) {

            result.push(
                current
            );

            current = "";

            continue;

        }


        current += character;

    }


    result.push(
        current
    );


    return result;

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
   CHART TYPE CHANGE
   ========================================================= */

if (chartType) {

    chartType.addEventListener(
        "change",
        () => {

            /*
             * Do not automatically generate
             * a chart when changing type.
             *
             * User can click Generate Chart.
             */

        }
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

initializeApp();