## Assignment 5B: Particles

I decided to recreate the particle effect of the Volatile Mosskin from Hollowknight when it explodes. Though I am a bit behind on the Hollowknight fab, I am currently playing through it, and always found the Mosskin explosion effect satisfying. The effect is not complex: the Mosskin explodes into an orange cloud. Each particle of the cloud grows and then fades outs. In my implementation I kept the cloud particles simple, as circles. The particles spread from where the mouse is clicked to a hardcoded max distance, with their speed decreasing and color fading as they approach the distance. Due to time, the particles are kept as circles, rather than a more random cloud-like look, like in the game.

The compute shader manages particle states with a ping-pong buffer. Each particle tracks its spawn position, velocity, and lifetime, as well as some other information. This allows for the shader to calculate the movement of the particles in terms of the maximum distance permitted, which manages the size, speed, growth rate, and fading of each particle. The fading of the particles is done in the fragment shader usial a radial alpha falloff so that each particle fades smoothly towards its edges.

Users are able to personalize the settings of the explosion with a tweakpane. The pane has sliders for: the number of particles (count), the speed of the particles (speed), the size of the particles (size), and the length of time that the particles linger for (lifetime). 

Effect references:
Hollowknight wiki page on Volatile Mosskin: https://hollowknight.fandom.com/wiki/Volatile_Mosskin
image: https://hollowknight.fandom.com/wiki/File:Screenshot_HK_Volatile_Mosskin_02.png
video: https://www.youtube.com/shorts/0INgN__-suA
