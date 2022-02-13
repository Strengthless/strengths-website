fetch("./assets/js/solution.json")
.then(res => res.json())
.then(data => {
    solution = data;
})

/*console.log("Guess: raise")
console.log("Enter results with 0 = none, 1 = wrong location, 2 = correct.")
console.log("You can use either spaces or commas to separate letters, or nothing.")*/

var count = 0, solution;

function inputResult(result) {
    count += 1
    
    result = result.split("").join(",")

    if (result == "2,2,2,2,2") {
        alert(`Succeeded in ${count} guesses.`)
        document.location.reload()
        return
    }

    if (!solution["result"][result]) {
        alert(`Failed to find any solution. Possible responses were: \n${Object.keys(solution["result"])}`)
    }

    solution = solution["result"][result]

    if (!solution["result"]) {
        document.querySelector("legend").innerText = `Last possible word: "${solution["guess"]}"`;
        resetInput();
        // alert(`Last possible word in wordlist.\nFound in ${count} guesses.`)
        return
    }

    document.querySelector("legend").innerText = `Input your results of "${solution["guess"]}"`;
    resetInput();
}