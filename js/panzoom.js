
	$(function() {
		var map,
			colorscale,
			panZoom,
			dep_data = {},
			w = $('#map').parent().width();

		$.fn.qtip.defaults.style.classes = 'ui-tooltip-bootstrap';
        $.fn.qtip.defaults.style.def = false;

		$.ajax({
			url: 'js/departments.json',
			dataType: 'json',
			success: function(data) {
				console.log('success!');
				$.each(data, function(i, r) {
					dep_data[r.id] = r;
				})
				map = kartograph.map('#map', w);
				//map.loadMap('images/france_departments.svg', function() {
				map.loadMap('images/world.svg', function() {
					
					map.addLayer('all_countries', {
						//titles: function(d) { return d.id },
						styles: {
							stroke: '0.5px',
							fill: '#282828'
						},
						tooltips: function(d) {
						    return d.name;
						}
					});
					map.addLayer('visited_countries', {
						//titles: function(d) { return d.id },
						styles: {
							stroke: '0.5px'
						},
						tooltips: function(d) {
						    return [d.name, "Last Visit: "+d.visit];
						}
					});
					map.getLayer('visited_countries').style({
						fill: '#D8D8C7',
						stroke: '#fff'
					});
					//initPanZoom();
				});
			}
		});
		function initPanZoom() {
			var panZoom = map.paper.panzoom({ initialZoom: 3, initialPosition: { x: 0, y: 0 } });
			panZoom.enable();
		    setInterval(function() {
		    	//$('h1').html(panZoom.currZoom +' x:'+panZoom.currPos.x.toFixed(0)+' y:'+panZoom.currPos.y.toFixed(0));
		    }, 500);
		    var css = '<style type="text/css">.grabbing { cursor: url(data:image/x-icon;base64,AAACAAEAICACAAcABQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAEAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAA/AAAAfwAAAP+AAAH/gAAB/8AAAH/AAAB/wAAA/0AAANsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////gH///4B///8Af//+AD///AA///wAH//+AB///wAf//4AH//+AD///yT/////////////////////////////8=), pointer !important; } .map-controls div { cursor:pointer; font-size: 20px; color: #777; font-weight:bold; font-family: Helvetica; line-height: 28px; text-align:center;border: 1px solid #bbb; } .map-controls div:hover { border: 1px solid #999; color: #000; }</style>';
		    $('body').append(css);
		    // init pan zoom controls
		    var ctrls = $('<div />'), up = $('<div>+</div>'), down = $('<div>−</div>');
		    ctrls
		    	.addClass('map-controls')
		    	.css({ position: 'absolute', top: 20, left: 20, 'z-index': 1000 })
		    	.append(up).append(down);
		    up.css({ 'border-radius': '14px 14px 0 0', width: 28, height: 28, position: 'absolute',
		    	top: 0, left: 0, background: '#fff' });
		   	down.css({ 'border-radius': '0 0 14px 14px', width: 28, height: 28, position: 'absolute',
		    	top: 29, left: 0, background: '#fff' })
		    $('#map').parent().append(ctrls);
		    up.click(function (e) {
		        panZoom.zoomIn(1);
		        e.preventDefault();
		    });
		    down.click(function (e) {
		        panZoom.zoomOut(1);
		        e.preventDefault();
		    });
		}
	});