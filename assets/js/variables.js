window.theme = "dark";

window.dayTimes = {
    morning: "Good Morning",
    afternoon: "Good Afternoon",
    evening: "Good Evening",
    night: "Good Night",
    generic: "Hello"
};

window.quotes = [
    "It always seems impossible until it’s done.",
    "Keep your eyes on the stars and your feet on the ground.",
    "It’s better to be a lion for a day than a sheep all your life.",
    "We may encounter many defeats but we must not be defeated.",
    "Life is really simple, but we insist on making it complicated.",
    "Your best life will not be found in comfort. It will be found in fighting for what you believe in.",
    "Death is not the greatest loss in life. The greatest loss is what dies inside us while we live.",
    "Care about what other people think and you will always be their prisoner."
];

window.bookmarks = [
    {
        title: "Outlook",
        icon: "./assets/bookmarks/outlook.png",
        hyperlink: "https://www.hotmail.com/"
    },
    {
        title: "Twitter",
        icon: "./assets/bookmarks/twitter.png",
        hyperlink: "https://twitter.com/"
    },
    {
        title: "iCloud",
        icon: "./assets/bookmarks/icloud.png",
        hyperlink: "https://www.icloud.com/"
    },
    {
        title: "YouTube",
        icon: "./assets/bookmarks/youtube.png",
        hyperlink: "https://www.youtube.com/"
    },
    {
        title: "Gmail",
        icon: "./assets/bookmarks/gmail.png",
        hyperlink: "https://mail.google.com/"
    },
    {
        title: "Reddit",
        icon: "./assets/bookmarks/reddit.png",
        hyperlink: "https://reddit.com/"
    },
    {
        title: "Soundcloud",
        icon: "./assets/bookmarks/soundcloud.png",
        hyperlink: "https://soundcloud.com"
    },
    {
        title: "Darksky",
        icon: "./assets/bookmarks/darksky.png",
        hyperlink: "https://darksky.net/poweredby/"
    },
    {
        title: "GitHub",
        icon: "./assets/bookmarks/github.png",
        hyperlink: "https://github.com/"
    }
];

window.getWeather = function() {
    setTimeout(getWeather, 300000); // 5 Minutes
    $.getJSON("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/5ca6c782b717e798085cc5c5b1d89985/22.45007,114.16877?exclude=minutely,hourly,daily,flags&units=si", function(data) {
        let temp = Math.round(data.currently.apparentTemperature*10)/10,
            city = "Hong Kong", // Because the Dark Sky API doesn't supply you with city names lol
            condition = data.currently.summary;

        $("#weather #details").text(`${temp}\u00B0 in Tai Po`);
        $("#weather #condition").text(condition);
        $("#weather #icon").attr("src", `./assets/icons/${data.currently.icon}.png`);

        return false;
    }).fail(() => console.log("An error has occurred while trying to import the weather data. Please contact Strengthless about the issue."));;

};
