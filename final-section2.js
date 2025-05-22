samples({ whistle: 'whistle.wav' }, 'github:linklin830912/wav')

setcpm(90/4)

let bubble_slider_min = slider(5, 5, 30).ceil();
let bubble_slider_max = slider(46.89, 30, 60).ceil();

// whistle+wave > whistle+wave+boat > whistle+wave(allquet - splash) > whistle+wave / bubble
let bubble_gain = arrange(
    [1, "0"],
    [6, "<1 0 .5>"],
    [3, "8 5 6 3 5"],
    [6, "1 0 1.5 .5 0 .5 1.2 0 1.3 .5 0 .5 .3 .8"],
    [3, ".3 0 .5 .2 0 .2 1 0 0 .5 0 .5 .3 1"],
    [2, "0"],
).gain();

let whistle_gain = arrange(
    [1, "0"],
    [6, "<0 .2 .05>"],
    [3, "0"],
    [6, "0"],
    [3, "0"],
    [2, "0"],
).gain();

let signal_gain = arrange(
    [1, "0"],
    [6, "0"],
    [3, "0"],
    [6, "0"],
    [3, "0"],
    [1, "0"], [1, "1"],
).gain();

let wave_gain = arrange(
    [1, "15"],
    [6, "<.2 3 2>"],
    [1, "3 2.5 2 1.5 1 .5"], [1, ".3 .2 .1 .05"], [1, ".05 0 0"],
    [6, "0"],
    [3, "0"],
    [2, "0"],
).gain();  

let small_fish_gain = arrange(
    [1, "0"],
    [6, "0"],
    [3, "0"],
    [1, ".1 .2 .3 .4. .5 .2 .1 .0 .0"], [1, "2 1 .8 1"], [2, "1 0 1.5 .5 0 .5 1.2 0 1.3 .5 0 .5 .3 .8"], [2, ".1 0 .5 .6 0 .3 .2 .8 .3 .3 0 .2 .3 .1"],
    [3, ".4 .3 .5 .2 0 .2 .5 0 .7 .5 0 .5 .3 .5"],
    [2, "0"],
).gain();

let crab_gain = arrange(
    [1, "0"],
    [6, "0"],
    [3, "0"],
    [3, "0"], [1, ".03 .05 .1 .2 .3 "], [2, ".4 .5 .6 .7 .8"],
    [3, ".3 .5 .2 .1 1 .9 .8 .5 .5 .3 1"],
    [2, "0"],
).gain();

let light_gain = arrange(
    [1, "0"],
    [6, "0"],
    [3, "0"],
    [1, "1.5 1 .8 .6"], [5, ".8 1 .5 .2 1 .8"],
    [3, "1.8 2 .5 1 .5 2 1.8"],
    [2, "0"],
).gain();

let mel0_note = "g1 [d1 e1 g1] a1 <g2 e1> [e2 f2 g2] g1".lastOf(3, x=>x.rev()).sub("<0 2 5 3 6 0 2 7 4 5 0 7>");

let whistle0_end = ".3 [.2 .2 .2] .3 .3 [.2 .2 .2] .3 ";
let whistle0_delay = whistle0_end;
let whistle0_release = whistle0_end.add(0);

let whistle0 = note(mel0_note).sound("whistle")
    .begin(".0").end(whistle0_end).delay(whistle0_delay).release(whistle0_release)
    .hpf(800).hpq(0).lpf(1000).lpq(0).room(1).roomsize(2)
    .set(whistle_gain);

let light = n("<1 4 [6 9]>@6 <3 5 [2 4 6]>@12".add(21)).sound("wind").sustain(.5).delay("<3 6 8>").release(10).room(1).roomsize(4).lpf(1000).set(light_gain)

let bubble = note("<[c0 c0 c0 c0] [c0 d0 c0] [c0 c0 c0 c0 [c0 c0 c0]] [c0 c0 c0 c0] [c0 c0]>!12".sub(sine.range(bubble_slider_min, bubble_slider_max)))
    .s("z_noise").zrand(0).lastOf(2, x => x.jux(rev)).hpf(800)
    .set(bubble_gain)
    .color("#78C2C4").punchcard({vertical: 1, flipTime: 1});

let mel0_n = "5 [2 3 5] 6 <12 3> [10 11 12] 5 ".lastOf(3, x => x.rev()).sub("<0 2 5 3 6 0 2 7 4 5 0 7>")
    .degradeBy(0.3).sometimesBy(.4, x => x.speed("0.5"));

let small_fish_delay = "2 [.3 .3 .5] 2 .3 [.3 .3 .5] 2"

let wave = note("g3 [g3@3 [g3@2 g3 g3] g3 <[g3@3 g3 g3] [g3 g3@6 g3]> g3@2 [g3 g3@2] g3@5]".lastOf(4, x => x.rev()))
    .sound("<pink brown>").release(2).decay("2").sustain(.7).hpf(800).hpq(0)
    .cutoff("<3000 4000 5000 2000>")
    .set(wave_gain)
    .color("white")._scope({ width: 3000, height: 200 })
let small_fish = n(mel0_n)
    .off(1 / 8, add(n(5)))
    .off(1 / 5, add(n(7)))
    .scale("c3:major:pentatonic")
    .s('sawtooth').delay(small_fish_delay).lpf(1200).lpq(0)
    .dec(.3).room(2).set(small_fish_gain)
  .color("#91AD70")._punchcard({width:2500, height:300});

let crab = sound("bd rim <[jazz:2 mt]*10 [jazz:2 jazz:2 lt]*12 [jazz:2 jazz:2 lt]*15> <[jazz:2 mt]*15 [jazz:2 jazz:2 lt]*13 [jazz:2 jazz:2 mt]*12> <[jazz:2 mt]*12 [jazz:2 jazz:2 lt]*15 [jazz:2 jazz:2 ht]*10>")
  .jux(press).degradeBy(.9).hpf(500).hpq(10).attack(0).sustain(2).delay(0).set(crab_gain)
  .color("#FFB11B")._punchcard({width:2500, height:300})
let signal = note("<[c0 c0 c0 c0 c0 c0] - -> - - g1 [d1 e1 g1] <a1 f1> - <g2 e1> [e2 f2 g2] <c1 g1>".add(28)).sound("sawtooth").noise("0.25").attack(0.2).sustain(1).delay(0.3)
  .set(signal_gain).room(1)
  .color("#E16B8C")._punchcard({width:2500, height:300})
let check_time = arrange(
    [1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"], [1, "1"], [1, "1"], [1, "1"], [1, "1"], [1, "1"], [1, "1"], [1, "1"], [1, "1"], //GO TO section 3
).gain();

let nop = n("0").set(check_time);

stack(
    bubble,
    whistle0,
    signal,
    wave,
    light,
    small_fish,
    crab,
    nop
).slow(1.5);