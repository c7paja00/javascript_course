'use strict';

// https://restcountries.com/v2/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} million people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name
    }</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name
    }</p>
              </div>
            </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
/*
///////////////////////////////////////

// Our first AJAX call: XMLHttpRequest ////////////////////////////////////////////

const getCountryData = function (country) {
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  //console.log(request.responseText); // ei toimi koska data ei ole vielä tullut takaisin

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} million people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('finland');
getCountryData('portugal');
getCountryData('usa');

*/
// Welcome to Callback Hell //////////////////////////////////////////////////////

/*
const getCountryDataAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  //console.log(request.responseText);const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity=1;
} // ei toimi koska data ei ole vielä tullut takaisin

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryDataAndNeighbour('finland');

// Callback Hell, eli callbackeja yksi toisensa perään
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);


// Promises and Fetch API //////////////////////////////////////////////////

// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

// const request = fetch(`https://restcountries.com/v2/name/portugal`);
// console.log(request);

// consuming Promises //////////////////////////////////////////////////////////

// const getCountryData = function (country) {
//   const request = fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       // Country 2
//       //   fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
//       //     .then(response => response.json())
//       //     .then(data => renderCountry(data, 'neighbour'));
//       // Toimii myös ylemmällä ilman returnia mutta sillä päästään taas callback helliin, jota pyritään välttämään

//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       //console.log('neighbour: ' + response);
//       return response.json();
//     }) // tapahtuu promisen toteuduttua
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       // tapahtuu jos promise ei toteudu
//       console.error(`${err}`);
//       renderError(`Something went wrong... ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     }); // tapahtuu huolimatta promisen tilasta
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('asdfae');

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      console.log(data);
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found');

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })

    //.then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      // tapahtuu jos promise ei toteudu
      console.error(`${err}`);
      renderError(`Something went wrong... ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    }); // tapahtuu huolimatta promisen tilasta
};

btn.addEventListener('click', function () {
  getCountryData('australia');
});

// getCountryData('portugal');

// Coding challenge 1 /////////////////////////////////////////////////////////

const whereAmI = function (lat, lon) {
  let country;
  fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`)
    .then(response => {
      if (!response.ok) throw new Error('Problem with geocoding');
      return response.json();
    })
    .then(data => {
      console.log(data.country);
      console.log(`You are in ${data.city}, ${data.country}`);
      country = data.country;
    })
    .catch(err => {
      console.error(`Error: ${err.message}`);
    })
    .finally(() => {
      console.log(country);
      getCountryData(country);
    });

  //getCountryData(country);
};
//'https://geocode.xyz/52.508,13.381?geoit=xml'

//whereAmI(52.508, 13.381);
//whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);


// The event  loop in practice ////////////////////////////////////////////

console.log('Test start'); // ekaksi
setTimeout(() => console.log('0 sec timer'), 0); // vikaksi
Promise.resolve('Resolved promise 1').then(res => console.log(res)); // kolmanneksi

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 10000; i++) {}
  console.log(res);
});

console.log('Test end'); // tokaksi


// Building a simple promise //////////////////////////////////////////////

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening ');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN!!!'); // luodaan data, jonka promise tuottaa onnistumisen myötä
    } else {
      reject(new Error('You lost your money!')); // luodaan data, jonka promise tuottaa epäonnistumisen myötä
    }
  }, 2000);
});
// .then suorittaa onnistumisen, .catch epäonnistumisen
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('abc')).catch(x => console.error(x));


// Promisifying the geolocation API

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject()
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
//getPosition().then(pos => console.log(pos.coords.latitude));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lon } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`);
    })

    .then(response => {
      if (!response.ok) throw new Error('Problem with geocoding');
      return response.json();
    })
    .then(data => {
      console.log(data.country);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`Error: ${err.message}`);
    });
};

btn.addEventListener('click', whereAmI);


// Coding challenge 2 ///////////////////////////////////////////////////////
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imagesContainer = document.querySelector('.images');
const btnCountry = document.querySelector('.btn-country');
btnCountry.style.opacity = 0;
let currImg;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const newImage = document.createElement('img');
    newImage.src = imgPath;

    newImage.addEventListener('load', function () {
      imagesContainer.append(newImage);
      resolve(newImage);
    });
    newImage.addEventListener('error', function () {
      reject(new Error('Image failed to load'));
    });
  });
};

createImage('img/img-1.jpg')
  .then(img => {
    console.log('img1');
    currImg = img;
    return wait(2);
  })

  .then(() => {
    currImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currImg = img;
    console.log('img2');
    return wait(2);
  })
  .then(() => {
    currImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currImg = img;
    console.log('img3');
    return wait(2);
  })
  .then(() => {
    currImg.style.display = 'none';
  })
  .catch(err => console.error(err));


// Consuming promises with Async/Await /////////////////////////////

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {// Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lon } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data')
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);
    if (!resGeo.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    renderError(`! ${err.message}`)

    // Reject promise returned from async function
    throw err;
  }
}

console.log('1: Will get location');
// const city = whereAmI();
// console.log(city)
// whereAmI()

//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} !!!!!`))
//   .finally(() => console.log('3: Finished getting location'));


(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`)
  } catch (err) {
    renderError(`!! ${err.message} !!`);
  }
  console.log('3: Finished getting location')
})();



// Running promises in parallel

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`), 
      getJSON(`https://restcountries.com/v2/name/${c2}`), 
      getJSON(`https://restcountries.com/v2/name/${c3}`)]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
}

get3Countries('portugal', 'canada', 'tanzania');


// Other promise combinators: race, allSettled and any//////////////////////
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// Promise.race

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ])
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long'))
    }, sec * 1000)
  })
}

Promise.race([getJSON(`https://restcountries.com/v2/name/tanzania`),
timeout(0.5)
]).then(res => console.log(res[0])).catch(err => console.log(err));

// Promise.allSettled

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res))

// Promise.any [ES2021]

Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res))

*/
// Coding challenge 3 ////////////////////////////////////////////////

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imagesContainer = document.querySelector('.images');
const btnCountry = document.querySelector('.btn-country');
btnCountry.style.opacity = 0;
let currImg;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const newImage = document.createElement('img');
    newImage.src = imgPath;

    newImage.addEventListener('load', function () {
      imagesContainer.append(newImage);
      resolve(newImage);
    });
    newImage.addEventListener('error', function () {
      reject(new Error('Image failed to load'));
    });
  });
};

const loadNPause = async function () {
  try {
    const img = await createImage('img/img-1.jpg');

    await wait(2);
    img.style.display = 'none';
    const img2 = await createImage('img/img-2.jpg');

    await wait(2);
    img2.style.display = 'none';
    const img3 = await createImage('img/img-3.jpg');

    await wait(2);
    img3.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
}
// loadNPause();

const loadAll = async function (imgPaths) {
  try {
    const imgs = imgPaths.map(async img => await createImage(img));
    console.log(imgs);
    // let images = [];

    // const images = await Promise.all([...imgs]).then((img) => img)
    const images = await Promise.all(imgs)
    images.forEach(image => image.classList.add('parallel'));
    console.log(images);
  } catch (error) {
    console.error(new Error(error));
  }
}
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

