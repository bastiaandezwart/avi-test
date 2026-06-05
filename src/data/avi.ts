import { AviLevel, AviLevelConfig } from '../types';

export const AVI_LEVELS: AviLevelConfig[] = [
  {
    level: 'Start',
    label: 'Start - Begin Groep 3',
    schoolYear: 'Begin Groep 3',
    wordCount: 61,
    goodMaxErrors: 2,
    goodMaxSeconds: 150,
    sufficientMaxErrors: 4,
    sufficientMaxSeconds: 185,
    // Klankzuivere woorden (medeklinker-klinker-medeklinker), korte zinnen elk op eigen regel,
    // minimale interpunctie, geen hoofdletters na punt behalve begin zin.
    sampleText: `Jan zit op de mat.
De kat zit bij Jan.
Jan aait de kat.
De kat spint luid.
Piet heeft een bal.
De bal is rood.
Piet gooit de bal omhoog.
De hond pakt de bal.
Mam roept Jan en Piet.
Ze rennen snel naar mam.
Ze eten brood met jam.
Jan en Piet zijn blij.
Het is een fijne dag.`,
  },
  {
    level: 'M3',
    label: 'M3 - Groep 3 midden',
    schoolYear: 'Groep 3 (midden)',
    wordCount: 90,
    goodMaxErrors: 2,
    goodMaxSeconds: 120,
    sufficientMaxErrors: 5,
    sufficientMaxSeconds: 150,
    // Eenvoudige eenlettergrepige woorden met dubbele medeklinkers (kast, lamp, stip, plank).
    // Korte zinnen. Punt als enige leesteken.
    sampleText: `Op de kast staat een lamp. De lamp geeft licht.
Naast de kast staat een stoel. Op de stoel ligt een jas.
Tom pakt zijn jas en trekt hem aan.
Buiten is het koud. De grond is wit van vorst.
Tom stapt op zijn fiets en rijdt naar school.
Op school hangt hij zijn tas aan de haak.
De juf staat voor de klas. Ze zegt goedemorgen.
Tom gaat op zijn stoel zitten.
Zijn vriend Bas knikt naar hem. Tom knikt terug.
Na de les gaan ze buiten spelen.
Ze rennen snel over het schoolplein.
Tom gooit een bal tegen de muur. Bas vangt hem op.`,
  },
  {
    level: 'E3',
    label: 'E3 - Groep 3 einde',
    schoolYear: 'Groep 3 (einde)',
    wordCount: 90,
    goodMaxErrors: 2,
    goodMaxSeconds: 110,
    sufficientMaxErrors: 5,
    sufficientMaxSeconds: 135,
    // Eenvoudige tweelettergrepige woorden (lopen, fietsen). Zinnen lopen over meerdere regels.
    // Gebruik van hoofdletters en vraagtekens.
    sampleText: `Op een koude ochtend stond Lisa vroeg op.
Ze wilde gaan schaatsen op de vijver in het park.
Mama keek bezorgd naar buiten. 'Is het wel veilig?' vroeg ze.
Lisa had haar laarzen al aan. 'Kom je ook mee?'
Samen liepen ze naar de vijver achter het dorp.
Er schaatsten al veel kinderen op het gladde ijs.
Lisa deed haar schaatsen aan en stond voorzichtig op.
In het begin wankelde ze nog een beetje.
Maar al snel gleed ze soepel over het ijs.
Mama stond aan de rand en keek lachend toe.
Ze bleven schaatsen tot de zon onderging.`,
  },
  {
    level: 'M4',
    label: 'M4 - Groep 4 midden',
    schoolYear: 'Groep 4 (midden)',
    wordCount: 95,
    goodMaxErrors: 2,
    goodMaxSeconds: 95,
    sufficientMaxErrors: 5,
    sufficientMaxSeconds: 120,
    // Woorden met voor- en achtervoegsels: ge-, be-, ver-, -ing, -lijk.
    // Langere zinnen met komma's en uitroeptekens.
    sampleText: `Sander had gisteren een verrekijker gekregen voor zijn verjaardag.
Vandaag nam hij hem voor het eerst mee naar buiten.
Hij liep naar het weiland achter zijn huis en keek omhoog.
In de verte vloog een grote vogel langzaam richting het bos.
Door de verrekijker zag Sander duidelijk de bruine vleugels en de gebogen snavel.
'Dat is een buizerd!' riep hij blij.
Hij had er al zo lang eentje willen zien.
Zijn vader had hem geleerd hoe je roofvogels kunt herkennen.
Nu had Sander het eindelijk zelf gedaan.
Wat een geweldig gevoel! Hij besloot hier elke dag langs te lopen.`,
  },
  {
    level: 'E4',
    label: 'E4 - Groep 4 einde',
    schoolYear: 'Groep 4 (einde)',
    wordCount: 98,
    goodMaxErrors: 2,
    goodMaxSeconds: 85,
    sufficientMaxErrors: 5,
    sufficientMaxSeconds: 110,
    // Meerlettergrepige woorden en langere samenstellingen (zwemdiploma, startsignaal).
    // Complexere verhaallijnen en langere teksten.
    sampleText: `Emma wilde al jarenlang leren zwemmen. Eindelijk had ze haar zwemdiploma gehaald.
Toch bleef haar grootste wens een rugcrawl-diploma. Dat was veel moeilijker.
Haar zwemlerares mevrouw Jansen zei dat ze er klaar voor was.
Op de dag van het examen was Emma zenuwachtig.
Ze deed haar zwembril op en klom op het startblok.
Bij het startsignaal dook ze in het koude water.
Ze zwom met krachtige slagen naar het andere eind van het bad.
Bij de laatste baan had ze nog genoeg energie voor een snelle finish.
'Geslaagd!' riep mevrouw Jansen.
Emma glimlachte breed van trots en geluk.`,
  },
  {
    level: 'M5',
    label: 'M5 - Groep 5 midden',
    schoolYear: 'Groep 5 (midden)',
    wordCount: 103,
    goodMaxErrors: 3,
    goodMaxSeconds: 80,
    sufficientMaxErrors: 6,
    sufficientMaxSeconds: 100,
    // Complexe woorden met lastige spelling (bijzonder, verwacht, ingewikkeld).
    // Introductie van eenvoudige leenwoorden. Langere samengestelde zinnen met bijzinnen.
    sampleText: `Vorig jaar deed onze klas mee aan een bijzonder project over duurzaamheid.
We moesten uitzoeken hoeveel energie ons gezin per week verbruikt.
Ik had verwacht dat dit ingewikkeld zou zijn, maar het viel mee.
Met een speciale meter konden we het stroomverbruik van elk apparaat meten.
Onze computer bleek de grootste verbruiker, gevolgd door de wasmachine.
We schreven alles op en maakten een grafiek van onze bevindingen.
Op de presentatiemiddag lieten we de klas onze resultaten zien.
Veel klasgenoten waren verrast door de uitkomsten. Zelfs onze meester keek verbaasd.
We besloten als groep enkele gewoonten te veranderen om energie te besparen.
Sindsdien zetten we apparaten echt uit in plaats van op stand-by.`,
  },
  {
    level: 'E5',
    label: 'E5 - Groep 5 einde',
    schoolYear: 'Groep 5 (einde)',
    wordCount: 104,
    goodMaxErrors: 3,
    goodMaxSeconds: 70,
    sufficientMaxErrors: 6,
    sufficientMaxSeconds: 90,
    // Complexere leenwoorden, gevarieerde zinsstructuren, meerdere bijzinnen.
    sampleText: `Op het strand van Zeeland ontdekte Maya iets vreemds tussen de rotsen.
Het was een klein, transparant wezentje dat langzaam bewoog in het ondiepe water.
Ze knielde neer en bekeek het nauwkeurig. Het leek wel een soort kwal.
'Raak het niet aan!' riep haar vader vanuit de verte. 'Die kunnen prikken!'
Maya trok snel haar hand terug en pakte haar notitieboekje.
Thuis zocht ze op internet naar soortgelijke wezens en vond na lang zoeken het antwoord.
Het bleek een blauwe kwal te zijn, een zeldzame soort die normaal in warm water leeft.
Hoe was die hier terechtgekomen? Misschien door de veranderende temperatuur van het zeewater.
Ze schreef een verslag en stuurde het op naar een biologievereniging.`,
  },
  {
    level: 'M6',
    label: 'M6 - Groep 6 midden',
    schoolYear: 'Groep 6 (midden)',
    wordCount: 107,
    goodMaxErrors: 3,
    goodMaxSeconds: 65,
    sufficientMaxErrors: 6,
    sufficientMaxSeconds: 85,
    // Grote variatie in zinsbouw. Aanhalingstekens bij directe rede.
    // Teksten met abstracter taalgebruik.
    sampleText: `Mevrouw De Groot was de strengste lerares van de school, dat wist iedereen.
Ze verwachtte stilte in de klas en keek met scherpe ogen toe als leerlingen afleidden.
Toch was ze ook de docent die de meeste leerlingen nooit zouden vergeten.
'Je leert hier niet alleen spelling en rekenen,' zei ze regelmatig.
'Je leert nadenken. En dat is veel belangrijker.'
Op de laatste schooldag gaf ze elke leerling een klein briefje met een persoonlijke boodschap.
Daan bewaarde zijn briefje jarenlang. Er stond op: 'Jij stelt de juiste vragen. Dat is een gave.'
Die woorden bleven hem zijn hele leven bij.
Pas veel later begreep hij hoe groot haar invloed op hem was geweest.`,
  },
  {
    level: 'E6',
    label: 'E6 - Groep 6 einde',
    schoolYear: 'Groep 6 (einde)',
    wordCount: 109,
    goodMaxErrors: 3,
    goodMaxSeconds: 60,
    sufficientMaxErrors: 6,
    sufficientMaxSeconds: 80,
    // Abstractere onderwerpen, complexere interpunctie, directe rede, genuanceerd taalgebruik.
    sampleText: `In het debat over sociale media en jongeren worden regelmatig tegenstrijdige argumenten naar voren gebracht.
Voorstanders wijzen op de mogelijkheden om met vrienden in contact te blijven en informatie te delen.
Critici benadrukken de risico's: vergelijkingsdrang, cyberpesten en verslavend gedrag.
Wetenschappelijk onderzoek laat een gemengd beeld zien.
Gebruik op zich is niet schadelijk, maar de manier waarop telt.
Jongeren die sociale media actief en doelgericht gebruiken, lijken minder last te hebben van negatieve effecten.
Maar wie eindeloos scrollt zonder doel, meldt vaker gevoelens van leegte en ontevredenheid.
Scholen spelen een steeds grotere rol in het bijbrengen van digitale vaardigheden.
Leerlingen leren niet alleen hoe ze media gebruiken, maar ook hoe ze er kritisch mee omgaan.`,
  },
  {
    level: 'M7',
    label: 'M7 - Groep 7 midden',
    schoolYear: 'Groep 7 (midden)',
    wordCount: 112,
    goodMaxErrors: 3,
    goodMaxSeconds: 55,
    sufficientMaxErrors: 6,
    sufficientMaxSeconds: 75,
    // Veel (moeilijke) leenwoorden, lange en complexe samengestelde woorden.
    // Figuurlijk taalgebruik en uitdrukkingen (innerlijk afhaken, radertje in een machine).
    sampleText: `Het fenomeen van de zogeheten 'stille ontslagname' is de laatste jaren sterk in opkomst.
Daarmee wordt bedoeld dat medewerkers niet letterlijk vertrekken, maar zich geleidelijk terugtrekken uit hun werk.
Ze doen nog precies wat van hen verwacht wordt, maar niet meer dan dat.
Experts spreken van een symptoom van een diepere malaise op de arbeidsmarkt.
Veel werknemers voelen zich niet langer gezien of gewaardeerd door hun werkgever.
Ze hebben het gevoel dat ze slechts een radertje zijn in een grote machine.
Organisatiepsychologen wijzen op het belang van zingeving en autonomie in het werk.
'Mensen willen ergens voor staan,' zegt onderzoeker Van Dijk. 'Als dat ontbreekt, haken ze innerlijk af.'
Bedrijven die dit negeren, zien op den duur hun productiviteit en innovatiekracht teruglopen.`,
  },
  {
    level: 'E7',
    label: 'E7 - Groep 7 einde',
    schoolYear: 'Groep 7 (einde)',
    wordCount: 113,
    goodMaxErrors: 3,
    goodMaxSeconds: 50,
    sufficientMaxErrors: 6,
    sufficientMaxSeconds: 70,
    // Meerdere betekenislagen, figuurlijk taalgebruik, uitdrukkingen, complexe redenaties.
    sampleText: `De manier waarop een samenleving omgaat met haar verleden zegt veel over haar zelfbeeld.
Sommige landen kiezen ervoor pijnlijke historische episodes breed uit te meten; andere houden ze angstvallig buiten beeld.
Nederland worstelt al decennia met zijn koloniale geschiedenis. De discussie erover laait steeds opnieuw op.
Wat betekent het om verantwoordelijkheid te erkennen zonder jezelf voortdurend in de beklaagdenbank te plaatsen?
Historicus Rietbergen betoogt dat eerlijkheid over het verleden geen zwakte is, maar een teken van volwassenheid.
'Een natie die haar fouten kan benoemen, is sterker dan een natie die ze verdoezelt.'
Tegelijkertijd waarschuwen anderen tegen een al te simplistische zwart-witverdeling van historische gebeurtenissen.
De werkelijkheid was genuanceerd, en dat vereist ook een genuanceerde herinnering.`,
  },
  {
    level: 'Plus',
    label: 'Plus - Boven Groep 8',
    schoolYear: 'Boven Groep 8',
    wordCount: 118,
    goodMaxErrors: 3,
    goodMaxSeconds: 40,
    sufficientMaxErrors: 6,
    sufficientMaxSeconds: 60,
    // Het hoogste leesniveau. Alle soorten teksten snel, vloeiend en met begrip hardop voorlezen.
    // Technische, wetenschappelijke of literaire teksten met abstracte en gespecialiseerde woordenschat.
    sampleText: `Neurowetenschappers maken gebruik van functionele MRI-scans om vast te stellen welke hersengebieden actief zijn tijdens specifieke cognitieve taken.
Het lijkt een objectieve methode, maar de interpretatie ervan is controversieel.
Een veelgehoorde kritiek betreft het zogenoemde 'omgekeerde inferentieprobleem': uit het feit dat hersengebied X actief is bij taak Y, volgt niet noodzakelijk dat X specifiek verantwoordelijk is voor Y.
Bovendien zijn de statistische methoden die vroeger werden gebruikt inmiddels deels achterhaald.
De zogenoemde replicatiecrisis raakte ook de cognitieve neurowetenschap: een aanzienlijk deel van klassieke bevindingen bleek niet reproduceerbaar.
Dit noopt tot methodologische bescheidenheid, maar ondermijnt de waarde van het vakgebied niet fundamenteel.
Nieuwe technieken, zoals single-cell recording en connectoomanalyse, bieden veelbelovende aanvullingen.
Het menselijk brein blijft vooralsnog het meest complexe systeem dat de wetenschap kent.`,
  },
];

export const AVI_LEVEL_ORDER: AviLevel[] = [
  'Start', 'M3', 'E3', 'M4', 'E4', 'M5', 'E5', 'M6', 'E6', 'M7', 'E7', 'Plus'
];

export function getAviConfig(level: AviLevel): AviLevelConfig {
  const config = AVI_LEVELS.find(l => l.level === level);
  if (!config) throw new Error(`Unknown AVI level: ${level}`);
  return config;
}

export function getNextLevel(level: AviLevel): AviLevel | null {
  const idx = AVI_LEVEL_ORDER.indexOf(level);
  if (idx === -1 || idx === AVI_LEVEL_ORDER.length - 1) return null;
  return AVI_LEVEL_ORDER[idx + 1];
}

export function getPreviousLevel(level: AviLevel): AviLevel | null {
  const idx = AVI_LEVEL_ORDER.indexOf(level);
  if (idx <= 0) return null;
  return AVI_LEVEL_ORDER[idx - 1];
}
