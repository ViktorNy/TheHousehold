

# <p align = "center"> The household </p>

## <p align = "center">Beskrivning av projektet </p>

Household management app. You can create and join households, all households have chores with assigned scores. Owners can create and edit chores.
Every member of a household can upon completion mark chores as done, this increases ones point total. It is also possible to see pie charts depicting 
users and their respective completed chores.

## <p align = "center">Bygg och starta projektet</p>

```npm install``` <-- installs dependencies

```npm start``` <-- starts application

### Fungerande login (små bokstäver):
**användarnamn**: sven  
**lösenord**: s

**användarnamn**: johan  
**lösenord**: j

**användarnamn**: peder  
**lösenord**: p  

**Fungerande hushållskoder**:  
123  
444  
112358

**NOTISER** - Vi vill notera att vi enbart utvecklat mot Android. 

## <p align = "center">Komponenter</p> 

# Kravlista

*: Dessa krav måste göras (21st).

# Antal krav: 40.

### G: 20 (50%).

### VG: 32 (80%).

# Kravlista (4)

### Krav för G

- [x] En logga, splashscreen och appikon ska designas och användas. *
- [x] Applikationen ska byggas med RN, Expo & TS. *
- [x] Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras
med produktägare, godkännas och dokumenteras. *

### Krav för VG

- [x] Information ska kommuniceras till och från en server. (VG)

# Hushåll (7)

### Krav för G

- [x] Ett hushåll ska ha ett namn och en genererad (enkel) kod så andra kan gå med i hushållet,
namnet ska gå att ändra. *

### Krav för VG

- [x] Alla användare i ett hushåll ska kunna se vilka som tillhör ett hushåll.
- [x] En ägare av ett hushåll ska kunna se förfrågningar om att gå med i hushållet.
- [x] En ägare ska kunna acceptera eller neka förfrågningar.
- [x] En ägare ska kunna göra andra till ägare.
- [ ] En ägare ska kunna pausa en användare och under pausade perioder ska användare inte tas med i statistiken.
- [ ] Om en använder har pausats under en del av en period i statistiken ska graferna normaliseras.

# Konto (5)

### Krav för G

- [x] En användare ska kunna logga in sig. *
- [x] En användare ska kunna skapa ett nytt hushåll. *
- [x] En användare ska kunna gå med i ett hushåll genom att ange hushållets kod. *
- [x] När en användare har valt att gå med i ett hushåll behöver en ägare av hushållet först
godkänna användaren.

### Krav för VG

- [x] En användare ska kunna lämna ett hushåll. (ägare kan inte lämna hushållet, då vi inte vill göra hushåll ägarlösa)

# Profil (6)

### Krav för G

- [x] En användare ska kunna ange sitt namn. *
- [x] En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista. *
- [x] Valda avatarer ska inte kunna väljas av andra användare i hushållet. *
- [x] Avataren ska användas i appen för att visa vad användaren har gjort. *
- [x] En användare ska kunna ställa in appens utseende (mörkt, ljust, auto).
- [x] Om en användare tillhör två eller fler hushåll ska denne kunna välja att byta mellan de olika hushållen.

# Sysslor (6)

### Krav för G

- [x] En ägare ska kunna lägga till sysslor att göra i hemmet. *
- [x] En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar), och en vikt som beskriver hur energikrävande den är. *
- [x] En ägare ska kunna redigera en syssla. *
- [x] En ägare ska kunna ta bort en syssla. *

### Krav för VG

- [ ] En användare ska kunna lägga till en ljudinspelning och en bild för att beskriva sysslan ytterligare.
- [ ] När en syssla tas bort ska användaren få en varning om att all statistik gällande sysslan också kommer att tas bort och få valet att arkivera sysslan istället.

# Dagsvyn (3)

### Krav för G

- [x] Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras. *
- [x] Utöver sysslans namn ska även vem/vilka som har gjort sysslan visas, hur många dagar sedan sysslan gjordes senast samt om den är försenad. *
- [x] När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även med ett enkelt tryck gå att markera sysslan som gjord. *

# Statistik (6)

### Krav för G

- [x] En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt hushåll. *
- [x] Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt fördelning av varje enskild syssla. *
- [x] Det ska finnas en statistikvy över ”nuvarande vecka”. *

### Krav för VG

- [x] Det ska finnas en statistikvy över ”förra vecka”.
- [x] Det ska finnas en statistikvy över ”förra månaden”. 
- [ ] Om det inte finns statistik för en av vyerna ska den vyn inte visas.

# Schemaläggning (3)

### Krav för VG

- [ ] En ägare ska kunna tilldela och ta bort sysslor från användare i hushållet.
- [x] Användare ska kunna se de tilldelade sysslorna i sitt gränssnitt. (syssla kan inte tilldelas men om den är tilldelad så syns det att den är det)
- [ ] En ägare ska kunna skapa grupper av sysslor som automatiskt tilldelas användarna i hushållet och roteras baserat på ett intervall i dagar. 

# Extra (3)

- [x] Att vi har displayar totalt antal gjorde sysslor/poäng användare har i sina hushåll.
- [x] Att användare har en egen sida med lite generell information.
- [x] Att vi kan registrera nya användare.