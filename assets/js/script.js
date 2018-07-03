/*
 *
 * Music is provided by Jokinami Radio.
 * Check them out here: http://radio.jokinami.me/
 * 
*/

var state = false;
var objcache = "default";

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function setBookmarks() {
    for (let item of bookmarks) {
        $("#bookmarks").append(`<li><a href="${item.hyperlink}"><img src="${item.icon}"><span>${item.title}</span></a></li>`);
    };
}

function toggleBookmarks() {
    state = !state;

    if (!state) {
        $(".overlay").fadeOut(100);
        $(".container").fadeIn(100);
    }

    if (state) {
        $(".overlay").fadeIn(100);
        $(".container").fadeOut(100);
    }

    $(".toggle").toggleClass("active");
}

function updateData() {
//    setTimeout(updateData, 5000); 
//    ^ [Currently removed due to the music stream downtime]
    $.getJSON("https://comet.shoutca.st/recentfeed/mushtunes/json/?nocache="+ (Math.floor(Math.random() * 1000)), (json) => {
      obj = json;
      if(obj !== objcache) {
        if((parseFloat(Math.floor(Date.now() / 1000)) - parseFloat(obj.items[0].date) - 15) < 0) {
          $("#songname").text(obj.items[1].title);
        } else {
          $("#songname").text(obj.items[0].title);
        }
        objcache = obj;
      }
    });
  }
  

function loop() {
    var hour = moment().format("H");
    $("#clock #time").text(moment().format("h:mm A"));
    $("#clock #date").text(moment().format("dddd, Do MMMM YYYY"));

    if (hour >= 17 && hour <= 18) {
        $("#daygreet").text(dayTimes.evening);
    } else if (hour >= 5 && hour <= 11) {
        $("#daygreet").text(dayTimes.morning);
    } else if (hour >= 19 && hour <= 23 || hour >= 0 && hour <= 4) {
        $("#daygreet").text(dayTimes.night);
    } else if (hour >= 12 && hour <= 16) {
        $("#daygreet").text(dayTimes.afternoon);
    } else {
        $("#daygreet").text(dayTimes.generic);
    }
}

function handleRequest(input) {
    let found = false;

    // figure out intent
    const patterns = {
        convert: /((?:\+|-)?\d*\.?\d+)\s?(.+) (?:to|as|in) (.+)/,
        money: /null/,
        url: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        radar: /^radar$/,
        weather: /^weather$/
    }

    for (const pattern of Object.keys(patterns)) {
        const match = new RegExp(patterns[pattern], "g");
        const exec = match.exec(input);

        if (!exec) continue;
        found = exec;
        console.log(found);

        $(".omnibox .results").html("");
        $(".omnibox .results").hide();
    }

    if (!found) {
        $(".omnibox .results").show();
        var url = "https://www.google.com/search?q=" + encodeURIComponent($("#text").val()).replace(/%20/g, "+");
        $(".omnibox .results").html(`<span>No Matches Found, <a target="_blank" href="${url}">Search Google?</a></span>`);

        return setTimeout(() => {
            $(".omnibox .results").fadeOut(750, () => {
                $(".omnibox .results").html("");
                $("#text").val("");
            });
        }, 5500);
    }
}

$(() => {
    loop();
    setBookmarks();
    getWeather();
    updateData();

    /mobile/i.test(navigator.userAgent) && setTimeout(() => { window.scrollTo(0, 1); }, 1000);

    $("#quote").text(randomItem(quotes));

    if (theme === "dark" || theme === "light") {
        $("body").addClass(theme);
    }

    setInterval(function() {
        loop();
    }, 1000);

    $("#search").on("submit", function(event) {
        event.preventDefault();
        handleRequest($("#text").val());
        return false;
    });

    $("#search").on("focusin", function(event) {
        $(".search").addClass("active");
    });

    $("#search").on("focusout", function(event) {
        $(".search").removeClass("active");
    });

    $("#show").on("click", function(event) {
        toggleBookmarks();
    });

    $(".overlay").on("click", function(event) {
        toggleBookmarks();
    });

    $(document).on("keyup", function(event) {
        if (event.keyCode === 27 || event.keyCode === 192) toggleBookmarks();
    });
});
