---
title: Understanding Thin Film (Ferroelectric) Capacitors
description: Interactive explanation about depolarization fields in capacitors
tags: post
date: 2023-06-07
layout: layouts/post.njk
image: /images/understanding-thin-film-capacitors.png
---

<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.0.1/dist/chartjs-plugin-annotation.min.js"></script>

When you work with thin film capacitors, something you cannot ignore is the presence of the depolarization field - the field that arises from the electric dipole and acts against polarization. <a href="https://chemrxiv.org/engage/chemrxiv/article-details/63fd7308897b18336f3a59aa">In my recent manuscript</a>, there is an observation of diminishing spontaneous polarization of ferroelectric capacitors as the insulator gets shorter from the first principles. Here I'd like to introduce some scientific backgrounds of the depolarization fields arising in thin film geometry, with some interactive examples.

Depolarization fields occur in all polarized materials when there is separation of bound charges in the material. When a material is exposed to an electric field in free space, the internal electric field inside the material is the external electric field plus the depolarization field. In ideal capacitor settings, the free charges induced at the electrode interface should screen the bound charges, and any depolarization field should be suppressed from arising.

### Ideal Capacitor Model

Here is an interactive example of an ideal capacitor, where no depolarization field occurs. You can charge it by applying voltage and setting the length and electric susceptibility of the insulator. The color of the insulator will indicate how positively (red) or negatively (blue) polarized the insulator is. You can also make the insulator ferroelectric, by setting spontaneous polarization of it. It assumes a basic linear relationship between polarization \\(P \\) and electric field \\( \mathcal{E} \\). 

$$
P = \epsilon_0 \chi \mathcal{E} + P_S
$$

Where \\(\epsilon_0 \\) is the vacuum permittivity and \\(\chi \\) is the electric susceptibility (dielectric constant - 1). Note that polarization switching of ferroelectrics is not implemented using this equation. You can assume that if polarization deviates much from spontaneous polarization, non-linear effects such as polarization switching or the slab losing ferroelectricity will occur.

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
            Electric susceptibility: 2.0
            </label>
            <input id="chi" type="range" min="0" max="5" step="0.1" value="2" oninput="result()">
        </div>
        <div style="display: grid;">
            <label for="Ps" id="PsText">
            Spontaneous Polarization: 0.00 C/m<sup>2</sup>
            </label>
            <input id="Ps" type="range" min="-0.5" max="0.5" step="0.05" value="0" oninput="result()">
        </div>
    </form>
  </div>

  <p style="text-align: center;" id="PText">P: 0.00 C/m<sup>2</sup> </p>
  
  <div style="display:flex; flex-wrap: wrap; margin-left: auto; margin-right: auto;">
    <canvas-container>
      <canvas id="electricChart"  style="max-width: 320px; height: 300px;"></canvas>
    </canvas-container>
    <canvas-container>
      <canvas id="potentialChart" style="max-width: 320px; height: 300px;"></canvas>
    </canvas-container>
    <canvas-container>
      <canvas id="displacementChart" style="max-width: 320px; height: 300px;"></canvas>
    </canvas-container>
  </div>
</play-ground>

The difference between the displacement field between two points in space indicates how much free charge there is in the space between. In other words, all free charges are concentrated in the interface of the insulator and the electrode in ideal capacitors.

### Thomas-Fermi Screening Model

However, as studies developed for thin-film capacitors, the presence of depolarization fields was discovered which could not be explained by the ideal capacitor model. One of the first studies from Mehta et al. (<a href="https://pubs.aip.org/aip/jap/article-abstract/44/8/3379/6486/Depolarization-fields-in-thin-ferroelectric-films?redirectedFrom=fulltext">Mehta et al. (1973). <i>Journal of Applied Physics</i>, 44(8), 3379-3385.</a>) explains it using finite, Thomas-Fermi-like charge screening lengths of electrodes. Instead of all the free charges being concentrated at the interface, they are distributed within a short range at the interface. With a single-band approximation of conductors, the electric field profile of 1-D metal can be expressed as a second-order ODE:

$$
\require{physics}
\dv[2]{\mathcal{E}}{x} = \frac{1}{\lambda^2}\mathcal{E}
$$

Where \\(\lambda \\) is the Thomas-Fermi screening length. Analytical values for the screening length of coinage metals is ~0.5 &#8491;. Due to this finite length, a non-zero electric field arises in the electrodes near the interface with the presence of free charges. It is intuitive to think that this electric field in the electrode hinders free charge screening of bound charges. Thus if the insulator is ferroelectric, even though there is zero potential difference between the electrodes, depolarizing electric field arises in the insulator because of incomplete screening of the bound charges. Of course, this effect is only noticeable when \\(\lambda \\) is non-negligible compared to length of the insulator. You can observe this effect diminishing for either low \\(\lambda \\), or long insulator length.

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
            Electric susceptibility: 2.0
            </label>
            <input id="chi_TF" type="range" min="0" max="5" step="0.1" value="2" oninput="result_TF()">
        </div>
        <div style="display: grid;">
            <label for="lambda_TF" id="lambdaText_TF">
            Thomas-Fermi screening length: 0.5 &#8491;
            </label>
            <input id="lambda_TF" type="range" min="0" max="3" step="0.1"  value="0.5" oninput="result_TF()">
        </div>
        <div style="display: grid;">
            <label for="Ps_TF" id="PsText_TF">
            Spontaneous Polarization: 0.00 C/m<sup>2</sup>
            </label>
            <input id="Ps_TF" type="range" min="-0.5" max="0.5" step="0.05" value="0" oninput="result_TF()">
        </div>
    </form>
  </div>

  <p style="text-align: center;" id="PText_TF">P: 0.00 C/m<sup>2</sup> </p>

  <div style="display:flex; flex-wrap: wrap; margin-left: auto; margin-right: auto;">
    <canvas-container>
      <canvas id="electricChart_TF" style="max-width: 320px; height: 300px;"></canvas>
    </canvas-container>
    <canvas-container>
      <canvas id="potentialChart_TF" style="max-width: 320px; height: 300px;"></canvas>
    </canvas-container>
    <canvas-container>
      <canvas id="displacementChart_TF" style="max-width: 320px; height: 300px;"></canvas>
    </canvas-container>
  </div>
</play-ground>

But there are a few limitations of this model. Most importantly, the Thomas-Fermi screening length is only a property of the metal and ignores metal-insulator interaction at the interface. Also, the single-band assumption is not valid for most conductors, making analytical value unobtainable.

### Interface Capacitance Model

The modern interpretation of the depolarization field is through the "series capacitance" model. "Interface capacitance" arises from the interaction of atoms at the interface, thus even though there is one capacitor with two electrodes and one insulator, it should be viewed instead as three capacitors in series, with two interface capacitors. (<a href="https://www.nature.com/articles/nmat2429">Stengel et al., (2009). <i>Nature materials</i>, 8(5), 392-397.</a>) Treating interface capacitance as a thin vacuum layer yields an effective screening length at the interface.

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
            Length: 70 &#8491;
            </label>
            <input id="l_series" type="range" min="10" max="500" step="10" value="70" oninput="result_series()">
        </div>
        <div style="display: grid;">
            <label for="chi_series" id="chiText_series">
            Electric susceptibility: 2.0
            </label>
            <input id="chi_series" type="range" min="0" max="5" step="0.1" value="2" oninput="result_series()">
        </div>
        <div style="display: grid;">
            <label for="lambda_series" id="lambdaText_series">
            Effective screening length: 1.0 &#8491;
            </label>
            <input id="lambda_series" type="range" min="-5" max="5" step="0.1"  value="1.0" oninput="result_series()">
        </div>
        <div style="display: grid;">
            <label for="Ps_series" id="PsText_series">
            Spontaneous Polarization: 0.00 C/m<sup>2</sup>
            </label>
            <input id="Ps_series" type="range" min="-0.5" max="0.5" step="0.05" value="0" oninput="result_series()">
        </div>
    </form>
  </div>

  <p style="text-align: center;" id="PText_series">P: 0.00 C/m<sup>2</sup> </p>

  <div style="display:flex; flex-wrap: wrap; margin-left: auto; margin-right: auto;">
    <canvas-container>
      <canvas id="electricChart_series" style="max-width: 320px; height: 300px;"></canvas>
    </canvas-container>
    <canvas-container>
      <canvas id="potentialChart_series" style="max-width: 320px; height: 300px;"></canvas>
    </canvas-container>
    <canvas-container>
      <canvas id="displacementChart_series" style="max-width: 320px; height: 300px;"></canvas>
    </canvas-container>
  </div>
</play-ground>

You should notice the similarities and differences between the Thomas-Fermi screening model and the series capacitor model. Also, this model is interesting as it can be generalized to negative capacitances at the interface, or "interface ferroelectricity". With sufficiently weak bonds at the interface, it is suggested that instead of a depolarizing field, there can occur a polarizing field that enhances spontaneous polarization of the slab.

The existance of the depolarization fields, along with [Volta potentials](https://en.wikipedia.org/wiki/Volta_potential), can strongly affect your DFT calculation with thin slabs of insulator. What has been observed in my calculation of Pt/PbTiO<sub>3</sub>/Pt system is that the properties of the electrode (the catalyst) does not depend on the spontaneous polarization of the slab, but only on the polarization of the underlying support.

<script src="/js/capacitors.js"></script>
<script src="/js/capacitors_TF.js"></script>
<script src="/js/capacitors_series.js"></script>

