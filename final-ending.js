samples({ whistle: 'whistle.wav', whale: 'angelic.wav', shark: 'guy.wav'}, 'github:linklin830912/wav')

setcpm(90/4)

let bubble_slider_min = slider(5, 5, 30).ceil();
let bubble_slider_max = slider(46.89, 30, 60).ceil();

// light+signal+bubble > light+signal+bubble+whale > light+signal+bubble+whale+shark > light+bubble+shark+darkness > alarm >bubble
let bubble_gain = arrange(
    [3, "8 3 8 7"],
    [2, "0"],
    [1, "0"],
    [3, "0"],
    [3, "0"],
    [3, "0"],
    [10, "0"],
).gain();

let bubble_shuttle_gain = arrange(
    [1, "5 4 3 2"], [1, "2 1"], [1, "1 .5"],
    [2, "0"],
    [1, "0"],
    [3, "0"],
    [3, "0"],
    [3, "0"],
  [10, "0"],
).gain();

let light_gain = arrange(
    [1, "0"], [1, ".3 .5 .7 1 1.5 2"], [1, "3"],
    [2, "0"],
    [1, "0"],
    [3, "0"],
    [3, "0"],
    [3, "0"],
  [10, "0"],
).gain();

let signal_gain = arrange(
    [3, "0"],
    [2, "0"],
    [1, "0"], 
    [3, "0"], 
    [1, "0"], [1, "2"],[1, "0"],
    [3, "0"],
  [10, "0"],
).gain();


let alarm_gain = arrange(
    [1, ".8 .6 .4 .2 .1"], [1, ".05"], [1, "0"],
    [2, "0"],
    [1, "0"],
    [3, "0"],
    [3, "0"],
    [3, "0"],
  [10, "0"],
).gain();

let alarm_decay = arrange(
    [1, ".3 .25 .2"], [1, ".15 .12 .1"], [1, ".1 .05 0"],
    [2, "0"],
    [1, "0"],
    [3, "0"],
    [3, "0"],
    [3, "0"],
  [10, "0"],
).decay();

let whale_gain = arrange(
    [3, "0"],
    [2, "0"],
    [1, "0"], 
    [3, "0"],
    [2, "0"], [1, "0  .2"],
    [1, ".2 .2 .5"], [2, ".5 1 .2"],
  [10, "0"],
).gain();

let wave_gain = arrange(
    [3, "0"],
    [2, "15 8 12 9"],
    [1, "5 12 8"], 
    [3, ".5 .7 .9"],
    [1, ".5 .7 .9"], [1, "0"],[1, ".5 .7 .9"],
    [1, ".05 .05 .2"], [2, ".5 .7 .9"],
  [10, "0"],
).gain();

let whistle_gain = arrange(
    [3, "0"],
    [2, "0"],
    [1, ".6 .7 .8"],
    [3, ".8"],
    [3, "0"],
    [3, ".8 1 .9"],
  [10, "0"],
).gain();

let boat_gain = arrange(
    [3, "0"],
    [2, "0"],
    [1, "0"],
    [3, ".5 1 .8"],
    [3, "0"],
    [3, "0"],
  [10, "0"],
).gain();




let mel0_note = "g1 [d1 e1 g1] <a1 f1> - <g2 e1> [e2 f2 g2] <c1 g1>".lastOf(3, x=>x.rev()).sub("<0 2 5 3 6 0 2 7 4 5 0 7>".sub(10));
let mel1_note = "[<e1 b1> d1 e1] g1 <f1 a1> - [<e1 g2> e2 f2] g2 <g1 c1>".lastOf(3, x=>x.rev()).sub("<0 2 5 3 6 0 2 7 4 5 0 7>".sub(14));
let mel0_n = "- - - - - - 5 [2 3 5] 6 <12 3> [10 11 12] 5 - - - - - - 5 [2 3 5] 6 <12 3> [10 11 12] 5";

let whale_end = ".3 [.2 .2 .2] .3 .3 [.2 .2 .2] .3 ";
let whale_delay = whale_end.add(0.5);
let whale_release = whale_end.add(0);

let bubble = note("<[a0 c0 d0 g0] [c0 d0 a0] [c0 d0 e0 a0 [g0 d0 a0]] [c0 a0 g0 d0] [c0 d0]>!12".sub(sine.range(bubble_slider_min, bubble_slider_max)))
  .color("#78C2C4").punchcard({vertical: 1, flipTime: 1});
  
let bubble_shuttle = note("<[c0 d0 e0 a0 [b0 f0 c0]] [f0 e0 g0 c0] [a0 d0 b0] [g0 c0 b0 a0 [e0 g0 b0]] [c0 g0 e0 g0] [a0 c0]>!12".rev())
.s("z_noise").zrand(0).lastOf(2, x=>x.jux(rev)).hpf(800)
.set(bubble_shuttle_gain)
.color("#33A6B8").punchcard({vertical: 1, flipTime: 1});
  

let alarm = n(mel0_n.lastOf(2, x => x.add(3)).lastOf(3, x => x.add(7)).lastOf(4, x => x.add(10))).scale("C:minor")
    .sound("sawtooth").attack(0).sustain(2).set(alarm_decay)
    .set(alarm_gain)
    .room(1);

let light = n("<1 4 [6 9]>@6 <3 5 [2 4 6]>@12".add(21)).sound("wind").sustain(.5).delay("<3 6 8>").release(10).room(1).roomsize(4).lpf(1000).set(light_gain)

let whistle0_end = ".3 [.2 .2 .2] .3 .3 [.2 .2 .2] .3 ";
let whistle0_delay = whistle0_end;
let whistle0_release = whistle0_end.add(0);

let whale = note(mel0_note).sound("whale")
  .begin(".0").end(whale_end).delay(whale_delay).release(whale_release)
  .hpf(600).hpq(0).room(2).roomsize(2)
  .set(whale_gain)
.mask("<1 1 1 1 1 1 1 1 1 1 1 1 [1 0] [0 1] 1>")

let whistle0 = note(mel0_note).sound("whistle")
  .begin(".0").end(whistle0_end).delay(whistle0_delay).release(whistle0_release)
  .hpf(800).hpq(0).lpf(1000).lpq(0).room(1).roomsize(2)
  .set(whistle_gain)
.mask("<1 1 1 1 1 1 1 1 1 1 1 1 [0 1] [1 0] 1>")

let boat = sound("[bd bd bd - - <sd rim> sd ] - - - [bd bd - bd - - <sd rim> sd ] - - -").lpf(600).lpq(10).set(boat_gain);

let signal = note("<[c0 c0 c0 c0 c0 c0] - -> - - g1 [d1 e1 g1] <a1 f1> - <g2 e1> [e2 f2 g2] <c1 g1>".add(28)).sound("sawtooth").noise("0.25").attack(0.2).sustain(1).delay(0)
  .set(signal_gain)
  .color("#E16B8C")._punchcard({width:2500, height:300, flipTime: 1})


let wave = note("g3 [g3@3 [g3@2 g3 g3] g3 <[g3@3 g3 g3] [g3 g3@6 g3]> g3@2 [g3 g3@2] g3@5]".lastOf(4, x => x.rev()))
    .sound("<pink brown>").release(2).decay("2").sustain(.7).hpf(800).hpq(0)
    .cutoff("<3000 4000 5000 2000>")
    .set(wave_gain)
    .color("white")._scope({ width: 3000, height: 200 })
let check_time = arrange(
    [1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"], [1, "1"], //END
).gain();

let nop = n("0").set(check_time);


stack(
    whale,
    light,
    bubble,
    bubble_shuttle,
    signal,
    alarm,
    whistle0,
    wave,
    boat,
    nop
).slow(1.5);