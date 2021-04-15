class Point {
    constructor(x, y, u, v, m, id, r, a) {
        this.pos = createVector(x, y);
        this.vel = createVector(u, v);
        this.m = m;
        this.id = id;
        this.r = r;
        this.k;
        this.l;
        this.n;
        this.a = a;
    }
    show() {
        let V = this.vel.magSq();
        let S = p5.Vector.sub(this.pos, points[this.n].pos).magSq();
        let p = points[this.n];
        if (COLOR === 1) {
            colorMode(HSB, MAX_TEN, 1, 1)
            stroke(S, 1, 1);
            line(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
        } else {
            stroke(255);
            line(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
        }
        colorMode(HSB, MAX_VEL, 1, 1)
        fill(V, 1, 1);
        ellipse(this.pos.x, this.pos.y, 2 * this.r);
    }
    collision(i) {
        let dx = points[i].pos.x - this.pos.x;
        let dy = points[i].pos.y - this.pos.y;
        let center_dist = dist(dx, dy, 0, 0);
        let touching_dist = points[i].r + this.r;
        let gamma = asin(center_dist / this.r);
        let delta1 = this.pos.angleBetween(p5.Vector.sub(points[i].pos, points[points[i].n].pos)); 
        if (center_dist < touching_dist || delta1 <= gamma) {
            let theta = atan2(dy, dx);
            let new_x = this.pos.x + cos(theta) * touching_dist;
            let new_y = this.pos.y + sin(theta) * touching_dist;
            let a_x = (new_x - points[i].pos.x) * COR;// - this.m;
            let a_y = (new_y - points[i].pos.y) * COR;// - this.m;
            this.vel.x -= a_x * HARDNESS;// / Math.pow(this.m, 2);
            this.vel.y -= a_y * HARDNESS;// / Math.pow(this.m, 2);
            points[i].vel.x += a_x * HARDNESS;
            points[i].vel.y += a_y * HARDNESS; 
        }
        
    }
    update() {
        for (let i = 0; i < P; i++) {
            if (i != this.id) {
                let d = p5.Vector.sub(this.pos, points[i].pos);
                let mag = d.magSq() + 1000;
                d.setMag(G * (this.m * points[i].m) / mag);
                this.vel.add(d);
            }
        }
        let force = p5.Vector.sub(this.pos, points[this.n].pos);

        let x = (force.mag() - this.l) * WEAKEN;
        force.normalize();
        force.mult(-1 * this.k * x);

        this.vel.add(force);
        this.pos.add(this.vel);
        this.vel.mult(D);

        if (this.pos.x + this.r > W) {
            this.pos.x = W - this.r;
            this.vel.x = this.vel.x * COR * MU;
        } else if (this.pos.x - this.r < 0) {
            this.pos.x = this.r;
            this.vel.x = this.vel.x * COR * MU;
        }
        if (this.pos.y + this.r >= H) {
            this.pos.y = H - this.r;
            this.vel.y = this.vel.y * COR * MU;
        } else if (this.pos.y - this.r < 0) {
            this.pos.y = this.r;
            this.vel.y = this.vel.y * COR * MU;
        }
    }
}