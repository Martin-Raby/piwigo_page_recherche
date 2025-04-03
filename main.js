import { affichage_resultats } from "./modules/affichage_resultats.mjs";
import { populate_tags } from "./modules/gestion_tags.mjs";
"use strict";

async function rechercher () {
    await affichage_resultats( $("input.barre_recherche").val(), $("select.choix_tri").val(), $("select.choix_tag").val(), $('#tag_option').is(":checked"))
}

window.addEventListener("DOMContentLoaded", function(){
    $("button.bouton_recherche").on("click", async function(){rechercher()});
    
    $(document).on('keypress',async function(e) {
        if(e.which == 13) {
            rechercher()
        }
    });
    $("select.choix_tri").on("change", async function(){rechercher()});
    $("select.choix_tag").on("change", async function(){rechercher()});
    $("input.barre_serveur").on("change", function(){populate_tags()});
    $('#tag_option').on("change", async function(){rechercher()});
    populate_tags();
})
