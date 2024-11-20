'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
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


const displayMovements = function (movements){
 movements.forEach(function(mov ,i ){
    const type = mov>0 ? 'deposit':'withdrawal' 
    const html = `
      <div class="movements">
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${i+1} ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
    `
    containerMovements.insertAdjacentHTML("afterbegin",html);
  })
}

const user = 'Steven Thomas Williams';
// const username = user.toLowerCase().split(" ").map((name)=> {
//   return  name[0]
// }).join("")
// console.log(username)
//  creating Username initials 
const createUsername= function (accs) {
 accs.forEach(function (acc){
  acc.username = acc.owner.toLowerCase().split(" ").map((names)=> {
    return  names[0]
  }).join("") 
 })

  const username= user.toLowerCase().split(" ").map((names)=> {
  return  names[0]
}).join("") 
return username
}
createUsername(accounts)
// console.log(createUsername( 'Jessica Davis'))
const finalBalance = function (acc) {
   acc.balance = acc.movements.reduce((accumulator, current) => accumulator + current, 0);
  labelBalance.textContent = `${acc.balance}€`; // Update the balance value in the UI
  // console.log(balance);
};

// finalBalance(account1); 



let calDisplaySummary= function (acc)
{
  const incomes= acc.movements.filter(mov=>mov>0).reduce((accumulator, current) => accumulator + current, 0);;
labelSumIn.textContent=`${incomes}Eur`
const expense= acc.movements.filter((mov)=>mov<0).reduce((accumulator,current)=>accumulator+current,0);
labelSumOut.textContent= `${Math.abs(expense)}Eur`
const interest = acc.movements.filter(mov=>mov>0).map(deposit=>(deposit*acc.interestRate)/100).filter(int=>{
  return int >= 2}).reduce((accumulator,current)=>accumulator+current,0)
labelSumInterest.textContent=`${interest}Eur`
}
// calDisplaySummary(account1.movements)
// Calculating final Balance ;

// Handling Login 
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    // Display balance
    finalBalance(currentAccount);

    // Display summary
    calDisplaySummary(currentAccount);

    // Clear input fields
    // console.log(inputLoginUsername, inputLoginPin); // Ensure these are correct elements

    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    // Remove focus from input fields
    inputLoginPin.blur();
    inputLoginUsername.blur();

    // Update Ui function 
    updateUI(currentAccount)
  }
});


btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form submission

  const amount = Number(inputTransferAmount.value); // Get transfer amount
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value); // Find receiver

  // Validate transfer
  if (
    amount > 0 && 
    currentAccount.balance >= amount && 
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log('Transfer Valid');

    // Deduct money from sender
    currentAccount.movements.push(-amount);

    // Add money to receiver
    receiverAcc.movements.push(amount);

    // Update the UI for sender
    updateUI(currentAccount);

    // Clear input fields
    inputTransferAmount.value = '';
    inputTransferTo.value = '';
  } else {
    console.log('Transfer Failed: Invalid transaction');
  }
});

const updateUI=function (currentAccount){

  displayMovements(currentAccount.movements)

  // Display balance
  finalBalance(currentAccount);

  // Display summary
  calDisplaySummary(currentAccount);

}
btnClose.addEventListener('click', function (e){
  e.preventDefault();
  if (
  inputCloseUsername.value ===currentAccount.username &&inputClosePin.value==currentAccount.pin
  ){
const index = accounts.findIndex(acc=> acc.username ===currentAccount.username)
    // console.log(index)
     accounts.splice(index , 1)
     inputCloseUsername.value=inputClosePin.value=''
containerApp.style.opacity=0;
  } else {
    console.log('Invalid credentials')
  }

  
})










