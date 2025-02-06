![Pulp science fiction magazine cover showing a spaceship](https://www.gutenberg.org/cache/epub/61845/pg61845.cover.medium.jpg)

# Galaxy Explorer

Here's a project that combines ideas from my [one-dimensional arcade game](https://adafruit-playground.com/u/mrklingon/pages/is-that-a-good-idea-building-a-one-dimensional-starfighter-game) and [orrery project](https://adafruit-playground.com/u/mrklingon/pages/is-that-a-good-idea-building-a-one-dimensional-starfighter-game). Think "1930's pulp science fiction" and you'll get the idea: The Circuit Playground lets you navigate a galaxy defined in a 100 element array with around 60 stars. You can stop at any one of the solar systems and observe an orrery-like display of the movement of the planets.

For me, the fun here  is creating a UI with the CPX controls:

The program has three states:  
**travel**  - move through the galaxy  
**stop**    - choose a star displayed on the ten neopixels  
**explore** - goes into *orrery* mode showing the planets in the chosen star-system  

When in **travel** state, the **A** and **B** buttons increase the speed of the movement of the stars. A: clockwise, B: counter-clockwise. Multiple clicks increase the speed.  

When in **stop** state, the **A** and **B** buttons move a blinking white pixel to select a star. A:move counter-clockwise, and B:clockwise. (yes, the opposite of **travel** mode).  

Change state by pressing **A+B** - state cycles from *travel* to *stop* to *explore* and back to *travel*.  In **stop** mode, you cannot move to **explore** unless the blinking pixel is on one of the stars.

At any point, shifting the *switch* to the left, turns off all the neopixels and switches the system to **travel** mode.

When the switch is shifted to the left, *shaking* the CPX will show all neopixels in green and generate a new galaxy.

Both versions, CircuitPython or Makecode work the same.

The generation of the galaxy creates two 100 element arrays. One defines the stars, and the other the "type" of solar system. When in **explore** mode, the defined colors and speed of the planets is set based on an algorithm.


**Files**
* explore.js - or makecode version: https://makecode.com/_Wt9P3udHMKjR
* explore.py - copy to code.py on a Circuit Playground with CircuitPython
