/*
 * This script is made by Strengthless.
 * The API Data is provided by Hypixel Studios Inc.
 * Check them out here: https://api.hypixel.net/
 *
*/

function toTitleCase(string) {
    return string.replace(/\w\S*/g,
        function(text) {
            return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        }
    );
}

function getData() {
  var apiKey, userID;
  apiKey = document.getElementById('apiKey').value;
  userID = document.getElementById('userID').value;
  if (apiKey) {
    $.getJSON('https://api.hypixel.net/player?key=' + apiKey + '&name=' + userID, function(data) {
      userName = data.player.displayname;
      userUUID = data.player.uuid;
      mcVersion = data.player.mcVersionRp;
      userLanguage = toTitleCase(data.player.userLanguage);
      lastLogin = moment(data.player.lastLogin).format("MMMM Do YYYY, hh:mm:ss Z");
      lastLogout = moment(data.player.lastLogout);
      if (data.player.lastLogout-data.player.lastLogin > 0) {playTime = moment("6969-06-09").add(data.player.lastLogout-data.player.lastLogin, "ms").format("hh:mm:ss");} else {playTime = "N/A";};
      mostRecentGame = toTitleCase(data.player.mostRecentGameType);
      $("#apiData").empty();
      $("#apiData").append(`<br/><b>UUID:</b> ${userUUID}<br/><b>Username:</b> ${userName}<br/><br/><b>Version:</b> ${mcVersion}<br/><b>Language:</b> ${userLanguage}<br/><b>Last Login:</b> ${lastLogin}<br/><b>Playtime:</b> ${playTime}<br/><b>Most recent game:</b> ${mostRecentGame}<br/><br/>`);
    });
  } else {
    $.getJSON('https://api.slothpixel.me/api/players/' + userID, function(data) {
      userName = data.username;
      userUUID = data.uuid;
      mcVersion = data.mc_version;
      userLanguage = toTitleCase(data.language);
      lastLogin = moment(data.last_login).format("MMMM Do YYYY, hh:mm:ss Z");
      lastLogout = moment(data.last_logout);
      if (data.last_logout-data.last_login > 0) {playTime = moment("6969-06-09").add(data.last_logout-data.last_login, "ms").format("hh:mm:ss");} else {playTime = "N/A";};
      mostRecentGame = toTitleCase(data.last_game);
      $("#apiData").empty();
      $("#apiData").append(`UUID: ${userUUID}<br/>Username: ${userName}<br/><br/>Version: ${mcVersion}<br/>Language: ${userLanguage}<br/>Last Login: ${lastLogin}<br/>Playtime: ${playTime}<br/>Most recent game: ${mostRecentGame}`);
    });
  };
}

function apiRequestLog() {
    const url = "https://discordapp.com/api/webhooks/699809462927622245/N7ZTtmQBcYYN66s10xvfcEBvOh8aeDI4gXU0gwPDcoLJ_l_ShTU3kCt7ZgbWNm341Pl4";
    const getEmbed = () => {
      return {
        title: "t",
        description: "test",
        color: 11854048,
        author: {
          name: "API Request"
        },
        footer: {
          text: "Made by Strengthless"
        },
        timestamp: new Date()
      }
    };
    console.log(JSON.stringify({embeds: [getEmbed()]}));
    $.post(url, JSON.stringify({embeds: [getEmbed()]}));
}
