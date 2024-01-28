function loading() {
    let idValue = setInterval(() => {
        document.getElementById("loading").classList.replace("d-none", "d-block")
    });


    setTimeout(() => {
        clearInterval(idValue)
        document.getElementById("loading").classList.replace("d-block", "d-none")
    }, 700);
}

$(window).ready(function () {
    loading()
})

let navLinksWidth = $(".nav-link").innerWidth()

$("nav").css("left", `-${navLinksWidth}px`)

$(".nav-btn i").click(function () {
    clothNav()
})

let navLink = $(".nav-link a")

function clothNav() {
    if ($("nav").css("left") == `0px`) {
        $("nav").animate({ left: -navLinksWidth }, 500)

        if (innerWidth <= 600) {
            $("nav").animate({ height: '10vh' }, 500)
            $(".nav-footer").hide(500)
            $(".nav-icon img").hide(500)
            $(".nav-icon .flex-column i").hide(500)
        }

        navLink.animate({ top: 100, opacity: 0 }, 300)

        document.querySelector(".nav-btn i").classList.replace("fa-remove", "fa-bars")

    } else {
        $("nav").animate({ left: 0, height: '100vh' }, 500)
        $(".nav-footer").show(500)
        $(".nav-icon img").show(500)
        $(".nav-icon .flex-column i").show(500)


        navLink.eq(0).animate({ top: 0, opacity: 1 }, 160, function () {
            navLink.eq(1).animate({ top: 0, opacity: 1 }, 160, function () {
                navLink.eq(2).animate({ top: 0, opacity: 1 }, 160, function () {
                    navLink.eq(3).animate({ top: 0, opacity: 1 }, 160, function () {
                        navLink.eq(4).animate({ top: 0, opacity: 1 }, 160)
                    })
                })
            })
        })

        document.querySelector(".nav-btn i").classList.replace("fa-bars", "fa-remove")
    }
}

/********** meals **********/

async function meals() {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let allMeals = await api.json()
    displayMeals(allMeals.meals)
}

meals()

function displayMeals(list) {
    cartoona = ``
    for (let i = 0; i < list.length; i++) {
        cartoona += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div onclick="detailsApi(${list[i].idMeal})" class="img-container position-relative overflow-hidden">
            <img src="${list[i].strMealThumb}" class="w-100 rounded-3">
            <div class="img-layer rounded-3 p-3 d-flex align-items-center">
                <h5 class="fw-semibold">${list[i].strMeal}</h5>
            </div>
        </div>
    </div>`
    }
    $(".row").html(cartoona)
}

/********** categories **********/

$("#categories").click(function () {
    loading()
    clothNav()
    clearSearchInput()
    categories()
    $(".search-container").css({ display: "none" })
    $(".details").css({ display: "none" })
})

async function categories() {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let allcategories = await api.json()
    displayCategories(allcategories.categories)
}

function displayCategories(list) {
    cartoona = ``
    for (let i = 0; i < list.length; i++) {
        let shortDescription = list[i].strCategoryDescription.split(" ")
        let newShortDescription = shortDescription.splice(0, 20).join(" ")

        cartoona += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div class="img-container position-relative overflow-hidden">
            <img src="${list[i].strCategoryThumb}" class="w-100 rounded-3">
            <div onclick="choiseCategories('${list[i].strCategory}')" class="img-layer rounded-3 text-center">
                <h3 class="fw-semibold display-6">${list[i].strCategory}</h3>
                <p class="p-2">${newShortDescription}</p>
            </div>
        </div>
    </div>`
    }
    $(".row").html(cartoona)
}

async function choiseCategories(term) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`);
    let allcategories = await api.json()
    displayMeals(allcategories.meals)
}

/********** area **********/

$("#area").click(function () {
    loading()
    clothNav()
    clearSearchInput()
    area()
    $(".search-container").css({ display: "none" })
    $(".details").css({ display: "none" })
})

async function area() {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let allarea = await api.json()
    displayArea(allarea.meals)
}

function displayArea(list) {
    cartoona = ``
    for (let i = 0; i < list.length; i++) {
        cartoona += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div onclick="choiseArea('${list[i].strArea}')" class="area-item text-white text-center rounded-3 py-2">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3 class="fw-semibold">${list[i].strArea}</h3>
        </div>
    </div>`
    }
    $(".row").html(cartoona)
}

async function choiseArea(term) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`);
    let allcategories = await api.json()
    displayMeals(allcategories.meals)
}

/********** ingredients **********/

$("#ingredients").click(function () {
    loading()
    clothNav()
    clearSearchInput()
    ingredients()
    $(".search-container").css({ display: "none" })
    $(".details").css({ display: "none" })
})

async function ingredients() {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let allingredients = await api.json()
    displayIngredients(allingredients.meals)
}

function displayIngredients(list) {
    cartoona = ``
    for (let i = 0; i < 20; i++) {
        let shortDescription = list[i].strDescription.split(" ")
        let newShortDescription = shortDescription.splice(0, 20).join(" ")

        cartoona += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div onclick="choiseIngredients('${list[i].strIngredient}')" class="ingredients-item text-white text-center rounded-3 py-2">
            <i class="fa-solid fa-drumstick-bite fa-4x fa-4x"></i>
            <h3 class="fw-semibold">${list[i].strIngredient}</h3>
            <p class="p-2">${newShortDescription}</p>
        </div>
    </div>`
    }
    $(".row").html(cartoona)
}

async function choiseIngredients(term) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`);
    let allcategories = await api.json()
    displayMeals(allcategories.meals)
}

/********** contact **********/

$("#contact").click(function () {
    loading()
    clothNav()
    clearSearchInput()
    displayContact()
    $(".search-container").css({ display: "none" })
    $(".details").css({ display: "none" })
})

function displayContact() {
    cartoona = `
    <div class="row input-container rounded-3 w-75 gy-4 py-5 m-auto mt-5">
    <div class="col-md-6">
        <input onfocus="nameValidate()" id="nameInput" type="text" class="form-control mb-2" placeholder="Enter your name">

        <p class="name-error bg-danger text-white px-1 rounded-1 m-0">
            Name must start with Capital letter and at least 3 letter
        </p>
    </div>

    <div class="col-md-6">
        <input onfocus="emailValidate()" id="emailInput" type="email" class="form-control mb-2" placeholder="Enter your email">

        <p class="email-error bg-danger text-white px-1 rounded-1 m-0">
            Invalid email
        </p>
    </div>

    <div class="col-md-6">
        <input onfocus="phoneValidate()" id="phoneInput" type="number" class="form-control mb-2" placeholder="Enter your phone">

        <p class="phone-error bg-danger text-white px-1 rounded-1 m-0">
            Invalid phone number
        </p>
    </div>

    <div class="col-md-6">
        <input onfocus="ageValidate()" id="ageInput" type="number" class="form-control mb-2" placeholder="Enter your age">

        <p class="age-error bg-danger text-white px-1 rounded-1 m-0">
            Invalid age
        </p>
    </div>

    <div class="col-md-6">
        <input onfocus="passwordValidate()" id="passwordInput" type="password" class="form-control mb-2"
            placeholder="Enter your password">

            <p class="password-error bg-danger text-white px-1 rounded-1 m-0">
                Password must be at least 8 character
            </p>
    </div>

    <div class="col-md-6">
        <input onfocus="repasswordValidate()" id="rePasswordInput" type="password" class="form-control mb-2" placeholder="Repassword">

        <p class="repassword-error bg-danger text-white px-1 rounded-1 m-0">
            Password don't match
        </p>
    </div>

    <button class="btn btn-outline-danger col-6 col-md-2 mx-auto" disabled>Submit</button>
</div>`
    $(".row").html(cartoona)
}

/********** contact (input validation) **********/

let nameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let ageValidation = false;
let passwordValidation = false;
let repasswordValidation = false;

function nameValidate() {
    $("#nameInput").on("input", function () {
        let regex = /^[A-Z][a-z]{2,10}$/gi;

        if (regex.test(this.value) == true) {
            document.getElementById("nameInput").classList.add("is-valid");
            document.getElementById("nameInput").classList.remove("is-invalid");
            $(".name-error").fadeOut(500)
            nameValidation = true;
        }
        else {
            document.getElementById("nameInput").classList.add("is-invalid");
            document.getElementById("nameInput").classList.remove("is-valid");
            $(".name-error").fadeIn(500)
            nameValidation = false;
        }
        inputFormValidation()
    })
}

function emailValidate() {
    $("#emailInput").on("input", function () {
        let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if (regex.test(this.value) == true) {
            document.getElementById("emailInput").classList.add("is-valid");
            document.getElementById("emailInput").classList.remove("is-invalid");
            $(".email-error").fadeOut(500)
            emailValidation = true;
        }
        else {
            document.getElementById("emailInput").classList.add("is-invalid");
            document.getElementById("emailInput").classList.remove("is-valid");
            $(".email-error").fadeIn(500)
            emailValidation = false;
        }
        inputFormValidation()
    })
}

function phoneValidate() {
    $("#phoneInput").on("input", function () {
        let regex = /^01[0125][0-9]{8}$/;

        if (regex.test(this.value) == true) {
            document.getElementById("phoneInput").classList.add("is-valid");
            document.getElementById("phoneInput").classList.remove("is-invalid");
            $(".phone-error").fadeOut(500)
            phoneValidation = true;
        }
        else {
            document.getElementById("phoneInput").classList.add("is-invalid");
            document.getElementById("phoneInput").classList.remove("is-valid");
            $(".phone-error").fadeIn(500)
            phoneValidation = false;
        }
        inputFormValidation()
    })
}

function ageValidate() {
    $("#ageInput").on("input", function () {
        let regex = /^([1][89]|[2-5][0-9]|60)$/;

        if (regex.test(this.value) == true) {
            document.getElementById("ageInput").classList.add("is-valid");
            document.getElementById("ageInput").classList.remove("is-invalid");
            $(".age-error").fadeOut(500)
            ageValidation = true;
        }
        else {
            document.getElementById("ageInput").classList.add("is-invalid");
            document.getElementById("ageInput").classList.remove("is-valid");
            $(".age-error").fadeIn(500)
            ageValidation = false;
        }
        inputFormValidation()
    })
}

let passwordValue;

function passwordValidate() {
    $("#passwordInput").on("input", function () {
        let regex = /^[a-zA-Z0-9*_$/]{8,20}$/;

        if (regex.test(this.value) == true) {
            document.getElementById("passwordInput").classList.add("is-valid");
            document.getElementById("passwordInput").classList.remove("is-invalid");
            $(".password-error").fadeOut(500)
            passwordValue = this.value;
            passwordValidation = true;
        }
        else {
            document.getElementById("passwordInput").classList.add("is-invalid");
            document.getElementById("passwordInput").classList.remove("is-valid");
            $(".password-error").fadeIn(500)
            passwordValidation = false;
        }
        inputFormValidation()
    })
}

function repasswordValidate() {
    $("#rePasswordInput").on("input", function () {

        if (this.value == passwordValue) {
            document.getElementById("rePasswordInput").classList.add("is-valid");
            document.getElementById("rePasswordInput").classList.remove("is-invalid");
            $(".repassword-error").fadeOut(500)
            repasswordValidation = true;
        }
        else {
            document.getElementById("rePasswordInput").classList.add("is-invalid");
            document.getElementById("rePasswordInput").classList.remove("is-valid");
            $(".repassword-error").fadeIn(500)
            repasswordValidation = false;
        }
        inputFormValidation()
    })

}

function inputFormValidation() {
    if (nameValidation == true && emailValidation == true && phoneValidation == true && ageValidation == true && passwordValidation == true && repasswordValidation == true) {
        $(".btn-outline-danger").removeAttr("disabled");
    } else {
        $(".btn-outline-danger").attr("disabled", "disabled");
    }
}

/********** search **********/

$("#search").click(function () {
    loading()
    clothNav()
    clearSearchInput()
    $(".search-container").css({ display: "flex" })
    $(".details").css({ display: "none" })
    $(".row").html("")
})

/********** search by name **********/

$("#search-name").on("input", function () {
    loading()
    $("#search-letter").val("")
    searchByName(this.value)
})

async function searchByName(searchTerm) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    let allMeals = await api.json()
    displayMeals(allMeals.meals)
}

/********** search by first letter **********/

$("#search-letter").on("input", function () {
    loading()
    $("#search-name").val("")
    if (this.value != '') {
        searchByFirstLetter(this.value)
    }
})

async function searchByFirstLetter(searchTerm) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm}`);
    let allMeals = await api.json()
    displayMeals(allMeals.meals)
}

/********** clear search input **********/

function clearSearchInput() { 
    $("#search-letter").val("")
    $("#search-name").val("")
}

/********** Display details **********/

function displayDetails(item) {

    let strIngredient = ``

    for (let i = 1; i <= 20; i++) {
        if (item[`strIngredient${i}`]) {
            strIngredient += `<div class="m-2 bg-info-subtle text-black fw-semibold rounded-3 p-1">${item[`strMeasure${i}`]} ${item[`strIngredient${i}`]}</div>`
        }
    }

    let tag;
    if (item.strTags == null) {
        tag = ''
    } else {
        tag = item.strTags
    }

    document.querySelector(".details .row").innerHTML = `
    <div class="col-md-4">
    <div>
        <img src="${item.strMealThumb}" class="w-100 rounded-3">
        <h2 class="text-white mt-2">${item.strMeal}</h2>
    </div>
</div>
<div class="col-md-7">
    <div class="text-white">
        <h2 class="mb-4">Instructions</h2>

        <p>${item.strInstructions}</p>

        <h2>Area : ${item.strArea}</h2>
        <h2>Category : ${item.strCategory} </h2>
        <h2>Recipes :</h2>

        <div class="component d-flex flex-wrap gap-2 my-4">
           ${strIngredient}
        </div>

        <h2 class="mb-4">Tags : <span class="tag-item bg-info bg-opacity-75 text-black fs-5 rounded-3">${tag}</span></h2>

        <a href="${item.strSource}" target="_blank" class="btn btn-success text-white fw-semibold me-3">Source</a>

        <a href="${item.strYoutube}" target="_blank" class="btn btn-danger text-white fw-semibold">Youtube</a>
    </div>
</div>
    `
    document.querySelector("body").classList.replace("overflow-auto", "overflow-hidden")

    if ($(".tag-item").html() == '') {
        $(".tag-item").addClass("p-0")
    } else {
        $(".tag-item").addClass("p-1")
    }
}

async function detailsApi(termId) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${termId}`);
    let allMeals = await api.json()
    $(".details").css({ display: "flex" })
    loading()
    displayDetails(allMeals.meals[0])
}

$(".details .fa-remove").click(function () {

    $(".details").css({ display: "none" })

    document.querySelector("body").classList.replace("overflow-hidden", "overflow-auto")
})
