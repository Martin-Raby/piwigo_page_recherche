"use strict";

/*Lien de l'instance Piwigo dans laquelle rechercher*/
var lien_api = "https://piwigo.la-taniere-solidaire.gay/"

async function requete_api (recherche = " ",page = 0) {
    let corps = lien_api + `ws.php?format=json&method=pwg.images.search&query=${recherche}&per_page=100&page=${page}`

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

export { requete_api }