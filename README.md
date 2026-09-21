# MyWishlist Frontend

Das Frontend von MyWishlist ist eine responsive Angular-Anwendung zur Verwaltung einer persönlichen Wunschliste.

## Funktionen

- Wünsche anzeigen
- neue Wünsche mit Name, Preis und Priorität hinzufügen
- vorhandene Wünsche bearbeiten
- Wünsche als gekauft oder nicht gekauft markieren
- Wünsche nach Bestätigung löschen
- sehr dringende Wünsche zuerst anzeigen
- Eingaben validieren und verständliche Fehlermeldungen anzeigen
- Lade- und Leerzustände darstellen
- responsive Darstellung für Desktop und mobile Bildschirmgrößen

## Verwendete Technologien

- Angular
- TypeScript
- HTML
- CSS
- Bootstrap
- Vitest
- Git und GitHub

## Voraussetzungen

Für die lokale Ausführung werden benötigt:

- Node.js
- npm
- das separat gestartete MyWishlist-Backend
- eine laufende PostgreSQL-Datenbank

## Installation

Repository klonen und Abhängigkeiten installieren:

```bash
git clone https://github.com/Sara807-web/mywishlist-frontend.git
cd mywishlist-frontend
npm install
```

## Anwendung starten

Zuerst müssen die PostgreSQL-Datenbank und das Backend gestartet werden.

Danach das Frontend starten:

```bash
npm start
```

Die Anwendung ist anschließend unter folgender Adresse erreichbar:

```text
http://localhost:4200
```

## Tests ausführen

```bash
npm test -- --watch=false
```

## API-Konfiguration

Während der lokalen Entwicklung verwendet das Frontend diese Backend-Adresse:

```text
http://localhost:3000/wishes
```

Die Konfiguration befindet sich in:

```text
src/environments/environment.ts
```

## Projektstruktur

```text
src/app/app.ts            Komponentenlogik
src/app/app.html          Benutzeroberfläche
src/app/app.css           Design der Hauptkomponente
src/app/wish.ts           Wish-Datentyp
src/app/wish.service.ts   Kommunikation mit dem Backend
src/styles.css            globale Gestaltung und Bootstrap
```

## Backend

Das zugehörige Backend befindet sich in einem separaten Repository:

https://github.com/Sara807-web/mywishlist-backend

## Verwendete KI-Werkzeuge

Bei der Entwicklung dieses Projekts wurden folgende KI-Werkzeuge verwendet:

- **OpenAI Codex/ChatGPT:** Unterstützung bei der schrittweisen Planung und Entwicklung, bei Codeerklärungen, Fehlersuche, Testfällen, Git-Arbeit und der Vorbereitung der Dokumentation.
- **OpenAI-Bildgenerierung:** Erstellung des individuellen Wishlist-Bildes für die Startseite.

Alle verwendeten Codebestandteile wurden während der Entwicklung getestet. Der Aufbau und die Funktionsweise der Anwendung werden für das abschließende Fachgespräch eigenständig nachvollzogen und vorbereitet.