
// ___________________ ทำความเข้าใจ _____________________

var myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);

  span.onclick = function () {
    let div = this.parentElement;
    div.remove();
  };
}

var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);


// เมื่อพิมพ์ข้อความใน input แล้วกด add
// จะทำการเพิ่มข้อความลงใน list

function newElement() {
  let inputValue = document.getElementById("myInput").value;
  if (inputValue === "") return;

  let li = document.createElement("li");
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  document.getElementById("myUL").appendChild(li);
  document.getElementById("myInput").value = "";

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  span.onclick = function () {
    let div = this.parentElement;
    div.remove();
  };
}

 var list = document.querySelector("ul");
 list.addEventListener(
   "click",
   function (ev) {
     if (ev.target.tagName === "LI") {
       ev.target.classList.toggle("checked");
     }
   },
   false
 );
 


// ___________________ Chat GPT ช่วย ทำความเข้าใจด้วย ___________________

// เมื่อหน้าเว็ปถูกเปิด คำสั่งนี้จะดึงข้อมูลจาก localStorage
window.onload = function () {
  let savedItems = JSON.parse(localStorage.getItem("todoItems")) || [];
  savedItems.forEach(item => addItemToList(item.text, false));
};
// tag alert เมื่อกดปุ่ม add  ข้อความจะขึ้นมาเมื่อในTag ไม่มีข้อความอยู่ในนั้น
function newElement() {
  let inputValue = document.getElementById("myInput").value.trim();
  if (inputValue === '') {
    alert("ลองเขียนอะไรเพิ่มเข้าไปดูสิ!");
    return;
  }

  addItemToList(inputValue, true);
  document.getElementById("myInput").value = "";
}

// เมื่อใส่ข้อความลงไปในTag ข้อความจะถูกเพิ่มลงไปใน list ทันที
function addItemToList(text, save = true) {
  let li = document.createElement("li");
  li.textContent = text;
  
// สร้างปุ่ม x ขึ้นมาเมื่ออยากยกจะลบข้อความใน list
  let span = document.createElement("SPAN");
  span.className = "close";
  span.innerHTML = "x";

  span.onclick = function () {
    li.remove();
    todoItems = todoItems.filter((item) => {
      return !(item.text === text && item._id === li.dataset.id);
    });
    updateStorage();
  };

  let id = Date.now() + Math.random();
  li.dataset.id = id;

  li.appendChild(span);
  document.getElementById("myUL").appendChild(li);

  if (save) {
    todoItems.push({ text: text, _id: id });
    updateStorage();
  }
}

function renderList() {
  document.getElementById("myUL").innerHTML = "";
  todoItems.forEach(item => addItemToList(item.text, false));
}

function updateStorage() {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

let todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];