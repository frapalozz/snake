                 
let griglia = [];

for(let i = 0; i < 625; i++) {
    griglia.push(null);

    let quadrato = document.createElement('div');
    quadrato.style.backgroundColor = "black";
    quadrato.setAttribute("id", ""+i);
    document.getElementById('superficie').appendChild(quadrato);
}