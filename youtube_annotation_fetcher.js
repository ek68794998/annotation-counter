(function() {
	var script = document.createElement("SCRIPT");
	script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js';
	script.type = 'text/javascript';
	document.getElementsByTagName("head")[0].appendChild(script);

	var checkReady = function(callback) {
		if (window.jQuery) {
			callback(jQuery);
		} else {
			window.setTimeout(function() { checkReady(callback); }, 100);
		}
	};

	// Start polling...
	checkReady(function($) {
		$("link[rel=icon]").attr("href", "https://s.ytimg.com/yts/img/favicon-vfldLzJxy.ico");

		$("#creator-page").on("click", ".edit-expand-menu-button", function() {
			var $annotation = $(this).find(".vm-video-annotations").text("Annotations");
			var annotationLink = $annotation.attr("href");
			var url = window.location.origin + "/annotations_auth/read2?video_id=" + annotationLink.substr(annotationLink.indexOf("v=") + 2);
			$.ajax({
				url: url,
				dataType: "text",
				success: function(data) {
					var count = (data.match(/openUrl/g) || []).length;
					$annotation.text("Annotations (" + count + ")");
				},
			});
		});

		$(".vm-video-info .primary-notification a:contains('Matched')").addClass("notification-matched");
	});
})();