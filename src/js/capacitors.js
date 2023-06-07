//Canvas
const ctx1 = document.getElementById('electricChart');
const ctx2 = document.getElementById('potentialChart');
const ctx3 = document.getElementById('displacementChart');

//Data arrays
const leftElectrode_E = [];
const insulator_E = [];
const rightElectrode_E = [];

const leftElectrode_V = [];
const insulator_V = [];
const rightElectrode_V = [];

const leftElectrode_D = [];
const insulator_D = [];
const rightElectrode_D = [];

//Constants
const nData = 200;
const vac_permittivity = 8.854*10**-2; //F*Angst/m^2
const electrodeLength = 20; //Angst

//HTML elements and inputs
let V = document.getElementById("V").value;
let l = document.getElementById("l").value;
let chi = document.getElementById("chi").value;
let Ps = document.getElementById("Ps").value;

let VText = document.getElementById("VText");
let lText = document.getElementById("lText");
let chiText = document.getElementById("chiText");
let PsText = document.getElementById("PsText");
let PText = document.getElementById("PText");

//generate data
generateData(Number(V), Number(l), Number(chi), Number(Ps), nData);

//make charts
electricChart = new Chart(ctx1, config("Electric field (V/\u212B)", -0.5, 0.5));
addData(electricChart,leftElectrode_E);
addData(electricChart,insulator_E);
addData(electricChart,rightElectrode_E);

potentialChart = new Chart(ctx2, config("Electric potential (V)", -10, 10))
addData(potentialChart,leftElectrode_V);
addData(potentialChart,insulator_V);
addData(potentialChart,rightElectrode_V);

displacementChart = new Chart(ctx3, config("Displacement field (C/m\u00B2)", -0.5, 0.5))
addData(displacementChart,leftElectrode_D);
addData(displacementChart,insulator_D);
addData(displacementChart,rightElectrode_D);

electricChart.update();
potentialChart.update();
displacementChart.update();

//generate config
function config(yLabel = "", yMin = -1, yMax = 1) {
  let config = {
    type: 'line',
    data: {},
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: "x (\u212B)",
            font: {
              size: 14
            }
          },
          grid: {
            display: false
          },
          //suggestedMin: -100,
          //suggestedMax: 100,
        },
        y: {
          suggestedMin: yMin,
          suggestedMax: yMax,
          title: {
            display: true,
            text: yLabel,
            font: {
              size: 14
            }
          },
          grid: {
            display: false
          }
        }
      },plugins: {
        legend: {
          display: false
        },
        annotation: {
          annotations: {
            box1: {
              type: 'box',
              borderWidth: 0,
              xMin: leftElectrode_E[0].x,
              xMax: insulator_E[0].x,
              yMin: -15,
              yMax: 15,
              backgroundColor: 'rgba(120, 120, 120, 0.25)'
            },
            box2: {
              type: 'box',
              borderWidth: 0,
              xMin: insulator_E[0].x,
              xMax: rightElectrode_E[0].x,
              yMin: -15,
              yMax: 15,
              backgroundColor: 'rgba(0, 0, 0, 0.25)'
            },
            box3: {
              type: 'box',
              borderWidth: 0,
              xMin: rightElectrode_E[0].x,
              xMax: rightElectrode_E[rightElectrode_E.length - 1].x,
              yMin: -15,
              yMax: 15,
              backgroundColor: 'rgba(120, 120, 120, 0.25)'
            },
          }
        }
      }
    }
  };
  return config;
};

//add data to chart
function addData(chart, dataToPush) {
  chart.data.datasets.push({
    pointRadius: 0,
    borderWidth: 2,
    borderColor: "rgba(255,0,0,1)",
    data: dataToPush
  })
};

function generateData(V, l, chi, Ps, num = 100) {
  //initialize arrays
  leftElectrode_E.length = 0;
  insulator_E.length = 0;
  rightElectrode_E.length = 0;
  leftElectrode_V.length = 0;
  insulator_V.length = 0;
  rightElectrode_V.length = 0;
  leftElectrode_D.length = 0;
  insulator_D.length = 0;
  rightElectrode_D.length = 0;

  let x1 = -l/2;
  let x2 = l/2;
  let i1 = x1 - electrodeLength;
  let i2 = x2 + electrodeLength;
  let E = V/l;
  let P = chi*E + Ps;

  for (let x = i1; x <= x1; x += (i2 - i1)/num) {
    leftElectrode_E.push({x:x, y: 0});
    leftElectrode_V.push({x:x, y: -V/2});
    leftElectrode_D.push({x:x, y: 0});
  }

  for (let x = x1; x <= x2; x += (i2 - i1)/num) {
    insulator_E.push({x:x, y: E});
    insulator_V.push({x:x, y: eval(E*x)});
    insulator_D.push({x:x, y: vac_permittivity*(1+chi)*E + Ps});
  }

  for (let x = x2; x <= i2; x += (i2 - i1)/num) {
    rightElectrode_E.push({x:x, y: 0});
    rightElectrode_V.push({x:x, y: V/2});
    rightElectrode_D.push({x:x, y: 0});
  }

  return P;
};

function updateBoxes(chart, P=0) {
  chart.options.plugins.annotation.annotations.box1.xMin = chart.data.datasets[1].data[0].x - electrodeLength;
  chart.options.plugins.annotation.annotations.box1.xMax = chart.data.datasets[1].data[0].x;
  chart.options.plugins.annotation.annotations.box2.xMin = chart.data.datasets[1].data[0].x;
  chart.options.plugins.annotation.annotations.box2.xMax = chart.data.datasets[2].data[0].x;
  chart.options.plugins.annotation.annotations.box3.xMin = chart.data.datasets[2].data[0].x;
  chart.options.plugins.annotation.annotations.box3.xMax = chart.data.datasets[2].data[0].x + electrodeLength;

  if (P>0) {
    chart.options.plugins.annotation.annotations.box2.backgroundColor = 'rgba(' + Math.floor(P*2*255) + ', 0, 0, 0.25)'
  } else {
    chart.options.plugins.annotation.annotations.box2.backgroundColor = 'rgba(0, 0, ' + Math.floor(-P*2*255) + ', 0.25)'
  }
  
};

function result(){
  let V = document.getElementById("V").value;
  let l = document.getElementById("l").value;
  let chi = document.getElementById("chi").value;
  let Ps = document.getElementById("Ps").value;
  let P = generateData(Number(V), Number(l), Number(chi), Number(Ps), nData)

  VText.innerHTML = "Voltage: " + V + " V"; 
  lText.innerHTML = "Length: " + l + " \u212B";
  chiText.innerHTML = "Electric susceptibility: " + Number(chi).toFixed(1); 
  PsText.innerHTML = "Spontaneous Polarization: " + Number(Ps).toFixed(2) +" C/m<sup>2</sup>";
  PText.innerHTML = "P: " + P.toFixed(2) +" C/m<sup>2</sup>";

  updateBoxes(electricChart, P);
  updateBoxes(potentialChart, P);
  updateBoxes(displacementChart, P);

  electricChart.update('none');
  potentialChart.update('none');
  displacementChart.update('none');

};