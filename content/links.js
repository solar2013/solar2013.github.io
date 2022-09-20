window.LinksOnLoad = window.LinksOnLoad || (() => {
	window.Links = window.Links || {};

	Links.Engine = Links.Engine || ((window) => {
	    const redirect = function (href) {
	        let loaded = false;
			const goingToHome = document.location.origin + "/" == href;
	        $.ajax({
	            method: 'GET',
	            url: goingToHome ? href : href+".html",
	            success: data => {
	                const body = data
                        .substring(data.indexOf("body>"), data.indexOf("</body"))
                        .replace("body>", "");
	                const title = data
                         .substring(data.indexOf("title>"), data.indexOf("</title"))
                         .replace("title>", "");

	                history.pushState(null, title, href);

					if (goingToHome)
						$(".navigation").fadeOut(500);

					$(".container").fadeOut(500, function(){
						$("title").html(title);
						window.LazyLoadReady = false;
						$("body").html(body);
						$(".container").hide();
						$(".container").fadeIn(500, () => window.LazyLoadReady = true);
						
						window.LinksOnLoad();
						loaded = true;

						if (window.LoadReleases)
							window.LoadReleases();
					});
	                
	            },
	            error: () => {
	                document.location.href = href;
	            }
	        });

	        let timer = 0;
	        interval = setInterval(() => {

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

	    const customHandler = e => {
            e.preventDefault();

			const href = e.target.href;

			if (href 
				&& href != document.location.href 
				&& href != document.location.href + "#") {
			    redirect(href);
			}
		};

	    const popstate_proxy = () => location.reload();

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
});

$(window).on("load", window.LinksOnLoad);
