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
    if(ciboInGioco == 0) {
        let x = 0;
        let y = 0;
        do {
            x = Math.round(Math.random() * 24);
            y = Math.round(Math.random() * 24);
            
        }while(griglia[x][y] === 1);
        griglia[x][y] = 2;
        posizioneCibo = [x, y];
        ciboInGioco++;
        document.getElementById(x+"-"+y).style.backgroundColor = "red"; 
    }
    
}

// START GAME
let punteggio = 0;
let puntSchermo = document.querySelector('h1');
puntSchermo.textContent = punteggio
let posizioneSnake = [];
let posizioneCibo = [null, null];
let posizione = [11, 12];
posizioneSnake.push([posizione[0], posizione[1]]);
griglia[posizione[0]][posizione[1]] = 1;
document.getElementById(posizione[0]+"-"+posizione[1]).style.backgroundColor = 'green';
generaCibo();
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
    if(posizioneCibo[0] == x && posizioneCibo[1] == y) {
        ciboInGioco--;
        generaCibo();
        lunghezza++;
        punteggio += 100;
        console.log(punteggio);
    }
}

// CODA SNAKE
let lunghezza = 1;
let tempo = 1;
let coda = function(x, y) {
    griglia[x][y] = 0;
    document.getElementById(x+"-"+y).style.backgroundColor = "black";
    posizioneSnake.shift();
}

// COLLISION CHECKER
let collision = false;
let collisionChecker = function(x,y) {
    if(griglia[x][y] == 1) collision = true;
}


// MOVIMENTO
setInterval(function () {
    if(!collision) {
        if(direzione === 'Up') {
            posizione[0] = posizione[0] - 1;
            if(posizione[0] < 0) posizione[0] = 24;
            collisionChecker(posizione[0],posizione[1]);
            posizioneSnake.push([posizione[0],posizione[1]]);
            document.getElementById(posizione[0] + "-" + posizione[1]).style.backgroundColor = "green";
            griglia[posizione[0]][posizione[1]] = 1;
            mangia(posizione[0], posizione[1]);
        }
        if(direzione === 'Down') {
            posizione[0] = posizione[0] + 1;
            if(posizione[0] > 24) posizione[0] = 0;
            collisionChecker(posizione[0],posizione[1]);
            posizioneSnake.push([posizione[0],posizione[1]]);
            document.getElementById(posizione[0] + "-" + posizione[1]).style.backgroundColor = "green";
            griglia[posizione[0]][posizione[1]] = 1;
            mangia(posizione[0], posizione[1]);
        }
        if(direzione === "Left") {
            posizione[1] = posizione[1] - 1;
            if(posizione[1] < 0) posizione[1] = 24;
            collisionChecker(posizione[0],posizione[1]);
            posizioneSnake.push([posizione[0],posizione[1]]);
            document.getElementById(posizione[0] + "-" + posizione[1]).style.backgroundColor = "green";
            griglia[posizione[0]][posizione[1]] = 1;
            mangia(posizione[0], posizione[1]);
        }
        if(direzione === "Right") {
            posizione[1] = posizione[1] + 1;
            if(posizione[1] > 24) posizione[1] = 0;
            collisionChecker(posizione[0],posizione[1]);
            posizioneSnake.push([posizione[0],posizione[1]]);
            document.getElementById(posizione[0] + "-" + posizione[1]).style.backgroundColor = "green";
            griglia[posizione[0]][posizione[1]] = 1;
            mangia(posizione[0], posizione[1]);
        }

        
        if(tempo == lunghezza){
            coda(posizioneSnake[0][0], posizioneSnake[0][1]);
        }
        else if(tempo < lunghezza) tempo++;
    }
    puntSchermo.textContent = punteggio
    
    

}, 100);
