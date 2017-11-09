var outcomeOptions = {
    valueNames: ["home", "away", "sport", "league", { name: 'live', attr: 'live' }, "time", "odds1Name","odds1", "oddsX", "odds2Name", "odds2", "league"],
    item: '<div class="card-container">\n' +
    '    <div class="card-wrap live">\n' +
    '        <header class="cardheader">\n' +
    '            <div class="card-livelabel started">Live</div>\n' +
    '            <div class="card-timer"><span class="timer time">90:35</span></div>\n' +
    '            <div class="cardtitle">\n' +
    '                <div class="path">\n' +
    '                    <span class="sport"></span>\n' +
    '                    <span class="league"></span>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </header>\n' +
    '        <div class="cardcontent">\n' +
    '            <div class="card-score">\n' +
    '                <div class="goalbasedscore">\n' +
    '                    <span class="score-item">0</span>\n' +
    '                    <span class="score-item">4</span>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="card-teamnames">\n' +
    '                <div class="teamname-row home"></div>\n' +
    '                <div class="separator">-</div>\n' +
    '                <div class="teamname-row away"></div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="cardoffer">\n' +
    '            <div class="betoffer">\n' +
    '                <button class="betOfferButton">\n' +
    '                    <div>\n' +
    '                        <div class="odds odds1"></div>\n' +
    '                        <div class="outcomeLabel odds1Name"></div>\n' +
    '                    </div>\n' +
    '                </button>\n' +
    '                <button class="betOfferButton">\n' +
    '                    <div>\n' +
    '                        <div class="odds oddsX"></div>\n' +
    '                        <div class="outcomeLabel">Draw</div>\n' +
    '                    </div>\n' +
    '                </button>\n' +
    '                <button class="betOfferButton">\n' +
    '                    <div>\n' +
    '                        <div class="odds odds2"></div>\n' +
    '                        <div class="outcomeLabel odds2Name"></div>\n' +
    '                    </div>\n' +
    '                </button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>'
};

var array = [];
var premierArray = [1];
var laligaArray = [2];
var bundesligaArray = [3];
var serieaArray = [4];
var otherArray = [5];
var allArray = [1,2,3,4,5];

var outcomeValues;
var outcomeList;

$(document).ready(function() {
    $(document).bind('createList', createList)
    $.getJSON("data/events.json", function(json) {
        $(document).trigger('createList', json);
    });
});

function createList(evt, json) {
    outcomeValues = json.events;
    outcomeList = new List("outcomes", outcomeOptions, outcomeValues);
}
$('input:checkbox').change(
    function(){

        var leagueArray;
        switch ($(this).attr("id")) {
            case "premierleague":
                leagueArray = premierArray;
                break;
            case "laliga":
                leagueArray = laligaArray;
                break;
            case "bundesliga":
                leagueArray = bundesligaArray;
                break;
            case "seriea":
                leagueArray = serieaArray;
                break;
            case "other":
                leagueArray = otherArray;
                break;
            case "all":
                leagueArray = allArray;
                break;
        }

        if ($(this).is(':checked')) {
            if($(this).hasClass("allSelect")) {
                $('.league').each(function(){
                    this.checked = false;
                });
            } else if($(".allSelect").prop('checked')) {
                $(".allSelect").prop('checked',false);
                array = [];
                console.log("nå")
            }
            array = leagueArray.concat(array).unique();


        } else {
            array = array.filter(function(item) {
                return leagueArray.indexOf(item) === -1;
            });
        }
        filterList();
    });

    function  filterList() {
        outcomeList.filter(function(item) {
            if (array.indexOf((item.values().leagueID)) >= 0)  {
                return true;
        } else {
            return false;
        }
    });
};

Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};