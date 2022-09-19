var onLoad = function onLoad() {
	window.Links = window.Links || {};

	Links.Engine = Links.Engine || (function (window) {
	    var redirect = function (href) {
	        var loaded = false;
			var goingToHome = document.location.origin + "/" == href;
	        $.ajax({
	            method: 'GET',
	            url: goingToHome ? href : href+".html",
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
						loaded = true;

						if (loadReleases)
							loadReleases();
					};

					if ($(".container").length > 0 && !goingToHome){
						$(".container").fadeOut(500, function(){
							$("title").html(title);
							window.LazyLoadReady = false;
							$("body").html(body);
							$(".container").hide();
							$(".container").fadeIn(500, () => window.LazyLoadReady = true);
							
							onContentDone();
						});
					}
					else{
						$("body").fadeOut(500, function(){
							$("title").html(title);
							window.LazyLoadReady = false;
							$("body").html(body);
							$("body").fadeIn(500, () => window.LazyLoadReady = true);
							
							onContentDone();
						});
					}


	                
	            },
	            error: function (data) {
	                document.location.href = href;
	            }
	        });

	        var timer = 0;
	        interval = setInterval(function () {

	            timer++;
				if (timer < Links.Settings.AjaxLinksTimeout)
					return;

	            if (loaded == true) {
	                clearInterval(interval);
	            }
	            else {
	                document.location.href = href;
	            }

	        }, 200);
	    };

	    var customHandler = function (e) {
            e.preventDefault();

			if (this.href 
				&& this.href != document.location.href 
				&& this.href != document.location.href + "#") {
			    redirect(this.href);
			}
		};

	    var popstate_proxy = function (event) {
	        location.reload();
	    };

		return {
		    RedirectTo: function (url) {
		        redirect(url);
		    },
			Apply: function () {
				$("a:not(.ignore-js)").click(customHandler);

				window.onpopstate = popstate_proxy;
			},
		};
	})(this);

    Links.Settings = Links.Settings || {};
    Links.Settings.AjaxLinksTimeout = 300;
    Links.Settings.DebugMode = false;
    Links.Engine.Apply();
};

$(window).on("load", onLoad);
