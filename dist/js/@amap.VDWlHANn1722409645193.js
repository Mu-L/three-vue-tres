function n(){var o=["default","forEach","log","constructor","construct","length",'{}.constructor("return this")( )',"return (function() ","651Ssnheg","9683010qUNVIS","error","bind","test","keys","529755beksVY","22SUXGeu","stateObject","hasOwnProperty","1746DCeqpY","console","5ywIASD","action","defineProperty","call","__esModule","gger","getOwnPropertyDescriptor","debu","table","apply","exception","trace","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","315585CMOZkC","20617XjoOEh","init","toString","prototype","1844128pHaTXs","warn","get","20072RffHCx","function","chain","undefined"];return(n=function(){return o})()}var o=a;!function(o,e){for(var i=a,t=n();;)try{if(302460===parseInt(i(389))/1*(-parseInt(i(415))/2)+-parseInt(i(414))/3+-parseInt(i(393))/4+parseInt(i(375))/5*(parseInt(i(418))/6)+-parseInt(i(408))/7*(-parseInt(i(396))/8)+-parseInt(i(388))/9+parseInt(i(409))/10)break;t.push(t.shift())}catch(r){t.push(t.shift())}}();var e=function(){var n=!0;return function(o,e){var i=n?function(){if(e){var n=e[a(384)](o,arguments);return e=null,n}}:function(){};return n=!1,i}}();function a(o,e){var i=n();return(a=function(n,o){return i[n-=375]})(o,e)}!function(){e(this,(function(){var n=a,o=new RegExp("function *\\( *\\)"),e=new RegExp(n(387),"i"),i=p(n(390));o[n(412)](i+n(398))&&e[n(412)](i+"input")?p():i("0")}))()}();var i=function(){var n=!0;return function(o,e){var i=n?function(){if(e){var n=e[a(384)](o,arguments);return e=null,n}}:function(){};return n=!1,i}}();i(void 0,(function(){var n,o=a;try{n=Function(o(407)+o(406)+");")()}catch(l){n=window}for(var e=n[o(419)]=n[o(419)]||{},t=[o(402),o(394),"info",o(410),o(385),o(383),o(386)],r=0;r<t[o(405)];r++){var p=i.constructor[o(392)][o(411)](i),s=t[r],c=e[s]||p;p.__proto__=i[o(411)](i),p[o(391)]=c[o(391)][o(411)](c),e[s]=p}}))();var t=typeof globalThis!==o(399)?globalThis:typeof window!==o(399)?window:"undefined"!=typeof global?global:typeof self!==o(399)?self:{};function r(n){var e=o;return n&&n[e(379)]&&Object.prototype[e(417)][e(378)](n,e(400))?n[e(400)]:n}function p(n){function o(n){var e=a;if("string"==typeof n)return function(n){}.constructor("while (true) {}")[e(384)]("counter");1!==(""+n/n)[e(405)]||n%20==0?function(){return!0}[e(403)]("debu"+e(380))[e(378)](e(376)):function(){return!1}[e(403)](e(382)+e(380)).apply(e(416)),o(++n)}try{if(n)return o;o(0)}catch(e){}}var s={exports:{}};const c=r(s.exports=function(){function n(n){var a=[];return n.AMapUI&&a.push(o(n.AMapUI)),n.Loca&&a.push(e(n.Loca)),Promise.all(a)}function o(n){return new Promise((function(o,e){var i=[];if(n.plugins)for(var s=0;s<n.plugins.length;s+=1)-1==t.AMapUI.plugins.indexOf(n.plugins[s])&&i.push(n.plugins[s]);if(r.AMapUI===a.failed)e("前次请求 AMapUI 失败");else if(r.AMapUI===a.notload){r.AMapUI=a.loading,t.AMapUI.version=n.version||t.AMapUI.version,s=t.AMapUI.version;var c=document.body||document.head,l=document.createElement("script");l.type="text/javascript",l.src="https://webapi.amap.com/ui/"+s+"/main.js",l.onerror=function(n){r.AMapUI=a.failed,e("请求 AMapUI 失败")},l.onload=function(){if(r.AMapUI=a.loaded,i.length)window.AMapUI.loadUI(i,(function(){for(var n=0,e=i.length;n<e;n++){var a=i[n].split("/").slice(-1)[0];window.AMapUI[a]=arguments[n]}for(o();p.AMapUI.length;)p.AMapUI.splice(0,1)[0]()}));else for(o();p.AMapUI.length;)p.AMapUI.splice(0,1)[0]()},c.appendChild(l)}else r.AMapUI===a.loaded?n.version&&n.version!==t.AMapUI.version?e("不允许多个版本 AMapUI 混用"):i.length?window.AMapUI.loadUI(i,(function(){for(var n=0,e=i.length;n<e;n++){var a=i[n].split("/").slice(-1)[0];window.AMapUI[a]=arguments[n]}o()})):o():n.version&&n.version!==t.AMapUI.version?e("不允许多个版本 AMapUI 混用"):p.AMapUI.push((function(n){n?e(n):i.length?window.AMapUI.loadUI(i,(function(){for(var n=0,e=i.length;n<e;n++){var a=i[n].split("/").slice(-1)[0];window.AMapUI[a]=arguments[n]}o()})):o()}))}))}function e(n){return new Promise((function(o,e){if(r.Loca===a.failed)e("前次请求 Loca 失败");else if(r.Loca===a.notload){r.Loca=a.loading,t.Loca.version=n.version||t.Loca.version;var i=t.Loca.version,s=t.AMap.version.startsWith("2"),c=i.startsWith("2");if(s&&!c||!s&&c)e("JSAPI 与 Loca 版本不对应！！");else{s=t.key,c=document.body||document.head;var l=document.createElement("script");l.type="text/javascript",l.src="https://webapi.amap.com/loca?v="+i+"&key="+s,l.onerror=function(n){r.Loca=a.failed,e("请求 AMapUI 失败")},l.onload=function(){for(r.Loca=a.loaded,o();p.Loca.length;)p.Loca.splice(0,1)[0]()},c.appendChild(l)}}else r.Loca===a.loaded?n.version&&n.version!==t.Loca.version?e("不允许多个版本 Loca 混用"):o():n.version&&n.version!==t.Loca.version?e("不允许多个版本 Loca 混用"):p.Loca.push((function(n){n?e(n):e()}))}))}if(!window)throw Error("AMap JSAPI can only be used in Browser.");var a,i;(i=a||(a={})).notload="notload",i.loading="loading",i.loaded="loaded",i.failed="failed";var t={key:"",AMap:{version:"1.4.15",plugins:[]},AMapUI:{version:"1.1",plugins:[]},Loca:{version:"1.3.2"}},r={AMap:a.notload,AMapUI:a.notload,Loca:a.notload},p={AMap:[],AMapUI:[],Loca:[]},s=[],c=function(n){"function"==typeof n&&(r.AMap===a.loaded?n(window.AMap):s.push(n))};return{load:function(o){return new Promise((function(e,i){if(r.AMap==a.failed)i("");else if(r.AMap==a.notload){var p=o.key,l=o.version,u=o.plugins;p?(window.AMap&&"lbs.amap.com"!==location.host&&i("禁止多种API加载方式混用"),t.key=p,t.AMap.version=l||t.AMap.version,t.AMap.plugins=u||t.AMap.plugins,r.AMap=a.loading,l=document.body||document.head,window.___onAPILoaded=function(t){if(delete window.___onAPILoaded,t)r.AMap=a.failed,i(t);else for(r.AMap=a.loaded,n(o).then((function(){e(window.AMap)})).catch(i);s.length;)s.splice(0,1)[0]()},(u=document.createElement("script")).type="text/javascript",u.src="https://webapi.amap.com/maps?callback=___onAPILoaded&v="+t.AMap.version+"&key="+p+"&plugin="+t.AMap.plugins.join(","),u.onerror=function(n){r.AMap=a.failed,i(n)},l.appendChild(u)):i("请填写key")}else if(r.AMap==a.loaded)if(o.key&&o.key!==t.key)i("多个不一致的 key");else if(o.version&&o.version!==t.AMap.version)i("不允许多个版本 JSAPI 混用");else{if(p=[],o.plugins)for(l=0;l<o.plugins.length;l+=1)-1==t.AMap.plugins.indexOf(o.plugins[l])&&p.push(o.plugins[l]);p.length?window.AMap.plugin(p,(function(){n(o).then((function(){e(window.AMap)})).catch(i)})):n(o).then((function(){e(window.AMap)})).catch(i)}else if(o.key&&o.key!==t.key)i("多个不一致的 key");else if(o.version&&o.version!==t.AMap.version)i("不允许多个版本 JSAPI 混用");else{var f=[];if(o.plugins)for(l=0;l<o.plugins.length;l+=1)-1==t.AMap.plugins.indexOf(o.plugins[l])&&f.push(o.plugins[l]);c((function(){f.length?window.AMap.plugin(f,(function(){n(o).then((function(){e(window.AMap)})).catch(i)})):n(o).then((function(){e(window.AMap)})).catch(i)}))}}))},reset:function(){delete window.AMap,delete window.AMapUI,delete window.Loca,t={key:"",AMap:{version:"1.4.15",plugins:[]},AMapUI:{version:"1.1",plugins:[]},Loca:{version:"1.3.2"}},r={AMap:a.notload,AMapUI:a.notload,Loca:a.notload},p={AMap:[],AMapUI:[],Loca:[]}}}}());export{c as _,t as c,r as g};
