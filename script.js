let todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];

// เมื่อเปิดหน้าเว็บเพจจะทำการโหลดข้อมูลจาก localStorage เเละ render รายการที่มีอยู่ใน todolist
    window.onload = function () {
      renderList();
    };

    // เพิ่มรายการใน todolist แต่ถ้ยายังไม่มีข้อความในนั้น จะมีเTag alert ขึ้นมา
    function newElement() {
      let inputValue = document.getElementById("myInput").value.trim();
      if (inputValue === '') {
        alert("ลองเขียนอะไรเพิ่มเข้าไปดูสิ!");
        return;
      }

    // เพิ่มรายการเข้าไปใน todolist เเละบันทึกลง localStorage  เเละลบข้อความใน input 
      addItemToList(inputValue, true);
      document.getElementById("myInput").value = "";
    }

    // สร้างวtag li ขึ้นมาใหม่ เเละสร้างปุ่ม x ลบ เเละสร้าง id ถ้ายังไม่มี เเละทำการลบรายการที่เลือกออกจาก todolist เเละบันทึกลง localStorage
    function addItemToList(text, save = true, id = null) {
      let li = document.createElement("li");
      li.textContent = text;

      // สร้างปุ่ม x ลบ
      let span = document.createElement("SPAN");
      span.className = "close";
      span.innerHTML = "x";

      // สร้าง id ถ้ายังไม่มี
      if (!id) {
        id = Date.now() + Math.random();
      }
      li.dataset.id = id;

      // เมื่อคลิกข้อมูลลงใน li จะทำการลบข้อมูลที่เลือกออกจาก todolist
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

    // ทำให้คลิกที่ list แล้วขีดฆ่าได้
    document.getElementById("myUL").addEventListener("click", function (ev) {
      if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
      }
    });


    // ทำให้กด Enter แล้วเพิ่มรายการได้
    document.getElementById("myInput").addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        newElement();
      }
    });