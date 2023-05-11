document.addEventListener("DOMContentLoaded", function() {
  var cookErlaubt = "";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf("cookie_erlauben=") == 0) {
      cookErlaubt = cookie.substring("cookie_erlauben=".length, cookie.length);
    }
  }
  if (cookErlaubt === "") {
    cookErlaubt = "";
  }
  var hostName = window.location.hostname;
  var domain = '.' + hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
  var cookErPos = cookErlaubt.indexOf("JA");
  var cookErPosNEIN = cookErlaubt.indexOf("NEIN");
  if (cookErlaubt == "NEIN" || cookErPosNEIN != -1) {
    // cookies are declined - there are only essentials cookies allowed
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      if (name != "cookie_erlauben" && name != "fe_typo_user" && name != "PHPSESSID") {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + domain;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      }
    }
    // hide html container
    var container = document.getElementById("cookieConsentContainer");
    if (container) {
      container.style.visibility = "hidden";
      container.style.height = "0px";
    }
    var maske = document.getElementById("cookieMaske");
    if (maske) {
      maske.style.visibility = "hidden";
      maske.style.height = "0px";
    }
    var liste = document.getElementById("cookieListe");
    if (liste) {
      liste.style.visibility = "hidden";
      liste.style.height = "0px";
    }
    // set all cookies expires without a special cookies
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      if (name != "cookie_erlauben" && name != "fe_typo_user" && name != "PHPSESSID") {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }
    // set cookie not allowed
    document.cookie = "cookie_erlauben=NEIN; path=/; expires=1";
    // set label of cookie status
    var label = document.getElementById("cookie_erlaubt_ja_nein");
    if (label) {
      label.textContent = "nur essenzielle";
    }

    // Youtube blocks - hide 
    const collection = document.getElementsByTagName('iframe');
    for (let i = 0; i < collection.length; i++) {
      collection[i].style.display = "none";
      collection[i].src = "fileadmin/ext_api/cookie_consent/noyoutube.html";

      const newElement = document.createElement('div');
      newElement.classList.add('row', 'text-center', 'alert', 'alert-danger');
      const text = document.createTextNode('Um die Inhalte anzuschauen sollen Sie alle Cookies akzeptieren und dadurch dem Tracking zustimmen.');
      newElement.appendChild(text);

      const button = document.createElement('button');
      button.innerHTML = 'Alle cookies akzeptieren';
      button.onclick = function() {
        document.cookie = 'cookie_erlauben=JA; path=/; expires=1';
        window.location.reload();
      };
      newElement.appendChild(button);

      collection[i].parentNode.insertBefore(newElement, collection[i].nextSibling);
    }

  } else if (cookErlaubt == "JA" || cookErPos != -1) {
    // all cookies are allowed
    // hide html container 
    if (document.getElementById("cookieConsentContainer")) {
      document.getElementById("cookieConsentContainer").style.visibility = "hidden";
      document.getElementById("cookieConsentContainer").style.height = "0px";
    }
    if (document.getElementById("cookieMaske")) {
      document.getElementById("cookieMaske").style.visibility = "hidden";
      document.getElementById("cookieMaske").style.height = "0px";
    }
    if (document.getElementById("cookieListe")) {
      document.getElementById("cookieListe").style.visibility = "hidden";
      document.getElementById("cookieListe").style.height = "0px";
    }
    // set cookie status label
    if ($('#cookie_erlaubt_ja_nein').length) {
      $("#cookie_erlaubt_ja_nein").text("alle");
    }
    // Youtube block reload
    const collection = document.getElementsByTagName('iframe');
    for (let i = 0; i < collection.length; i++) {
      // do nothing
    }
  } else {
    // still not choiced, neither YES nor NO
    // remove all cookies
    document.cookie.split(";").forEach(function(cookie) {
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    });

    // show html container
    if (document.getElementById("cookieConsentContainer")) {
      document.getElementById("cookieConsentContainer").style.visibility = "visible";
      document.getElementById("cookieConsentContainer").style.height = "100%";
    }
    if (document.getElementById("cookieMaske")) {
      document.getElementById("cookieMaske").style.visibility = "visible";
      document.getElementById("cookieMaske").style.height = "100%";
    }
    if (document.getElementById("cookieListe")) {
      document.getElementById("cookieListe").style.visibility = "hidden";
      document.getElementById("cookieListe").style.height = "0px";
    }

    if (document.getElementById("cookie_erlaubt_ja_nein")) {
      document.getElementById("cookie_erlaubt_ja_nein").textContent = "keine Angaben";
    }

    // Youtube blocks - hide
    const collection = document.getElementsByTagName('iframe');
    for (let i = 0; i < collection.length; i++) {
      collection[i].style.display = "none";
      collection[i].src = "fileadmin/ext_api/cookie_consent/noyoutube.html";

      let newElement = document.createElement('div');
      newElement.classList.add('row');
      newElement.classList.add('text-center');
      newElement.classList.add('alert');
      newElement.classList.add('alert-danger');
      let text = document.createTextNode('Um die Inhalte anzuschauen sollen Sie alle Cookies akzeptieren und dadurch dem Tracking zustimmen.');
      newElement.appendChild(text);

      var button = document.createElement('button');
      button.innerHTML = 'Alle cookies akzeptieren';
      button.onclick = function() {
        document.cookie = "cookie_erlauben=JA; path=/; expires=1;";
        window.location.reload();
      };
      newElement.appendChild(button);

      collection[i].parentNode.insertBefore(newElement, collection[i].nextSibling);
    }
  }

  // Decline clicked
  // Get the "Decline" button element
  const btnDecline = document.getElementById('btnDecline');

  // Add a click event listener to the button
  btnDecline.addEventListener('click', function() {

    // Set the "cookie_erlauben" cookie to "NEIN" with an expiration of 1 day
    document.cookie = "cookie_erlauben=NEIN; expires=" + new Date(new Date().getTime() + 86400000).toUTCString() + "; path=/";

    // Get all cookies
    const cookies = document.cookie.split(";");

    // Loop through all cookies except for "cookie_erlauben", "fe_typo_user", and "PHPSESSID" and delete them
    cookies.forEach(function(cookie) {
      const name = cookie.split("=")[0].trim();
      if (name !== "cookie_erlauben" && name !== "fe_typo_user" && name !== "PHPSESSID") {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + window.location.hostname + ";";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      }
    });

    // Hide the "cookieConsentContainer", "cookieMaske", and "cookieListe" elements if they exist
    const cookieConsentContainer = document.getElementById("cookieConsentContainer");
    if (cookieConsentContainer) {
      cookieConsentContainer.style.visibility = "hidden";
      cookieConsentContainer.style.height = "0px";
    }

    const cookieMaske = document.getElementById("cookieMaske");
    if (cookieMaske) {
      cookieMaske.style.visibility = "hidden";
      cookieMaske.style.height = "0px";
    }

    const cookieListe = document.getElementById("cookieListe");
    if (cookieListe) {
      cookieListe.style.visibility = "hidden";
      cookieListe.style.height = "0px";
    }

    // Loop through all cookies except for "cookie_erlauben", "fe_typo_user", and "PHPSESSID" and delete them with an expiration of Thu, 01 Jan 1970 00:00:00 GMT
    cookies.forEach(function(cookie) {
      const name = cookie.split("=")[0].trim();
      if (name !== "cookie_erlauben" && name !== "fe_typo_user" && name !== "PHPSESSID") {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      }
    });

    // Set the "cookie_erlauben" cookie to "NEIN" with an expiration of 1 day
    document.cookie = "cookie_erlauben=NEIN; expires=" + new Date(new Date().getTime() + 86400000).toUTCString() + "; path=/";

    // Set the text of the "cookie_erlaubt_ja_nein" element to "nur essenzielle" if it exists
    const cookieErlaubtJaNein = document.getElementById("cookie_erlaubt_ja_nein");
    if (cookieErlaubtJaNein) {
      cookieErlaubtJaNein.textContent = "nur essenzielle";
    }

    // Hide cookie settings element
    var cookieSettings = document.getElementById("cookieSettings");
    if (cookieSettings) {
      cookieSettings.style.visibility = "hidden";
      cookieSettings.style.height = "0px";
    }

    // Reload page                                      

    window.location.reload();
  });

  // Agree geklickt

  // Agree geklickt
  document.querySelector('#btnAgree').addEventListener('click', function() {

    // Cookie should to be allowed
    document.cookie = "cookie_erlauben=JA; path=/; expires=1";

    // hide html-container 
    if (document.getElementById("cookieConsentContainer")) {
      document.getElementById("cookieConsentContainer").style.visibility = "hidden";
      document.getElementById("cookieConsentContainer").style.height = "0px";
    }
    if (document.getElementById("cookieMaske")) {
      document.getElementById("cookieMaske").style.visibility = "hidden";
      document.getElementById("cookieMaske").style.height = "0px";
    }
    if (document.getElementById("cookieListe")) {
      document.getElementById("cookieListe").style.visibility = "hidden";
      document.getElementById("cookieListe").style.height = "0px";
    }

    if (document.getElementById('cookie_erlaubt_ja_nein')) {
      document.getElementById('cookie_erlaubt_ja_nein').innerText = 'alle';
    }

    window.location.reload();
  });

  // click on details
  document.querySelector('#btnDetails').addEventListener('click', function() {
    // show Cookies
    document.querySelector("#cookieMaske").style.visibility = "hidden";
    document.querySelector("#cookieMaske").style.height = "0px";

    document.querySelector("#cookieListe").style.visibility = "visible";
    document.querySelector("#cookieListe").style.height = "100%";
  });

  document.querySelector('#btnBackToCookieMaske').addEventListener('click', function() {
    // show Cookies
    document.querySelector("#cookieMaske").style.visibility = "visible";
    document.querySelector("#cookieMaske").style.height = "100%";

    document.querySelector("#cookieListe").style.visibility = "hidden";
    document.querySelector("#cookieListe").style.height = "0px";
  });

  document.querySelector('#btnSettings').addEventListener('click', function() {
    // show Cookies
    document.querySelector("#cookieMaske").style.visibility = "hidden";
    document.querySelector("#cookieMaske").style.height = "0px";

    document.querySelector("#cookieSettings").style.visibility = "visible";
    document.querySelector("#cookieSettings").style.height = "100%";
  });

  document.querySelector('#btnSettingsBackToCookieMaske').addEventListener('click', function() {
    // show Cookies
    document.querySelector("#cookieMaske").style.visibility = "visible";
    document.querySelector("#cookieMaske").style.height = "100%";

    document.querySelector("#cookieSettings").style.visibility = "hidden";
    document.querySelector("#cookieSettings").style.height = "0px";
  });


});
