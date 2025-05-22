samples({ whistle: 'whistle.wav', whale: 'angelic.wav', shark: 'guy.wav'}, 'github:linklin830912/wav')

setcpm(90/4)

let bubble_slider_min = slider(5, 5, 30).ceil();
let bubble_slider_max = slider(46.89, 30, 60).ceil();

// bubble > bubble+fish+crab+light > bubble+crab+light > signal > bubble+light
let bubble_gain = arrange(
    [2, "1 0 1.5 .5 0 .5 1.2 0 1.3 .5 0 .5 .3 .8"],
    [3, "1 0 1.5 .5 0 .5 1.2 0 1.3 .5 0 .5 .3 .8"],
    [6, "1 0 1.5 .5 0 .5 1.2 0 1.3 .5 0 .5 .3 .8"],
    [6, ".5 0 .5 .5 0 .3 .8 0 .3 .5 0 .5 .3 .2"],
    [3, "1 .5 .8 .3 .2 .8 1 .6"],
    [3, "0"],
).gain();

let light_gain = arrange(
    [2, "1.8 2 .5 1 .5 2 1.8"],
    [3, "1.5 1 .8 .6"],
    [6, ".5 .4 .8 .6"],
    [6, ".5 .4 .3 .6"],
    [1, ".8 .7 .6 .5 .4 .3 .2 .1"], [1, "0"], [1, "0"],
    [3, "0"],
).gain();

let signal_gain = arrange(
    [2, "0"],
    [2, "1"], [1, "0"],
    [1, ".8"], [5, "0"],
    [6, "0"],
    [3, "0"],
    [3, "0"],
).gain();

let alarm_gain = arrange(
    [2, "0"],
    [3, "0"],
    [6, "0"],
    [6, "0"],
    [3, "0"],
    [1, "0"], [1, "1"], [1, "1"],
).gain();

let alarm_decay = arrange(
    [2, "0"],
    [3, "0"],
    [6, "0"],
    [6, "0"],
    [3, "0"],
    [1, "0"], [1, ".3"], [1, ".3"],
).decay();

let whale_gain = arrange(
    [2, "0"],
    [2, "0"], [1, ".1 .2 .3"],
    [1, ".1 .2 .3"], [1, ".3 .6 .9"], [4, "1 1.2  1.5 1"],
    [2, "1 .8  .2 1"], [1, ".9 .8 .7 .6"], [1, ".5 .4 .3 .2 .1"], [2, "0"],
    [3, "0"],
    [3, "0"],
).gain();

let shark_gain = arrange(
    [2, "0"],
    [3, "0"],
    [6, "0"],
    [1, ".3 .6 .9"], [5, "1 1.2  1.5 1"],
    [1, "1 .5  .2 .1"], [1, "0"], [1, "0"],
    [3, "0"],
).gain();

let dark_gain = arrange(
    [2, "0"],
    [3, "0"],
    [6, "0"],
    [6, "0"],
    [1, ".1"], [1, ".1"], [1, "6"],
    [3, "0"],
).gain();

let mel0_note = "g1 [d1 e1 g1] <a1 f1> - <g2 e1> [e2 f2 g2] <c1 g1>".lastOf(3, x=>x.rev()).sub("<0 2 5 3 6 0 2 7 4 5 0 7>".sub(10));
let mel1_note = "[<e1 b1> d1 e1] g1 <f1 a1> - [<e1 g2> e2 f2] g2 <g1 c1>".lastOf(3, x=>x.rev()).sub("<0 2 5 3 6 0 2 7 4 5 0 7>".sub(14));
let mel0_n = "- - - - - - - - 5 [2 3 5] 6 <12 3> [10 11 12] 5 - - - - - - - - 5 [2 3 5] 6 <12 3> [10 11 12] 5";

let whale_end = ".3 [.2 .2 .2] .3 .3 [.2 .2 .2] .3 ";
let whale_delay = whale_end.add(0.5);
let whale_release = whale_end.add(0);

let shark_end = ".3 [.2 .2 .2] .3 .3 [.2 .2 .2] .3 ".add(0.1);
let shark_delay = whale_end.add(0.8);
let shark_release = whale_end.add(0);

let signal = note("<[c0 c0 c0 c0 c0 c0] - -> - - g1 [d1 e1 g1] <a1 f1> - <g2 e1> [e2 f2 g2] <c1 g1>".add(28)).sound("sawtooth").noise("0.25").attack(0.2).sustain(1).delay(0.3)
  .set(signal_gain).room(1)
  .color("#E16B8C")._punchcard({width:2500, height:300, flipTime:1})

let whale = note(mel0_note).sound("whale")
  .begin(".0").end(whale_end).delay(whale_delay).release(whale_release)
  .hpf(600).hpq(0).room(2).roomsize(2)
  .set(whale_gain)
.color("#B481BB")._punchcard({width:2500, height:300})

let shark = note(mel1_note).sound("shark")
  .begin(".0").end(shark_end).delay(shark_delay).release(shark_release)
  .hpf(500).hpq(0).room(2).roomsize(2)
.set(shark_gain)
.color("#006284")._punchcard({width:2500, height:300})

let dark = note("c0@5").sound("piano").attack(0).sustain(4).decay(5).release(10).hpf(500).hpq(0).vib("1")
.set(dark_gain)
.color("#3C2F41")._punchcard({width:2500, height:300})

let bubble = note("<[c0 c0 c0 c0] [c0 d0 c0] [c0 c0 c0 c0 [c0 c0 c0]] [c0 c0 c0 c0] [c0 c0]>!12".sub(sine.range(bubble_slider_min, bubble_slider_max)))
.color("#78C2C4").punchcard({vertical: 1, flipTime: 1});



let alarm = n(mel0_n.lastOf(2, x=>x.add(3)).lastOf(3, x=>x.add(7)).lastOf(4, x=>x.add(10))).scale("C:minor")
   .sound("sawtooth").attack(0).sustain(2).set(alarm_decay)
  .set(alarm_gain)
  .room(1)
.color("red")._punchcard({width:2500, height:300, flipTime:1})

let light = n("<1 4 [6 9]>@6 <3 5 [2 4 6]>@12".add(21)).sound("wind").sustain(.5).delay("<3 6 8>").release(10).room(1).roomsize(4).lpf(1000).set(light_gain)
.color("white").punchcard({vertical: 1});

let check_time = arrange(
    [1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"], [1, "1"], [1, "1"], [1, "1"], [1, "1"], [1, "1"], [1, "1"], [1, "1"], [1, "1"], [1, "1"], [1, "1"] //GO TO ending
).gain();

let nop = n("0").set(check_time);

stack(
    whale,
    shark,
    dark,
    light,
    bubble,
    signal,
    alarm,
    nop
).slow(1.8);