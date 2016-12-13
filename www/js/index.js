"use strict"; //needed for the mobile brower

if (document.deviceready) {
    document.addEventListener
    ('deviceready', onDeviceReady)
} else {
    document.addEventListener
    ('DOMContentLoaded', onDeviceReady);
}

/**
*Main Initialization function
*/
let pages = []; // used to store all our screens/pages
let links = []; // used to store all our navigation links

function onDeviceReady (){
    console.log("Ready!");
    pages = document.querySelectorAll('[data-role="page"]');

    links = document.querySelectorAll('[data-role="nav"] a');
     
    for(let i=0; i<links.length; i++) {
        links[i].addEventListener("click", navigate);
    }
    serverData.getJSON();
    
}

function navigate(ev) {
    ev.preventDefault(); 

    let link = ev.currentTarget; 
  console.log(link);
  // split a string into an array of substrings using # as the seperator
    let id = link.href.split("#")[1]; // get the href page name
  console.log(id);
    //update what is shown in the location bar
    history.replaceState({}, "", link.href);
    
    for(let i=0; i<pages.length; i++) {
        if(pages[i].id == id){
             pages[i].classList.add("active");
        } else {
            pages[i].classList.remove("active");
        }           
    }
}

document.getElementById("updateBtn").addEventListener("click", reFresh);

function reFresh () {
     location.reload()
    //console.log("HELLO WORLD");
}
//let pages = null;
 function init() {  
    

    /*document.getElementById("btnScores").addEventListener("click", function () {
      // we only have 2 pages
        pages[0].classList.toggle("active");
        pages[1].classList.toggle("active");
    });

    document.getElementById("btnStandings").addEventListener("click", function () {
      // we only have 2 pages
        pages[0].classList.toggle("active");
        pages[1].classList.toggle("active");
    });

    pages = document.querySelectorAll(".page");
    //console.log(pages);*/

    }


let serverData = {
    url: "http://griffis.edumedia.ca/mad9014/sports/soccer.php",
    httpRequest: "POST",
    getJSON: function () {
        
        // Add headers and options objects
        // Create an empty Request Headers instance
        let headers = new Headers();

        // Add a header(s)
        // key value pairs sent to the server

        headers.append("Content-Type", "text/plain");
        headers.append("Accept", "application/json; charset=utf-8");
        
        // simply show them in the console
        console.dir("headers: " + headers.get("Content-Type"));
        console.dir("headers: " + headers.get("Accept"));
        
        // Now the best way to get this data all together is to use an options object:
        
         // Create an options object
        let options = {
            method: serverData.httpRequest,
            mode: "cors",
            headers: headers
        };
        
        // Create an request object so everything we need is in one package
        let request = new Request(serverData.url, options);
        //console.log(request);
           
        fetch(request)
            .then(function (response) {

                //console.log(response);
                return response.json();
            })
            .then(function (data) {
                //console.log(data); // now we have JS data, let's display it

                // Call a function that uses the data we recieved  
                displayData(data);
            })
            .catch(function (err) {
                alert("Error: " + err.message);
            });
    }
};

function displayData(data) {
  console.log(data);
  console.log(data.teams);
  console.log(data.scores);
    
    //get our schedule unordered list
    let resultDiv = document.querySelector(".results_list");
    resultDiv.innerHTML = ""; //clears exisiting data
    
    data.scores.forEach(function(value) {
                        //let li = document.createElement("li");
                        //li.className = "score";
                        let div = document.createElement("div");
                        div.className += "date";
                        resultDiv.appendChild(div);
        
                        let h3 = document.createElement("h3");
                        h3.textContent = value.date;
                        div.appendChild(h3);
        
                        let games = value.games;
                        //console.log(games);
                        //ul.appendChild(li);
                        
                        games.forEach(function(value) {
                            
                        let div = document.createElement("div");
                        div.className = "scoredd";
                        //let homeTeam = value.home;
                        //console.log(homeTeam);
                        //let div = document.createElement("div");
                        //div.className += "score";
                            
                        let homeScore = value.home_score;
                        //console.log(homeScore);
                        
                        //let awayTeam = value.away;
                        //console.log(awayTeam);
                        
                        let awayScore = value.away_score;
                        //console.log(awayScore);
                        
                        let homeTeam = getTeamName(data.teams, value.home);
                        let awayTeam = getTeamName(data.teams, value.away);
                        //console.log(homeTeam);
                        //console.log(awayTeam);
                        
                        //function myFunction() {
                        var himg;
                        var homeTeamLogo = homeTeam;
                        if (homeTeamLogo === "Arsenal FC") {
                        himg = '<img src = "img/arsenal.png">';
                        } else if (homeTeamLogo === "AFC Bournemouth") {
                        himg = '<img src = "img/afcb.png">';
                        } else if (homeTeamLogo === "Burnley FC") {
                        himg = '<img src = "img/ccfc.png">';
                        } else if (homeTeamLogo === "Chelsea FC") {
                        himg = '<img src = "img/cfc.png">';
                        } else if (homeTeamLogo === "Crystal Palace FC") {
                        himg = '<img src = "img/cpfc.png">';
                        } else if (homeTeamLogo === "Everton FC") {
                        himg = '<img src = "img/efc.png">';
                        } else if (homeTeamLogo === "AFC Bournemouth") {
                        himg = '<img src = "img/ffc.png">';
                        } else if (homeTeamLogo === "Hull City AFC") {
                        himg = '<img src = "img/hcfc.png">';
                        } else if (homeTeamLogo === "Leicester City FC") {
                        himg = '<img src = "img/lcfc.png">';
                        } else if (homeTeamLogo === "Liverpool FC") {
                        himg = '<img src = "img/lfc.png">';
                        } else if (homeTeamLogo === "Manchester City FC") {
                        himg = '<img src = "img/mcfc.png">';
                        } else if (homeTeamLogo === "Middlesbrough FC") {
                        himg = '<img src = "img/mfc.png">';
                        } else if (homeTeamLogo === "Manchester United FC") {
                        himg = '<img src = "img/mufc.png">';
                        } else if (homeTeamLogo === "AFC Bournemouth") {
                        himg = '<img src = "img/ncfc.png">';
                        } else if (homeTeamLogo === "AFC Bournemouth") {
                        himg = '<img src = "img/nufc.png">';
                        } else if (homeTeamLogo === "Sunderland AFC") {
                        himg = '<img src = "img/safc.png">';
                        } else if (homeTeamLogo === "Stoke City FC") {
                        himg = '<img src = "img/scfc.png">';
                        } else if (homeTeamLogo === "Southampton FC") {
                        himg = '<img src = "img/sfc.png">';
                        } else if (homeTeamLogo === "Swansea City FC") {
                        himg = '<img src = "img/swancfc.png">';
                        } else if (homeTeamLogo === "Tottenham Hotspur FC") {
                        himg = '<img src = "img/thfc.png">';
                        } else if (homeTeamLogo === "West Bromwich Albion FC") {
                        himg = '<img src = "img/wba.png">';
                        } else if (homeTeamLogo === "Watford FC") {
                        himg = '<img src = "img/wfc.png">';
                        } else if (homeTeamLogo === "West Ham United FC") {
                        himg = '<img src = "img/whufc.png">';
                        } else {
                        himg = '<img src = "img/logo.png">';
                        }
                        //console.log(himg);
                        //}
                        
                        var aimg;
                        var awayTeamLogo = awayTeam;
                        if (awayTeamLogo === "Arsenal FC") {
                        aimg = '<img src = "img/arsenal.png">';
                        } else if (awayTeamLogo === "AFC Bournemouth") {
                        aimg = '<img src = "img/afcb.png">';
                        } else if (awayTeamLogo === "Burnley FC") {
                        aimg = '<img src = "img/ccfc.png">';
                        } else if (awayTeamLogo === "Chelsea FC") {
                        aimg = '<img src = "img/cfc.png">';
                        } else if (awayTeamLogo === "Crystal Palace FC") {
                        aimg = '<img src = "img/cpfc.png">';
                        } else if (awayTeamLogo === "Everton FC") {
                        aimg = '<img src = "img/efc.png">';
                        } else if (awayTeamLogo === "AFC Bournemouth") {
                        aimg = '<img src = "img/ffc.png">';
                        } else if (awayTeamLogo === "Hull City AFC") {
                        aimg = '<img src = "img/hcfc.png">';
                        } else if (awayTeamLogo === "Leicester City FC") {
                        aimg = '<img src = "img/lcfc.png">';
                        } else if (awayTeamLogo === "Liverpool FC") {
                        aimg = '<img src = "img/lfc.png">';
                        } else if (awayTeamLogo === "Manchester City FC") {
                        aimg = '<img src = "img/mcfc.png">';
                        } else if (awayTeamLogo === "Middlesbrough FC") {
                        aimg = '<img src = "img/mfc.png">';
                        } else if (awayTeamLogo === "Manchester United FC") {
                        aimg = '<img src = "img/mufc.png">';
                        } else if (awayTeamLogo === "AFC Bournemouth") {
                        aimg = '<img src = "img/ncfc.png">';
                        } else if (awayTeamLogo === "AFC Bournemouth") {
                        aimg = '<img src = "img/nufc.png">';
                        } else if (awayTeamLogo === "Sunderland AFC") {
                        aimg = '<img src = "img/safc.png">';
                        } else if (awayTeamLogo === "Stoke City FC") {
                        aimg = '<img src = "img/scfc.png">';
                        } else if (awayTeamLogo === "Southampton FC") {
                        aimg = '<img src = "img/sfc.png">';
                        } else if (awayTeamLogo === "Swansea City FC") {
                        aimg = '<img src = "img/swancfc.png">';
                        } else if (awayTeamLogo === "Tottenham Hotspur FC") {
                        aimg = '<img src = "img/thfc.png">';
                        } else if (awayTeamLogo === "West Bromwich Albion FC") {
                        aimg = '<img src = "img/wba.png">';
                        } else if (awayTeamLogo === "Watford FC") {
                        aimg = '<img src = "img/wfc.png">';
                        } else if (awayTeamLogo === "West Ham United FC") {
                        aimg = '<img src = "img/whufc.png">';
                        } else {
                        aimg = '<img src = "img/logo.png">';
                        }
                        //console.log(aimg);
                        
                        //let homeTeamLogo = "HOMELOGO";
                        //let awayTeamLogo = "AWAYLOGO";
                            
                        
                        
                            //let home = document.createElement("div");
                            //home.innerHTML = homeTeam + " " + "<b>" + score + "</b>" + "&nbsp" + "<br>"; 
                            
                        //"&nbsp"
                        let hometeamdiv = document.createElement("div");
                        hometeamdiv.className = "hometeam";
                        hometeamdiv.innerHTML = homeTeam + "&nbsp";
                        div.appendChild(hometeamdiv);
                            
                        let hometeamscorediv = document.createElement("div");
                        hometeamscorediv.className = "hometeamscore";
                        hometeamscorediv.innerHTML = "<b>" + homeScore + "</b>" + "&nbsp" + "<br>";
                        div.appendChild(hometeamscorediv);
                        
                        let awayteamscorediv = document.createElement("div");
                        awayteamscorediv.className = "awayteamscore";
                        awayteamscorediv.innerHTML = "<b>" + awayScore + "</b>" + "&nbsp" + "<br>";
                        div.appendChild(awayteamscorediv);
                            
                        let awayteamdiv = document.createElement("div");
                        awayteamdiv.className = "awayteam";
                        awayteamdiv.innerHTML = awayTeam + "&nbsp";
                        div.appendChild(awayteamdiv);
                            
                        let homeLogoDiv = document.createElement("div")
                        homeLogoDiv.id = "hometeamlogo";
                        homeLogoDiv.innerHTML = himg;
                        div.appendChild(homeLogoDiv);
                        
                        let awayLogoDiv = document.createElement("div")
                        awayLogoDiv.id = "awayteamlogo";
                        awayLogoDiv.innerHTML = aimg;
                        div.appendChild(awayLogoDiv); 
                        
                        resultDiv.appendChild(div);  
                            
                        
                            })
    
                        
                        
    let scores = data.scores;
    let teams = data.teams;
    let team_list = [];
        
        teams.forEach(function (value) {
        
            var team = {
            teamID:     value.id,
            teamName:   getTeamName(data.teams, value.id),
            win:        0,
            loss:       0,
            tie:        0,
            pts:        0
        };
            
        team_list.push(team); // Push object into the end of the array
    })
    
    //console.log(team_list);
        
     //console.log("\n\nScores Page\n\n")
    
    scores.forEach(function (value) {
        
        //console.log(value.date);
        let games = value.games;
        
        games.forEach(function (value_games) {
            
            // Sets variables for home/away teams and scores
            let homeScore = value_games.home_score;
            let awayScore = value_games.away_score;
            
            let homeTeam = getTeamName(data.teams, value_games.home);
            let awayTeam = getTeamName(data.teams, value_games.away);
            
            // Check if Home Team Wins and give appropriate win/loss/pts
            if (homeScore > awayScore) {
                for (var i = 0; i < team_list.length; i++){ if ( value_games.home == team_list[i].teamID ) { team_list[i].win++; team_list[i].pts = team_list[i].pts + 3; } }
                for (var i = 0; i < team_list.length; i++){ if ( value_games.away == team_list[i].teamID ) { team_list[i].loss++; team_list[i].pts = team_list[i].pts + 0; } }            
            }
            // Check if Home Team Loses and give Appropriate win/loss/pts
            if (homeScore < awayScore) {
                for (var i = 0; i < team_list.length; i++){ if ( value_games.home == team_list[i].teamID ) { team_list[i].loss++; team_list[i].pts = team_list[i].pts + 0; } }
                for (var i = 0; i < team_list.length; i++){ if ( value_games.away == team_list[i].teamID ) { team_list[i].win++; team_list[i].pts = team_list[i].pts + 3; } }            
            }
            // Check if TIE and give appropriate ties/pts
            if (homeScore == awayScore) {
                for (var i = 0; i < team_list.length; i++){ if ( value_games.home == team_list[i].teamID ) { team_list[i].tie++; team_list[i].pts = team_list[i].pts + 1; } }
                for (var i = 0; i < team_list.length; i++){ if ( value_games.away == team_list[i].teamID ) { team_list[i].tie++; team_list[i].pts = team_list[i].pts + 1; } }            
            }
            
            //console.log(awayTeam + " " + awayScore + " - " + homeScore + " " + homeTeam);
            
        })
        
        
        
    })
    
    // Display of 
    //console.log("\n\nStandings Page\n\n");
    
    team_list.sort(dynamicSort("pts"));
    console.log(team_list);
    
    team_list.forEach(function (value) {
        
        //console.log("Team: " + value.teamName + " wins: " + value.win + " Losses: " + value.loss + " Ties: " + value.tie + " pts: " + value.pts);
        
  

 let tbody = document.querySelector("#teamStandings tbody");
  
                        var teamLogo;
                        var TeamLogo = value.teamName;
                        if (TeamLogo === "Arsenal FC") {
                        teamLogo = '<img src = "img/arsenal.png">';
                        } else if (TeamLogo === "AFC Bournemouth") {
                        teamLogo = '<img src = "img/afcb.png">';
                        } else if (TeamLogo === "Burnley FC") {
                        teamLogo = '<img src = "img/ccfc.png">';
                        } else if (TeamLogo === "Chelsea FC") {
                        teamLogo = '<img src = "img/cfc.png">';
                        } else if (TeamLogo === "Crystal Palace FC") {
                        teamLogo = '<img src = "img/cpfc.png">';
                        } else if (TeamLogo === "Everton FC") {
                        teamLogo = '<img src = "img/efc.png">';
                        } else if (TeamLogo === "AFC Bournemouth") {
                        teamLogo = '<img src = "img/ffc.png">';
                        } else if (TeamLogo === "Hull City AFC") {
                        teamLogo = '<img src = "img/hcfc.png">';
                        } else if (TeamLogo === "Leicester City FC") {
                        teamLogo = '<img src = "img/lcfc.png">';
                        } else if (TeamLogo === "Liverpool FC") {
                        teamLogo = '<img src = "img/lfc.png">';
                        } else if (TeamLogo === "Manchester City FC") {
                        teamLogo = '<img src = "img/mcfc.png">';
                        } else if (TeamLogo === "Middlesbrough FC") {
                        teamLogo = '<img src = "img/mfc.png">';
                        } else if (TeamLogo === "Manchester United FC") {
                        teamLogo = '<img src = "img/mufc.png">';
                        } else if (TeamLogo === "AFC Bournemouth") {
                        teamLogo = '<img src = "img/ncfc.png">';
                        } else if (TeamLogo === "AFC Bournemouth") {
                        teamLogo = '<img src = "img/nufc.png">';
                        } else if (TeamLogo === "Sunderland AFC") {
                        teamLogo = '<img src = "img/safc.png">';
                        } else if (TeamLogo === "Stoke City FC") {
                        teamLogo = '<img src = "img/scfc.png">';
                        } else if (TeamLogo === "Southampton FC") {
                        teamLogo = '<img src = "img/sfc.png">';
                        } else if (TeamLogo === "Swansea City FC") {
                        teamLogo = '<img src = "img/swancfc.png">';
                        } else if (TeamLogo === "Tottenham Hotspur FC") {
                        teamLogo = '<img src = "img/thfc.png">';
                        } else if (TeamLogo === "West Bromwich Albion FC") {
                        teamLogo = '<img src = "img/wba.png">';
                        } else if (TeamLogo === "Watford FC") {
                        teamLogo = '<img src = "img/wfc.png">';
                        } else if (TeamLogo === "West Ham United FC") {
                        teamLogo = '<img src = "img/whufc.png">';
                        } else {
                        teamLogo = '<img src = "img/logo.png">';
                        }  
        
        
        console.log(teamLogo);
        
        
        
        
        
  //let teamLogo = "LOGO";
  let wins = value.win;
  let losses = value.loss;
  let draw = value.tie;
  let points = value.pts;
  let name = value.teamName;
  let gp = value.win + value.loss + value.tie;
  console.log(gp);
  //Sample Tables stuff here:
  let tr = document.createElement("tr");
  let tlogo = document.createElement("td");
  tlogo.innerHTML = teamLogo;
  let tdn = document.createElement("td");
  tdn.textContent = name;
  let tgp = document.createElement("td");
  tgp.textContent = gp;
  let tdw = document.createElement("td");
  tdw.textContent = wins;
  let tdl = document.createElement("td");
  tdl.textContent = losses;
  let tdt = document.createElement("td");
  tdt.textContent = draw;
  let tdp = document.createElement("td");
  tdp.textContent = points;
  tr.appendChild(tlogo);
  tr.appendChild(tdn);
  tr.appendChild(tgp);
  tr.appendChild(tdw);
  tr.appendChild(tdl);
  tr.appendChild(tdt);
  tr.appendChild(tdp);
  tbody.appendChild(tr);       
        })
    })
                        
    
    function getTeamName (teams, id) {
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].id == id) {
                return teams[i].name;
            
            }
            
        }
        return "Unknown";
    
    }
    

    localStorage.setItem("scores",JSON.stringify(data));
    localStorage.setItem('time', +new Date);
    //get our stored contacts data convert it back to a 
    var myScoreData = JSON.parse(localStorage.getItem("scores"));
    var timeSet = localStorage.getItem('time');
    console.log("From LS: ");
    console.log(timeSet);

    //add challeneg here for grabbing data after 60mins
    
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (b,a) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

