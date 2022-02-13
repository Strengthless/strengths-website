var words

fetch("./assets/words.txt")
.then(res => res.text())
.then(data => {
    words = data.split("\n")
});

function findWord(good, bad, placed) {
// assume "good" and "bad" are arrays, while "placed" is a length-of-5 string which consists of only characters and "_" for unknowns 
    var ans = [],
        regex = new RegExp(`${placed.replaceAll("_",  ".")}`, 'gi')

    good = good
    bad = bad
    console.log(good)
    console.log(bad)
    ans = words.filter(word => word.match(regex))
    ans = ans.filter(word => {
        for (x in good) {
            if (!word.includes(good[x])) return false
        }
        for (x in bad) {
            if (word.includes(bad[x])) return false;
        }
        return true
    })
    return ans
}