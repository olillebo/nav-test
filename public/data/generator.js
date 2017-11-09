'use strict';
/**
 *   node generator.js
 */
var path = require('path');
var fs = require('fs');
var request = require('request');
var Async = require('async');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var data = require('./premierleague.json');
//https://e1-api.aws.kambicdn.com/offering/api/v3/leo/listView/football/england/premier_league.json?lang=en_GB&market=SE&client_id=2&channel_id=1&ncid=1510215931013&categoryGroup=COMBINED&displayDefault=true
var data2 = require('./laliga.json');
// https://e1-api.aws.kambicdn.com/offering/api/v3/leo/listView/football/spain/laliga.json?lang=en_GB&market=SE&client_id=2&channel_id=1&ncid=1510228334897&categoryGroup=COMBINED&displayDefault=true&category=match
var data3 = require('./bundesliga.json');
//https://e1-api.aws.kambicdn.com/offering/api/v3/leo/listView/football/germany/bundesliga.json?lang=en_GB&market=SE&client_id=2&channel_id=1&ncid=1510231152204&categoryGroup=COMBINED&displayDefault=true&category=match
var data4 = require('./serie_a.json');
//https://e1-api.aws.kambicdn.com/offering/api/v3/leo/listView/football/italy/serie_a.json?lang=en_GB&market=SE&client_id=2&channel_id=1&ncid=1510231127753&categoryGroup=COMBINED&displayDefault=true&category=match

var inplay = require('./in-play.json');
https://e1-api.aws.kambicdn.com/offering/api/v3/leo/listView/all/all/all/all/in-play.json?lang=en_GB&market=SE&client_id=2&channel_id=1&ncid=1510245150377&categoryGroup=COMBINED&displayDefault=true

var output = {events: []};
var dataLists = [data, data2, data3, data4, inplay];

for(var x = 0; x < dataLists.length; x++) {
    for(var i = 0; i < dataLists[x].events.length; i++) {
        var item = dataLists[x].events[i];
        if(item.event.sport=="FOOTBALL") {
            var odds1, oddsX, odds2, live, league;
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
                leagueID: league
            });
        }
    }
}




var st = JSON.stringify(output);

fs.writeFile("events.json", st);



