---
title: Normal Mode Charges, Mode Oscillator Strengths and Ionic Contributions to Dielectric Constant
description: Practical guide to calculating them using the dynamical matrix and Born effective charges
tags: post
date: 2023-07-19
layout: layouts/post.njk
card: summary
image: https://seongjoojung.github.io/favicons/fav.png
---

This post will demonstrate how to correctly calculate ionic contribution to permittivity (dielectric constant) from Born effective charges and dynamical matrices using DFT (and DFPT). VASP is supposed to be able to calculate this using `LEPSILON` (DFPT) tag, but it fails to calculate it correctly when there is an imaginary phonon at the Gamma point. The derivations can be found in [Gonze and Lee (1997) *Phys. Rev. B* 55, 10355](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.55.10355) (GL) and its citations. You can find the Python script [in my GitHub](https://github.com/seongjoojung/VASP-scripts/blob/main/ionic_permittivity.py).

The ionic contribution to permittivity can be calculated using normal mode charges or mode oscillator strength. The first ingredient to calculating it is the "eigendisplacements" \\(U \\), which differ from the eigenvectors of the dynamical matrix (called the mass-weighted normal modes) by a factor of the square root of atomic weights. The exact definition of \\(U \\) is eq. (12) of GL.

<pre>
<code class="language-python">proton_mass = 1.673*10**-27  #kg

U = eigenvectors/(np.sqrt(proton_mass*atomic_weight)) #kg^-1/2
</code></pre>

\\(U\\) have units of kg\\(^{-\frac{1}{2}}\\) in SI. Normal mode vectors can be calculated as normalized versions of \\(U\\).

<pre>
<code>N = np.zeros((3*n_ion, 3*n_ion)) #normal mode, unitless

for i in range(3*n_ion):
    N[i] = U[i]/np.linalg.norm(U[i])
</code></pre>

The mode effective charge vectors, the charge associated with each normal modes can be calculated by matrix multiplication of the Born effective charge tensor \\(Z^\ast_{k,\alpha,\beta}\\) reshaped to \\(Z^\ast_{\alpha,k\beta}\\) and the normal mode vectors. (eq. (53) in GL)

<pre>
<code>NMC = np.zeros((3*n_ion, 3)) #normal mode charge

#reshape BEC tensor to 3x15 matrix
BEC_reshape = np.zeros((3, 3*n_ion))
for i in range(n_ion):
    BEC_reshape[:,3*i:3*i+3] = BEC[i]

for i in range(3*n_ion):
    NMC[i] = BEC_reshape @ N[i]
</code></pre>

The mode oscillator strength tensors can be calculated from matrix multiplication of \\(U\\) and reshaped Born effective charge tensor. They have units of C\\(^2\\)/kg in SI. (eq. (54) in GL)

<pre>
<code>MOS = np.zeros((3*n_ion, 3, 3)) #Mode oscilator strength, C^2/kg

for m in range(3*n_ion):
    a = U[m] @ (BEC_reshape.T*e_charge)
    a = np.reshape(a, (1,3))
    MOS[m] = a.T @ a
</code></pre>

Finally, frequency-dependent permittivity can be calculated using the mode oscillator strength tensors. Ionic contribution corresponds to:

$$
\epsilon^{\mathrm{ion}} =  \epsilon(w=0) - \epsilon^\infty
$$

But it is important to note that eq. (55) in GL is in Gaussian units, which we need to convert to SI. While not apparent in the equation, it is evident from the units of mode oscilator strength and eq. (54) that it contains 2nd order charge term. Converting equations of Gaussian units to SI can be quite confusing, but as long as you identify every component of your equation you can convert it by substituting quantities using the [replacement table](https://en.wikipedia.org/wiki/Gaussian_units#General_rules_to_translate_a_formula) (Table 2A). From eq. (55), in SI units:

$$
\epsilon^{\mathrm{ion}} =  \frac{1}{\Omega_0 \epsilon_0} \sum_{m} \frac{S_{m,\alpha\beta}}{w_m^2}
$$

<pre>
<code>ICP = np.zeros((3,3)) #ionic contribution to permittivity

for m in range(3*n_ion):
    ICP += 1/(volume*vac_per)*MOS[m]/(float(eigenvalues[m]**2))
</code></pre>

There's also a way to calculate the ionic contribution to permittivity using normal mode charges, but it's not implemented here.

From the above equation, you can infer that the small errors in the acoustic mode leads to large errors in the ionic contribution to permittivity. So you have to manually set the normal mode charges and mode oscillation strengths to zero for acoustic mode. 

<pre>
<code>#zero out the error
NMC[np.abs(NMC) < zero_NMC] = 0

#zero out the error
MOS[np.abs(MOS) < zero_MOS] = 0

#zero out the error
ICP[np.abs(ICP) < zero_ICP] = 0
</code></pre>

The zero criterion for each values is read as input. You can first set it to 0 to check your values for the acoustic mode, and then choose a criterion that's higher than those values.

As an example, ionic permittivity of P4/mmm SrTiO\\(_3\\) at -2% epitaxial strain is calculated as following using `LEPSILON` tag in VASP:

<pre>
<code class="language-plaintext"> MACROSCOPIC STATIC DIELECTRIC TENSOR IONIC CONTRIBUTION
 -------------------------------------
         286.533    -0.000     0.000
          -0.000   286.532     0.000
           0.000     0.000     3.220
 -------------------------------------
</code></pre>

If you use the python script to calculate it properly, you get `permittivity_ionic.dat`:

<pre>
<code>286.54  0       0
0       286.54  0
0       0       -202.36
</code></pre>

You can confirm that for the directions without imaginary phonon, the ionic contribution is calculated properly but not for the direction with imaginary phonon.

<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

