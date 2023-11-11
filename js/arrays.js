//filter
const names = ['Ivan', 'Ann', 'Ksenia', 'Konstyantyn'];
const shortNames = names.filter(function(name) {
  return name.length < 5;
});
console.log(shortNames);

//map

let answers = ['IvAn', 'KIpdd', 'KIojdd'].map(item => item.toLowerCase());

const filterdenAnswers = answers.map((result) => {
  return result.toLowerCase();
});

console.log(answers);

const some = [4, 'gsrg', 'fgtgst'];

console.log(some.every(item => typeof(item) === 'string'));

const arr = ['gag', 'agtg', 'erferf', 2, 7, 9];

const res = arr.reduce((sum, current) => {
  return sum + ',' + current
})

console.log(res);

const films = [
  {
      name: 'Titanic',
      rating: 9,
  },
  {
      name: 'Die hard 5',
      rating: 5
  },
  {
      name: 'Matrix',
      rating: 8,
  },
  {
      name: 'Some bad film',
      rating: 4,
  }
];

// function showGoodFilms(arr) {
//   return arr.filter(item => {
//     return item.rating >= 8;
//   });
// }

// function showListOfFilms(arr) {
//   return arr.reduce((acc, current) => {
//     return `${typeof(acc) === 'object' ? acc.name : acc}, ${current.name}`;
//   });
// }

function setFilmsIds(arr)  {
  return arr.map((film, i) => {
    film.id = i;
    return film;
  });
}

const transformedArray = setFilmsIds(films);

function checkFilms(arr) {
  return arr.every(film => film.id != 'undefined');
}

console.log(checkFilms(films));

// function showGoodFilms(arr) {
//   return arr.filter(film => film.rating >= 8);
// }

const funds = [
  {amount: -1400},
  {amount: 2400},
  {amount: -1000},
  {amount: 500},
  {amount: 10400},
  {amount: -11400}
];

function getPositiveIncomeAmount(funds) {
  let filteredObject = funds.filter(obj => obj.amount > 0);
  return filteredObject.reduce((sum, curr) => {
    return (typeof(sum) === 'object' ? sum.amount : sum) + curr.amount;
  });
};

function getTotalIncomeAmount(funds) {
  if (funds.some(obj => obj.amount < 0)) {
    return funds.reduce((sum, curr) => {
      return (typeof(sum) === 'object' ? sum.amount : sum) + curr.amount;
    });
  } else {
    return getPositiveIncomeAmount(funds);
  }
}

console.log(getTotalIncomeAmount(funds));