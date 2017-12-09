var outcomeOptions = {
    valueNames: ["id", "home", "away", "sport", "league", "leagueName", { name: 'live', attr: 'live' }, "time", "odds1Name","odds1", "oddsX", "odds2Name", "odds2", "league", "homeScore", "awayScore", "date", "sortDate"],
    item: '<div class="card-container id">\n' +
    '    <div class="card-wrap live">\n' +
    '        <header class="cardheader">\n' +
    '            <div class="card-livelabel started">Live</div>\n' +
    '            <div class="card-timer"><span class="timer time">90:35</span></div>\n' +
    '            <div class="cardtitle">\n' +
    '                <div class="path">\n' +
    '                    <span class="sport"></span>\n' +
    '                    <span class="leagueName"></span>\n' +
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

/*var filterOptions = {
    valueNames: [{ name: 'id', attr: 'id' },"leagueName",{ name: 'league', attr: 'league'}],
    item: '<li class ="mdl-menu__item">\n' +
    '       <input type="checkbox" class="league id league">\n' +
    '       <label for="id" class="leagueName"></label>\n' +
    '      </li>'
};*/

//new
var arrayOfLeagues = [];

//

var selectedLeagues = [];
var visibleItems = 0;
var filterOnDay;
var progress = 0;


var outcomeValues, outcomeList, leagueLabel, leagueList;

$(document).ready(function() {
    $(document).bind('createList', createList);
    //leagueList = new List("filters", filterOptions);


    var todaysDay = new Date().getDate();
    filterOnDay = todaysDay;

    $('.dayButton').each(function(){
        $(this).data('day',todaysDay);
        $(this).find(".label").text(todaysDay);
        //console.log(getNumberOfDays(new Date().getYear(), new Date().getMonth()))
        // if todaysdate = total days in month, todaysDay: 1 else
        if (todaysDay==getNumberOfDays(new Date().getYear(), new Date().getMonth())) {
            todaysDay = 1;
        } else todaysDay = todaysDay +1;
    });

    getJsonData();

    $(".mdl-menu__container" ).scroll(function() { //.box is the class of the div
        var p = $( "#leaguelist" ).position().top;
        if(p<0) $(".filterHeader" ).addClass("shadow");
        else $(".filterHeader" ).removeClass("shadow");
    });


    $('#selectSport').change(function(){
        if($('#selectSport').val() == '0') {
            $('#listContent').addClass("hide");
            $('.otherSports').removeClass("hidden");
        } else if ($('#selectSport').val() == '1'){
            $('#listContent').removeClass("hide");
            $('.otherSports').addClass("hidden");
        }
    });
});


function getNumberOfDays(year, month) {
    var isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
    return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

function createList(evt, json) {
    outcomeValues = json.events;
    outcomeList = new List("outcomes", outcomeOptions, outcomeValues);
    outcomeList.sort('sortDate', { order: "asc" });
    buildFilterItems();
    showItems("All leagues");
}

function buildFilterItems(evt, json) {

    $(".mdl-menu__container").append('' +
        '<div class="filterHeader" onclick="clickHeader($(this));">' +
            '<div class="filterText">' +
                '<span class="label">Filter events</span>' +
                '<i class="material-icons">arrow_drop_up</i>' +
            '</div>' +
            '<button class="closeFilter">' +
                '<span class="label">Close filter</span>' +
            '</button>' +
        '</div>'
    );

    var countryLeagues = _.chain(outcomeValues).groupBy('country').map(function(value, key) {
        return {
            country: key,
            leagues: _.uniq(_.pluck(value, 'league')),
            name: _.uniq(_.pluck(value, 'leagueName'))
        }
    }).value();
    var sortedArray = _.sortBy(countryLeagues, function(o) { return o.country; })

    $("#leaguelist").append('' +
        '<div id="listContent" class="listContent hide">'
    );
    var id = 0;
    $(sortedArray).each(function(i, e) {
        $(".listContent").append(
            //'<div class="countryWrapper" onclick="test($(this));" leagueCollection=leagueCollection'+[i]+'><i class="material-icons">arrow_drop_down</i><div class="country">'+sortedArray[i].country+'</div><div class ="checkboxStyle"> <input type="checkbox" id="' +[i]+ '" class="league"> <label for="' +[i]+ '"></label></div></div><div class="leagueCollection" id=leagueCollection'+[i]+'></div>'
            '<div class="countryWrapper" onclick="clickCountry($(this));" leagueCollection=leagueCollection'+[i]+'><span class="flag-icon flag-icon-'+getCountryCode(sortedArray[i].country).toLowerCase()+'"></span><div class="country">'+sortedArray[i].country+'</div><div class ="checkboxStyle"><i class="material-icons">arrow_drop_down</i></div></div><div class="leagueCollection" id=leagueCollection'+[i]+'></div>'
        )
        $(sortedArray[i].leagues).each(function(m, e) {
            $("#leagueCollection"+[i]).append(
                '<li class ="mdl-menu__item"><div class ="checkboxStyle"> <input type="checkbox" id="' +id+ '" data-league="' + sortedArray[i].leagues[m] + '" class="league"> <label for="' +id+ '">' + sortedArray[i].name[m] + '</label></div></li>'
            )
            //leagueList.add({ leagueName: sortedArray[i].name[m], id: id, league: sortedArray[i].leagues[m]});
            id++;
        });
    })
    $("#leaguelist").append('' +
        '</div>'
    );

}
function clickSports(element) {
    event.stopPropagation();

    if( $(event.target).hasClass("league") ) {
        return true;
    }
};

function clickCountry(element) {
    event.stopPropagation();

    $( "#"+$(element).attr('leaguecollection') ).slideToggle( "fast", function() {
        // Animation complete.
    });
};

function clickHeader(element) {
    $('html, body').css('overflowY', 'auto');

};

$(document).on('click', '#leaguelist input:checkbox', function(event){
    console.log("click")
    event.stopPropagation();
    var leagueArray;
    var ligaNavn =  parseInt($(this).data('league'));
    leagueArray = [ligaNavn];
    leagueLabel = ligaNavn;


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
            selectedLeagues = [];
        }
        selectedLeagues = leagueArray.concat(selectedLeagues).unique();


    } else {
        selectedLeagues = selectedLeagues.filter(function(item) {
            return leagueArray.indexOf(item) === -1;
        });
    }
    if ($("#leaguelist input:checkbox:checked").length >= 1) {
        $("#leagueButton .label").text($("#leaguelist input:checkbox:checked").length+" leagues selected");
    } else if ($("#leaguelist .league:checked").length == 0) {
        $(".allSelect").prop('checked',true);
        $("#leagueButton .label").text($(".allSelect").next("label").text())
    } else {
        $("#leagueButton .label").text($("#leaguelist input:checkbox:checked").next("label").text());
    }

    if ($("#leaguelist .league:checked").length == 0) {
        leagueLabel = "All leagues"
        $(".allSelect").prop('checked',true);
        $("#leagueButton .label").text($(".allSelect").next("label").text())
    }

    $("#leagueButton i").text("arrow_drop_down");
    $('html, body').css('overflowY', 'auto');


    filterList();
    showItems(leagueLabel);
});

function  filterList() {
    //selectedLeagues = filter på liga
    //filterOnDay = filter på dag

    outcomeList.filter(function(item) {

        var timestamp = new Date(item.values().sortDate);

        var inputDate = timestamp.getDate();

        //TODO improve this
        if($(".allSelect").prop('checked')) return true;
        if ((selectedLeagues.indexOf((item.values().league)) >= 0)&& (filterOnDay == inputDate))  {
            return true;
        } else {
            return false;
        }
    });
    showItems();

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
    $('html, body').css('overflowY', 'auto');
    $(this).find(".material-icons").text("arrow_drop_down");
} else {
    $(this).find(".material-icons").text("arrow_drop_up");
    $('html, body').css('overflowY', 'hidden');
}

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

$(document).mouseup(function(e)
    {
    var sportsbutton = $(".sports");
    var leaguebutton = $(".sports");


    // if the target of the click isn't the container nor a descendant of the container
    if (!sportsbutton.is(e.target) && sportsbutton.has(e.target).length === 0)
    {
        $("#sportsButton i").text("arrow_drop_down");
    }
    if (!leaguebutton.is(e.target) && leaguebutton.has(e.target).length === 0)
    {
        $("#leagueButton i").text("arrow_drop_down");
        window.scrollTo(0,0)
    }
});



function getJsonData() {
var data = "https://e1-api.aws.kambicdn.com/offering/api/v3/leo/listView/football/england/premier_league.json?lang=en_GB&market=SE&client_id=2&channel_id=1&ncid=1510215931013&categoryGroup=COMBINED&displayDefault=true";
var data2 = "https://e1-api.aws.kambicdn.com/offering/api/v3/leo/listView/football/spain/laliga.json?lang=en_GB&market=SE&client_id=2&channel_id=1&ncid=1510228334897&categoryGroup=COMBINED&displayDefault=true&category=match";
var data3 = "https://e1-api.aws.kambicdn.com/offering/api/v3/leo/listView/football/germany/bundesliga.json?lang=en_GB&market=SE&client_id=2&channel_id=1&ncid=1510231152204&categoryGroup=COMBINED&displayDefault=true&category=match";
var data4 = "https://e1-api.aws.kambicdn.com/offering/api/v3/leo/listView/football/italy/serie_a.json?lang=en_GB&market=SE&client_id=2&channel_id=1&ncid=1510231127753&categoryGroup=COMBINED&displayDefault=true&category=match";
var inplay = "https://e1-api.aws.kambicdn.com/offering/api/v3/leo/listView/all/all/all/all/in-play.json?lang=en_GB&market=SE&client_id=2&channel_id=1&ncid=1510245150377&categoryGroup=COMBINED&displayDefault=true";
var all = "https://e1-api.aws.kambicdn.com/offering/api/v3/leo/listView/all/all/all/all.json?lang=en_GB&market=SE&client_id=2&channel_id=1&ncid=1511963366090&categoryGroup=COMBINED&displayDefault=true";
var output = {events: []};
//var A = $.getJSON(data);

var A = $.ajax({ dataType:"json",
    url: data,
    success: function(data){
/*        $( "#progressbar" ).progressbar( "value", progress );
        progress++;
        console.log(progress)*/
    }
});
var B = $.ajax({ dataType:"json",
    url: data2,
    success: function(data){
        /*        $( "#progressbar" ).progressbar( "value", progress );
                progress++;
                console.log(progress)*/
    }
});
var C = $.ajax({ dataType:"json",
    url: data3,
    success: function(data){
        /*        $( "#progressbar" ).progressbar( "value", progress );
                progress++;
                console.log(progress)*/

    }
});
var D = $.ajax({ dataType:"json",
    url: data4,
    success: function(data){
        /*        $( "#progressbar" ).progressbar( "value", progress );
                progress++;
                console.log(progress)*/

    }
});
var E = $.ajax({ dataType:"json",
    url: inplay,
    success: function(data){
        /*        $( "#progressbar" ).progressbar( "value", progress );
                progress++;
                console.log(progress)*/

    }
});
var F = $.ajax({ dataType:"json",
    url: all,
    success: function(data){
        /*        $( "#progressbar" ).progressbar( "value", progress );
                progress++;
                console.log(progress)*/

    }
});

    $.when(A,B,C,D,E,F).done(function(aResult, bResult, cResult, dResult, eResult, fResult){//when all request are successful
    var dataLists = [aResult[0],bResult[0],cResult[0],dResult[0],eResult[0],fResult[0]];
    //$.when(E,F).done(function(eResult,fResult){//when all request are successful
    //    var dataLists = [eResult[0],fResult[0]];

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
                var sortDate = date.getTime();
                if(live) {
                    if(item.liveData.score.home) {
                        homeScore = item.liveData.score.home;
                        awayScore = item.liveData.score.away;
                    }
                    time = (item.liveData.matchClock.minute<10?'0':'') + item.liveData.matchClock.minute + ":" + (item.liveData.matchClock.second<10?'0':'') + item.liveData.matchClock.second;
                }
                if(odds1) {
                    odds1 = odds1.toString()[0]+"."+odds1.toString()[1]+odds1.toString()[2];
                }
                if(oddsX) {
                    oddsX = oddsX.toString()[0]+"."+oddsX.toString()[1]+oddsX.toString()[2];
                }
                if(odds2) {
                    odds2 = odds2.toString()[0]+"."+odds2.toString()[1]+odds2.toString()[2];
                }

                var alreadyAdded = $.grep(output.events, function(n) {
                    return(n.id === item.event.id);
                });

                if(item.event.sport == "FOOTBALL") {
                    if (!alreadyAdded.length) {
                        output.events.push({
                            id: item.event.id,
                            home : item.event.homeName,
                            away : item.event.awayName,
                            sport : (item.event.sport).charAt(0).toUpperCase() + (item.event.sport).slice(1).toLowerCase(),
                            leagueName : item.event.group,
                            league : item.event.groupId,
                            country: item.event.path[1].name,
                            live : live,
                            time : time,
                            odds1Name: item.event.homeName,
                            odds2Name : item.event.awayName,
                            odds1: odds1,
                            oddsX: oddsX,
                            odds2: odds2,
                            homeScore: homeScore,
                            awayScore: awayScore,
                            date: date,
                            sortDate: sortDate
                        });
                    }
                }
            }
        }
        /*        $( "#progressbar" ).progressbar( "value", progress );
                progress++;
                console.log(progress)*/

    }
    $(document).trigger('createList', output);
});
}

$( function() {
    $( "#progressbar" ).progressbar({
        value: 0,
        max: 7

    });
}
);

$("#quickbet").click(function(){
    location.replace('/quickbet')
})

var isoCountries = {
    'Afghanistan': 'AF',
    'Aland Islands': 'AX',
    'Albania': 'AL',
    'Algeria': 'DZ',
    'American Samoa': 'AS',
    'Andorra': 'AD',
    'Angola': 'AO',
    'Anguilla': 'AI',
    'Antarctica': 'AQ',
    'Antigua And Barbuda': 'AG',
    'Argentina': 'AR',
    'Armenia': 'AM',
    'Aruba': 'AW',
    'Australia': 'AU',
    'Austria': 'AT',
    'Azerbaijan': 'AZ',
    'Bahamas': 'BS',
    'Bahrain': 'BH',
    'Bangladesh': 'BD',
    'Barbados': 'BB',
    'Belarus': 'BY',
    'Belgium': 'BE',
    'Belize': 'BZ',
    'Benin': 'BJ',
    'Bermuda': 'BM',
    'Bhutan': 'BT',
    'Bolivia': 'BO',
    'Bosnia And Herzegovina': 'BA',
    'Botswana': 'BW',
    'Bouvet Island': 'BV',
    'Brazil': 'BR',
    'British Indian Ocean Territory': 'IO',
    'Brunei Darussalam': 'BN',
    'Bulgaria': 'BG',
    'Burkina Faso': 'BF',
    'Burundi': 'BI',
    'Cambodia': 'KH',
    'Cameroon': 'CM',
    'Canada': 'CA',
    'Cape Verde': 'CV',
    'Cayman Islands': 'KY',
    'Central African Republic': 'CF',
    'Chad': 'TD',
    'Chile': 'CL',
    'China': 'CN',
    'Christmas Island': 'CX',
    'Cocos (Keeling) Islands': 'CC',
    'Colombia': 'CO',
    'Comoros': 'KM',
    'Congo': 'CG',
    'Congo, Democratic Republic': 'CD',
    'Cook Islands': 'CK',
    'Costa Rica': 'CR',
    'Cote D\'Ivoire': 'CI',
    'Croatia': 'HR',
    'Cuba': 'CU',
    'Cyprus': 'CY',
    'Czech Republic': 'CZ',
    'Denmark': 'DK',
    'Djibouti': 'DJ',
    'Dominica': 'DM',
    'Dominican Republic': 'DO',
    'Ecuador': 'EC',
    'England': 'GB-ENG',
    'Egypt': 'EG',
    'El Salvador': 'SV',
    'Equatorial Guinea': 'GQ',
    'Eritrea': 'ER',
    'Estonia': 'EE',
    'Ethiopia': 'ET',
    'Europa League': 'EU',
    'Falkland Islands': 'FK',
    'Faroe Islands': 'FO',
    'Fiji': 'FJ',
    'Finland': 'FI',
    'France': 'FR',
    'French Guiana': 'GF',
    'French Polynesia': 'PF',
    'French Southern Territories': 'TF',
    'Gabon': 'GA',
    'Gambia': 'GM',
    'Georgia': 'GE',
    'Germany': 'DE',
    'Ghana': 'GH',
    'Gibraltar': 'GI',
    'Greece': 'GR',
    'Greenland': 'GL',
    'Grenada': 'GD',
    'Guadeloupe': 'GP',
    'Guam': 'GU',
    'Guatemala': 'GT',
    'Guernsey': 'GG',
    'Guinea': 'GN',
    'Guinea-Bissau': 'GW',
    'Guyana': 'GY',
    'Haiti': 'HT',
    'Heard Island & Mcdonald Islands': 'HM',
    'Holy See (Vatican City State)': 'VA',
    'Honduras': 'HN',
    'Hong Kong': 'HK',
    'Hungary': 'HU',
    'Iceland': 'IS',
    'India': 'IN',
    'Indonesia': 'ID',
    'Iran, Islamic Republic Of': 'IR',
    'Iraq': 'IQ',
    'Ireland': 'IE',
    'Isle Of Man': 'IM',
    'Israel': 'IL',
    'Italy': 'IT',
    'Jamaica': 'JM',
    'Japan': 'JP',
    'Jersey': 'JE',
    'Jordan': 'JO',
    'Kazakhstan': 'KZ',
    'Kenya': 'KE',
    'Kiribati': 'KI',
    'Korea': 'KR',
    'Kuwait': 'KW',
    'Kyrgyzstan': 'KG',
    'Lao People\'s Democratic Republic': 'LA',
    'Latvia': 'LV',
    'Lebanon': 'LB',
    'Lesotho': 'LS',
    'Liberia': 'LR',
    'Libyan Arab Jamahiriya': 'LY',
    'Liechtenstein': 'LI',
    'Lithuania': 'LT',
    'Luxembourg': 'LU',
    'Macao': 'MO',
    'Macedonia': 'MK',
    'Madagascar': 'MG',
    'Malawi': 'MW',
    'Malaysia': 'MY',
    'Maldives': 'MV',
    'Mali': 'ML',
    'Malta': 'MT',
    'Marshall Islands': 'MH',
    'Martinique': 'MQ',
    'Mauritania': 'MR',
    'Mauritius': 'MU',
    'Mayotte': 'YT',
    'Mexico': 'MX',
    'Micronesia, Federated States Of': 'FM',
    'Moldova': 'MD',
    'Monaco': 'MC',
    'Mongolia': 'MN',
    'Montenegro': 'ME',
    'Montserrat': 'MS',
    'Morocco': 'MA',
    'Mozambique': 'MZ',
    'Myanmar': 'MM',
    'Namibia': 'NA',
    'Nauru': 'NR',
    'Nepal': 'NP',
    'Netherlands': 'NL',
    'Netherlands Antilles': 'AN',
    'New Caledonia': 'NC',
    'New Zealand': 'NZ',
    'Nicaragua': 'NI',
    'Niger': 'NE',
    'Nigeria': 'NG',
    'Niue': 'NU',
    'Norfolk Island': 'NF',
    'Northern Mariana Islands': 'MP',
    'Norway': 'NO',
    'Oman': 'OM',
    'Pakistan': 'PK',
    'Palau': 'PW',
    'Palestinian Territory, Occupied': 'PS',
    'Panama': 'PA',
    'Papua New Guinea': 'PG',
    'Paraguay': 'PY',
    'Peru': 'PE',
    'Philippines': 'PH',
    'Pitcairn': 'PN',
    'Poland': 'PL',
    'Portugal': 'PT',
    'Puerto Rico': 'PR',
    'Qatar': 'QA',
    'Reunion': 'RE',
    'Romania': 'RO',
    'Russia': 'RU',
    'Rwanda': 'RW',
    'Saint Barthelemy': 'BL',
    'Saint Helena': 'SH',
    'Saint Kitts And Nevis': 'KN',
    'Saint Lucia': 'LC',
    'Saint Martin': 'MF',
    'Saint Pierre And Miquelon': 'PM',
    'Saint Vincent And Grenadines': 'VC',
    'Samoa': 'WS',
    'San Marino': 'SM',
    'Sao Tome And Principe': 'ST',
    'Saudi Arabia': 'SA',
    'Scotland': 'GB-SCT',
    'Senegal': 'SN',
    'Serbia': 'RS',
    'Seychelles': 'SC',
    'Sierra Leone': 'SL',
    'Singapore': 'SG',
    'Slovakia': 'SK',
    'Slovenia': 'SI',
    'Solomon Islands': 'SB',
    'Somalia': 'SO',
    'South Africa': 'ZA',
    'South Georgia And Sandwich Isl.': 'GS',
    'Spain': 'ES',
    'Sri Lanka': 'LK',
    'Sudan': 'SD',
    'Suriname': 'SR',
    'Svalbard And Jan Mayen': 'SJ',
    'Swaziland': 'SZ',
    'Sweden': 'SE',
    'Switzerland': 'CH',
    'Syrian Arab Republic': 'SY',
    'Taiwan': 'TW',
    'Tajikistan': 'TJ',
    'Tanzania': 'TZ',
    'Thailand': 'TH',
    'Timor-Leste': 'TL',
    'Togo': 'TG',
    'Tokelau': 'TK',
    'Tonga': 'TO',
    'Trinidad And Tobago': 'TT',
    'Tunisia': 'TN',
    'Turkey': 'TR',
    'Turkmenistan': 'TM',
    'Turks And Caicos Islands': 'TC',
    'Tuvalu': 'TV',
    'Uganda': 'UG',
    'Ukraine': 'UA',
    'United Arab Emirates': 'AE',
    'United Kingdom': 'GB',
    'United States': 'US',
    'United States Outlying Islands': 'UM',
    'Uruguay': 'UY',
    'Uzbekistan': 'UZ',
    'Vanuatu': 'VU',
    'Venezuela': 'VE',
    'Vietnam': 'VN',
    'Virgin Islands, British': 'VG',
    'Virgin Islands, U.S.': 'VI',
    'Wallis And Futuna': 'WF',
    'Wales': 'GB-WLS',
    'Western Sahara': 'EH',
    'Yemen': 'YE',
    'Zambia': 'ZM',
    'Zimbabwe': 'ZW'
};

function getCountryCode (countryName) {
    if (isoCountries.hasOwnProperty(countryName)) {
        return isoCountries[countryName];
    } else {
        return countryName;
    }
}