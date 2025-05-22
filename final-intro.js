samples({ whistle: 'whistle.wav' }, 'github:linklin830912/wav')

setcpm(90/4)

// whistle+wave > whistle+wave+boat > whistle+wave+signal

let whistle_gain = arrange(
        [1, ".3"], [1, ".3 .4 .5"], // whistle+wave
        [1, ".6 .7 .8"], [1, ".8"], [1, ".8"], [1, ".8"], // whistle+wave+boat
        [1, ".5 .3 .1 .0"], [1, "0"], [1, "0"],
    ).gain()

let signal_gain = arrange(
        [2, "0"], 
        [4, "0"], 
        [1, "0"], [1, "0"], [1, "2"],
    ).gain()

let wave_gain = arrange(
        [1, "0"], [1, ".1 .2 .3 .4"], 
        [1, "1.5  0 0"], [3, "2.5 0 0"],
        [1, ".8 0 0"], [1, "0"], [1, "0"],
    ).gain()

let boat_gain = arrange(
        [2, "0"], 
        [1, ".2 .5 1"], [3, "2 .2 .8"],
        [1, "1.2 .1 .3"], [1, "0"], [1, "0"],
    ).gain()

let mel0_note = "g1 [d1 e1 g1] a1 <g2 e1> [e2 f2 g2] g1".lastOf(3, x=>x.rev()).sub("<0 2 5 3 6 0 2 7 4 5 0 7>");

let whistle0_end = ".3 [.2 .2 .2] .3 .3 [.2 .2 .2] .3 ";
let whistle0_delay = whistle0_end;
let whistle0_release = whistle0_end.add(0);

let whistle0 = note(mel0_note).sound("whistle")
  .begin(".0").end(whistle0_end).delay(whistle0_delay).release(whistle0_release)
  .hpf(800).hpq(0).lpf(1000).lpq(0).room(1).roomsize(2)
  .set(whistle_gain)

let boat = sound("[bd bd bd - - <sd rim> sd ] - - - [bd bd - bd - - <sd rim> sd ] - - -").lpf(600).lpq(10).set(boat_gain)

let wave = note("g3 [g3@3 [g3@2 g3 g3] g3 <[g3@3 g3 g3] [g3 g3@6 g3]> g3@2 [g3 g3@2] g3@5]".lastOf(4, x=>x.rev()))
.sound("<pink brown>").release(2).decay("2").sustain(.7).hpf(800).hpq(0)
.cutoff("<3000 4000 5000 2000>")
.set(wave_gain)
.color("white")._scope({ width: 3000, height: 200 })

let signal = note("<[c0 c0 c0 c0 c0 c0] - -> - - g1 [d1 e1 g1] <a1 f1> - <g2 e1> [e2 f2 g2] <c1 g1>".add(28)).sound("sawtooth").noise("0.25").attack(0.2).sustain(1).delay(0)
  .set(signal_gain)
  .color("#E16B8C")._punchcard({playhead: 0, width:2500, height:300});

let check_time = arrange(
    [1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"],[1, "1"], //GO TO section 2
).gain();

let nop = n("0").set(check_time);

stack(
    whistle0,
    signal,
    wave,
    boat,
    nop,
).slow(1.5);