
                                "use strict"


$(function(){
    $('.loading-screen i').fadeOut(500,function(){
        $('.loading-screen').fadeOut(500);
    });
    $("body").css("overflow", "visible");
})
                    

let width=$("#sidebar .sidebarInner").innerWidth();
let li=$("#sidebar .links li");

function closeSidebar(){
    $("#iconClicked").attr("class","fa-solid fa-bars fa-3x")
    $("#sidebar").animate({'left':-width},500);
    li.animate({top:"300px"},500);
}


$("#iconClicked").attr("class","fa-solid fa-bars fa-3x")
$("#sidebar").css({'left':-width});
li.css({top:"300px"});


$("#iconClicked").click(function(){
    
    if($("#sidebar").css('left') == '0px'){
        $("#iconClicked").attr("class","fa-solid fa-bars fa-3x")
        $("#sidebar").animate({'left':-width},500);
        li.animate({top:"300px"},500);
    }
   
    else{
        $("#iconClicked").attr("class","fa-solid fa-xmark fa-3x")
        $("#sidebar").animate({'left':'0px'},500);
        for(let i=0;i<li.length;i++){
            li.eq(i).animate({top:"0px"},((i+li.length)*100))
        }
    }
})

            

                    function appearLoading(){
                        $('.inner-loading-screen').css({'display':'flex'});
                        $('.inner-loading-screen i').fadeIn(300,function(){
                            $('.inner-loading-screen').fadeIn(300);
                        });
                        $("body").css("overflow", "hidden");
                    }

                    function disappearLoading(){
                        $('.inner-loading-screen i').fadeOut(300,function(){
                            $('.inner-loading-screen').fadeOut(300)
                        });
                        $("body").css("overflow", "visible");
                    }

function display(finalRes){
    let cartona="";

    
    if(finalRes==null){
        $("#demo").html(cartona) 
        return 0;
    }

    for(let i=0;i<finalRes.length;i++){
        cartona+=`<div class="col-md-3">
        <div onclick="mainAfterClick(${finalRes[i].idMeal})" class="inner-col position-relative rounded-2 overflow-hidden">
            <img src="${finalRes[i].strMealThumb}" class="img-fluid" alt="">
            <div class="layer position-absolute d-flex align-items-center p-2">
                <h3>${finalRes[i].strMeal}</h3>
            </div>
        </div>

    </div>`
    }
    $("#demo").html(cartona);
}


function display20Meals(finalRes){
    let cartona="";
        
        if(finalRes==null){
            $("#demo").html(cartona) 
            return 0;
        }

    for(let i=0;i<finalRes.length;i++){
        
        if(i>=20){
            break;
        }
        cartona+=`<div class="col-md-3">
        <div onclick="mainAfterClick(${finalRes[i].idMeal})" class="inner-col position-relative rounded-2 overflow-hidden">
            <img src="${finalRes[i].strMealThumb}" class="img-fluid" alt="">
            <div class="layer position-absolute d-flex align-items-center p-2">
                <h3>${finalRes[i].strMeal}</h3>
            </div>
        </div>
    </div>`
    }
    $("#demo").html(cartona);
}



async function getMainData(){
    let data=await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    let {meals:result}=await data.json();
    return result;
}

async function displayMain(){
    let finalRes=await getMainData();

    display(finalRes);
}

displayMain();

async function getDataById(idMeal){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}

async function mainAfterClick(id){
    let finalRes=await getDataById(id);

    closeSidebar();

    let tagsArray=[];


    if(finalRes[0].strTags==null)
    {
        tagsArray=[];

    }
    else{
        tagsArray=finalRes[0].strTags.split(",");
      
    }

    let tags="";  
    for(let i=0;i<tagsArray.length;i++){
        tags+=`<li class="alert alert-danger p-1 m-2">${tagsArray[i]}</li>`
    }
   


    let recipes=""; 
    for(let i=1;i<=20;i++){

        if(finalRes[0][`strIngredient${i}`]==""||finalRes[0][`strMeasure${i}`]==""){
            break;
        }

        recipes+=`<li class="alert alert-danger p-1 m-2">
        ${finalRes[0][`strMeasure${i}`]} ${finalRes[0][`strIngredient${i}`]}
        </li>`
    }

    let cartona="";

    cartona+=`<div class="col-md-4 text-white">
    <img src="${finalRes[0].strMealThumb}" alt="photo-main"
        class="img-fluid">
    <h2>${finalRes[0].strMeal}</h2>
</div>

<div class="col-md-8 text-white">
    <h2>Instructions</h2>
    <p>${finalRes[0].strInstructions}</p>

    <h3><span class="fw-bolder">Area : </span>${finalRes[0].strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${finalRes[0].strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex flex-wrap g-3">${recipes}</ul>

    <h3>Tags :</h3>
    <ul class="list-unstyled d-flex flex-wrap g-3">${tags}</ul>

    <a href="${finalRes[0].strSource}" target="_blank" class="btn source-meal btn-success">Source</a>
    <a href="${finalRes[0].strYoutube}" target="_blank" class="btn youtube-meal btn-danger">Youtube</a>

</div>`

$("#demo").html(cartona)

}


$("#search").click(function(){
    closeSidebar();
    $(".main").css({'display':'block'});
    $("#demo").css({'display':'none'});
    $("#searchSection").css({'display':'block'});
    $("#showContact").css({'display':'none'});
})

async function getMealByName(term){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}

async function displayByName(item){
    let finalRes = await getMealByName(item);
    display20Meals(finalRes)
    $("#demo").css({'display':'flex'})
}

let nameInput=document.getElementById("searchByName");

nameInput.addEventListener("input",function(){
    closeSidebar();
    displayByName(nameInput.value);
})



async function getMealByFirstLetter(term){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}

async function displayByFirstLetter(item){
    let finalRes = await getMealByFirstLetter(item);
    display20Meals(finalRes)
    $("#demo").css({'display':'flex'})
}

let letterInput=document.getElementById("searchByFirstLetter");

letterInput.addEventListener("input",function(){
    closeSidebar();

    displayByFirstLetter(letterInput.value?letterInput.value:'a');
})
async function getCategories(){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let {categories:result}=await data.json();
    disappearLoading();
    return result;
}

async function displayCategories(){
    let finalRes=await getCategories();
    let cartona="";

    for(let i=0;i<finalRes.length;i++){
        cartona+=`<div class="col-md-3">
        <div onclick="displayMealsByCategory('${finalRes[i].strCategory}')" class="inner-col position-relative rounded-2 overflow-hidden">
            <img src="${finalRes[i].strCategoryThumb}" class="img-fluid" alt="photo-category">
            <div class="layer position-absolute text-center p-2">
                <h3>${finalRes[i].strCategory}</h3>
                <p>${finalRes[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>

    </div>`
    }
    $("#demo").html(cartona);
    $("#demo").css({'display':'flex'});
}

$('#Categories').click(function(){
    closeSidebar();
    $("#searchSection").css({'display':'none'});
    $(".main").css({'display':'block'});
    $("#showContact").css({'display':'none'});

    displayCategories();
})

async function getMealsByCategory(term){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}

async function displayMealsByCategory(item){
    let finalRes=await getMealsByCategory(item);
    console.log(finalRes);
    closeSidebar();
    display20Meals(finalRes);
}

async function getArea(){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}

async function displayArea(){
    let finalRes=await getArea()

    let cartona="";
    for(let i=0;i<finalRes.length;i++){
        cartona+=`<div onclick="displayMealsByArea('${finalRes[i].strArea}')" class="col-md-3 text-white">
        <div  class="inner-col rounded-2 text-center">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${finalRes[i].strArea}</h3>
        </div>
    </div>`
    }
    $("#demo").html(cartona);
    $("#demo").css({'display':'flex'});
}

$('#Area').click(function(){
    closeSidebar();
    $("#searchSection").css({'display':'none'});
    $(".main").css({'display':'block'});
    $("#showContact").css({'display':'none'});

    displayArea();
})

async function getMealsByArea(term){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}

async function displayMealsByArea(item){
    let finalRes=await getMealsByArea(item);
    closeSidebar();
    display20Meals(finalRes);
}

async function getIngredients(){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}

async function displayIngredients(){
    let finalRes=await getIngredients();
    let cartona="";
    for(let i=0;i<finalRes.length;i++){
        if(i>=20){
            break;
        }
        cartona+=`<div onclick="displayMealsByIngredients('${finalRes[i].strIngredient}')" class="col-md-3 text-white">
        <div  class="inner-col rounded-2 text-center">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${finalRes[i].strIngredient}</h3>
        <P>${finalRes[i].strDescription.split(" ").slice(0,20).join(" ")}</P>
        </div>
    </div>`
    }
    $("#demo").html(cartona);
    $("#demo").css({'display':'flex'});
}

$('#Ingredients').click(function(){
    closeSidebar();
    $("#searchSection").css({'display':'none'});
    $(".main").css({'display':'block'});
    $("#showContact").css({'display':'none'});

    displayIngredients();
})


async function getMealsByIngredients(term){
    appearLoading();
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`);
    let {meals:result}=await data.json();
    disappearLoading();
    return result;
}
async function displayMealsByIngredients(item){
    let finalRes=await getMealsByIngredients(item);
    closeSidebar();
    display20Meals(finalRes);
}

let inputName=document.getElementById("name");
let inputEmail=document.getElementById("email")
let inputPhone=document.getElementById("phone");
let inputAge=document.getElementById("age");
let inputPassword=document.getElementById("password");
let inputRePassword=document.getElementById("rePassword");

$('#contactUs').click(function(){
    closeSidebar();
    $("#searchSection").css({'display':'none'});
    $(".main").css({'display':'none'});
    $("#showContact").css({'display':'flex'});
})


inputName.addEventListener('input',function(){
    validateName(inputName.value);
})

function validateName(term){
    let regex=/^[a-zA-Z ]+$/gi;
    if(regex.test(term)){
        $("#wrongName").css({'display':'none'});
        return true;
    }
    else{
        $("#wrongName").css({'display':'block'})
        return false;
    }
}


inputEmail.addEventListener('input',function(){
    validateEmail(inputEmail.value);
})

function validateEmail(term){
    let regex=/^[a-zA-Z]+(\.?[a-zA-Z\d]+)*@[a-zA-Z]+\.[a-zA-Z]{2,}$/g;
    if(regex.test(term)){
        $("#wrongEmail").css({'display':'none'});
        return true;
    }
    else{
        $("#wrongEmail").css({'display':'block'})
        return false;
    }
}


inputPhone.addEventListener('input',function(){
    validatePhone(inputPhone.value);
})

function validatePhone(term){
    let regex=/^(\+\d{1,2})?\d{11}$/g;
    if(regex.test(term)){
        $("#wrongPhone").css({'display':'none'});
        return true;
    }
    else{
        $("#wrongPhone").css({'display':'block'})
        return false;
    }
}


inputAge.addEventListener('input',function(){
    validateAge(inputAge.value);
})

function validateAge(term){
    let regex=/^[1-9](\d{0,2})$/g;
    if(regex.test(term)){
        $("#wrongAge").css({'display':'none'});
        return true;
    }
    else{
        $("#wrongAge").css({'display':'block'})
        return false;
    }
}


inputPassword.addEventListener('input',function(){
    validatePassword(inputPassword.value);
})

function validatePassword(term){
    let regex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    if(regex.test(term)){
        $("#wrongPassword").css({'display':'none'});
        return true;
    }
    else{
        $("#wrongPassword").css({'display':'block'})
        return false;
    }
}


inputRePassword.addEventListener('input',function(){
    validateRePassword(inputRePassword.value);
})



function validateRePassword(term){
    if(term==inputPassword.value){
        $("#wrongRePassword").css({'display':'none'});
        return true;
    }
    else{
        $("#wrongRePassword").css({'display':'block'})
        return false;
    }
}

function checkNotEmpty(){
    if(inputName.value !="" && inputEmail.value != "" && inputPhone.value !="" && inputAge.value !="" &&
    inputPassword.value !="" && inputRePassword.value !=""){

        return true;
    }
}


$("#showContact input").keyup(function(){
    if(checkNotEmpty()==true){
        toggleButton();
    }
})

function toggleButton(){
    if( validateName(inputName.value) && validateEmail(inputEmail.value) && validatePhone(inputPhone.value)
     && validateAge(inputAge.value) && validatePassword(inputPassword.value) &&
    validateRePassword(inputRePassword.value) ){
        $("#submitBtn").attr("disabled",false);
    }
    else{
        $("#submitBtn").attr("disabled", true)
    }
}




