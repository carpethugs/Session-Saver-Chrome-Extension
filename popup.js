document.addEventListener("DOMContentLoaded", function () {
  var saveButton = document.getElementById("saveSession");
  var loadButton = document.getElementById("loadSession");
  var sessionSubmit = document.getElementById("sessionSubmit");
  var sessionLoad = document.getElementById("sessionLoad");

  let urls = [];

  saveButton.addEventListener("click", () => {
    document.getElementById("homeMenu").style.display = "none";
    document.getElementById("saveMenu").style.display = "block";
  });

  loadButton.addEventListener("click", () => {
    let createData = {
      url: urls,
    };

    // chrome.windows.create(createData);
    let names = chrome.storage.sync.get("sessionNames");
    document.getElementById("sessNames").innerHTML = names;
    document.getElementById("homeMenu").style.display = "none";
    document.getElementById("loadMenu").style.display = "block";
  });

  sessionSubmit.addEventListener("click", () => {
    let queryInfo = {
      currentWindow: true,
    };

    chrome.tabs.query(queryInfo, (tabs) => {
      for (tab of tabs) {
        urls.push(tab.url);
      }
    });

    !"sessionNames";
    chrome.storage.sync.get("sessionNames", (items) => {
      var names = items;
    });
    let sessionName = document.getElementById("sName").value;
    names.push(sessionName);
    chrome.storage.sync.set({ sessionNames: names });
    chrome.storage.sync.set({ sessionName: urls });
    alert(sessionName);
  });

  sessionLoad.addEventListener("click", () => {
    let sessions = chrome.storage.sync.get([sessionName]);
  });
});
