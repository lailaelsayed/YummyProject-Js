$(document).ready(function () {
    $('.loading').css('display','none');
    $('body').css('overflow','auto');
    $('ul .link').css('top','200px');
    $('ul .link').css('display','none');
 

    let innerWidth = $('.left-side').innerWidth();
    $('.side-nav').css('left', -innerWidth);
    $('.openNav').click(function(){
        if($('.side-nav').css('left') == `-${innerWidth}px`){
            $('.side-nav').animate({left:'0px'},500 ,function(){
                $('.s').css('display','block');
                $('.s').animate({top:'0px'},function(){
                    $('.c').css('display','block');
                });
                $('.c').animate({top:'0px'},500 ,function(){
                    $('.a').css('display','block');
                });
                $('.a').animate({top:'0px'},700 ,function(){
                    $('.i').css('display','block');
                })
                $('.i').animate({top:'0px'},900 ,function(){
                    $('.co').css('display','block');
                });
                $('.co').animate({top:'0px'})
            });
            $('.openNav').removeClass('fa-indent')
            $('.openNav').addClass('fa-xmark')
        }
        else{
            $('ul .link').animate({top:'150px'},function(){
                $('ul .link').css('display','none') })
            $('.side-nav').animate({left:`-${innerWidth}px`},500)
            $('.openNav').removeClass('fa-xmark',200)
            $('.openNav').addClass('fa-indent',200)
        }
    })

    //home
    let response =[]

    async function getMeal(){
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        let finalResponse = await response.json();
        console.log(finalResponse.meals);
        await displayMeal(finalResponse.meals)
    }
    if(location.href.endsWith('index.html')){
        getMeal()
    }
       
      
    
    async function displayMeal(arr){
        let cartona =``;
        for(var i = 0 ; i < arr.length ; i++){
            cartona += `<div class="col-md-3">
            <div class="meal position-relative rounded-2 overflow-hidden" attId="${arr[i].idMeal}">
                <img src=${arr[i].strMealThumb} class="w-100" alt="" attId="${arr[i].idMeal}">
                <div attId="${arr[i].idMeal}" class="layer position-absolute d-flex align-items-center text-black p-2 " >
                    <h3 attId="${arr[i].idMeal}">${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>`
        }
        document.getElementById('mealData').innerHTML = cartona;
        getId()
    }

 function getId(){
        $('.meal').click(function(e){
            $('.loading').css('display','flex');
            $('body').css('overflow','hidden');
            setTimeout(()=>{
               $('.loading').css('display','none');
               $('body').css('overflow','auto');
               $('.home').css('display','none');
               document.getElementById('details').classList.remove('d-none');
            },500)
           let idatt = $(e.target).attr('attId');
           async function test(){
            await getDetails(idatt)
           }
           test();
        })
       

    }
    async function getDetails(idatt){
        let responceDetail = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idatt}`)
        let finalResponseDetail = await responceDetail.json();
        await displayDetails(finalResponseDetail.meals)
        
    }
  
    async function displayDetails(arr){
        document.querySelector('#details .row').innerHTML = `
        <div class="col-md-4">
        <img src=${arr[0].strMealThumb} class="w-100 rounded-2" alt="">
        <h2>${arr[0].strMeal}</h2>
        </div>
        <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${arr[0].strInstructions}</p>
        <h3>
            <span class="fw-bolder">Area : </span>
            ${arr[0].strArea}
        </h3>
        <h3>
            <span class="fw-bolder">Category : </span>
            ${arr[0].strCategory}
        </h3>
        <h3>Recipes :</h3>
        <ul class="list-recipes list-unstyled d-flex flex-wrap ">
 
        </ul>
        <h3>Tags :</h3>
        <ul class="list-Tags list-unstyled">
            
        </ul>
        <a href=${arr[0].strSource} target="_blank" class="btn btn-success">Source</a>
        <a href=${arr[0].strYoutube} target="_blank" class="btn btn-danger">Youtube</a>
    </div>
        `
     let tags = arr[0].strTags
     if(tags != null){
        let arrTags = tags.split(',')
        // console.log(arrTags)
        for(var i = 0 ; i<arrTags.length ; i++){
            var li = document.createElement('li');
            li.classList.add('badge')
            li.classList.add('m-2')
            li.classList.add('p-2')
            li.style.backgroundColor = '#F8D7DA'
            li.style.color = '#932029'
            li.style.fontSize = '16px'
            document.querySelector('.list-Tags').appendChild(li);
            var text = document.createTextNode(arrTags[i]);
            li.appendChild(text);       
        }   
     }
     
     console.log(arr[0])
    for(let i =0 ; i<=20 ;i++){
        // console.log(arr[0][`strIngredient${i}`])
        if(arr[0][`strIngredient${i}`] != undefined && arr[0][`strIngredient${i}`] != ''){
            console.log(arr[0][`strIngredient${i}`])
            var li = document.createElement('li');
            li.classList.add('badge')
            li.classList.add('m-2')
            li.classList.add('p-2')
            li.style.backgroundColor = '#CFF4FC'
            li.style.color = '#000'
            li.style.fontSize = '16px'
            document.querySelector('.list-recipes').appendChild(li);
            var text = document.createTextNode(arr[0][`strMeasure${i}`] + ' ' + arr[0][`strIngredient${i}`]);
            li.appendChild(text); 
            

        }
  
    }


    }

    // search navSide
    $('.s').click(function(){
        location.href= "search.html"; 
        $('ul .link').animate({top:'150px'},function(){
            $('ul .link').css('display','none') })
        $('.side-nav').animate({left:`-${innerWidth}px`},500)
        $('.openNav').removeClass('fa-xmark',200)
        $('.openNav').addClass('fa-indent',200)
  
 
    })
 
    

    if(location.href.endsWith('search.html')){
        document.getElementById('firstL').addEventListener('input',function(){
            if(this.value != ''){
                getApi(this.value)
                console.log(this.value)

            }
            
        })
        document.getElementById('fullName').addEventListener('input',function(){
            if(this.value != ''){
                getApiFullName(this.value)
                console.log(this.value)

            }
            
        })
    }
    async function getApi(val){
        let responseApi =await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`)
        let newResponse = await responseApi.json();
        console.log(newResponse)
  
        if(newResponse.meals != null){
            
            await displaySearch(newResponse.meals)
        }
    }
    async function getApiFullName(val){
        let responseApi =await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
        let newResponse = await responseApi.json();
        console.log(newResponse)
  
        if(newResponse.meals != null){
            
            await displaySearch(newResponse.meals)
        }
    }
    async function displaySearch(arr){
        let cartona =``;
        for(var i = 0 ; i < arr.length ; i++){
            cartona += `<div class="col-md-3">
            <div class="meal position-relative rounded-2 overflow-hidden" attId="${arr[i].idMeal}">
                <img src=${arr[i].strMealThumb} class="w-100" alt="" attId="${arr[i].idMeal}">
                <div attId="${arr[i].idMeal}" class="layer position-absolute d-flex align-items-center text-black p-2 " >
                    <h3 attId="${arr[i].idMeal}">${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>`
        }
        document.getElementById('mealSearch').innerHTML = cartona;
        getIdMeal()
        
    }
    function getIdMeal(){
        $('.meal').click(function(e){
            $('.loading').css('display','flex');
            $('body').css('overflow','hidden');
            setTimeout(()=>{
               $('.loading').css('display','none');
               $('body').css('overflow','auto');
               $('#search').css('display','none');
               document.getElementById('searchdetails').classList.remove('d-none');
            },500)
           let idatt = $(e.target).attr('attId');
           console.log(idatt);
           async function test(){
            await getApiDetails(idatt)
           }
           test();
           
        })
       

    }


    async function getApiDetails(idatt){
        let responseDetail = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idatt}`)
        let finalResponseDetail = await responseDetail.json();
        await searchDetails(finalResponseDetail.meals)
        
    }
  
    async function searchDetails(arr){
        document.querySelector('#searchdetails .row').innerHTML = `
        <div class="col-md-4">
        <img src=${arr[0].strMealThumb} class="w-100 rounded-2" alt="">
        <h2>${arr[0].strMeal}</h2>
        </div>
        <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${arr[0].strInstructions}</p>
        <h3>
            <span class="fw-bolder">Area : </span>
            ${arr[0].strArea}
        </h3>
        <h3>
            <span class="fw-bolder">Category : </span>
            ${arr[0].strCategory}
        </h3>
        <h3>Recipes :</h3>
        <ul class="list-recipes list-unstyled d-flex flex-wrap ">
            
        </ul>
        <h3>Tags :</h3>
        <ul class="list-Tags list-unstyled">
            
        </ul>
        <a href=${arr[0].strSource} target="_blank" class="btn btn-success">Source</a>
        <a href=${arr[0].strYoutube} target="_blank" class="btn btn-danger">Youtube</a>
    </div>
        `
     let tags = arr[0].strTags
     if(tags != null){
        let arrTags = tags.split(',')
        // console.log(arrTags)
        for(var i = 0 ; i<arrTags.length ; i++){
            var li = document.createElement('li');
            li.classList.add('badge')
            li.classList.add('m-2')
            li.classList.add('p-2')
            li.style.backgroundColor = '#F8D7DA'
            li.style.color = '#932029'
            li.style.fontSize = '16px'
            document.querySelector('.list-Tags').appendChild(li);
            var text = document.createTextNode(arrTags[i]);
            li.appendChild(text);       
        }   
     }

     for(let i =0 ; i<=20 ;i++){
        // console.log(arr[0][`strIngredient${i}`])
        if(arr[0][`strIngredient${i}`] != undefined && arr[0][`strIngredient${i}`] != ''){
            console.log(arr[0][`strIngredient${i}`])
            var li = document.createElement('li');
            li.classList.add('badge')
            li.classList.add('m-2')
            li.classList.add('p-2')
            li.style.backgroundColor = '#CFF4FC'
            li.style.color = '#000'
            li.style.fontSize = '16px'
            document.querySelector('.list-recipes').appendChild(li);
            var text = document.createTextNode(arr[0][`strMeasure${i}`] + ' ' + arr[0][`strIngredient${i}`]);
            li.appendChild(text); 
            

        }
    }
}



    // category navSide
    $('.c').click(function(){
        location.href= "category.html"; 
        $('ul .link').animate({top:'150px'},function(){
            $('ul .link').css('display','none') })
        $('.side-nav').animate({left:`-${innerWidth}px`},500)
        $('.openNav').removeClass('fa-xmark',200)
        $('.openNav').addClass('fa-indent',200);
        
    })
    if(location.href.endsWith('category.html')){
        getCategory();

    }
    async function getCategory(){
        let responseApi =await fetch (`https://www.themealdb.com/api/json/v1/1/categories.php`)
        let newResponse = await responseApi.json();
        console.log(newResponse.categories)
        await displayCategory(newResponse.categories)
    }
    async function displayCategory(arr){
        let cartona =``;
        for(var i = 0 ; i < arr.length ; i++){
            cartona += `<div class="col-md-3">
            <div class="meal position-relative rounded-2 overflow-hidden" attId="${arr[i].strCategory}">
                <img src=${arr[i].strCategoryThumb} class="w-100" alt="" attId="${arr[i].strCategory}">
                <div attId="${arr[i].strCategory}" class="layer position-absolute d-flex flex-column align-items-center text-black p-2 " >
                    <h3 attId="${arr[i].strCategory}">${arr[i].strCategory}</h3>
                    <p attId="${arr[i].strCategory}">${arr[i].strCategoryDescription.slice(0,100)}</p>
                </div>
            </div>
        </div>`
        }
        document.getElementById('mealCategory').innerHTML = cartona;
        getName()

    }
     function getName(){
        $('.meal').click(function(e){
           let Name = $(e.target).attr('attId');
           async function test(){
            await fetchApiCategory(Name)
           }
           test();
        })
    }
    async function fetchApiCategory(val){
        let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${val}`)
        let y = await x.json();
        showDetailsCategory(y.meals)  
        console.log(y.meals)
    }
    function showDetailsCategory(arr){
        let cartona =``;
        for(var i = 0 ; i < arr.length ; i++){
            cartona += `<div class="col-md-3">
            <div class="meal position-relative rounded-2 overflow-hidden" attId="${arr[i].idMeal}">
                <img src=${arr[i].strMealThumb} class="w-100" alt="" attId="${arr[i].idMeal}">
                <div attId="${arr[i].idMeal}" class="layer position-absolute d-flex  align-items-center text-black smaller" >
                    <h3 attId="${arr[i].idMeal}">${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>`
        }
        document.getElementById('mealCategory').innerHTML = cartona;
        getIdMealCategory()
    }

    function getIdMealCategory(){
        $('.meal').click(function(e){
            $('.loading').css('display','flex');
            $('body').css('overflow','hidden');
            setTimeout(()=>{
               $('.loading').css('display','none');
               $('body').css('overflow','auto');
               document.getElementById('category').classList.add('d-none')
               document.getElementById('categorydetails').classList.remove('d-none');
            },500)
           let idatt = $(e.target).attr('attId');
           console.log(idatt);
           async function test(){
            await getidCategory(idatt)
           }
           test();
           
        })
    }
    async function getidCategory(idatt){
        let responseDetail = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idatt}`)
        let finalResponseDetail = await responseDetail.json();
        await  getDetailsCategory(finalResponseDetail.meals)
        
    }
    async function getDetailsCategory(arr){
        document.querySelector('#categorydetails .row').innerHTML = `
        <div class="col-md-4">
        <img src=${arr[0].strMealThumb} class="w-100 rounded-2" alt="">
        <h2>${arr[0].strMeal}</h2>
        </div>
        <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${arr[0].strInstructions}</p>
        <h3>
            <span class="fw-bolder">Area : </span>
            ${arr[0].strArea}
        </h3>
        <h3>
            <span class="fw-bolder">Category : </span>
            ${arr[0].strCategory}
        </h3>
        <h3>Recipes :</h3>
        <ul class="list-recipes list-unstyled d-flex flex-wrap ">
            
        </ul>
        <h3>Tags :</h3>
        <ul class="list-Tags list-unstyled">
            
        </ul>
        <a href=${arr[0].strSource} target="_blank" class="btn btn-success">Source</a>
        <a href=${arr[0].strYoutube} target="_blank" class="btn btn-danger">Youtube</a>
    </div>
        `
     let tags = arr[0].strTags
     if(tags != null){
        let arrTags = tags.split(',')
        // console.log(arrTags)
        for(var i = 0 ; i<arrTags.length ; i++){
            var li = document.createElement('li');
            li.classList.add('badge')
            li.classList.add('m-2')
            li.classList.add('p-2')
            li.style.backgroundColor = '#F8D7DA'
            li.style.color = '#932029'
            li.style.fontSize = '16px'
            document.querySelector('.list-Tags').appendChild(li);
            var text = document.createTextNode(arrTags[i]);
            li.appendChild(text);       
        }   
     }

     for(let i =0 ; i<=20 ;i++){
        // console.log(arr[0][`strIngredient${i}`])
        if(arr[0][`strIngredient${i}`] != undefined && arr[0][`strIngredient${i}`] != ''){
            console.log(arr[0][`strIngredient${i}`])
            var li = document.createElement('li');
            li.classList.add('badge')
            li.classList.add('m-2')
            li.classList.add('p-2')
            li.style.backgroundColor = '#CFF4FC'
            li.style.color = '#000'
            li.style.fontSize = '16px'
            document.querySelector('.list-recipes').appendChild(li);
            var text = document.createTextNode(arr[0][`strMeasure${i}`] + ' ' + arr[0][`strIngredient${i}`]);
            li.appendChild(text); 
            

        }
    }

    }




    //Area
    $('.a').click(function(){
        location.href= "Area.html"; 

        $('ul .link').animate({top:'150px'},function(){
            $('ul .link').css('display','none') })
        $('.side-nav').animate({left:`-${innerWidth}px`},500)
        $('.openNav').removeClass('fa-xmark',200)
        $('.openNav').addClass('fa-indent',200) 
    })
    if(location.href.endsWith('Area.html')){
        getAreaName();

    }
    async function  getAreaName(){
        let responseApi =await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        let newResponse = await responseApi.json();
        console.log(newResponse.meals)
        await displayAreaName(newResponse.meals)
    }
    async function displayAreaName(arr){
        let cartona =``;
        for(var i = 0 ; i < arr.length ; i++){
            cartona += `<div class="col-md-3" attName="${arr[i].strArea}">
            <div attName="${arr[i].strArea}" class="country  rounded-2 overflow-hidden">
            <i attName="${arr[i].strArea}" class="fa-solid fa-house-laptop fa-4x"></i>
            <h3 attName="${arr[i].strArea}" >${arr[i].strArea}</h3>
            </div>
        </div>` 
        }
        document.getElementById('AreaData').innerHTML = cartona;
        getNamecountry()
    }
    function getNamecountry(){
        $('.country').click(function(e){
            let Name = $(e.target).attr('attName');
            async function test(){
             await fetchApi(Name)
            }
            test();
         })
     }
    
     async function fetchApi(val){
         let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${val}`)
         let y = await x.json();
         showAreaMeals(y.meals)  
         console.log(y.meals)
     }


    function showAreaMeals(arr){
        let cartona =``;
        for(var i = 0 ; i < arr.length ; i++){
            cartona += `<div class="col-md-3">
            <div class="meal position-relative rounded-2 overflow-hidden" attId="${arr[i].idMeal}">
                <img src=${arr[i].strMealThumb} class="w-100" alt="" attId="${arr[i].idMeal}">
                <div attId="${arr[i].idMeal}" class="layer position-absolute d-flex  align-items-center text-black smaller" >
                    <h3 attId="${arr[i].idMeal}">${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>`
        }
        document.getElementById('AreaData').innerHTML = cartona;
        getIdArea()

    }

    function getIdArea(){
        $('.meal').click(function(e){
            $('.loading').css('display','flex');
            $('body').css('overflow','hidden');
            setTimeout(()=>{
               $('.loading').css('display','none');
               $('body').css('overflow','auto');
               document.getElementById('Area').classList.add('d-none')
               document.getElementById('categorydetails').classList.remove('d-none');
            },500)
           let idatt = $(e.target).attr('attId');
           console.log(idatt);
           async function test(){
            await getidcountry(idatt)
           }
           test();
           
        })
    }
    async function getidcountry(idatt){
        let responseDetail = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idatt}`)
        let finalResponseDetail = await responseDetail.json();
        await  getDetailsArea(finalResponseDetail.meals)
        
    }
    async function getDetailsArea(arr){
        document.querySelector('#categorydetails .row').innerHTML = `
        <div class="col-md-4">
        <img src=${arr[0].strMealThumb} class="w-100 rounded-2" alt="">
        <h2>${arr[0].strMeal}</h2>
        </div>
        <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${arr[0].strInstructions}</p>
        <h3>
            <span class="fw-bolder">Area : </span>
            ${arr[0].strArea}
        </h3>
        <h3>
            <span class="fw-bolder">Category : </span>
            ${arr[0].strCategory}
        </h3>
        <h3>Recipes :</h3>
        <ul class="list-recipes list-unstyled d-flex flex-wrap ">
            
        </ul>
        <h3>Tags :</h3>
        <ul class="list-Tags list-unstyled">
            
        </ul>
        <a href=${arr[0].strSource} target="_blank" class="btn btn-success">Source</a>
        <a href=${arr[0].strYoutube} target="_blank" class="btn btn-danger">Youtube</a>
    </div>
        `
     let tags = arr[0].strTags
     if(tags != null){
        let arrTags = tags.split(',')
        // console.log(arrTags)
        for(var i = 0 ; i<arrTags.length ; i++){
            var li = document.createElement('li');
            li.classList.add('badge')
            li.classList.add('m-2')
            li.classList.add('p-2')
            li.style.backgroundColor = '#F8D7DA'
            li.style.color = '#932029'
            li.style.fontSize = '16px'
            document.querySelector('.list-Tags').appendChild(li);
            var text = document.createTextNode(arrTags[i]);
            li.appendChild(text);       
        }   
     }
     for(let i =0 ; i<=20 ;i++){
        // console.log(arr[0][`strIngredient${i}`])
        if(arr[0][`strIngredient${i}`] != undefined && arr[0][`strIngredient${i}`] != ''){
            console.log(arr[0][`strIngredient${i}`])
            var li = document.createElement('li');
            li.classList.add('badge')
            li.classList.add('m-2')
            li.classList.add('p-2')
            li.style.backgroundColor = '#CFF4FC'
            li.style.color = '#000'
            li.style.fontSize = '16px'
            document.querySelector('.list-recipes').appendChild(li);
            var text = document.createTextNode(arr[0][`strMeasure${i}`] + ' ' + arr[0][`strIngredient${i}`]);
            li.appendChild(text); 
            

        }
    }

    }



    //igredient
    $('.i').click(function(){
        location.href= "ingredients.html"; 
        $('ul .link').animate({top:'150px'},function(){
            $('ul .link').css('display','none') })
        $('.side-nav').animate({left:`-${innerWidth}px`},500)
        $('.openNav').removeClass('fa-xmark',200)
        $('.openNav').addClass('fa-indent',200) 
    })
    if(location.href.endsWith('ingredients.html')){
        getmealName();
    }

    async function getmealName(){
        let responseApi =await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        let newResponse = await responseApi.json();
        console.log(newResponse.meals)
        await displaymealName(newResponse.meals)
    }

    async function displaymealName(arr){
        let cartona =``;
        for(var i = 0 ; i < 20 ; i++){
            cartona += `<div class="col-md-3" attName="${arr[i].strIngredient}">
            <div class="ingredient text-center rounded-2 overflow-hidden" attName="${arr[i].strIngredient}">
                <i class="fa-solid fa-drumstick-bite fa-4x" attName="${arr[i].strIngredient}"></i>
                <h3 attName="${arr[i].strIngredient}">${arr[i].strIngredient}</h3>
                <p attName="${arr[i].strIngredient}">${arr[i].strDescription.slice(0,109)}</p>
                
            </div>
        </div>`
        }
        document.getElementById('ingredientData').innerHTML = cartona;
        getStrIngredients()
    }
    function getStrIngredients(){
        $('.ingredient').click(function(e){
            let Name = $(e.target).attr('attName');
            async function test(){
             await fetchApiIngredient(Name)
            }
            test();
         })
     }
    async function fetchApiIngredient(val){
        let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${val}`)
        let y = await x.json();
        showingredient(y.meals) 
        console.log(y.meals)
    }

    function showingredient(arr){
        let cartona =``;
        for(var i = 0 ; i < arr.length ; i++){
            cartona += `<div class="col-md-3">
            <div class="meal position-relative rounded-2 overflow-hidden" attId="${arr[i].idMeal}">
                <img src=${arr[i].strMealThumb} class="w-100" alt="" attId="${arr[i].idMeal}">
                <div attId="${arr[i].idMeal}" class="layer position-absolute d-flex  align-items-center text-black smaller" >
                    <h3 attId="${arr[i].idMeal}">${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>`
        }
        document.getElementById('ingredientData').innerHTML = cartona;
      getIdIngredient()

    }
    function getIdIngredient(){
        $('.meal').click(function(e){
            $('.loading').css('display','flex');
            $('body').css('overflow','hidden');
            setTimeout(()=>{
            $('.loading').css('display','none');
            $('body').css('overflow','auto');
            document.getElementById('ingredient').classList.add('d-none')
            document.getElementById('ingredientdetails').classList.remove('d-none');
            },500)
        let idatt = $(e.target).attr('attId');
        console.log(idatt);
        async function test(){
            await getidingredient(idatt)
        }
        test();
        
        })
}
    async function getidingredient(idatt){
        let responseDetail = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idatt}`)
        let finalResponseDetail = await responseDetail.json();
        await  getDetailsingredient(finalResponseDetail.meals)
        
    }

    async function  getDetailsingredient(arr){
        document.querySelector('#ingredientdetails .row').innerHTML = `
        <div class="col-md-4">
        <img src=${arr[0].strMealThumb} class="w-100 rounded-2" alt="">
        <h2>${arr[0].strMeal}</h2>
        </div>
        <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${arr[0].strInstructions}</p>
        <h3>
            <span class="fw-bolder">Area : </span>
            ${arr[0].strArea}
        </h3>
        <h3>
            <span class="fw-bolder">Category : </span>
            ${arr[0].strCategory}
        </h3>
        <h3>Recipes :</h3>
        <ul class="list-recipes list-unstyled d-flex flex-wrap ">
            
        </ul>
        <h3>Tags :</h3>
        <ul class="list-Tags list-unstyled">
            
        </ul>
        <a href=${arr[0].strSource} target="_blank" class="btn btn-success">Source</a>
        <a href=${arr[0].strYoutube} target="_blank" class="btn btn-danger">Youtube</a>
    </div>
        `


        let tags = arr[0].strTags
        if(tags != null){
           let arrTags = tags.split(',')
           // console.log(arrTags)
           for(var i = 0 ; i<arrTags.length ; i++){
               var li = document.createElement('li');
               li.classList.add('badge')
               li.classList.add('m-2')
               li.classList.add('p-2')
               li.style.backgroundColor = '#F8D7DA'
               li.style.color = '#932029'
               li.style.fontSize = '16px'
               document.querySelector('.list-Tags').appendChild(li);
               var text = document.createTextNode(arrTags[i]);
               li.appendChild(text);       
           }   
        }
        for(let i =0 ; i<=20 ;i++){
           // console.log(arr[0][`strIngredient${i}`])
           if(arr[0][`strIngredient${i}`] != undefined && arr[0][`strIngredient${i}`] != ''){
               console.log(arr[0][`strIngredient${i}`])
               var li = document.createElement('li');
               li.classList.add('badge')
               li.classList.add('m-2')
               li.classList.add('p-2')
               li.style.backgroundColor = '#CFF4FC'
               li.style.color = '#000'
               li.style.fontSize = '16px'
               document.querySelector('.list-recipes').appendChild(li);
               var text = document.createTextNode(arr[0][`strMeasure${i}`] + ' ' + arr[0][`strIngredient${i}`]);
               li.appendChild(text); 
               
   
           }

        }
    }



    //validation & contact

    $('.co').click(function(){
        location.href= "contact.html"; 
        $('ul .link').animate({top:'150px'},function(){
            $('ul .link').css('display','none') })
        $('.side-nav').animate({left:`-${innerWidth}px`},500)
        $('.openNav').removeClass('fa-xmark',200)
        $('.openNav').addClass('fa-indent',200) 
    })
    
       let name = document.getElementById('nameInput')
       let email = document.getElementById('emailInput')
       let phone = document.getElementById('phoneInput')
       let age = document.getElementById('ageInput')
       let password = document.getElementById('passwordInput')
       let re = document.getElementById('repasswordInput')
       let regexName = /^[a-zA-Z]{1,}$/ 
       let regexEmail = /\S@[a-zA-z]+\.[a-zA-Z]+/
       let regexPhone = /^(002){0,1}01[0125][0-9]{8}$/
       let regexAge = /^\d{1,}$/
       let regexPassword = /(?=.*[0-9])\w{8,}/
     
       if(location.href.endsWith('contact.html')){
            $('#nameInput').keyup(validationName)
            $('#emailInput').keyup(validationEmail)
            $('#phoneInput').keyup(validationphone)
            $('#ageInput').keyup(validationage)
            $('#passwordInput').keyup(validationPassword)
            $('#repasswordInput').keyup(validationRePassword)
          
       }
 

       function validationName(){
        if( regexName.test(name.value) == true){
            document.getElementById('nameDiv').classList.add('d-none')
        }
        else{
            document.getElementById('nameDiv').classList.remove('d-none')
            
        }
        }
        function validationEmail(){
            if( regexEmail.test(email.value) == true){
                document.getElementById('emailDiv').classList.add('d-none')
              
            }
            else{
                document.getElementById('emailDiv').classList.remove('d-none')
            }
       }
       function validationphone(){
        if( regexPhone.test(phone.value) == true){
            document.getElementById('phoneDiv').classList.add('d-none')
        
        }
        else{
            document.getElementById('phoneDiv').classList.remove('d-none')
          
        }
        }
        function validationage(){
            if(regexAge.test(age.value) == true){
                document.getElementById('ageDiv').classList.add('d-none')
            
            }
            else{
                document.getElementById('ageDiv').classList.remove('d-none')
            }
        }
        function validationPassword(){
            if( regexPassword.test(password.value) == true){
                document.getElementById('passwordDiv').classList.add('d-none')
           
            }
            else{
                document.getElementById('passwordDiv').classList.remove('d-none')
            }
        }
        function validationRePassword(){
            if(password.value == re.value){
                document.getElementById('repasswordDiv').classList.add('d-none')
             
            }
            else{
                document.getElementById('repasswordDiv').classList.remove('d-none')

            }
        }
})


