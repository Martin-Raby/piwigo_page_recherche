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
    let good_tags = tags
    if (tags.length == 0){
        return
    }
    
    if (good_tags[0] == ""){
        good_tags.splice(0,1)
    }
    console.log(good_tags.join("&"))

    let corps = "https://" + $("input.barre_serveur").val() + `/ws.php?format=json&method=pwg.tags.getImages&tag_mode_and=true&tag_url_name[]=${good_tags.join("&tag_url_name[]=")}`

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