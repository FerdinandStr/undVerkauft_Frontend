![und verkauft! Logo](public/und_verkauft_logo.svg)

# und Verkauft! Frontend

## Grundlangen

Das Frontend kann auf 3 verschiedene Arten gestartet werden. In der Entwicklung wurde **Vite** als schnelle Entwicklungsumgebung benutzt. Für den theoretischen Depoly kann die Webseite aber trozdem mit **Webpack** zu einer einzigen JS Datei gepackt und auf einem Webserver gehostet werden. Dies wurde auch mit einem kleinen **Docker** Script umgesetzt, der den letzten build nimmt und in einem Docker Container mittels dem nodeJS "http-server" hostet. Dies kann natürlich auch von hand mit dem http-server durchgeführt werden.

# Setup

## Docker oder **http-server**

### Docker

Mittels **Docker** kann das docker-compose Script aufgerufen werden, welche den letzten build im public Folder hostet, dies wird ganz einfach mit folgendem Befehl gestartet (Docker Installation vorausgesetzt):

> _terminal im Frontend root Verzeichnis geöffnet_

> docker-compose up

### http-server

**alternativ und vlt sinnvoller** kann der **http-server** auch von Hand im public Folder gestartet werden:

> _terminal im Frontend root Verzeichnis geöffnet_

> npm install --global http-server

> http-server ./public --proxy http://localhost:8080?

<br/><br/>

## Webseite mit Webpack bauen (Fallback)

Dies ist grundsätzlich nicht nötig, da der aktuellste stand im public Folder liegt, jedoch kann mittels Webpack ein neuer Build erzeugt werden:

> _terminal im Frontend root Verzeichnis geöffnet_

> npm install

> npm run wp

> _neuer build liegt im Ordner "dist", dieser muss nun in public kopiert werden_

<br/><br/>

## Webseite mit Vite im Entwicklungsmodus starten

Weitere möglichkeit, falls der http-server probleme macht beim React Routing, kann das Frontend natürlich auch mit Vite gestartet werden:

> npm install

> npm run start

<br/><hr><br/>

**Voraussetztung ist natürlich, dass das Backend im Hinergrund auch gestaret ist und unter localhost:3000 zur Verfügung steht!**
