const incities = require('./indiancities');


// for (let i = 0; i < 50;i++) {
//     const random1000 = Math.floor(Math.random() * 490)
//     console.log(`${incities[random1000].name_of_city}, ${incities[random1000].state_name}`)
// }

for (let i = 0; i < 50; i++) {
    console.log(incities[i].location)
    const index=incities[i].location.indexOf(',')
    console.log(incities[i].location.slice(0, index))
    console.log(incities[i].location.slice(index+1))
}