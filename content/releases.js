var loadReleases = () => {
    Object.defineProperty(Array.prototype, 'chunk', {
        value: function(chunkSize) {
          var array = this;
          return [].concat.apply([],
            array.map(function(elem, i) {
              return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
            })
          );
        },
        configurable: true
      });

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
        var groups = releases.chunk(3);
        var result = "";

        groups.forEach(group => {
            var groupHtml = "";

            group.forEach(releaseData => {
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
    
                groupHtml += render("card-template", releaseData);
            });



            result += render("group-template", {content: groupHtml});
        })

        container.innerHTML = result;
        
        applySingleAlbumView();
        lazyLoad();
    });
}


$(window).on("load", loadReleases);
