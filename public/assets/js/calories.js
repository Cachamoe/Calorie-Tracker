// let queryURL2 = "https://api.spoonacular.com/food/ingredients/search?query=" + foodID + "&apiKey=c1efb5fd0f5141858fc5b5f6a6b5ab85&includeNutrition=true";


// Search Button Functionality (Imputs text and calls searchFood function)
$("#searchButton").on("click", function(event) {
    event.preventDefault();
    let food = $("#foodTextEntry").val().trim();
    // console.log(food);
    let queryURL = "https://api.spoonacular.com/food/ingredients/search?query=" + food + "&sort=calories&sortDirection=desc&apiKey=c1efb5fd0f5141858fc5b5f6a6b5ab85";

// Rapid API Call
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        console.log(response.results[0]);
        console.log(response.results[0].name);
        console.log(response.results[0].id);
        console.log(response.results[0].image);
    });
});


$("#customButton").on("click", function(event) {
    var foodItem = {}
    foodItem.name = $("#customFoodTextEntry").val();
    foodItem.calories = $("#enterCustomCalories").val();
    
    $.post("api/foods",foodItem).then(function(response) {
        console.log(response);
    });
});

$("#caloriesBurnedButton").on("click", function(event) {
    var burnedCalories = {}
    burnedCalories.calories = $("#enterBurnedCalories").val();
    
    $.ajax({
        url: "/api/foods",
        method: "POST"
    }).then(function(response) {
        console.log(response);
    });
});

$("#caloriesBurnedButton").on("click", function(event) {
    var burnedCalories = {}
    burnedCalories.calories = $("#enterBurnedCalories").val();
    
    $.ajax({
        url: "/api/foods",
        method: "POST"
    }).then(function(response) {
        console.log(response);
    });
});
