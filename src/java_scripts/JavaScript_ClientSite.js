
//include
src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
src="https://api.ipify.org?format=jsonp&callback=getIP" //ip location JavaScript


//Varibels
var browser;  //+
var domain_Url; //+
var domain_Hostname; //+
var html_height; //+
var html_width; //+
var userIp; //user ip //+
var mobile; //it is mobile or // NOT +
var startTime; //Start time when user log to the website
var finishTime;//finish time when user loged out of the website
var time =new Date();

$(document).ready(function(){

startTime=time.getTime();
domain_Url =document.URL;
domain_Hostname =document.location.origin;
html_height= $(document).height();
html_width= $(document).width();
mobile = checkMobile();
browser = checkBrowser();

$.getJSON('https://api.ipify.org?format=json', function(data){
    userIp=data.ip;
  });


  //those events are fired when a user leave a site over a link or your browser back button
 window.onbeforeunload = OnBeforeUnLoad;
   function OnBeforeUnLoad () {
      finishTime=time.getTime();
     to_send={};
     to_send ['browser']=browser;
    to_send ['domainurl']=domain_Url;
     to_send ['domain']=domain_Hostname;
     to_send ['height']=html_height;
     to_send ['width']=html_width;
     to_send ['userIP']=userIp;
     to_send ['is_mobile']=mobile;
     to_send ['log_time']=startTime;
     to_send ['log_time_raw']=startTime;
     to_send ['leave_time']=startTime;
     to_send ['leave_time_raw']=finishTime;
     sendAjaxData(to_send);//sending the position
   }

  }); //End of document ready


  function sendAjaxData(json_data){
      var url='http://localhost:3000/';
      var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
      console.log(json_data);
      xmlhttp.open("POST", url);
      xmlhttp.setRequestHeader("Content-Type", "application/json");
      xmlhttp.send(JSON.stringify(json_data));//Send Json Mouse Position
      mousePosition=[];//clear mouse Position
    }



function checkMobile(){
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  return true;
  }else{
    return false;
  }
}

function checkBrowser(){

        // Return cached result if avalible, else get result then cache it.
        if (browser)
            return browser;

        // Opera 8.0+
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';

        // Safari 3.0+ "[object HTMLElementConstructor]"
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        // Edge 20+
        var isEdge = !isIE && !!window.StyleMedia;

        // Chrome 1+
        var isChrome = !!window.chrome && !!window.chrome.webstore;

        // Blink engine detection
        var isBlink = (isChrome || isOpera) && !!window.CSS;

        return browser =
            isOpera ? 'Opera' :
            isFirefox ? 'FireFox' :
            isSafari ? 'Safari' :
            isChrome ? 'Chrome' :
            isIE ? 'IE' :
            isEdge ? 'Edge' :
            isBlink ? 'Blink' :
            "Don't know";
  }
