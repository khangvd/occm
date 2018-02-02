function netapp_mailto() {
	var pageurl = "" + window.location;

  if(pageurl.indexOf('?') > -1) {
    pageurl = pageurl.substring( 0, pageurl.indexOf( "?" ) );
  }

  var email = "doccomments@netapp.com";
  var loc = email + "?subject=clouddocs_feedback:%20" + pageurl;
  window.location = "mailto:" + loc;
}
