// tradition way of fetching

// const loadPhone = (searchText) => {
//   fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
//    .then(res => res.json())
//    .then(phones => displayPhones(phones.data))
// //   const phones = data.data;

// };

// const displayPhones = (phones) => {
//     const phoneContainer = document.getElementById('phone-container')
//     phoneContainer.innerHTML =""
//   phones.forEach((phone) => {
//     console.log(phone)
//     const phoneCard = document.createElement("div");
//     phoneCard.classList = `card bg-base-100 shadow-md p-5`;
//     phoneCard.innerHTML = `
//            <figure class="px-10 pt-10 bg-blue-50 bg-opacity-50 p-5 rounded-xl">
//                 <img src="${phone.image}" />
//             </figure>
//             <div class="card-body items-center text-center space-y-4">
//                 <h2 class="card-title font-bold">${phone.phone_name}</h2>
//                 <p class="text-gray-500" >${phone.slug}</p>
//                 <h2 class="card-title font-bold">$999</h2>
//                 <div class="card-actions">
//                     <button class="btn bg-blue-600 hover:bg-blue-600 text-white">Buy Now</button>
//                 </div>
//             </div>
//         `;
//         phoneContainer.appendChild(phoneCard)
//   });
// };

// const handleSearch = (target) => {
//     const inputValue = target.parentNode.childNodes[1].value
//     loadPhone(inputValue)

// }

// Async/Await Approach:

const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {

  const phoneContainer = document.getElementById("phone-container");

//   clear phone container card before adding new card  

  phoneContainer.innerHTML = "";

  const seeBtnContainer = document.getElementById("btn-div");

//   display see all btn if there are more than 12 phone 

  if (phones.length > 12) {
    seeBtnContainer.classList.remove("hidden");
  }
  else{
    seeBtnContainer.classList.add("hidden")
  }

  phones = phones.slice(0, 12);
  if(phones.length === 0 ){
    alert("Result not found")
  }

  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-md p-5`;
    phoneCard.innerHTML = `
           <figure class="px-10 pt-10 bg-blue-50 bg-opacity-50 p-5 rounded-xl">
                <img src="${phone.image}" />
            </figure>
            <div class="card-body items-center text-center space-y-4">
                <h2 class="card-title font-bold">${phone.phone_name}</h2>
                <h2 class="card-title font-semibold">$999</h2>
                <div class="card-actions">
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn bg-blue-600 hover:bg-blue-600 text-white">Buy Now</button>
                </div>
            </div>             
        `;
    phoneContainer.appendChild(phoneCard);
  });
//   spinner off 
  loadingSpinner();

};
// on click on search 
const handleSearch = (target) => {
    // spinner on 
  loadingSpinner(true);  
  const inputValue = target.parentNode.childNodes[1].value;
  loadPhone(inputValue);
};

// spinner function 
const loadingSpinner = (isLoading) => {
    const spinner = document.getElementById("loading-spinner");
    if(isLoading){
        spinner.classList.remove("hidden");
    }else{
        spinner.classList.add("hidden");
    }
}
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phoneDetails = data.data
    
    showDetails(phoneDetails);
} 
const showDetails = (phoneDetails) => {
  show_Details.showModal();
  const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = ` 
    <div class=" flex justify-center">
        <img src="${phoneDetails?.image}" alt="phone">
    </div>
    <h3 class="font-bold text-lg text-center">${phoneDetails?.name}</h3>
    <h5 class="font-bold">Storage:  <span class="font-normal text-gray-500 text-sm">${phoneDetails?.mainFeatures?.storage}</span></h5>
    <h5 class="font-bold">Display Size:  <span class="font-normal text-gray-500 text-sm">${phoneDetails?.mainFeatures?.displaySize}</span></h5>
    <h5 class="font-bold">Chipset:  <span class="font-normal text-gray-500 text-sm">${phoneDetails?.mainFeatures?.chipSet}</span></h5>
    <h5 class="font-bold">Memory:  <span class="font-normal text-gray-500 text-sm">${phoneDetails?.mainFeatures?.memory}</span></h5>
    <h5 class="font-bold">Slug:  <span class="font-normal text-gray-500 text-sm">${phoneDetails?.slug}</span></h5>
    <h5 class="font-bold">Release Date:  <span class="font-normal text-gray-500 text-sm">${phoneDetails.releaseDate}</span></h5>
    <h5 class="font-bold">Brand:  <span class="font-normal text-gray-500 text-sm">${phoneDetails?.brand}</span></h5>
    <h5 class="font-bold">Gps:  <span class="font-normal text-gray-500 text-sm">${phoneDetails?.others?.GPS}</span></h5>
    <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn bg-blue-600 hover:bg-blue-600 text-white">Close</button>
    </div>
  
  `;
  console.log(phoneDetails)
};





