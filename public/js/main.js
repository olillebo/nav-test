
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

    var premier = [0, 1, 2];
    var laliga = [3, 4, 5, 6];
    var outcomeValues = [
        { home: "Liverpool", away:"Manchester United", sport: "Football", league:"Premier League", live:false, time:"Tomorrow 20:45", odds1Name: "Liverpool", odds2Name: "Manchester United", odds1: "1.90", oddsX: "2.90", odds2: "3.20", leagueID: 1 },
        { home: "Everton", away:"Swansea", sport: "Football", league:"Premier League", live:false, time:"Tomorrow 20:45", odds1Name: "Everton", odds2Name: "Swansea", odds1: "1.75", oddsX: "3.20", odds2: "3.70", leagueID: 1 },
        { home: "Liverpool", away:"Manchester United", sport: "Football", league:"Premier League", live:true, time:"87:80", odds1Name: "Liverpool", odds2Name: "Manchester United", odds1: "1.90", oddsX: "1.90", odds2: "1.90", leagueID: 1 },
        { home: "Liverpool", away:"Manchester United", sport: "Football", league:"Premier League", live:true, time:"87:80", odds1Name: "Liverpool", odds2Name: "Manchester United", odds1: "1.90", oddsX: "1.90", odds2: "1.90", leagueID: 1 },
        { home: "Liverpool", away:"Manchester United", sport: "Football", league:"Premier League", live:true, time:"87:80", odds1Name: "Liverpool", odds2Name: "Manchester United", odds1: "1.90", oddsX: "1.90", odds2: "1.90", leagueID: 2 },
        { home: "Liverpool", away:"Manchester United", sport: "Football", league:"Premier League", live:true, time:"87:80", odds1Name: "Liverpool", odds2Name: "Manchester United", odds1: "1.90", oddsX: "1.90", odds2: "1.90", leagueID: 2 },
        { home: "Liverpool", away:"Manchester United", sport: "Football", league:"Premier League", live:true, time:"87:80", odds1Name: "Liverpool", odds2Name: "Manchester United", odds1: "1.90", oddsX: "1.90", odds2: "1.90", leagueID: 2 },
    ];

    var outcomeList = new List("outcomes", outcomeOptions, outcomeValues);

    var array = [];
    var premierArray = [1];
    var laligaArray = [2];


    $('input:checkbox').change(
        function(){

            var leagueArray;
            switch ($(this).attr("class")) {
                case "premier":
                    leagueArray = premierArray;
                    break;
                case "laliga":
                    leagueArray = laligaArray;
                    break;
            }

            if ($(this).is(':checked')) {
                array = leagueArray.concat(array);

            } else {
                array = array.filter(function(item) {
                    return leagueArray.indexOf(item) === -1;
                });
            }
            console.log(array);
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
