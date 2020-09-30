//PUBLIC JAVASCRIPT

const input = document.getElementById('savings');
const savings = input.value;
const data = {savings};
const id = document.getElementById('familyId').textContent;
const earlierSavings = document.getElementById('savingsNow').textContent;

const button = document.getElementById('submitButton')

console.log(savings);
console.log(earlierSavings);
console.log(id);



button.addEventListener('click', (e)=>{
    const savings = input.value;
    const data = {savings};

    const options = {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch('http://localhost:3000/api/families/' + id, options);
})




