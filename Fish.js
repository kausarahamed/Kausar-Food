document.getElementById('error-show').style.display='none'


const searchFood = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

  // clear data

    searchField.value = '';
    
    if(searchText==''){
      document.getElementById('error-show').style.display='none' 
      alert("No result found")
    }else{ 
      //load data
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(rep => rep.json())
    .then(data => displaySearchResult(data.meals))
    .catch(error => displayError(error))
    }

    const displayError= error=> {
      document.getElementById('error-show').style.display='block'
    }

    

    
}

const displaySearchResult = meals => {

  
  const searchResult = document.getElementById('search-result');
  searchResult.textContent='';
  document.getElementById('error-show').style.display='none'
  meals.forEach(meal => {
    

    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `<div onclick="loadMealDetail(${meal.idMeal})" class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
    </div>
  </div>
</div>
</div>
`;
searchResult.appendChild(div)
  });
}

const loadMealDetail = mealId => {
  // console.log(mealId);

  const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`

  fetch(url)
  .then(rep => rep.json())
  .then(data => displayMealDeatail(data.meals[0]))
}

const displayMealDeatail = meal =>{
  // console.log(meal);
const mealDetails = document.getElementById('meal-details');
mealDetails.textContent='';
const div = document.createElement('div');
div.classList.add('card');
div.innerHTML = `<img src="${meal.strMealThumb}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${meal.strMeal}</h5>
  <p class="card-text">${meal.strInstructions.slice(0,100)}</p>
  <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
</div>
`;
mealDetails.appendChild(div)

}