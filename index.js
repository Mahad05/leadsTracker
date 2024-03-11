const inputBtn = document.getElementById("input-btn");
let myleads = [];
const inputEl = document.getElementById("input-el");
const ulEL = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myleads = leadsFromLocalStorage;
  render(myleads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myleads.push(tabs[0].url);
    localStorage.setItem("myleads", JSON.stringify(myleads));
    render(myleads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myleads = [];
  render(myleads);
});

inputBtn.addEventListener("click", function () {
  myleads.push(inputEl.value);
  console.log(myleads);
  inputEl.value = "";
  localStorage.setItem("myleads", JSON.stringify(myleads));
  render(myleads);
});

function render(leads) {
  let listItems = "";
  for (let index = 0; index < leads.length; index++) {
    listItems += `<li>
      <a target='_blank' href='${leads[index]}'>${leads[index]}</a>
      </li>`;
  }
  ulEL.innerHTML = listItems;
}
