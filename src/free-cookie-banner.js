$(document).ready(function() {

    // cookie name to save a user choice
     var cookieToSaveChoice = "cookie_erlauben";
    // contoso essential cookies: You can set here Your essential cookies
    var essentailCookiesArray = ["cookie_erlauben","fe_typo_user", "PHPSESSID"];
	
	
    var cookErlaubt = "";
    cookErlaubt = $.cookie(cookieToSaveChoice);
    if (typeof cookErlaubt === 'undefined') {
        cookErlaubt = "";
    }

    // define if cookie allowed set to yes or no
    var cookErPos = cookErlaubt.indexOf("JA"); // if (cookErPos !=-1) -- all cookies accepted
    var cookErPosNEIN = cookErlaubt.indexOf("NEIN"); // if (cookErPos !=-1) -- all cookies not accepted, only essentials
    
    if (cookErlaubt == "NEIN" || cookErPosNEIN != -1) {
		
        // hide container
        hideContainer();
		
        // cookies are declined - there are only essentials cookies allowed
		
		removeAllCookiesExceptEssentials();
		
        $.cookie.json = true;
        $.cookie("cookie_erlauben", "NEIN", {
            path: '/',
            expires: 1
        });

    } 
    else if (cookErlaubt == "JA" || cookErPos != -1) {
        // all cookies are allowed
        // hide container 
        hideContainer();
    } else {
        // still not choiced , nether YES no NO  
        $.cookie.json = true;
        var arr3 = $.cookie();
        for (prop3 in arr3) {
            $.removeCookie(prop3);
        }

        // show container
        showContainer();
		
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }


    }

    $('#btnDecline').click(function() {

        // hide container 
        hideContainer();
		
        // all cookie was declined, only essential accepted
		
		removeAllCookiesExceptEssentials();
		
        // save this choice in cookie cookie_erlauben

        $.cookie.json = true;
        $.cookie(cookieToSaveChoice, "NEIN", {
            path: '/',
            expires: 1
        });



    });

    $('#btnAgree').click(function() {

        // all cookie was accepted
        // save this choice in cookie named  cookieToSaveChoice
        $.cookie.json = true;
        $.cookie(cookieToSaveChoice, "JA", {
            path: '/',
            expires: 1
        });

        // hide container 
        hideContainer();

    });


    $('#btnDetails').click(function() {

        // show details
		showDetails();

        // get all cookies
        $("#listeCookies").empty();
        $("#listeCookies").append("<div class='table-responsive text-left '><table class='table table-striped text-left'><thead><tr><th>Cookie Name</th> <th> </th> <th> obligatorisch weil </th></tr></thead><tbody>");

        $.cookie.json = true;
        var arr = $.cookie();
        var ihreCookiesEinstellung = "";
        var ihreCookiesEinstellungWert = "";
        for (prop in arr) {

            if (prop == cookieToSaveChoice) {
                ihreCookiesEinstellung = "enthält Ihre Auswahl";
                ihreCookiesEinstellungWert = $.cookie(prop);
            } else {
                ihreCookiesEinstellung = "";
                ihreCookiesEinstellungWert = "";
            }

            $("#listeCookies").append("<tr class=' text-left' ><td class=' text-left' >" + prop + " - " + ihreCookiesEinstellungWert + "</td> <td class='text-left'>" + "</td> <td class='text-left'>" + ihreCookiesEinstellung + "</td>  </tr>");
        }

        $("#listeCookies").append("</tbody></table></div>");
    });


    $('#btnBackToCookieMaske').click(function() {
	    // hide details
        hideDetails();

    });
	
	function showContainer(){
        $("#cookieConsentContainer").css({
            "visibility": "visible"
        });
        $("#cookieConsentContainer").css({
            "height": "100%;"
        });

        $("#cookieMaske").css({
            "visibility": "visible"
        });
        $("#cookieMaske").css({
            "height": "100%;"
        });

        $("#cookieListe").css({
            "visibility": "hidden"
        });
        $("#cookieListe").css({
            "height": "0px;"
        });

		
	}
	function hideContainer(){
        $("#cookieConsentContainer").css({
            "visibility": "hidden"
        });
        $("#cookieConsentContainer").css({
            "height": "0px;"
        });

        $("#cookieMaske").css({
            "visibility": "hidden"
        });
        $("#cookieMaske").css({
            "height": "0px;"
        });

        $("#cookieListe").css({
            "visibility": "hidden"
        });
        $("#cookieListe").css({
            "height": "0px;"
        });		
	}
    
	function hideDetails(){
        // show cookies
        $("#cookieMaske").css({
            "visibility": "visible"
        });
        $("#cookieMaske").css({
            "height": "100%;"
        });

        $("#cookieListe").css({
            "visibility": "hidden"
        });
        $("#cookieListe").css({
            "height": "0px;"
        });
		
	}
    function showDetails(){
        $("#cookieMaske").css({
            "visibility": "hidden"
        });
        $("#cookieMaske").css({
            "height": "0px;"
        });

        $("#cookieListe").css({
            "visibility": "visible"
        });
        $("#cookieListe").css({
            "height": "100%;"
        });
	}
	function removeAllCookiesExceptEssentials(){
		
        var arr = $.cookie();
        for (prop in arr) {

            if (essentailCookiesArray.indexOf(prop) === -1) {
                $.removeCookie(prop);
            }

        }
		
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            if (essentailCookiesArray.indexOf(name) === -1) {
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        }
		
	}
});