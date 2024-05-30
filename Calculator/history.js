let history = []; // Array to store the history of calculations


document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        solve();
    }
});

function display(val) {
    document.getElementById('result').value += val
    return val
}

function solve(){
    let x = document.getElementById('result').value
    let y = eval(x);
    document.getElementById('result').value = y

    // Add the calculation and result to the history array
    history.push({ calculation: x, result: y });

    // Limit the history array to the last 15 items
    if (history.length > 15) {
        history.shift();
    }

    // Update the history display
    showHistory();

    return y
}

function clearScreen(){
    document.getElementById('result').value = ''
}

function showHistory() {
    // Create a string that contains the history of calculations
    let historyString = history.slice().reverse().map(item => `${item.calculation} = ${item.result}`).join('<br>');

    // Update the history div with the history of calculations
    document.getElementById('history').innerHTML = historyString;
}