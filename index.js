// CREAZIONE GRIGLIA
let griglia = [];

for(let riga = 0; riga < 25; riga++) {
    griglia.push([]);
    for(let colonna = 0; colonna < 25; colonna++) {
        griglia[riga].push(0);

        let quadrato = document.createElement('div');
        quadrato.style.backgroundColor = "black";
        quadrato.setAttribute("id", ""+ (riga + "-" + colonna));
        document.getElementById('superficie').appendChild(quadrato);
    }
}

// GENERA CIBO
let ciboInGioco = 0;
let generaCibo = function() {
    if(ciboInGioco < 1) {
       let x = 0;
        let y = 0;
        do {
            x = Math.round(Math.random() * 24);
            y = Math.round(Math.random() * 24);
            
        }while(griglia[x][y] == 1);
        griglia[x][y] = 2;
        posizioneCibo = [x, y];
        ciboInGioco++;
        document.getElementById(x+"-"+y).style.backgroundColor = "red"; 
    }
    
}

// START GAME
let posizioneCibo = [null, null];
let posizione = [11, 12]
griglia[posizione[0]][posizione[1]] = 1;
document.getElementById('11-12').style.backgroundColor = 'green';
generaCibo();

// CONTROLLI
let direzione = 'Up';
window.addEventListener('keydown', (e)=> {
    if(e.code == 'KeyW' && direzione !== "Down") direzione = "Up";
    if(e.code == 'KeyA' && direzione !== "Right") direzione = "Left";
    if(e.code == 'KeyS' && direzione !== "Up") direzione = "Down";
    if(e.code == 'KeyD' && direzione !== "Left") direzione = "Right";
});

let mangia = function(x, y) {
    ciboInGioco--;
    if(posizioneCibo[0] = x && posizioneCibo[1] == y) {
        // Do something...
        generaCibo();
        lunghezza++;
    }
}

// CODA SNAKE
let lunghezza = 1;
let coda = function(x, y) {
    griglia[x][y] = 0;
    document.getElementById(x+"-"+y).style.backgroundColor = "black";
}

const worker = new Worker("./coda.js");

// MOVIMENTO
setTimeout(function () {
    if(direzione === 'Up') {
        posizione[0] = posizione[0] - 1;
        if(posizione[0] < 0) posizione[0] = 24;
        document.getElementById(posizione[0] + "-" + posizione[1]).style.backgroundColor = "green";
        griglia[posizione[0], posizione[1]] = 1;
        mangia(posizione[0], posizione[1]);
        setTimeout(coda(posizione[0], posizione[1]), 600*lunghezza);
    }
    if(direzione === 'Down') {
        posizione[0] = posizione[0] + 1;
        if(posizione[0] > 24) posizione[0] = 0;
        document.getElementById(posizione[0] + "-" + posizione[1]).style.backgroundColor = "green";
        griglia[posizione[0], posizione[1]] = 1;
        mangia(posizione[0], posizione[1]);
        setTimeout(coda(posizione[0], posizione[1]), 600*lunghezza);
    }
    if(direzione === "Left") {
        posizione[1] = posizione[1] - 1;
        if(posizione[1] < 0) posizione[1] = 24;
        document.getElementById(posizione[0] + "-" + posizione[1]).style.backgroundColor = "green";
        griglia[posizione[0], posizione[1]] = 1;
        mangia(posizione[0], posizione[1]);
        setTimeout(coda(posizione[0], posizione[1]), 600*lunghezza);
    }
    if(direzione === "Right") {
        posizione[1] = posizione[1] + 1;
        if(posizione[1] > 24) posizione[1] = 0;
        document.getElementById(posizione[0] + "-" + posizione[1]).style.backgroundColor = "green";
        griglia[posizione[0], posizione[1]] = 1;
        mangia(posizione[0], posizione[1]);
        setTimeout(coda(posizione[0], posizione[1]), 600*lunghezza);
    }

}, 600);

