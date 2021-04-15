// Constants
let W = window.innerWidth;
let H = window.innerHeight;
let P = 7;
let THETA = (2 * Math.PI) / P;
let RADIUS;
if (W >= H) {
    RADIUS = H / 2 - H / 9;
} else {
    RADIUS = W / 2 - W / 9;
}
let R = 3;
let D = 0.89; // Dampen value
let G = 9.8;
let COR = 0.91;
let HARDNESS = 0.1;
let MU = -0.9;
let I = -1;
let MAX_VEL = 0;
let MAX_TEN = 0;
let COLOR = 1;
let V0 = 1;
let POINT_MASS = P / (P + 1);
let K = P / (Math.pow(P, 2)); // Springiness
let WEAKEN = 0.26;

// Arrays
let points = [];

function setup() {
    createCanvas(W, H);
    background(0);
    for (let i = 0; i < P; i++) {
        let X = floor(W / 2 + RADIUS * cos(i * THETA));
        let Y = floor(H / 2 + RADIUS * sin(i * THETA));
        let U = V0 * cos(i * THETA + Math.PI / 2);
        let V = V0 * sin(i * THETA + Math.PI / 2);
        let A = 0;
        points[i] = new Point(X, Y, U, V, POINT_MASS, i, R, A);
        points[i].k = K;
        points[i].l = RADIUS * THETA;
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
    let avg = 0;
    background(0);
    for (let i = 0; i < P; i++) {
        let p1 = points[i];
        let p2 = points[p1.n];
        let V = points[i].vel.magSq();
        points[i].show();
        for (let j = 0; j < P; j++) {
            if (j != i) {
                points[i].collision(j)
            }
        }
        if (points[i].vel.magSq() > MAX_VEL) {
            MAX_VEL = points[i].vel.magSq();
        }
        if (p5.Vector.sub(points[i].pos, points[points[i].n].pos).magSq() > MAX_TEN) {
            MAX_TEN = p5.Vector.sub(points[i].pos, points[points[i].n].pos).magSq();
        }
        points[i].update();
    }
}