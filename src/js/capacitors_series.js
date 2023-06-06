const ctx1_series = document.getElementById('electricChart_series');
const ctx2_series = document.getElementById('potentialChart_series');
const ctx3_series = document.getElementById('displacementChart_series');

const leftElectrode_E_series = [];
const leftVacuum_E_series = [];
const insulator_E_series = [];
const rightVacuum_E_series = [];
const rightElectrode_E_series = [];

const leftElectrode_D_series = [];
const leftVacuum_D_series = [];
const insulator_D_series = [];
const rightVacuum_D_series = [];
const rightElectrode_D_series = [];

const leftElectrode_V_series = [];
const leftVacuum_V_series = [];
const insulator_V_series = [];
const rightVacuum_V_series = [];
const rightElectrode_V_series = [];

let V_series = document.getElementById("V_series").value;
let l_series = document.getElementById("l_series").value;
let chi_series = document.getElementById("chi_series").value;
let lambda_series = document.getElementById("lambda_series").value;
let Ps_series = document.getElementById("Ps_series").value;

let VText_series = document.getElementById("VText_series");
let lText_series = document.getElementById("lText_series");
let chiText_series = document.getElementById("chiText_series");
let lambdaText_series = document.getElementById("lambdaText_series");
let PsText_series = document.getElementById("PsText_series");


generateElectricData_series(Number(V_series), Number(l_series), Number(chi_series), Number(lambda_series), Number(Ps_series), nData);
generatePotentialData_series(Number(V_series), Number(l_series), Number(chi_series), Number(lambda_series), Number(Ps_series), nData);
generateDisplacementData_series(Number(V_series), Number(l_series), Number(chi_series), Number(lambda_series), Number(Ps_series), nData);

electricChart_series = new Chart(ctx1_series, {
  type: "line",
  data: {
    datasets: [
      {
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: leftElectrode_E_series
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: insulator_E_series
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: rightElectrode_E_series
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
            xMin: insulator_E_series[0].x - electrodeLength,
            xMax: insulator_E_series[0].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          },
          box2: {
            type: 'box',
            borderWidth: 0,
            xMin: insulator_E_series[0].x,
            xMax: rightElectrode_E_series[0].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          },
          box3: {
            type: 'box',
            borderWidth: 0,
            xMin: rightElectrode_E_series[0].x,
            xMax: rightElectrode_E_series[rightElectrode_E_series.length - 1].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          }
        }
      }
    }
  }
});

potentialChart_series = new Chart(ctx2_series, {
  type: "line",
  data: {
    datasets: [
      {
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: leftElectrode_V_series
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: insulator_V_series
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: rightElectrode_V_series
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
            xMin: insulator_E_series[0].x - electrodeLength,
            xMax: insulator_E_series[0].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          },
          box2: {
            type: 'box',
            borderWidth: 0,
            xMin: insulator_E_series[0].x,
            xMax: rightElectrode_E_series[0].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          },
          box3: {
            type: 'box',
            borderWidth: 0,
            xMin: rightElectrode_E_series[0].x,
            xMax: rightElectrode_E_series[rightElectrode_E_series.length - 1].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          }
        }
      }
    }
  }
});

displacementChart_series = new Chart(ctx3_series, {
  type: "line",
  data: {
    datasets: [
      {
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: leftElectrode_D_series
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: insulator_D_series
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: rightElectrode_D_series
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
            xMin: insulator_E_series[0].x - electrodeLength,
            xMax: insulator_E_series[0].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          },
          box2: {
            type: 'box',
            borderWidth: 0,
            xMin: insulator_E_series[0].x,
            xMax: rightElectrode_E_series[0].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          },
          box3: {
            type: 'box',
            borderWidth: 0,
            xMin: rightElectrode_E_series[0].x,
            xMax: rightElectrode_E_series[rightElectrode_E_series.length - 1].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          }
        }
      }
    }
  }
});

electricChart_series.update('none');
potentialChart_series.update('none');
displacementChart_series.update('none');

function generateElectricData_series(V, l, chi, lambda, Ps, n = 100) {
  leftElectrode_E_series.length = 0;
  insulator_E_series.length = 0;
  rightElectrode_E_series.length = 0;

  x1 = -l/2;
  x2 = l/2;
  i1 = x1 - electrodeLength;
  i2 = x2 + electrodeLength;

  a = 2*lambda*(1-Math.exp(-l/lambda));
  D = 1/(a*(1+chi)+l)*((1+chi)*vac_permittivity*V + l*Ps);
  E = 1/(a*(1+chi)+l)*(V - a/vac_permittivity*Ps);

  for (let x = x1; x >= i1; x -= (i2 - i1)/n) {
    leftElectrode_E_series.push({x:x, y: eval(D/vac_permittivity*Math.exp((x+l/2)/lambda))});
  }

  for (let x = x1; x <= x2; x += (i2 - i1)/n) {
    insulator_E_series.push({x:x, y: E});
  }

  for (let x = x2; x <= i2; x += (i2 - i1)/n) {
    rightElectrode_E_series.push({x:x, y: eval(D/vac_permittivity*Math.exp(-(x-l/2)/lambda))});
  }
}

function generatePotentialData_series(V, l, chi, lambda, Ps, n = 100) {
  leftElectrode_V_series.length = 0;
  insulator_V_series.length = 0;
  rightElectrode_V_series.length = 0;

  x1 = -l/2;
  x2 = l/2;
  i1 = x1 - electrodeLength;
  i2 = x2 + electrodeLength;
  
  a = 2*lambda*(1-Math.exp(-l/lambda));
  D = 1/(a*(1+chi)+l)*((1+chi)*vac_permittivity*V + l*Ps);
  E = 1/(a*(1+chi)+l)*(V - a/vac_permittivity*Ps);

  for (let x = x1; x >= i1; x -= (i2 - i1)/n) {
    leftElectrode_V_series.push({x:x, y: -V/2 + eval(D*lambda/vac_permittivity*Math.exp((x+l/2)/lambda))});
  }

  for (let x = x1; x <= x2; x += (i2 - i1)/n) {
    insulator_V_series.push({x:x, y: -V/2 + eval(D*lambda/vac_permittivity + E*(x + l/2))});
  }

  for (let x = x2; x <= i2; x += (i2 - i1)/n) {
    rightElectrode_V_series.push({x:x, y: V/2 + eval(-D*lambda/vac_permittivity*Math.exp(-(x-l/2)/lambda))});
  }
}

function generateDisplacementData_series(V, l, chi, lambda, Ps, n = 100) {
  leftElectrode_D_series.length = 0;
  insulator_D_series.length = 0;
  rightElectrode_D_series.length = 0;

  x1 = -l/2;
  x2 = l/2;
  i1 = x1 - electrodeLength;
  i2 = x2 + electrodeLength;
  
  a = 2*lambda*(1-Math.exp(-l/lambda));
  D = 1/(a*(1+chi)+l)*((1+chi)*vac_permittivity*V + l*Ps);

  for (let x = x1; x >= i1; x -= (i2 - i1)/n) {
    leftElectrode_D_series.push({x:x, y: eval(D*Math.exp((x+l/2)/lambda))});
  }

  for (let x = x1; x <= x2; x += (i2 - i1)/n) {
    insulator_D_series.push({x:x, y: D});
  }

  for (let x = x2; x <= i2; x += (i2 - i1)/n) {
    rightElectrode_D_series.push({x:x, y: eval(D*Math.exp(-(x-l/2)/lambda))});
  }
}

function result_series(){
  let V_series = document.getElementById("V_series").value;
  let l_series = document.getElementById("l_series").value;
  let chi_series = document.getElementById("chi_series").value;
  let lambda_series = document.getElementById("lambda_series").value;
  let Ps_series = document.getElementById("Ps_series").value;

  VText_series.innerHTML = "Voltage: " + V_series + " V"; 
  lText_series.innerHTML = "Length: " + l_series + " \u212B";
  chiText_series.innerHTML = "Electric susceptibility: " + chi_series; 
  lambdaText_series.innerHTML = "Thomas-Fermi screening length: " + lambda_series + " &#8491;"
  PsText_series.innerHTML = "Spontaneous Polarization: " + Ps_series +" C/m<sup>2</sup>";
  
  generateElectricData_series(Number(V_series), Number(l_series), Number(chi_series), Number(lambda_series), Number(Ps_series), nData);
  generatePotentialData_series(Number(V_series), Number(l_series), Number(chi_series), Number(lambda_series), Number(Ps_series), nData);
  generateDisplacementData_series(Number(V_series), Number(l_series), Number(chi_series), Number(lambda_series), Number(Ps_series), nData);

  electricChart_series.options.plugins.annotation.annotations.box1.xMin = insulator_E_series[0].x - electrodeLength;
  electricChart_series.options.plugins.annotation.annotations.box1.xMax = insulator_E_series[0].x;
  electricChart_series.options.plugins.annotation.annotations.box2.xMin = insulator_E_series[0].x;
  electricChart_series.options.plugins.annotation.annotations.box2.xMax = rightElectrode_E_series[0].x;
  electricChart_series.options.plugins.annotation.annotations.box3.xMin = rightElectrode_E_series[0].x;
  electricChart_series.options.plugins.annotation.annotations.box3.xMax = rightElectrode_E_series[0].x + electrodeLength;
  
  potentialChart_series.options.plugins.annotation.annotations.box1.xMin = insulator_E_series[0].x - electrodeLength;
  potentialChart_series.options.plugins.annotation.annotations.box1.xMax = insulator_E_series[0].x;
  potentialChart_series.options.plugins.annotation.annotations.box2.xMin = insulator_E_series[0].x;
  potentialChart_series.options.plugins.annotation.annotations.box2.xMax = rightElectrode_E_series[0].x;
  potentialChart_series.options.plugins.annotation.annotations.box3.xMin = rightElectrode_E_series[0].x;
  potentialChart_series.options.plugins.annotation.annotations.box3.xMax = rightElectrode_E_series[0].x + electrodeLength;

  displacementChart_series.options.plugins.annotation.annotations.box1.xMin = insulator_E_series[0].x - electrodeLength;
  displacementChart_series.options.plugins.annotation.annotations.box1.xMax = insulator_E_series[0].x;
  displacementChart_series.options.plugins.annotation.annotations.box2.xMin = insulator_E_series[0].x;
  displacementChart_series.options.plugins.annotation.annotations.box2.xMax = rightElectrode_E_series[0].x;
  displacementChart_series.options.plugins.annotation.annotations.box3.xMin = rightElectrode_E_series[0].x;
  displacementChart_series.options.plugins.annotation.annotations.box3.xMax = rightElectrode_E_series[0].x + electrodeLength;

  electricChart_series.update('none');
  potentialChart_series.update('none');
  displacementChart_series.update('none');

}