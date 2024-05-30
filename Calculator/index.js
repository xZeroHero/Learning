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
    return y
}

function clearScreen(){
    document.getElementById('result').value = ''
}


