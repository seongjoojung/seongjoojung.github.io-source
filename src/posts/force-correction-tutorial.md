---
title: 'VASP Force Correction Patch: Tutorial'
description: How to use the force correction patch for VASP to simulate materials under constant electric field (Basics)
tags: post
date: 2023-06-17
layout: layouts/post.njk
---

In this post, I'll explain how to use the constrained forces method in VASP to simulate constant electric field using the [force correction patch](https://github.com/seongjoojung/VASP-force-correction-patch) from my github. Explanation on the background of this method can be found in my [recent manuscript](https://chemrxiv.org/engage/chemrxiv/article-details/63fd7308897b18336f3a59aa).

First, you need to calculate the Born effective charge tensor of your non-polar structure. For example, the non-polar structure of lead titanate would have following `CONTCAR:` (space group 123, P4/mmm)

<pre>
<code>PbTiO3
   1.00000000000000
     3.9064260257101253    0.0000000000000000    0.0000000000000000
     0.0000000000000000    3.9064260257101253    0.0000000000000002
     0.0000000000000000    0.0000000000000001    3.9719819950307556
   Pb   Ti   O
     1     1     3
Direct
  0.0000000000000000  0.0000000000000000  0.0000000000000000
  0.5000000000000000  0.5000000000000000  0.5000000000000000
  0.5000000000000000  0.5000000000000000  0.0000000000000000
  0.0000000000000000  0.5000000000000000  0.5000000000000000
  0.5000000000000000  0.0000000000000000  0.5000000000000000
</code></pre>

Here, I've imposed constant strain condition in the lateral direction, so that it has same lattice parameter a as its ground state (space group 99, P4mm). After you obtain the optimized structure of your non-polar system, you need to calculate the Born effective charge tensor using either `LEPSILON` or `LCALCEPS` tag. It is ideal to pair this calculation with second-derivative calculations using `IBRION=6` or `IBRION=8`, as the phonon calculation at the Gamma point provides useful informations.

`INCAR:`
<pre>
<code>#K-grid
 KSPACING = 0.15    #0.15=very fine 0.2=fine 0.3=normal

#start parameters
 NWRITE  = 1
 PREC    = Accurate  #precision mode

#electronic optimization
 ENCUT   = 520       #cutoff energy
 EDIFF   = 1.0e-9    #breakout condition for SC loop
 NELMIN  = 6         #minimum number of electronic SCF steps
 NELM    = 100
 ALGO    = Normal

#ionic relaxation
 IBRION   = 6         #relaxation method
 LEPSILON =.TRUE.     #linear response theory

#DOS-related
 ISMEAR  = 0        #determines how the partial occupancies are set for each orbial
 SIGMA   = 0.05

#Exchange correlation treatment
GGA = MK
PARAM1 = 0.1234
PARAM2 = 1.0
LUSE_VDW = .TRUE.
AGGAC = 0.0
LASPH = .TRUE.
</code></pre>

The Born effective charge tensor appears in `OUTCAR` file as following:
<pre>
<code> BORN EFFECTIVE CHARGES (in e, cummulative output)
 -------------------------------------------------
 ion    1
    1     3.89297     0.00000     0.00000
    2     0.00000     3.89297     0.00000
    3     0.00000     0.00000     3.83680
 ion    2
    1     7.37749    -0.00000     0.00000
    2     0.00000     7.37749     0.00000
    3    -0.00000     0.00000     7.03898
 ion    3
    1    -2.65986     0.00000     0.00000
    2     0.00000    -2.65986    -0.00000
    3     0.00000    -0.00000    -5.75317
 ion    4
    1    -6.07061    -0.00000     0.00000
    2     0.00000    -2.54000    -0.00000
    3     0.00000    -0.00000    -2.56131
 ion    5
    1    -2.53999    -0.00000     0.00000
    2     0.00000    -6.07061    -0.00000
    3     0.00000    -0.00000    -2.56131
</code></pre>

Using this, we can now set the `FORCES_Z` tag in the `INCAR` for contrained-forces calculations. To apply electric field in the z direction, you only need the `FORCES_Z` tag as only the diagonal componenets in the Born effective charge tensor is present.

We'll start by inducing small polarization to the non-polar structure. 

`INCAR`:
<pre>
<code>#K-grid
 KSPACING = 0.15    #0.15=very fine 0.2=fine 0.3=normal

#start parameters
 NWRITE  = 1
 PREC    = Accurate  #precision mode

#electronic optimization
 ENCUT   = 520       #cutoff energy
 EDIFF   = 1.0e-8    #breakout condition for SC loop
 NELMIN  = 6         #minimum number of electronic SCF steps
 NELM    = 100
 ALGO    = Normal

#ionic relaxation
 IBRION  = 1         #relaxation method
 ISIF    = 3         #relax dof
 NSW     = 500        #maximum number of ionic steps
 EDIFFG  = -0.001     #break condition for ionic relaxation
 POTIM   = 0.2
 NFREE   = 20        #MUST BE PROVIDED for BRION=1, mute for BRION=2

#DOS-related
 ISMEAR  = 0        #determines how the partial occupancies are set for each orbial
 SIGMA   = 0.05

#Write flags

#Exchange correlation treatment
GGA = MK
PARAM1 = 0.1234
PARAM2 = 1.0
LUSE_VDW = .TRUE.
AGGAC = 0.0
LASPH = .TRUE.

#Force correction
FORCES_Z  = 3.83680 7.03898 -5.75317 2*-2.56131
SCALING   = 0.01
LFIX_XY   = .TRUE.

#performance optimization
 NCORE = 8
</code></pre>

Note that positive value of `SCALING` is used, which will simulate negative electric field. Because PbTiO<sub>3</sub> is ferroelectric (and it is in the "negative capacitance" region), it will induce structure with positive polarization and lower energy, compared to your non-polar structure. Always start with small value of `SCALING`, and use the structure of smaller `SCALING` as starting point of larger `SCALING`.

For your `POSCAR`, you cannot use the `CONTCAR` of your non-polar structure without setting `ISYM=0`. But since we know that the space group of the polarized PbTiO<sub>3</sub> is P4mm, we'll circumvent this by altering the `POSCAR` a little bit. In general, it is always good to compare your calculation with a trial calculation of `ISYM=0`.

`POSCAR:`
<pre>
<code>PbTiO3
   1.00000000000000
     3.9064260257101253    0.0000000000000000    0.0000000000000000
     0.0000000000000000    3.9064260257101253    0.0000000000000002
     0.0000000000000000    0.0000000000000001    3.9719819950307556
   Pb   Ti   O
     1     1     3
Direct
  0.0000000000000000  0.0000000000000000  0.0000000000000000
  0.5000000000000000  0.5000000000000000  0.5001000000000000
  0.5000000000000000  0.5000000000000000  0.0000000000000000
  0.0000000000000000  0.5000000000000000  0.4999000000000000
  0.5000000000000000  0.0000000000000000  0.4999000000000000
</code></pre>

After you converge your calculation, you can check the forces of your structure in the `OUTCAR`:

<pre>
<code> POSITION                                       TOTAL-FORCE (eV/Angst)
 -----------------------------------------------------------------------------------
      0.00000      0.00000      3.97466         0.000000      0.000000      0.003863
      1.95321      1.95321      1.98860         0.000000      0.000000      0.007021
      1.95321      1.95321     -0.00013         0.000000     -0.000000     -0.005758
      0.00000      1.95321      1.98541         0.000000     -0.000000     -0.002563
      1.95321      0.00000      1.98541        -0.000000     -0.000000     -0.002563
 -----------------------------------------------------------------------------------
    total drift:                                0.000000      0.000000      0.000034
</code></pre>

And you'll see that your forces have converged to the value you set, `FORCES_Z`*`SCALING`.