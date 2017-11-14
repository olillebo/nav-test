var eventOptions = {
    valueNames: ["event", "date"],
    item: '<li><div class="listContainer"><div class="event title"></div><div class="date subtitle"></div></div><div class="editIcon eventIcon"><i id="editEvent" class="icon material-icons">mode_edit</i></div><div class="iconA"><svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div></li>'
};
var outcomeOptions = {
    valueNames: ["outcome", "odds"],
    item: '<li><div class="listContainer"><div class="outcome title"></div><div class="odds subtitle"></div></div><div class="editIcon outcomeIcon"><i id="editOutcome" class="icon material-icons">mode_edit</i></div><div class="iconA"><svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div></li>'
};

var eventValues = [
    { event: "Stoke City - Leicester City", date: "04.11 - 13:30"},
    { event: "Huddersfield Town - West Bromwich Albions", date: "04.11 - 16:00"},
    { event: "Newcastle United - AFC Bournemouth", date: "04.11 - 16:00"},
    { event: "Southampton - Burnley", date: "04.11 - 16:00"},
    { event: "Swansea City - Brighton & Hove Albions", date: "04.11 - 16:00"},
    { event: "West Ham United - Liverpool", date: "04.11 - 18:30"},
    { event: "Bristol City - Cardiff City", date: "04.11 - 13:00"},
    { event: "Aston Villa - Sheffield Wednesday", date: "04.11 - 16:00"},
    { event: "Barnsley - Birmingham City", date: "04.11 - 16:00"},
    { event: "Bolton Wanderers - Norwich City", date: "04.11 - 16:00"},
    { event: "Derby County - Reading", date: "04.11 - 16:00"},
    { event: "Ipswich Town - Preston North End", date: "04.11 - 16:00"},
    { event: "Millwall - Burton Albion", date: "04.11 - 16:00"},
    { event: "Nottingham Forest - Queens Park Rangers", date: "04.11 - 16:00"},
    { event: "Sheffield United - Hull City", date: "04.11 - 16:00"},
    { event: "Brentford - Leeds United", date: "04.11 - 18:30"},
    { event: "Angers SCO - PSG", date: "04.11 - 17:00"},
    { event: "Monaco - Guingamp", date: "04.11 - 20:00"},
    { event: "Montpellier - Amiens SC", date: "04.11 - 20:00"},
    { event: "Nantes - Toulouse", date: "04.11 - 20:00"},
    { event: "Troyes - Strasbourg", date: "04.11 - 20:00"},
    { event: "RB Leipzig - Hannover 96", date: "04.11 - 15:30"},
    { event: "Freiburg - Schalke 04", date: "04.11 - 15:30"},
    { event: "Borussia M'gladbach - Mainz 05", date: "04.11 - 15:30"},
    { event: "Augsburg - Bayer Leverkusen", date: "04.11 - 15:30"},
    { event: "Hamburger SV - Stuttgart", date: "04.11 - 15:30"},
    { event: "Borussia Dortmund - Bayern München", date: "04.11 - 18:30"},
    { event: "Bologna - Crotone", date: "04.11 - 18:00"},
    { event: "Genoa - Sampdoria", date: "04.11 - 20:45"},
    { event: "AZ - Willem II", date: "04.11 - 18:30"},
    { event: "Excelsior - Roda JC", date: "04.11 - 19:45"},
    { event: "Heracles - Groningen", date: "04.11 - 19:45"},
    { event: "VVV - NAC Breda", date: "04.11 - 20:45"},
    { event: "St. Johnstone - Celtic", date: "04.11 - 13:30"},
    { event: "Hamilton Academy - Aberdeen", date: "04.11 - 16:00"},
    { event: "Hibernian - Dundee", date: "04.11 - 16:00"},
    { event: "Rangers - Partick Thistle", date: "04.11 - 16:00"},
    { event: "Ross County - Motherwell", date: "04.11 - 16:00"},
    { event: "Valencia - Leganés", date: "04.11 - 13:00"},
    { event: "Deportivo La Coruna - Atlético Madrid", date: "04.11 - 16:15"},
    { event: "Deportivo Alavés - Espanyol", date: "04.11 - 18:30"},
    { event: "Barcelona - Sevilla", date: "04.11 - 20:45"},
    { event: "Tottenham Hotspur - Crystal Palace", date: "05.11 - 13:00"},
    { event: "Manchester City - Arsenal", date: "05.11 - 15:15"},
    { event: "Chelsea - Manchester United", date: "05.11 - 17:30"},
    { event: "Everton - Watford", date: "05.11 - 17:30"},
    { event: "Middlesbrough - Sunderland", date: "05.11 - 13:15"},
    { event: "Nice - Dijon", date: "05.11 - 15:00"},
    { event: "Olympique Marseille - Caen", date: "05.11 - 17:00"},
    { event: "Metz - Lille", date: "05.11 - 17:00"},
    { event: "Saint-Étienne - Olympique Lyonnais", date: "05.11 - 21:00"},
    { event: "Köln - Hoffenheim", date: "05.11 - 15:30"},
    { event: "Wolfsburg - Hertha BSC", date: "05.11 - 18:00"},
    { event: "Internazionale - Torino", date: "05.11 - 12:30"},
    { event: "Cagliari - Hellas Verona", date: "05.11 - 15:00"},
    { event: "Chievo - Napoli", date: "05.11 - 15:00"},
    { event: "Fiorentina - Roma", date: "05.11 - 15:00"},
    { event: "Juventus - Benevento", date: "05.11 - 15:00"},
    { event: "Lazio - Udinese", date: "05.11 - 15:00"},
    { event: "Atalanta - SPAL", date: "05.11 - 18:00"},
    { event: "Sassuolo - Milan", date: "05.11 - 20:45"},
    { event: "ADO Den Haag - Feyenoord", date: "05.11 - 12:30"},
    { event: "Ajax - Utrecht", date: "05.11 - 14:30"},
    { event: "Vitesse - PEC Zwolle", date: "05.11 - 14:30"},
    { event: "PSV - Twente", date: "05.11 - 16:45"},
    { event: "Hearts - Kilmarnock", date: "05.11 - 16:00"},
    { event: "Levante - Girona", date: "05.11 - 12:00"},
    { event: "Celta de Vigo - Athletic Club", date: "05.11 - 16:15"},
    { event: "Real Sociedad - Eibar", date: "05.11 - 18:30"},
    { event: "Villarreal - Málaga", date: "05.11 - 18:30"},
    { event: "Real Madrid - Las Palmas", date: "05.11 - 20:45"}
];

var outcomeValues = [
    { outcome: "Home (1)", odds: "1.90" },
    { outcome: "Draw (X)", odds: "3.10" },
    { outcome: "Away (2)", odds: "2.50" },
    { outcome: "Over 2.5 goals", odds: "2.10" },
    { outcome: "Over 3.5 goals", odds: "3.10" },
    { outcome: "Over 4.5 goals", odds: "4.10" },
    { outcome: "Over 5.5 goals", odds: "6.10" },
    { outcome: "Both teams to score - Yes", odds: "1.63" },
    { outcome: "Both teams to score - No", odds: "2.23" },
    { outcome: "Half time - Home", odds: "4.80" },
    { outcome: "Half time - Draw", odds: "2.28" },
    { outcome: "Half time - Away", odds: "2.15" }
];

var matchList = new List("matches", eventOptions, eventValues);
var outcomeList = new List("outcomes", outcomeOptions, outcomeValues);
var outcomeSet = false;
var stakeSet = false;

$("#matchSearch").val("").focus();

matchList.on("updated", function(list) {
    if (matchList.visibleItems.length == 1) {
        $("#matches li").unbind('click',matchClick);
        $("#matchSearch").prop('disabled', true);
        $("#matchlist").addClass("highlighted");
        setTimeout(function(){
            $("#matchSearchDiv").animate({
                height: 0 ,
                opacity: "toggle"
            }, 300, "swing");
            $(".selectedMatch").text(matchList.visibleItems[0]._values.event);
            $(".eventIcon").css({ 'display': 'flex' }).animate({"margin-right": '+=40'},'slow','easeOutBounce');
            if (!outcomeSet) {
                $("#outcomes").fadeIn();
                $("#outcomeSearch").focus();
            } else if  (stakeSet) $("#placeBet").removeClass("hidden").focus();
            $("#matches li").bind('click',matchClick);
        }, 1200);
    } else {
        $("#matches").removeClass("hidden");
    }
});

outcomeList.on("updated", function(list) {
    if (outcomeList.visibleItems.length === 1) {
        $("#outcomes li").unbind('click',outcomeClick);
        $("#outcomeSearch").prop('disabled', true);
        $("#outcomeList").addClass("highlighted");
        setTimeout(function(){
            $("#outcomeSearchDiv").animate({
                height: 0 ,
                opacity: "toggle"
            }, 300, "swing");
            $(".selectedOutcomeName").text(outcomeList.visibleItems[0]._values.outcome + " @ "+ outcomeList.visibleItems[0]._values.odds);
            $(".outcomeIcon").css({ 'display': 'flex' }).animate({"margin-right": '+=40'},'slow','easeOutBounce');
            outcomeSet = true;
            if (!stakeSet) {
                $("#hotspot3").removeClass("hidden");
                $(".stakeDisplay").removeClass("up");
                $("#stakeInput").removeClass("hidden").focus();
                $(".stakeDisplay").removeClass("hidden");
            } else $("#placeBet").focus();
            $("#outcomes li").bind('click',outcomeClick);
        }, 1200);
    } else {
        $("#stakeInput").addClass("hidden");
        $("#outcomes").fadeIn();
    }
});

$("#matchSearch").keyup(function() {
    if($("#matchSearch").val().length>0) {
        $("#hotspot1").addClass("hidden");
        $("#matches .list").removeClass("hidden");
    } else {
        $("#matches .list").addClass("hidden");
        $("#hotspot1").removeClass("hidden");
    }

    var searchString = $(this).val();
    matchList.search(searchString, ["event"]);
});

$("#outcomeSearch").keyup(function() {
    if($("#outcomeSearch").val().length>0) {
        $("#hotspot2").addClass("hidden");
        $("#outcomes .list").removeClass("hidden");
    } else {
        $("#outcomes .list").addClass("hidden");
    }
    var searchStringOutcome = $(this).val();
    outcomeList.search(searchStringOutcome, ["outcome"]);
});

$("#matches li").bind('click',matchClick);
function  matchClick() {
    if($(this).parent().hasClass("highlighted")){
        $("#matchSearch").val("").prop('disabled', false);
        matchList.search();
        $("#matchSearchDiv").animate({
            height: 62,
            opacity: "toggle"
        }, 0, "swing");
        $("#hotspot1").removeClass("hidden");
        $("#matchlist").removeClass("highlighted");
        $("#matches").removeClass("hidden");
        $("#matches .list").addClass("hidden");
        $("#matchSearch").focus();
        $(".eventIcon").css({ 'display': 'none','margin-right': '0'});
    } else {
        $("#matchSearch").val($(this).find('.event').text());
        matchList.search($(this).find('.event').text());
    }
};

$("#outcomes li").bind('click',outcomeClick);
function  outcomeClick() {
    if($(this).parent().hasClass("highlighted")){
        $("#outcomeSearch").val("").prop('disabled', false);
        outcomeList.search();

        $("#outcomeSearchDiv").animate({
            height: 62,
            opacity: "toggle"
        }, 0, "swing");
        $("#hotspot2").removeClass("hidden");
        $("#outcomeList").removeClass("highlighted");
        $("#outcomes").fadeIn();
        $("#outcomes .list").addClass("hidden");
        $("#outcomeSearch").focus();
        $(".outcomeIcon").css({ 'display': 'none','margin-right': '0'});
        if (!stakeSet) {
            $("#stakeInput").addClass("hidden");
            $(".stakeDisplay").addClass("hidden");
        }
    } else {
        $("#outcomeSearch").val($(this).find('.outcome').text());
        outcomeList.search($(this).find('.outcome').text());
        outcomeSet = true;
    }
};

var currentCursorPos;
$("#stakeInput").on("keyup", function(e) {
    var num = outcomeList.visibleItems[0]._values.odds * $("#stakeInput").val();
    $(".win").text(
        num.toFixed(2)+" kr"
    );
    $this = $("#stakeInput") ;
    currentCursorPos = $this[0].selectionStart;
    var val = $this.val();
    var firstPrevious = val.charAt(currentCursorPos - 1);
    if (firstPrevious === " " || e.keyCode == 13) {
        $("#stakeInput").addClass("hidden");
        $("#selectedStake").removeClass("hidden");
        $(".selectedStakeName").text($("#stakeInput").val()+" kr");
        $(".stakeDisplay .win").text(
            num.toFixed(2)+" kr"
        );
        $("#placeBet").removeClass("hidden").focus();
        stakeSet = true;
        $("#stakelist").addClass("highlighted");
        $(".stakeIcon").css({ 'display': 'flex' }).animate({"margin-right": '+=40'},'slow','easeOutBounce');
        $("#hotspot3").addClass("hidden");
        $(".stakeDisplay").addClass("up");

    }
});

$("#editStake").click(function(){
    $("#stakelistlist").removeClass("highlighted");
    $("#stakeInput").removeClass("hidden");
    stakeSet = false;
    $(".stakeIcon").css({ 'display': 'none','margin-right': '0'});
    $("#stakeInput").focus();
    $("#selectedStake").addClass("hidden");
})

$("#placeBet").click(function(){
    $("#page").addClass("hidden");
    $(".success").removeClass("hidden");
    $("#placeNew").focus();
})



$("#placeNew").click(function(){
    location.reload();
});

$("#closeQuickBet").click(function(){
    //open /
});