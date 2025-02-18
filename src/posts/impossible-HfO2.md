---
title: The "impossible" polar structure of HfO\(_2\)
description: Polar but non-polar, or non-polar but polar?
tags: post
date: 2025-02-17
layout: layouts/post.njk
card: summary_large_image
image: https://seongjoojung.github.io/images/impossible-HfO2/Q2.svg
featured: true
---

Can a crystal structure be both polar and non-polar at the same time? [It cannot](https://pubs.acs.org/doi/full/10.1021/cm980140w), as polar point groups and non-polar point groups are sharply separated. There are symmetry elements that strictly forbid the existence of polarization. For example, all polar structures necessarily lack inversion symmetry, as inversion changes the direction of polarization. Similarly, polar structures cannot have two different axes of rotation or the same axis of rotation and an axis of the mirror plane.

What I'd like to introduce in this post is a polar crystal structure of HfO<sub>2</sub> that is seemingly non-polar but is, in fact, polar. Let's start with the [high-symmetry fluorite structure](https://next-gen.materialsproject.org/materials/mp-550893) (Fm\\(\bar{3}\\)m, #225) POSCAR:


<pre>
<code>Hf4 O8
   1.00000000000000
     5.0202162414259615    0.0000000000000000    0.0000000000000000
     0.0000000000000000    5.0202162414259615    0.0000000000000000
     0.0000000000000000    0.0000000000000000    5.0202162414259615
   Hf   O
   4    8
Direct
  0.0000000000000000  0.0000000000000000  0.0000000000000000
  0.0000000000000000  0.5000000000000000  0.5000000000000000
  0.5000000000000000  0.0000000000000000  0.5000000000000000
  0.5000000000000000  0.5000000000000000  0.0000000000000000
  0.2500000000000000  0.2500000000000000  0.7500000000000000
  0.2500000000000000  0.7500000000000000  0.7500000000000000
  0.2500000000000000  0.7500000000000000  0.2500000000000000
  0.2500000000000000  0.2500000000000000  0.2500000000000000
  0.7500000000000000  0.2500000000000000  0.2500000000000000
  0.7500000000000000  0.7500000000000000  0.2500000000000000
  0.7500000000000000  0.7500000000000000  0.7500000000000000
  0.7500000000000000  0.2500000000000000  0.7500000000000000
</code></pre>

Needless to say, this is a non-polar structure. The Berry phase polarization of the structure can be calculated using the [`LCALCPOL`](https://www.vasp.at/wiki/index.php/LCALCPOL) tag in VASP. The ionic dipole moment, which arises from the nuclei and core electrons, and the electronic dipole moment, which comes from the valence electrons, are calculated. The result can be found in `OUTCAR` as:

<pre>
<code class="language-plaintext">            Ionic dipole moment: p[ion]=(     0.00000     0.00000     0.00000 ) |e| Angst

 Total electronic dipole moment: p[elc]=(     0.00000    -0.00000     0.00000 ) |e| Angst
</code></pre>  
<br>

---

\
Now consider a slightly distorted structure of this fluorite HfO<sub>2</sub> and its dipole moment:

<pre>
<code>Hf4 O8
   1.00000000000000
     5.0202162414259615    0.0000000000000000    0.0000000000000000
     0.0000000000000008    5.0202162414259615    0.0000000000000000
     0.0000000000000000    0.0000000000000000    5.0204162414259615
   Hf   O
   4    8
Direct
  0.000000000000000  0.000000000000000  0.000000000000000
  0.500000000000000  0.500000000000000  0.000000000000000
  0.500000000000000  0.000000000000000  0.500000000000000
  0.000000000000000  0.500000000000000  0.500000000000000
  0.250000000000000  0.350000000000000  0.250000000000000
  0.750000000000000  0.150000000000000  0.250000000000000
  0.250000000000000  0.850000000000000  0.250000000000000
  0.750000000000000  0.650000000000000  0.250000000000000
  0.250000000000000  0.350000000000000  0.750000000000000
  0.750000000000000  0.150000000000000  0.750000000000000
  0.250000000000000  0.850000000000000  0.750000000000000
  0.750000000000000  0.650000000000000  0.750000000000000
</code></pre>

This new structure has some displacement of ions from the high-symmetry fluorite structure. This displacement can be represented as a matrix in direct coordinates:

<img src="/images/impossible-HfO2/Q2.svg" alt="Distortion 1" style="width:25%"/>

<pre>
<code>  0.0  0.0  0.0
  0.0  0.0  0.0
  0.0  0.0  0.0
  0.0  0.0  0.0
  0.0 +0.1  0.0
  0.0 -0.1  0.0
  0.0 +0.1  0.0
  0.0 -0.1  0.0
  0.0 +0.1  0.0
  0.0 -0.1  0.0
  0.0 +0.1  0.0
  0.0 -0.1  0.0
</code></pre>

Four oxygen ions (shown in red) are displaced towards \\(-y\\) (blue arrows), and the other four are displaced towards \\(+y\\) (pink arrows). There is no net change in the dipole moment, so the resulting structure is non-polar:

<pre>
<code class="language-plaintext">            Ionic dipole moment: p[ion]=(   -50.20216   -50.20216   -50.20216 ) |e| Angst

 Total electronic dipole moment: p[elc]=(    -0.00000    -0.00000     0.00000 ) |e| Angst
</code></pre>

The nonzero dipole moment seen in the ionic part comes from the [polarization quantum](https://www-sciencedirect-com.ezp1.lib.umn.edu/science/article/pii/S0022459612003234), which is an arbitrary value of polarization depending on the choice of the origin. The polarization of a crystal is a modular property, and it is quantized by translation of charge across unit cells. In this case, the ionic dipole moment values correspond exactly to the translation of charge across 10 unit cells, meaning that the polarization of this structure is 0, as expected.

Let's consider another distorted structure, resulting from the following displacement pattern:

<img src="/images/impossible-HfO2/Q4.svg" alt="Distortion 2" style="width:25%"/>

<pre>
<code>  0.0  0.0  0.0
  0.0  0.0  0.0
  0.0  0.0  0.0
  0.0  0.0  0.0
 +0.1  0.0  0.0
 +0.1  0.0  0.0
 -0.1  0.0  0.0
 -0.1  0.0  0.0
 -0.1  0.0  0.0
 -0.1  0.0  0.0
 +0.1  0.0  0.0
 +0.1  0.0  0.0
</code></pre>

<pre>
<code>Hf4 O8
   1.00000000000000
     5.0202162414259615    0.0000000000000000    0.0000000000000000
     0.0000000000000008    5.0202162414259615    0.0000000000000000
     0.0000000000000000    0.0000000000000000    5.0202162414259615
   Hf   O
   4    8
Direct
  0.000000000000000  0.000000000000000  0.000000000000000
  0.500000000000000  0.500000000000000  0.000000000000000
  0.500000000000000  0.000000000000000  0.500000000000000
  0.000000000000000  0.500000000000000  0.500000000000000
  0.350000000000000  0.250000000000000  0.250000000000000
  0.850000000000000  0.250000000000000  0.250000000000000
  0.150000000000000  0.750000000000000  0.250000000000000
  0.650000000000000  0.750000000000000  0.250000000000000
  0.150000000000000  0.250000000000000  0.750000000000000
  0.650000000000000  0.250000000000000  0.750000000000000
  0.350000000000000  0.750000000000000  0.750000000000000
  0.850000000000000  0.750000000000000  0.750000000000000
</code></pre>

<pre>
<code class="language-plaintext">            Ionic dipole moment: p[ion]=(   -50.20216   -50.20216   -50.20216 ) |e| Angst

 Total electronic dipole moment: p[elc]=(    -0.00000    -0.00000     0.00000 ) |e| Angst
</code></pre>

Just like the previous structure, it is unsurprising that this resulting structure is non-polar.
<br>
<br>


---

\
Finally, let us consider a combination of previous two displacement patterns:

<pre>
<code>  0.0  0.0  0.0
  0.0  0.0  0.0
  0.0  0.0  0.0
  0.0  0.0  0.0
 +0.1 +0.1  0.0
 +0.1 -0.1  0.0
 -0.1 +0.1  0.0
 -0.1 -0.1  0.0
 -0.1 +0.1  0.0
 -0.1 -0.1  0.0
 +0.1 +0.1  0.0
 +0.1 -0.1  0.0
</code></pre>

<pre>
<code>Hf4 O8
   1.00000000000000
     5.0202162414259615    0.0000000000000000    0.0000000000000000
     0.0000000000000008    5.0202162414259615    0.0000000000000000
     0.0000000000000000    0.0000000000000000    5.0202162414259619
   Hf   O
     4     8
Direct
  0.0000000000000000  0.0000000000000000  0.0000000000000000
  0.5000000000000000  0.5000000000000000  0.0000000000000000
  0.5000000000000000  0.0000000000000000  0.5000000000000000
  0.0000000000000000  0.5000000000000000  0.5000000000000000
  0.3500000000000000  0.3500000000000000  0.2500000000000000
  0.8500000000000000  0.1500000000000000  0.2500000000000000
  0.1500000000000000  0.8500000000000000  0.2500000000000000
  0.6500000000000000  0.6500000000000000  0.2500000000000000
  0.1500000000000000  0.3500000000000000  0.7500000000000000
  0.6500000000000000  0.1500000000000000  0.7500000000000000
  0.3500000000000000  0.8500000000000000  0.7500000000000000
  0.8500000000000000  0.6500000000000000  0.7500000000000000
</code></pre>

<pre>
<code class="language-plaintext">            Ionic dipole moment: p[ion]=(   -50.20216   -50.20216   -50.20216 ) |e| Angst

 Total electronic dipole moment: p[elc]=(    -0.00000     0.00000     4.29732 ) |e| Angst
</code></pre>

Now we notice that something is not quite as expected. The total displacement of ions is non-polar, like the previous two cases. No Ionic dipole moment arises, but the resulting structure is polar solely from the electronic contributions, according to this calculation (0.54 C/m<sup>2</sup>). It is not just polar, but as polar as a transfer of an electron by a full unit cell in the \\(z\\) direction. This scale of the polarization almost seems "impossible", as this occurs without any displacement of ions in the \\(z\\) direction. It does not even seem clear at this point whether this structure is positively, or negatively polarized.

This is not an error in the calculation, and the structure is indeed positively polarized. The nature of this polarization requires and scales with both displacement patterns shown above. The explanation involves a bit of group theoretical analysis, based on the representation of the distortion patterns called "modes". You can read more about it [in our recent preprint](https://arxiv.org/abs/2502.08633), and how this affects the ferroelectricity in HfO<sub>2</sub>. Here, I'll briefly demonstrate how the resulting structure can be polar in the first place, only using symmetry analysis.

Both of the non-polar distorted structures above have inversion symmetry. But how is it possible that the combination of the two distortions, both of which preserve the inversion symmetry, results in a polar structure? It is because the original high-symmetry fluorite structure possesses not just one inversion center. In fact, it possesses four distinct inversion centers:

<br>
<center>

| Inversion center  | x | y | z |
| :---------------: | :---------------:| :------------:| :------------:|
| \\(i_1\\)         | 0                | 0             | 0             |
| \\(i_2\\)         | 0                | &nbsp; 0.25 &nbsp;| &nbsp; 0.25 &nbsp;|
| \\(i_3\\)         |&nbsp; 0.25 &nbsp;| 0             | 0.25          |
| \\(i_4\\)         | 0.25             | 0.25          | 0             |

</center>
<br>

The first distortion destroys inversion centers \\(i_3, i_4\\) and preserves \\(i_1, i_2\\). The second distortion, on the other hand, destroys inversion centers \\(i_1, i_2\\) and preserves \\(i_3, i_4\\). Together, they destroy all the inversion centers present in the high-symmetry structure. Only one inversion center is sufficient to grant its structure non-polar. That is why these distortions by themselves result in a non-polar structure, but when combined can result in a net polar structure.