const ctx = document.getElementById('myChart');

const leftElectrode = [];
const insulator = [];
const rightElectrode = [];
var V = document.getElementById("V").value;
var l = document.getElementById("l").value;
generateData(Number(V), Number(l), 1000);


var VText = document.getElementById("VText");
var lText = document.getElementById("lText");

myChart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [
      {
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: leftElectrode
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: insulator
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: rightElectrode
      }
    ]
  },
  options: {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        //suggestedMin: 0,
        //suggestedMax: 100
      },
      y: {
        suggestedMin: -1,
        suggestedMax: 1
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
});


/*
myChart.options.scales['x'].display = false; //global visibility
myChart.options.scales['y'].display = false; 
myChart.options.scales['x'].grid.display = false; //grid visibility
myChart.options.scales['y'].grid.display = false; 
myChart.options.scales['y'].ticks.display = false; //ticks visibility
myChart.options.scales['x'].ticks.display = false;
*/
myChart.update('none');

function generateData(V, l, num = 100) {
  leftElectrode.length = 0;
  insulator.length = 0;
  rightElectrode.length = 0;
  x1 = -l/2;
  x2 = l/2;
  i1 = x1 - 10;
  i2 = x2 + 10;

  for (let x = i1; x <= x1; x += (i2 - i1)/num) {
    leftElectrode.push({x:x, y: 0});
  }

  for (let x = x1; x <= x2; x += (i2 - i1)/num) {
    insulator.push({x:x, y: V/l});
  }

  for (let x = x2; x <= i2; x += (i2 - i1)/num) {
    rightElectrode.push({x:x, y: 0});
  }
}

function result(){
  var V = document.getElementById("V").value;
  var l = document.getElementById("l").value;
  if (!isNaN(V)) {
    VText.innerHTML = "Voltage: " + V; 
    lText.innerHTML = "Length: " + l;
    generateData(Number(V), Number(l), 1000);
    myChart.data.datasets[0].data = leftElectrode;
    myChart.update('none');
  }
  else
    console.log("Please enter the integer value..");
}