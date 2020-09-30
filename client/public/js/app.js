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

//ADMIN PANEL ADD BUDGET event listener

if(addSavingsButton){
    addSavingsButton.addEventListener('click', (e)=>{
    //value in the input field - how many we would like to add
        const addBudget = parseInt(input.value);
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
    // fetch new savings balance to the api patch endpoint
        fetch('http://localhost:3000/api/families/' + id, options);
    });
}
//USER PANEL ADD EXPENSES event listener
if(addExpensesButton){

}



