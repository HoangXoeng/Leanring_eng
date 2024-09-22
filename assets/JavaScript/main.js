var modal = document.querySelector('.modal');
var formAdd = document.querySelector('#formAdd');
const showAddModal = () => {
    modal.style.display = 'block';
    formAdd.style.display = 'block';
}

const hideFormAndModal = () => {
    modal.style.display = 'none';
    formAdd.style.display = 'none';
}




const fileInput = document.querySelector("#img_link");
var dataUrl; 
fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      dataUrl = e.target.result; // Đây là DataURL của ảnh
      // Bây giờ bạn đã có DataURL, bạn có thể gọi hàm để hiển thị ảnh trong JS ở nơi khác
    };
    reader.readAsDataURL(file);
  }
});



const addNewVocab = () => {
    var word = document.querySelector('#word').value;
var meaning = document.querySelector('#meaning').value;
var example = document.querySelector('#example').value;

    var cardItem = ` <div class="body__content__item col-4">`;
    cardItem +=`
            <div class="body__content__item--top">
              <img src="${dataUrl}" alt="" class="body__content__item__img" />
              <span class="body__content__item__word roboto-medium">${word}</span>
            </div>
            <div class="body__content__item--bot">
              <span class="body__content__item__meaning roboto-bold"
                >${meaning}</span
              >
            </div>
          </div>`
    document.querySelector('.body__content').innerHTML += cardItem;

    document.querySelector('#word').value = "";
    document.querySelector('#meaning').value = "";
    document.querySelector('#example').value = "";
    

    hideFormAndModal();
}