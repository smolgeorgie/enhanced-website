// Importeer het npm pakket express uit de node_modules map
import express from 'express'
// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'
// Maak een nieuwe express app aan
const app = express()
// Stel ejs in als template engine
app.set('view engine', 'ejs')
// Stel de map met ejs templates in
app.set('views', './views')
// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))
// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }))
// Stel het basis endpoint in

const apiUrl = 'https://fdnd-agency.directus.app/items'
// Haal de gegevens op voor de sdg's, stakeholders, scores en bedrijven
const sdgData = await fetchJson(apiUrl + '/hf_sdgs')
const stakeholdersData = await fetchJson(apiUrl + '/hf_stakeholders')
const scoresData = await fetchJson(apiUrl + '/hf_scores')
const companiesData = await fetchJson(apiUrl + '/hf_companies')


console.log(scoresData.data)

let score = 0

// Stel de routes op voor alle pagina's, de routes die hier nu in zitten gelden alleen voor de sdg en score pagina!
app.get('/', function (request, response) {
    response.render('index', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
        score: score
    })
})

fetch('https://fdnd-agency.directus.app/items/hf_scores?fields=*,*.*,*.*.*&filter=%7B%22stakeholder_id%22:%221%22%7D')
.then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Assuming the data is an array of objects and each object has `score`, `sdg`, and `title` properties
    data.forEach(item => {
      console.log('Score:', item.score);
      console.log('SDG:', item.sdg);
      console.log('Title:', item.title);
    });
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
  console.log(item.score)

app.post('/', (req, res) => {
    if (req.body.up && score < 5) {
        score = score + 1;
    } else if (!req.body.up && score > -5) {
        score = score - 1;
    }
    res.redirect(303, ('/'));
});



// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8009)
// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})


// app.get('/', (request, response) => {
//     console.log('app.get function triggered successfully');
//     Promise.all([
//         fetchJson('https://fdnd-agency.directus.app/items/hf_scores'),
//         fetchJson('https://fdnd-agency.directus.app/items/hf_sdgs')
//     ]).then(([scoresData, sdgData]) => {
//         response.send('/', {
//             scores: scoresData.data,
//             sdgs: sdgData.data
//         });        
//     }).catch(error => {
//         console.log('error', error);
//         response.status(500).send('Er is iets misgegaan');
//     });
// });