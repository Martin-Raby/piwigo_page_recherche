import { affichage_resultats } from "./modules/affichage_resultats.mjs";
import { populate_tags } from "./modules/gestion_tags.mjs";
"use strict";

window.addEventListener("DOMContentLoaded", function(){
    $("button.bouton_recherche").on("click", async function(){await affichage_resultats( $("input.barre_recherche").val(), $("select.choix_tri").val()) });
    $(document).on('keypress',async function(e) {
        if(e.which == 13) {
            await affichage_resultats( $("input.barre_recherche").val(), $("select.choix_tri").val() )
        }
    });
    $("select.choix_tri").on("change", async function(){await affichage_resultats( $("input.barre_recherche").val(), $("select.choix_tri").val()) });
    populate_tags()
})
