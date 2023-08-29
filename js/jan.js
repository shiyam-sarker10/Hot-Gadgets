const loadHandler = async (searchText) =>{
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await res.json()
    const phone = data.data
    phoneLoop(phone); 
    
}
const phoneLoop = (phones) =>{
    const phoneContainer = document.getElementById("phone-container");

    
    phoneContainer.innerHTML= " "
    const btnDiv = document.getElementById("btn-div");
    const noResult = document.getElementById("no-result");


        if (phones.length > 9) {
          btnDiv.classList.remove("hidden");
        }
        else{
          btnDiv.classList.add("hidden");
        }

    
    phones = phones.slice(0,9)

    if (phones.length === 0) {
      noResult.classList.remove("hidden");
    } else {
      noResult.classList.add("hidden");
    }
    
    phones.forEach(phone => {
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
    loadingSpinner();
    
}
const handleSearch = (target) =>{
  loadingSpinner(true)
  const inputValue = target.parentNode.childNodes[1].value
  loadHandler(inputValue)

}
const loadingSpinner = (isLoading) => {
  const spinner = document.getElementById("loading-spinner");
  if(isLoading){
    spinner.classList.remove("hidden");
  }
  else{
    spinner.classList.add("hidden");
  }
}
const handleShowDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const showDetails = data.data
  showModal(showDetails)

   
}
const showModal = (phoneDetails) => {
  show_Details.showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <div class="modal-action justify-start -mt-4 -ml-4">
        <!-- if there is a button in form, it will close the modal -->
        <button  class="btn rounded-[50%]  text-black p-4">X</button>
    </div>
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
    
  `;
};
