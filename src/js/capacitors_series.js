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

//generate data
generateData_series(Number(V_series), Number(l_series), Number(chi_series), Number(lambda_series), Number(Ps_series), nData);

//make charts
electricChart_series = new Chart(ctx1_series, config("Electric field (V/\u212B)", -0.5, 0.5));
addData(electricChart_series,leftElectrode_E_series);
addData(electricChart_series,insulator_E_series);
addData(electricChart_series,rightElectrode_E_series);

potentialChart_series = new Chart(ctx2_series, config("Electric potential (V)", -10, 10))
addData(potentialChart_series,leftElectrode_V_series);
addData(potentialChart_series,insulator_V_series);
addData(potentialChart_series,rightElectrode_V_series);

displacementChart_series = new Chart(ctx3_series, config("Displacement field (C/m\u00B2)", -0.5, 0.5))
addData(displacementChart_series,leftElectrode_D_series);
addData(displacementChart_series,insulator_D_series);
addData(displacementChart_series,rightElectrode_D_series);

electricChart_series.update('none');
potentialChart_series.update('none');
displacementChart_series.update('none');

function generateData_series(V, l, chi, lambda, Ps, n = 100) {
  leftElectrode_E_series.length = 0;
  insulator_E_series.length = 0;
  rightElectrode_E_series.length = 0;
  leftElectrode_V_series.length = 0;
  insulator_V_series.length = 0;
  rightElectrode_V_series.length = 0;
  leftElectrode_D_series.length = 0;
  insulator_D_series.length = 0;
  rightElectrode_D_series.length = 0;

  x1 = -l/2;
  x2 = l/2;
  i1 = x1 - electrodeLength;
  i2 = x2 + electrodeLength;
  
  a = 2*lambda*(1-Math.exp(-l/lambda));
  D = 1/(a*(1+chi)+l)*((1+chi)*vac_permittivity*V + l*Ps);
  E = 1/(a*(1+chi)+l)*(V - a/vac_permittivity*Ps);

  for (let x = x1; x >= i1; x -= (i2 - i1)/n) {
    leftElectrode_E_series.push({x:x, y: eval(D/vac_permittivity*Math.exp((x+l/2)/lambda))});
    leftElectrode_V_series.push({x:x, y: -V/2 + eval(D*lambda/vac_permittivity*Math.exp((x+l/2)/lambda))});
    leftElectrode_D_series.push({x:x, y: eval(D*Math.exp((x+l/2)/lambda))});
  }

  for (let x = x1; x <= x2; x += (i2 - i1)/n) {
    insulator_E_series.push({x:x, y: E});
    insulator_V_series.push({x:x, y: -V/2 + eval(D*lambda/vac_permittivity + E*(x + l/2))});
    insulator_D_series.push({x:x, y: D});
  }

  for (let x = x2; x <= i2; x += (i2 - i1)/n) {
    rightElectrode_E_series.push({x:x, y: eval(D/vac_permittivity*Math.exp(-(x-l/2)/lambda))});
    rightElectrode_V_series.push({x:x, y: V/2 + eval(-D*lambda/vac_permittivity*Math.exp(-(x-l/2)/lambda))});
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
  
  generateData_series(Number(V_series), Number(l_series), Number(chi_series), Number(lambda_series), Number(Ps_series), nData);

  updateBoxes(electricChart_series);
  updateBoxes(potentialChart_series);
  updateBoxes(displacementChart_series);

  electricChart_series.update('none');
  potentialChart_series.update('none');
  displacementChart_series.update('none');

}