class t {
    constructor() {
        this.canvas = document.createElement("canvas"), this.canvas.id = "Jacksnipe-Canvas", this.width = null, this.height = null
    }
    makeDisplay(t, s) {
        this.width = t, this.height = s, this.canvas.width = t, this.canvas.height = s, window.ctx = this.canvas.getContext("2d"), window.canvas = this.canvas
    }
    static useDisplay(t) {
        document.body.appendChild(t.canvas)
    }
    resizeDisplay(t, s) {
        this.width = t, this.height = s, this.canvas.width = t, this.canvas.height = s
    }
    clearDisplay() {
        ctx.clearRect(0, 0, this.width, this.height)
    }
}
class s {
    constructor(t, s, i, h, a) {
        this.image = t, this.x = s, this.y = i, this.width = h, this.height = a
    }
    moveTo(t, s) {
        this.x = t, this.y = s
    }
    resize(t, s) {
        this.width = t, this.height = s
    }
}
class i {
    constructor() {
        this.actors = []
    }
    draw() {
        for (let t in this.actors) ctx.drawImage(this.actors[t].image, this.actors[t].x, this.actors[t].y, this.actors[t].width, this.actors[t].height)
    }
    addActor(t) {
        this.actors.push(t)
    }
}
class h {
    constructor(t, s, i, h) {
        this.x = t, this.y = s, this.width = i, this.height = h
    }
    static doRectsCollide(t, s) {
        return t.x < s.x + s.width && s.x < t.x + t.width && t.y < s.y + s.height && s.y < t.y + t.height
    }
    static areCoordsInside(t, s, i) {
        return s >= t.x && s <= t.right && i >= t.y && i <= t.bottom
    }
}
class a {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }, this.scale = {
            x: 1,
            y: 1
        }, this.left = 0, this.top = 0, this.right = 0, this.bottom = 0, this.width = 0, this.height = 0, this.distance = 1e3, this.fov = Math.PI / 4, this.aspectRatio = 0, this.updateCamera()
    }
    startCamera() {
        ctx.save(), this.applyScale(), this.applyTranslation()
    }
    stopCamera() {
        ctx.restore()
    }
    applyScale() {
        ctx.scale(this.scale.x, this.scale.y)
    }
    applyTranslation() {
        ctx.translate(-this.left, -this.top)
    }
    updateCamera() {
        this.aspectRatio = canvas.width / canvas.height, this.width = this.distance * Math.tan(this.fov), this.height = this.width / this.aspectRatio, this.left = this.position.x - this.width / 2, this.top = this.position.y - this.height / 2, this.right = this.left + this.width, this.bottom = this.top + this.height, this.scale.x = canvas.width / this.width, this.scale.y = canvas.height / this.height
    }
    setZoomLevel(t) {
        this.distance = t, this.updateCamera()
    }
    moveTo(t, s) {
        this.position.x = t, this.position.y = s, this.updateCamera()
    }
    makeScreenCoordsWorldCoords(t, s) {
        let i = [];
        return i[0] = t / this.scale.x + this.left, i[1] = s / this.scale.y + this.top, i
    }
}
export {
    s as Actor, a as Camera, t as Display, h as Rect, i as Stage
};