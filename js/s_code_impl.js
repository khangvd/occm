var s_account = undefined;
var s_code_src = document.getElementsByTagName("script")[document.getElementsByTagName("script").length-1].src;
var currentUrl = window.location.href;

function getApiUrl() {
	var baseEndpoint = s_code_src.indexOf("cssweb") > -1 ? "https://mysupport.netapp.com/css/cssweb/js/" : "https://mysupport.netapp.com/NOW/public/js/";
	return baseEndpoint+'s_code.js';
}

function submitAnalyticsRequest(inputParams = {}) {
	$.getScript(getApiUrl(), function () {
		if (typeof(s) == "undefined") {
			return;
		}

		$.extend(s,inputParams);
		s.t();
	});
}

// Get the current timestamp and convert it to PST
function getTimestamp() {
	var d = new Date();
	var nd = new Date(((d.getTime()+(d.getTimezoneOffset()*60000))+(3600000*-7)));
	return {"timestamp":nd.getHours()+":"+(nd.getMinutes()<10?'0':'') + nd.getMinutes(), "day":['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][nd.getDay()]};
}

function getUrlContext() {
	var uhref = window.location.href;
    var url = uhref.substring(uhref.indexOf('/', 8) + 1);
    var arr = url.split("/");
    return arr[0];
}

function getUrlContext2() {
	var uhref = window.location.href;
    var url = uhref.substring(uhref.indexOf('/', 8) + 1);
    var arr = url.split("/");
    return arr[0] + "/" + arr[1];
}

function sendAnalyticsPageLoad(cloudParams = {}) {
  var hrefChunks = window.location.href.split('/');
	var projectId = 'CloudDocs';
	var productId = hrefChunks[3];
  var lang = hrefChunks[4];
	var _date = getTimestamp();

	cloudParams.channel = 'NSS Search';
	cloudParams.pageName = 'NSS:Documentation:'+projectId+':'+productId+':'+document.title;
	cloudParams.pageType = "html";
	cloudParams.server = projectId;

	cloudParams.prop1 = getUrlContext();
	cloudParams.prop2 = getUrlContext2();
	cloudParams.prop35 = lang;
	cloudParams.prop37 = cloudParams.server;
	cloudParams.prop52 = _date.timestamp;
	cloudParams.prop53 = _date.day;

	cloudParams.eVar35 = cloudParams.prop35;
	cloudParams.eVar37 = cloudParams.prop37;
	cloudParams.eVar39 = s_account;

  $.getScript(getApiUrl(), function () {
      submitAnalyticsRequest(cloudParams);
  });
}

$(document).ready(function() {
	if (currentUrl == null) {
		return;
	}

	if (currentUrl.indexOf('.netapp.com') > -1) {
		s_account = "networkapplsupport-global-dev"; //FIXME: Change to networkapplsupport-global
	} else if (currentUrl.indexOf('localhost') > -1) {
		s_account = "networkapplsupport-global-dev";
	}

	//TODO: Decide if we are sending data multiple times -- navigaton, i18n, or search
	// Page Load
	var cloudParams = {};
	sendAnalyticsPageLoad(cloudParams);

});
