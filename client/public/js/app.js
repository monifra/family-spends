//PUBLIC JAVASCRIPT

//ADMIN PANEL AND USER PANEL variables

const input = document.getElementById('money');
const id = document.getElementById('familyId').textContent;
document.getElementById('familyId').style.visibility = 'hidden';
let earlierSavings = parseInt(document.getElementById('savingsNow').textContent);

//ADMIN PANEL ADD BUDGET variables
const addSavingsButton = document.getElementById('submitBudgetButton');

//USER PANEL ADD EXPENSES variables
const addExpensesButton = document.getElementById('submitExpensesButton');

//ERROR HANDLING INFORMATION
const errorP = document.getElementById('error');

//ADMIN PANEL ADD BUDGET event listener

if(addSavingsButton){
    addSavingsButton.addEventListener('click', (e)=>{

    //value in the input field - how many we would like to add
        let addBudget = parseInt(input.value);
    //input should take only positive values so any negative will be change back to positive
        if(addBudget < 0){
            addBudget *= -1;
        }
    //add input value to a savings balance
        const savings = earlierSavings += addBudget;
    //data to send by fetch option
        const data = {savings};
    //options for fetch
        const options = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('http://localhost:3000/api/families/' + id, options);
    });
}
//USER PANEL ADD EXPENSES event listener
if(addExpensesButton){
    addExpensesButton.addEventListener('click', (e)=>{
    //value in the input field - how many we would like to take from budget
        let addExpenses =parseInt(input.value);
    //input should take only positive values so any negative will be change back to positive
        if(addExpenses < 0 ){
            addExpenses *= -1;
        }
    //subtract input value from savings balance
        const savings = earlierSavings -= addExpenses;
    //data to send by fetch option
        const data = {savings};
    //options for fetch
    //Fetch written with the help of:
    //https://github.com/CodingTrain/Intro-to-Data-APIs-JS/blob/source/module2/data_selfie_app/public/sketch.js
        const options = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    // fetch new savings balance to the api patch endpoint
        fetch('http://localhost:3000/api/families/' + id, options);
    });
}



