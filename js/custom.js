/*
1. #month, #year, #day 오늘 날짜로 바뀌기

2. addTask 클릭하면 .upBox 올라오면서 보이기 / close 클릭하면 반대로작동

3. #save 누르면 addTask 함수 실행하기

3-1. addTask 함수: 
1) task 객체 만들어서 taskList에 task객체 푸시하기
*task객체에 들어갈 값
- id, taskContent, isComplete
2) user.value = "" 로 입력란 리셋
3) render함수 실행하기

3-2. render 함수:
1) result 변수 초기값 리셋
2) taskList 배열에 담긴 요소를 하나하나씩 task 변수에 담아서
html에 보여져야하는 코드로 작성 후
result 변수에 누적시키기
-> if문을 활용하여 complete상태인지 doing상태인지에 따라 실행문 다르게 작성하기

3)taskBoard.innerHTML = result : 화면에 보여지게 하기

3-3. randomID 함수 - 고유id 만들기 :
Date.now() 를 사용해서 randomID 함수 부른 곳에 값 return

4. Task 상태 함수만들기
4-1. complete
4-2. delete

5. 투두 상태별로 화면 노출하기

6. task li를 한번 클릭했을 때 delete 버튼 노출되게하기
*/

//1.
let year = document.querySelector("#year"),
  month = document.querySelector("#month"),
  day = document.querySelector("#day");

let today = new Date();

let todayMonth = today.getMonth();
switch (todayMonth) {
  case 0:
    todayMonth = "JAN";
    break;
  case 1:
    todayMonth = "FEB";
    break;
  case 2:
    todayMonth = "MAR";
    break;
  case 3:
    todayMonth = "APR";
    break;
  case 4:
    todayMonth = "MAY";
    break;
  case 5:
    todayMonth = "JUN";
    break;
  case 6:
    todayMonth = "JUL";
    break;
  case 7:
    todayMonth = "AUG";
    break;
  case 8:
    todayMonth = "SEP";
    break;
  case 9:
    todayMonth = "OCT";
    break;
  case 10:
    todayMonth = "NOV";
    break;
  case 11:
    todayMonth = "DEC";
    break;
}
let todayDate = today.getDate();
if (todayDate < 10) {
  todayDate = `0${todayDate}`;
}

year.textContent = `${today.getFullYear()}`;
month.textContent = `${todayMonth}`;
day.textContent = `${todayDate}`;

//2
let add = document.querySelector("#addTask"),
  addContainer = document.querySelector(".addContainer"),
  close = document.querySelector(".close");

add.addEventListener("click", () => {
  addContainer.classList.toggle("on");
});
close.addEventListener("click", () => {
  addContainer.classList.remove("on");
});

//3
let user = document.querySelector("#user"),
  save = document.querySelector("#save"),
  taskBoard = document.querySelector("#taskBoard");

let taskList = [];

user.addEventListener("focus", () => {
  user.value = "";
});
save.addEventListener("click", addTask);
function addTask() {
  if (!user.value) {
    user.value = "해야할 일을 작성 후 저장해주세요 @_@";
    return;
  } else {
    task = {
      id: randomId(),
      taskContent: user.value,
      isComplete: false,
      time: currentTime(),
      min: currentMin(),
      ampm: currentAmpm(),
    };

    taskList.unshift(task);
    console.log(taskList);

    render();
    addContainer.classList.remove("on");
    add.classList.remove("off");
  }
  user.value = "";
}

function randomId() {
  return Date.now();
}
function currentTime() {
  let day = new Date();
  time = day.getHours() % 12;
  return time < 12 ? "0" + time : time;
}
function currentMin() {
  let day = new Date();
  time = day.getMinutes();
  return time < 12 ? "0" + time : time;
}
function currentAmpm() {
  let day = new Date();
  return day.getHours() >= 12 ? "pm" : "am";
}
function render() {
  result = "";

  if (mode == "all") {
    list = taskList;
  } else {
    list = filterList;
  }

  list.forEach((task) => {
    if (task.isComplete == true) {
      result += `<li onclick="deleteReady(this)" class="done">
         <div class="taskBox">
              <p class="taskTxt">${task.taskContent}
              <p class="ampm">${task.ampm}<span class="time">${task.time}:${task.min}</span></p>
            </div>
         <div class="buttonBox">
             <button class="deleteTask" onclick="deleteTask(event, ${task.id})">x</button>
            <button class="complete" onclick="complete(event, ${task.id})">v</button>
            </div>
    </li>`;
    } else {
      result += `<li onclick="deleteReady(this)">
         <div class="taskBox">
              <p class="taskTxt">${task.taskContent}
              <p class="ampm">${task.ampm}<span class="time">${task.time}:${task.min}</span></p>
            </div>
        <div class="buttonBox">
             <button class="deleteTask" onclick="deleteTask(event, ${task.id})">x</button>
            <button class="complete" onclick="complete(event, ${task.id})">v</button>
            </div>
    </li>`;
    }
  });

  taskBoard.innerHTML = result;
}

//4
function deleteTask(event, id) {
  event.stopPropagation();

  taskList = taskList.filter((task) => {
    return task.id != id;
  });
  filter();
}

function complete(event, id) {
  event.stopPropagation();

  taskList.forEach((task) => {
    if (task.id == id) {
      task.isComplete = !task.isComplete;
    }
  });
  filter();

  let currentCompletedCount = taskList.filter(
    (task) => task.isComplete === true
  ).length;

  let flowers = document.querySelectorAll(".left .imgWrap img");

  flowers.forEach((flower, index) => {
    if (index < currentCompletedCount) {
      flower.classList.add("on");
    } else {
      flower.classList.remove("on");
    }
  });
}

//5
let tabs = document.querySelectorAll(".tab li");
let mode = "all";
let list = [];
let filterList = [];

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    filter(e);
    tabs.forEach((tab) => {
      tab.classList.remove("on");
    });
    tab.classList.add("on");
  });
});

function filter(e) {
  if (e) {
    mode = e.target.id;
    console.log(e.target);
  }
  filterList = [];
  if (mode == "all") {
    render();
  } else if (mode == "going") {
    taskList.forEach((task) => {
      if (task.isComplete == false) {
        filterList.push(task);
      }
    });
    render();
  } else {
    taskList.forEach((task) => {
      if (task.isComplete == true) {
        filterList.push(task);
      }
    });
    render();
  }
}

//6
function deleteReady(clicked) {
  clicked.classList.toggle("deleteReady");
}

//업박스 올라와있을 때만 엔터키로 투두리스트 업로드하기
user.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (addContainer.classList.contains("on")) {
      addTask();
    }
  }
});

//초기화면
taskList = [
  {
    id: randomId(),
    taskContent: ` <p class="taskTxt">왼쪽 <strong>TODO</strong>(+ 할 일)를 클릭하여 할 일을 추가하세요.<br> 할 일이 기록된 카드를 한번 클릭하면 목록에서 삭제할 수 있습니다.<br> 할 일을 완수하면 카드 오른쪽 하단에 있는 체크를 클릭하여 꽃을 모아보세요!</p>`,
    isComplete: false,
    time: currentTime(),
    min: currentMin(),
    ampm: currentAmpm(),
  },
];
render();
