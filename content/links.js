$(window).on("load", function () {
	window.AAYW = window.AAYW || {};

	AAYW.Engine = AAYW.Engine || {};

	AAYW.Engine.Links = AAYW.Engine.Links || (function (window) {
	    function redirect(href, callback) {
	        var loaded = false;
	        $.ajax({
	            method: 'GET',
	            url: href+".html",
	            success: function (data) {
	                var body = data
                        .substring(data.indexOf("body>"), data.indexOf("</body"))
                        .replace("body>", "");
	                var title = data
                         .substring(data.indexOf("title>"), data.indexOf("</title"))
                         .replace("title>", "");

	                history.pushState(null, title, href);

					var onContentDone = () => {
						onLoad();
						completion = 100;
						loaded = true;
	
						if (callback)
							callback();

						if (loadReleases)
							loadReleases();
					};

					if ($(".container").length > 0){
						$(".container").fadeOut(500, function(){
							$("title").html(title);
							$("body").html(body);
							$(".container").hide();
							$(".container").fadeIn(500);
							
							onContentDone();
						});
					}
					else{
						$("title").html(title);
						$("body").html(body);

						onContentDone();
					}


	                
	            },
	            error: function (data) {
	                document.location.href = href;
	            }
	        });

	        $(".click-bar").show();
	        var completion = 0;
	        interval = setInterval(function () {

	            completion++;
	            if (loaded == true) {
	                clearInterval(interval);
	                setTimeout(function () { $(".click-bar").fadeOut(700); }, 300);
	            }
	            else if (completion < AAYW.Settings.AjaxLinksTimeout) {
	            }
	            else {
	                document.location.href = href;
	            }

	        }, 15);
	    };

	    function handler(e) {
            if (e)
			    e.preventDefault();

			var self = this;
			if (AAYW.Settings.DebugMode)
				var startingTime = new Date().getTime();
			var interval = null;

			if (self.href && self.href != document.location.href && self.href != document.location.href + "#") {
			    redirect(self.href, function () {
			        if (AAYW.Settings.DebugMode) {
			            console.log({
			                href: self.href,
			                pageLoadingTime: new Date().getTime() - startingTime,
			            });
			        }
			    });
			}
		};

	    function popstate(event) {
	        location.reload();
	    };

		return {
		    RedirectTo: function (url) {
		        redirect(url);
		    },
			Apply: function () {
				$("a:not(.ignore-js)").click(handler);

				window.onpopstate = popstate;
			},
		};
	})(this);
});

var onLoad = function onLoad() {
    AAYW.Settings = AAYW.Settings || {};
    AAYW.Settings.AjaxLinksTimeout = 1000;
    AAYW.Settings.DebugMode = false;
    AAYW.Engine.Links.Apply();
};

$(window).on("load", onLoad);
