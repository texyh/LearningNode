
const fs = require('fs');
const os = require('os')
const notes = require('./notes')
const _  = require('lodash')
const yargs = require('yargs')

// let user = os.userInfo();
// fs.appendFile('text.txt', 'this is a file for ' + user.username);
// var command = process.argv.splice(2, process.argv.length)


let executeCommand =  (command, title =  null, body = null) => {
    switch(command) {
        case 'add':
            notes.addNote(title, body)
            break;
    
        case 'list':
            notes.getAll()
            break;s
    
        case 'remove':
            notes.removeNote(title)
            break;
    
        case 'read':
            notes.read(title)
            break;

        case 'help' || 'h':
            console.log("[add, list, remove, read, help]")
            break;
    
        default :
            console.log('not a valid command')
    }
}

var args = yargs
            .command('add', 'Add a new note', {
                title: {
                    describe: ' Title of the note',
                    demand: true,
                    alias: 't'
                },
                body: {
                    describe: ' body of the note',
                    demand: true,
                    alias: 't'
                },

            })
            .command('list', 'list all note', {
            })
            .command('read', 'read a note', {
                title: {
                    describe: ' Title of the note',
                    demand: true,
                    alias: 't'
                }
            })
            .command('remove', 'removes a note', {
                title: {
                    describe: ' Title of the note',
                    demand: true,
                    alias: 't'
                }
            })
            .help()
            .argv;
executeCommand(_.first(args._) , args.title, args.body);


