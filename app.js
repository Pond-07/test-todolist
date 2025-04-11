let todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];

    window.onload = function () {
      renderList();
    };

    function newElement() {
      let inputValue = document.getElementById("myInput").value.trim();
      if (inputValue === '') {
        alert("ลองเขียนอะไรเพิ่มเข้าไปดูสิ!");
        return;
      }

      addItemToList(inputValue, true);
      document.getElementById("myInput").value = "";
    }

    function addItemToList(text, save = true, id = null) {
      let li = document.createElement("li");
      li.textContent = text;

      let span = document.createElement("SPAN");
      span.className = "close";
      span.innerHTML = "x";

      if (!id) {
        id = Date.now() + Math.random();
      }
      li.dataset.id = id;

      span.onclick = function () {
        li.remove();
        todoItems = todoItems.filter(item => item._id != id);
        updateStorage();
      };

      li.appendChild(span);
      document.getElementById("myUL").appendChild(li);

      if (save) {
        todoItems.push({ text: text, _id: id });
        updateStorage();
      }
    }

    function renderList() {
      document.getElementById("myUL").innerHTML = "";
      todoItems.forEach(item => addItemToList(item.text, false, item._id));
    }

    function updateStorage() {
      localStorage.setItem("todoItems", JSON.stringify(todoItems));
    }

    document.getElementById("myUL").addEventListener("click", function (ev) {
      if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
      }
    });