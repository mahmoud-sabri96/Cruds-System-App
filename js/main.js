// =======>>> Getting our Dom Element
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submitBtn = document.getElementById("submit");

let search = document.getElementById("search");
let searchTitleBtn = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let updateBtn = document.getElementById("update");
let deleteBtn = document.getElementById("delete");

let deleteAllBtn = document.querySelector('.deleteall');

let pricesInputs = document.querySelectorAll(".price input");

// variable helps in our update function
let mood = "create";


//get total
pricesInputs.forEach(function (input) {
    input.addEventListener("keyup", function () {
        getTotal();
    });
});

let productsDB;
if (localStorage.getItem("productsDB")) {
    // productsDB = JSON.parse(localStorage.productsDB);
    productsDB = JSON.parse(localStorage.getItem("productsDB"));
} else {
    productsDB = [];
};

//trigger showData function 
showData();

//=================================>>>> Create Feature <<<<==============================

// ###### Create events #####
submitBtn.addEventListener("click", createProduct);

function createProduct() {
    if (title.value != '' && price.value != '' && category.value != '' && count.value <= 100) {

        let newProduct = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase(),
        };

        if (mood === "create") {

            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    productsDB.push(newProduct);
                }
            } else {
                productsDB.push(newProduct);
            }

        } else if (mood === "update") {
            productsDB[tmp] = newProduct;  // to edit the product
            submitBtn.innerHTML = "Create";
            submitBtn.style.backgroundColor = "#390053";
            count.style.display = "block";
        }

        // let productsDB = JSON.stringify(productsDB);
        localStorage.setItem("productsDB", JSON.stringify(productsDB));
        clearInput();
        showData();
    }
};

//==================================>>>>@@ Delete Feature @@<<<<===============================

// The Implementation Of Function which Delete item  
function deleteItem(i) {
    productsDB.splice(i, 1);
    localStorage.productsDB = JSON.stringify(productsDB);
    showData();
    if (productsDB.length <= 0) {
        deleteAllBtn.style.display = "none";
        localStorage.clear();
    }
};

// ###### DeleteAll events #####
deleteAllBtn.onclick = deleteAll;

// The Implementation Of Function which Delete All item  
function deleteAll() {
    deleteAllBtn.style.display = "none";
    localStorage.clear();
    productsDB.splice(0);
    showData();
};

//==================================>>>>@@ Update Feature @@<<<<===============================

let tmp;
// The Implementation Of Function which Update item  
function updateProduct(i) {
    title.value = productsDB[i].title;
    price.value = productsDB[i].price;
    taxes.value = productsDB[i].taxes;
    ads.value = productsDB[i].ads;
    discount.value = productsDB[i].discount;
    getTotal();
    count.style.display = "none"
    category.value = productsDB[i].category;
    submitBtn.innerHTML = "Update";
    submitBtn.style.backgroundColor = "#09c";
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    });
};

//==================================>>>>@@ Search Feature @@<<<<===============================
let searchMood = "title";

// ###### search events #####
searchTitleBtn.onclick = function () {
    searchMood = "title";
    search.placeholder = " Search By Title";
    search.focus();
    search.value = "";
    showData();
};

searchCategory.onclick = function () {
    searchMood = "category";
    search.placeholder = " Search By Category ";
    search.focus();
    search.value = "";
    showData();
};

search.onkeyup = searchTitle;

search.onblur = function () {
    searchMood = "title";
    search.placeholder = "Search";
};

// The Implementation Of Function of Searching for item  
function searchTitle() {
    let table = '';
    if (searchMood == "title") {
        for (let i = 0; i < productsDB.length; i++) {
            if (productsDB[i].title.includes(search.value.toLowerCase())) {
                table += `
                <tr>
                <td>${i + 1}</td>
                <td >${productsDB[i].title}</td>
                <td class="price">${productsDB[i].price}</td>
                <td class="taxes">${productsDB[i].taxes}</td>
                <td class="ads">${productsDB[i].ads}</td>
                <td class="discount">${productsDB[i].discount}</td>
                <td>${productsDB[i].total}</td>
                <td>${productsDB[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update"><i class="fa-regular fa-pen-to-square"></i></button></td>
                <td><button onclick="deleteItem(${i})" id="delete"><i class="fa-solid fa-trash-can"></i></button></td>
                </tr>
                `
            };
            document.getElementById("tbody").innerHTML = table;
        };
    } else {
        for (let i = 0; i < productsDB.length; i++) {
            if (productsDB[i].category.includes(search.value.toLowerCase())) {
                table += `
                <tr>
                <td>${i + 1}</td>
                <td ">${productsDB[i].title}</td>
                <td class="price">${productsDB[i].price}</td>
                <td class="taxes">${productsDB[i].taxes}</td>
                <td class="ads">${productsDB[i].ads}</td>
                <td class="discount">${productsDB[i].discount}</td>
                <td>${productsDB[i].total}</td>
                <td>${productsDB[i].category} </td>
                <td><button onclick="updateProduct(${i})" id="update"><i class="fa-regular fa-pen-to-square"></i></button></td>
                <td><button onclick="deleteItem(${i})" id="delete"><i class="fa-solid fa-trash-can"></i></button></td>
                </tr>
                `
            };
            document.getElementById("tbody").innerHTML = table;
        };
    };
};

//==================================>>>>@@ General Function @@<<<<===============================

// The Implementation Of Function which Displaying Data In Our UI 
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < productsDB.length; i++) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${productsDB[i].title}</td>
        <td class="price">${productsDB[i].price}</td>
        <td class="taxes">${productsDB[i].taxes}</td>
        <td class="ads">${productsDB[i].ads}</td>
        <td class="discount">${productsDB[i].discount}</td>
        <td >${productsDB[i].total}</td>
        <td>${productsDB[i].category}</td>
        <td><button onclick="updateProduct(${i})" id="update"><i class="fa-regular fa-pen-to-square"></i></button></td>
        <td><button onclick="deleteItem(${i})" id="delete"><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
        `
    };
    document.getElementById("tbody").innerHTML = table;
    // Showning DeleteAllBTn
    if (productsDB.length > 0) {
        deleteAllBtn.style.display = "block";
        deleteAllBtn.innerHTML = `Delete All  (${productsDB.length}) Item`
    };
};

// The implementation Of Function Which Calculate total Price
function getTotal() {
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#080"
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "#a00d02";
    };
};

// The Implementation Of Function which Clear Inputs after Creation 
function clearInput() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
};
