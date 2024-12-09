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
    { question: "What is the past continuous tense of 'to walk'?", answer: "was walking", language: "english", category: "past-continuous", exception: false, possible_answers: "was walking, walks, walked" },
    { question: "What is the past continuous tense of 'to eat'?", answer: "was eating", language: "english", category: "past-continuous", exception: true, possible_answers: "was eating, eats, ate" },
    { question: "What is the past continuous tense of 'to sleep'?", answer: "was sleeping", language: "english", category: "past-continuous", exception: false, possible_answers: "was sleeping, sleeps, slept" },
    { question: "What is the past continuous tense of 'to help'?", answer: "was helping", language: "english", category: "past-continuous", exception: false, possible_answers: "was helping, helps, helped" },
    { question: "What is the past continuous tense of 'to write'?", answer: "was writing", language: "english", category: "past-continuous", exception: true, possible_answers: "was writing, writes, wrote" },
    { question: "What is the past continuous tense of 'to go'?", answer: "was going", language: "english", category: "past-continuous", exception: false, possible_answers: "was going, goes, went" },
    { question: "What is the past continuous tense of 'to dance'?", answer: "was dancing", language: "english", category: "past-continuous", exception: false, possible_answers: "was dancing, dances, danced" },
    { question: "What is the past continuous tense of 'to catch'?", answer: "was catching", language: "english", category: "past-continuous", exception: false, possible_answers: "was catching, catches, caught" },
    { question: "What is the past continuous tense of 'to drink'?", answer: "was drinking", language: "english", category: "past-continuous", exception: false, possible_answers: "was drinking, drinks, drank" },
    { question: "What is the past continuous tense of 'to read'?", answer: "was reading", language: "english", category: "past-continuous", exception: false, possible_answers: "was reading, reads, read" },
    { question: "What is the past continuous tense of 'to sing'?", answer: "was singing", language: "english", category: "past-continuous", exception: false, possible_answers: "was singing, sings, sang" },
    { question: "What is the past continuous tense of 'to run'?", answer: "was running", language: "english", category: "past-continuous", exception: false, possible_answers: "was running, runs, ran" },
    { question: "What is the past continuous tense of 'to throw'?", answer: "was throwing", language: "english", category: "past-continuous", exception: false, possible_answers: "was throwing, throws, threw" },
    { question: "What is the past continuous tense of 'to swim'?", answer: "was swimming", language: "english", category: "past-continuous", exception: false, possible_answers: "was swimming, swims, swam" },
    { question: "What is the past continuous tense of 'to make'?", answer: "was making", language: "english", category: "past-continuous", exception: false, possible_answers: "was making, makes, made" },
    { question: "What is the past continuous tense of 'to tell'?", answer: "was telling", language: "english", category: "past-continuous", exception: false, possible_answers: "was telling, tells, told" },
    { question: "What is the past continuous tense of 'to find'?", answer: "was finding", language: "english", category: "past-continuous", exception: false, possible_answers: "was finding, finds, found" },
    { question: "What is the past continuous tense of 'to climb'?", answer: "was climbing", language: "english", category: "past-continuous", exception: false, possible_answers: "was climbing, climbs, climbed" },
    { question: "What is the past continuous tense of 'to drive'?", answer: "was driving", language: "english", category: "past-continuous", exception: false, possible_answers: "was driving, drives, drove" },
    { question: "What is the past continuous tense of 'to fly'?", answer: "was flying", language: "english", category: "past-continuous", exception: false, possible_answers: "was flying, flies, flew" },
    { question: "What is the past continuous tense of 'to begin'?", answer: "was beginning", language: "english", category: "past-continuous", exception: false, possible_answers: "was beginning, begins, began" },
    { question: "What is the past continuous tense of 'to cut'?", answer: "was cutting", language: "english", category: "past-continuous", exception: false, possible_answers: "was cutting, cuts, cut" },
    { question: "What is the past continuous tense of 'to jump'?", answer: "was jumping", language: "english", category: "past-continuous", exception: false, possible_answers: "was jumping, jumps, jumped" },
    { question: "What is the past continuous tense of 'to laugh'?", answer: "was laughing", language: "english", category: "past-continuous", exception: false, possible_answers: "was laughing, laughs, laughed" },
    { question: "What is the past continuous tense of 'to teach'?", answer: "was teaching", language: "english", category: "past-continuous", exception: false, possible_answers: "was teaching, teaches, taught" },
    { question: "What is the past continuous tense of 'to sell'?", answer: "was selling", language: "english", category: "past-continuous", exception: false, possible_answers: "was selling, sells, sold" },
    { question: "What is the past continuous tense of 'to win'?", answer: "was winning", language: "english", category: "past-continuous", exception: false, possible_answers: "was winning, wins, won" },
    { question: "What is the past continuous tense of 'to meet'?", answer: "was meeting", language: "english", category: "past-continuous", exception: false, possible_answers: "was meeting, meets, met" },
    { question: "What is the past continuous tense of 'to buy'?", answer: "was buying", language: "english", category: "past-continuous", exception: false, possible_answers: "was buying, buys, bought" },
    { question: "What is the past continuous tense of 'to see'?", answer: "was seeing", language: "english", category: "past-continuous", exception: false, possible_answers: "was seeing, sees, saw" },
    { question: "What is the past continuous tense of 'to speak'?", answer: "was speaking", language: "english", category: "past-continuous", exception: false, possible_answers: "was speaking, speaks, spoke" },
    { question: "What is the past continuous tense of 'to sit'?", answer: "was sitting", language: "english", category: "past-continuous", exception: false, possible_answers: "was sitting, sits, sat" },
    { question: "What is the past continuous tense of 'to do'?", answer: "was doing", language: "english", category: "past-continuous", exception: false, possible_answers: "was doing, does, did" },
    { question: "What is the past continuous tense of 'to hear'?", answer: "was hearing", language: "english", category: "past-continuous", exception: false, possible_answers: "was hearing, hears, heard" },
    { question: "What is the past continuous tense of 'to come'?", answer: "was coming", language: "english", category: "past-continuous", exception: false, possible_answers: "was coming, comes, came" }
];


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

presentPassiveQuestions = [
    { question: "What is the present passive tense of 'to walk'?", answer: "is walked", language: "english", category: "present-passive", exception: false, possible_answers: "is walked, walks, was walked" },
    { question: "What is the present passive tense of 'to eat'?", answer: "is eaten", language: "english", category: "present-passive", exception: true, possible_answers: "is eaten, eats, was eaten" },
    { question: "What is the present passive tense of 'to sleep'?", answer: "is slept", language: "english", category: "present-passive", exception: false, possible_answers: "is slept, sleeps, was slept" },
    { question: "What is the present passive tense of 'to help'?", answer: "is helped", language: "english", category: "present-passive", exception: false, possible_answers: "is helped, helps, was helped" },
    { question: "What is the present passive tense of 'to write'?", answer: "is written", language: "english", category: "present-passive", exception: true, possible_answers: "is written, writes, was written" },
    { question: "What is the present passive tense of 'to go'?", answer: "is gone", language: "english", category: "present-passive", exception: false, possible_answers: "is gone, goes, was gone" },
    { question: "What is the present passive tense of 'to dance'?", answer: "is danced", language: "english", category: "present-passive", exception: false, possible_answers: "is danced, dances, was danced" },
    { question: "What is the present passive tense of 'to catch'?", answer: "is caught", language: "english", category: "present-passive", exception: false, possible_answers: "is caught, catches, was caught" },
    { question: "What is the present passive tense of 'to drink'?", answer: "is drunk", language: "english", category: "present-passive", exception: false, possible_answers: "is drunk, drinks, was drunk" },
    { question: "What is the present passive tense of 'to read'?", answer: "is read", language: "english", category: "present-passive", exception: false, possible_answers: "is read, reads, was read" },
    { question: "What is the present passive tense of 'to sing'?", answer: "is sung", language: "english", category: "present-passive", exception: false, possible_answers: "is sung, sings, was sung" },
    { question: "What is the present passive tense of 'to run'?", answer: "is run", language: "english", category: "present-passive", exception: false, possible_answers: "is run, runs, was run" },
    { question: "What is the present passive tense of 'to throw'?", answer: "is thrown", language: "english", category: "present-passive", exception: false, possible_answers: "is thrown, throws, was thrown" },
    { question: "What is the present passive tense of 'to swim'?", answer: "is swum", language: "english", category: "present-passive", exception: false, possible_answers: "is swum, swims, was swum" },
    { question: "What is the present passive tense of 'to make'?", answer: "is made", language: "english", category: "present-passive", exception: false, possible_answers: "is made, makes, was made" },
    { question: "What is the present passive tense of 'to tell'?", answer: "is told", language: "english", category: "present-passive", exception: false, possible_answers: "is told, tells, was told" },
    { question: "What is the present passive tense of 'to find'?", answer: "is found", language: "english", category: "present-passive", exception: false, possible_answers: "is found, finds, was found" },
    { question: "What is the present passive tense of 'to climb'?", answer: "is climbed", language: "english", category: "present-passive", exception: false, possible_answers: "is climbed, climbs, was climbed" },
    { question: "What is the present passive tense of 'to drive'?", answer: "is driven", language: "english", category: "present-passive", exception: false, possible_answers: "is driven, drives, was driven" },
    { question: "What is the present passive tense of 'to fly'?", answer: "is flown", language: "english", category: "present-passive", exception: false, possible_answers: "is flown, flies, was flown" },
    { question: "What is the present passive tense of 'to begin'?", answer: "is begun", language: "english", category: "present-passive", exception: false, possible_answers: "is begun, begins, was begun" },
    { question: "What is the present passive tense of 'to cut'?", answer: "is cut", language: "english", category: "present-passive", exception: false, possible_answers: "is cut, cuts, was cut" },
    { question: "What is the present passive tense of 'to jump'?", answer: "is jumped", language: "english", category: "present-passive", exception: false, possible_answers: "is jumped, jumps, was jumped" },
    { question: "What is the present passive tense of 'to laugh'?", answer: "is laughed", language: "english", category: "present-passive", exception: false, possible_answers: "is laughed, laughs, was laughed" },
    { question: "What is the present passive tense of 'to teach'?", answer: "is taught", language: "english", category: "present-passive", exception: false, possible_answers: "is taught, teaches, was taught" },
    { question: "What is the present passive tense of 'to sell'?", answer: "is sold", language: "english", category: "present-passive", exception: false, possible_answers: "is sold, sells, was sold" },
    { question: "What is the present passive tense of 'to win'?", answer: "is won", language: "english", category: "present-passive", exception: false, possible_answers: "is won, wins, was won" },
    { question: "What is the present passive tense of 'to meet'?", answer: "is met", language: "english", category: "present-passive", exception: false, possible_answers: "is met, meets, was met" },
    { question: "What is the present passive tense of 'to buy'?", answer: "is bought", language: "english", category: "present-passive", exception: false, possible_answers: "is bought, buys, was bought" },
    { question: "What is the present passive tense of 'to see'?", answer: "is seen", language: "english", category: "present-passive", exception: false, possible_answers: "is seen, sees, was seen" },
    { question: "What is the present passive tense of 'to speak'?", answer: "is spoken", language: "english", category: "present-passive", exception: false, possible_answers: "is spoken, speaks, was spoken" },
    { question: "What is the present passive tense of 'to sit'?", answer: "is sat", language: "english", category: "present-passive", exception: false, possible_answers: "is sat, sits, was sat" },
    { question: "What is the present passive tense of 'to do'?", answer: "is done", language: "english", category: "present-passive", exception: false, possible_answers: "is done, does, was done" },
    { question: "What is the present passive tense of 'to hear'?", answer: "is heard", language: "english", category: "present-passive", exception: false, possible_answers: "is heard, hears, was heard" },
    { question: "What is the present passive tense of 'to come'?", answer: "is come", language: "english", category: "present-passive", exception: false, possible_answers: "is come, comes, was come" }
]

pastPassiveQuestions = [
    { question: "What is the past passive tense of 'to walk'?", answer: "was walked", language: "english", category: "past-passive", exception: false, possible_answers: "was walked, walks, will walk" },
    { question: "What is the past passive tense of 'to eat'?", answer: "was eaten", language: "english", category: "past-passive", exception: true, possible_answers: "was eaten, eats, is eating" },
    { question: "What is the past passive tense of 'to sleep'?", answer: "was slept", language: "english", category: "past-passive", exception: false, possible_answers: "was slept, sleeps, is sleeping" },
    { question: "What is the past passive tense of 'to help'?", answer: "was helped", language: "english", category: "past-passive", exception: false, possible_answers: "was helped, helps, helping" },
    { question: "What is the past passive tense of 'to write'?", answer: "was written", language: "english", category: "past-passive", exception: true, possible_answers: "was written, writes, is writing" },
    { question: "What is the past passive tense of 'to go'?", answer: "was gone", language: "english", category: "past-passive", exception: true, possible_answers: "was gone, goes, is going" },
    { question: "What is the past passive tense of 'to dance'?", answer: "was danced", language: "english", category: "past-passive", exception: false, possible_answers: "was danced, dances, dancing" },
    { question: "What is the past passive tense of 'to catch'?", answer: "was caught", language: "english", category: "past-passive", exception: false, possible_answers: "was caught, catches, is catching" },
    { question: "What is the past passive tense of 'to drink'?", answer: "was drunk", language: "english", category: "past-passive", exception: false, possible_answers: "was drunk, drinks, drinking" },
    { question: "What is the past passive tense of 'to read'?", answer: "was read", language: "english", category: "past-passive", exception: false, possible_answers: "was read, reads, is reading" },
    { question: "What is the past passive tense of 'to sing'?", answer: "was sung", language: "english", category: "past-passive", exception: false, possible_answers: "was sung, sings, is singing" },
    { question: "What is the past passive tense of 'to run'?", answer: "was run", language: "english", category: "past-passive", exception: false, possible_answers: "was run, runs, running" },
    { question: "What is the past passive tense of 'to throw'?", answer: "was thrown", language: "english", category: "past-passive", exception: false, possible_answers: "was thrown, throws, is throwing" },
    { question: "What is the past passive tense of 'to swim'?", answer: "was swum", language: "english", category: "past-passive", exception: false, possible_answers: "was swum, swims, swimming" },
    { question: "What is the past passive tense of 'to make'?", answer: "was made", language: "english", category: "past-passive", exception: false, possible_answers: "was made, makes, making" },
    { question: "What is the past passive tense of 'to tell'?", answer: "was told", language: "english", category: "past-passive", exception: false, possible_answers: "was told, tells, is telling" },
    { question: "What is the past passive tense of 'to find'?", answer: "was found", language: "english", category: "past-passive", exception: false, possible_answers: "was found, finds, finding" },
    { question: "What is the past passive tense of 'to climb'?", answer: "was climbed", language: "english", category: "past-passive", exception: false, possible_answers: "was climbed, climbs, climbing" },
    { question: "What is the past passive tense of 'to drive'?", answer: "was driven", language: "english", category: "past-passive", exception: false, possible_answers: "was driven, drives, is driving" },
    { question: "What is the past passive tense of 'to fly'?", answer: "was flown", language: "english", category: "past-passive", exception: false, possible_answers: "was flown, flies, is flying" },
    { question: "What is the past passive tense of 'to buy'?", answer: "was bought", language: "english", category: "past-passive", exception: false, possible_answers: "was bought, buys, is buying" },
    { question: "What is the past passive tense of 'to see'?", answer: "was seen", language: "english", category: "past-passive", exception: false, possible_answers: "was seen, sees, is seeing" },
    { question: "What is the past passive tense of 'to think'?", answer: "was thought", language: "english", category: "past-passive", exception: false, possible_answers: "was thought, thinks, is thinking" },
    { question: "What is the past passive tense of 'to speak'?", answer: "was spoken", language: "english", category: "past-passive", exception: false, possible_answers: "was spoken, speaks, is speaking" },
    { question: "What is the past passive tense of 'to break'?", answer: "was broken", language: "english", category: "past-passive", exception: false, possible_answers: "was broken, breaks, is breaking" },
    { question: "What is the past passive tense of 'to teach'?", answer: "was taught", language: "english", category: "past-passive", exception: false, possible_answers: "was taught, teaches, is teaching" },
    { question: "What is the past passive tense of 'to choose'?", answer: "was chosen", language: "english", category: "past-passive", exception: false, possible_answers: "was chosen, chooses, is choosing" },
    { question: "What is the past passive tense of 'to build'?", answer: "was built", language: "english", category: "past-passive", exception: false, possible_answers: "was built, builds, is building" },
    { question: "What is the past passive tense of 'to begin'?", answer: "was begun", language: "english", category: "past-passive", exception: false, possible_answers: "was begun, begins, is beginning" }
];

presentConditionalQuestions = [
    { question: "What is the present conditional tense of to walk?", answer: "would walk", language: "english", category: "present-conditional", exception: false, possible_answers: "would walk, walked, walks" },
    { question: "What is the present conditional tense of to eat?", answer: "would eat", language: "english", category: "present-conditional", exception: true, possible_answers: "would eat, ate, eats" },
    { question: "What is the present conditional tense of to sleep?", answer: "would sleep", language: "english", category: "present-conditional", exception: false, possible_answers: "would sleep, slept, sleeps" },
    { question: "What is the present conditional tense of to help?", answer: "would help", language: "english", category: "present-conditional", exception: false, possible_answers: "would help, helped, helps" },
    { question: "What is the present conditional tense of to write?", answer: "would write", language: "english", category: "present-conditional", exception: true, possible_answers: "would write, wrote, writes" },
    { question: "What is the present conditional tense of to go?", answer: "would go", language: "english", category: "present-conditional", exception: false, possible_answers: "would go, went, goes" },
    { question: "What is the present conditional tense of to dance?", answer: "would dance", language: "english", category: "present-conditional", exception: false, possible_answers: "would dance, danced, dances" },
    { question: "What is the present conditional tense of to catch?", answer: "would catch", language: "english", category: "present-conditional", exception: false, possible_answers: "would catch, caught, catches" },
    { question: "What is the present conditional tense of to drink?", answer: "would drink", language: "english", category: "present-conditional", exception: false, possible_answers: "would drink, drank, drinks" },
    { question: "What is the present conditional tense of to read?", answer: "would read", language: "english", category: "present-conditional", exception: false, possible_answers: "would read, read, reads" },
    { question: "What is the present conditional tense of to sing?", answer: "would sing", language: "english", category: "present-conditional", exception: false, possible_answers: "would sing, sang, sings" },
    { question: "What is the present conditional tense of to run?", answer: "would run", language: "english", category: "present-conditional", exception: false, possible_answers: "would run, ran, runs" },
    { question: "What is the present conditional tense of to throw?", answer: "would throw", language: "english", category: "present-conditional", exception: false, possible_answers: "would throw, threw, throws" },
    { question: "What is the present conditional tense of to swim?", answer: "would swim", language: "english", category: "present-conditional", exception: false, possible_answers: "would swim, swam, swims" },
    { question: "What is the present conditional tense of to make?", answer: "would make", language: "english", category: "present-conditional", exception: false, possible_answers: "would make, made, makes" },
    { question: "What is the present conditional tense of to tell?", answer: "would tell", language: "english", category: "present-conditional", exception: false, possible_answers: "would tell, told, tells" },
    { question: "What is the present conditional tense of to find?", answer: "would find", language: "english", category: "present-conditional", exception: false, possible_answers: "would find, found, finds" },
    { question: "What is the present conditional tense of to climb?", answer: "would climb", language: "english", category: "present-conditional", exception: false, possible_answers: "would climb, climbed, climbs" },
    { question: "What is the present conditional tense of to drive?", answer: "would drive", language: "english", category: "present-conditional", exception: false, possible_answers: "would drive, drove, drives" },
    { question: "What is the present conditional tense of to fly?", answer: "would fly", language: "english", category: "present-conditional", exception: false, possible_answers: "would fly, flew, flies" },
    { question: "What is the present conditional tense of to begin?", answer: "would begin", language: "english", category: "present-conditional", exception: false, possible_answers: "would begin, began, begins" },
    { question: "What is the present conditional tense of to cut?", answer: "would cut", language: "english", category: "present-conditional", exception: false, possible_answers: "would cut, cut, cuts" },
    { question: "What is the present conditional tense of to jump?", answer: "would jump", language: "english", category: "present-conditional", exception: false, possible_answers: "would jump, jumped, jumps" },
    { question: "What is the present conditional tense of to laugh?", answer: "would laugh", language: "english", category: "present-conditional", exception: false, possible_answers: "would laugh, laughed, laughs" },
    { question: "What is the present conditional tense of to teach?", answer: "would teach", language: "english", category: "present-conditional", exception: false, possible_answers: "would teach, taught, teaches" },
    { question: "What is the present conditional tense of to sell?", answer: "would sell", language: "english", category: "present-conditional", exception: false, possible_answers: "would sell, sold, sells" },
    { question: "What is the present conditional tense of to win?", answer: "would win", language: "english", category: "present-conditional", exception: false, possible_answers: "would win, won, wins" },
    { question: "What is the present conditional tense of to meet?", answer: "would meet", language: "english", category: "present-conditional", exception: false, possible_answers: "would meet, met, meets" },
    { question: "What is the present conditional tense of to buy?", answer: "would buy", language: "english", category: "present-conditional", exception: false, possible_answers: "would buy, bought, buys" },
    { question: "What is the present conditional tense of to see?", answer: "would see", language: "english", category: "present-conditional", exception: false, possible_answers: "would see, saw, sees" },
    { question: "What is the present conditional tense of to speak?", answer: "would speak", language: "english", category: "present-conditional", exception: false, possible_answers: "would speak, spoke, speaks" },
    { question: "What is the present conditional tense of to sit?", answer: "would sit", language: "english", category: "present-conditional", exception: false, possible_answers: "would sit, sat, sits" },
    { question: "What is the present conditional tense of to do?", answer: "would do", language: "english", category: "present-conditional", exception: false, possible_answers: "would do, did, does" },
    { question: "What is the present conditional tense of to hear?", answer: "would hear", language: "english", category: "present-conditional", exception: false, possible_answers: "would hear, heard, hears" },
    { question: "What is the present conditional tense of to come?", answer: "would come", language: "english", category: "present-conditional", exception: false, possible_answers: "would come, came, comes" }
];

pastConditionalQuestions = [
    { question: "What is the past conditional tense of to walk?", answer: "would have walked", language: "english", category: "past-conditional", exception: false, possible_answers: "would have walked, had walked, walks" },
    { question: "What is the past conditional tense of to eat?", answer: "would have eaten", language: "english", category: "past-conditional", exception: true, possible_answers: "would have eaten, had eaten, eats" },
    { question: "What is the past conditional tense of to sleep?", answer: "would have slept", language: "english", category: "past-conditional", exception: false, possible_answers: "would have slept, had slept, sleeps" },
    { question: "What is the past conditional tense of to help?", answer: "would have helped", language: "english", category: "past-conditional", exception: false, possible_answers: "would have helped, had helped, helps" },
    { question: "What is the past conditional tense of to write?", answer: "would have written", language: "english", category: "past-conditional", exception: true, possible_answers: "would have written, had written, writes" },
    { question: "What is the past conditional tense of to go?", answer: "would have gone", language: "english", category: "past-conditional", exception: false, possible_answers: "would have gone, had gone, goes" },
    { question: "What is the past conditional tense of to dance?", answer: "would have danced", language: "english", category: "past-conditional", exception: false, possible_answers: "would have danced, had danced, dances" },
    { question: "What is the past conditional tense of to catch?", answer: "would have caught", language: "english", category: "past-conditional", exception: false, possible_answers: "would have caught, had caught, catches" },
    { question: "What is the past conditional tense of to drink?", answer: "would have drunk", language: "english", category: "past-conditional", exception: false, possible_answers: "would have drunk, had drunk, drinks" },
    { question: "What is the past conditional tense of to read?", answer: "would have read", language: "english", category: "past-conditional", exception: false, possible_answers: "would have read, had read, reads" },
    { question: "What is the past conditional tense of to sing?", answer: "would have sung", language: "english", category: "past-conditional", exception: false, possible_answers: "would have sung, had sung, sings" },
    { question: "What is the past conditional tense of to run?", answer: "would have run", language: "english", category: "past-conditional", exception: false, possible_answers: "would have run, had run, runs" },
    { question: "What is the past conditional tense of to throw?", answer: "would have thrown", language: "english", category: "past-conditional", exception: false, possible_answers: "would have thrown, had thrown, throws" },
    { question: "What is the past conditional tense of to swim?", answer: "would have swum", language: "english", category: "past-conditional", exception: false, possible_answers: "would have swum, had swum, swims" },
    { question: "What is the past conditional tense of to make?", answer: "would have made", language: "english", category: "past-conditional", exception: false, possible_answers: "would have made, had made, makes" },
    { question: "What is the past conditional tense of to tell?", answer: "would have told", language: "english", category: "past-conditional", exception: false, possible_answers: "would have told, had told, tells" },
    { question: "What is the past conditional tense of to find?", answer: "would have found", language: "english", category: "past-conditional", exception: false, possible_answers: "would have found, had found, finds" },
    { question: "What is the past conditional tense of to climb?", answer: "would have climbed", language: "english", category: "past-conditional", exception: false, possible_answers: "would have climbed, had climbed, climbs" },
    { question: "What is the past conditional tense of to drive?", answer: "would have driven", language: "english", category: "past-conditional", exception: false, possible_answers: "would have driven, had driven, drives" },
    { question: "What is the past conditional tense of to fly?", answer: "would have flown", language: "english", category: "past-conditional", exception: false, possible_answers: "would have flown, had flown, flies" },
    { question: "What is the past conditional tense of to begin?", answer: "would have begun", language: "english", category: "past-conditional", exception: false, possible_answers: "would have begun, had begun, begins" },
    { question: "What is the past conditional tense of to cut?", answer: "would have cut", language: "english", category: "past-conditional", exception: false, possible_answers: "would have cut, had cut, cuts" },
    { question: "What is the past conditional tense of to jump?", answer: "would have jumped", language: "english", category: "past-conditional", exception: false, possible_answers: "would have jumped, had jumped, jumps" },
    { question: "What is the past conditional tense of to laugh?", answer: "would have laughed", language: "english", category: "past-conditional", exception: false, possible_answers: "would have laughed, had laughed, laughs" },
    { question: "What is the past conditional tense of to teach?", answer: "would have taught", language: "english", category: "past-conditional", exception: false, possible_answers: "would have taught, had taught, teaches" },
    { question: "What is the past conditional tense of to sell?", answer: "would have sold", language: "english", category: "past-conditional", exception: false, possible_answers: "would have sold, had sold, sells" },
    { question: "What is the past conditional tense of to win?", answer: "would have won", language: "english", category: "past-conditional", exception: false, possible_answers: "would have won, had won, wins" },
    { question: "What is the past conditional tense of to meet?", answer: "would have met", language: "english", category: "past-conditional", exception: false, possible_answers: "would have met, had met, meets" },
    { question: "What is the past conditional tense of to buy?", answer: "would have bought", language: "english", category: "past-conditional", exception: false, possible_answers: "would have bought, had bought, buys" },
    { question: "What is the past conditional tense of to see?", answer: "would have seen", language: "english", category: "past-conditional", exception: false, possible_answers: "would have seen, had seen, sees" },
    { question: "What is the past conditional tense of to speak?", answer: "would have spoken", language: "english", category: "past-conditional", exception: false, possible_answers: "would have spoken, had spoken, speaks" },
    { question: "What is the past conditional tense of to sit?", answer: "would have sat", language: "english", category: "past-conditional", exception: false, possible_answers: "would have sat, had sat, sits" },
    { question: "What is the past conditional tense of to do?", answer: "would have done", language: "english", category: "past-conditional", exception: false, possible_answers: "would have done, had done, does" },
    { question: "What is the past conditional tense of to hear?", answer: "would have heard", language: "english", category: "past-conditional", exception: false, possible_answers: "would have heard, had heard, hears" },
    { question: "What is the past conditional tense of to come?", answer: "would have come", language: "english", category: "past-conditional", exception: false, possible_answers: "would have come, had come, comes" }
];

futureSimpleQuestions = [
    { question: "What is the future simple tense of to walk?", answer: "will walk", language: "english", category: "future-simple", exception: false, possible_answers: "will walk, walks, walk" },
    { question: "What is the future simple tense of to eat?", answer: "will eat", language: "english", category: "future-simple", exception: false, possible_answers: "will eat, eats, eat" },
    { question: "What is the future simple tense of to sleep?", answer: "will sleep", language: "english", category: "future-simple", exception: false, possible_answers: "will sleep, sleeps, sleep" },
    { question: "What is the future simple tense of to help?", answer: "will help", language: "english", category: "future-simple", exception: false, possible_answers: "will help, helps, help" },
    { question: "What is the future simple tense of to write?", answer: "will write", language: "english", category: "future-simple", exception: false, possible_answers: "will write, writes, write" },
    { question: "What is the future simple tense of to go?", answer: "will go", language: "english", category: "future-simple", exception: false, possible_answers: "will go, goes, go" },
    { question: "What is the future simple tense of to dance?", answer: "will dance", language: "english", category: "future-simple", exception: false, possible_answers: "will dance, dances, dance" },
    { question: "What is the future simple tense of to catch?", answer: "will catch", language: "english", category: "future-simple", exception: false, possible_answers: "will catch, catches, catch" },
    { question: "What is the future simple tense of to drink?", answer: "will drink", language: "english", category: "future-simple", exception: false, possible_answers: "will drink, drinks, drink" },
    { question: "What is the future simple tense of to read?", answer: "will read", language: "english", category: "future-simple", exception: false, possible_answers: "will read, reads, read" },
    { question: "What is the future simple tense of to sing?", answer: "will sing", language: "english", category: "future-simple", exception: false, possible_answers: "will sing, sings, sing" },
    { question: "What is the future simple tense of to run?", answer: "will run", language: "english", category: "future-simple", exception: false, possible_answers: "will run, runs, run" },
    { question: "What is the future simple tense of to throw?", answer: "will throw", language: "english", category: "future-simple", exception: false, possible_answers: "will throw, throws, throw" },
    { question: "What is the future simple tense of to swim?", answer: "will swim", language: "english", category: "future-simple", exception: false, possible_answers: "will swim, swims, swim" },
    { question: "What is the future simple tense of to make?", answer: "will make", language: "english", category: "future-simple", exception: false, possible_answers: "will make, makes, make" },
    { question: "What is the future simple tense of to tell?", answer: "will tell", language: "english", category: "future-simple", exception: false, possible_answers: "will tell, tells, tell" },
    { question: "What is the future simple tense of to find?", answer: "will find", language: "english", category: "future-simple", exception: false, possible_answers: "will find, finds, find" },
    { question: "What is the future simple tense of to climb?", answer: "will climb", language: "english", category: "future-simple", exception: false, possible_answers: "will climb, climbs, climb" },
    { question: "What is the future simple tense of to drive?", answer: "will drive", language: "english", category: "future-simple", exception: false, possible_answers: "will drive, drives, drive" },
    { question: "What is the future simple tense of to fly?", answer: "will fly", language: "english", category: "future-simple", exception: false, possible_answers: "will fly, flies, fly" },
    { question: "What is the future simple tense of to begin?", answer: "will begin", language: "english", category: "future-simple", exception: false, possible_answers: "will begin, begins, begin" },
    { question: "What is the future simple tense of to cut?", answer: "will cut", language: "english", category: "future-simple", exception: false, possible_answers: "will cut, cuts, cut" },
    { question: "What is the future simple tense of to jump?", answer: "will jump", language: "english", category: "future-simple", exception: false, possible_answers: "will jump, jumps, jump" },
    { question: "What is the future simple tense of to laugh?", answer: "will laugh", language: "english", category: "future-simple", exception: false, possible_answers: "will laugh, laughs, laugh" },
    { question: "What is the future simple tense of to teach?", answer: "will teach", language: "english", category: "future-simple", exception: false, possible_answers: "will teach, teaches, teach" },
    { question: "What is the future simple tense of to sell?", answer: "will sell", language: "english", category: "future-simple", exception: false, possible_answers: "will sell, sells, sell" },
    { question: "What is the future simple tense of to win?", answer: "will win", language: "english", category: "future-simple", exception: false, possible_answers: "will win, wins, win" },
    { question: "What is the future simple tense of to meet?", answer: "will meet", language: "english", category: "future-simple", exception: false, possible_answers: "will meet, meets, meet" },
    { question: "What is the future simple tense of to buy?", answer: "will buy", language: "english", category: "future-simple", exception: false, possible_answers: "will buy, buys, buy" },
    { question: "What is the future simple tense of to see?", answer: "will see", language: "english", category: "future-simple", exception: false, possible_answers: "will see, sees, see" },
    { question: "What is the future simple tense of to speak?", answer: "will speak", language: "english", category: "future-simple", exception: false, possible_answers: "will speak, speaks, speak" },
    { question: "What is the future simple tense of to sit?", answer: "will sit", language: "english", category: "future-simple", exception: false, possible_answers: "will sit, sits, sit" },
    { question: "What is the future simple tense of to do?", answer: "will do", language: "english", category: "future-simple", exception: false, possible_answers: "will do, does, do" },
    { question: "What is the future simple tense of to hear?", answer: "will hear", language: "english", category: "future-simple", exception: false, possible_answers: "will hear, hears, hear" },
    { question: "What is the future simple tense of to come?", answer: "will come", language: "english", category: "future-simple", exception: false, possible_answers: "will come, comes, come" }
];

quizPastSimpleQuestions = [
    {question: "When ___ (you/go) to the park last week?", answer: "did you go", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did you go"}, 
    { question: "What ___ (he/say) about the project?", answer: "did he say", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did he say" },
    { question: "Why ___ (they/leave) the party early?", answer: "did they leave", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did they leave" },
    { question: "Where ___ (she/find) her lost keys?", answer: "did she find", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did she find" },
    { question: "Who ___ (you/see) at the concert?", answer: "did you see", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did you see" },
    { question: "How ___ (he/learn) to play the guitar?", answer: "did he learn", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did he learn" },
    { question: "When ___ (it/start) raining?", answer: "did it start", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did it start" },
    { question: "What ___ (they/do) after school?", answer: "did they do", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did they do" },
    { question: "Why ___ (you/not/call) me yesterday?", answer: "did you not call", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did you not call" },
    { question: "Where ___ (she/go) for her holiday?", answer: "did she go", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did she go" },
    { question: "Who ___ (help) you with your homework?", answer: "did help", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did help" },
    { question: "How ___ (you/feel) after the exam?", answer: "did you feel", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did you feel" },
    { question: "Why ___ (they/not/finish) their work on time?", answer: "did they not finish", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did they not finish" },
    { question: "What ___ (he/eat) for dinner?", answer: "did he eat", language: "english", category: "past-simple", exception: false, possible_answers: "did he eat" },
    { question: "When ___ (you/realize) your mistake?", answer: "did you realize", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did you realize" },
    { question: "Why ___ (she/not/go) to the meeting?", answer: "did she not go", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did she not go" },
    { question: "Where ___ (you/buy) this book?", answer: "did you buy", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did you buy" },
    { question: "What ___ (they/say) about the movie?", answer: "did they say", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did they say" },
    { question: "How ___ (he/manage) to solve the problem?", answer: "did he manage", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did he manage" },
    { question: "When ___ (you/decide) to move?", answer: "did you decide", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did you decide" },
    { question: "Who ___ (they/invite) to the party?", answer: "did they invite", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did they invite" },
    { question: "Why ___ (she/not/speak) to him?", answer: "did she not speak", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did she not speak" },
    { question: "What ___ (he/write) in the email?", answer: "did he write", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did he write" },
    { question: "Where ___ (you/put) your keys?", answer: "did you put", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did you put" },
    { question: "How ___ (they/prepare) for the test?", answer: "did they prepare", language: "english", category: "quiz-past-simple", exception: false, possible_answers: "did they prepare" }
];

async function addQuizQuestions(questionsToAdd) {
    try {
        // Loop through each question and add it to the database
        for (const q of quizQuestionsToAdd) {
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

allQuizQuestions = [quizPastSimpleQuestions];

allQuizQuestions.forEach(i => {
    addQuizQuestions(i)
});
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

allQuestions = [pastSimpleQuestions, presentSimpleQuestions, pastContinuousQuestions, presentPerfectQuestions, presentPassiveQuestions, pastPassiveQuestions, presentConditionalQuestions, pastConditionalQuestions, futureSimpleQuestions];

allQuestions.forEach(i => {
    addQuestions(i)
});


