document.addEventListener("DOMContentLoaded", function () {
  var saveButton = document.getElementById("saveSession");
  var loadButton = document.getElementById("loadSession");
  var deleteButton = document.getElementById("deleteSession");
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
    let names = ["hi"];
    try {
      chrome.storage.sync.get("sessionNames", (items) => {
        names = items.sessionNames;
      });
    } catch (err) {
      chrome.storage.sync.set({ sessionNames: [] });
      names = [];
      alert(1);
    }
    alert(names);
    document.getElementById("sessNamesLoad").innerHTML = names;
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

    let names = ["bye"];
    try {
      chrome.storage.sync.get("sessionNames", (items) => {
        names = items.sessionNames;
      });
    } catch (err) {
      names = ["hi"];
      alert(err);
    }

    let sessionName = document.getElementById("sName").value;
    names.push(sessionName);
    chrome.storage.sync.set({ sessionNames: names });
    chrome.storage.sync.set({ sessionName: urls });
  });

  sessionLoad.addEventListener("click", () => {
    let sessions;
    let sessionName = document.getElementById("sessNamesLoad").value;
    chrome.storage.sync.get(sessionName, (items) => {
      sessions = items.sessionName;
    });
  });
});
