/**
 * ChartX
 * Data Management Module
 *
 * Handles:
 * - Default chart data
 * - Data retrieval
 * - Data validation
 * - Data normalization
 */


/* =========================================================
   DEFAULT DATA
   ========================================================= */

const DEFAULT_DATA = [
    {
        label: "January",
        value: 120
    },
    {
        label: "February",
        value: 180
    },
    {
        label: "March",
        value: 150
    },
    {
        label: "April",
        value: 220
    },
    {
        label: "May",
        value: 190
    },
    {
        label: "June",
        value: 260
    }
];


/* =========================================================
   DATA STORAGE
   ========================================================= */

let chartData = [];


/* =========================================================
   INITIALIZE DATA
   ========================================================= */

function initializeData() {

    chartData = DEFAULT_DATA.map(item => ({
        label: item.label,
        value: item.value
    }));

}


/* =========================================================
   GET DATA
   ========================================================= */

function getChartData() {

    return chartData;

}


/* =========================================================
   SET DATA
   ========================================================= */

function setChartData(data) {

    if (!Array.isArray(data)) {

        return false;

    }

    chartData = data.map(item => ({
        label: String(item.label || ""),
        value: Number(item.value) || 0
    }));

    return true;

}


/* =========================================================
   ADD DATA ROW
   ========================================================= */

function addDataPoint(label = "", value = "") {

    chartData.push({
        label: String(label),
        value: value === "" ? "" : Number(value)
    });

}


/* =========================================================
   UPDATE DATA ROW
   ========================================================= */

function updateDataPoint(index, field, value) {

    if (
        index < 0 ||
        index >= chartData.length
    ) {
        return false;
    }


    if (field === "label") {

        chartData[index].label = value;

    }


    if (field === "value") {

        chartData[index].value =
            value === ""
                ? ""
                : Number(value);

    }

    return true;

}


/* =========================================================
   REMOVE DATA ROW
   ========================================================= */

function removeDataPoint(index) {

    if (
        index < 0 ||
        index >= chartData.length
    ) {
        return false;
    }

    chartData.splice(index, 1);

    return true;

}


/* =========================================================
   RESET DATA
   ========================================================= */

function resetData() {

    initializeData();

}


/* =========================================================
   VALIDATE DATA
   ========================================================= */

function validateChartData() {

    if (!chartData.length) {

        return {
            valid: false,
            message: "Please add at least one data point."
        };

    }


    const validRows = chartData.filter(item => {

        return (
            String(item.label).trim() !== "" &&
            item.value !== "" &&
            Number.isFinite(Number(item.value))
        );

    });


    if (!validRows.length) {

        return {
            valid: false,
            message: "Please enter valid labels and numeric values."
        };

    }


    return {
        valid: true,
        data: validRows
    };

}


/* =========================================================
   GET CHART LABELS
   ========================================================= */

function getChartLabels(data = chartData) {

    return data.map(item => item.label);

}


/* =========================================================
   GET CHART VALUES
   ========================================================= */

function getChartValues(data = chartData) {

    return data.map(item => Number(item.value));

}


/* =========================================================
   INITIALIZE
   ========================================================= */

initializeData();