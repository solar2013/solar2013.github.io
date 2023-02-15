window.LoadReleases = window.LoadReleases || (() => {
    let render = (template, values) => {
        let renderedHtml = document.querySelector(`script#${template}`).innerHTML;;
        const keys = Object.keys(values);

        keys.forEach(key => {
            const value = values[key];
            const replacementRegEx = new RegExp(`{${key.toString().toLowerCase()}}`, 'gi');

            renderedHtml = renderedHtml.replace(replacementRegEx, value);
        });

        return renderedHtml;
    }

    const container = document.querySelector("#releases-content");

    if (container == null) {
        window.LazyLoadInitializer();
        return;
    }

    fetch("/data/releases.json")
        .then(x => x.json())
        .then(data => {
            const releases = data.releases.reverse();
            const groups = releases.chunk(3);
            let result = "";

            groups.forEach(group => {
                let groupHtml = "";

                group.forEach(releaseData => {
                    releaseData.links = "";
                    if (releaseData.services) {
                        let serviceNames = Object.keys(releaseData.services);

                        serviceNames.forEach(name => {
                            const value = releaseData.services[name];

                            const linkHtml = render("link-template", {
                                key: name,
                                value: value
                            });

                            releaseData.links += linkHtml;
                        });

                    }
                    else {
                        releaseData.links = "Coming soon...";
                    }

                    groupHtml += render("card-template", releaseData);
                });



                result += render("group-template", { content: groupHtml });
            })

            container.innerHTML = result;

            window.applySingleAlbumView();
            window.LazyLoadInitializer();

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.className += " in-screen";
                        }
                    });
                });

                document.querySelectorAll('.card').forEach(card => observer.observe(card));
            }

        });
});


onLoad(window.LoadReleases);
