//zmiiana jezyka interfaceu

const word = document.querySelector('#word');
const wordHandler = document.querySelector('#word-handler');
const addWord = document.querySelector('#add-word');
const wordRound = document.querySelector('#word-round');
const counterWin = document.querySelector('#counter-win');
const counterLose = document.querySelector('#counter-lose');
const skipBtn = document.querySelector('#skip-word');
const changeLanguage = document.querySelector('#change-language');
const wordHandlerEng = document.querySelector('#word-handler-eng');
const wordHandlerPl = document.querySelector('#word-handler-pl');

let learn = true;
let dict = [];
let actualWord = [];
let dictionary = [
    ["being decisive", "być w stanie podejmować szybkie decyzje"],
    ['to attain objectives', 'osiągać cele'],
    ["being decisive","być w stanie podejmować szybkie decyzje"],
    ['to attain objectives','osiągać cele'],
    ['to achieve sth','osiągać coś'],
    ['to make decisions','podejmować decyzje'],
    ['to supervise people','nadzorować ludzi'],
    ['to innovate','wprowadzać coś nowego'],
    ['to adapt','dostosowywać się'],
    ['to verify','weryfikować'],
    ['expertise','wiedza'],
    ['effort','wysiłek'],
    ['amend','poprawka'],
    ['ultimate','ostateczny'],
    ['downfall','upadek'],
    ['to design','projektować'],
    ['to make sure','upewniać się'],
    ['to help sb out','pomóc komuś'],
    ['to establish','zakładać'],
    ['principles','zasady'],
    ['to display','wystawiać'],
    ['merchandise','towar'],
    ['store','sklep'],
    ['layout','układ graficzny'],
    ['to maintain','utrzymywać'],
    ['to price','wyceniać'],
    ['to report to','podlegać komuś'],
    ['subordinates','podwładni'],
    ['superior','przełożony'],
    ['successive','następujący po sobie'],
    ['chain of command','łańcuch poleceń'],
    ['colleagues','koledzy'],
    ['personnel','pracownicy'],
    ['permanent','stały'],
    ['goal','cel'],
    ['overlap','część wspólna'],
    ['to overlap','układać tak aby części na siebie zachodziły'],
    ['profit','zysk'],
    ['to increase','zwiększać się'],
    ['to diminish','zmniejszać się'],
    ['division','dział'],
    ['to split up','rozdzielać'],
    ['capacity','wydajność'],
    ['commission','prowizja'],
    ['features','cechy'],
];

//checking dictionary in localStorage
if (JSON.parse(localStorage.getItem('dictionary')) === null) {
    dict = dictionary;
    saveToLocalStorage();
} else {
    dict = JSON.parse(localStorage.getItem('dictionary'));
}

function counterWinAddition() {
    counterWin.textContent = `${parseInt(counterWin.textContent) + 1}`;
}

function skipWord() {
    counterLose.textContent = `${parseInt(counterLose.textContent) + 1}`;
    start();
    word.value = '';
}

function changeLanguages() {
    learn = !learn;
    start();
}

function saveToLocalStorage() {
    localStorage.setItem('dictionary', JSON.stringify(dict));
}

function start() {
    const random = Math.floor(Math.random()* dict.length);
    const wordDict = dict[random];
    console.log(wordDict);
    let key = wordDict[0];
    let value = wordDict[1];
    if (actualWord[0] === key || actualWord[1] === key) {
        return start();
    }
    if (learn === true) {
        actualWord[0] = key;
        actualWord[1] = value;
    } else {
        actualWord[1] = key;
        actualWord[0] = value;
    }
    wordRound.textContent = actualWord[1];
}

function checkingWord(e) {
    const target = e.target.value;
    // console.log(actuallyWord[0]);
    if (actualWord[0] === target) {
        start();
        counterWinAddition();
        word.value = '';
    }
}

function addToDict() {
    if (wordHandlerEng.value === '' || wordHandlerPl.value === '') {
        return alert('Nie wprowadzono poprawnie danych!');
    }

    let eng = wordHandlerEng.value;
    let pl = wordHandlerPl.value;
    dict.push([wordHandlerEng.value, wordHandlerPl.value]);
    saveToLocalStorage();
    wordHandlerEng.value = '';
    wordHandlerPl.value = '';
    console.log(dict);
}

addWord.addEventListener('click', () => addToDict());
skipBtn.addEventListener('click', () => skipWord());
word.addEventListener('input', e => checkingWord(e));
changeLanguage.addEventListener('click', () => changeLanguages());
start();
