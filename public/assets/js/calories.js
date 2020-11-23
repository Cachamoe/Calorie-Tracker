let totalCalories = [];
let totalBurnedCalories = [];
let caloriesIn = $("#caloriesIn");
let caloriesOut = $("#caloriesOut");

$(document).ready(function () {
    function todaysDate() {
        let d = new Date();
        let weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        let n = weekday[d.getDay()];
        document.getElementById("Date").innerHTML = n;
    }
    todaysDate();
});


$("#searchButton").on("click", function (event) {
    event.preventDefault();
    $(".food-list").empty();
    let food = $("#foodTextEntry").val().trim();

    
    let queryURL = "https://api.spoonacular.com/food/ingredients/search?query=" + food + "&sort=calories&sortDirection=desc&apiKey=c1efb5fd0f5141858fc5b5f6a6b5ab85";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {

        for (var i = 0; i < response.results.length; i++) {
            let li = $("<li>");
            let button = $("<button class='food-button button is-primary'>Add Food</button>");
            li.text(response.results[i].name);
            button.attr("id", response.results[i].id);
            li.append(button);
            $(".food-list").append(li);
        }

        $(".food-button").on("click", function (event) {
            event.preventDefault();
            let foodId = $(event.target).attr("id");
            let queryURLtwo = "https://api.spoonacular.com/food/ingredients/" + foodId + "/information?amount=1&apiKey=c1efb5fd0f5141858fc5b5f6a6b5ab85&includeNutrition=true";

            $.ajax({
                url: queryURLtwo,
                method: "GET",
            }).then(function (id) {

                let foodChosen = {}
                foodChosen.name = (id.name);
                foodChosen.calories = (id.nutrition.nutrients[0].amount);

                totalCalories.push(parseInt(foodChosen.calories));
                $("#progressIn").attr("value", totalCalories.reduce((a, b) => a + b, 0));
                caloriesIn.text(totalCalories.reduce((a, b) => a + b, 0));

                $.post("api/foods", foodChosen)
            });
        });
    });
    $("#foodTextEntry").val("");
});


$("#customButton").on("click", function (event) {
    let foodItem = {}
    foodItem.name = $("#customFoodTextEntry").val();
    foodItem.calories = parseInt($("#enterCustomCalories").val());

    totalCalories.push(foodItem.calories);
    $("#progressIn").attr("value", totalCalories.reduce((a, b) => a + b, 0));
    caloriesIn.text(totalCalories.reduce((a, b) => a + b, 0));

    $.post("api/foods", foodItem).then(function (response) {
        $.ajax({
            url: "/api/foods",
            method: "POST"
        });
    });
    $("#customFoodTextEntry").val("");
    $("#enterCustomCalories").val("");
});


$("#caloriesBurnedButton").on("click", function (event) {
    let burnedCalories = {}
    burnedCalories.calories = parseInt($("#enterBurnedCalories").val());

    totalBurnedCalories.push(burnedCalories.calories);
    $("#progressOut").attr("value", totalBurnedCalories.reduce((a, b) => a + b, 0));
    caloriesOut.text(totalBurnedCalories.reduce((a, b) => a + b, 0));

    $.post("api/exercise", burnedCalories).then(function () {
        $("#enterBurnedCalories").val("");
    });
});

