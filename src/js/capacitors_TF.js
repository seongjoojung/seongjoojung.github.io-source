const ctx1_TF = document.getElementById('electricChart_TF');
const ctx2_TF = document.getElementById('potentialChart_TF');
const ctx3_TF = document.getElementById('displacementChart_TF');

const leftElectrode_E_TF = [];
const insulator_E_TF = [];
const rightElectrode_E_TF = [];

const leftElectrode_V_TF = [];
const insulator_V_TF = [];
const rightElectrode_V_TF = [];

const leftElectrode_D_TF = [];
const insulator_D_TF = [];
const rightElectrode_D_TF = [];

let V_TF = document.getElementById("V_TF").value;
let l_TF = document.getElementById("l_TF").value;
let chi_TF = document.getElementById("chi_TF").value;
let lambda_TF = document.getElementById("lambda_TF").value;
let Ps_TF = document.getElementById("Ps_TF").value;

let VText_TF = document.getElementById("VText_TF");
let lText_TF = document.getElementById("lText_TF");
let chiText_TF = document.getElementById("chiText_TF");
let lambdaText_TF = document.getElementById("lambdaText_TF");
let PsText_TF = document.getElementById("PsText_TF");


generateElectricData_TF(Number(V_TF), Number(l_TF), Number(chi_TF), Number(lambda_TF), Number(Ps_TF), nData);
generatePotentialData_TF(Number(V_TF), Number(l_TF), Number(chi_TF), Number(lambda_TF), Number(Ps_TF), nData);
generateDisplacementData_TF(Number(V_TF), Number(l_TF), Number(chi_TF), Number(lambda_TF), Number(Ps_TF), nData);

electricChart_TF = new Chart(ctx1_TF, {
  type: "line",
  data: {
    datasets: [
      {
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: leftElectrode_E_TF
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: insulator_E_TF
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: rightElectrode_E_TF
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
            xMin: insulator_E_TF[0].x - electrodeLength,
            xMax: insulator_E_TF[0].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          },
          box2: {
            type: 'box',
            borderWidth: 0,
            xMin: insulator_E_TF[0].x,
            xMax: rightElectrode_E_TF[0].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          },
          box3: {
            type: 'box',
            borderWidth: 0,
            xMin: rightElectrode_E_TF[0].x,
            xMax: rightElectrode_E_TF[rightElectrode_E_TF.length - 1].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          }
        }
      }
    }
  }
});

potentialChart_TF = new Chart(ctx2_TF, {
  type: "line",
  data: {
    datasets: [
      {
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: leftElectrode_V_TF
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: insulator_V_TF
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: rightElectrode_V_TF
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
            xMin: insulator_E_TF[0].x - electrodeLength,
            xMax: insulator_E_TF[0].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          },
          box2: {
            type: 'box',
            borderWidth: 0,
            xMin: insulator_E_TF[0].x,
            xMax: rightElectrode_E_TF[0].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          },
          box3: {
            type: 'box',
            borderWidth: 0,
            xMin: rightElectrode_E_TF[0].x,
            xMax: rightElectrode_E_TF[rightElectrode_E_TF.length - 1].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          }
        }
      }
    }
  }
});

displacementChart_TF = new Chart(ctx3_TF, {
  type: "line",
  data: {
    datasets: [
      {
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: leftElectrode_D_TF
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: insulator_D_TF
      },{
        fill: false,
        pointRadius: 0,
        borderColor: "rgba(255,0,0,0.5)",
        data: rightElectrode_D_TF
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
            xMin: insulator_E_TF[0].x - electrodeLength,
            xMax: insulator_E_TF[0].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          },
          box2: {
            type: 'box',
            borderWidth: 0,
            xMin: insulator_E_TF[0].x,
            xMax: rightElectrode_E_TF[0].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          },
          box3: {
            type: 'box',
            borderWidth: 0,
            xMin: rightElectrode_E_TF[0].x,
            xMax: rightElectrode_E_TF[rightElectrode_E_TF.length - 1].x,
            yMin: -15,
            yMax: 15,
            backgroundColor: 'rgba(120, 120, 120, 0.25)'
          }
        }
      }
    }
  }
});

electricChart_TF.update('none');
potentialChart_TF.update('none');
displacementChart_TF.update('none');

function generateElectricData_TF(V, l, chi, lambda, Ps, n = 100) {
  leftElectrode_E_TF.length = 0;
  insulator_E_TF.length = 0;
  rightElectrode_E_TF.length = 0;

  x1 = -l/2;
  x2 = l/2;
  i1 = x1 - electrodeLength;
  i2 = x2 + electrodeLength;

  a = 2*lambda*(1-Math.exp(-l/lambda));
  D = 1/(a*(1+chi)+l)*((1+chi)*vac_permittivity*V + l*Ps);
  E = 1/(a*(1+chi)+l)*(V - a/vac_permittivity*Ps);

  for (let x = x1; x >= i1; x -= (i2 - i1)/n) {
    leftElectrode_E_TF.push({x:x, y: eval(D/vac_permittivity*Math.exp((x+l/2)/lambda))});
  }

  for (let x = x1; x <= x2; x += (i2 - i1)/n) {
    insulator_E_TF.push({x:x, y: E});
  }

  for (let x = x2; x <= i2; x += (i2 - i1)/n) {
    rightElectrode_E_TF.push({x:x, y: eval(D/vac_permittivity*Math.exp(-(x-l/2)/lambda))});
  }
}

function generatePotentialData_TF(V, l, chi, lambda, Ps, n = 100) {
  leftElectrode_V_TF.length = 0;
  insulator_V_TF.length = 0;
  rightElectrode_V_TF.length = 0;

  x1 = -l/2;
  x2 = l/2;
  i1 = x1 - electrodeLength;
  i2 = x2 + electrodeLength;
  
  a = 2*lambda*(1-Math.exp(-l/lambda));
  D = 1/(a*(1+chi)+l)*((1+chi)*vac_permittivity*V + l*Ps);
  E = 1/(a*(1+chi)+l)*(V - a/vac_permittivity*Ps);

  for (let x = x1; x >= i1; x -= (i2 - i1)/n) {
    leftElectrode_V_TF.push({x:x, y: -V/2 + eval(D*lambda/vac_permittivity*Math.exp((x+l/2)/lambda))});
  }

  for (let x = x1; x <= x2; x += (i2 - i1)/n) {
    insulator_V_TF.push({x:x, y: -V/2 + eval(D*lambda/vac_permittivity + E*(x + l/2))});
  }

  for (let x = x2; x <= i2; x += (i2 - i1)/n) {
    rightElectrode_V_TF.push({x:x, y: V/2 + eval(-D*lambda/vac_permittivity*Math.exp(-(x-l/2)/lambda))});
  }
}

function generateDisplacementData_TF(V, l, chi, lambda, Ps, n = 100) {
  leftElectrode_D_TF.length = 0;
  insulator_D_TF.length = 0;
  rightElectrode_D_TF.length = 0;

  x1 = -l/2;
  x2 = l/2;
  i1 = x1 - electrodeLength;
  i2 = x2 + electrodeLength;
  
  a = 2*lambda*(1-Math.exp(-l/lambda));
  D = 1/(a*(1+chi)+l)*((1+chi)*vac_permittivity*V + l*Ps);

  for (let x = x1; x >= i1; x -= (i2 - i1)/n) {
    leftElectrode_D_TF.push({x:x, y: eval(D*Math.exp((x+l/2)/lambda))});
  }

  for (let x = x1; x <= x2; x += (i2 - i1)/n) {
    insulator_D_TF.push({x:x, y: D});
  }

  for (let x = x2; x <= i2; x += (i2 - i1)/n) {
    rightElectrode_D_TF.push({x:x, y: eval(D*Math.exp(-(x-l/2)/lambda))});
  }
}

function result_TF(){
  let V_TF = document.getElementById("V_TF").value;
  let l_TF = document.getElementById("l_TF").value;
  let chi_TF = document.getElementById("chi_TF").value;
  let lambda_TF = document.getElementById("lambda_TF").value;
  let Ps_TF = document.getElementById("Ps_TF").value;

  VText_TF.innerHTML = "Voltage: " + V_TF + " V"; 
  lText_TF.innerHTML = "Length: " + l_TF + " \u212B";
  chiText_TF.innerHTML = "Electric susceptibility: " + chi_TF; 
  lambdaText_TF.innerHTML = "Thomas-Fermi screening length: " + lambda_TF + " &#8491;"
  PsText_TF.innerHTML = "Spontaneous Polarization: " + Ps_TF +" C/m<sup>2</sup>";
  
  generateElectricData_TF(Number(V_TF), Number(l_TF), Number(chi_TF), Number(lambda_TF), Number(Ps_TF), nData);
  generatePotentialData_TF(Number(V_TF), Number(l_TF), Number(chi_TF), Number(lambda_TF), Number(Ps_TF), nData);
  generateDisplacementData_TF(Number(V_TF), Number(l_TF), Number(chi_TF), Number(lambda_TF), Number(Ps_TF), nData);

  electricChart_TF.options.plugins.annotation.annotations.box1.xMin = insulator_E_TF[0].x - electrodeLength;
  electricChart_TF.options.plugins.annotation.annotations.box1.xMax = insulator_E_TF[0].x;
  electricChart_TF.options.plugins.annotation.annotations.box2.xMin = insulator_E_TF[0].x;
  electricChart_TF.options.plugins.annotation.annotations.box2.xMax = rightElectrode_E_TF[0].x;
  electricChart_TF.options.plugins.annotation.annotations.box3.xMin = rightElectrode_E_TF[0].x;
  electricChart_TF.options.plugins.annotation.annotations.box3.xMax = rightElectrode_E_TF[0].x + electrodeLength;
  
  potentialChart_TF.options.plugins.annotation.annotations.box1.xMin = insulator_E_TF[0].x - electrodeLength;
  potentialChart_TF.options.plugins.annotation.annotations.box1.xMax = insulator_E_TF[0].x;
  potentialChart_TF.options.plugins.annotation.annotations.box2.xMin = insulator_E_TF[0].x;
  potentialChart_TF.options.plugins.annotation.annotations.box2.xMax = rightElectrode_E_TF[0].x;
  potentialChart_TF.options.plugins.annotation.annotations.box3.xMin = rightElectrode_E_TF[0].x;
  potentialChart_TF.options.plugins.annotation.annotations.box3.xMax = rightElectrode_E_TF[0].x + electrodeLength;

  displacementChart_TF.options.plugins.annotation.annotations.box1.xMin = insulator_E_TF[0].x - electrodeLength;
  displacementChart_TF.options.plugins.annotation.annotations.box1.xMax = insulator_E_TF[0].x;
  displacementChart_TF.options.plugins.annotation.annotations.box2.xMin = insulator_E_TF[0].x;
  displacementChart_TF.options.plugins.annotation.annotations.box2.xMax = rightElectrode_E_TF[0].x;
  displacementChart_TF.options.plugins.annotation.annotations.box3.xMin = rightElectrode_E_TF[0].x;
  displacementChart_TF.options.plugins.annotation.annotations.box3.xMax = rightElectrode_E_TF[0].x + electrodeLength;

  electricChart_TF.update('none');
  potentialChart_TF.update('none');
  displacementChart_TF.update('none');

}