window.theme = "dark";

window.dayTimes = {
    morning: "Good Morning",
    day: "Good Day",
    afternoon: "Good Afternoon",
    evening: "Good Evening",
    generic: "Hello"
};

window.quotes = [
    "You can't win if you don't participate.",
    "Try something today that you didn't do yesterday.",
    "I love you the more in that I believe you had liked me for my own sake and for nothing else. \u2014 John Keats",
    "However difficult life may seem, there is always something you can do, and succeed at \u2014 Stephen Hawking",
    "You can't blame gravity for falling in love. \u2014 Albert Einstein",
    "Cherry Yeung... \uD83D\uDC94",
    "Cherry Yeung... \uD83D\uDC94",
    "Cherry Yeung... \uD83D\uDC94",
    "Cherry Yeung... \uD83D\uDC94"
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
    $.getJSON("https://api.kurisubrooks.com/api/weather", function(data) {
        if (!data.ok) {
            $("#weather #details").text("Error");
            $("#weather #condition").text(data.error);
            $("#weather #hilo").text("Try again later");
            $("#weather #icon").attr("src", "https://api.kurisubrooks.com/static/weather/icons_v2/unknown.png");
            return false;
        }

        let temp = data.weather.temperature,
            city = data.location.city,
            condition = data.weather.condition;

        $("#weather #details").text(`${temp}\u00B0 in ${city}`);
        $("#weather #condition").text(condition);
        $("#weather #icon").attr("src", `https://api.kurisubrooks.com/static/weather/icons_v2/${data.weather.icon}.png`);

        return false;
    });
};
