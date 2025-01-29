from adafruit_circuitplayground import cp
import time
import random
#Define colors
pink = (12,10,12)
gold = (50, 40, 5)
blue = (0,0,8)
orange = (25, 10, 0)
blank = (0,0,0)
grn = (0,20,0)
green  = (0,20,0)
red = (20,0,0)
white = (20,20,20)

stars = [blank,red,green,blue,orange,white]

cosmos = []
system = []

pix = []
period = []
locs = []
counter =[]
def initUni(diam):
    # initialize the cosmos and names arrays
    global cosmos
    global system
    global dia
    cosmos = []
    system = []
    dia = diam
    for x in range(diam):
        if random.randrange(100) > 60:
            # 60% of the time create a star
            cosmos.append(random.randrange(1,5))
            system.append(random.randrange(1,4))
        else:  # nothing here put a zero and "" in the arrays
            cosmos.append(0)
            system.append(0)


def showspace(x):
    global cosmos
    global dia
    # display the 10 systems x
    cp.pixels.fill((0,0,0))

    for dx in range(10):
        cell = (x + dx)%(dia)
        if cosmos[cell] > 0:
            cp.pixels[dx] = stars[cosmos[cell]]


def clearplanets():
    for i in range(10):
        cp.pixels[i] = (0,0,0)
def showplanets():
    global locs
    global pix
    for p in range(4):
        a = pix[p]
        l = locs[p]
        cp.pixels[l] = a

def mvplanet(planet):
    global pix, period, locs, counter
    cp.pixels[locs[planet]]=(0,0,0)
    locs[planet] = (locs[planet]+1)%10

def setsys(star,sysn):
    global pix, period, locs, counter
    val = (5 * (star * star) * (sysn * sysn))%255
    pix = [(val, 0, 100), (0,00,val),(99, val, 80), (30, 0, val)]
    period = [val / 2, val, val * 1.5, val * 4]
    locs = [random.randrange(10), random.randrange(10) ,random.randrange(10),random.randrange(10)]
    counter = [0,0,0,0]



def orrery():
    global pix, period, locs, counter
    for p in range(4):
        counter[p] = counter[p]+1
        if counter[p]>period[p]:
            mvplanet(p)
            counter[p]=0

snames = ["move","stop","explore"]

move = 0
stop = 1
explore = 2
speed = 0

states = [move,stop,explore]

initUni(100)
loc = random.randrange(dia)
state = move
ship = 0

while True:
    if cp.shake(shake_threshold=15):
        cp.pixels.fill((0,100,0))
        time.sleep(1)
        print("reset")
        initUni(100)

    
    if state == explore:
#        clearplanets()
        orrery()
        showplanets()
    else:
        time.sleep(.2)
        showspace(loc)
    val = 0
    if cp.button_a and cp.button_b:
        val = 3
        time.sleep(.1)
    elif cp.button_a:
            val = 1
            time.sleep(.1)
    elif cp.button_b:
        val = 2
        time.sleep(.1)
    if val == 3:
        state = state +1
        if state > explore:
            state = move
        print("State:",snames[state])
        time.sleep(.5)
        if state == explore:
            clearplanets()

        if state == explore:
            if cosmos[loc+ship]==0:
                state = stop
            else:
                setsys(cosmos[loc+ship],system[loc+ship])
                print(pix)

    if state == move:
        if val == 1:
            speed = speed +1
            time.sleep(.1)
        if val == 2:
            speed = speed - 1
            time.sleep(.1)
        loc = ((loc + speed) + dia)%dia 

    if state == stop:
        save = cp.pixels[ship]
        cp.pixels[ship] = (10,10,10)
        time.sleep(.2)
        cp.pixels[ship] = save
        if val == 1:
            ship = ship - 1
            if ship < 0:
                ship = 9
        if val == 2:
            ship = ship + 1
            if ship > 9:
                ship = 0
    if cp.switch:
        while cp.switch:
            clearplanets()
            time.sleep(.5)
        state=move
        speed=0
    time.sleep(.1)
