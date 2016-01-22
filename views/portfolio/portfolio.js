$(document).ready( function() {
     $('#grid-container').cubeportfolio({
        gapHorizontal: 0,
        gapVertical: 0,
        gridAdjustment: 'responsive',
        singlePageDelegate: '.cbp-singlePage',
        singlePageDeeplinking: true,
        singlePageStickyNavigation: true,
        singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
     });
});
