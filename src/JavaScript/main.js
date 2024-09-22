var modal = document.querySelector(".modal");
var formAdd = document.querySelector("#formAdd");
const showAddModal = () => {
  modal.style.display = "block";
  formAdd.style.display = "block";
};

const hideFormAndModal = () => {
  modal.style.display = "none";
  formAdd.style.display = "none";
  document.querySelector(".detail__form").style.display = "none";
};

const fileInput = document.querySelector("#img_link");
var dataUrl;
fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      dataUrl = e.target.result; // Đây là DataURL của ảnh
      // Bây giờ bạn đã có DataURL, bạn có thể gọi hàm để hiển thị ảnh trong JS ở nơi khác
    };
    reader.readAsDataURL(file);
  }
});

const addNewVocab = () => {
  var word = document.querySelector("#word").value;
  var meaning = document.querySelector("#meaning").value;
  var example = document.querySelector("#example").value;
  // add data in json sever
  opt = {
    url: "http://localhost:3000/vocabularys",
    method: "post",
    data: {
      word: word,
      meaning: meaning,
      example: example,
      img: dataUrl,
    },
  };

  axios(opt)
    .then(function (data_res) {
      console.log(data_res);
      if (data_res.status == 201) alert("add new vocabulary complete");
    })
    .catch(function (ex) {
      console.log(ex);
    });

  // //Show item
  // var cardItem = ` <div class="body__content__item col-4">`;
  // cardItem += `
  //           <div class="body__content__item--top">
  //             <img src="${dataUrl}" alt="" class="body__content__item__img" />
  //             <span class="body__content__item__word roboto-medium">${word}</span>
  //           </div>
  //           <div class="body__content__item--bot">
  //             <span class="body__content__item__meaning roboto-bold"
  //               >${meaning}</span
  //             >
  //           </div>
  //         </div>`;
  // document.querySelector(".body__content").innerHTML += cardItem;

  // document.querySelector("#word").value = "";
  // document.querySelector("#meaning").value = "";
  // document.querySelector("#example").value = "";

  // hideFormAndModal();
};

var vocabApi = "http://localhost:3000/vocabularys";

function start() {
  getVocabulary(function (vocabs) {
    renderVocab(vocabs);
  });
}

start(); // Sửa lỗi tên hàm

function getVocabulary(callback) {
  fetch(vocabApi)
    .then(function (response) {
      return response.json();

    })
    .then(callback);
}

function renderVocab(vocabs) {
  var vocabItem = vocabs.map(function (vocab) {
    return `
      <div class="body__content__item col-4" id="${vocab.id}" onclick="showDetail(this.id)" ">
        <div class="body__content__item--top">
          <img src="${vocab.img}" alt="" class="body__content__item__img" />
          <span class="body__content__item__word roboto-medium">${vocab.word}</span>
        </div>
        <div class="body__content__item--bot">
          <span class="body__content__item__meaning roboto-bold">${vocab.meaning}</span>
        </div>
      </div>
    `;
  });
  document.querySelector(".body__content").innerHTML += vocabItem.join(""); //
}
function getVocabById(id) {
  return axios
    .get(`http://localhost:3000/vocabularys/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching vocab:", error);
    });
}


var ID;

const showDetail = (vocabId) => {
  ID = vocabId
  console.log(ID);
  getVocabById(ID).then((vocab) => {
    // console.log(vocab);
    document.querySelector(
      "#detail__form__contain"
    ).innerHTML = `<div class="detail__form">
        <div class="detail__form__content">
          <div class="detail__form__content__top">
            <div class="detail__form__content__top--icon" onclick="hideDetailForm()">
              <i class="fa-solid fa-x"></i>
            </div>
             <div class="detail__form__content__top__delete--icon" onclick="deleteItem()">
              <i class="fa-solid fa-trash"></i>
            </div>

           <div class="detail__form__content__img">
            <img src="${vocab.img}" alt="" id="detail__form__content__img--img">
           </div>
          </div>
          <div class="detail__form__content__bot">
            <div class="detail__form__content__bot--item">
              <span class="detail__form__content__bot--word roboto-bold">Word:</span>
              <span class="detail__form__content__bot--word-value">${vocab.word}</span>
            </div>
            <div class="detail__form__content__bot--item">
              <span class="detail__form__content__bot--meaning roboto-regular">Meaning:</span>
              <span class="detail__form__content__bot--meaning-value">${vocab.meaning}</span>
            </div>
            <div class="detail__form__content__bot--item">
              <span class="detail__form__content__bot--example roboto-regular">Example:</span>
              <span class="detail__form__content__bot--example-value">${vocab.example}</span>
            </div>
          </div>
        </div>
      </div>`;
    modal.style.display = "block";
    document.querySelector(".detail__form").style.display = "flex";
  });
};

const deleteItem = () => {
  console.log(ID);
  axios
    .delete(`http://localhost:3000/vocabularys/${ID}`)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        // Xóa phần tử khỏi DOM
        // document.getElementById(vocabId).remove();
        alert("Delete item complete");
      }
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
      alert("An error occurred while deleting the item.");
    });
};

const hideDetailForm = () => {
  document.querySelector(".detail__form").style.display = "none";
  modal.style.display = "none";
};

