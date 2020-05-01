
# TeleFly ![](https://img.shields.io/badge/version-1.0-green.svg) [![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)
![TeleFly-Logo](https://wichmann.dev/telefly-resources/telefly-logo.png)

## Was ist TeleFly?

**TeleFly** ist ein speziell für Flugsportvereine konzipierter, inteligenter Chatbot für den Instant-Messaging-Dienst Telegram.
Im Zusammenspiel mit der Online-Vereinsverwaltung [vereinsflieger.de](vereinsflieger.de) stellt **TeleFly** dir viele nützliche Funktionen für den Vereinsalltag bereit.

## Features

#### Benachrichtigung zum Flugbetrieb
Sofern konfiguriert, sendet **TeleFly** Dir an jedem Flugtag eine Push-Benachrichtigung beim ersten Start des Tages im Hauptflugbuch deines Vereins (inkl. Flugzeug, Pilot, Begleiter, Flugplatz und Startzeit). So bist Du immer informiert, was auf dem Flugplatz gerade los ist.
#### Automatischer Flugbuchversand
Alle mit **TeleFly** verbundenen Vereinsmitglieder erhalten (sofern Sie geflogen sind) am Abend eine Nachricht mit einer chronologischen Auflistung aller Ihrer Flüge (FIs auch Flüge als "Begleiter", sofern die Flugart "S-Schluflug" ist). Die Datensätze sind so aufbereitet, dass sie einfach der Reihe nach ins Papier-Flugbuch abgeschrieben werden können.
#### Tagesstatistik
    /stats
    /stats YYYY-MM-DD
Der Statistik-Befehl gibt ohne weitere Attribute für den aktuellen Tag eine Flugstatistik (bezogen auf das Hauptflugbuch des Vereins) aus. Wird hinter dem Befehl ein Datum im oben abgebildeten Format angegeben, wird die Statistik für einen beliebigen Tag generiert.

Die Statistik beinhaltet:
- Abflugplätze
- Anzahl der Flüge
- Kumulierte Flugzeit
- Alle gestarteten Piloten, Begleiter und Flugzeuge

#### Flugbuchabruf

    /log
    /log x (max. 100)
    /log YYYY-MM-DD
Ohne weitere Attribute sendet dieser Befehl die letzten zehn Flüge aus dem persönlichen Flugbuch des betreffenden Mitglieds. Weiterhin können mit einer hinter dem Befehl angegebenen Zahl bis zu 100 Flüge ausgegeben werden. Schreibt man ein Datum im oben abgebildeten Format hinter den Befehl, erhält man eine Auflistung der eignen Flüge für einen bestimmten Tag.

#### Weitere Befehle

    /help
Zeige die Hilfe / Befehlsübersicht

    /id
Sende dem Administrator dein Namen sowie die Telegram-ID des Versenders zur Verknüpfung mit dem Vereinsflieger-Konto.

    /credits
Zeige allgemeine Informationen zu **TeleFly** sowie die Copyrighthinweise

    /version
Zeige die installierte Version der **TeleFly**-Instanz.

    /connect
Führe einen Verbindungstest mit vereinsflieger.de durch, führe bei Misserfolg einen Login durch.


## Todo-Liste
- Automatische Kalkulation und Versand der LFZ-Bordbucheinträge am Tagesende
- Automatische Prüfung auf Updates für TeleFly
- Code Cleanup

_Weitere Feature-Requests kannst du mir gerne zukommen lassen! Mitarbeiten ist natürlich auch gerne möglich._
## Installation

**TeleFly** läuft in der Node.js-Umgebung und ist daher plattformunabhängig. Einzige Bedingung für die sinnvolle Nuztung ist eine möglichst durchgehende Verfügbarkeit des Servers. Es empfiehlt sich (solange man zuhause keinen Computer hat, der 24/7 läuft) einen günstigen Webserver mit Node.js Unterstützung oder einen vServer zu mieten. Angebote dafür findet man bei einer kurzen Suche tonnenweise.
Da unsere Server-Applikation keine komplexen Berechnungen anstellt und der Nutzerkreis jeweils auf einen Verein beschränkt ist, sollte der Betrieb auch auf einem Raspberry Pi problemlos möglich sein (getestet habe ich das allerdings noch nicht).

### Node.js, npm und git installieren
Zunächst installieren wir Node.js und den zugehörigen Paketmanager npm.
#### Windows und MacOS
Für Windows und MacOS kann der entsprechende Installer für Node.js hier heruntergeladen werden:

[Node.js für Windows und MacOS herunterladen](https://nodejs.org/de/download//) 

Git bekommst Du hier:

[Git für Windows und MacOS herunterladen](https://git-scm.com/downloads)


#### Linux
##### Debian / Ubuntu basierte Linux-Distributionen
Node.js ist in den offiziellen Paketquellen nicht auf dem neusten Stand, daher empfiehlt sich das hinzufügen einer Fremdquelle:

    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
Anschließend kann das Paket mit dem folgenden Befehl installiert werden: 

    sudo apt-get install -y nodejs
Die Erfolgreiche Installation kannst Du anschließend mit

    node --version
    npm --version
    git --version
übeprüfen.
##### Arch-Linux
Node.js und npm sind im community Repository verfügbar, git bekommst du aus dem extra Repository:

    pacman -S nodejs npm git

Die Erfolgreiche Installation kannst Du anschließend mit

    node --version
    npm --version
    git --version
übeprüfen.

##### Raspberry Pi
Voraussetzungen: Ein Raspberry Pi mit installierten Raspbian-Image, Internetverbindung und eingeschaltetem SSH-Zugang (wer dabei hilfe benötigt, schaut bitte [hier](https://www.w3schools.com/nodejs/nodejs_raspberrypi.asp)):

Ist der Pi soweit vorbereitet, einfach die folgenden Befehle ausführen:

    sudo apt-get update
    sudo apt-get dist-upgrade
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo apt install git
Die Erfolgreiche Installation kannst Du anschließend mit

    node --version
    npm --version
    git --version
übeprüfen.
### Das Git-Repository klonen
Jetzt erstellen wir ein Verzeichnis, in dem wir **TeleFly** installieren wollen.
#### Windows
Öffne den Explorer und erstelle an beliebiger Stelle einen Ordner, der **TeleFly** beinhalten soll (zum Beispiel "Dokumente"-->"NodeJS"). Anschließend gehst du in den Ordner und wählst im Rechtsklick-Kontextmenü "Git Bash here". In das nun erscheinende Terminal kopierst du folgenden Befehl:

    git clone https://github.com/nwmx/TeleFly.git
#### Linux / Raspberry Pi
Erstelle mit `mkdir` ein Verzeichnis, in dem **TeleFly** installiert werden soll. Zum Beispiel so:

    mkdir ~/NodeJS

Anschließend navigierst du mit `cd` in besagten Ordner:

    cd ~/NodeJS
Jetzt können wir das Git-Repository klonen:

    git clone https://github.com/nwmx/TeleFly.git

### npm Pakete installieren
Wir befinden uns jetzt im NodeJS-Ordner. Um die nötigen Pakete für **TeleFly** herunterzuladen, navigieren wir nun in das soeben geklonte Repository:

    cd telefly
Mit dem nachfolgenden Befehl werden alle für **TeleFly** benötigten npm-Pakete installiert:

    npm install
Damit wäre die Installation geschafft! Jetzt fehlt nur noch die Konfiguration, dann kann es schon losgehen.

## Konfiguration
Um **TeleFly** verwenden zu können, muss es nun noch für deinen Verein konfiguriert werden. Dazu öffnest du die Datei **config.json** Verwende Editor (Windows), notepad++, Visual Studio Code, Atom oder ähnlines **nicht WordPad / Word (Windows), Pages / TextEdit (MacOS)!** Diese Texteditoren managen die Datei und machen diese dadurch für **TeleFly unlesbar!**

Die Konfiguration sieht folgendermaßen aus:

    "telegram": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "tg_adminid": "123456789",
    "appkey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "username": "example@example.com",
    "password": "Passwort",
    "cid": "123",
    "verein": "XXXX"
### "telegram" - Mit dem Botfather chatten
![Der Telegram-Botfather](https://core.telegram.org/file/811140763/1/PihKNbjT8UE/03b57814e13713da37)
In das Konfigurationsfeld **"telegram"** kommt der sogenannte API-Token für den Telegram-Bot, den wir nun folgendermaßen erstellen:
- **Wichtig!** Führe alle folgenden Schritte von dem Telegram-Konto aus durch, dass später auch als Adminkonto für den Bot sein soll (Benutzerverwaltung, Push-Nachrichten an alle Nutzer, manuelles verschicken der Flugbucheinträge usw.).
- Öffne die Telegram-App auf einem beliebigen Gerät (PC, Tablet, Smartphone), tippe auf die **kleine Lupe** und suche nach _@botfather_. Tippt auf das Konto mit dem kleinen Bot-Symbol vor dem Namen.
- Drücke unten im Chat auf **Starten**. Jetzt zeigt Dir der Botfather alle bei ihm verfügbaren Befehle an. Um einen Telegram-Bot zu erstellen, gibst du einfach **/newbot** ein und verschickst die Nachricht in den Chat, alternativ kannst du auch einfach auf den verlinkten Befehl in der Auflistung klicken.
- Wähle einen Namen für deinen Bot. Zum Beispiel: MeinVereinskürzel-TeleFly
- Wähle einen Kontonamen für deinen Bot, dieser muss einmalig sein und mit "bot" enden. Zum Beispiel: meinvereinskuerzel_bot

Jetzt bekommst Du einen langen Token angezeigt - kopiere ihn in das Feld **"telegram"** in der **config.json** zwischen die Anführungszeichen. Achte darauf, dass sich weder am Anfang, noch am Ende des Tokens Leerzeichen vor / hinter dem Anführungszeichen einschleichen! Bewahre diesen Token sicher auf! Jeder, der diesen Token besitzt, kann deinen Bot kontrollieren!
Um den Vereinsmitgliedern die Bedienung des Bots zu erleichtern, wollen wir nun noch die verfügbaren Befehle einpflegen:

Sende dem Botfather eine Nachricht mit `/setcommands`.
Gegebenenfalls musst du nun noch den Bot auswählen, für den du die Befehle einpflegen möchtest. Anschließend kopierst du folgende Nachricht in das Nachrichtenfeld:

    stats - Zeige die Flugstatistik für den aktuellen Tag
    log - Zeige die letzten 10 Flüge aus meinem Flugbuch
    connect - Überprüfe die Verbindung zu vereinsflieger.de
    credits - Zeige weitere Informationen zu TeleFly
    help - Zeige die Hilfe
    id - Verknüpfe mein Vereinsflieger-Konto

Wenn du magst, kannst du mit `/setuserpic` noch ein Profilbild für den Bot einstellen. Wenn du kein Bild mit deinem Vereinslogo parat hast, nimm doch einfach das [TeleFly-Logo](https://wichmann.dev/TeleFly-Logo.png).

Außerdem ist eine Botbeschreibung sinvoll, die deinen Benutzern bei der ersten Verwendung des Bots oberhalb des Startknopfes angezeigt wird. Eine Beschreibung kannst du mit `/setdescription` festlegen. Hier ist ein Beispiel, dass duch auch einfach übernehmen kannst:

    TeleFly ist ein speziell für Flugsportvereine konzipierter, inteligenter Chatbot für den Instant-Messaging-Dienst Telegram.
    Im Zusammenspiel mit der Online-Vereinsverwaltung vereinsflieger.de stellt TeleFly dir viele nützliche Funktionen für den Vereinsalltag bereit.
    Weitere Informationen findest Du unter github.com/nwmx/TeleFly
    
    Klicke auf "Starten" um loszulegen!

Gehe nun zurück in die Chatübersicht von Telegram und tippe auf die **kleine Lupe**. Suche nach _@meinvereinskuerzel_bot_. Ersetzte den Name hinter dem "@" durch den eben festgelegten Kontonamen deines Bots. Tippt auf das Konto mit dem kleinen Bot-Symbol vor dem Namen. Der Name sollte ebenfalls dem entsprechen, den du gerade beim Botfather festgelegt hast.

Drücke unten im Chat auf **Starten**.
Vom Bot gibt es noch keine Reaktion - wir haben ihn ja auch noch gar nicht gestartet. In dem wir auf **Starten** drücken, erlauben wir dem Bot aber schonmal uns später anzuschreiben.

### "tg_adminid" - Deine Telegram-ID herausfinden
Öffne die Telegram-App (selbes Telegram-Konto wie zuvor!) auf einem beliebigen Gerät (PC, Tablet, Smartphone), tippe auf die **kleine Lupe** und suche nach _@myidbot_. Tippt auf das Konto mit dem kleinen Bot-Symbol vor dem Namen.

Drücke unten im Chat auf **Starten**. 

Um deine Telegram-ID zu erimtteln, gibst du einfach **/getid** ein und verschickst die Nachricht in den Chat, alternativ kannst du auch einfach auf den verlinkten Befehl in der Auflistung klicken.

Der Bot schickt dir jetzt eine Nummer zurück, diese Nummer ist deine eindeutige Telegram-ID, kopiere sie in das Feld **"tg_adminid"** in der **config.json** zwischen die Anführungszeichen. Achte wieder darauf, dass sich keine Leerzeichen einschleichen.

### "appkey" - Vereins-API-Schlüssel von vereinsflieger.de
Um auf die Daten deines Vereins bei vereinsflieger.de zugreifen zu können, benötigst du einen vereinsspezifischen API-Key vom Vereinsflieger-Support. Schreibe dafür eine kurze E-Mail und frage nach den **API-Key** für deinen Verein. Der Support antwortet in der Regel sehr schnell, daher musst du sicher nicht lange warten.
Sobald du den **API-Key** erhalten hast, kopieren ihn in das Feld **"appkey"** in der **config.json** zwischen die Anführungszeichen (ohne Leerzeichen vorne oder hinten!).

### "username" und "password" 
Hier trägst du das Vereinsflieger-Konto ein, über das der Bot das Hauptflugbuch sowie die Benutzerdatenbank auslesen kann. Im Idealfall erstellst du dafür einen eigenen Vereinsflieger-Account. Achte darauf, dass der Account die nötigten Rechte besitzt um Mitgliederliste und Hauptflugbuch auszulesen! Insbesondere wird zum Auslesen der Mitgliederliste das Recht "Mitgliederdaten bearbeiten" benötigt.

**Datemschutzhinweis:** Benutzername und Passwort des in der **config.json** hinterlegten Vereinsflieger-Accounts werden nur dort dauerhaft gespeichert. Vor der verschlüsselten Übermittlung an die Vereinsflieger-Schnittstelle (HTTPS) wird das Passwort zusätzlich gehasht.
Weiterhin werden nur von den beim Bot registrierten Benutzern der Vorname, Nachname, die Vereinsflieger Benutzernummer (UID) sowie die Telegram-ID in der Datei **userlist.json** gespeichert. Die genaue Art und Weise, wie sensible Daten durch den Bot verarbeitet werden, kannst du dir im Code bei **GitHub** auch anschauen!
**Ich übernehme keine Haftung für Datenlecks und die unerlaubte Kompromittierung personenbezogener Daten jeglicher Art!**
Wähle ein sicheres Passwort für den Server, auf dem TeleFly läuft und konfiguriere möglichst keine zusätzlichen Portfreigaben!

### "cid" - Die Eindeutige Nummer deines Vereins bei vereinsflieger.de
Die Eindeutige Nummer deines Vereins (CID) findest du bei Vereinsflieger unter "_Administration_ --> _Stammdaten_ --> _Verein_" rechts neben dem Kurznamen deines Vereins. Tippe **nur die Zahl** ohne Leerzeichen in das Feld **"cid"** in der **config.json** zwischen die Anführungszeichen.

### "verein" - Dein Vereinskürzel
Hier trägst du den Namen deines Vereins, im Idealfall das Kürzel deines Vereins, zwischen den Anführungszeichen ein. Der Name wird in der Willkommensnachricht des Bots verwendet und hat keine Bedeutung für die Kommunikation mit Vereinsflieger.de.

### optional: flighttypes.json anpassen
Sofern in deinem Verein keine weitere Flugarten über die voreingestellten Flugarten hinaus existieren, kannst du diesen Absatz ignorieren. Sollte dein Verein eigene, benuzerdefinierte Flugarten besitzen, rufe diese zunächst auf ("_Vereinsflieger_ --> _Administration_ --> _Stammdaten_ --> _Flugarten_).
Öffne die Datei **flighttypes.json** in deinem Editor und gleiche die Reihenfolgen mit der Auflistung in Vereinsflieger von oben nach unten ab. Gegebenenfalls kannst Du mit der entsprechenden Nummern 13, 14 usw. weitere Einträge hinzufügen. Lasse die Bezeichnungen der bestehenden Flugarten möglichst unangetastet.

## Erster Start

Navigiere mit dem Terminal (`cd`) in das "telefly"-Verzeichnis und führe den Befehl `node index.js` aus. Wenn du im Terminal die Zeilen
 
     KONFIGURATION VOLLSTÄNDIG!
     TELEFLY ONLINE!

sehen kannst, ist deine Konfiguration soweit vollständig.

Der Bot sollte nun starten und probieren sich mit Vereinsflieger zu verbinden. Das wird beim ersten Mal nicht klappen, da der Login noch nicht erfolgt ist. Der Login wird nach einem gescheiterten Verbindungsversuch automatisch ausgeführt.

Öffne nun Telegram auf einem beliebigen Gerät und navigiere in den Chat mit deinem Bot.
Sende dem Bot eine Nachricht mit `/id`. Du solltest nun zwei Nachrichten zurückbekommen. In der ersten teilt dir der Bot mit, dass er deinen Name zusammen mit deiner Telegram-ID an den Administrator geschickt hat. Da du der Administrator bist, erhälst du gleich noch eine Nachricht mit der Meldung "neue Benutzeranfrage", deinem Namen und deiner Telegram-ID.

Die Telegram-ID muss für jeden Nutzer deines Bots zwecks Flugzuordnung bei Vereinsflieger hinterlegt werden. Jeder neue Nutzer wird, sobald er das erstmal mit dem Bot chattet, dazu aufgefordert den `/id` Befehl zu senden, welcher dir wiederum den entsprechenden Namen zusammen mit der Telegram-ID zukommen lässt.
Wie die Telegram-ID bei Vereinsflieger hinterlegt wird, siehst du im nächsten Schritt.

## Mitgliederkonten bei Vereinsflieger verknüpfen
Damit **TelefFly** die Flüge aus dem Hauptflugbuch deines Vereins den jeweiligen Nutzern deines Bots zuordnen kann, musst du die jeweilige Telegram-ID für jeden Nutzer bei Vereinsflieger hinterlegen. Dafür erstellst du eine neue **Mitgliedereigenschaft**.
Navigiere bei Vereinsflieger zu _"Administration"_-->_"Stammdaten"_-->_"Mitgliedereigenschaften"_ und klicke auf _"Neuer Datensatz"_. Die Einstellungen der neuen Mitgliedereigenschaft legst du wie folgt fest:
![Name: Telegram, Datentyp: Zeichenkette, Infotext: Telegram-ID für den Telefly-Bot, Sotierreihenfolge: 0](https://wichmann.dev/telefly-resources/Mitgliedereigenschaften-Telegram.png)
**Wichtig:** Achte darauf, dass bei Sortierreihenfolge eine "0" steht, andernfalls findet **TeleFly** die Telegram-ID nicht!

Jetzt besitzt jedes Mitglied ein Textfeld mit dem Namen "Telegram", das wir jetzt beschreiben können um unsere Telegram-ID zuzuordnen. Navigiere unter _"Verein"_-->_"Mitglieder"_ in dein eigenes Vereinsflieger-Konto. Rufe anschließend den Reiter _"Funktionen / Sparten"_ auf. Hier findest Du unsere eben erstellte Mitgliedereigenschaft wieder:
![Weitere Eigenschaften --> Telegram](https://wichmann.dev/telefly-resources/telegram-id-eintragen.png)
Hier trägst du einfach deine Telegram-ID (später dann die Telegram-ID des jeweiligen Mitgliedes, die dir der Bot gesendet hat) ein und klickst auf _Speichern_.
Gehe nun zurück in die Telegram-App und sende dem Bot den Befehl `/confirm telegramid`. _telegramid_ ersetzt du dabei natürlich mit der Telegram-ID, die Du gerade hinterlegt hast (nur die Nummer, ohne Anführungszeichen!).

Telefly durchsucht nun die Vereinsflieger-Mitgliederliste nach neuen Telegram-IDs und speichert die Assoziation auf deinem Server in der Datei **userlist.json**.
Weiterhin erhält das Mitglied, für das du gerade die Telegram-ID hinterlegt hast eine Nachricht, dass Telefly nun im vollen Umfang genutzt werden kann.

Herzlichen Glückwunsch! Du hast **TeleFly** installiert und deinen ersten Benutzer verbunden! Die automatischen Benachrichtigungen werden an alle Benutzer automatisch verschickt sofern der Bot läuft.
Um den Bot unter Linux im Hintergrund laufen zu lassen, kannst du z.B. `screen` verwenden. Weitere Informationen dazu findest du [hier](https://wiki.ubuntuusers.de/Screen/).

## Administrator-Befehle
Als Administrator deines **TeleFly**-Bots (hinterlegte Telegram-ID in der **config.json**) kannst du einige administrative Befehle ausführen (Groß- / Kleinschreibung beachten!).

Hier eine Übersicht:

`/version` 
Zeige die aktuelle Version der installierten TeleFly-Instanz

`/signout` 

Führe einen Logout bei der Vereinsflieger-Schnittstelle durch.

`/toggleUpdate` 
Setze den Status für die Flugbetriebsbenachrichtigung zurück (wird automatisch täglich um Mitternacht durchgeführt). Ist der Status "false", wird zwischen 7 und 17 Uhr alle 5 Minuten das Hauptflugbuch auf den ersten Flug des Tages überprüft. Wird ein Flug gefunden, werden entsprechende Push-Benachrichtigungen verschickt und der Status auf "true" gesetzt.

Um ein mehrfaches versenden der Benachrichtigungen zu vermeiden, ist der Status beim Serverstart auf **"true"**gesetzt! --> _Keine Benachrichtigung mehr für diesen Tag / Rücksetzen um Mitternacht_

`/dayLog`
Sende die Flugbucheinträge für den heutigen Tag manuell an alle Piloten, die geflogen sind. Standardmäßig werden die Flugbucheinträge automatisch um 19 Uhr verschickt.

`/userList` 
Suche in der Vereinsflieger-Mitgliederliste nach neuen Telegram-IDs. Standardmäßig wird diese Funktion täglich um Mitternacht und bei jeden `/confirm` Befehl ausgeführt.

`/confirm telegramid`
Bestätige, dass du die Telegram-ID, die du anstelle von _telegramid_ hinter den Befehl schreibst, bei Vereinsflieger hinterlegt hast. Der zugehörige Telegram-Nutzer wird installiert und die Mitgliederliste bei Vereinsflieger wird nach neuen Telegram-IDs durchsucht.
Achte auf ein Leerzeichen zwischen Befehl und Telegram-ID!

`/shout nachrichtentext`
Sende eine Nachricht an alle verknüpften Vereinsmitglieder. Absätze und Markdown-Syntax sind möglich!
Achte auf ein Leerzeichen zwischen Befehl und deiner Nachricht!

## Credits
**TeleFly**
Der intelligente Chatbot für Flugsportvereine mit vereinsflieger.de
Copyright © 2020 - present, Nico Wichmann.

Lizensiert unter der GNU General Public License v3.0 (Open Source)

**Abhängigkeiten:**

**telegraf** - Copyright © 2016 - 2019, Vitaly Domnikov.
**axios** - Copyright © 2014 - present, Matt Zabriskie.
**colors** - Copyright © Marak Squires, Sindre Sorhus.
**md5** - Copyright © 2011-2012, Paul Vorbach. Copyright © 2009, Jeff Mott.
**node-schedule** - Copyright © 2015, Matt Patenaude.
