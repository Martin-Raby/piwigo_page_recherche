import { defaut } from "./modules/affichage_resultats.mjs";
"use strict";

window.addEventListener("DOMContentLoaded", function(){
    $("input.barre_recherche").on("click", function(){console.log("Barre")});
    $("button.bouton_recherche").on("click", function(){console.log("Bouton")});
    $("div.espace_resultats").append(defaut);
})