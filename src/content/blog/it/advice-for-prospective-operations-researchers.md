---
title: 'Consigli per futuri ricercatori operativi'
pubDate: 2026-09-04
---

Negli ultimi anni ho avuto l’occasione di partecipare a conferenze di ricerca operativa in qualità di Uomo Industria, ovvero affiliato al mio datore di lavoro anziché al mondo accademico.

L’Uomo Industria è un esemplare che suscita grande curiosità nei giovani ricercatori, interessati a scoprire in cosa consista l’applicazione della ricerca operativa in un contesto aziendale.

Mi è capitato diverse volte che degli studenti mi chiedessero dettagli sul mio lavoro e consigli per la loro carriera. Rispondo a queste domande dicendo le cose che direi, con il senno di poi, al me di qualche anno fa. Ho quindi pensato di scrivere le mie raccomandazioni per futuri ricercatori operativi[^1] in questo post, anche per mettere ordine tra le idee.

Cominciamo dai fondamentali. Dal mio punto di vista, il profilo ideale di un ricercatore operativo è quello di un computer scientist arricchito da conoscenze specifiche di ottimizzazione.[^2] Questo perché, nella pratica, il suo lavoro non consiste tanto nello sviluppare algoritmi, quanto nel progettare sistemi di supporto alle decisioni, il cui scopo ultimo è creare valore per chi li utilizza. L’algoritmo, per quanto fondamentale, è un componente di questo sistema.

I sistemi di supporto alle decisioni sono fondamentalmente sistemi di dati. Chiunque abbia lavorato con algoritmi di ottimizzazione può confermare che la bontà di una soluzione dipende in primo luogo dalla bontà dei dati in ingresso. Diventa quindi fondamentale saper lavorare con i dati, che spesso e volentieri non sono puliti né coerenti come le istanze di benchmark della letteratura.

In pratica, la quota di codice dedicata alla gestione dei dati è molto maggiore di quella dedicata al modello di ottimizzazione. I dati provengono di norma da sorgenti che non sono state progettate per essere integrate in un algoritmo di ottimizzazione: gestionali, fogli di calcolo, ecc. Questo lavoro, in apparenza da bassa manovalanza, è in realtà di grande valore. La reportistica sulla qualità dei dati è spesso uno dei primi risultati che gli utenti apprezzano, e talvolta porta alla luce problemi di processo che nessuno sapeva di avere.

Per quanto riguarda la componente di ottimizzazione, gli approcci basati su solver sono generalmente preferibili allo sviluppo di algoritmi ad hoc. Con “algoritmo ad hoc” intendo il caso in cui la strategia di ricerca la scriviamo noi (un’euristica costruttiva, una metaeuristica, un branch-and-price su misura, ecc.) anziché scrivere un modello e delegarne la risoluzione a un motore generico. Questo è un grande elemento di distacco rispetto al mondo accademico: in letteratura è comune trovare fior di articoli su algoritmi iper-specializzati per varianti esoteriche del VRP. Non che questi contributi non abbiano la loro ragion d’essere, ma le necessità dell’industria rendono questo tipo di approccio poco adatto.[^3]

I motivi per cui mi sbilancio nei confronti dei solver sono diversi: facilità nell’assorbire il cambiamento, separazione fra logica di ottimizzazione e logica di business e manutenibilità del software nel tempo.

I sistemi, per loro natura, tendono a evolvere e cambiare nel tempo: nuovi casi d’uso, nuovi requisiti, un maggior numero di utenti. Il cambiamento è fisiologico, e generalmente è un buon segno, in quanto significa che il nostro prodotto viene effettivamente utilizzato e può diventare ancora più completo. Talvolta significa invece che avevamo inteso male qualcosa. In entrambi i casi, saper gestire in modo appropriato il cambiamento crea valore, mentre il cambiamento gestito in maniera incontrollata diventa debito tecnico. È fondamentale infatti che il software che sviluppiamo non funzioni soltanto il giorno zero, ma che non deflagri in un miliardo di pezzi un venerdì sera qualsiasi.

Gli algoritmi ad hoc assorbono molto male i cambiamenti, in quanto un’evoluzione imprevista dei requisiti richiede spesso una riscrittura significativa dell’algoritmo. Inoltre, tendono a mescolare logica di ottimizzazione e logica del problema di business, che è esattamente ciò che rende la riscrittura un intervento rischioso. L’utilizzo di un solver agevola la separazione fra le due cose. Nel caso migliore, un requisito nuovo diventa qualche riga di modello in più anziché una revisione totale.

Ad oggi esistono numerosi solver open-source di altissima qualità (ad es. SCIP, HiGHS, CP-SAT) e altrettanti solver commerciali, qualora la potenza di fuoco non dovesse bastare. Il panorama non si esaurisce con i solver MILP e CP, ma include anche solver basati su metaeuristiche.

Lo sviluppo di un algoritmo ad hoc per uno specifico problema dovrebbe essere, a mio avviso, l’ultima spiaggia. Esistono, naturalmente, delle eccezioni. La più evidente è quella in cui l’algoritmo è il prodotto: se il vantaggio competitivo dell’azienda sono le prestazioni o le funzionalità del suo motore di ottimizzazione, allora conviene investire lì il proprio tempo. Altri casi tipici sono problemi la cui formulazione a modello semplicemente non è scalabile al di là di istanze piccolissime. Imbattersi in una di queste eccezioni non è un peccato mortale, ma raccomando di essere assolutamente certi che si tratti di una reale necessità del business, e non di un mero esercizio di stile.

Nello sviluppo di algoritmi ad hoc, raccomando di non cercare di essere eccessivamente creativi. Le probabilità che le nostre brillanti invenzioni battano metodologie ben rodate sono modeste, e quelle che il collega che erediterà il codice non capisca un tubo di cosa stia succedendo sono paurosamente alte. Conviene appoggiarsi a schemi noti e ben studiati, ad es. large neighborhood search, ruin-and-recreate, GRASP, tabu search, simulated annealing. Sono documentati, hanno un comportamento prevedibile, e chiunque abbia una formazione in ottimizzazione li riconosce a prima vista.

Come tutti sappiamo, il lavoro del ricercatore operativo consisterebbe nel ricevere una lista ben definita di requisiti funzionali e nell’implementare un modello o un algoritmo che risolva il relativo problema di ottimizzazione. Una volta che ci siamo svegliati da questo bellissimo sogno, ci rendiamo conto che quella lista non esiste, e che scriverla è parte del nostro lavoro. Estrarre un problema di ottimizzazione da un processo decisionale richiede un dialogo continuo con gli esperti di dominio: capire come funziona il processo, proiettarne una parte in un problema di ottimizzazione, sfrondare ciò che è ridondante. Talvolta un processo decisionale non esiste nemmeno, e il nostro lavoro ne richiede anche la progettazione.

Questo processo, da taluni definito “knowledge crunching”,[^4] è forse la componente più importante dell’intero progetto. Mi azzarderei a dire che, una volta definiti bene i requisiti, lo sviluppo di un modello o di un algoritmo è la parte del progetto più facile. Non che sia banale, ma è quella che sappiamo meglio governare, ed è per questo che conviene spostare le proprie energie sul knowledge crunching. Tuttavia, per essere massimamente efficaci in un ruolo di natura così relazionale, è necessario un sostrato granitico di competenze tecniche.

Concludo con una lista di consigli pratici, cercando di riassumere ciò che nel mio lavoro quotidiano mi torna utile saper fare.

- Saper maneggiare un solver. Ad esempio: diagnosticare un modello infeasible, interpretare un log di risoluzione, conoscere i parametri principali del solver anticipandone l’effetto sulla risoluzione, identificare i punti di debolezza di una formulazione.
- Saper iterare rapidamente. È fondamentale arrivare in fretta a una prima soluzione che rispetti i requisiti funzionali. Questo ci permette di raccogliere presto il feedback dell’utente finale. Una greedy scritta in un’ora generalmente vale più di due settimane spese a rifinire un modello.
- Saper spiegare una soluzione. Prima o poi qualcuno chiederà perché il veicolo 3 passa da quel cliente e non da quell’altro. Saper rispondere in maniera puntuale crea fiducia nello strumento.
- Essere familiare con sistemi Linux, Git e tecnologie di containerizzazione.
- Essere familiare con un database SQL. La mia raccomandazione è PostgreSQL, per via del suo insieme molto completo di funzionalità. Un libro che consiglio è [Just Use Postgres!](https://www.manning.com/books/just-use-postgres) di Denis Magda.
- Essere familiare con un linguaggio di alto livello. La scelta ovvia è Python, con le relative librerie di analisi dati (pandas, polars, ecc.), i bindings per tutti i solver più conosciuti e gli strumenti di sviluppo backend (FastAPI, ecc.).
- Essere familiare con un linguaggio di basso livello, per lo sviluppo di algoritmi ad hoc: C, C++, Rust, Zig, ecc. Questo perché nei computer moderni la disposizione dei dati in memoria ha un impatto significativo sulle prestazioni del codice, e i linguaggi di alto livello rendono difficile, se non impossibile, applicare determinate ottimizzazioni. Raccomando questa ottima presentazione di Andrew Kelley, “[Practical Data Oriented Design](https://www.youtube.com/watch?v=IroPQ150F6c)”, e le referenze citate.
- Essere familiare con i meccanismi moderni di rilascio e distribuzione del software in una delle grandi piattaforme (GitHub Actions, Bitbucket Pipelines, ecc.). Rilasciare una nuova versione del proprio algoritmo al bisogno è fondamentale per poter rispondere rapidamente alle segnalazioni dei clienti.
- Conoscere i fondamentali delle tecnologie web. Un minimo di HTML, CSS, JavaScript e un framework per l’interfaccia (personalmente mi trovo molto bene con [Svelte](https://svelte.dev)) permette di mettere insieme da soli una paginetta che disegni le soluzioni su una mappa o un grafico. Uno strumento del genere è impagabile in fase di sviluppo, perché l’occhio riconosce in due secondi anomalie che in una tabella non si vedono, ed è il modo più rapido per far capire ai clienti cosa stiamo costruendo.
- Conoscere i fondamentali del protocollo HTTP e saper sviluppare delle API REST.

Fatemi sapere se avete trovato questi consigli utili, se ho sbagliato qualcosa o se avete qualcosa da aggiungere.

[^1]: Non sono del tutto sicuro che “ricercatore operativo” sia una parola vera. Fra l’altro, non mi pare esista in industria un appellativo canonico per questo mestiere: ho visto operations research specialist, operations research scientist, operations research analyst, optimization engineer, e talvolta il variopinto data scientist. Alla fine ognuno sceglie il proprio, di solito quello che suona meglio su LinkedIn.

[^2]: Dico questo in maniera imparziale: la mia formazione è in ingegneria delle telecomunicazioni. Di fatto sto larpando da ricercatore operativo.

[^3]: Su questo, consiglio l’ottima presentazione di Rubén Ruiz dal titolo “[Pragmatic OR: solving large-scale optimization problems in fast-moving environments](https://www.youtube.com/watch?v=GIh6d3rb0_4)”.

[^4]: Il termine viene dal celebre [Domain-Driven Design](https://www.goodreads.com/en/book/show/179133.Domain_Driven_Design) di Eric Evans. Consiglio [Learning Domain-Driven Design](https://www.oreilly.com/library/view/learning-domain-driven-design/9781098100124/) di Vlad Khononov come introduzione al tema.
