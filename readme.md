# Project Title

A basic Scraper in NodeJS

## Instalare

Pull proiect de pe github. 

```
npm install
```
```
npm scraping.js
```

## Rulare teste

Un fisier csv cu un header "Domain" si numele site-urilor sub forma basic URL fata http://

## Tech stack

Ruleaza pe Node.JS cu diferite module de npm care faciliteaza scraping-ul si are o cautare in adancime de baza pentru URL-uri de website-uri. Dureaza aproximativ 6 minute pentru a cauta pe 200 domenii numere de telefon, respectiv email.

Viteza poate fi imbunatatita prin crawling a unor URL-uri specifice. Se poate identifica daca tipul de path include anumite cuvinte cheie (contact, email) si doar acestea vor fi crawlate mai departe.

De asemenea, in ceea ce priveste codul in sine, Node.JS este single-threaded si se bazeaza foarte mult pe promise-uri si mesaje asincrone. Totusi pentru eficientizarea procesului, se poate crea un un Node.JS pool folosind worker_threads Module si o abordare in care este creat un worker thread si un event listener pentru message event. Cand este executat message event, worker thread executa codul si trimite raspunsul la thread-ul parinte. Worker thread ramane in viata.

In ceea ce priveste arhitectura aplicatiei per total, un bottleneck important este dat de conexiunea HTTP si viteza cu care datele sunt accesate efectiv. Daca procesul urmeaza flow-ul in care un site este accesat folosind un URL si la fiecare derivat al acestui este realizat un scrape, iar mai apoi procesat pentru a fi gasite datele necesare, timpul de procesare total va fi semnificativ afectat.

Astfel ca o metoda mai buna este rularea unui proces de Node care colecteaza paginile fiecarui website si observat daca exista ori un bottleneck pe CPU (iar atunci va fi nevoie sa fie rulat un cluster de Node.js care sa imparta load-ul), ori exista posibilitatea sa existe un bottleneck de retea.

Cu datele salvate in baza de date, acestea pot fi procesate in functie de continut si indexate in functie de numarul de cuvinte cheie gasite. Pot exista imbunatitiri si aici prin adaugarea unui Redis Cache pentru accesul la date mai facil.

## Opinia mea despre site

Din punct de vedere tehnic inca nu as putea sa ma pronunt, nu am vazut cum functioneaza, care e arhitectura, cat de eficienta este. Imi place ca vad o cantitate de date semnificativa pe site, in acelasi timp aspectul pe care as vrea sa il mentionez este cantitatea si calitatea informatiei oferite.

Comparatia pe care o fac este cu SimilarTech care ofera mai mult sau mai putin acelasi produs, dar ambalat putin diferit. Ofera mai multe informatii despre companie, despre site (numarul de vizite, tipul de vizite), dar si tehnologiile utilizate pe website. De la Video Ads, la tag-urile utilizate pentru ads, hosting-ul utilizat si tipul de engine (daca este cazul).

Totusi aspectul pe care nu l-am vazut tratat nicaieri inca este cel dat de o indexare, adica de relevanta recomandarilor in contextul cautarii. Cred ca ar fi mult mai usor daca o companie de Digital Marketing care are nevoie de clienti si primeste o lista de 1000 de companii de exemplu, ar avea primele rezultate cele care sunt relevante pentru ei in functie de cautarea realizata. Cum sa fie realizata aceasta cautare si indexare, well, Google knows. :)
