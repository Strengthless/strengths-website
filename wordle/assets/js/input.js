window.onload = () => {
    const inputElements = [...document.querySelectorAll('input.code-input')]

    inputElements.forEach((ele, index) => {
        ele.addEventListener('keydown', (e) => {
            // if the keycode is backspace & the current field is empty
            // focus the input before the current. The event then happens
            // which will clear the input before the current
            if (e.keyCode === 8 && e.target.value === '') inputElements[Math.max(0, index - 1)].focus()
            if (e.keyCode === 13 && window.location.href.includes("solver.html")) submitSolverResult();
        })
        ele.addEventListener('input', (e) => {
            // take the first character of the input
            // this actually breaks if you input an emoji like 👨‍👩‍👧‍👦....
            // but I'm willing to overlook insane security code practices.
            const [first, ...rest] = e.target.value.toUpperCase()
            e.target.value = first ?? '' // the `??` '' is for the backspace usecase
            const lastInputBox = index === inputElements.length - 1
            const insertedContent = first !== undefined
            if (insertedContent && !lastInputBox) {
                // continue to input the rest of the string
                inputElements[index + 1].focus()
                if (window.location.href.includes("solver.html")) {inputElements[index + 1].value = rest.join('')}
                inputElements[index + 1].dispatchEvent(new Event('input'))
            }
        })
    })

    /*const yellowAndGrayInputs = [...document.querySelectorAll('.charsets')]

    yellowAndGrayInputs.forEach((ele, index) => {
        ele.addEventListener('input', (e) => {
            if ((e.keyCode < 65 || e.keyCode > 90) && e.keyCode != 8) e.preventDefault()
            if (e.keyCode >= 65 && e.keyCode <= 90) {
                e.preventDefault()
                yellowAndGrayInputs[index].value += e.target.value.toUpperCase()
            }
        })
    })*/
};

function submitSolverResult() {
    let code = [...document.querySelectorAll('input.code-input')]
      .filter(({name})=>name)
      .map(({value})=>value)
      .join('')
    if (code.match(/[012]{5}/)) {
        inputResult(code);
    } else {
        alert("Please input a valid code!")
        resetInput();
    }
}

function resetInput() {
    [...document.querySelectorAll('input.code-input')].forEach((ele) => {
        ele.value = '';
    })
    document.querySelectorAll('input.code-input')[0].focus()
    // document.querySelectorAll('input.code-input')[0].blur()
}

function submitFinderResult() {
    let good = [...document.querySelector('input.good').value.split("")],
        bad = [...document.querySelector('input.bad').value.split("")],
        code = [...document.querySelectorAll('input.code-input')]
        .filter(({name})=>name)
        .map(({value})=> value ? value : "_")
        .join(''),
        answer = [];
        console.log(good, bad, code)
    if (code.match(/[A-Z_]{5}/)) {
        answer = findWord(good, bad, code)
        console.log(answer)
        document.querySelector(".results").innerText = (answer.length > 5 ? `${answer.slice(0, 5).join(", ")}, etc...` : `${answer.join(", ")}.`)
    } else {
        alert("Please input a valid code!")
        resetInput();
    }
}