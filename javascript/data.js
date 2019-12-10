/* Api - her hentes en liste med helte og en side med en enkelt helt. */
document.addEventListener("DOMContentLoaded", function() {

    /* Refererer de to div'er indholdet skal vises i. */
    let heroList = document.getElementById("heroList");
    let heroPage = document.getElementById("heroPage");

    /* Hvis herolist vises på siden - så kaldes xhr funktionen. */
    if (heroList != null) {
        xhr("/v1/public/characters", 
        handleHeroListResponse);
    }

    if (heroPage != null) {
        /* Denne variabel henter URL */
        let url = new URL(window.location.href);
        /* Denne variabel henter indholdet af URL parameteret heroId */
        let heroId = url.searchParams.get("heroId");

        /* Hvis der er et URL parameter så kalder vi xhr funktionen */
        if (heroId != null) {
        xhr("/v1/public/characters/" + heroId,
            handleHeroPageResponse);
        } else {
            heroList.innerHTML = "<strong>Der er opstået en fejl.</strong>"
        }
    }
 });

 /* Xhr funktionen - denne funktion tager imod to parametre; endpoint (hvor data hentes fra) og funktionen (kører når data er hentet succesfuldt) */
function xhr(endpoint, responseHandler) {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Hvis resultatet er en succes
            console.log('success!');
            responseHandler(xhr.response);
        } else {
            // Hvis resultatet fejler
            console.log('failed!');
        }
    };

    /* Opbygning af api / get kald med api nøgle */
    xhr.open('GET', 'https://gateway.marvel.com:443/' + endpoint + '?apikey=9358eebf73b66707f7f7b5a45f8a6d3b');
    xhr.send();
}

/* Her parses resultatet fra en string til Json */
function handleHeroListResponse(response) {
    let responseAsJson = JSON.parse(response);
    let results = responseAsJson.data.results;
    console.log(results);

    /* Her opbygges html resultatet på baggrund af response fra api kaldet */
    let html = "";
    html += "<div class='heros row'>";
        results.forEach(function(item) {
            html += "<div class='col-md-3'>"
            html += "<a class='heros-link' href='/game_site/hero?heroId=" + item.id + "'>"
            html += "<h2 class='heros-title'>" + item.name + "</h2>"
            html += "<img class='image-responsive' src='" + item.thumbnail.path + "." + item.thumbnail.extension + "' alt='' />"
            html += "</div>"
            html += "</a>"
        });      
    html += "</div>";

    heroList.innerHTML = html;
}


function handleHeroPageResponse(response) {
    let responseAsJson = JSON.parse(response);
    let results = responseAsJson.data.results[0];
    console.log(results);
    
    /* Her opbygges html resultatet på baggrund af response fra api kaldet */
    let html = "";
    html += "<div class='heros row'>"
    html += "<div class='col-md-12'>"
    html += "<h2 class='hero-title'>" + results.name + "</h2>"
    html += "</div>"
    html += "<div class='col-md-6 d-flex'>"
    html += "<img class='image-responsive image-heropage' src='" + results.thumbnail.path + "." + results.thumbnail.extension + "' alt='' />"
    html += "</div>"
    html += "<div class='col-md-6 d-flex'>"
    html += "<div class='hero-description'>" + results.description + "</div>"
    html += "</div>"
    html += "</div>";

    heroPage.innerHTML = html;
}
