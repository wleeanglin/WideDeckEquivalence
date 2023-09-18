const fs = require('fs');

const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6'];
const rankNames = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Sixe'];

const handRanks = ['SF', '5K', '5F', '4K', 'FH', '4F', 'S', '3K', '2P', '1P', 'HC'];

const straights = []; 

const stream = fs.createWriteStream('wideDeckEquivalence.txt');

let totalHands = 0;

stream.write('CLASS\t\t# OF HANDS\t\tCLASS NAME\n\n')

straightFlush(stream);
console.log("Straight flush cumulative hands: " + totalHands);
fiveKind(stream);
console.log("Five of a kind cumulative hands: " + totalHands);
fiveFlush(stream);
console.log("Five flush cumulative hands: " + totalHands);
fourKind(stream);
console.log("Four of a kind cumulative hands: " + totalHands);
fullHouse(stream);
console.log("Full house cumulative hands: " + totalHands);
fourFlush(stream);
console.log("Four flush cumulative hands: " + totalHands);
straight(stream);
console.log("Straight cumulative hands: " + totalHands);
threeKind(stream);
console.log("Three of a kind cumulative hands: " + totalHands);
twoPair(stream);
console.log("Two pair cumulative hands: " + totalHands);
onePair(stream);
console.log("One pair cumulative hands: " + totalHands);
highCard(stream);
console.log("High card cumulative hands: " + totalHands);

console.log("Total hands = " + totalHands);
console.log("Expected total hands = 3162510");

function straightFlush(stream) {
    for(i = 0; i < ranks.length - 3; i++) { 
        const str = ranks[i] + ranks[i + 1] + ranks[i + 2] + ranks[i + 3] + ranks[(i + 4)%ranks.length];
        straights.push(str); 
        stream.write(str + '\t\t' + 6 + '\t\t' + rankNames[i] + ' high straight flush' + '\n');
        totalHands+=6;
    }
}

function fiveKind(stream) {
    for(let i = 0; i < ranks.length; i++) {
        const fiveK = ranks[i].repeat(5);
        stream.write(fiveK + '\t\t' + 6 + '\t\t' + 'Five ' + rankNames[i] + 's' + '\n');
        totalHands+=6;
    }
}

function fiveFlush(stream) {
    for(let i = 0; i < ranks.length - 4; i++) {
        for(let j = i + 1; j < ranks.length - 3; j++) {
            for(let k = j + 1; k < ranks.length - 2; k++) {
                for(let l = k + 1; l < ranks.length - 1; l++) {
                    for(let m = l + 1; m < ranks.length; m++) {
                        const flush = ranks[i] + ranks[j] + ranks[k] + ranks[l] + ranks[m];
                        //Special case A9876
                        if (!(straights.includes(flush) || straights.includes(flush.substring(1) + ranks[i]))) {
                            stream.write(flush + '\t\t' + 6 + '\t\t' + rankNames[i] + ' high 5 flush' + '\n');
                            totalHands+=6;
                        }
                    }
                }
            }
        }
    }
}

function fourKind(stream) {
    for(let i = 0; i < ranks.length; i++) {
        for(let j = 0; j < ranks.length; j++) {
            if(j !== i) {
                const fourK = ranks[i].repeat(4) + ranks[j];
                stream.write(fourK + '\t\t' + 90 + '\t\t' + 'Four ' + rankNames[i] + 's' + '\n');
                totalHands+=90;
            }
        }
    }
}

function fullHouse(stream) {
    for(let i = 0; i < ranks.length; i++) {
        for(let j = 0; j < ranks.length; j++) {
            if(i !== j) {
                const fullH = ranks[i].repeat(3) + ranks[j].repeat(2);
                stream.write(fullH + '\t\t' + 300 + '\t\t' + rankNames[i] + 's full of ' + rankNames[j] + 's' + '\n');
                totalHands+=300;
            }
        }
    }
}

function fourFlush(stream) { 
    for(let i = 0; i < ranks.length - 3; i++) {
        for(let j = i + 1; j < ranks.length - 2; j++) {
            for(let k = j + 1; k < ranks.length - 1; k++) {
                for(let l = k + 1; l < ranks.length; l++) {
                    for(let m = 0; m < ranks.length; m++) {
                        const flush = ranks[i] + ranks[j] + ranks[k] + ranks[l] + ranks[m];
                        stream.write(flush + '\t\t' + 30 + '\t\t' + rankNames[i] + ' high 4 flush' + '\n');
                        totalHands+=30;
                    }
                }
            }
        }
    }
}

function straight(stream) {
    for(i = 0; i < ranks.length - 3; i++) { 
        const str = ranks[i] + ranks[i + 1] + ranks[i + 2] + ranks[i + 3] + ranks[(i + 4)%ranks.length];
        stream.write(str + '\t\t' + 7740 + '\t' + rankNames[i] + ' high straight' + '\n');
        totalHands+=7740;
    }
}

function threeKind(stream) { 
    for(let i = 0; i < ranks.length; i++) {
        for(let j = 0; j < ranks.length - 1; j++) {
            for(let k = j + 1; k < ranks.length; k++) {
                if(j !== i && i !== k) {
                    const threeK = ranks[i].repeat(3) + ranks[j] + ranks[k];
                    stream.write(threeK + '\t\t' + 720 + '\t\t' + 'Three ' + rankNames[i] + 's' + '\n');
                    totalHands+=720;
                }
            }
        }
    }
}

function twoPair(stream) {
    for(let i = 0; i < ranks.length - 1; i++) {
        for(let j = i + 1; j < ranks.length; j++) {
            for(let k = 0; k < ranks.length; k++) {
                const twoP = ranks[i].repeat(2) + ranks[j].repeat(2) + ranks[k]; 
                if(k !== i && k !== j) {
                    stream.write(twoP + '\t\t' + 1350 + '\t\t' + rankNames[i] + 's and ' + rankNames[j] + 's' + '\n');
                    totalHands+=1350;
                }
            }
        }
    }
}

function onePair(stream) {
    for(let i = 0; i < ranks.length; i++){
        for(let j = 0; j < ranks.length - 2; j++) {
            for(let k = j + 1; k < ranks.length - 1; k++){
                for(let l = k + 1; l < ranks.length; l++) {
                    if(j !== i && k !== i && l !== i) {
                        const oneP = ranks[i].repeat(2) + ranks[j] + ranks[k] + ranks[l];
                        stream.write(oneP + '\t\t' + 3210  + '\t\t' + 'Pair of ' + rankNames[i] + 's' + '\n');
                        totalHands+=3210;
                    }
                }
            }
        }
    }
} 

function highCard(stream) {
    for(let i = 0; i < ranks.length - 4; i++) {
        for(let j = i + 1; j < ranks.length - 3; j++) {
            for(let k = j + 1; k < ranks.length - 2; k++) {
                for(let l = k + 1; l < ranks.length - 1; l++) {
                    for(let m = l + 1; m < ranks.length; m++) {
                        const hc = ranks[i] + ranks[j] + ranks[k] + ranks[l] + ranks[m]; 
                        if(!(straights.includes(hc) || straights.includes(hc.substring(1) + ranks[i]))) {
                            stream.write(hc + '\t\t' + 7740 + '\t\t' + rankNames[i] + '-high' + '\n');
                            totalHands+=7740;
                        }
                    }
                }
            }
        }
    }
}