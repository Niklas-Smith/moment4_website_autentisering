### Backend-baserad webbutveckling <br> Moment4 Autentisering och säkerhet.<br> av: Niklas Smith <br>  student-id : nism2400 <br> Kurs: DT207G

Detta är frontend delen för mitt Moment4 Autentisering och säkerhet Backend-baserad webbutveckling 
Detta repositories innhåller:  
1. register.html har ett form man kan skapa ett konto.
2. long.html har ett form man kan logga in (måste har skapat ett konto).
3. indext.html min startsida med en lista på mina bilar.
4. cars.html  min dolda sida du måste vara inlogga(har token) för att se/använda. kan lägga till ny bil
5. checktoken.js   kolla om du har token (så du kan se cars.html sidan och lägga till bil)
6. style.css min css för hemsidan
7. mian.js   Här finns mina javascript för sidan med bland annat ändra vad du kan se om du har token eller inte (kan ej se cars sidan om du inte har)   
8. mian.js fortsat  login(som ger dig token), lägg til bil,srkiv ut alla bilar, se alla bilar och registera dig





mina tabeller för Sqlite3 databas:

| Tabel                    |      fält                                                                                                     |
|--------------------------|---------------------------------------------------------------------------------------------------------------|
| users_accunts            | id:INTEGER, username:VARCHAR(255) , password:VARCHAR(255) , DATETIME:CURRENT_TIMESTAMP                        |
| cars            | id:INTEGER, carbrand:VARCHAR(255) , carmodel:VARCHAR(255) , price:INTERGER, year:INTERGER , DATETIME:CURRENT_TIMESTAMP |





Hur man använder mitt api:

1. POST /api/register  register en användar. måste skicka med rätt information i object
2. POST /api/login  Logga in med ett register konto. måste skicka med rätt information i object (ditt konto).
3. POST /api/cars  lägg till ny bil. måste skicka med rätt information i object.
4. GET /api/cars hämter ut alla bilar som finns i tabellen cars


exempel på hur object kan se ut och ska har följade fält och uppbyggnad.

register/login:

{   

"username" : "niklas",  
"password" : "password"

} 

lägg till ny bil:

{  

"carbrand" : "toyta",   
"carmodel" : "jarris",   
"price" : 350000,  
"year" : 2024  

} 



