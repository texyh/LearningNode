

// module.exports.add = (a, b) => {
//     return a + b;
// };
const fs = require('fs');
const DB = './notes.json'

let saveChanges = (noteList) =>  {
    fs.writeFileSync(DB, JSON.stringify(noteList));
}

let fetchNote = () => {
    try {
        let noteList = fs.readFileSync(DB, 'utf8');
        return JSON.parse(noteList);
    } catch (error) {
        return [];
    }
}

let addNote = (title, body) => {
    let notesList = fetchNote();
    const note = {
        title,
        body
    };

    notesList.push(note);
    saveChanges(notesList);
    return note;
};

let getAll = () => {
    console.log(fetchNote());
}

let read = (title) => {
    let noteList = fetchNote();
    return console.log(noteList.find(x => x.title == title));
}

let removeNote = (title) => {
    let noteList = fetchNote();
    let index = noteList.findIndex(x => x.title == title);

    if(index < 0) {
        console.log(`No note with title ${title} exists`);
    }

    noteList.splice(index, 1);
    saveChanges(noteList);
    console.log('Note saved successfully')
}

module.exports =  {
    addNote,
    getAll,
    read,
    removeNote
}