import { requete_api } from "./requete.mjs";
"use strict";

async function affichage_resultats (texte) {
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
    await requete_api(texte).then( (resultat) => {
        const images = resultat.result.images
        for (let i = 0; i < images.length; i++){
            contenu += `<img src="${images[i].element_url}" alt="${images[i].name}"/>`
        }
    })
    if (contenu == ""){
        contenu = "<p>Aucun résultat</p>"
    }
    $("div.espace_resultats").html(contenu)
}

export { affichage_resultats }