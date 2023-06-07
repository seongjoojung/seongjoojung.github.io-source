const ctx1_series = document.getElementById('electricChart_series');
const ctx2_series = document.getElementById('potentialChart_series');
const ctx3_series = document.getElementById('displacementChart_series');

//Data arrays
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

//HTML elements and inputs
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
let PText_series = document.getElementById("PText_series");

//generate data
generateData_series(Number(V_series), Number(l_series), Number(chi_series), Number(lambda_series), Number(Ps_series), nData);

//make charts
electricChart_series = new Chart(ctx1_series, config("Electric field (V/\u212B)", -0.5, 0.5));
addData(electricChart_series,leftElectrode_E_series);
addData(electricChart_series,leftVacuum_E_series);
addData(electricChart_series,insulator_E_series);
addData(electricChart_series,rightVacuum_E_series);
addData(electricChart_series,rightElectrode_E_series);

potentialChart_series = new Chart(ctx2_series, config("Electric potential (V)", -10, 10))
addData(potentialChart_series,leftElectrode_V_series);
addData(potentialChart_series,leftVacuum_V_series);
addData(potentialChart_series,insulator_V_series);
addData(potentialChart_series,rightVacuum_V_series);
addData(potentialChart_series,rightElectrode_V_series);

displacementChart_series = new Chart(ctx3_series, config("Displacement field (C/m\u00B2)", -0.5, 0.5))
addData(displacementChart_series,leftElectrode_D_series);
addData(displacementChart_series,leftVacuum_D_series);
addData(displacementChart_series,insulator_D_series);
addData(displacementChart_series,rightVacuum_D_series);
addData(displacementChart_series,rightElectrode_D_series);

updateBoxes_series(electricChart_series);
updateBoxes_series(potentialChart_series);
updateBoxes_series(displacementChart_series);

electricChart_series.update(); //bugged when updating without animations
potentialChart_series.update();
displacementChart_series.update();

function generateData_series(V, l, chi, lambda, Ps, n = 100) {
  leftElectrode_E_series.length = 0;
  leftVacuum_E_series.length = 0;
  insulator_E_series.length = 0;
  rightVacuum_E_series.length = 0;
  rightElectrode_E_series.length = 0;

  leftElectrode_V_series.length = 0;
  leftVacuum_V_series.length = 0;
  insulator_V_series.length = 0;
  rightVacuum_V_series.length = 0;
  rightElectrode_V_series.length = 0;

  leftElectrode_D_series.length = 0;
  leftVacuum_D_series.length = 0;
  insulator_D_series.length = 0;
  rightVacuum_D_series.length = 0;
  rightElectrode_D_series.length = 0;


    a = 2*lambda

  if (lambda >= 0) {
    vac_length = lambda;
  } else {
    vac_length = -lambda;
  }

  x0 = -l/2 - vac_length;
  x1 = -l/2;
  x2 = l/2;
  x3 = l/2 + vac_length;
  i1 = x1 - electrodeLength - vac_length;
  i2 = x2 + electrodeLength + vac_length;
  
  D = 1/(a*(1+chi)+l)*((1+chi)*vac_permittivity*V + l*Ps);
  E = 1/(a*(1+chi)+l)*(V - a/vac_permittivity*Ps);
  let P = chi*E + Ps;

  for (let x = x0; x >= i1; x -= (i2 - i1)/n) {
    leftElectrode_E_series.push({x:x, y: 0});
    leftElectrode_V_series.push({x:x, y: -V/2});
    leftElectrode_D_series.push({x:x, y: 0});
  }

  for (let x = x0; x <= x1; x += (x1 - x0)/(1)) {
    if (lambda == 0) break;
    leftVacuum_E_series.push({x:x, y: (V-E*l)/a});
    leftVacuum_V_series.push({x:x, y: eval(((V-E*l)/(2*vac_length))*(x + l/2 + vac_length) - V/2)});
    leftVacuum_D_series.push({x:x, y: ((V-E*l)/a)*vac_permittivity});
  }

  for (let x = x1; x <= x2; x += (i2 - i1)/n) {
    insulator_E_series.push({x:x, y: E});
    insulator_V_series.push({x:x, y: -V/2 + eval(D*(lambda)/vac_permittivity + E*(x + l/2))});
    insulator_D_series.push({x:x, y: D});
  }

  for (let x = x2; x <= x3; x += (x3 - x2)/1) {
    if (lambda == 0) break;
    rightVacuum_E_series.push({x:x, y: (V-E*l)/a});
    rightVacuum_V_series.push({x:x, y: eval(((-V+E*l)/(2*vac_length))*(-x + l/2 + vac_length) + V/2)});
    rightVacuum_D_series.push({x:x, y: ((V-E*l)/a)*vac_permittivity});
  }

  for (let x = x3; x <= i2; x += (i2 - i1)/n) {
    rightElectrode_E_series.push({x:x, y: 0});
    rightElectrode_V_series.push({x:x, y: V/2});
    rightElectrode_D_series.push({x:x, y: 0});
  }

  return P;
}

function updateBoxes_series(chart, P=0) {
  chart.options.plugins.annotation.annotations.box1.xMin = chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1].x;
  chart.options.plugins.annotation.annotations.box1.xMax = chart.data.datasets[0].data[0].x;
  chart.options.plugins.annotation.annotations.box2.xMin = chart.data.datasets[2].data[0].x;
  chart.options.plugins.annotation.annotations.box2.xMax = chart.data.datasets[2].data[chart.data.datasets[2].data.length - 1].x;
  chart.options.plugins.annotation.annotations.box3.xMin = chart.data.datasets[4].data[0].x;
  chart.options.plugins.annotation.annotations.box3.xMax = chart.data.datasets[4].data[chart.data.datasets[4].data.length - 1].x;

  if (P>0) {
    chart.options.plugins.annotation.annotations.box2.backgroundColor = 'rgba(' + Math.floor(P*2*255) + ', 0, 0, 0.25)'
  } else {
    chart.options.plugins.annotation.annotations.box2.backgroundColor = 'rgba(0, 0, ' + Math.floor(-P*2*255) + ', 0.25)'
  }
  
};

function result_series(){
  let V_series = document.getElementById("V_series").value;
  let l_series = document.getElementById("l_series").value;
  let chi_series = document.getElementById("chi_series").value;
  let lambda_series = document.getElementById("lambda_series").value;
  let Ps_series = document.getElementById("Ps_series").value;

  let P = generateData_series(Number(V_series), Number(l_series), Number(chi_series), Number(lambda_series), Number(Ps_series), nData);

  VText_series.innerHTML = "Voltage: " + V_series + " V"; 
  lText_series.innerHTML = "Length: " + l_series + " \u212B";
  chiText_series.innerHTML = "Electric susceptibility: " + Number(chi_series).toFixed(1); 
  lambdaText_series.innerHTML = "Effective screening length: " + Number(lambda_series).toFixed(1) + " &#8491;"
  PsText_series.innerHTML = "Spontaneous Polarization: " + Number(Ps_series).toFixed(2) +" C/m<sup>2</sup>";
  PText_series.innerHTML = "P: " + P.toFixed(2) +" C/m<sup>2</sup>";


  updateBoxes_series(electricChart_series, P);
  updateBoxes_series(potentialChart_series, P);
  updateBoxes_series(displacementChart_series, P);

  electricChart_series.update('none');
  potentialChart_series.update('none');
  displacementChart_series.update('none');

}