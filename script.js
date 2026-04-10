<script>
// --- Initialize cart ---
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// --- Update cart counter ---
function updateCartCount(){
    let totalQty = cart.reduce((sum,item)=>sum+item.quantity,0);
    document.getElementById("cart-count").textContent = totalQty;
}

// --- Save cart ---
function saveCart(){
    sessionStorage.setItem("cart",JSON.stringify(cart));
    updateCartCount();
}

// --- Add to cart ---
function addToCart(name, price){
    let existing = cart.find(item=>item.name===name);
    if(existing){
        existing.quantity += 1;
    }else{
        cart.push({name, price, quantity:1});
    }
    saveCart();
    alert(`${name} added to cart!`);
}

// --- Travel plan buttons ---
document.querySelectorAll(".add-to-cart").forEach(btn=>{
    btn.addEventListener("click",()=>{
        addToCart(btn.dataset.name, parseInt(btn.dataset.price));
    });
});

// --- Hotel section ---
const hotels = [
    { name: "Grand Palace Hotel", price: 7500, rating: 5, image: "https://myholidayplans.in/wp-content/uploads/2020/12/Property-Building_1.jpg" },
    { name: "Comfort Inn", price: 4500, rating: 4, image: "https://tse3.mm.bing.net/th/id/OIP.l3y0hoFf9KOwSDB8dBwDhwHaEZ" },
    { name: "City View Lodge", price: 2500, rating: 3, image: "https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2022/10/Summit-Grace-Hotel.jpg" },
    { name: "Royal Heritage Resort", price: 8500, rating: 5, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945" },
    { name: "Mountain Bliss Hotel", price: 3800, rating: 4, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" },
    { name: "Budget Stay Express", price: 1800, rating: 3, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427" }
];

const hotelContainer = document.getElementById("hotelContainer");

// --- Display hotels ---
function displayHotels(list){
    hotelContainer.innerHTML = "";
    if(list.length===0){
        hotelContainer.innerHTML="<p>No hotels found.</p>";
        return;
    }
    list.forEach(hotel=>{
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML=`
            <img src="${hotel.image}" width="128" height="128">
            <h3>${hotel.name}</h3>
            <p>Price: ₹${hotel.price}</p>
            <p>Rating: ${"⭐".repeat(hotel.rating)}</p>
            <button class="add-to-cart-hotel">Add to Cart</button>
        `;
        // Add hotel click listener
        card.querySelector(".add-to-cart-hotel").addEventListener("click",()=>{
            addToCart(hotel.name, hotel.price);
        });
        hotelContainer.appendChild(card);
    });
}

// --- Filters ---
const searchInput = document.getElementById("searchInput");
const priceFilter = document.getElementById("priceFilter");
const ratingFilter = document.getElementById("ratingFilter");

function filterHotels(){
    let filtered = hotels.filter(hotel=>{
        let matchesSearch = hotel.name.toLowerCase().includes(searchInput.value.toLowerCase());
        let matchesPrice = true;
        if(priceFilter.value==="low") matchesPrice = hotel.price<3000;
        else if(priceFilter.value==="mid") matchesPrice = hotel.price>=3000 && hotel.price<=6000;
        else if(priceFilter.value==="high") matchesPrice = hotel.price>6000;
        let matchesRating = ratingFilter.value==="all" || hotel.rating>=parseInt(ratingFilter.value);
        return matchesSearch && matchesPrice && matchesRating;
    });
    displayHotels(filtered);
}

searchInput.addEventListener("keyup",filterHotels);
document.getElementById("searchBtn").addEventListener("click",filterHotels);
priceFilter.addEventListener("change",filterHotels);
ratingFilter.addEventListener("change",filterHotels);

// --- Initial load ---
displayHotels(hotels);
updateCartCount();
</script>
