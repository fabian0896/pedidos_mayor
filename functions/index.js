const functions = require('firebase-functions');
const admin = require('firebase-admin');
var algoliasearch = require('algoliasearch');

admin.initializeApp();

const algoliaClient = algoliasearch('AKE68Y9274', 'f8604ef41d20eb78f752a3f55d935700')
const clientsIndex = algoliaClient.initIndex('clients') 
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/* const CLIENTS = '/clients'

exports.createClient = functions.firestore.document(`${CLIENTS}/{id}`)
    .onCreate((snapshot, context)=>{
        const actualClient = snapshot.data()
        return clientsIndex.addObject({
            name: actualClient.name,
            country: actualClient.country.translations.es || actualClient.country.name,
            seller: actualClient.seller,
            id: context.params.id
        })
        .then(reuslt =>{
            return snapshot.ref.update({algoliaId: reuslt.objectID})
        })
        .catch(err => {
            console.log(err)
        })
    })
 */
