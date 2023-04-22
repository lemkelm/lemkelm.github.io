const labels = [
  "Story",
  "Pacing",
  "Visual",
  "Audio",
  "Gameplay",
  "Accessiblity",
];

const data0 = 10;
const data1 = 9;
const data2 = 3;
const data3 = 5;
const data4 = 2;
const data5 = 3;
const datatotal = data0 + data1 + data2 + data3 + data4 + data5;

// document.getElementById("value0").value = data0;

function maxLengthCheck(object) {
  if (object.value.length > object.max.length)
    object.value = object.value.slice(0, object.max.length);
}

function isNumeric(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  var regex = /[0-9]/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

const data = {
  labels: labels,
  datasets: [
    {
      label: "# of Votes",
      data: [data0, data1, data2, data3, data4, data5],
      backgroundColor: "rgba(255, 99, 32, 1)",

      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 3,
      pointHitRadius: 50,

      backgroundColor: "#8E24AA44",

      pointBorderColor: "#000",
      pointBackgroundColor: "rgba(1,250,48,1)",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "black",
      //     pointStyle: 'crossRot',
      pointRadius: 4,
      pointHoverRadius: 10,

      datalabels: {
        color: "green",
      },
    },
  ],
};

const config = {
  type: "radar",
  data,
  plugins: [ChartDataLabels],
  options: {
    responsive: false,
    onHover: function (e) {
      const point = e.chart.getElementsAtEventForMode(
        e,
        "nearest",
        { intersect: true },
        false
      );
      if (point.length) e.native.target.style.cursor = "grab";
      else e.native.target.style.cursor = "default";
    },
    scales: {
      r: {
        max: 10,
        min: 0,

        weight: 0,
        border: {
          color: "green",
          width: 5,
        },

        angleLines: {
          color: "red",
        },
        grid: {
          color: ["blue", "cyan", "chartreuse"],
        },
        pointLabels: {
          font: {
            size: 20,
          },
        },
        ticks: {
          color: "red",
          display: false,
          count: 10,
          stepSize: 1,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        align: "start",
        text: "",
      },
      legend: {
        align: "start",
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {},
      dragData: {
        round: 0,
        showTooltip: false,
        onDragStart: function (e) {
          // console.log(e)
        },
        onDrag: function (e, datasetIndex, index, value) {
          e.target.style.cursor = "grabbing";
          // console.log(e, datasetIndex, index, value)
          if (value < 0) return false; // this only allows positive values
        },
        onDragEnd: function (e, datasetIndex, index, value) {
          e.target.style.cursor = "default";
          console.log(datasetIndex, index, value);
          myChart.data.datasets[0].data[index] = value;
          console.log(myChart.data.datasets[0].data[index]);
          // value1.addEventListener('change', updateChartValue);
          //  updateChartValue();
          const inputboxes = document.getElementById("value" + index);
          inputboxes.value = value;

          updateChartValue();
        },
        //		  magnet: {
        //	    to: Math.round // to: (value) => value + 5
        //    }
      },
      ChartDataLabels: {},
    },
  },
};

const myChart = new Chart(document.getElementById("myChart"), config);

const value0 = document.getElementById("value0");
const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");
const value3 = document.getElementById("value3");
const value4 = document.getElementById("value4");
const value5 = document.getElementById("value5");
const valuetotal = document.getElementById("valuetotal");

value0.value = data0;
value1.value = data1;
value2.value = data2;
value3.value = data3;
value4.value = data4;
value5.value = data5;
valuetotal.value = data0 + data1 + data2 + data3 + data4 + data5;

//value0.value + value1.value + value2.value + value3.value + value4.value + value5.value = datatotal;

value0.addEventListener("change", updateChartValue);
value1.addEventListener("change", updateChartValue);
value2.addEventListener("change", updateChartValue);
value3.addEventListener("change", updateChartValue);
value4.addEventListener("change", updateChartValue);
value5.addEventListener("change", updateChartValue);
//valuetotal.addEventListener('change', updateChartValue);

function updateChartValue() {
  // valuetotal.value = data0 + data1 + data2 + data3 + data4 + data5;
  var number0 = parseFloat(document.getElementById("value0").value);
  if (isNaN(number0)) number0 = 0;
  var number1 = parseFloat(document.getElementById("value1").value);
  if (isNaN(number1)) number1 = 0;
  var number2 = parseFloat(document.getElementById("value2").value);
  if (isNaN(number2)) number2 = 0;
  var number3 = parseFloat(document.getElementById("value3").value);
  if (isNaN(number3)) number3 = 0;
  var number4 = parseFloat(document.getElementById("value4").value);
  if (isNaN(number4)) number4 = 0;
  var number5 = parseFloat(document.getElementById("value5").value);
  if (isNaN(number5)) number5 = 0;
  var result = number0 + number1 + number2 + number3 + number4 + number5;
  document.getElementById("valuetotal").value = result;

  myChart.data.datasets[0].data[0] = value0.value;
  myChart.data.datasets[0].data[1] = value1.value;
  myChart.data.datasets[0].data[2] = value2.value;
  myChart.data.datasets[0].data[3] = value3.value;
  myChart.data.datasets[0].data[4] = value4.value;
  myChart.data.datasets[0].data[5] = value5.value;
  myChart.update();
}
