
class ZoomController {

	static sf = 1; // scaleFactor

	static zoom(p, mx, my, scaleFactor) {
		p.translate(mx, my)
		p.scale(scaleFactor)
		if (mx > 1200 && p.windowWidth < 2000 && my > p.windowHeight - 100) {p.translate(-mx - 500, -my - 200);}
		else if (my > p.windowHeight - 100) {p.translate(-mx, -my - 200)}
		else if (mx > 1200 && p.windowWidth < 2000) {p.translate(-mx - 500, -my);}
		else p.translate(-mx, -my);
	}

}

module.exports = ZoomController;