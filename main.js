import { affichage_resultats } from "./modules/affichage_resultats.mjs";
"use strict";

window.addEventListener("DOMContentLoaded", function(){
    $("button.bouton_recherche").on("click", async function(){await affichage_resultats( $("input.barre_recherche").val() ) });
    $(document).on('keypress',async function(e) {
        if(e.which == 13) {
            await affichage_resultats( $("input.barre_recherche").val() )
        }
    });
})
