//dark mode
const dark_button = document.querySelector('.dark_mode')
let nums = 0
dark_button.addEventListener("click", function() {
  document.querySelector('body').classList.toggle('night');
  document.querySelector('.conversion').classList.toggle('night');
  document.querySelector('.input').classList.toggle('night');
  document.querySelector('.answer_box').classList.toggle('night');
  document.querySelector('.switch').classList.toggle('night');
  document.querySelector('.title-name').classList.toggle('night');

  //alternate between moon and sun images on every click
  if (nums %2 === 0){
    document.querySelector('.moon-image').src="images/sun.png";}
  else{
    document.querySelector('.moon-image').src="images/moon.png";}
  nums++;
  })
 
//assign each element to a constant
const select1 = document.querySelector('.currencies1');
const select2 = document.querySelector('.currencies2');
const convert_button = document.querySelector('.convert');
const amount = document.querySelector('.amount_input');
const current_num = document.querySelector('.current');
const result_num = document.querySelector('.result');
const switch_button = document.querySelector('.switch');
  
    
function fetch_data(){
  fetch('https://api.frankfurter.app/currencies')
  .then((data) => data.json())
  .then((data) =>{
    display(data);
  });
}

fetch_data();

function display(data){
  const entries = Object.entries(data);
  console.log(entries.length)
  for (var i = 0;i <entries.length;i++){
    select1.innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
    select2.innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
  }
}

switch_button.addEventListener("click", function(){
  temp = select1.value;
  select1.value = select2.value;
  select2.value = temp;

});

switch_button.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

convert_button.addEventListener("click", function() {
  let currency1 = select1.value;
  let currency2 = select2.value;
  let value = amount.value;

  if (currency1 != currency2){
    convert(currency1,currency2,value)
  }else{

    alert("You are trying to convert the same currency!\n Please choose different currencies.")
  }
});

//alows currency conversion with "enter" button
document.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    // Trigger the button element with a click
    convert_button.click();
  }
});

function convert(currency1,currency2,value){
    const host = 'api.frankfurter.app';

     fetch(`https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`)
    .then(resp => resp.json())
    .then((data) => {
      current_num.innerHTML = value + '&nbsp;' + currency1 +'&nbsp' + '&nbsp' + '=';
      if (Object.values(data.rates)[0].toString().split(".")[1].length > 1){
      result_num.innerHTML = `&nbsp ${Object.values(data.rates)[0].toFixed(2)} ${currency2}`; }
      else{
        result_num.innerHTML = `&nbsp ${Object.values(data.rates)[0]} ${currency2}`;
      }
    })};