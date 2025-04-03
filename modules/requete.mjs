"use strict";

async function recherche_api (recherche = " ",page = 0) {
    let corps = "https://" + $("input.barre_serveur").val() + `/ws.php?format=json&method=pwg.images.search&query=${recherche}&per_page=100&page=${page}`

    try{
        const requete = await fetch(corps)
        if (!requete.ok){
            console.error("Erreur dans la requête demandé")
        }

        const reponse = await requete.json();
        return reponse
    }
    catch (error) {
        console.error(error.message);
    }
}

async function tag_api() {
    let corps = "https://" + $("input.barre_serveur").val() + `/ws.php?format=json&method=pwg.tags.getList`

    try{
        const requete = await fetch(corps)
        if (!requete.ok){
            console.error("Erreur dans la requête demandé")
        }

        const reponse = await requete.json();
        return reponse
    }
    catch (error) {
        console.error(error.message);
    }
}

async function recherche_tag(tags) {
    let corps = "https://" + $("input.barre_serveur").val() + `/ws.php?format=json&method=pwg.tags.getImages&tag_url_name=${tags.join("&")}`

    if (tags[0] == ""){
        console.log("Le premier tag étant null, on ne recherche pas")
        return
    }

    try{
        const requete = await fetch(corps)
        if (!requete.ok){
            console.error("Erreur dans la requête demandé")
        }

        const reponse = await requete.json();
        return reponse
    }
    catch (error) {
        console.error(error.message);
    }
}

export { recherche_api, tag_api, recherche_tag }