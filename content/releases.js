var loadReleases = () => {
    let render = (template, values) => {
        let renderedHtml = document.querySelector(`script#${template}`).innerHTML;;

        let keys = Object.keys(values);

        keys.forEach(key => {
            var value = values[key];
            var replacementRegEx = new RegExp(`{${key.toString().toLowerCase()}}`, 'gi');

            renderedHtml = renderedHtml.replace(replacementRegEx, value);
        });

        return renderedHtml;
    }

    var container = document.querySelector("#releases-content");

    if (container == null){
        lazyLoad();
        return;
    }

    fetch("/data/releases.json")
    .then(x => x.json())
    .then(data => {
        var releases = data.releases.reverse();
        var result = "";
        releases.forEach(releaseData => {
            releaseData.links = "";
            if (releaseData.services)   {
                let serviceNames = Object.keys(releaseData.services);

                serviceNames.forEach(name => {
                    var value = releaseData.services[name];
                    
                    var linkHtml = render("link-template", {
                        key: name,
                        value: value
                    });

                    releaseData.links += linkHtml;
                });

            }
            else{
                releaseData.links = "Coming soon...";
            }

            result += render("card-template", releaseData);
        });

        container.innerHTML = result;
        
        lazyLoad();
    });
}


$(window).on("load", loadReleases);
