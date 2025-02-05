function mkUni (diam: number) {
    cosmos = []
    sys = []
    for (let i = 0; i < diam; i++) {
        if (6 < Math.randomRange(0, 10)) {
            cosmos.push(Math.randomRange(1, 5))
            sys.push(Math.randomRange(1, 4))
        } else {
            cosmos.push(0)
            sys.push(0)
        }
    }
}
function orrery () {
    while (insys == state) {
        showPlanets()
        for (let p = 0; p <= 3; p++) {
            counter[p] = 1 + counter[p]
            if (period[p] <= counter[p]) {
                counter[p] = 0
                x = 1 + loc[p]
                loc[p] = x % 10
                pause(200)
            }
        }
    }
}
function mkSys (star: number, sysn: number) {
    val = 5 * (star * star) * (sysn * sysn)
    pix = [light.rgb(val, 0, 255), val, light.rgb(99, val, 156), light.rgb(99, 0, val)]
    period = [val / 2, val, val * 1.5, val * 4]
}
input.onGesture(Gesture.Shake, function () {
    if (!(input.switchRight())) {
        light.setAll(0x00ff00)
        speed = 0
        mkUni(d)
        pause(500)
        light.setAll(0x00ff00)
        state = travel
        shoSector(loct)
    }
})
function showPlanets () {
    light.setAll(0x000000)
    for (let index = 0; index <= 3; index++) {
        light.setPixelColor(loc[index], pix[index])
    }
}
function shoSector (sec: number) {
    light.setAll(0x000000)
    for (let index2 = 0; index2 <= 9; index2++) {
        spot = (index2 + sec) % d
        light.setPixelColor(index2, stars[cosmos[spot]])
    }
}
input.buttonB.onEvent(ButtonEvent.Click, function () {
    if (state == travel) {
        speed += -1
    }
    if (state == stop) {
        ship += -1
        if (ship < 0) {
            ship = 9
        }
    }
})
input.buttonA.onEvent(ButtonEvent.Click, function () {
    if (state == travel) {
        speed += 1
    }
    if (state == stop) {
        ship += 1
        if (ship > 9) {
            ship = 0
        }
    }
})
input.onSwitchMoved(SwitchDirection.Left, function () {
    light.setAll(0x000000)
    state = travel
})
input.onSwitchMoved(SwitchDirection.Right, function () {
    speed = 0
    state = travel
    shoSector(loct)
})
input.buttonsAB.onEvent(ButtonEvent.Click, function () {
    speed = 0
    state += 1
    if (2 < state) {
        state = 0
    }
    if (Colors.Black == light.pixelColor(ship) && insys == state) {
        state = stop
    }
})
let spot = 0
let val = 0
let x = 0
let sys: number[] = []
let cosmos: number[] = []
let state = 0
let insys = 0
let stop = 0
let travel = 0
let loct = 0
let stars: number[] = []
let d = 0
let speed = 0
let ship = 0
let counter: number[] = []
let loc: number[] = []
let period: number[] = []
let pix: number[] = []
let ps = []
let ls = []
pix = [Colors.Red, Colors.Yellow, Colors.Green, Colors.Purple]
period = [24, 62, 100, 188]
let planets = ["Mercury", "Venus", "Earth", "Mars"]
loc = [Math.randomRange(0, 9), Math.randomRange(0, 9), Math.randomRange(0, 9), Math.randomRange(0, 9)]
counter = [0, 0, 0, 0]
ship = 0
speed = 0
d = 100
stars = [Colors.Black, Colors.Orange, Colors.Indigo, Colors.Blue, Colors.Yellow, Colors.Green]
mkUni(d)
loct = 0
shoSector(loct)
travel = 0
stop = 1
insys = 2
state = travel
let states = [travel, stop, insys]
let days = [33, 69, 100, 150]
forever(function () {
    if (input.switchRight()) {
        if (state == travel) {
            if (0 != speed) {
                loct = (loct + (d + speed)) % d
                shoSector(loct)
                pause(200)
            }
        }
        if (state == stop) {
            light.setPixelColor(ship, light.rgb(23, 23, 23))
            pause(100)
            shoSector(loct)
            pause(200)
        }
        if (state == insys) {
            val = loct + ship
            mkSys(cosmos[val], sys[val])
            orrery()
            shoSector(loct)
        }
    } else {
        light.setAll(0x000000)
        pause(1000)
    }
})
