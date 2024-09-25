const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 1, maxDegree: 45, value: "1000" },
  { minDegree: 46, maxDegree: 90, value: "100" },
  { minDegree: 91, maxDegree: 135, value: "200" },
  { minDegree: 136, maxDegree: 180, value: "500" },
  { minDegree: 181, maxDegree: 225, value: "100" },
  { minDegree: 226, maxDegree: 270, value: "Retry" },
  { minDegree: 271, maxDegree: 315, value: "200" },
  { minDegree: 316, maxDegree: 360, value: "100" },
];
//Size of each piece
const data = [10, 10, 10, 10, 10, 10, 10, 10];
//background color for each piece
var pieColors = [
  "#026f8a",
  "#00af97",
  "#026f8a",
  "#009fc7",
  "#00af97",
  "#026f8a",
  "#00af97",
  "#009fc7",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: ["100", "1000", "100", "200", "Retry", "100", "500", "200"],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 20 },
      },
    },
  },
});

//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<b>${i.value}</b>`;

      if (i.value === "Retry") {
        spinBtn.disabled = false;
        playSound("coinSound");
        break;
      } else {
        gamePoints[2] = parseInt(i.value);
        showPoints(2);
        setTimeout(() => {
          playSound("winSound");
          document.getElementById("finalScore").style.display = "block";
          document.getElementById("total-score-final").innerHTML =
            gamePoints[0] + gamePoints[1] + gamePoints[2];
          document.getElementById("spin-container").classList.add("hide");
        }, 2000);
      }
    }
  }
};

//Spinner count
let swCount = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
if (spinBtn)
  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    playSound("spinSound");
    //Empty final value
    finalValue.innerHTML = `<p>Good Luck!</p>`;
    //Generate random degrees to stop at
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    //Interval for rotation animation
    let rotationInterval = window.setInterval(() => {
      //Set rotation for piechart
      /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
      myChart.options.rotation = myChart.options.rotation + resultValue;
      //Update chart with new value;
      myChart.update();
      //If rotation>360 reset it back to 0
      if (myChart.options.rotation >= 360) {
        gwCount += 1;
        resultValue -= 5;
        myChart.options.rotation = 0;
      } else if (gwCount > 15 && myChart.options.rotation == randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        gwCount = 0;
        resultValue = 101;
      }
    }, 10);
  });
