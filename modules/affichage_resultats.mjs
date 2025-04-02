import { recherche_api } from "./requete.mjs";
"use strict";

async function affichage_resultats (texte, donnee) {
    /*
    Entrée : texte une chaîne de caractères
    Sortie : rien
    Action : Effectue une recherche d'une image dont le nom correspond à "texte" et affiche les résultats
    */
    if (texte == ""){
        $("div.espace_resultats").html("<p>Aucun résultat</p>")
        return
    }

    let contenu = ""

    try{await recherche_api(texte).then( (resultat) => {
            const images = tri_images(resultat.result.images, donnee)
            
            for (let i = 0; i < images.length; i++){
                contenu += `<img src="${images[i].element_url}" alt="${images[i].name}"/>`
            }
        })
        if (contenu == ""){
            contenu = "<p>Aucun résultat</p>"
        }
    }
    catch{
            contenu = "<p>Impossible de rechercher dans ce serveur Piwigo</p>"
    }
    $("div.espace_resultats").html(contenu)
}

function tri_images (images, donnee = "name"){
    switch (donnee){
        case "name" :
            images.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "hit" :
            images.sort((a, b) => b.hit - a.hit);
            break;
        case "!date_creation" :
            images.sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation));
            break;
        case "!date_available" :
            images.sort((a, b) => new Date(b.date_available) - new Date(a.date_available));
            break;
        case "date_creation" :
            images.sort((a, b) => new Date(a.date_creation) - new Date(b.date_creation));
            break;
        case "date_available" :
            images.sort((a, b) => new Date(a.date_available) - new Date(b.date_available));
            break;
    }
    return images
}

export { affichage_resultats }