window.theme = "dark";

window.dayTimes = {
    morning: "Good Morning",
    afternoon: "Good Afternoon",
    evening: "Good Evening",
    night: "Good Night",
    generic: "Hello"
};

window.quotes = [
    "You can't win if you don't participate.",
    "Try something today that you didn't do yesterday.",
    "I \u2665 Heidi!",
    "However difficult life may seem, there is always something you can do, and succeed at \u2014 Stephen Hawking",
    "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away \u2014 A. de Saint-Exupery",
    "As for the future, your task is not to foresee it, but to enable it \u2014 A. de Saint-Exupery",
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
        title: "Sherlock",
        icon: "./assets/bookmarks/sherlock.png",
        hyperlink: "https://api.kurisubrooks.com/panel/login"
    },
    {
        title: "GitHub",
        icon: "./assets/bookmarks/github.png",
        hyperlink: "https://github.com/"
    }
];

window.getWeather = function() {
    setTimeout(getWeather, 30000);
    $.getJSON("https://api.wunderground.com/api/a75da485666047dd/conditions_v11/q/NL/Volendam.json", function(data) {
        let temp = data.current_observation.temp_c,
            city = data.current_observation.display_location.city, 
            condition = data.current_observation.weather;
 
        $("#weather #details").text(`${temp}\u00B0 in ${city}`); 
        $("#weather #condition").text(condition); 
        $("#weather #icon").attr("src", `https://raw.githubusercontent.com/manifestinteractive/weather-underground-icons/master/dist/icons/white/png/128x128/${data.current_observation.icon}.png`); 
 
        return false;
    }).fail(() => console.log("An error has occurred while trying to import the weather data. Please contact Strengthless about the issue."));;

};
