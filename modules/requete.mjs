"use strict";

async function recherche_api (recherche = " ",page = 0) {
    let corps = $("input.barre_serveur").val() + `ws.php?format=json&method=pwg.images.search&query=${recherche}&per_page=100&page=${page}`

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
    let corps = $("input.barre_serveur").val() + `ws.php?format=json&method=pwg.tags.getList`

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

export { recherche_api, tag_api }