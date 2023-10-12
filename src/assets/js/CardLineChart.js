export const cardLineChart = {
    type: "line",
    data: {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        datasets: [
            {
                backgroundColor: "#4c51bf",
                borderColor: "#4c51bf",
                data: [65, 78, 66, 44, 56, 67, 75],
                fill: false,
            },
            {
                backgroundColor: "#b00e0e",
                borderColor: "#b00e0e",
                fill: false,
            },
            {
                backgroundColor: "#ffd600",
                borderColor: "#ffd600",
                fill: false,
            },
            {
                backgroundColor: "#00d6b4",
                borderColor: "#00d6b4",
                fill: false,
            },
            {
                backgroundColor: "#054d1e",
                borderColor: "#054d1e",
                fill: false,
            }
        ],
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        // title: {
        //     display: false,
        //     text: "Sales Charts",
        //     fontColor: "black",
        // },
        // legend: {
        //     labels: {
        //         fontColor: "black",
        //     },
        //     align: "end",
        //     position: "bottom",
        // },
        // tooltips: {
        //     mode: "index",
        //     intersect: false,
        // },
        // hover: {
        //     mode: "nearest",
        //     intersect: true,
        // },
        // scales: {
        //     xAxes: [
        //         {
        //             ticks: {
        //                 fontColor: "rgba(255,255,255,.7)",
        //             },
        //             display: true,
        //             scaleLabel: {
        //                 display: false,
        //                 labelString: "Month",
        //                 fontColor: "black",
        //             },
        //             gridLines: {
        //                 display: false,
        //                 borderDash: [2],
        //                 borderDashOffset: [2],
        //                 color: "rgba(33, 37, 41, 0.3)",
        //                 zeroLineColor: "rgba(0, 0, 0, 0)",
        //                 zeroLineBorderDash: [2],
        //                 zeroLineBorderDashOffset: [2],
        //             },
        //         },
        //     ],
        //     yAxes: [
        //         {
        //             ticks: {
        //                 fontColor: "rgba(255,255,255,.7)",
        //             },
        //             display: true,
        //             scaleLabel: {
        //                 display: false,
        //                 labelString: "Value",
        //                 fontColor: "black",
        //             },
        //             gridLines: {
        //                 borderDash: [3],
        //                 borderDashOffset: [3],
        //                 drawBorder: false,
        //                 color: "rgba(255, 255, 255, 0.15)",
        //                 zeroLineColor: "rgba(33, 37, 41, 0)",
        //                 zeroLineBorderDash: [2],
        //                 zeroLineBorderDashOffset: [2],
        //             },
        //         },
        //     ],
        // },
    },
}

export default cardLineChart;
