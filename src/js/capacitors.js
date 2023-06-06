const ctx1 = document.getElementById('electricChart');
const ctx2 = document.getElementById('potentialChart');
const ctx3 = document.getElementById('displacementChart');

const leftElectrode_E = [];
const insulator_E = [];
const rightElectrode_E = [];

const leftElectrode_V = [];
const insulator_V = [];
const rightElectrode_V = [];

const leftElectrode_D = [];
const insulator_D = [];
const rightElectrode_D = [];

const nData = 250;
const vac_permittivity = 8.854*10**-2; //F*Angst/m^2
const electrodeLength = 20; //Angst

let V = document.getElementById("V").value;
let l = document.getElementById("l").value;
let chi = document.getElementById("chi").value;
let Ps = document.getElementById("Ps").value;

let VText = document.getElementById("VText");
let lText = document.getElementById("lText");
let chiText = document.getElementById("chiText");
let PsText = document.getElementById("PsText");


generateElectricData(Number(V), Number(l), nData);
generatePotentialData(Number(V), Number(l), nData);
generateDisplacementData(Number(V), Number(l), Number(chi), Number(Ps), nData);

electricChart = new Chart(ctx1, {
  type: "line",
  data: {
    datasets: [
      {
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: leftElectrode_E
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: insulator_E
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: rightElectrode_E
      }
    ]
  },
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
        }
        //suggestedMin: 0,
        //suggestedMax: 100
      },
      y: {
        suggestedMin: -0.5,
        suggestedMax: 0.5,
        title: {
          display: true,
          text: "Electric field (V/\u212B)",
          font: {
            size: 14
          }
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
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
            yMin: -10,
            yMax: 10,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          },
          box2: {
            type: 'box',
            borderWidth: 0,
            xMin: insulator_E[0].x,
            xMax: rightElectrode_E[0].x,
            yMin: -10,
            yMax: 10,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          },
          box3: {
            type: 'box',
            borderWidth: 0,
            xMin: rightElectrode_E[0].x,
            xMax: rightElectrode_E[rightElectrode_E.length - 1].x,
            yMin: -10,
            yMax: 10,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          }
        }
      }
    }
  }
});

potentialChart = new Chart(ctx2, {
  type: "line",
  data: {
    datasets: [
      {
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: leftElectrode_V
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: insulator_V
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: rightElectrode_V
      }
    ]
  },
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
        }
        //suggestedMin: 0,
        //suggestedMax: 100
      },
      y: {
        suggestedMin: -10,
        suggestedMax: 10,
        title: {
          display: true,
          text: "Electric potential (V)",
          font: {
            size: 14
          }
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
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
            yMin: -10,
            yMax: 10,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          },
          box2: {
            type: 'box',
            borderWidth: 0,
            xMin: insulator_E[0].x,
            xMax: rightElectrode_E[0].x,
            yMin: -10,
            yMax: 10,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          },
          box3: {
            type: 'box',
            borderWidth: 0,
            xMin: rightElectrode_E[0].x,
            xMax: rightElectrode_E[rightElectrode_E.length - 1].x,
            yMin: -10,
            yMax: 10,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          }
        }
      }
    }
  }
});

displacementChart = new Chart(ctx3, {
  type: "line",
  data: {
    datasets: [
      {
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: leftElectrode_D
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: insulator_D
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: rightElectrode_D
      }
    ]
  },
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
        }
        //suggestedMin: 0,
        //suggestedMax: 100
      },
      y: {
        suggestedMin: -0.5,
        suggestedMax: 0.5,
        title: {
          display: true,
          text: "Displacement field (C/m\u00B2)",
          font: {
            size: 14
          }
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
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
            yMin: -10,
            yMax: 10,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          },
          box2: {
            type: 'box',
            borderWidth: 0,
            xMin: insulator_E[0].x,
            xMax: rightElectrode_E[0].x,
            yMin: -10,
            yMax: 10,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          },
          box3: {
            type: 'box',
            borderWidth: 0,
            xMin: rightElectrode_E[0].x,
            xMax: rightElectrode_E[rightElectrode_E.length - 1].x,
            yMin: -10,
            yMax: 10,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          }
        }
      }
    }
  }
});

/*
electricChart.options.scales['x'].display = false; //global visibility
electricChart.options.scales['y'].display = false; 

electricChart.options.scales['x'].grid.display = false; //grid visibility
electricChart.options.scales['y'].grid.display = false; 

electricChart.options.scales['y'].ticks.display = false; //ticks visibility
electricChart.options.scales['x'].ticks.display = false;
*/
electricChart.update('none');
potentialChart.update('none');
displacementChart.update('none');

function generateElectricData(V, l, num = 100) {
  leftElectrode_E.length = 0;
  insulator_E.length = 0;
  rightElectrode_E.length = 0;

  x1 = -l/2;
  x2 = l/2;
  i1 = x1 - electrodeLength;
  i2 = x2 + electrodeLength;
  E = V/l;

  for (let x = i1; x <= x1; x += (i2 - i1)/num) {
    leftElectrode_E.push({x:x, y: 0});
  }

  for (let x = x1; x <= x2; x += (i2 - i1)/num) {
    insulator_E.push({x:x, y: E});
  }

  for (let x = x2; x <= i2; x += (i2 - i1)/num) {
    rightElectrode_E.push({x:x, y: 0});
  }
}

function generatePotentialData(V, l, num = 100) {
  leftElectrode_V.length = 0;
  insulator_V.length = 0;
  rightElectrode_V.length = 0;

  x1 = -l/2;
  x2 = l/2;
  i1 = x1 - electrodeLength;
  i2 = x2 + electrodeLength;
  E = V/l;

  for (let x = i1; x <= x1; x += (i2 - i1)/num) {
    leftElectrode_V.push({x:x, y: -V/2});
  }

  for (let x = x1; x <= x2; x += (i2 - i1)/num) {
    insulator_V.push({x:x, y: eval(E*x)});
  }

  for (let x = x2; x <= i2; x += (i2 - i1)/num) {
    rightElectrode_V.push({x:x, y: V/2});
  }
}

function generateDisplacementData(V, l, chi, Ps, num = 100) {
  leftElectrode_D.length = 0;
  insulator_D.length = 0;
  rightElectrode_D.length = 0;

  x1 = -l/2;
  x2 = l/2;
  i1 = x1 - electrodeLength;
  i2 = x2 + electrodeLength;
  E = V/l;

  for (let x = i1; x <= x1; x += (i2 - i1)/num) {
    leftElectrode_D.push({x:x, y: 0});
  }

  for (let x = x1; x <= x2; x += (i2 - i1)/num) {
    insulator_D.push({x:x, y: vac_permittivity*(1+chi)*E + Ps});
  }

  for (let x = x2; x <= i2; x += (i2 - i1)/num) {
    rightElectrode_D.push({x:x, y: 0});
  }
}

function result(){
  let V = document.getElementById("V").value;
  let l = document.getElementById("l").value;
  let chi = document.getElementById("chi").value;
  let Ps = document.getElementById("Ps").value;

  VText.innerHTML = "Voltage: " + V + " V"; 
  lText.innerHTML = "Length: " + l + " \u212B";
  chiText.innerHTML = "Electric susceptibility: " + chi; 
  PsText.innerHTML = "Spontaneous Polarization: " + Ps +" C/m<sup>2</sup>";
  
  generateElectricData(Number(V), Number(l), nData);
  generatePotentialData(Number(V), Number(l), nData);
  generateDisplacementData(Number(V), Number(l), Number(chi), Number(Ps), nData);

  electricChart.options.plugins.annotation.annotations.box1.xMin = leftElectrode_E[0].x;
  electricChart.options.plugins.annotation.annotations.box1.xMax = insulator_E[0].x;
  //electricChart.options.plugins.annotation.annotations.box1.yMin = electricChart.scales['y'].min;
  //electricChart.options.plugins.annotation.annotations.box1.yMax = electricChart.scales['y'].max;
  electricChart.options.plugins.annotation.annotations.box2.xMin = insulator_E[0].x;
  electricChart.options.plugins.annotation.annotations.box2.xMax = rightElectrode_E[0].x;
  electricChart.options.plugins.annotation.annotations.box3.xMin = rightElectrode_E[0].x;
  electricChart.options.plugins.annotation.annotations.box3.xMax = rightElectrode_E[rightElectrode_E.length - 1].x;
  
  potentialChart.options.plugins.annotation.annotations.box1.xMin = leftElectrode_E[0].x;
  potentialChart.options.plugins.annotation.annotations.box1.xMax = insulator_E[0].x;
  potentialChart.options.plugins.annotation.annotations.box2.xMin = insulator_E[0].x;
  potentialChart.options.plugins.annotation.annotations.box2.xMax = rightElectrode_E[0].x;
  potentialChart.options.plugins.annotation.annotations.box3.xMin = rightElectrode_E[0].x;
  potentialChart.options.plugins.annotation.annotations.box3.xMax = rightElectrode_E[rightElectrode_E.length - 1].x;

  displacementChart.options.plugins.annotation.annotations.box1.xMin = leftElectrode_D[0].x;
  displacementChart.options.plugins.annotation.annotations.box1.xMax = insulator_D[0].x;
  displacementChart.options.plugins.annotation.annotations.box2.xMin = insulator_D[0].x;
  displacementChart.options.plugins.annotation.annotations.box2.xMax = rightElectrode_D[0].x;
  displacementChart.options.plugins.annotation.annotations.box3.xMin = rightElectrode_D[0].x;
  displacementChart.options.plugins.annotation.annotations.box3.xMax = rightElectrode_D[rightElectrode_D.length - 1].x;

  electricChart.update('none');
  potentialChart.update('none');
  displacementChart.update('none');

}