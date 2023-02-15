window.LinksOnLoad = window.LinksOnLoad || (() => {
	const redirect = function (href) {
		let loaded = false;

		fetch(href + ".html")
			.then(response => response.text())
			.then(data => {
				const body = data
					.substring(data.indexOf("body>"), data.indexOf("</body"))
					.replace("body>", "");
				const title = data
					.substring(data.indexOf("title>"), data.indexOf("</title"))
					.replace("title>", "");

				history.pushState(null, title, href);

				fadeOut(".container", () => {
					document.querySelector("title").innerHTML = title;
					window.LazyLoadReady = false;
					document.querySelector("body").innerHTML = body;
					document.querySelector(".container").style.opacity = 0;
					fadeIn(".container", () => window.LazyLoadReady = true);

					window.LinksOnLoad();
					loaded = true;

					if (window.LoadReleases)
						window.LoadReleases();
				});
			})
			.catch(err => {
				console.error(err);
				document.location.href = href;
			});

		let timer = 0;
		const maxTimerValue = 25;
		interval = setInterval(() => {

			timer++;
			if (timer < maxTimerValue)
				return;

			if (loaded == true) {
				clearInterval(interval);
			}
			else {
				document.location.href = href;
			}
		}, 200);
	};

	const links = document.querySelectorAll("a:not(.ignore-js)");
	links.forEach(link => {
		link.addEventListener("click", e => {
			e.preventDefault();

			const href = e.target.href;

			if (href
				&& href != document.location.href
				&& href != document.location.href + "#") {
				redirect(href);
			}
		});
	})

	window.onpopstate = () => location.reload();
});

onLoad(window.LinksOnLoad);
