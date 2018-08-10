const tabletojson = require('tabletojson');
 
tabletojson.convertUrl(
    'https://nomanssky.gamepedia.com/Resource',
    { stripHtmlFromCells: false },
    function(tablesAsJson) {
        console.log(JSON.stringify(tablesAsJson[1]));
    }
);
 