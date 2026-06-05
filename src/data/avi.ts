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
    sampleTexts: [
      `Jan zit op de mat.
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
      `Kim heeft een pop.
De pop heet Lien.
Kim legt Lien in bed.
Ze dekt Lien toe.
De hond zit naast Kim.
Hij kijkt naar de pop.
Kim geeft de hond een bot.
De hond kwispelt blij.
Sam komt bij Kim.
Ze spelen met de pop.
Ze bouwen een hut van dozen.
Het is een mooie hut.
Kim en Sam lachen hard.`,
      `Tim zit op het dak.
Hij kijkt ver weg.
Een vlieg zoemt om hem heen.
Tim slaat de vlieg weg.
Dan ziet hij een mus.
De mus zit op een tak.
Tim blijft heel stil zitten.
De mus vliegt weg.
Tim klimt van het dak.
Hij rent naar de tuin.
Hij gooit zaad op de grond.
De mus komt terug.
Tim is erg blij.`,
    ],
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
    sampleTexts: [
      `Op de kast staat een lamp. De lamp geeft licht.
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
      `In het bos staat een grote boom. Onder de boom ligt een plank.
Op de plank zit een pad. De pad is bruin en glad.
Roos bukt en kijkt goed naar de pad.
De pad springt weg in het gras.
Roos staat op en loopt dieper het bos in.
Ze hoort een specht die klopt op een stam.
Dan ziet ze een nest hoog in de tak.
Er zitten drie jonge vogels in.
Ze piepen hard om eten.
Roos staat stil en kijkt omhoog.
De moedervogel vliegt aan met een worm.
Roos glimlacht en loopt stil verder.`,
      `Bij de vijver zit Lars op de kant. Hij heeft een hengel bij zich.
Het water is stil. De zon schijnt op de vijver.
Lars gooit zijn hengel ver het water in.
Hij wacht lang. Er bijt niets aan.
Dan trekt het dun draadje strak.
Lars trekt rustig aan de hengel.
Een kleine vis komt boven water.
Lars pakt de vis voorzichtig vast.
Hij bekijkt hem goed en gooit hem terug.
De vis schiet weg in het diep.
Lars pakt zijn brood en eet het op.
Dan gooit hij zijn hengel opnieuw uit.`,
    ],
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
    sampleTexts: [
      `Op een koude ochtend stond Lisa vroeg op.
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
      `In de herfst gingen Noor en haar vader het bos in.
De bomen hadden prachtige rode en gele bladeren.
'Kijk eens hoeveel eikel er liggen!' riep Noor.
Ze raapte er een stuk of tien op en stopte ze in haar zak.
Haar vader wees naar een eekhoorn die vlug de boom in klom.
'Ziet hij ons?' fluisterde Noor.
De eekhoorn bleef stilzitten en staarde naar beneden.
Noor bewoog niet. Ze hield haar adem in.
Na een tijdje sprong het dier weer weg.
Thuis maakten ze een knutselwerkje van de eikel en blaadjes.
Dat werkje hing daarna lang aan de muur.`,
      `Elke zaterdag fietste Daan met zijn oom naar de markt.
De markt was groot en druk en rook naar vers brood.
'Mag ik een stroopwafel?' vroeg Daan.
Zijn oom lachte en kocht er twee.
Ze liepen langs de groentekraam en de bloemenstal.
Daan vond de vissen het mooist: ze zwommen rustig in hun bakken.
'Waarom kopen we nooit een vis?' vroeg hij.
'Jij moet er wel voor zorgen,' zei zijn oom.
Daan dacht na. Elke dag voeren, dat leek hem wel wat.
Op de terugweg vertelde zijn oom hoe hij vroeger ook vissen had.
Daan besloot het thuis te vragen aan zijn moeder.`,
    ],
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
    sampleTexts: [
      `Sander had gisteren een verrekijker gekregen voor zijn verjaardag.
Vandaag nam hij hem voor het eerst mee naar buiten.
Hij liep naar het weiland achter zijn huis en keek omhoog.
In de verte vloog een grote vogel langzaam richting het bos.
Door de verrekijker zag Sander duidelijk de bruine vleugels en de gebogen snavel.
'Dat is een buizerd!' riep hij blij.
Hij had er al zo lang eentje willen zien.
Zijn vader had hem geleerd hoe je roofvogels kunt herkennen.
Nu had Sander het eindelijk zelf gedaan.
Wat een geweldig gevoel! Hij besloot hier elke dag langs te lopen.`,
      `Fenna ontdekte achter het schuurtje een verlaten konijnenhok.
De planken waren verrot en het hekje hing scheef.
'Mogen we het opknappen?' vroeg ze aan haar vader.
Hij keek bedenkelijk, maar zei uiteindelijk: 'Als jij het belooft te onderhouden.'
Fenna was vastbesloten en begon meteen met schoonmaken.
Ze verving de beschadigde planken en schilderde het hok lichtgroen.
Haar broer hielp haar het hekje repareren en stevig vastmaken.
Na een week was het hok helemaal vernieuwd.
Een paar dagen later brachten ze er twee jonge konijnen in.
Fenna voerde ze elke ochtend trouw en gaf ze water.
Het was de beste beslissing die ze ooit had genomen!`,
      `Op de camping stond een groot avontuurlijk klimrek.
Joris klom er elke dag op en bedacht er nieuwe uitdagingen.
Vandaag wilde hij als eerste het touw bereiken dat hoog bovenaan hing.
Hij begon voorzichtig maar besluitvaardig met klimmen.
Halverwege gleed zijn voet weg en hij greep zich stevig vast.
Even wachten, dan verder. Dat had zijn juf hem geleerd.
Bij iedere beweging voelde hij hoe zijn armen sterker werden.
Eindelijk, na veel inspanning, pakte hij het touw beet.
'Gelukt!' schreeuwde hij zo hard hij kon.
Beneden klapten zijn ouders trots in hun handen.
Vanavond zou hij dit verhaal zeker navertellen!`,
    ],
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
    sampleTexts: [
      `Emma wilde al jarenlang leren zwemmen. Eindelijk had ze haar zwemdiploma gehaald.
Toch bleef haar grootste wens een rugcrawl-diploma. Dat was veel moeilijker.
Haar zwemlerares mevrouw Jansen zei dat ze er klaar voor was.
Op de dag van het examen was Emma zenuwachtig.
Ze deed haar zwembril op en klom op het startblok.
Bij het startsignaal dook ze in het koude water.
Ze zwom met krachtige slagen naar het andere eind van het bad.
Bij de laatste baan had ze nog genoeg energie voor een snelle finish.
'Geslaagd!' riep mevrouw Jansen.
Emma glimlachte breed van trots en geluk.`,
      `Luuk was al weken bezig met zijn schooltoneelstuk over uitvindingen.
Hij had de rol van uitvinder gekregen en moest een spreekbeurt houden over elektriciteit.
Thuis las hij alles over bliksemafleiders en stroomgeleiders.
Zijn moeder hielp hem een eenvoudige proefopstelling te bouwen van een batterij en een lampje.
Op de dag van de uitvoering stond Luuk zenuwachtig achter de coulissen.
Toen het zijn beurt was, stapte hij rustig het podium op.
Hij sprak duidelijk en liet zijn proef zien aan het publiek.
Het lampje ging aan en iedereen in de zaal klapte.
De meester noemde zijn presentatie de beste van de dag.
Luuk voelde een warm gevoel van trots in zijn borst.`,
      `De schoolreisdag was eindelijk aangebroken. De klas ging naar een boerderijmuseum.
Bij aankomst werden ze begroet door een gids in ouderwetse klederdracht.
Ze zagen hoe vroeger boter werd gemaakt in een grote houten karn.
Nadia mocht zelf aan de hendel draaien en voelde hoe zwaar het was.
Na een halfuur was er echte boter, en die mochten ze proeven op brood.
In de middag kregen ze les over het zaaien en oogsten van graan.
Buiten mochten ze zelf een stuk akker omspitten met een oude schop.
Het was veel harder werken dan ze hadden verwacht.
'Zo deden boeren dit elke dag,' zei de gids ernstig.
Op de terugweg was iedereen stil en moe, maar ook tevreden.`,
    ],
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
    sampleTexts: [
      `Vorig jaar deed onze klas mee aan een bijzonder project over duurzaamheid.
We moesten uitzoeken hoeveel energie ons gezin per week verbruikt.
Ik had verwacht dat dit ingewikkeld zou zijn, maar het viel mee.
Met een speciale meter konden we het stroomverbruik van elk apparaat meten.
Onze computer bleek de grootste verbruiker, gevolgd door de wasmachine.
We schreven alles op en maakten een grafiek van onze bevindingen.
Op de presentatiemiddag lieten we de klas onze resultaten zien.
Veel klasgenoten waren verrast door de uitkomsten. Zelfs onze meester keek verbaasd.
We besloten als groep enkele gewoonten te veranderen om energie te besparen.
Sindsdien zetten we apparaten echt uit in plaats van op stand-by.`,
      `Onze buurt heeft een bijzonder project gestart om de straat groener te maken.
Bewoners konden zich aanmelden om een boomspiegeltje voor hun deur te onderhouden.
Ik had niet verwacht dat zo veel mensen mee zouden doen, maar het liep storm.
Samen met mijn buurvrouw heb ik een klein tuintje aangelegd met kruiden en wilde bloemen.
Bijen en vlinders kwamen al snel op de bloemen af, wat erg bemoedigend was.
De gemeente leverde gratis zakken compost en gereedschap.
Op een zaterdag werkten alle vrijwilligers gelijktijdig in de straat, dat zag er geweldig uit.
Een journalist maakte foto's voor de lokale krant.
Het project liet zien dat kleine acties samen een groot verschil kunnen maken.
Wij zijn van plan er volgend jaar mee door te gaan.`,
      `Tijdens de kermis stond er dit jaar een bijzondere attractie: een vluchtsimulator.
In een kleine cabine kon je ervaren hoe het voelt om te vliegen als een vogel.
De computer berekende nauwkeurig welke bewegingen en geluiden daarbij hoorden.
Ik had niet verwacht dat het zo realistisch zou zijn als ik instapte.
Mijn maag draaide om bij elke bocht, al zat ik gewoon stil in de stoel.
Na afloop vertelde de eigenaar hoe piloten soortgelijke simulatoren gebruiken om te oefenen.
Ze trainen daarin voor bijzondere situaties die je in een echt vliegtuig niet zomaar kunt oefenen.
Dat vond ik een verrassende en ingewikkelde gedachte.
Technologie die eruit ziet als een spel, heeft soms een heel serieus doel.`,
    ],
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
    sampleTexts: [
      `Op het strand van Zeeland ontdekte Maya iets vreemds tussen de rotsen.
Het was een klein, transparant wezentje dat langzaam bewoog in het ondiepe water.
Ze knielde neer en bekeek het nauwkeurig. Het leek wel een soort kwal.
'Raak het niet aan!' riep haar vader vanuit de verte. 'Die kunnen prikken!'
Maya trok snel haar hand terug en pakte haar notitieboekje.
Thuis zocht ze op internet naar soortgelijke wezens en vond na lang zoeken het antwoord.
Het bleek een blauwe kwal te zijn, een zeldzame soort die normaal in warm water leeft.
Hoe was die hier terechtgekomen? Misschien door de veranderende temperatuur van het zeewater.
Ze schreef een verslag en stuurde het op naar een biologievereniging.`,
      `In de schoolbibliotheek stuitte Ravi op een boek over geneeskrachtige planten.
Hij had eigenlijk iets over ruimtevaart gezocht, maar de kleurrijke illustraties trokken zijn aandacht.
Het bleek dat veel gewone tuinplanten al eeuwenlang worden gebruikt als medicijn.
Lavendel schijnt te helpen bij slapeloosheid, en brandnetel bij gewrichtspijn, zo stond er.
Ravi vond het fascinerend dat iets wat je in je eigen tuin vindt zulke transparante werkingen kan hebben.
Thuis vroeg hij zijn oma of zij dit wist; zij knikte en vertelde over haar eigen kruidentuin.
Ze liet hem zien hoe je muntblaadjes droogt voor thee die je maag tot rust brengt.
Daarna begon Ravi systematisch te noteren welke plant waarvoor werd gebruikt.
Hij wilde later misschien iets met biologie doen, dat gevoel werd die middag sterker.`,
      `Tijdens een documentaire over poolgebieden zag Lotte hoe snel het ijs smelt.
De beelden lieten zien hoe ijsberen steeds langere afstanden moesten zwemmen om voedsel te vinden.
Dat raakte haar dieper dan ze had verwacht, en ze besloot actie te ondernemen.
Ze zocht op internet naar organisaties die zich bezighouden met klimaatonderzoek en poolexpedities.
Tot haar verbazing ontdekte ze dat Nederland actief bijdraagt aan internationaal poolonderzoek.
Wetenschappers nemen hier regelmatig kernboringen, waarbij transparante ijslagen informatie geven over eeuwen oud klimaat.
Lotte schreef een brief aan zo'n onderzoeker en vroeg of ze meer mocht leren.
Een week later kreeg ze een uitgebreide reactie met foto's van de expeditie.
Die brief bewaarde ze zorgvuldig; het was het begin van een grote passie.`,
    ],
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
    sampleTexts: [
      `Mevrouw De Groot was de strengste lerares van de school, dat wist iedereen.
Ze verwachtte stilte in de klas en keek met scherpe ogen toe als leerlingen afleidden.
Toch was ze ook de docent die de meeste leerlingen nooit zouden vergeten.
'Je leert hier niet alleen spelling en rekenen,' zei ze regelmatig.
'Je leert nadenken. En dat is veel belangrijker.'
Op de laatste schooldag gaf ze elke leerling een klein briefje met een persoonlijke boodschap.
Daan bewaarde zijn briefje jarenlang. Er stond op: 'Jij stelt de juiste vragen. Dat is een gave.'
Die woorden bleven hem zijn hele leven bij.
Pas veel later begreep hij hoe groot haar invloed op hem was geweest.`,
      `Het stadsmuseum organiseert elk jaar een tentoonstelling over de lokale geschiedenis.
Dit jaar stond de wederopbouw na de Tweede Wereldoorlog centraal.
Aan de muur hingen zwart-witfoto's van straten die nu niet meer bestaan.
'Herken je iets?' fluisterde Noa tegen haar oma, die naast haar stond.
Haar oma wees naar een bakkerij op een oude foto. 'Daar woonde mijn moeder als kind.'
Het was een merkwaardig gevoel om te beseffen hoe dicht het verleden soms bij is.
De tentoonstellingsgids legde uit hoe burgers na de oorlog met weinig middelen nieuwe buurten bouwden.
Solidariteit speelde daarin een cruciale rol, zei hij.
Noa dacht na over wat dat woord eigenlijk betekende en of het nu nog zo werkt.
Ze verliet het museum met meer vragen dan antwoorden, en dat voelde juist goed.`,
      `In de krant las vader een artikel over taalverlies onder migrantengemeenschappen.
'Soms geeft een generatie de moedertaal gewoon niet meer door,' zei hij peinzend.
'Waarom doen mensen dat?' vroeg Amira.
Haar vader zuchtte. 'Soms willen ze erbij horen. Een andere taal spreken maakt dat soms makkelijker.'
Amira vond dat een verdrietige gedachte. Thuis spraken zij altijd een mengeling van twee talen.
Haar oma belde elke zondag en dan klonk de andere taal vanzelf.
Taal was voor haar niet alleen communicatie, maar ook een band met mensen die ver weg waren.
'Ik wil onze taal nooit vergeten,' zei ze beslist.
Haar vader keek haar even aan en knikte langzaam. 'Goed zo,' zei hij zacht.`,
    ],
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
    sampleTexts: [
      `In het debat over sociale media en jongeren worden regelmatig tegenstrijdige argumenten naar voren gebracht.
Voorstanders wijzen op de mogelijkheden om met vrienden in contact te blijven en informatie te delen.
Critici benadrukken de risico's: vergelijkingsdrang, cyberpesten en verslavend gedrag.
Wetenschappelijk onderzoek laat een gemengd beeld zien.
Gebruik op zich is niet schadelijk, maar de manier waarop telt.
Jongeren die sociale media actief en doelgericht gebruiken, lijken minder last te hebben van negatieve effecten.
Maar wie eindeloos scrollt zonder doel, meldt vaker gevoelens van leegte en ontevredenheid.
Scholen spelen een steeds grotere rol in het bijbrengen van digitale vaardigheden.
Leerlingen leren niet alleen hoe ze media gebruiken, maar ook hoe ze er kritisch mee omgaan.`,
      `Voedselverspilling is een onderwerp dat steeds vaker op de politieke agenda verschijnt.
In Nederland gooit de gemiddelde consument jaarlijks tientallen kilo's voedsel weg, ook al is het nog goed.
Dat heeft niet alleen economische gevolgen, maar ook een forse milieu-impact: de productie van voedsel vergt enorm veel water, energie en grond.
Verschillende gemeenten experimenteren nu met lokale voedselbanknetwerken en apps waarmee buren overtollig eten kunnen uitwisselen.
'Het gaat niet alleen om minder weggooien,' zegt initiatiefnemer Vera Blom, 'maar ook om bewuster kopen.'
Critici stellen dat structurele verandering alleen mogelijk is als supermarkten hun te-goed-voor-weggooibeleid aanscherpen.
De discussie raakt aan bredere vragen over consumptiecultuur en verantwoordelijkheid: wie is er nu eigenlijk aan zet?`,
      `Steeds meer steden heroverwegen de inrichting van hun straten in het licht van de klimaatverandering.
Asfalt en stenen absorbeert warmte, waardoor steden in de zomer aanzienlijk warmer zijn dan het omliggende platteland.
Dit zogeheten hitte-eilandeffect treft kwetsbare groepen zoals ouderen en jonge kinderen het hardst.
'We moeten ruimte teruggeven aan natuur,' zegt stedenbouwkundige Karin Smit.
Haar gemeente plant daarom bomen langs elke nieuwe straat en vervangt parkeerplaatsen door grasperken.
Niet iedereen is enthousiast: winkeliers vrezen minder klanten als de auto minder welkom is.
Toch wijzen cijfers uit andere Europese steden uit dat groene straten eerder meer dan minder bezoekers trekken.
De uitdaging ligt in het verbinden van ecologische, economische en sociale belangen tot een samenhangend plan.`,
    ],
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
    sampleTexts: [
      `Het fenomeen van de zogeheten 'stille ontslagname' is de laatste jaren sterk in opkomst.
Daarmee wordt bedoeld dat medewerkers niet letterlijk vertrekken, maar zich geleidelijk terugtrekken uit hun werk.
Ze doen nog precies wat van hen verwacht wordt, maar niet meer dan dat.
Experts spreken van een symptoom van een diepere malaise op de arbeidsmarkt.
Veel werknemers voelen zich niet langer gezien of gewaardeerd door hun werkgever.
Ze hebben het gevoel dat ze slechts een radertje zijn in een grote machine.
Organisatiepsychologen wijzen op het belang van zingeving en autonomie in het werk.
'Mensen willen ergens voor staan,' zegt onderzoeker Van Dijk. 'Als dat ontbreekt, haken ze innerlijk af.'
Bedrijven die dit negeren, zien op den duur hun productiviteit en innovatiekracht teruglopen.`,
      `Kunstmatige intelligentie vindt steeds sneller zijn weg naar domeinen die lange tijd als exclusief menselijk golden.
Algoritmen componeren muziek, schrijven journalistieke artikelen en genereren fotorealistisch beeldmateriaal.
Critici waarschuwen dat deze ontwikkelingen de creatieve industrie fundamenteel destabiliseren en banen overbodig maken.
Voorstanders stellen daar tegenover dat technologie altijd nieuwe mogelijkheden heeft gecreëerd naast de banen die zij verdreef.
Filosofen worstelen met een diepgaandere vraag: als een algoritme een gedicht schrijft dat niemand van een menselijk werk kan onderscheiden, wat zegt dat dan over creativiteit zelf?
Is originaliteit een kwestie van herkomst, of uitsluitend van effect?
'We staan voor een culturele identiteitscrisis,' zegt mediawetenschapper Voss, 'en die kunnen we niet oplossen door de stekker eruit te trekken.'`,
      `De discussie over grensoverschrijdend gedrag in de cultuursector heeft de afgelopen jaren een stormachtige ontwikkeling doorgemaakt.
Wat eerder werd afgedaan als persoonlijke frictie of artistieke vrijheid, wordt nu steeds vaker benoemd als structurele machtsmisbruik.
Slachtoffers die eerder zweeg, spraken zich uit; instellingen die wegkeken, werden ter verantwoording geroepen.
Toch lopen de meningen over de gepaste reactie uiteen.
Sommigen pleiten voor zero-tolerance en het onmiddellijk terugdraaien van eerbewijzen aan veroordeelde kunstenaars.
Anderen waarschuwen dat dit een gevaarlijk precedent schept en vragen zich af of kunst los kan worden gezien van de maker.
'Morele verontwaardiging is begrijpelijk,' schrijft cultuurcriticus Leemans, 'maar maakt een genuanceerd oordeel niet overbodig.'`,
    ],
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
    sampleTexts: [
      `De manier waarop een samenleving omgaat met haar verleden zegt veel over haar zelfbeeld.
Sommige landen kiezen ervoor pijnlijke historische episodes breed uit te meten; andere houden ze angstvallig buiten beeld.
Nederland worstelt al decennia met zijn koloniale geschiedenis. De discussie erover laait steeds opnieuw op.
Wat betekent het om verantwoordelijkheid te erkennen zonder jezelf voortdurend in de beklaagdenbank te plaatsen?
Historicus Rietbergen betoogt dat eerlijkheid over het verleden geen zwakte is, maar een teken van volwassenheid.
'Een natie die haar fouten kan benoemen, is sterker dan een natie die ze verdoezelt.'
Tegelijkertijd waarschuwen anderen tegen een al te simplistische zwart-witverdeling van historische gebeurtenissen.
De werkelijkheid was genuanceerd, en dat vereist ook een genuanceerde herinnering.`,
      `Vrijheid van meningsuiting geldt in democratieën als een van de meest fundamentele rechten.
Tegelijkertijd is zij niet absoluut: aanzetten tot haat, laster en het openlijk oproepen tot geweld vallen buiten haar bescherming.
Waar precies die grens ligt, is voortdurend onderwerp van juridisch en politiek debat.
De opkomst van sociale media heeft dit vraagstuk verscherpt: platforms functioneren als een niemandsland tussen publieke ruimte en privédomein, met eigen spelregels die lang niet altijd transparant zijn.
Sommige rechtsgeleerden bepleiten dat digitale platformen dezelfde grondwettelijke verplichtingen zouden moeten dragen als overheden.
Anderen waarschuwen dat dit de weg plaveit naar staatscensuur vermomd als consumentenbescherming.
Het antwoord vergt een zorgvuldige afweging van waarden die allemaal legitiem zijn, maar niet altijd vreedzaam naast elkaar bestaan.`,
      `Voeding en gezondheid zijn onderwerpen waarover de publieke opinie in razend tempo verandert.
Wat gisteren als gezond gold, wordt vandaag betwijfeld; wat vroeger als schadelijk werd bestempeld, krijgt opeens een genuanceerder oordeel.
Die wisselvalligheid ondermijnt het vertrouwen in wetenschappelijke aanbevelingen, en dat is begrijpelijk maar gevaarlijk.
Wetenschapsjournalist Petra Vos legt uit dat de meeste studies naar voeding observationeel zijn: ze laten correlaties zien, geen oorzakelijke verbanden.
'Als je een studie ziet over rode wijn en hartgezondheid, vraag je dan altijd af wie er betaalt,' schrijft ze droogjes.
Het werkelijke probleem is dat mensen zekerheid zoeken waar die nauwelijks te geven is.
Gezonde scepsis is hier op zijn plaats, maar mag niet ontaarden in een cynisch wantrouwen jegens alle wetenschap.`,
    ],
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
    sampleTexts: [
      `Neurowetenschappers maken gebruik van functionele MRI-scans om vast te stellen welke hersengebieden actief zijn tijdens specifieke cognitieve taken.
Het lijkt een objectieve methode, maar de interpretatie ervan is controversieel.
Een veelgehoorde kritiek betreft het zogenoemde 'omgekeerde inferentieprobleem': uit het feit dat hersengebied X actief is bij taak Y, volgt niet noodzakelijk dat X specifiek verantwoordelijk is voor Y.
Bovendien zijn de statistische methoden die vroeger werden gebruikt inmiddels deels achterhaald.
De zogenoemde replicatiecrisis raakte ook de cognitieve neurowetenschap: een aanzienlijk deel van klassieke bevindingen bleek niet reproduceerbaar.
Dit noopt tot methodologische bescheidenheid, maar ondermijnt de waarde van het vakgebied niet fundamenteel.
Nieuwe technieken, zoals single-cell recording en connectoomanalyse, bieden veelbelovende aanvullingen.
Het menselijk brein blijft vooralsnog het meest complexe systeem dat de wetenschap kent.`,
      `Kwantumverstrengeling is een van de meest contra-intuïtieve fenomenen uit de moderne fysica.
Wanneer twee deeltjes verstrengeld raken, bestaat er een correlatie tussen hun eigenschappen die niet verklaard kan worden door klassieke causaliteit.
Einstein noemde het spottend 'spookachtige werking op afstand' en meende dat de theorie incompleet moest zijn.
De experimenten van Alain Aspect in de jaren tachtig toonden echter aan dat de kwantummechanica correct is en lokaal realisme onjuist.
Dit impliceert dat de werkelijkheid op subatomair niveau fundamenteel verschilt van onze macroscopische intuïties.
Praktische toepassingen, zoals kwantumcryptografie en kwantumcomputing, maken gebruik van deze eigenschappen zonder dat er sprake is van informatieoverdracht sneller dan licht.
Het conceptuele onbehagen dat verstrengeling oproept, illustreert de grenzen van menselijk begrip bij het doorgronden van de diepste lagen van de natuur.`,
      `De filosofie van de taal onderzoekt hoe woorden betekenis krijgen en hoe taal ons denken vormgeeft.
Ludwig Wittgenstein betoogde in zijn vroege werk dat taal de wereld afbeeldt als een logische structuur, maar herzag deze positie later radicaal.
In zijn Filosofische Onderzoekingen stelt hij dat de betekenis van een woord ligt in het gebruik ervan binnen een specifieke 'taalspel': een sociaal ingebedde praktijk met eigen regels en conventies.
Dit heeft verstrekkende consequenties: begrijpen is dan geen mentale staat maar een vaardigheid die wordt aangeleerd in interactie met anderen.
Critici wijzen erop dat deze visie moeilijk ruimte biedt voor conceptuele vernieuwing; hoe kan een taalspel zijn eigen grenzen overschrijden?
Toch blijft Wittgensteins inzicht dat taal niet transparant verwijst naar een taalvrije werkelijkheid, een van de meest productieve ideeën in de twintigste-eeuwse filosofie.`,
    ],
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
