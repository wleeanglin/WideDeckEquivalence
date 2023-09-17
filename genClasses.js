const fs = require('fs');

const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6'];
const rankNames = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six'];

const handRanks = ['SF', '5K', '5F', '4K', 'FH', '4F', 'S', '3K', '2P', '1P', 'HC'];

const straights = []; 

const stream = fs.createWriteStream('wideDeckEquivalence.txt');

straightFlush(stream);
fiveKind(stream);
fiveFlush(stream);
fourKind(stream);
fullHouse(stream);
fourFlush(stream);
straight(stream);
threeKind(stream);
twoPair(stream);
onePair(stream);
highCard(stream);

function straightFlush(stream) {
    for(i = 0; i < ranks.length - 3; i++) { 
        const str = ranks[i] + ranks[i + 1] + ranks[i + 2] + ranks[i + 3] + ranks[(i + 4)%ranks.length];
        stream.write(str + '\t' + 6 + '\t' + rankNames[i] + ' high straight flush' + '\n');
    }
}

function fiveKind(stream) {
    for(let i = 0; i < ranks.length; i++) {
        const fiveK = ranks[i].repeat(5);
        stream.write(fiveK + '\t' + 6 + '\t' + 'Five ' + rankNames[i] + 's' + '\n');
    }
}

function fiveFlush(stream) {
    function fourFlush(stream) { 
        for(let i = 0; i < ranks.length - 4; i++) {
            for(let j = i + 1; j < ranks.length - 3; j++) {
                for(let k = j + 1; k < ranks.length - 2; k++) {
                    for(let l = k + 1; l < ranks.length - 1; l++) {
                        for(let m = l + 1; m < ranks.length; m++) {
                            const flush = ranks[i] + ranks[j] + ranks[k] + ranks[l] + ranks[m];
                            stream.write(flush + '\t' + 6 + '\t' + rankNAmes[i] + ' high 5 flush' + '\n');
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
                stream.write(fourK + '\t' + 90 + '\t' + 'Four ' + rankNames[i] + 's' + '\n');
            }
        }
    }
}

function fullHouse(stream) {
    for(let i = 0; i < ranks.length; i++) {
        for(let j = 0; j < ranks.length; j++) {
            if(i !== j) {
                const fullH = ranks[i].repeat(3) + ranks[j].repeat(2);
                stream.write(fullH + '\t' + 300 + '\t' + rankNames[i] + 's full of ' + rankNames[j] + 's' + '\n');
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
                        stream.write(flush + '\t' + 270 + '\t' + rankNames[i] + ' high 4 flush' + '\n');
                    }
                }
            }
        }
    }
}

function straight(stream) {
    for(i = 0; i < ranks.length - 3; i++) { 
        const str = ranks[i] + ranks[i + 1] + ranks[i + 2] + ranks[i + 3] + ranks[(i + 4)%ranks.length];
        straights.push(str); 
        stream.write(str + '\t' + 7740 + '\t' + rankNames[i] + ' high straight' + '\n');
    }
}

function threeKind(stream) { 
    for(let i = 0; i < ranks.length; i++) {
        for(let j = 0; j < ranks.length - 1; j++) {
            for(let k = j + 1; k < ranks.length; k++) {
                if(j !== i && i !== k) {
                    const threeK = ranks[i].repeat(3) + ranks[j] + ranks[k];
                    stream.write(threeK + '\t' + 720 + '\t' + 'Three ' + rankNames[i] + 's' + '\n');
                }
            }
        }
    }
}

function twoPair(stream) {
    for(let i = 0; i < ranks.length - 1; i++) {
        for(let j = i; j < ranks.length; j++) {
            for(let k = 0; k < ranks.length; k++) {
                const twoP = ranks[i].repeat(2) + ranks[j].repeat(2) + ranks[k]; 
                stream.write(twoP + '\t' + 1350 + '\t' + rankNames[i] + 's and ' + rankNames[j] + 's' + '\n');
            }
        }
    }
}

function onePair(stream) {
    for(let i = 0; i < ranks.length; i++){
        for(let j = 0; j < ranks.length - 2; j++) {
            for(let k = j + 1; k < ranks.length - 1; k++){
                for(let l = k + 1; l < ranks.length; l++) {
                    const oneP = ranks[i].repeat(2) + ranks[j] + ranks[k] + ranks[l];
                    stream.write(oneP + '\t' + 3210  + '\t' + 'Pair of ' + rankNames[i] + 's' + '\n');
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
                        if(!straights.includes(hc)) {
                            stream.write(hc + '\t' + 7740 + '\t' + rankNames[i] + '-high' + '\n');
                        }
                    }
                }
            }
        }
    }
}