import { recherche_api, recherche_tag } from "./requete.mjs";
"use strict";

async function affichage_resultats (texte, donnee, tags, exclusifs) {
    /*
    Entrée : texte une chaîne de caractères
    Sortie : rien
    Action : Effectue une recherche d'une image dont le nom correspond à "texte", les tries correctement et affiche les résultats
    */
    if (texte == ""){
        $("div.espace_resultats").html("<p>Aucun résultat</p>")
        return
    }

    let contenu = ""

    try{await recherche_api(texte).then( async (resultat) => {

            let images
            await tri_images(resultat.result.images, donnee, tags, exclusifs).then(
                (resultat) => { images = resultat}
            )
            
            for (let i = 0; i < images.length; i++){
                contenu += `<img src="${images[i].element_url}" alt="${images[i].name}"/>`
            }
        })
        if (contenu == ""){
            contenu = "<p>Aucun résultat</p>"
        }
    }

    catch(error){
            console.log(error)
            contenu = "<p>Impossible de rechercher dans ce serveur Piwigo</p>"
    }
    $("div.espace_resultats").html(contenu)
}

async function tri_images (images, donnee = "name", tags, exclusifs){
    /*
    Entrée : une liste d'images, une chainte de caractères et une liste de chaines de caractères
    Sortie : Une liste d'images
    Action : Renvoir la liste d'images avec les tags correspondants et trié de la bonne manière
    */
    
    let images_taggues = images
    if (tags[0] != "" || tags.length > 1){
        await recherche_tag(tags, exclusifs).then( (resultat) => {
            if (resultat !== undefined){
                let concerne = resultat.result.images
                images_taggues = []
                for (let i = 0; i < concerne.length; i++){
                    images_taggues = images_taggues.concat((images.filter(e => e.id == concerne[i].id)))
                }
            }
        })
    }

    switch (donnee){
        case "name" :
            images_taggues.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "hit" :
            images_taggues.sort((a, b) => b.hit - a.hit);
            break;
        case "!date_creation" :
            images_taggues.sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation));
            break;
        case "!date_available" :
            images_taggues.sort((a, b) => new Date(b.date_available) - new Date(a.date_available));
            break;
        case "date_creation" :
            images_taggues.sort((a, b) => new Date(a.date_creation) - new Date(b.date_creation));
            break;
        case "date_available" :
            images_taggues.sort((a, b) => new Date(a.date_available) - new Date(b.date_available));
            break;
    }
    return images_taggues
}

export { affichage_resultats }