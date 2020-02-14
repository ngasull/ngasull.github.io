---
layout: post
permalink: "making-music-programmable-again"
title:  "Making music programmable again"
date:   2020-02-08 10:00:00 +0100
categories: music gamedev
---

For adepts of retro-gaming who have some foundation in music, retro-gaming music is a nice area to dig into: it has restrictive musicality, which enables to focus on composition and strong auditive identity.
But after weeks or even months of research, I came to realize how sub-developed music synthesis could be in interactive systems like video games.

This article gives some context about how music used to be made in video games,
how game music composition evolved over the years,
and eventually opens some doors to new creative horizons.


## Game music in the 90's

Retro games used to synthesize sound on-the-go by the device's sound chip or card. This is why retro game music is often referred as **chiptune**.
Many artists [still compose chiptune nowadays](http://battleofthebits.org/) - maybe because nostalgia, or maybe because chiptune focuses on composition rather than picking and tweaking instruments, effects and mastering.
Anyhow, it's an amazing discipline for the hobbyist composer!

<figure>
  <audio controls>
    <source src="{{ "/assets/audio/flamerepellent-sunvox.ogg" | relative_url }}" type="audio/ogg">
  </audio>
  <figcaption>Quick copycat I made based off <a href="https://fearofdark.bandcamp.com/album/the-coffee-zone">Fearofdark's amazing work ❤️</a></figcaption>
</figure>

Chiptune is often composed with a _tracker_.
In a tracker, audio channels are explicitly separated across vertical **tracks**, notes are textually sequenced and can each have its own **instrument** and receive a variety of effects.
Trackers are here to allow composition while enforcing control over audio channels.


<figure>
  <img alt="FastTracker2 screenshot" src="{{ "/assets/img/FastTracker2.png" | relative_url }}" />
  <figcaption>FastTracker 2, a DOS music tracker</figcaption>
</figure>

Although many claim the benefits of the tracker layout because of its compactness, I still think it's rather outdated and prevents picturing the music well. The main alternative layout, the **piano roll**, comes closer to music sheets which are the standard of music composition. Notes can intuitively be spanned across time, and music layers can be "drawn".

<figure>
  <img alt="LMMS screenshot" src="{{ "/assets/img/LMMS_PianoRoll.png" | relative_url }}" />
  <figcaption>Piano roll in LMMS</figcaption>
</figure>

Piano rolls are an essential component of many modern [Digital Audio Workstations (DAW)](https://en.wikipedia.org/wiki/Digital_audio_workstation). Although more visual than trackers, different piano rolls might have many varying features between each other, whereas all trackers are mostly the same.
This has an impact on **how little standard piano roll based DAWs** are.

Most trackers produce [**module files**](https://en.wikipedia.org/wiki/Module_file). These files basically separate the **instruments** from the **notes** and **effects**.
A consequence from separating the instruments' sound data is that the module file is usually **much smaller** than raw audio data.
Moreover, isolating instruments formalizes the identity of the music's sounds. It's a bit like picking an orchestra!

While I love the _module_ format, there are still issues:
- Each module file contains its own orchestra
- There are many module formats
- No module format is close to being standard

Because of these, I don't see any significant advantage in using module files in video games. Instead, there must be some sort of standard in order to separate instruments from music...


## Modern music composition

Modern video game music seems to have converged with regular "song" music along with the evolution of DAWs.
Most games embed compressed raw audio data and it makes sense for most game dev studios that have a dedicated musicians.

Producing raw audio gives maximum flexibility in creation: the musician can use and endless variety of instruments, effects, filters, mixes... On top of that, raw audio is very easy to play in the game itself and is, of course, standard.

However, for the indie game developer who wants super-dynamic music progressions, for the hobbyist who doesn't master music that well, or for the studio who wants to enforce strong auditive identity in a game as lean as possible: they have reasons to be frustrated.

Indeed, in a developer's mind: why not **making music programmatic**? Graphics can easily be, so why not music?

There is a standard for having instruments communicate together and with computers: [**MIDI**](https://en.wikipedia.org/wiki/MIDI). Instead of transferring raw audio, the MIDI protocol consists in transferring **simpler abstract signals** that will be interpretated according to the receiver. For instance, a MIDI signal can consist of a note with a certain velocity, and the next signal most probably is the release of this note (note off). In this scenario, the same MIDI signals can trigger a very loud note with an echo, a quiet sharp note or even be interpretated as VJ lighting changes!

MIDI is the standard abstraction layer for digital music. Signals can be realtime or can be stored in a _.mid_ file (called _Standard MIDI File_ or **SMF**). This gives us strong hopes for programmatic music! Provided a sound synthesis library, lightweight signals can become music.


### Synthesis from MIDI

MIDI now looks like an obvious choice for standard programmatic music.
However I had a hard time finding how to actually play it back from a game.
Most music learning resources and artists point to proprietary solutions, formats, which work for raw audio but removes programmatic freedom.

<figure>
  <img alt="Polyphone screenshot" src="{{ "/assets/img/Polyphone.png" | relative_url }}" />
  <figcaption>The Polyphone SoundFont editor</figcaption>
</figure>

The best solutions I found so far rely on [**SoundFonts**](https://en.wikipedia.org/wiki/SoundFont). Despite being non-standard, they are a well-accepted format to define a **bank of instruments**.
There are some great pieces of software that make great use of SoundFonts for our purpose, notably:
- [TiMidity](https://github.com/freeors/SDL/blob/master/SDL2_mixer-2.0.1/timidity/timidity.c), a basic midi player originally written for SDL back in the days (1995). It evolved into its separate repositories and can be used as a library, but is very limited
- [FluidSynth](https://github.com/FluidSynth/fluidsynth), a MIDI synthesis library specifically made to work with SoundFonts and play the music itself. FluidSynth is also easily embeddable in DAWs though a [VST](https://en.wikipedia.org/wiki/Virtual_Studio_Technology)

These libraries are amazing tracks to get started! But I'm still astonished by the small enthusiasm they grab.
A consequence of this is how hard it is to leverage the whole capabilities of FluidSynth in a DAW: most DAWs have their own way to manage effects and thus don't allow to export those as standard MIDI.
Moreover, even if **MIDI+Soundfont** looks like a "standard" combo, I don't know any good DAW that allows both MIDI composing and SoundFont creation/edition at the same time.


## Dynamic music synthesis in 2020?

Now we reach the point of many wonders. It seems like great music technologies from the 90's still exist but haven't reached their full potential.
This didn't prevent music itself to evolve, but what about the way music is used interactively?
There are countless video games out there, and aside massive franchises, very few are known for their music.
Worse than that: there are so few music games or games that integrate music as part of the gameplay.

Despite incredible technology evolutions, I feel like a whole dimension is missing from game development nowadays.
For hobbyists, music creativity should be as accessible as visual arts.
Music-rich games should be able to fit on a cartridge or a floppy disk like back in the days and should have a well-defined auditive identity.

If this article resonates with you too, feel free to share, [tweet](https://twitter.com/ngasull/status/1228238628729409536) or [reach out to me]({{ "/about#contact-me" | relative_url }}) and I'll be happy to know what you think and what we can do 🙂 I really believe that the creative community deserves better!
