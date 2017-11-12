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
var filterOnDay;

var outcomeValues, outcomeList, leagueLabel;

$(document).ready(function() {
    $(document).bind('createList', createList);
    $.getJSON("data/events.json", function(json) {
        $(document).trigger('createList', json);
    });

    var todaysDay = new Date().getDate() + 3;
    filterOnDay = todaysDay;

    $('.dayButton').each(function(){
        $(this).data('day',todaysDay);
        $(this).find(".label").text(todaysDay);
        todaysDay = todaysDay +1;
    });

    //Callback for other function.

    //$(document).bind('createList', createList);
    //var eventData = getJsonData();
    // $(document).trigger('createList', eventData);
   // });
    //console.log(eventData);


    /*$.getJSON( "https://e1-api.aws.kambicdn.com/offering/api/v3/leo/listView/all/all/all/all/in-play.json?lang=en_GB&market=SE&client_id=2&channel_id=1&ncid=1510245150377&categoryGroup=COMBINED&displayDefault=true", function( data ) {
        var output = {events: []};
        var dataLists = [data];

        for(var x = 0; x < dataLists.length; x++) {
            for(var i = 0; i < dataLists[x].events.length; i++) {
                var item = dataLists[x].events[i];
                if(item.event.sport=="FOOTBALL") {
                    var odds1, oddsX, odds2, live, league, homeScore, awayScore;
                    if(item.betOffers != null && item.betOffers.length > 0 ){
                        for(var j = 0; j < item.betOffers.length; j++) {
                            var offer = item.betOffers[j];
                            if(offer.betOfferType.name == "Match") {
                                odds1 = offer.outcomes[0].odds;
                                oddsX = offer.outcomes[1].odds;
                                odds2 = offer.outcomes[2].odds;
                            }
                        }
                    }

                    var date = new Date(item.event.start);
                    var currentDate = new Date();
                    live = (date <= currentDate);
                    var time = date.getUTCDate() +"/"+(date.getUTCMonth() + 1)+" - "+date.getHours()+":"+(date.getMinutes()<10?'0':'') + date.getMinutes();
                    /!*if(live) {
                        homeScore = item.liveData.score.home;
                        awayScore = item.liveData.score.away;
                        time = (item.liveData.matchClock.minute<10?'0':'') + item.liveData.matchClock.minute + ":" + (item.liveData.matchClock.second<10?'0':'') + item.liveData.matchClock.second;

                    }*!/
                    switch (item.event.group) {
                        case "Premier League":
                            league = 1;
                            break;
                        case "LaLiga":
                            league = 2;
                            break;
                        case "Bundesliga":
                            league = 3;
                            break;
                        case "Serie A":
                            league = 4;
                            break;
                        default:
                            league = 5;
                    }

                    output.events.push({
                        home : item.event.homeName,
                        away : item.event.awayName,
                        sport : (item.event.sport).charAt(0).toUpperCase() + (item.event.sport).slice(1).toLowerCase(),
                        league : item.event.group,
                        live : live,
                        time : time,
                        odds1Name: item.event.homeName,
                        odds2Name : item.event.awayName,
                        odds1: odds1.toString()[0]+"."+odds1.toString()[1]+odds1.toString()[2],
                        oddsX: oddsX.toString()[0]+"."+oddsX.toString()[1]+oddsX.toString()[2],
                        odds2: odds2.toString()[0]+"."+odds2.toString()[1]+odds2.toString()[2],
                        leagueID: league,
                        homeScore: homeScore,
                        awayScore: awayScore,
                        date: date
                    });
                }
            }
        }
        $(document).trigger('createList', output);
    console.log(output);
    });*/

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

        if($(this).hasClass("allSelect")) {
            $(".allSelect").prop('checked', true);
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
        } else {
            $("#leagueButton .label").text($("#leaguelist input:checkbox:checked").next("label").text());
        }
        $("#leagueButton i").text("arrow_drop_down");

        filterList();
        showItems(leagueLabel);
    });

    function  filterList() {
        //array = filter på liga
        //filterOnDay = filter på dag

        outcomeList.filter(function(item) {
            var inputDate = parseDate(item.values().date).getDate();
            //TODO improve this
            if($(".allSelect").prop('checked')) return true;
            if ((array.indexOf((item.values().leagueID)) >= 0)&& (filterOnDay == inputDate))  {
                return true;
            } else {
                return false;
            }
        });

        if (outcomeList.visibleItems.length > 0)  {
            $(".showMore").show();
            $(".empty").hide();
        } else {

            $(".showMore").hide();
            $(".empty").show();

        }
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
        $(".showMore").show();
        $(".dayFilter").hide();

    } else {
        $("#outcomeList").children('.card-container').each(function () {
            $(this).addClass("show");
        })
        $(".dayFilter").show();
    }

}

//function to set dayfilter to either current day and refresh list (if all->first league) or keep day and refresh list if adding/removing leagues
//call from

function setDayFilter(day) {

    var element;
    $('.dayButton').each(function(){
        $(this).removeClass("selected");
        if($(this).data("day") == day) element = $(this);
    });

    element.addClass("selected");
    var selectedDate = element.data("day");
    filterOnDay = day;
    filterList();
}


$(".dayButton").click(function(){
    var selectedDate = $(this).data("day");
    setDayFilter(selectedDate);
});

function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}