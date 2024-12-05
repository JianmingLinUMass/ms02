const Database = require('./database.js');  // Assuming your database.js file is in the same directory
const db = new Database('./questions.db');  // Path to your SQLite database

// Questions you want to insert
// (question, answer, language, category, exception, possible_answers)
const pastSimpleQuestions = [
    { question: "What is the past tense of 'arrive'?", answer: "arrived", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'ask'?", answer: "asked", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'build'?", answer: "built", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'close'?", answer: "closed", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'dream'?", answer: "dreamed", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'give'?", answer: "gave", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'happen'?", answer: "happened", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'hope'?", answer: "hoped", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'learn'?", answer: "learned", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'like'?", answer: "liked", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'listen'?", answer: "listened", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'look'?", answer: "looked", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'move'?", answer: "moved", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'need'?", answer: "needed", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'open'?", answer: "opened", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'play'?", answer: "played", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'pull'?", answer: "pulled", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'put'?", answer: "put", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'remember'?", answer: "remembered", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'say'?", answer: "said", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'show'?", answer: "showed", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'stand'?", answer: "stood", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'start'?", answer: "started", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'stay'?", answer: "stayed", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'stop'?", answer: "stopped", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'take'?", answer: "took", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'talk'?", answer: "talked", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'think'?", answer: "thought", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'turn'?", answer: "turned", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'visit'?", answer: "visited", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'watch'?", answer: "watched", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'work'?", answer: "worked", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'understand'?", answer: "understood", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'forget'?", answer: "forgot", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'walk'?", answer: "walked", language: "english", category: "past-simple", exception: false, possible_answers: "walked,walken,walkeded" },
    { question: "What is the past tense of 'eat'?", answer: "ate", language: "english", category: "past-simple", exception: true, possible_answers: "eaten,ate,ated" },
    { question: "What is the past tense of 'sleep'?", answer: "slept", language: "english", category: "past-simple", exception: false, possible_answers: "slept,sleped,sleeped" },
    { question: "What is the past tense of 'help'?", answer: "helped", language: "english", category: "past-simple", exception: false, possible_answers: "helped,helpen,helpted" },
    { question: "What is the past tense of 'write'?", answer: "wrote", language: "english", category: "past-simple", exception: true, possible_answers: "wrote,writed,writeed" },
    { question: "What is the past tense of 'go'?", answer: "went", language: "english", category: "past-simple", exception: true, possible_answers: "go,goed,going" },
    { question: "What is the past tense of 'dance'?", answer: "danced", language: "english", category: "past-simple", exception: false, possible_answers: "danced,danceded,dancen" },
    { question: "What is the past tense of 'catch'?", answer: "caught", language: "english", category: "past-simple", exception: true, possible_answers: "catch,catched,caught" },
    { question: "What is the past tense of 'drink'?", answer: "drank", language: "english", category: "past-simple", exception: true, possible_answers: "drink,drank,drankned" },
    { question: "What is the past tense of 'read'?", answer: "read", language: "english", category: "past-simple", exception: false, possible_answers: "read,readed,red" },
    { question: "What is the past tense of 'sing'?", answer: "sang", language: "english", category: "past-simple", exception: true, possible_answers: "sung,sang,sangned" },
    { question: "What is the past tense of 'run'?", answer: "ran", language: "english", category: "past-simple", exception: true, possible_answers: "ran,runed,runned" },
    { question: "What is the past tense of 'throw'?", answer: "threw", language: "english", category: "past-simple", exception: true, possible_answers: "threw,throwed,throwen" },
    { question: "What is the past tense of 'swim'?", answer: "swam", language: "english", category: "past-simple", exception: true, possible_answers: "swam,swamned,swimmed" },
    { question: "What is the past tense of 'make'?", answer: "made", language: "english", category: "past-simple", exception: true, possible_answers: "made,maded,maked" },
    { question: "What is the past tense of 'tell'?", answer: "told", language: "english", category: "past-simple", exception: true, possible_answers: "told,telled,tolded" },
    { question: "What is the past tense of 'find'?", answer: "found", language: "english", category: "past-simple", exception: true, possible_answers: "found,finded,founded" },
    { question: "What is the past tense of 'climb'?", answer: "climbed", language: "english", category: "past-simple", exception: false, possible_answers: "climbed,climben,climbeded" },
    { question: "What is the past tense of 'drive'?", answer: "drove", language: "english", category: "past-simple", exception: true, possible_answers: "drove,drived,driven" },
    { question: "What is the past tense of 'fly'?", answer: "flew", language: "english", category: "past-simple", exception: true, possible_answers: "flew,flyed,fliwn" },
    { question: "What is the past tense of 'begin'?", answer: "began", language: "english", category: "past-simple", exception: true, possible_answers: "began,beginned,begined" },
    { question: "What is the past tense of 'cut'?", answer: "cut", language: "english", category: "past-simple", exception: false, possible_answers: "cut,cutted,cuten" },
    { question: "What is the past tense of 'jump'?", answer: "jumped", language: "english", category: "past-simple", exception: false, possible_answers: "jumped,jumpen,jumpeded" },
    { question: "What is the past tense of 'laugh'?", answer: "laughed", language: "english", category: "past-simple", exception: false, possible_answers: "laughed,laugheded,laughen" },
    { question: "What is the past tense of 'teach'?", answer: "taught", language: "english", category: "past-simple", exception: true, possible_answers: "taught,teached,teacheded" },
    { question: "What is the past tense of 'sell'?", answer: "sold", language: "english", category: "past-simple", exception: true, possible_answers: "sold,selled,saled" },
    { question: "What is the past tense of 'win'?", answer: "won", language: "english", category: "past-simple", exception: true, possible_answers: "won,winned,win" },
    { question: "What is the past tense of 'meet'?", answer: "met", language: "english", category: "past-simple", exception: true, possible_answers: "met,meeted,meted" },
    { question: "What is the past tense of 'buy'?", answer: "bought", language: "english", category: "past-simple", exception: true, possible_answers: "bought,boughted,buyed" },
    { question: "What is the past tense of 'see'?", answer: "saw", language: "english", category: "past-simple", exception: true, possible_answers: "saw,seened,seen" },
    { question: "What is the past tense of 'speak'?", answer: "spoke", language: "english", category: "past-simple", exception: true, possible_answers: "spoke,speaked,spoken" },
    { question: "What is the past tense of 'sit'?", answer: "sat", language: "english", category: "past-simple", exception: true, possible_answers: "sat,sitted,sitted" },
    { question: "What is the past tense of 'do'?", answer: "did", language: "english", category: "past-simple", exception: true, possible_answers: "did,doed,done" },
    { question: "What is the past tense of 'hear'?", answer: "heard", language: "english", category: "past-simple", exception: false, possible_answers: "heard,heared,heareded" },
    { question: "What is the past tense of 'come'?", answer: "came", language: "english", category: "past-simple", exception: true, possible_answers: "came,comen,comded" }
]


const presentSimpleQuestions = [
    { question: "What is the present tense of 'to arrive'?", answer: "arrive", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to ask'?", answer: "ask", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to build'?", answer: "build", language: "english", category: "present-simple", exception: true },
    { question: "What is the present tense of 'to close'?", answer: "close", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to dream'?", answer: "dream", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to give'?", answer: "give", language: "english", category: "present-simple", exception: true },
    { question: "What is the present tense of 'to happen'?", answer: "happen", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to hope'?", answer: "hope", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to learn'?", answer: "learn", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to like'?", answer: "like", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to listen'?", answer: "listen", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to look'?", answer: "look", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to move'?", answer: "move", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to need'?", answer: "need", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to open'?", answer: "open", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to play'?", answer: "play", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to pull'?", answer: "pull", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to put'?", answer: "put", language: "english", category: "present-simple", exception: true },
    { question: "What is the present tense of 'to remember'?", answer: "remember", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to say'?", answer: "say", language: "english", category: "present-simple", exception: true },
    { question: "What is the present tense of 'to show'?", answer: "show", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to stand'?", answer: "stand", language: "english", category: "present-simple", exception: true },
    { question: "What is the present tense of 'to start'?", answer: "start", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to stay'?", answer: "stay", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to stop'?", answer: "stop", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to take'?", answer: "take", language: "english", category: "present-simple", exception: true },
    { question: "What is the present tense of 'to talk'?", answer: "talk", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to think'?", answer: "think", language: "english", category: "present-simple", exception: true },
    { question: "What is the present tense of 'to turn'?", answer: "turn", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to visit'?", answer: "visit", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to watch'?", answer: "watch", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to work'?", answer: "work", language: "english", category: "present-simple", exception: false },
    { question: "What is the present tense of 'to understand'?", answer: "understand", language: "english", category: "present-simple", exception: true },
    { question: "What is the present tense of 'to forget'?", answer: "forget", language: "english", category: "present-simple", exception: true },
    { question: "What is the present tense of 'to walk'?", answer: "walk", language: "english", category: "present-simple", exception: false, possible_answers: "walk,walks,walking" },
    { question: "What is the present tense of 'to eat'?", answer: "eat", language: "english", category: "present-simple", exception: true, possible_answers: "eat,eats,eating" },
    { question: "What is the present tense of 'to sleep'?", answer: "sleep", language: "english", category: "present-simple", exception: false, possible_answers: "sleep,sleeps,sleeping" },
    { question: "What is the present tense of 'to help'?", answer: "help", language: "english", category: "present-simple", exception: false, possible_answers: "help,helps,helping" },
    { question: "What is the present tense of 'to write'?", answer: "write", language: "english", category: "present-simple", exception: true, possible_answers: "write,writes,writing" },
    { question: "What is the present tense of to go?", answer: "go", language: "english", category: "present-simple", exception: false, possible_answers: "go,going,gone" },
    { question: "What is the present tense of to dance?", answer: "dance", language: "english", category: "present-simple", exception: false, possible_answers: "dance,dancing,danced" },
    { question: "What is the present tense of to catch?", answer: "catch", language: "english", category: "present-simple", exception: false, possible_answers: "catch,catching,caught" },
    { question: "What is the present tense of to drink?", answer: "drink", language: "english", category: "present-simple", exception: false, possible_answers: "drink,drinking,drunk" },
    { question: "What is the present tense of to read?", answer: "read", language: "english", category: "present-simple", exception: false, possible_answers: "read,reading,read" },
    { question: "What is the present tense of to sing?", answer: "sing", language: "english", category: "present-simple", exception: false, possible_answers: "sing,singing,sung" },
    { question: "What is the present tense of to run?", answer: "run", language: "english", category: "present-simple", exception: false, possible_answers: "run,running,run" },
    { question: "What is the present tense of to throw?", answer: "throw", language: "english", category: "present-simple", exception: false, possible_answers: "throw,throwing,thrown" },
    { question: "What is the present tense of to swim?", answer: "swim", language: "english", category: "present-simple", exception: false, possible_answers: "swim,swimming,swum" },
    { question: "What is the present tense of to make?", answer: "make", language: "english", category: "present-simple", exception: false, possible_answers: "make,making,made" },
    { question: "What is the present tense of to tell?", answer: "tell", language: "english", category: "present-simple", exception: false, possible_answers: "tell,telling,told" },
    { question: "What is the present tense of to find?", answer: "find", language: "english", category: "present-simple", exception: false, possible_answers: "find,finding,found" },
    { question: "What is the present tense of to climb?", answer: "climb", language: "english", category: "present-simple", exception: false, possible_answers: "climb,climbing,climbed" },
    { question: "What is the present tense of to drive?", answer: "drive", language: "english", category: "present-simple", exception: false, possible_answers: "drive,driving,drove" },
    { question: "What is the present tense of to fly?", answer: "fly", language: "english", category: "present-simple", exception: false, possible_answers: "fly,flying,flew" },
    { question: "What is the present tense of to begin?", answer: "begin", language: "english", category: "present-simple", exception: false, possible_answers: "begin,beginning,began" },
    { question: "What is the present tense of to cut?", answer: "cut", language: "english", category: "present-simple", exception: false, possible_answers: "cut,cutting,cut" },
    { question: "What is the present tense of to jump?", answer: "jump", language: "english", category: "present-simple", exception: false, possible_answers: "jump,jumping,jumped" },
    { question: "What is the present tense of to laugh?", answer: "laugh", language: "english", category: "present-simple", exception: false, possible_answers: "laugh,laughing,laughed" },
    { question: "What is the present tense of to teach?", answer: "teach", language: "english", category: "present-simple", exception: false, possible_answers: "teach,teaching,taught" },
    { question: "What is the present tense of to sell?", answer: "sell", language: "english", category: "present-simple", exception: false, possible_answers: "sell,selling,sold" },
    { question: "What is the present tense of to win?", answer: "win", language: "english", category: "present-simple", exception: false, possible_answers: "win,winning,won" },
    { question: "What is the present tense of to meet?", answer: "meet", language: "english", category: "present-simple", exception: false, possible_answers: "meet,meeting,met" },
    { question: "What is the present tense of to buy?", answer: "buy", language: "english", category: "present-simple", exception: false, possible_answers: "buy,buying,bought" },
    { question: "What is the present tense of to see?", answer: "see", language: "english", category: "present-simple", exception: false, possible_answers: "see,seeing,saw" },
    { question: "What is the present tense of to speak?", answer: "speak", language: "english", category: "present-simple", exception: false, possible_answers: "speak,speaking,spoke" },
    { question: "What is the present tense of to sit?", answer: "sit", language: "english", category: "present-simple", exception: false, possible_answers: "sit,sitting,sat" },
    { question: "What is the present tense of to do?", answer: "do", language: "english", category: "present-simple", exception: false, possible_answers: "do,doing,did" },
    { question: "What is the present tense of to hear?", answer: "hear", language: "english", category: "present-simple", exception: false, possible_answers: "hear,hearing,heard" },
    { question: "What is the present tense of to come?", answer: "come", language: "english", category: "present-simple", exception: false, possible_answers: "come,coming,came" }
]

pastContinuousQuestions = [
    { question: "What is the past continuous tense of 'to walk'?", answer: "was walking", language: "english", category: "past-continuous", exception: false, possible_answers: "was walking" },
    { question: "What is the past continuous tense of 'to eat'?", answer: "was eating", language: "english", category: "past-continuous", exception: true, possible_answers: "was eating" },
    { question: "What is the past continuous tense of 'to sleep'?", answer: "was sleeping", language: "english", category: "past-continuous", exception: false, possible_answers: "was sleeping" },
    { question: "What is the past continuous tense of 'to help'?", answer: "was helping", language: "english", category: "past-continuous", exception: false, possible_answers: "was helping" },
    { question: "What is the past continuous tense of 'to write'?", answer: "was writing", language: "english", category: "past-continuous", exception: true, possible_answers: "was writing" },
    { question: "What is the past continuous tense of 'to go'?", answer: "was going", language: "english", category: "past-continuous", exception: false, possible_answers: "was going" },
    { question: "What is the past continuous tense of 'to dance'?", answer: "was dancing", language: "english", category: "past-continuous", exception: false, possible_answers: "was dancing" },
    { question: "What is the past continuous tense of 'to catch'?", answer: "was catching", language: "english", category: "past-continuous", exception: false, possible_answers: "was catching" },
    { question: "What is the past continuous tense of 'to drink'?", answer: "was drinking", language: "english", category: "past-continuous", exception: false, possible_answers: "was drinking" },
    { question: "What is the past continuous tense of 'to read'?", answer: "was reading", language: "english", category: "past-continuous", exception: false, possible_answers: "was reading" },
    { question: "What is the past continuous tense of 'to sing'?", answer: "was singing", language: "english", category: "past-continuous", exception: false, possible_answers: "was singing" },
    { question: "What is the past continuous tense of 'to run'?", answer: "was running", language: "english", category: "past-continuous", exception: false, possible_answers: "was running" },
    { question: "What is the past continuous tense of 'to throw'?", answer: "was throwing", language: "english", category: "past-continuous", exception: false, possible_answers: "was throwing" },
    { question: "What is the past continuous tense of 'to swim'?", answer: "was swimming", language: "english", category: "past-continuous", exception: false, possible_answers: "was swimming" },
    { question: "What is the past continuous tense of 'to make'?", answer: "was making", language: "english", category: "past-continuous", exception: false, possible_answers: "was making" },
    { question: "What is the past continuous tense of 'to tell'?", answer: "was telling", language: "english", category: "past-continuous", exception: false, possible_answers: "was telling" },
    { question: "What is the past continuous tense of 'to find'?", answer: "was finding", language: "english", category: "past-continuous", exception: false, possible_answers: "was finding" },
    { question: "What is the past continuous tense of 'to climb'?", answer: "was climbing", language: "english", category: "past-continuous", exception: false, possible_answers: "was climbing" },
    { question: "What is the past continuous tense of 'to drive'?", answer: "was driving", language: "english", category: "past-continuous", exception: false, possible_answers: "was driving" },
    { question: "What is the past continuous tense of 'to fly'?", answer: "was flying", language: "english", category: "past-continuous", exception: false, possible_answers: "was flying" },
    { question: "What is the past continuous tense of 'to begin'?", answer: "was beginning", language: "english", category: "past-continuous", exception: false, possible_answers: "was beginning" },
    { question: "What is the past continuous tense of 'to cut'?", answer: "was cutting", language: "english", category: "past-continuous", exception: false, possible_answers: "was cutting" },
    { question: "What is the past continuous tense of 'to jump'?", answer: "was jumping", language: "english", category: "past-continuous", exception: false, possible_answers: "was jumping" },
    { question: "What is the past continuous tense of 'to laugh'?", answer: "was laughing", language: "english", category: "past-continuous", exception: false, possible_answers: "was laughing" },
    { question: "What is the past continuous tense of 'to teach'?", answer: "was teaching", language: "english", category: "past-continuous", exception: false, possible_answers: "was teaching" },
    { question: "What is the past continuous tense of 'to sell'?", answer: "was selling", language: "english", category: "past-continuous", exception: false, possible_answers: "was selling" },
    { question: "What is the past continuous tense of 'to win'?", answer: "was winning", language: "english", category: "past-continuous", exception: false, possible_answers: "was winning" },
    { question: "What is the past continuous tense of 'to meet'?", answer: "was meeting", language: "english", category: "past-continuous", exception: false, possible_answers: "was meeting" },
    { question: "What is the past continuous tense of 'to buy'?", answer: "was buying", language: "english", category: "past-continuous", exception: false, possible_answers: "was buying" },
    { question: "What is the past continuous tense of 'to see'?", answer: "was seeing", language: "english", category: "past-continuous", exception: false, possible_answers: "was seeing" },
    { question: "What is the past continuous tense of 'to speak'?", answer: "was speaking", language: "english", category: "past-continuous", exception: false, possible_answers: "was speaking" },
    { question: "What is the past continuous tense of 'to sit'?", answer: "was sitting", language: "english", category: "past-continuous", exception: false, possible_answers: "was sitting" },
    { question: "What is the past continuous tense of 'to do'?", answer: "was doing", language: "english", category: "past-continuous", exception: false, possible_answers: "was doing" },
    { question: "What is the past continuous tense of 'to hear'?", answer: "was hearing", language: "english", category: "past-continuous", exception: false, possible_answers: "was hearing" },
    { question: "What is the past continuous tense of 'to come'?", answer: "was coming", language: "english", category: "past-continuous", exception: false, possible_answers: "was coming" }
]

presentPerfectQuestions = [
    { question: "What is the present perfect tense of 'to walk'?", answer: "have walked", language: "english", category: "present-perfect", exception: false, possible_answers: "have walked, walks, walked" },
    { question: "What is the present perfect tense of 'to eat'?", answer: "have eaten", language: "english", category: "present-perfect", exception: true, possible_answers: "have eaten, eats, eating" },
    { question: "What is the present perfect tense of 'to sleep'?", answer: "have slept", language: "english", category: "present-perfect", exception: false, possible_answers: "have slept, sleeps, sleeping" },
    { question: "What is the present perfect tense of 'to help'?", answer: "have helped", language: "english", category: "present-perfect", exception: false, possible_answers: "have helped, helps, helping" },
    { question: "What is the present perfect tense of 'to write'?", answer: "have written", language: "english", category: "present-perfect", exception: true, possible_answers: "have written, writes, writing" },
    { question: "What is the present perfect tense of 'to go'?", answer: "have gone", language: "english", category: "present-perfect", exception: true, possible_answers: "have gone, goes, going" },
    { question: "What is the present perfect tense of 'to dance'?", answer: "have danced", language: "english", category: "present-perfect", exception: false, possible_answers: "have danced, dances, dancing" },
    { question: "What is the present perfect tense of 'to catch'?", answer: "have caught", language: "english", category: "present-perfect", exception: true, possible_answers: "have caught, catches, catching" },
    { question: "What is the present perfect tense of 'to drink'?", answer: "have drunk", language: "english", category: "present-perfect", exception: true, possible_answers: "have drunk, drinks, drinking" },
    { question: "What is the present perfect tense of 'to read'?", answer: "have read", language: "english", category: "present-perfect", exception: true, possible_answers: "have read, reads, reading" },
    { question: "What is the present perfect tense of 'to sing'?", answer: "have sung", language: "english", category: "present-perfect", exception: true, possible_answers: "have sung, sings, singing" },
    { question: "What is the present perfect tense of 'to run'?", answer: "have run", language: "english", category: "present-perfect", exception: true, possible_answers: "have run, runs, running" },
    { question: "What is the present perfect tense of 'to throw'?", answer: "have thrown", language: "english", category: "present-perfect", exception: true, possible_answers: "have thrown, throws, throwing" },
    { question: "What is the present perfect tense of 'to swim'?", answer: "have swum", language: "english", category: "present-perfect", exception: true, possible_answers: "have swum, swims, swimming" },
    { question: "What is the present perfect tense of 'to make'?", answer: "have made", language: "english", category: "present-perfect", exception: true, possible_answers: "have made, makes, making" },
    { question: "What is the present perfect tense of 'to tell'?", answer: "have told", language: "english", category: "present-perfect", exception: true, possible_answers: "have told, tells, telling" },
    { question: "What is the present perfect tense of 'to find'?", answer: "have found", language: "english", category: "present-perfect", exception: true, possible_answers: "have found, finds, finding" },
    { question: "What is the present perfect tense of 'to climb'?", answer: "have climbed", language: "english", category: "present-perfect", exception: false, possible_answers: "have climbed, climbs, climbing" },
    { question: "What is the present perfect tense of 'to drive'?", answer: "have driven", language: "english", category: "present-perfect", exception: true, possible_answers: "have driven, drives, driving" },
    { question: "What is the present perfect tense of 'to fly'?", answer: "have flown", language: "english", category: "present-perfect", exception: true, possible_answers: "have flown, flies, flying" },
    { question: "What is the present perfect tense of 'to begin'?", answer: "have begun", language: "english", category: "present-perfect", exception: true, possible_answers: "have begun, begins, beginning" },
    { question: "What is the present perfect tense of 'to cut'?", answer: "have cut", language: "english", category: "present-perfect", exception: true, possible_answers: "have cut, cuts, cutting" },
    { question: "What is the present perfect tense of 'to jump'?", answer: "have jumped", language: "english", category: "present-perfect", exception: false, possible_answers: "have jumped, jumps, jumping" },
    { question: "What is the present perfect tense of 'to laugh'?", answer: "have laughed", language: "english", category: "present-perfect", exception: false, possible_answers: "have laughed, laughs, laughing" },
    { question: "What is the present perfect tense of 'to teach'?", answer: "have taught", language: "english", category: "present-perfect", exception: true, possible_answers: "have taught, teaches, teaching" },
    { question: "What is the present perfect tense of 'to sell'?", answer: "have sold", language: "english", category: "present-perfect", exception: true, possible_answers: "have sold, sells, selling" },
    { question: "What is the present perfect tense of 'to win'?", answer: "have won", language: "english", category: "present-perfect", exception: true, possible_answers: "have won, wins, winning" },
    { question: "What is the present perfect tense of 'to meet'?", answer: "have met", language: "english", category: "present-perfect", exception: true, possible_answers: "have met, meets, meeting" },
    { question: "What is the present perfect tense of 'to buy'?", answer: "have bought", language: "english", category: "present-perfect", exception: true, possible_answers: "have bought, buys, buying" },
    { question: "What is the present perfect tense of 'to see'?", answer: "have seen", language: "english", category: "present-perfect", exception: true, possible_answers: "have seen, sees, seeing" },
    { question: "What is the present perfect tense of 'to speak'?", answer: "have spoken", language: "english", category: "present-perfect", exception: true, possible_answers: "have spoken, speaks, speaking" },
    { question: "What is the present perfect tense of 'to sit'?", answer: "have sat", language: "english", category: "present-perfect", exception: true, possible_answers: "have sat, sits, sitting" },
    { question: "What is the present perfect tense of 'to do'?", answer: "have done", language: "english", category: "present-perfect", exception: true, possible_answers: "have done, does, doing" },
    { question: "What is the present perfect tense of 'to hear'?", answer: "have heard", language: "english", category: "present-perfect", exception: true, possible_answers: "have heard, hears, hearing" },
    { question: "What is the present perfect tense of 'to come'?", answer: "have come", language: "english", category: "present-perfect", exception: true, possible_answers: "have come, comes, coming" }
]

    


// Function to add questions to the database

// QuestionID (integer) , Question Text (string), Answer (string), Language (string), Category (string), Exception (boolean)
async function addQuestions(questionsToAdd) {
    try {
        // Loop through each question and add it to the database
        for (const q of questionsToAdd) {
            const { question, answer, language, category, exception, possible_answers } = q;
            
            // Handle the optional possible_answers field
            const possibleAnswersString = possible_answers ? possible_answers : null;

            // Use the updated addQuestion method to include all new fields
            await db.addQuestion(question, answer, language, category, exception, possibleAnswersString);  
            console.log(`Question added: "${question}"`);
        }
        console.log('All questions have been added successfully!');
    } catch (err) {
        console.error('Error adding questions:', err);
    } finally {
        // Close the database connection when done
        db.db.close();
    }
}

// Run the function

allQuestions = [pastSimpleQuestions, presentSimpleQuestions, pastContinuousQuestions, presentPerfectQuestions];


allQuestions.forEach(i => {
    addQuestions(i)
});
