var mycode = function() {
	'use strict';
	//hide-start
	var testTicker = Date.now(),
		testTime = testTicker,
		testNow,
		testMessage = document.getElementById('testmessage');
	//hide-end

	//define variables
	var here,
		choke = 80,
		chokeTime = Date.now(),
		radius = 10,
		snake,
		vector = scrawl.newVector(),
		updateSnake;

	//define entitys
	for (var i = 0; i < 29; i++) {
		scrawl.newWheel({
			name: 'seg_' + i,
			startX: 350,
			startY: 187,
			pivot: 'seg_' + (i + 1),
			radius: radius,
			fillStyle: 'rgba(0,' + (255 - (i * 8)) + ',0,1)',
			method: 'fillDraw',
			order: i,
		});
	}

	snake = scrawl.newWheel({
		name: 'seg_29',
		startX: 350,
		startY: 187,
		radius: radius,
		fillStyle: 'Black',
		method: 'fillDraw',
		visibility: false,
		order: 29,
	});

	//display initial canvas scene
	scrawl.clear();
	scrawl.compile();
	snake.forceStamp();
	scrawl.show();

	//animation function
	updateSnake = function() {
		if (chokeTime + choke < Date.now()) {
			chokeTime = Date.now();
			scrawl.clear();
			scrawl.compile();
			vector.set(here);
			vector.vectorSubtract(snake.start);
			if (vector.getMagnitude() > radius) {
				vector.setMagnitudeTo(radius * 2);
				snake.setDelta({
					start: vector,
				});
			}
			snake.forceStamp();
			scrawl.show();
		}
	};

	//animation object
	scrawl.newAnimation({
		fn: function() {
			here = scrawl.pad.mycanvas.getMouse();
			if (here.active) {
				updateSnake();
			}

			//hide-start
			testNow = Date.now();
			testTime = testNow - testTicker;
			testTicker = testNow;
			testMessage.innerHTML = 'Milliseconds per screen refresh: ' + Math.ceil(testTime) + '; fps: ' + Math.floor(1000 / testTime);
			//hide-end
		},
	});
};

scrawl.loadModules({
	path: '../source/',
	minified: false,
	modules: ['animation', 'wheel'],
	callback: function() {
		window.addEventListener('load', function() {
			scrawl.init();
			mycode();
		}, false);
	},
});
