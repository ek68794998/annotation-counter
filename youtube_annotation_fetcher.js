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
			var $annotationsButton = $(this).find(".vm-video-annotations").html("<i>Loading visual elements...</i>");
			var $cardsButton = $(this).find(".vm-video-cards").html("<i>Loading Cards...</i>");

			var annotationLink = $annotationsButton.attr("href");
			var videoId = annotationLink.substr(annotationLink.indexOf("v=") + 2);

			var endScreenUrl = window.location.origin + "/endscreen_ajax?v=" + videoId + "&encrypted_video_id=" + videoId + "&action_load=1";
			var cardsUrl = window.location.origin + "/cards_ajax?v=" + videoId + "&action_list=1";

			$.ajax({
				url: endScreenUrl,
				dataType: "text",
				success: function(data) {
					var count = JSON.parse(data).for_editor.elements.length;
					$annotationsButton.text("End Screen Links (" + count + ")");
				},
				statusCode: {
					403: function() {
						var annotationsUrl = window.location.origin + "/annotations_auth/read2?video_id=" + videoId;

						$.ajax({
							url: annotationsUrl,
							dataType: "text",
							success: function(data) {
								var count = (data.match(/openUrl/g) || []).length;
								$annotationsButton.text("Annotations (" + count + ")");
							},
						});
					},
				},
			});

			$.ajax({
				url: cardsUrl,
				dataType: "text",
				success: function(data) {
					var count = (data.match(/"target_url"/g) || []).length;
					$cardsButton.text("Cards (" + count + ")");
				},
			});
		});

		$(".vm-video-info .primary-notification a:contains('Matched')").addClass("notification-matched");
	});
})();