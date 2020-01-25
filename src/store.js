import { writable } from 'svelte/store';

export const showEditor = writable(false);

function validateUrl(value) {
  // https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}

let gistCSS = null;
let pathFromUrl = new URLSearchParams(document.location.search).get('path');
// e.g. 'https://gist.github.com/sw-yx/0e1d14276ef9d2608453fed3c7dfa4ec'

let _userCSS = localStorage.getItem('userCSS');
_userCSS = _userCSS ? JSON.parse(_userCSS) : defaultUserCSS();
let initCSS = pathFromUrl || _userCSS;
export const userCSS = writable(initCSS);

// special hacks to respond
userCSS.subscribe((value) => {
  // try to resolve gist URL's
  if (gistCSS !== value && validateUrl(value)) {
    try {
      new URL(value);
      // if we get here, it is a valid url, we should try to fetch
      fetch(`/.netlify/functions/proxy?path=${value}`)
        .then((r) => console.log({ r }) || r.json())
        .then((data) => {
          // shape of data should be
          // {
          // 	data: {
          // 		files: {
          // 			'zengarden.css': {
          // 				'content': "YOURCSSHERE"
          // 			}
          // 		}
          // 	}
          // }

          if (
            data.files &&
            data.files['zengarden.css'] &&
            data.files['zengarden.css'].content
          ) {
            gistCSS = data.files['zengarden.css'].content;
            console.log({ gistCSS });
            userCSS.set(gistCSS);
          }
        });
      return; // dont do the other stuff
    } catch (err) {
      // err doesnt matter
    }
  }

  // secret hack - to restore default css - type 'default'
  if (value === 'default') userCSS.set(defaultUserCSS());
  if (value) localStorage.setItem('userCSS', JSON.stringify(value));
});

function defaultUserCSS() {
  return `/* Any CSS typed here will be rendered onto Zen Garden */
/* type 'default' to reset CSS to default CSS */

/* you can style label hovers too */
.labelDiv {
  background: rgba(200,200,200,0.8);
  color: black; /* edit and hover over an element */
  padding: 3px;
}

/* you can paste a gist with css, or append to url with 'path' param */
/* e.g. https://svelte-zengarden.netlify.com/?path=https://gist.github.com/sw-yx/67a8c6f39aae5e206b43eb662edb75b9 */

/* Default CSS from: http://www.csszengarden.com/217/217.css - no changes made */
/* css Zen Garden submission 217 - 'Screen Filler', by Elliot Jay Stocks, http://elliotjaystocks.com/  */
/* css released under Creative Commons License - http://creativecommons.org/licenses/by-nc-sa/1.0/  */
	
/* TYPEKIT_KIT_ID: lxq7gid */

/*
================================================
CSS Zen Garden theme for Typekit 01
================================================
Handcrafted by Elliot Jay Stocks
http://elliotjaystocks.com/
Last updated on 18.11.2013
================================================
01	Sensible Defaults
02	Typography
03	Layout
04	Media Queries
================================================
*/

/* ---------------------------------------------------------------------------------------------------------- 
01 Sensible defaults ----------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------- */

* 								{ margin:0; padding:0; /* So sue me */ }

div,
article,
section,
header,
footer,
nav,
figure,
li								{ position:relative; } /* For absolutely positioning elements within containers  */
.group:after 					{ display: block; height: 0; font-size: 0; content: "."; clear: both; visibility: hidden; } /* For clearing */
*								{ -moz-box-sizing:border-box; -webkit-box-sizing:border-box; box-sizing:border-box; } /* Apply a natural box layout model to all elements â€” see http://paulirish.com/2012/box-sizing-border-box-ftw */

::-moz-selection 				{ background:#333; color:#fff; }
::selection 					{ background:#333; color:#fff; }

/* ---------------------------------------------------------------------------------------------------------- 
02 Typography -----------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------- */
/*

14 / 16	= 		0.875em 		(14px equivalent)
16 / 16	= 		1em 			(16px equivalent)
18 / 16 = 		1.125em 		(18px equivalent)
21 / 16 = 		1.3125em 		(21px equivalent)
24 / 16 = 		1.5em 			(24px equivalent)
30 / 16 = 		1.875em 		(30px equivalent)
36 / 16 = 		2.25em 			(36px equivalent)
48 / 16 = 		3em 			(48px equivalent)
60 / 16 = 		3.75em 			(60px equivalent)
72 / 16 = 		4.5em 			(72px equivalent)
96 / 16 = 		6em 			(96px equivalent)

*/

/* Rendering */
body,
input,
textarea 						{ color:#333; /*-webkit-font-smoothing:antialiased;*/ } 

/* Families */
body							{ font-family:"tablet-gothic", verdana, arial, sans-serif; /* Weights from Typekit: 300, 400 */ }
h2,
h3 								{ font-family:"tablet-gothic-condensed", "arial narrow", arial, verdana, sans-serif; /* Weights from Typekit: 200, 900 */ }

/* Headings */
h1,
h2,
h3,
h4,
h5,
h6 								{ font-weight:normal; }
h1 								{ background:#ea2e49; color:#fff; display:inline-block; margin-bottom:1em; padding:0.5em 1em; }
h2 								{ color:#fff; font-weight:900; /* Heavy */ font-size:6em; letter-spacing:1px; line-height:1em; }
h3 								{ font-size:2.25em; font-weight:200; /* Thin */ letter-spacing:1px; line-height:1em; padding:0.5em 0 0.25em 0; }

/* Links */
a 								{ border-bottom:1px solid rgba(0,0,0,0.2); color:#333; text-decoration:none; -moz-transition:border-color 0.2s ease-in-out; -ms-transition:border-color 0.2s ease-in-out; -o-transition:border-color 0.2s ease-in-out; -webkit-transition:border-color 0.2s ease-in-out; transition:border-color 0.2s ease-in-out; }
a:hover 						{ border-color:#ea2e49; }
section.intro div.summary p a,
div.explanation p a,
div.participation p a			{ color:#fff; }
div.participation p a:hover		{ border-color:#fff; }

/* Paragraph styles */
p,
li 								{ font-size:1em; font-weight:400; /* Regular */ line-height:1.5em; padding:0.5em 0; }
h1,
section.intro div.summary p,
div.requirements p:last-child 	{ font-weight:300; letter-spacing:2px; text-transform:uppercase; }
section.intro div.summary p:last-child, 
div.requirements p:last-child 	{ border-top:1px solid #ea2e49; margin-top:1em; padding-top:1.5em; }

/* Other bits & bobs */
em,
strong 							{ font-style:normal; font-weight:400; }

/* ---------------------------------------------------------------------------------------------------------- 
03 Layout ---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------- */

html 							{ background:#daede2; padding:5%; }
body 							{ background:#77c4d3; }
div.page-wrapper 				{ z-index:2; }

section.intro 					{ padding:5%; }
section.intro div.summary 		{ color:#fff; padding:15% 0; }
section.intro div.preamble 		{ background:rgba(255,255,255,0.9); color:#333; margin-left:-30%; padding:5% 5% 5% 30%; }
div.main 						{ padding:5%; }
aside.sidebar 					{ background:rgba(246,247,146,0.9); padding:5%; }
aside.sidebar ul 				{ padding:0.5em 0 2em 0; }
aside.sidebar ul li 			{ color:rgba(0,0,0,0.4); list-style:none; margin:0; padding:0 0 0.825em 0; }
footer 							{ background:rgba(246,247,146,0.9); clear:both; color:#fff; padding:1em 5%; width:50%; }
footer a 						{ margin-right:0.5em; }

div.explanation 				{ color:#fff; padding:5%; }
div.participation 				{ background:rgba(234,46,73,0.9); color:#fff; padding:5%; }
div.benefits 					{ background:rgba(255,255,255,0.9); margin-top:10%; padding:5%; }
div.requirements 				{ background:rgba(255,255,255,0.9); padding:5%; }

/* ---------------------------------------------------------------------------------------------------------- 
04 Media queries (using a mobile-first approach) ------------------------------------------------------------
---------------------------------------------------------------------------------------------------------- */

/* 1 and up */	
@media screen and (min-width:1px) {
	body 						{ font-size:85%; }
}


/* 550 and up */	
@media screen and (min-width:550px) {
	h2 							{ font-size:8em; }
	section.intro 				{ width:66.6%; }
	aside.sidebar 				{ position:absolute; right:0; top:2.5%; width:32.75%; }
	div.extra1 					{ background:rgba(51,55,69,0.9); bottom:0; right:0; position:fixed; top:0; width:30%; z-index:1; }
	div.explanation 			{ float:left; width:50%; }
	div.participation 			{ float:left; width:49%; }
	div.benefits 				{ float:left; }
	div.requirements 			{ float:left; }
}

/* 650 and up */	
@media screen and (min-width:650px) {
	div.benefits 				{ margin-top:12%; width:30%; }
	div.requirements 			{ width:69%; }
}

/* 700 and up */	
@media screen and (min-width:700px) {
	body 						{ font-size:90%; }
}

/* 800 and up */	
@media screen and (min-width:800px) {
	body 						{ font-size:100%; }
}

/* 900 and up */	
@media screen and (min-width:900px) {
	body 						{ font-size:110%; }
}

/* 1500 and up */	
@media screen and (min-width:1500px) {
	body 						{ font-size:125%; }
}

/* 1800 and up */	
@media screen and (min-width:1800px) {

	body 						{ font-size:150%; }
}

/* 2100 and up */	
@media screen and (min-width:2100px) {
	body 						{ font-size:175%; }
}

/* 2500 and up */	
@media screen and (min-width:2500px) {
	body 						{ font-size:200%; }
}
`;
}
