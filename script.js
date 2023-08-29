'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Ahmed Zubaer Talha',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Araf Mahmud',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Rafiq Ibne Haisam Tanmay',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Ashraful Alam Shuvo',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// functionality


const displayMovements = function(movements){
  containerMovements.innerHTML = ''
  movements.forEach(function(mov,i){
    const type = mov > 0 ? "deposit" : "withdrawal"
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${i+1} ${type}
          </div>
          <div class="movements__date">24/01/2037</div>
          <div class="movements__value">${mov}€</div>
    </div>`
  containerMovements.insertAdjacentHTML('afterbegin',html)
  })
}


const createUsername = function(accounts){
  accounts.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map(function(name){
      return name[0]
    }).join('')
  })
}
createUsername(accounts)

const balanceCalc = function(accounts){
  accounts.balance = accounts.movements.reduce(function(acc,mov){
    return acc + mov
  },0)

  labelBalance.textContent = `${accounts.balance}€`
  console.log(accounts.balance, accounts)
}


const dealing = function(accounts){
  const depoBal = accounts.movements.filter(function(mov){
     return mov > 0
  }).reduce(function(acc,mov){
    return acc + mov
  })
  let withBal
  const withCalc = accounts.movements.filter(function(mov){
    return mov < 0
  })
  if(!withCalc.length){
    withBal = withCalc
  }else{
    withBal = withCalc.reduce(function(acc,mov){
      return acc + mov
    })
  }
 const intBal = accounts.movements.filter(function(mov){
  return mov > 0
 }).map(function(mov,i){
   return mov * (accounts.interestRate/100)
 }).reduce(function(acc,mov){
  return acc + mov
 },0)
 labelSumInterest.textContent = `${intBal}€`
 labelSumIn.textContent = `${depoBal}€`
 labelSumOut.textContent = `${Math.abs(withBal)}€`
}
 const displayUI = function(acc){
  dealing(acc)
  balanceCalc(acc)
  displayMovements(acc.movements)
 }

let curAcc

btnLogin.addEventListener('click', function(e){
  e.preventDefault()

  curAcc = accounts.find(acc =>
    acc.username === inputLoginUsername.value)
  if(curAcc?.pin === Number(inputLoginPin.value)){
      labelWelcome.textContent = `Welcome back ${curAcc.owner.split(' ')[0]}!`
      containerApp.style.opacity = 100
      displayUI(curAcc)
  }
  inputLoginUsername.value = inputLoginPin.value = ''
})

btnTransfer.addEventListener('click', function(e){
  e.preventDefault()
  const amount = Number(inputTransferAmount.value)
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  if(amount > 0 && amount < curAcc.balance && receiverAcc && receiverAcc?.username !== curAcc.username){
    curAcc.movements.push(-amount)
    receiverAcc.movements.push(amount)
    displayUI(curAcc)
  }
  inputTransferTo.value = inputTransferAmount.value = '';
})

btnClose.addEventListener('click',function(e){
  e.preventDefault()
  if ( Number(inputClosePin.value) === curAcc.pin && inputCloseUsername.value === curAcc.username){
    const index = accounts.findIndex(acc => acc.username === curAcc.username)
    
    containerApp.style.opacity = 0
    accounts.splice(index,1)
    inputClosePin.value = inputCloseUsername.value = '';
  }
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
