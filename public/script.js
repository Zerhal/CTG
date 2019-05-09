(function($){

    /* Quand je clique sur l'icône hamburger je rajoute une classe au body */
    $('#header__icon').click(function(e){
        e.preventDefault();
        $('body').toggleClass('with--sidebar');
    });

    /* Je veux pouvoir masquer le menu si on clique sur le cache */
    $('#site-cache').click(function(e){
        e.preventDefault();
        $('body').removeClass('with--sidebar');
    })




$( "#slider-range" ).slider({
    range: true,
    min: 6,
    max: 11500,
    values: [ 6, 11500 ],
    slide: function( event, ui ) {
    $( "#amount" ).val(ui.values[ 0 ] + " €" + " - " + ui.values[ 1 ] + " €" );
    }
});
$( "#amount" ).val($( "#slider-range" ).slider( "values", 0 ) + " €" +
    " - " + $( "#slider-range" ).slider( "values", 1 ) + " €" );

    var availableTags = [
        "Aloxe-Corton",	"Auxey-Duresses",
"Bâtard-Montrachet",	"Beaune",
"Bienvenues-Bâtard-Montrachet",	"Blagny",
"Bonnes-Mares",	"Bourgogne",
"Bourgogne aligoté",	"Bourgogne mousseux",
"Bourgogne Passe-tout-grains",	"Bouzeron",
"Chablis",	"Chablis Grand Cru",
"Chambertin",	"Chambertin-Clos de Bèze",
"Chambolle-Musigny",	"Chapelle-Chambertin",
"Charlemagne",	"Charmes-Chambertin",
"Chassagne-Montrachet",	"Chevalier-Montrachet",
"Chorey-lès-Beaune",	"Clos de la Roche",
"Clos de Tart",	"Clos de Vougeot",
"los des Lambrays",	"Clos Saint-Denis",
"Corton",	"Corton-Charlemagne",
"Côte de Beaune",	"Côte de Beaune-Villages",
"Côte de Nuits-Villages",	"Coteaux Bourguignons",
"Crémant de Bourgogne",	"Criots-Bâtard-Montrachet"
      ];
      $( "#tags" ).autocomplete({
        source: availableTags
      });
});