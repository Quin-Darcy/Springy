// Constants
let W = window.innerWidth;
let H = window.innerHeight;
let P = 18;
let THETA = (2 * Math.PI) / P;
let RADIUS = 400;
let R = 3;
let D = 0.89;
let G = 9.8;
let COR = 0.91;
let HARDNESS = 0.1;
let MU = -0.9;
let I = -1;

// Arrays
let points = [];

function setup() {
    createCanvas(W, H);
    background(255);
    for (let i = 0; i < P; i++) {
        let rand = 0;
        let X = floor(W / 2 + RADIUS * cos(i * THETA));
        let Y = floor(H / 2 + RADIUS * sin(i * THETA));
        let U = rand * cos(i * THETA + Math.PI / 2);
        let V = rand * sin(i * THETA + Math.PI / 2);
        let M = 4;
        let A = 0;//floor(random(2));
        points[i] = new Point(X, Y, U, V, M, i, R, A);
        points[i].k = 0.06;//random(0.0001, 0.3);
        points[i].l = RADIUS * THETA;//random(40, 95);
        if (i > 0) {
            points[i].n = i - 1;
        }
    }
    points[0].n = P - 1;
}

function mouseDragged() {
    for (let i = 0; i < P; i++) {
        if (dist(mouseX, mouseY, points[i].pos.x, points[i].pos.y) <= R) {
            I = i;
        }
    }
    if (I != -1) {
        points[I].pos.x = mouseX;
        points[I].pos.y = mouseY;
    }
}

function mouseReleased() {
    I = -1;
}

function draw() {
    background(0);
    for (let i = 0; i < P; i++) {
        let p1 = points[i];
        let p2 = points[p1.n];
        fill(255);
        stroke(255);
        line(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y)
        points[i].show();
        for (let j = 0; j < P; j++) {
            if (j != i) {
                points[i].collision(j)
            }
        }
        points[i].update();
    }
}