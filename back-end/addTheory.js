const Database = require('./database.js');  
const db = new Database('./theory.db');  

const presentSimple = [
    {text: "Level: beginner\nThe present tense is the base form of the verb:\nI work in London.\nBut with the third person singular (she/he/it), we add an –s:\nShe works in London.", unit: 1, block: 1},
    {text: "Look at these questions:\nDo you play the piano?\nWhere do you live?\nDoes Jack play football?\nWhere does he come from?\nDo Rita and Angela live in Manchester?\nWhere do they work?\nWe use do and does to make questions with the present simple. We use does for the third person singular (she/he/it) and do for the others.\nWe use do and does with question words like where, what and when:\nWhere do Angela and Rita live?\nWhat does Angela do?\nWhen does Rita usually get up?\nBut questions with who often don't use do or does:\nWho lives in London?\nWho plays football at the weekend?\nWho works at Liverpool City Hospital?\nHere are some useful questions. Try to remember them:\nWhere do you come from?\nDo you come from …?\nWhere do you live?\nDo you live in ...?	What work do you do?\nDo you like …?\nDo you know …?", unit: 1, block: 2},
    {text: "Look at these sentences:\nI like tennis but I don't like football. (don't = do not)\nI don't live in London now.\nI don't play the piano but I play the guitar.\nThey don't work at the weekend.\nJohn doesn't live in Manchester. (doesn't = does not)\nAngela doesn't drive to work. She goes by bus.\nWe use do and does to make negatives with the present simple. We use doesn't for the third person singular (she/he/it) and don't for the others.", unit: 1, block: 3},
    {text: "We use the present simple to talk about:\n- something that is true in the present:\nI'm nineteen years old.\nI'm a student.\nHe lives in London.\n- something that happens regularly in the present:\nI play football every weekend.\n- something that is always true:\nThe human body contains 206 bones.\nLight travels at almost 300,000 kilometres per second.\nWe often use adverbs of frequency like sometimes, always and never with the present simple:\nI sometimes go to the cinema.\nShe never plays football.", unit: 1, block: 4}
];

async function addBlocks(blocksToAdd) {
    try {
        // Loop through each question and add it to the database
        for (const b of blocksToAdd) {
            const {text, unit, block} = b;

            await db.addTheoryBlock(text, unit, block);  
            console.log(`Unit: "${unit}", Block added: "${block}"`);
        }
        console.log('All text has been added successfully!');
    } catch (err) {
        console.error('Error adding blocks:', err);
    } finally {
        db.db.close();
    }
}

allBlocks = [presentSimple];

allBlocks.forEach(i => {
    addBlocks(i)
});