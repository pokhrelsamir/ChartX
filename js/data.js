/**
 * ChartX
 * Data Management Module
 *
 * Handles:
 * - Default chart data
 * - Data retrieval
 * - Data validation
 * - Data normalization
 * - Data point management
 * - CSV-friendly data processing
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


    chartData = data
        .map(item => {

            if (!item) {

                return null;

            }


            const label =
                item.label !== undefined
                    ? String(item.label).trim()
                    : "";


            const rawValue =
                item.value !== undefined
                    ? item.value
                    : "";


            let value = "";


            if (
                rawValue !== "" &&
                rawValue !== null &&
                rawValue !== undefined
            ) {

                const numericValue =
                    Number(rawValue);


                if (
                    Number.isFinite(
                        numericValue
                    )
                ) {

                    value = numericValue;

                }

            }


            return {

                label,

                value

            };

        })
        .filter(Boolean);


    return true;

}


/* =========================================================
   ADD DATA ROW
   ========================================================= */

function addDataPoint(
    label = "",
    value = ""
) {

    chartData.push({

        label: String(label),

        value:
            value === ""
                ? ""
                : Number(value)

    });

}


/* =========================================================
   UPDATE DATA ROW
   ========================================================= */

function updateDataPoint(
    index,
    field,
    value
) {

    if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= chartData.length
    ) {

        return false;

    }


    if (field === "label") {

        chartData[index].label =
            String(value);

        return true;

    }


    if (field === "value") {

        chartData[index].value =
            value === ""
                ? ""
                : Number(value);

        return true;

    }


    return false;

}


/* =========================================================
   REMOVE DATA ROW
   ========================================================= */

function removeDataPoint(index) {

    if (
        !Number.isInteger(index) ||
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

    if (!Array.isArray(chartData)) {

        return {

            valid: false,

            message:
                "Unable to read chart data."

        };

    }


    if (chartData.length === 0) {

        return {

            valid: false,

            message:
                "Please add at least one data point."

        };

    }


    const validRows =
        chartData.filter(item => {

            if (!item) {

                return false;

            }


            const label =
                String(
                    item.label ?? ""
                ).trim();


            const value =
                item.value;


            return (

                label !== "" &&

                value !== "" &&

                value !== null &&

                value !== undefined &&

                Number.isFinite(
                    Number(value)
                )

            );

        });


    if (validRows.length === 0) {

        return {

            valid: false,

            message:
                "Please enter valid labels and numeric values."

        };

    }


    return {

        valid: true,

        data: validRows.map(item => ({

            label:
                String(item.label).trim(),

            value:
                Number(item.value)

        }))

    };

}


/* =========================================================
   GET CHART LABELS
   ========================================================= */

function getChartLabels(
    data = chartData
) {

    if (!Array.isArray(data)) {

        return [];

    }


    return data.map(item =>

        String(
            item?.label ?? ""
        ).trim()

    );

}


/* =========================================================
   GET CHART VALUES
   ========================================================= */

function getChartValues(
    data = chartData
) {

    if (!Array.isArray(data)) {

        return [];

    }


    return data.map(item => {

        const value =
            Number(item?.value);


        return Number.isFinite(value)
            ? value
            : 0;

    });

}


/* =========================================================
   GET VALID DATA
   ========================================================= */

function getValidChartData() {

    const result =
        validateChartData();


    return result.valid
        ? result.data
        : [];

}


/* =========================================================
   DATA COUNT
   ========================================================= */

function getDataCount() {

    return chartData.length;

}


/* =========================================================
   INITIALIZE
   ========================================================= */

initializeData();