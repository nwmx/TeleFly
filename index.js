const colors = require('colors');
console.log(`----------------------------------------------------------------------------------------------------`.bold);
console.log(`
██╗    ██╗██╗ ██████╗██╗  ██╗███╗   ███╗ █████╗ ███╗   ██╗███╗   ██╗      ██████╗ ███████╗██╗   ██╗
██║    ██║██║██╔════╝██║  ██║████╗ ████║██╔══██╗████╗  ██║████╗  ██║██╗██╗██╔══██╗██╔════╝██║   ██║
██║ █╗ ██║██║██║     ███████║██╔████╔██║███████║██╔██╗ ██║██╔██╗ ██║╚═╝╚═╝██║  ██║█████╗  ██║   ██║
██║███╗██║██║██║     ██╔══██║██║╚██╔╝██║██╔══██║██║╚██╗██║██║╚██╗██║██╗██╗██║  ██║██╔══╝  ╚██╗ ██╔╝
╚███╔███╔╝██║╚██████╗██║  ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║██║ ╚████║╚═╝╚═╝██████╔╝███████╗ ╚████╔╝ 
 ╚══╝╚══╝ ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝      ╚═════╝ ╚══════╝  ╚═══╝  
                                                                                                   `.blue);
console.log(`----------------------------------------------------------------------------------------------------`.bold);
console.log(`
######## ######## ##       ######## ######## ##       ##    ## 
   ##    ##       ##       ##       ##       ##        ##  ##  
   ##    ##       ##       ##       ##       ##         ####   
   ##    ######   ##       ######   ######   ##          ##    
   ##    ##       ##       ##       ##       ##          ##    
   ##    ##       ##       ##       ##       ##          ##    
   ##    ######## ######## ######## ##       ########    ##    `.red);
console.log(`----------------------------------------------------------------------------------------------------`.bold);
console.log(`IMPORTIERE PACKAGES...`.bold);
//Import / Initialisierung
const Telegraf = require('telegraf'); // import telegram lib
const fs = require('fs'); //import fs for JSON import/export
const md5 = require('md5'); //import md5 for password encryption
const schedule = require('node-schedule'); //import schedule for notification functionality
const vereinsflieger = require(`${__dirname}/vereinsflieger`); //import vereinsflieger API
console.log(`LESE KONFIGURATION...`.bold);
let configdata = fs.readFileSync('config.json'); //read config.json
let config = JSON.parse(configdata); //parse config to object
let token = readToken(); //call readToken function
let flighttypes = JSON.parse(fs.readFileSync('flighttypes.json'))
let update = true;
let pushedDayLog = false;
console.log(`INITIALISIERE TELEGRAF.JS...`.bold);
const bot = new Telegraf(config.telegram); // get the token from config and greate Telegraf instance
console.log(`----------------------------------------------------------------------------------------------------`.bold);
console.log(`KONFIGURATION`.bold);
console.log(`TELEGRAM-TOKEN: ${config.telegram}`.yellow);
console.log(`ADMIN-TELEGRAM-ID: ${config.tg_adminid}`.yellow);
console.log(`VEREINSFLIEGER-APPKEY: ${config.appkey}`.yellow);
console.log(`VEREIN: ${config.verein}`.yellow);
console.log(`VEREINSFLIEGER-USERNAME: ${config.username}`.yellow);
console.log(`VEREINSFLIEGER-PASSWORT: ${config.password}`.yellow);
console.log(`VEREINSFLIEGER-CID: ${config.cid}`.yellow);
console.log(`----------------------------------------------------------------------------------------------------`.bold);
if (config.telegram && config.tg_adminid && config.appkey && config.verein && config.username && config.password && config.cid) {
    console.log(`KONFIGURATION VOLLSTÄNDIG!`.green);
    console.log(`TELEFLY ONLINE!`.green);
} else {
    console.log(`KONFIGURATION UNVOLLSTÄNDIG! BITTE CONFIG.JSON AUSFÜLLEN! SIEHE README!`.red);
}
console.log(`----------------------------------------------------------------------------------------------------`.bold);
loginTest();
bot.start((ctx) => {
    ctx.replyWithMarkdown('*Hallo ' + ctx.from.first_name + '!*\n\nWillkommen beim TeleFly-Vereinsbot des ' + config.verein + '!\n\nIch stehe dir jederzeit zur Verfügung und biete dir viele praktische Funktionen rund um den Vereinsbetrieb. Beispielsweise kannst du von mir eine Benachrichtigung zum Flugbetrieb beim ersten Start des Tages erhalten. Sofern du selbst geflogen bist, schicke ich dir am Abend um 19 Uhr auch gleich deine Flüge direkt im richtigen Format für den Flugbucheintrag.\n\nUm dich zu authentifizieren, sende mir bitte /id\nNach der Authentifikation kannst du meine Funktionen vollumfänglich nutzen.\nEine Funktionsübersicht findest Du unter /help\nWeitere Informationen zu TeleFly findest du unter /credits');
}) // display Welcome text when bot starts

bot.help((ctx) => {
    ctx.replyWithMarkdown('Die Benachrichtigungen zum Flugbetrieb sowie die automatische Auflistung deiner Flugbucheinträge am Tagesende sind nach der Authentifizierung automatisch aktiviert.\n\n*Verfügbare Befehle:*\n\n/stats - Zeige die Flugstatistik für den aktuellen Tag\n' + '/stats YYYY-MM-DD - Zeige die Flugstatistik für einen beliebigen Tag\n' + '/log - Zeige die letzten 10 Flüge aus meinem Flugbuch\n' + '/log x - Zeige die letzten x Flüge aus meinem Flugbuch (maximal 100)\n' + '/log YYYY-MM-DD - Zeige meine Flüge von einem bestimmen Tag\n' + '/connect - Überprüfe die Verbindung zu Vereinsflieger')
})

bot.command('credits', (ctx) => {
    ctx.replyWithMarkdown('*TeleFly*\nDer intelligente Chatbot für Flugsportvereine mit vereinsflieger.de\n\nCopyright © 2020 - present, Nico Wichmann.\n\n*Autor:* Nico Wichmann\n*GitHub:* github.com/nwmx\n\nLizensiert unter der GNU General Public License v3.0 (Open Source)\n\n*Abhängigkeiten:*\n\n*telegraf* - Copyright © 2016 - 2019, Vitaly Domnikov.\n*axios* - Copyright © 2014 - present, Matt Zabriskie.\n*colors* - Copyright © Marak Squires, Sindre Sorhus.\n*md5* - Copyright © 2011-2012, Paul Vorbach. Copyright © 2009, Jeff Mott.\n*node-schedule* - Copyright © 2015, Matt Patenaude.')
})

bot.command('version', (ctx) => {
    let packagedata = fs.readFileSync('package.json'); //read config.json
    let package = JSON.parse(packagedata); //parse config to object
    ctx.replyWithMarkdown('*TeleFly Version:* ' + package.version)
})

bot.command('connect', (ctx) => {
    loginTest(ctx);
})

bot.command('signout', (ctx) => {
    if (ctx.from.id == config.tg_adminid) {
        ctx.reply(token.accesstoken);
        vereinsflieger.signout(token.accesstoken).then(res => {
            ctx.reply('Logout erfolgreich! Status: ' + res.data.httpstatuscode)
        }).catch(error => {
            ctx.reply('Logout fehlgeschlagen! Error: ' + error.response.status)
        })
    } else {
        ctx.reply('Nicht autorisert!')
    }
})

bot.command('toggleUpdate', (ctx) => {
    if (ctx.from.id == config.tg_adminid) {
        update = !update;
        ctx.reply('Update-Status: ' + update)
    } else {
        ctx.reply("Nicht autorisiert!")
    }
})

bot.command('dayLog', (ctx) => {
    if (ctx.from.id == config.tg_adminid) {
        getToday(null, 2)
        ctx.reply('Flugbucheinträge generiert und versendet!')
    } else {
        ctx.reply("Nicht autorisiert!")
    }
})

bot.command('userList', (ctx) => {
    if (ctx.from.id == config.tg_adminid) {
        userList()
    } else {
        ctx.reply("Nicht autorisiert!")
    }
})

bot.command('shout', (ctx) => {
    if (ctx.from.id == config.tg_adminid) {
        let input = (ctx.message.text).split("/shout ")
        pushMessage(input[1])
    } else {
        ctx.reply("Nicht autorisiert!")
    }
})

bot.command('confirm', (ctx) => {
    if (ctx.from.id == config.tg_adminid) {
        let input = (ctx.message.text).split("/confirm ")
        bot.telegram.sendMessage(input[1], 'Deine Telegram-ID wurde in der ' + config.verein + '-Mitgliederliste bei Vereinsflieger hinterlegt. Ab sofort kannst du den Bot vollumfänglich nutzen!');  //manual auth confirm
        userList();
    } else {
        ctx.reply("Nicht autorisiert!")
    }
})

bot.command('id', (ctx) => {
    if (!auth(ctx.from.id)) {
        let name;
        if (ctx.from.last_name) {
            name = ctx.from.first_name + ' ' + ctx.from.last_name;
        } else {
            name = ctx.from.first_name;
        }
        bot.telegram.sendMessage(config.tg_adminid, 'Neue Benutzeranfrage für deinen ' + config.verein + '-Bot!\nName: ' + name + '\nTelegram-ID: ' + ctx.from.id);  //login inactive
        ctx.reply('Deine Telegram-ID wurde gemeinsam mit deinem Namen zur Überprüfung an den Administrator gesendet. Nach der Freischaltung erhälst du automatisch eine Nachricht.\nFolgende Daten wurden übermittelt:\n\nName: ' + name + '\nTelegram-ID: ' + ctx.from.id);
    } else {
        ctx.reply('Du bist bereits authentifiziert!')
    }
})

bot.command('stats', (ctx) => {
    if (auth(ctx.from.id)) {
        let input = ctx.message.text //get Message text
        let subText = input.split(" ") //split command & date
        if (checkDate(subText[1])) {
            vereinsflieger.flights_date(token.accesstoken, subText[1]).then(res => {
                dayStats(ctx, res.data);
            }).catch(error => {
                ctx.reply('Fehler! HTTP-Status: ' + error.response.status);
            })
        } else if (!subText[1]) {
            getToday(ctx, 0);
        }
        else {
            ctx.replyWithMarkdown('Ungültiges Datum! Bitte stelle sicher, dass das Datum im Format *YYYY-MM-DD* vorliegt!')
        }
    } else {
        ctx.reply('Telegram-Konto nicht verknüpft! Bitte /id senden.')
    }
})

bot.command('log', (ctx) => {
    let input = ctx.message.text //get Message text
    let subText = input.split(" ") //split command & date
    if (subText[1] && parseInt(subText[1]) > 0 && parseInt(subText[1]) <= 100) {
        getuid(ctx, parseInt(subText[1]));
    } else if (checkDate(subText[1])) {
        getuid(ctx, subText[1])
    }
    else if (!subText[1]) {
        getuid(ctx, 10)
    } else {
        ctx.replyWithMarkdown('Bitte stelle sicher, das du hinter /log\n\nein Datum im Format YYYY-MM-DD\n\n*oder*\n\neine Zahl im Bereich von 1 bis 100\n\n*oder*\n\ngar nichts eingiebst.')
    }
})

function readToken() {
    let tokendata = fs.readFileSync('token.json'); //read token.json
    return JSON.parse(tokendata); // parse token to object
}

function loginTest(ctx) { //check vereinsflieger login
    vereinsflieger.getUser(token.accesstoken).then(res => {
        console.log('Verbindungstest erfolgreich!')
        if (ctx) {
            ctx.reply('Verbindungstest erfolgreich!');
        }
    }).catch(error => {
        console.log('Vereinsflieger-Verbindung fehlgeschlagen!\n' + error + '\nLogin wird durchgeführt!')
        bot.telegram.sendMessage(config.tg_adminid, 'Vereinsflieger-Verbindung fehlgeschlagen!\n' + error + '\nLogin wird durchgeführt!');  //login inactive
        if (ctx) {
            ctx.reply('Vereinsflieger-Verbindung inaktiv! Versuche Login!')
        }
        getToken(ctx);
    })
}

function getToken(ctx) { //get token from vereinsflieger.de
    vereinsflieger.getAccesstoken().then(res => { //do http request
        token.accesstoken = res.data.accesstoken; //safe token to token object
        fs.writeFileSync('token.json', JSON.stringify(token)); //write token to token.json
        console.log('Token erfolgreich abgerufen!\nToken: ' + res.data.accesstoken);
        if (ctx) {
            doLogin(ctx)
        } else {
            doLogin();
        }
    }).catch(error => {
        bot.telegram.sendMessage(config.tg_adminid, 'Token abrufen fehlgeschlagen!\n' + error);
    })
}

function doLogin(ctx) {
    vereinsflieger.signin(config.username, md5(config.password), config.cid, token.accesstoken, config.appkey).then(res => {
        console.log('Login erfolgreich!')
        bot.telegram.sendMessage(config.tg_adminid, 'Vereinsflieger-Login erneuert!');
        if (ctx) {
            ctx.reply('Verbindung wiederhergestellt!')
        }
    }).catch(error => {
        console.log('Login fehlgeschlagen! Error: ' + error.response.status)
        bot.telegram.sendMessage(config.tg_adminid, 'Login fehlgeschlagen! Error: ' + error.response.status) //login failed
        if (ctx) {
            ctx.reply('FEHLER: Keine Verbindung zu Vereinsflieger! Der Administrator wurde informiert!')
        }
    })
}

function checkUpdate() {
    if (!update) {
        console.log("Prüfe auf ersten Flug des Tages...")
        getToday(null, 1);
    }
}

function getToday(ctx, update) {
    vereinsflieger.flights_today(token.accesstoken).then(res => {
        if (update === 1) {
            startUpdate(res.data);
        } else if (update === 2) {
            console.log('Versende Flugbucheinträge...')
            dayLog(res.data);
        }
        else {
            dayStats(ctx, res.data);
        }
    }).catch(error => {
        if (!update) {
            ctx.reply('Fehler! HTTP-Status: ' + error.response.status);
        }
    })

}

function dayStats(ctx, data) {
    let fcount = Object.keys(data).length
    fcount -= 1;
    let pilots = '\n'
    let attendants = '\n'
    let callsigns = '\n'
    let time = 0
    let location = '\n'
    if (fcount > 0) {
        for (let index = 0; index < fcount; index++) {
            time += Number.parseInt(data[index].flighttime);
            if (!location.includes(data[index].departurelocation)) {
                location = location + data[index].departurelocation + '\n'
            }
            if (!pilots.includes(data[index].pilotname)) {
                pilots = pilots + data[index].pilotname + '\n';
            }
            if (!attendants.includes(data[index].attendantname + '\n')) {
                attendants = attendants + data[index].attendantname + '\n';
            }
            if (!callsigns.includes(data[index].callsign)) {
                callsigns = callsigns + data[index].callsign + '\n';
            }
        }
        ctx.replyWithMarkdown('*Flugstatistik* (' + data[0].dateofflight + '):\n\n*Abflugplätze:*' + location + '\n*Anzahl der Flüge:* ' + fcount + '\n*Kumulierte Flugzeit:* ' + getFlighttime(time) + '\n\n*Piloten*: ' + pilots + '\n*Begleiter*: ' + attendants + '\n*Flugzeuge*: ' + callsigns)
    } else {
        ctx.reply('Keine Flüge erfasst!')
    }

}

function startUpdate(data) {
    let fcount = Object.keys(data).length
    fcount -= 1;
    if (fcount > 0 && data[0].departuretime != '00:00:00') {
        update = true;
        console.log('Erster Start des Tage erfasst! Sende Benachrichtigung...')
        pushMessage('Der Flugbetrieb hat begonnen!\n*Datum*: ' + data[0].dateofflight + '\nErster Start des Tages:\n\n*Flugplatz*: ' + data[0].departurelocation + '\n*LFZ*: ' + data[0].callsign + '\n*Pilot*: ' + data[0].pilotname + '\n*Begleiter*: ' + data[0].attendantname + '\n*Startzeit*: ' + data[0].departuretime + '\n*Landezeit*: ' + data[0].arrivaltime)
    } else {
        console.log('Prüfung negativ - noch kein Flugbetrieb')
    }
}

function pushMessage(message) {
    let userdata = fs.readFileSync('userlist.json'); //read config.json
    let user = JSON.parse(userdata); //parse config to object
    for (let index = 0; index < user.length; index++) {
        bot.telegram.sendMessage(user[index].telegram, message, { parse_mode: 'markdown' });
    }
    console.log('Benachrichtigung versendet: ' + message)
}

function userList() {
    vereinsflieger.userList(token.accesstoken).then(res => {
        let usrlist = [];
        for (let index = 0; index < Object.keys(res.data).length - 1; index++) {
            if (res.data[index].prop1.value) {
                usrlist.push({ "firstname": `${res.data[index].firstname}`, "lastname": `${res.data[index].lastname}`, "uid": `${res.data[index].uid}`, "telegram": `${res.data[index].prop1.value}` })
            }
        }
        fs.writeFileSync('userlist.json', JSON.stringify(usrlist)); //write userlist to userlist.json
        bot.telegram.sendMessage(config.tg_adminid, 'Aktualisierung der Benutzerdatenbank:\n' + usrlist.length + ' Datensätze heruntergeladen!') //download userlist
    }).catch(error => {
        bot.telegram.sendMessage(config.tg_adminid, 'Datenabruf von Vereinsflieger fehlgeschlagen!\n' + error);  //login inactive
    })
}

function getuid(ctx, num) {
    let userdata = fs.readFileSync('userlist.json'); //read config.json
    let user = JSON.parse(userdata); //parse config to object
    let found = false
    for (let index = 0; index < user.length; index++) {
        if (user[index].telegram == ctx.from.id) {
            logbook(user[index].uid, user[index].telegram, num)
            found = true;
        }
    }
    if (!found) {
        ctx.reply('Telegram-Konto nicht verknüpft! Bitte /id senden.')
    }

}

function logbook(uid, tg, num) {
    if (Number.isInteger(num)) {
        vereinsflieger.flight_list_user(token.accesstoken, uid, num).then(res => {
            printFlights(res.data, tg)
        }).catch(error => {
            console.log(error)
            bot.telegram.sendMessage(tg, 'Abrufen der Flüge von Vereinsflieger fehlgeschlagen! Der Administrator wurde informiert.')
            loginTest();
        })
    } else {
        vereinsflieger.flights_date(token.accesstoken, num).then(res => {
            let flights = []
            for (let index = Object.keys(res.data).length - 2; index >= 0; index--) {
                if (res.data[index].uidpilot == uid) {
                    flights.push(res.data[index])
                }
            }
            if (flights.length) {
                flights.push({ "httpstatuscode": 200 })
                printFlights(flights, tg)
            } else {
                bot.telegram.sendMessage(tg, 'Keine Flüge erfasst!')
            }
        }).catch(error => {
            bot.telegram.sendMessage(tg, 'Abrufen der Flüge von Vereinsflieger fehlgeschlagen! Der Administrator wurde informiert.')
            console.log(error)
        })
    }
}

function printFlights(data, tg) {
    let message = '';
    let contains = 0;
    let time = 0;
    for (let index = Object.keys(data).length - 2; index >= 0; index--) {
        time += Number.parseInt(data[index].flighttime)
        let comment = ''
        if (data[index].comment) {
            comment = `Kommentar: ${data[index].comment}`
        }
        let attendant = 'Begleiter: '
        let flighttype = flighttypes[data[index].ftid]
        if (flighttype == 'S - Schulflug') {
            attendant = 'Fluglehrer: '
            if (!data[index].attendantname) {
                if (data[index].finame) {
                    flighttype = flighttype + `\nFlugauftrag von: ${data[index].finame}`
                } else {
                    flighttype = flighttype + `\nFlugauftrag von: *Bitte nachtragen!*`
                }
            }
        }
        else if (flighttype == 'Ü - Auffrischungsschulung') {
            attendant = 'Fluglehrer: '
            flighttype = flighttype + '\n*FI-Unterschrift nicht vergessen!*'
        }
        message = message + `*Flug ${Object.keys(data).length - index - 1} von ${Object.keys(data).length - 1}*\n\nDatum: ${data[index].dateofflight}\nPilot: ${data[index].pilotname}\n${attendant + data[index].attendantname}\nFlugzeug: ${data[index].callsign}\nStartart: ${getStarttype(data[index].starttype)}\nStartzeit (UTC): ${data[index].departuretime}\nLandezeit (UTC): ${data[index].arrivaltime}\nFlugzeit: ${getFlighttime(data[index].flighttime)}\nStartort: ${data[index].departurelocation}\nLandeort: ${data[index].arrivallocation}\nFlugart: ${flighttype}\n${comment}\n\n\n\n`
        contains++;
        if (contains >= 10) {
            bot.telegram.sendMessage(tg, message, { parse_mode: 'markdown' });
            message = "";
            contains = 0;
        }
    }
    if (contains) {
        bot.telegram.sendMessage(tg, message, { parse_mode: 'markdown' });
    }
    if ((Object.keys(data).length - 1) > 1) {
        let summary = '*Insgesamt: * ' + (Object.keys(data).length - 1) + ' Starts / ' + getFlighttime(time) + ' Flugzeit'
        bot.telegram.sendMessage(tg, summary, { parse_mode: 'markdown' });
    }
}

function getStarttype(num) {
    switch (num) {
        case '1': return 'Eigenstart'
        case '3': return 'F-Schlepp'
        case '5': return 'Windenstart'
        case '7': return 'Gummiseil'
        case '9': return 'Fahrzeug'
        default:
            return 'nicht definiert'
    }
}

function getFlighttime(num) {
    const time = Number(num)
    let h = Math.floor(num / 60)
    let m = num % 60
    return `${h}h${m}m`
}

function auth(tg) {
    let userdata = fs.readFileSync('userlist.json'); //read config.json
    let user = JSON.parse(userdata); //parse config to object
    let found = false
    for (let index = 0; index < user.length; index++) {
        if (user[index].telegram == tg) {
            return true;
        }
    }
    return false;
}

function dayLog(data) {
    pushedDayLog = true;
    let userdata = fs.readFileSync('userlist.json'); //read config.json
    let user = JSON.parse(userdata); //parse config to object
    for (let i = 0; i < user.length; i++) {
        let flights = [];
        for (let u = 0; u < Object.keys(data).length - 1; u++) {
            if (flighttypes[data[u].ftid] == 'S - Schulflug' || flighttypes[data[u].ftid] == 'Ü - Auffrischungsschulung') {
                if (data[u].uidpilot || data[u].uidattendant == user[i].uid) {
                    flights.push(data[u])
                }
            } else if (data[u].uidpilot == user[i].uid) {
                flights.push(data[u])
            }
        }
        if (flights.length) {
            flights.push({ "httpstatuscode": 200 })
            let message = `*Hey ${user[i].firstname}!* Ich hoffe du hattest einen schönen Flugtag :) Eine Tagesstatistik kannst Du mit /stats anfordern. Hier sind deine heutigen Flugbucheinträge.`
            bot.telegram.sendMessage(user[i].telegram, message, { parse_mode: 'markdown' });
            printFlights(flights, user[i].telegram)
        }
        flights = []
    }
    console.log('Flugbucheinträge versendet!')
}

function checkDate(date) {
    if (date && date.length == 10 && date.includes('-')) {
        let subDate = date.split('-') //split date
        if (subDate[0].length == 4 && Number.parseInt(subDate[0]) >= 2000) {
            if (subDate[1].length == 2 && 1 <= Number.parseInt(subDate[1]) <= 12) {
                if (subDate[2].length == 2 && 1 <= Number.parseInt(subDate[2]) && Number.parseInt(subDate[2]) <= 31) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Scheduler ---------------------------------------
/*schedule.scheduleJob('0 9 * * 6-7', function () { // Sat-Sun 9:00
        checkUpdate();
}); */
schedule.scheduleJob('*/5 7-17 * * *', function () { // Check for first flight every 5 minutes between 7h and 18h
    checkUpdate();
});
schedule.scheduleJob('0 0 * * *', function () { // Every midnight, set update to false
    update = false;
    pushedDayLog = false;
    console.log('Tagesupdate zurückgesetzt!')
});
schedule.scheduleJob('1 0 * * *', function () { // Refresh Userlist (TG-IDs from Vereinsflieger)
    userList();
    console.log('Mitgliederliste aktualisiert!')
});
schedule.scheduleJob('*/10 * * * *', function () {
    loginTest();
    console.log('Vereinsflieger: Prüfung auf Session timeout...')
});
schedule.scheduleJob('* 19 * * *', function () { //Send logbook entries to todays pilots
    if (!pushedDayLog) {
        getToday(null, 2);
    }
})

// -------------------------------------------------
bot.launch() // start