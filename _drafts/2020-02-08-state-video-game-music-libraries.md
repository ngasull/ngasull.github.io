---
layout: post
permalink: "state-video-game-music-libraries"
title:  "Why isn't video game music evolving?"
date:   2020-02-08 10:00:00 +0100
categories: music video-games development
---

After weeks or even months of research, I realized that so much can still be improved around music in interactive systems like video games. Being an adept of retro-gaming and having a small foundation in music composition, retro-gaming music was a nice area to dig into: it has restrictive musicality, which enables to focus more on composition and strong auditive identity.

The article will first give some context about how music used to be made in video games.
Then, we will see where video game music tends to evolve.
Eventually, we'll see what we gained and might have lost and what could change in the future.


## Game music in the 90's

Retro game music is often referred as **chiptune** as sound used to be synthesized on-the-go by the device's sound chip or card.
Many artists [still compose chiptune nowadays](http://battleofthebits.org/) - maybe because nostalgia, or maybe because chiptune focuses on composition rather than picking and tweaking instruments, effects and mastering.
Anyhow, it's an amazing discipline for the hobbyist composer!

<figure>
  <img alt="FastTracker2" src="{{ "/assets/img/FastTracker2.png" | relative_url }}" />
  <figcaption>FastTracker 2, a DOS music tracker</figcaption>
</figure>

Chiptune is often composed the _tracker_ way, which mainly differs from the sheet/_piano roll_ way by the explicit separation of audio channels and their way to manage effects and textual note sequences instead of visual edition in space.
Trackers are here to allow composition while enforcing control over audio channels thanks to the vertical **tracks** system.

Although many claim the benefits of the tracker layout because of its compactness, I still think it's rather outdated and prevents picturing the music well. The alternative layout, the **piano roll**, comes closer to music sheets which is the standard of music composition. Notes can intuitively be spanned across time, and layers can be "drawn".

<figure>
  <img alt="LMMS Piano roll" src="{{ "/assets/img/LMMS_PianoRoll.png" | relative_url }}" />
  <figcaption>Piano roll in LMMS</figcaption>
</figure>

We'll see later that piano rolls are a common component in most modern [DAW](https://en.wikipedia.org/wiki/Digital_audio_workstation)s. Although more visual than trackers, different piano rolls might have many varying features between each other, whereas all trackers are mostly the same.

Most trackers produce [**module files**](https://en.wikipedia.org/wiki/Module_file). These files basically separate the **instruments** from the **notes** and **effects**.
A consequence from separating the instruments' sound data is that the module file is usually **much smaller** than raw audio data.
Moreover, isolating instruments formalizes the identity of the music's sounds. It's a bit like picking an orchestra!

While I love the _module_ format, there are still issues:
- Each module file contains its own orchestra
- There are many module formats
- No module format is close to being standard

Because of these, I don't see any significant advantage in using module files in video games. Instead, there must be some sort of standard in order to separate instruments from music...


## Modern music composition

Modern video game music seems to have converged with regular "song" music along with the evolution of Digital Audio Workstations.
Most games embed compressed raw audio data and it makes sense for most game dev studios that have a dedicated musicians.

Producing raw audio gives maximum flexibility in creation: the musician can use and endless variety of instruments, effects, filters, mixes... On top of that, raw audio is very easy to play in the game itself and is, of course, standard.

However, the indie game developer who wants super-dynamic music progressions, the hobbyist who doesn't master music that well, or the studio who wants to enforce strong auditive identity in a game as lean as possible have reasons to be frustrated.

Indeed, in a developer's mind: why not **making music programmatic**? Graphics can easily be, so why not music?

There is a standard for having instruments communicate together and with computers: [**MIDI**](https://en.wikipedia.org/wiki/MIDI). Instead of transferring raw audio, the MIDI protocol consists in transferring simpler abstract signals that will be interpretated according to the receiver. For instance, a MIDI signal can consist of a note with a certain velocity, and the next signal most probably is the release of this note (note off). In this scenario, the same MIDI signals can trigger a very loud note with an echo, a quiet sharp note or even be interpretated as VJ light changes!

MIDI is the standard abstraction layer for digital music and a series of signals can be stored in a _.mid_ file (called _Standard MIDI File_ or **SMF**).
