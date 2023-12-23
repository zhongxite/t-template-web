import{i as ft}from"./defaultImg-9e4ff219.js";import{_ as ht,M as vt,i as pt,h as yt,o as gt,g as bt,a as y,p as mt,e as wt,l as J}from"./index-8906f66a.js";/*! @license is-dom-node v1.0.4

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/function Y(t){return typeof window.Node=="object"?t instanceof window.Node:t!==null&&typeof t=="object"&&typeof t.nodeType=="number"&&typeof t.nodeName=="string"}/*! @license is-dom-node-list v1.2.1

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/function _t(t){var e=Object.prototype.toString.call(t),r=/^\[object (HTMLCollection|NodeList|Object)\]$/;return typeof window.NodeList=="object"?t instanceof window.NodeList:t!==null&&typeof t=="object"&&typeof t.length=="number"&&r.test(e)&&(t.length===0||Y(t[0]))}/*! @license Tealight v0.3.6

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/function k(t,e){if(e===void 0&&(e=document),t instanceof Array)return t.filter(Y);if(Y(t))return[t];if(_t(t))return Array.prototype.slice.call(t);if(typeof t=="string")try{var r=e.querySelectorAll(t);return Array.prototype.slice.call(r)}catch{return[]}return[]}/*! @license Rematrix v0.3.0

	Copyright 2018 Julian Lloyd.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/function U(t){if(t.constructor!==Array)throw new TypeError("Expected array.");if(t.length===16)return t;if(t.length===6){var e=w();return e[0]=t[0],e[1]=t[1],e[4]=t[2],e[5]=t[3],e[12]=t[4],e[13]=t[5],e}throw new RangeError("Expected array with either 6 or 16 values.")}function w(){for(var t=[],e=0;e<16;e++)e%5==0?t.push(1):t.push(0);return t}function Et(t,e){for(var r=U(t),i=U(e),o=[],n=0;n<4;n++)for(var a=[r[n],r[n+4],r[n+8],r[n+12]],d=0;d<4;d++){var p=d*4,c=[i[p],i[p+1],i[p+2],i[p+3]],f=a[0]*c[0]+a[1]*c[1]+a[2]*c[2]+a[3]*c[3];o[n+p]=f}return o}function Tt(t){if(typeof t=="string"){var e=t.match(/matrix(3d)?\(([^)]+)\)/);if(e){var r=e[2].split(", ").map(parseFloat);return U(r)}}return w()}function Ot(t){var e=Math.PI/180*t,r=w();return r[5]=r[10]=Math.cos(e),r[6]=r[9]=Math.sin(e),r[9]*=-1,r}function Rt(t){var e=Math.PI/180*t,r=w();return r[0]=r[10]=Math.cos(e),r[2]=r[8]=Math.sin(e),r[2]*=-1,r}function jt(t){var e=Math.PI/180*t,r=w();return r[0]=r[5]=Math.cos(e),r[1]=r[4]=Math.sin(e),r[4]*=-1,r}function K(t,e){var r=w();return r[0]=t,r[5]=typeof e=="number"?e:t,r}function $t(t){var e=w();return e[12]=t,e}function kt(t){var e=w();return e[13]=t,e}/*! @license miniraf v1.0.0

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/var it=function(){var t=Date.now();return function(e){var r=Date.now();r-t>16?(t=r,e(r)):setTimeout(function(){return it(e)},0)}}(),It=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||it;/*! @license ScrollReveal v4.0.9

	Copyright 2021 Fisssion LLC.

	Licensed under the GNU General Public License 3.0 for
	compatible open source projects and non-commercial use.

	For commercial sites, themes, projects, and applications,
	keep your source code private/proprietary by purchasing
	a commercial license from https://scrollrevealjs.org/
*/var nt={delay:0,distance:"0",duration:600,easing:"cubic-bezier(0.5, 0, 0, 1)",interval:0,opacity:0,origin:"bottom",rotate:{x:0,y:0,z:0},scale:1,cleanup:!1,container:document.documentElement,desktop:!0,mobile:!0,reset:!1,useDelay:"always",viewFactor:0,viewOffset:{top:0,right:0,bottom:0,left:0},afterReset:function(){},afterReveal:function(){},beforeReset:function(){},beforeReveal:function(){}};function xt(){return document.documentElement.classList.remove("sr"),{clean:function(){},destroy:function(){},reveal:function(){},sync:function(){},get noop(){return!0}}}function Pt(){document.documentElement.classList.add("sr"),document.body?document.body.style.height="100%":document.addEventListener("DOMContentLoaded",function(){document.body.style.height="100%"})}var j={success:Pt,failure:xt};function q(t){return t!==null&&t instanceof Object&&(t.constructor===Object||Object.prototype.toString.call(t)==="[object Object]")}function s(t,e){if(q(t)){var r=Object.keys(t);return r.forEach(function(i){return e(t[i],i,t)})}if(t instanceof Array)return t.forEach(function(i,o){return e(i,o,t)});throw new TypeError("Expected either an array or object literal.")}function T(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];if(this.constructor.debug&&console){var i="%cScrollReveal: "+t;e.forEach(function(o){return i+=`
 — `+o}),console.log(i,"color: #ea654b;")}}function ot(){var t=this,e=function(){return{active:[],stale:[]}},r=e(),i=e(),o=e();try{s(k("[data-sr-id]"),function(n){var a=parseInt(n.getAttribute("data-sr-id"));r.active.push(a)})}catch(n){throw n}s(this.store.elements,function(n){r.active.indexOf(n.id)===-1&&r.stale.push(n.id)}),s(r.stale,function(n){return delete t.store.elements[n]}),s(this.store.elements,function(n){o.active.indexOf(n.containerId)===-1&&o.active.push(n.containerId),n.hasOwnProperty("sequence")&&i.active.indexOf(n.sequence.id)===-1&&i.active.push(n.sequence.id)}),s(this.store.containers,function(n){o.active.indexOf(n.id)===-1&&o.stale.push(n.id)}),s(o.stale,function(n){var a=t.store.containers[n].node;a.removeEventListener("scroll",t.delegate),a.removeEventListener("resize",t.delegate),delete t.store.containers[n]}),s(this.store.sequences,function(n){i.active.indexOf(n.id)===-1&&i.stale.push(n.id)}),s(i.stale,function(n){return delete t.store.sequences[n]})}var Q=function(){var t={},e=document.documentElement.style;function r(i,o){if(o===void 0&&(o=e),i&&typeof i=="string"){if(t[i])return t[i];if(typeof o[i]=="string")return t[i]=i;if(typeof o["-webkit-"+i]=="string")return t[i]="-webkit-"+i;throw new RangeError('Unable to find "'+i+'" style property.')}throw new TypeError("Expected a string.")}return r.clearCache=function(){return t={}},r}();function St(t){var e=window.getComputedStyle(t.node),r=e.position,i=t.config,o={},n=t.node.getAttribute("style")||"",a=n.match(/[\w-]+\s*:\s*[^;]+\s*/gi)||[];o.computed=a?a.map(function(b){return b.trim()}).join("; ")+";":"",o.generated=a.some(function(b){return b.match(/visibility\s?:\s?visible/i)})?o.computed:a.concat(["visibility: visible"]).map(function(b){return b.trim()}).join("; ")+";";var d=parseFloat(e.opacity),p=isNaN(parseFloat(i.opacity))?parseFloat(e.opacity):parseFloat(i.opacity),c={computed:d!==p?"opacity: "+d+";":"",generated:d!==p?"opacity: "+p+";":""},f=[];if(parseFloat(i.distance)){var u=i.origin==="top"||i.origin==="bottom"?"Y":"X",v=i.distance;(i.origin==="top"||i.origin==="left")&&(v=/^-/.test(v)?v.substr(1):"-"+v);var _=v.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g),g=_[0],E=_[1];switch(E){case"em":v=parseInt(e.fontSize)*g;break;case"px":v=g;break;case"%":v=u==="Y"?t.node.getBoundingClientRect().height*g/100:t.node.getBoundingClientRect().width*g/100;break;default:throw new RangeError("Unrecognized or missing distance unit.")}u==="Y"?f.push(kt(v)):f.push($t(v))}i.rotate.x&&f.push(Ot(i.rotate.x)),i.rotate.y&&f.push(Rt(i.rotate.y)),i.rotate.z&&f.push(jt(i.rotate.z)),i.scale!==1&&(i.scale===0?f.push(K(2e-4)):f.push(K(i.scale)));var h={};if(f.length){h.property=Q("transform"),h.computed={raw:e[h.property],matrix:Tt(e[h.property])},f.unshift(h.computed.matrix);var lt=f.reduce(Et);h.generated={initial:h.property+": matrix3d("+lt.join(", ")+");",final:h.property+": matrix3d("+h.computed.matrix.join(", ")+");"}}else h.generated={initial:"",final:""};var l={};if(c.generated||h.generated.initial){l.property=Q("transition"),l.computed=e[l.property],l.fragments=[];var V=i.delay,x=i.duration,P=i.easing;c.generated&&l.fragments.push({delayed:"opacity "+x/1e3+"s "+P+" "+V/1e3+"s",instant:"opacity "+x/1e3+"s "+P+" 0s"}),h.generated.initial&&l.fragments.push({delayed:h.property+" "+x/1e3+"s "+P+" "+V/1e3+"s",instant:h.property+" "+x/1e3+"s "+P+" 0s"});var dt=l.computed&&!l.computed.match(/all 0s|none 0s/);dt&&l.fragments.unshift({delayed:l.computed,instant:l.computed});var G=l.fragments.reduce(function(b,S,Z){return b.delayed+=Z===0?S.delayed:", "+S.delayed,b.instant+=Z===0?S.instant:", "+S.instant,b},{delayed:"",instant:""});l.generated={delayed:l.property+": "+G.delayed+";",instant:l.property+": "+G.instant+";"}}else l.generated={delayed:"",instant:""};return{inline:o,opacity:c,position:r,transform:h,transition:l}}function R(t,e){e.split(";").forEach(function(r){var i=r.split(":"),o=i[0],n=i.slice(1);o&&n&&(t.style[o.trim()]=n.join(":"))})}function H(t){var e=this,r;try{s(k(t),function(i){var o=i.getAttribute("data-sr-id");if(o!==null){r=!0;var n=e.store.elements[o];n.callbackTimer&&window.clearTimeout(n.callbackTimer.clock),R(n.node,n.styles.inline.generated),i.removeAttribute("data-sr-id"),delete e.store.elements[o]}})}catch(i){return T.call(this,"Clean failed.",i.message)}if(r)try{ot.call(this)}catch(i){return T.call(this,"Clean failed.",i.message)}}function Mt(){var t=this;s(this.store.elements,function(e){R(e.node,e.styles.inline.generated),e.node.removeAttribute("data-sr-id")}),s(this.store.containers,function(e){var r=e.node===document.documentElement?window:e.node;r.removeEventListener("scroll",t.delegate),r.removeEventListener("resize",t.delegate)}),this.store={containers:{},elements:{},history:[],sequences:{}}}function I(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];if(q(t))return s(e,function(i){s(i,function(o,n){q(o)?((!t[n]||!q(t[n]))&&(t[n]={}),I(t[n],o)):t[n]=o})}),t;throw new TypeError("Target must be an object literal.")}function A(t){return t===void 0&&(t=navigator.userAgent),/Android|iPhone|iPad|iPod/i.test(t)}var X=function(){var t=0;return function(){return t++}}();function at(){var t=this;ot.call(this),s(this.store.elements,function(e){var r=[e.styles.inline.generated];e.visible?(r.push(e.styles.opacity.computed),r.push(e.styles.transform.generated.final),e.revealed=!0):(r.push(e.styles.opacity.generated),r.push(e.styles.transform.generated.initial),e.revealed=!1),R(e.node,r.filter(function(i){return i!==""}).join(" "))}),s(this.store.containers,function(e){var r=e.node===document.documentElement?window:e.node;r.addEventListener("scroll",t.delegate),r.addEventListener("resize",t.delegate)}),this.delegate(),this.initTimeout=null}function $(t,e){e===void 0&&(e={});var r=e.pristine||this.pristine,i=t.config.useDelay==="always"||t.config.useDelay==="onload"&&r||t.config.useDelay==="once"&&!t.seen,o=t.visible&&!t.revealed,n=!t.visible&&t.revealed&&t.config.reset;if(e.reveal||o)return qt.call(this,t,i);if(e.reset||n)return At.call(this,t)}function qt(t,e){var r=[t.styles.inline.generated,t.styles.opacity.computed,t.styles.transform.generated.final];e?r.push(t.styles.transition.generated.delayed):r.push(t.styles.transition.generated.instant),t.revealed=t.seen=!0,R(t.node,r.filter(function(i){return i!==""}).join(" ")),st.call(this,t,e)}function At(t){var e=[t.styles.inline.generated,t.styles.opacity.generated,t.styles.transform.generated.initial,t.styles.transition.generated.instant];t.revealed=!1,R(t.node,e.filter(function(r){return r!==""}).join(" ")),st.call(this,t)}function st(t,e){var r=this,i=e?t.config.duration+t.config.delay:t.config.duration,o=t.revealed?t.config.beforeReveal:t.config.beforeReset,n=t.revealed?t.config.afterReveal:t.config.afterReset,a=0;t.callbackTimer&&(a=Date.now()-t.callbackTimer.start,window.clearTimeout(t.callbackTimer.clock)),o(t.node),t.callbackTimer={start:Date.now(),clock:window.setTimeout(function(){n(t.node),t.callbackTimer=null,t.revealed&&!t.config.reset&&t.config.cleanup&&H.call(r,t.node)},i-a)}}function ct(t,e){if(e===void 0&&(e=this.pristine),!t.visible&&t.revealed&&t.config.reset)return $.call(this,t,{reset:!0});var r=this.store.sequences[t.sequence.id],i=t.sequence.index;if(r){var o=new tt(r,"visible",this.store),n=new tt(r,"revealed",this.store);if(r.models={visible:o,revealed:n},!n.body.length){var a=r.members[o.body[0]],d=this.store.elements[a];if(d)return M.call(this,r,o.body[0],-1,e),M.call(this,r,o.body[0],1,e),$.call(this,d,{reveal:!0,pristine:e})}if(!r.blocked.head&&i===[].concat(n.head).pop()&&i>=[].concat(o.body).shift())return M.call(this,r,i,-1,e),$.call(this,t,{reveal:!0,pristine:e});if(!r.blocked.foot&&i===[].concat(n.foot).shift()&&i<=[].concat(o.body).pop())return M.call(this,r,i,1,e),$.call(this,t,{reveal:!0,pristine:e})}}function Lt(t){var e=Math.abs(t);if(!isNaN(e))this.id=X(),this.interval=Math.max(e,16),this.members=[],this.models={},this.blocked={head:!1,foot:!1};else throw new RangeError("Invalid sequence interval.")}function tt(t,e,r){var i=this;this.head=[],this.body=[],this.foot=[],s(t.members,function(o,n){var a=r.elements[o];a&&a[e]&&i.body.push(n)}),this.body.length&&s(t.members,function(o,n){var a=r.elements[o];a&&!a[e]&&(n<i.body[0]?i.head.push(n):i.foot.push(n))})}function M(t,e,r,i){var o=this,n=["head",null,"foot"][1+r],a=t.members[e+r],d=this.store.elements[a];t.blocked[n]=!0,setTimeout(function(){t.blocked[n]=!1,d&&ct.call(o,d,i)},t.interval)}function ut(t,e,r){var i=this;e===void 0&&(e={}),r===void 0&&(r=!1);var o=[],n,a=e.interval||nt.interval;try{a&&(n=new Lt(a));var d=k(t);if(!d.length)throw new Error("Invalid reveal target.");var p=d.reduce(function(c,f){var u={},v=f.getAttribute("data-sr-id");v?(I(u,i.store.elements[v]),R(u.node,u.styles.inline.computed)):(u.id=X(),u.node=f,u.seen=!1,u.revealed=!1,u.visible=!1);var _=I({},u.config||i.defaults,e);if(!_.mobile&&A()||!_.desktop&&!A())return v&&H.call(i,u),c;var g=k(_.container)[0];if(!g)throw new Error("Invalid container.");if(!g.contains(f))return c;var E;return E=Nt(g,o,i.store.containers),E===null&&(E=X(),o.push({id:E,node:g})),u.config=_,u.containerId=E,u.styles=St(u),n&&(u.sequence={id:n.id,index:n.members.length},n.members.push(u.id)),c.push(u),c},[]);s(p,function(c){i.store.elements[c.id]=c,c.node.setAttribute("data-sr-id",c.id)})}catch(c){return T.call(this,"Reveal failed.",c.message)}s(o,function(c){i.store.containers[c.id]={id:c.id,node:c.node}}),n&&(this.store.sequences[n.id]=n),r!==!0&&(this.store.history.push({target:t,options:e}),this.initTimeout&&window.clearTimeout(this.initTimeout),this.initTimeout=window.setTimeout(at.bind(this),0))}function Nt(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];var i=null;return s(e,function(o){s(o,function(n){i===null&&n.node===t&&(i=n.id)})}),i}function Ct(){var t=this;s(this.store.history,function(e){ut.call(t,e.target,e.options,!0)}),at.call(this)}var Dt=function(t){return(t>0)-(t<0)||+t},et=Math.sign||Dt;function rt(t,e){var r=e?t.node.clientHeight:t.node.offsetHeight,i=e?t.node.clientWidth:t.node.offsetWidth,o=0,n=0,a=t.node;do isNaN(a.offsetTop)||(o+=a.offsetTop),isNaN(a.offsetLeft)||(n+=a.offsetLeft),a=a.offsetParent;while(a);return{bounds:{top:o,right:n+i,bottom:o+r,left:n},height:r,width:i}}function zt(t){var e,r;return t.node===document.documentElement?(e=window.pageYOffset,r=window.pageXOffset):(e=t.node.scrollTop,r=t.node.scrollLeft),{top:e,left:r}}function Ft(t){t===void 0&&(t={});var e=this.store.containers[t.containerId];if(e){var r=Math.max(0,Math.min(1,t.config.viewFactor)),i=t.config.viewOffset,o={top:t.geometry.bounds.top+t.geometry.height*r,right:t.geometry.bounds.right-t.geometry.width*r,bottom:t.geometry.bounds.bottom-t.geometry.height*r,left:t.geometry.bounds.left+t.geometry.width*r},n={top:e.geometry.bounds.top+e.scroll.top+i.top,right:e.geometry.bounds.right+e.scroll.left-i.right,bottom:e.geometry.bounds.bottom+e.scroll.top-i.bottom,left:e.geometry.bounds.left+e.scroll.left+i.left};return o.top<n.bottom&&o.right>n.left&&o.bottom>n.top&&o.left<n.right||t.styles.position==="fixed"}}function Bt(t,e){var r=this;t===void 0&&(t={type:"init"}),e===void 0&&(e=this.store.elements),It(function(){var i=t.type==="init"||t.type==="resize";s(r.store.containers,function(o){i&&(o.geometry=rt.call(r,o,!0));var n=zt.call(r,o);o.scroll&&(o.direction={x:et(n.left-o.scroll.left),y:et(n.top-o.scroll.top)}),o.scroll=n}),s(e,function(o){(i||o.geometry===void 0)&&(o.geometry=rt.call(r,o)),o.visible=Ft.call(r,o)}),s(e,function(o){o.sequence?ct.call(r,o):$.call(r,o)}),r.pristine=!1})}function Wt(){var t=document.documentElement.style;return"transform"in t||"WebkitTransform"in t}function Yt(){var t=document.documentElement.style;return"transition"in t||"WebkitTransition"in t}var Ut="4.0.9",N,C,D,z,F,m,B,W;function O(t){t===void 0&&(t={});var e=typeof this>"u"||Object.getPrototypeOf(this)!==O.prototype;if(e)return new O(t);if(!O.isSupported())return T.call(this,"Instantiation failed.","This browser is not supported."),j.failure();var r;try{r=m?I({},m,t):I({},nt,t)}catch(o){return T.call(this,"Invalid configuration.",o.message),j.failure()}try{var i=k(r.container)[0];if(!i)throw new Error("Invalid container.")}catch(o){return T.call(this,o.message),j.failure()}return m=r,!m.mobile&&A()||!m.desktop&&!A()?(T.call(this,"This device is disabled.","desktop: "+m.desktop,"mobile: "+m.mobile),j.failure()):(j.success(),this.store={containers:{},elements:{},history:[],sequences:{}},this.pristine=!0,N=N||Bt.bind(this),C=C||Mt.bind(this),D=D||ut.bind(this),z=z||H.bind(this),F=F||Ct.bind(this),Object.defineProperty(this,"delegate",{get:function(){return N}}),Object.defineProperty(this,"destroy",{get:function(){return C}}),Object.defineProperty(this,"reveal",{get:function(){return D}}),Object.defineProperty(this,"clean",{get:function(){return z}}),Object.defineProperty(this,"sync",{get:function(){return F}}),Object.defineProperty(this,"defaults",{get:function(){return m}}),Object.defineProperty(this,"version",{get:function(){return Ut}}),Object.defineProperty(this,"noop",{get:function(){return!1}}),W||(W=this))}O.isSupported=function(){return Wt()&&Yt()};Object.defineProperty(O,"debug",{get:function(){return B||!1},set:function(t){return B=typeof t=="boolean"?t:B}});O();const L=t=>(mt("data-v-279ade3f"),t=t(),wt(),t),Xt={class:"home"},Ht=L(()=>y("span",null,"Error 404",-1)),Vt=L(()=>y("h1",{class:"home__title"},"页面丢失",-1)),Gt=L(()=>y("p",null,[J(" 您要寻找的页面不存在"),y("br"),J(" 请尝试重新搜索 ")],-1)),Zt=L(()=>y("div",{class:"home__img"},[y("img",{src:ft,alt:""}),y("div",{class:"home__shadow"})],-1)),Jt={__name:"index",setup(t){const e=vt({scrollReveal:O({distance:"90px",duration:1500})}),r=pt(),i=()=>{r.replace({name:"index"})};return yt(()=>{e.scrollReveal.reveal(".home__data",{origin:"top",delay:400}),e.scrollReveal.reveal(".home__img",{origin:"bottom",delay:600}),e.scrollReveal.reveal(".home__footer",{origin:"bottom",delay:800})}),(o,n)=>(gt(),bt("section",Xt,[y("div",{class:"home__container"},[y("div",{class:"home__data"},[Ht,Vt,Gt,y("div",{class:"home__button",onClick:i},"返回首页")]),Zt])]))}},te=ht(Jt,[["__scopeId","data-v-279ade3f"]]);export{te as default};
