import { tag_api } from "./requete.mjs"
"use strict";

async function populate_tags() {
    let liste_tags = (await tag_api()).result.tags;
    $("select.choix_tag").html(`<option value="">Aucun tag</option>`)

    for (let i = 0; i < liste_tags.length; i++){

        $("select.choix_tag").append($('<option>', {
            value: liste_tags[i].url_name,
            text: liste_tags[i].name
        }));

    }
}

export { populate_tags }