---
title: Understanding (Ferroelectric) Thin Film Capacitors
description: Interactive explanation about depolarization fields in capacitors
tags: post
date: 2023-06-05
layout: layouts/post.njk
---

Understanding Thin Film Capacitors

<play-ground>
  <divs>
    <form>
        <div style="display: grid;">
            <label for="V" id="VText">
            Voltage: 0 V
            </label>
            <input id="V" type="range" min="-20" max="20" step="1" value="0" oninput="result()">
        </div>
        <div style="display: grid;">
            <label for="l" id="lText">
            Length: 80 &#8491;
            </label>
            <input id="l" type="range" min="10" max="500" step="10" value="80" oninput="result()">
        </div>
        <div style="display: grid;">
            <label for="chi" id="chiText">
            Electric susceptibility: 1
            </label>
            <input id="chi" type="range" min="0" max="5" step="0.1" value="1" oninput="result()">
        </div>
        <div style="display: grid;">
            <label for="Ps" id="PsText">
            Spontaneous Polarization: 0 C/m<sup>2</sup>
            </label>
            <input id="Ps" type="range" min="-0.5" max="0.5" step="0.05" value="0" oninput="result()">
        </div>
    </form>
  </div>
  <div style="display:flex; flex-wrap: wrap; margin-left: auto; margin-right: auto;">
    <canvas-container>
      <canvas id="electricChart" style="max-width: 380px; height: 300px;"></canvas>
    </canvas-container>
    <canvas-container>
      <canvas id="potentialChart" style="max-width: 380px; height: 300px;"></canvas>
    </canvas-container>
    <canvas-container>
      <canvas id="displacementChart" style="max-width: 380px; height: 300px;"></canvas>
    </canvas-container>
  </div>
</play-ground>

<br>

<play-ground>
  <divs>
    <form>
        <div style="display: grid;">
            <label for="V_TF" id="VText_TF">
            Voltage: 0 V
            </label>
            <input id="V_TF" type="range" min="-20" max="20" step="1" value="0" oninput="result_TF()">
        </div>
        <div style="display: grid;">
            <label for="l_TF" id="lText_TF">
            Length: 80 &#8491;
            </label>
            <input id="l_TF" type="range" min="10" max="500" step="10" value="80" oninput="result_TF()">
        </div>
        <div style="display: grid;">
            <label for="chi_TF" id="chiText_TF">
            Electric susceptibility: 1
            </label>
            <input id="chi_TF" type="range" min="0" max="5" step="0.1" value="1" oninput="result_TF()">
        </div>
        <div style="display: grid;">
            <label for="lambda_TF" id="lambdaText_TF">
            Thomas-Fermi screening length: 0.5 &#8491;
            </label>
            <input id="lambda_TF" type="range" min="0" max="3" step="0.1"  value="0.5" oninput="result_TF()">
        </div>
        <div style="display: grid;">
            <label for="Ps_TF" id="PsText_TF">
            Spontaneous Polarization: 0 C/m<sup>2</sup>
            </label>
            <input id="Ps_TF" type="range" min="-0.5" max="0.5" step="0.05" value="0" oninput="result_TF()">
        </div>
    </form>
  </div>
  <div style="display:flex; flex-wrap: wrap; margin-left: auto; margin-right: auto;">
    <canvas-container>
      <canvas id="electricChart_TF" style="max-width: 380px; height: 300px;"></canvas>
    </canvas-container>
    <canvas-container>
      <canvas id="potentialChart_TF" style="max-width: 380px; height: 300px;"></canvas>
    </canvas-container>
    <canvas-container>
      <canvas id="displacementChart_TF" style="max-width: 380px; height: 300px;"></canvas>
    </canvas-container>
  </div>
</play-ground>

<br>

<play-ground>
  <divs>
    <form>
        <div style="display: grid;">
            <label for="V_series" id="VText_series">
            Voltage: 0 V
            </label>
            <input id="V_series" type="range" min="-20" max="20" step="1" value="0" oninput="result_series()">
        </div>
        <div style="display: grid;">
            <label for="l_series" id="lText_series">
            Length: 80 &#8491;
            </label>
            <input id="l_series" type="range" min="10" max="500" step="10" value="80" oninput="result_series()">
        </div>
        <div style="display: grid;">
            <label for="chi_series" id="chiText_series">
            Electric susceptibility: 1
            </label>
            <input id="chi_series" type="range" min="0" max="5" step="0.1" value="1" oninput="result_series()">
        </div>
        <div style="display: grid;">
            <label for="lambda_series" id="lambdaText_series">
            effective screening length: 0.5 &#8491;
            </label>
            <input id="lambda_series" type="range" min="-3" max="3" step="0.1"  value="0.5" oninput="result_series()">
        </div>
        <div style="display: grid;">
            <label for="Ps_series" id="PsText_series">
            Spontaneous Polarization: 0 C/m<sup>2</sup>
            </label>
            <input id="Ps_series" type="range" min="-0.5" max="0.5" step="0.05" value="0" oninput="result_series()">
        </div>
    </form>
  </div>
  <div style="display:flex; flex-wrap: wrap; margin-left: auto; margin-right: auto;">
    <canvas-container>
      <canvas id="electricChart_series" style="max-width: 380px; height: 300px;"></canvas>
    </canvas-container>
    <canvas-container>
      <canvas id="potentialChart_series" style="max-width: 380px; height: 300px;"></canvas>
    </canvas-container>
    <canvas-container>
      <canvas id="displacementChart_series" style="max-width: 380px; height: 300px;"></canvas>
    </canvas-container>
  </div>
</play-ground>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.0.1/dist/chartjs-plugin-annotation.min.js"></script>
<script src="/js/capacitors.js"></script>
<script src="/js/capacitors_TF.js"></script>
<script src="/js/capacitors_series.js"></script>




<SpringPhysics withDamping />