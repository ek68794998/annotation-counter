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
			var $annotation = $(this).find(".vm-video-annotations").html("<i>Loading Annotations...</i>");
			var annotationLink = $annotation.attr("href");
			var videoId = annotationLink.substr(annotationLink.indexOf("v=") + 2);
			var annotationsUrl = window.location.origin + "/annotations_auth/read2?video_id=" + videoId;

			$.ajax({
				url: annotationsUrl,
				dataType: "text",
				success: function(data) {
					var count = (data.match(/openUrl/g) || []).length;
					$annotation.text("Annotations (" + count + ")");
				},
				statusCode: {
					403: function() {
						var endScreenUrl = window.location.origin + "/endscreen_ajax?v=" + videoId + "&encrypted_video_id=" + videoId + "&action_load=1";

						$.ajax({
							url: endScreenUrl,
							dataType: "text",
							success: function(data) {
								var count = (data.match(/callToAction/g) || []).length;
								$annotation.text("End Screen Links (" + count + ")");
							},
						});
					},
				},
			});
		});

		$(".vm-video-info .primary-notification a:contains('Matched')").addClass("notification-matched");
	});
})();