let text = "I'm comin' back to you And I hope you don't mind That I'm wasting your time, I know you want me too Even though you're not mine, You got that look in your eye, Come on, tell me where you at, when you back I won't keep you up, take a nap a little gasoline and a match, you just like it better when it's cold";

//Function that accepts a string and returns an array of the individual words while removing special characters
function parseText(corpus) {
  return corpus.toLowerCase().replace(/[^a-z\s]/ig, "").split(' ');
}

//Function that loops through the array to create an object of word pairs while skipping repeated words
function generateWordPairs(corpus) {
    let wordPairs = {};
    let words = parseText(corpus);
    for(let i = 0; i < words.length - 1; i++){
        let currentWord = words[i];
        let nextWord = words[i++];
        if (wordPairs[currentWord]){
            wordPairs[currentWord].push(nextWord);
        } else {
            wordPairs[currentWord] = [nextWord];
        }
    }
    return wordPairs;
}

//Function that takes the object and length of words to return a line of poetry
function writeLine(corpus, n) {
    let words = parseText(corpus);
    let wordPairs = generateWordPairs(corpus);
//Function that randomizes the key:value pair selected for the line of poetry
    function random(corpus) {
        let wordsList = words;
        let randomWords = Math.floor(wordsList.length * Math.random());
        return corpus[randomWords];
    }
    let newWord = random(words)
    let phrase = [newWord]

/* While the phrase is shorter than the provided number, keep adding words to the phrase
Checks that next word is different from current word pair */
    while (wordPairs[newWord]) {
        let nextWord = wordPairs[newWord];
        newWord = random(nextWord);
        phrase.push(newWord);
        if(phrase.length > n) {
            break;
        }
    }
    return phrase.join(' ');
}

//Function that accepts corpus and uses the writeLine helper function "n" number of times
function generatePoem(string, n) {
    for(let i = 0; i < n; i++) {
        let lines = Math.floor(Math.random() * 10) + 1;
        console.log(writeLine(string, lines));
    }
}

//Test
generatePoem(text, 9);
