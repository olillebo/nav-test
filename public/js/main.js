var outcomeOptions = {
    valueNames: ["home", "away", "sport", "league", { name: 'live', attr: 'live' }, "time", "odds1Name","odds1", "oddsX", "odds2Name", "odds2", "league", "homeScore", "awayScore", "date"],
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
    '                    <span class="homeScore score-item">0</span>\n' +
    '                    <span class="awayScore score-item">4</span>\n' +
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
    '</div>',
    //page: 10,
    //pagination: true
};

var array = [];
var premierArray = [1];
var laligaArray = [2];
var bundesligaArray = [3];
var serieaArray = [4];
var otherArray = [5];
var allArray = [1,2,3,4,5];
var visibleItems = 0;

var outcomeValues, outcomeList, leagueLabel;

$(document).ready(function() {
    $(document).bind('createList', createList)
    $.getJSON("data/events.json", function(json) {
        $(document).trigger('createList', json);
    });

});

function createList(evt, json) {
    outcomeValues = json.events;
    outcomeList = new List("outcomes", outcomeOptions, outcomeValues);
    outcomeList.sort('date', { order: "asc" });

    showItems("All leagues");
}

$('#leaguelist input:checkbox').change(
    function(){

        var leagueArray;
        switch ($(this).attr("id")) {
            case "premierleague":
                leagueArray = premierArray;
                leagueLabel = "Premier League";
                break;
            case "laliga":
                leagueArray = laligaArray;
                leagueLabel = "La Liga";
                break;
            case "bundesliga":
                leagueArray = bundesligaArray;
                leagueLabel = "Bundesliga";
                break;
            case "seriea":
                leagueArray = serieaArray;
                leagueLabel = "Serie A";
                break;
            case "other":
                leagueArray = otherArray;
                leagueLabel = "Other";
                break;
            case "all":
                leagueLabel = "All leagues";
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
            }
            array = leagueArray.concat(array).unique();


        } else {
            array = array.filter(function(item) {
                return leagueArray.indexOf(item) === -1;
            });
        }
        if ($("#leaguelist input:checkbox:checked").length > 1) {
            $("#leagueButton .label").text($("#leaguelist input:checkbox:checked").length+" leagues selected");
        } else $("#leagueButton .label").text(leagueLabel);
        $("#leagueButton i").text("arrow_drop_down");
        filterList();
        showItems(leagueLabel);
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


$(".mdl-button").click(function(){
    if ($(this).siblings(".mdl-menu__container").hasClass("is-visible")) {
        $(this).find(".material-icons").text("arrow_drop_down");
    } else $(this).find(".material-icons").text("arrow_drop_up");
});

$("#sort").click(function(){
    outcomeList.sort('date', { order: "asc" });
});

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

$(".showMore").click(function(){
  showItems();
});


function showItems(league) {
    if(league=="All leagues") {
        visibleItems = 0;
        var newShow = visibleItems+8;

        $("#outcomeList").children('.card-container').each(function () {
            $(this).removeClass("show");
        });

        $("#outcomeList").children('.card-container').each(function () {
            if(!$(this).hasClass("show") && visibleItems<newShow) {
                $(this).addClass("show");
                visibleItems++;
            }
        })
    } else {
        $("#outcomeList").children('.card-container').each(function () {
            $(this).addClass("show");
        })
    }

}


$("#idag").click(function(){

    //set current day in button
    //get current day and match with inputDate
    //keep league filter

    outcomeList.filter(function(item) {
        var inputDate = parseDate(item.values().date).getDate();
        var todaysDate = new Date();

        var tomorrowDate = todaysDate.getDate() + 7;

        if(inputDate == tomorrowDate) {
            return true;
        } else {
            return false;
        }
    });
});

$("#imorgen").click(function(){

    //data attribute = dag
    //set check date to input date

    outcomeList.filter(function(item) {
        var inputDate = parseDate(item.values().date).getDate();
        var todaysDate = new Date();

        var tomorrowDate = todaysDate.getDate() + 8;

        if(inputDate == tomorrowDate) {
            return true;
        } else {
            return false;
        }
    });
});

function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}