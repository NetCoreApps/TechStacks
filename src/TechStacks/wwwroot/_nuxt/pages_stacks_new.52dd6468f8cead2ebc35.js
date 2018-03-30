webpackJsonp([9],{"+Nq1":function(e,t,n){"use strict";var i=function(){var e=this.$createElement,t=this._self._c||e;return t("v-container",{staticClass:"no-prerender"},[t("TechStackEdit")],1)};i._withStripped=!0;var s={render:i,staticRenderFns:[]};t.a=s},"4Fdx":function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,"input[type=file][data-v-036beace]{position:absolute;left:-99999px}",""])},"5c1x":function(e,t,n){"use strict";var i=n("BpKR"),s=n("pQMr"),r=n("VU/8")(i.a,s.a,!1,null,null,null);r.options.__file="src\\components\\TechStackEdit.vue",t.a=r.exports},"9zOA":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("yp0+"),s=n("+Nq1"),r=n("VU/8")(i.a,s.a,!1,null,null,null);r.options.__file="src\\pages\\stacks\\new.vue",t.default=r.exports},BVBb:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[n("img",{ref:"imageUrl",staticStyle:{cursor:"pointer"},attrs:{src:e.imageUrl},on:{click:e.onPickFile}})]),n("div",[e.imageUrl?n("v-btn",{staticClass:"error",attrs:{raised:""},on:{click:e.removeFile}},[e._v("\n            "+e._s(e.removeLabel)+"\n        ")]):n("v-btn",{attrs:{raised:""},on:{click:e.onPickFile}},[e._v("\n            "+e._s(e.selectLabel)+"\n        ")]),n("input",{ref:"image",attrs:{type:"file",name:"image",accept:e.accept},on:{change:e.onFilePicked}})],1)])};i._withStripped=!0;var s={render:i,staticRenderFns:[]};t.a=s},BpKR:function(e,t,n){"use strict";var i=n("woOf"),s=n.n(i),r=n("Xxa5"),a=n.n(r),o=n("exGp"),l=n.n(o),c=n("fZjL"),u=n.n(c),f=n("Dd8w"),d=n.n(f),h=n("TxlB"),v=n("aek+"),p=n("NYxO"),m=n("5YJS"),g=n("kRG6"),b=(n.n(g),n("J9uk")),k=n("u1Qv"),S={name:"",slug:"",vendorName:"",appUrl:"",description:"",details:"",isLocked:!1,screenshot:null,screenshotUrl:"",organizationId:null,technologyIds:[]};t.a={props:["techstack"],components:{FileInput:h.a,Editor:v.a},computed:d()({isUpdate:function(){return null!=this.techstack},errorSummary:function(){return g.errorResponseExcept.call(this,u()(S))},canChange:function(){return!this.techstack||this.user.userAuthId==this.techstack.ownerId||this.isAdmin}},Object(p.mapGetters)(["loading","isAuthenticated","user","isAdmin","technologySelectItems","getLangByOrganizationId"])),watch:{name:function(e){this.slug=Object(m.v)(e)}},methods:{done:function(){this.$router.push(k.a.stack(this.slug))},onFileChange:function(e){this.screenshot=e},submit:function(){var e=l()(a.a.mark(function e(){var t,n;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.$refs.form.validate()){e.next=24;break}if(e.prev=1,this.$store.commit("loading",!0),t=g.toObject.call(this,u()(S)),this.techstack){e.next=10;break}return e.next=7,Object(b.m)(t,this.screenshot);case 7:e.t0=e.sent,e.next=13;break;case 10:return e.next=12,Object(b._13)(d()({},t,{id:this.id}),this.screenshot);case 12:e.t0=e.sent;case 13:n=e.t0,this.$store.dispatch("loadTechnologyStack",this.slug),this.$router.push(k.a.stack(n.slug)),e.next=21;break;case 18:e.prev=18,e.t1=e.catch(1),this.responseStatus=e.t1.responseStatus||e.t1;case 21:return e.prev=21,this.$store.commit("loading",!1),e.finish(21);case 24:case"end":return e.stop()}},e,this,[[1,18,21,24]])}));return function(){return e.apply(this,arguments)}}(),remove:function(){var e=l()(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.$store.commit("loading",!0),e.next=4,Object(b.r)(this.id);case 4:return this.$store.commit("removeTechStack",this.techstack),e.next=7,this.$router.push(k.a.homeStacks);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),this.responseStatus=e.t0.responseStatus||e.t0;case 12:return e.prev=12,this.$store.commit("loading",!1),e.finish(12);case 15:case"end":return e.stop()}},e,this,[[0,9,12,15]])}));return function(){return e.apply(this,arguments)}}(),loadVersion:function(e){s()(this,e,{id:this.id})},handleKeyUp:function(e){if(!Object(m.k)(e)){var t=String.fromCharCode(e.keyCode).toLowerCase();"Escape"===e.key||27===e.keyCode?this.done():"s"===t&&this.submit()}},errorResponse:g.errorResponse,dateFmtHM:g.dateFmtHM},mounted:function(){var e=l()(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.techstack){e.next=8;break}return this.title="Edit "+this.techstack.name,this.actionLabel="Update TechStack",s()(this,this.techstack),this.technologyIds=(this.techstack.technologyChoices||[]).map(function(e){return e.technologyId}),e.next=7,Object(b.E)(this.techstack.slug);case 7:this.previousVersions=e.sent;case 8:this.$store.dispatch("loadTechnologyTiers"),window.addEventListener("keyup",this.handleKeyUp);case 10:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),destroyed:function(){window.removeEventListener("keyup",this.handleKeyUp)},data:function(){return d()({},S,{title:"Add a new TechStack",actionLabel:"Add TechStack",valid:!0,allowDelete:!1,responseStatus:null,nameCounter:m.l,nameRules:m.m,slugCounter:m.o,slugRules:m.p,urlCounter:m.w,urlRules:m.x,descriptionCounter:m.e,descriptionRules:m.f,previousVersions:[]})}}},GCcf:function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,".editor-toolbar{margin-top:10px;border:1px solid rgba(0,0,0,.2)}.editor textarea,.monospace{font-size:15px;font-family:Consolas,Monaco,Inconsolata,Menlo,monospace,Lucida Console}",""])},QIDw:function(e,t,n){var i=n("4Fdx");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("rjj0")("cc022a9c",i,!1,{sourceMap:!1})},Qtg8:function(e,t,n){var i=n("GCcf");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("rjj0")("834a311e",i,!1,{sourceMap:!1})},TwPB:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"editor"},[e.disabled?e._e():n("div",{staticClass:"editor-toolbar"},[n("v-btn",{attrs:{small:"",icon:"",title:"Bold text (CTRL+B)"},on:{click:e.bold}},[n("v-icon",[e._v("format_bold")])],1),n("v-btn",{attrs:{small:"",icon:"",title:"Italics (CTRL+I)"},on:{click:e.italic}},[n("v-icon",[e._v("format_italic")])],1),n("v-btn",{attrs:{small:"",icon:"",title:"Insert Link (CTRL+L)"},on:{click:e.link}},[n("v-icon",[e._v("insert_link")])],1),n("v-btn",{attrs:{small:"",icon:"",title:"Blockquote (CTRL+Q)"},on:{click:e.quote}},[n("v-icon",[e._v("format_quote")])],1),n("v-btn",{attrs:{small:"",icon:"",title:"Insert Image (CTRL+SHIFT+L)"},on:{click:e.image}},[n("v-icon",[e._v("insert_photo")])],1),n("v-btn",{attrs:{small:"",icon:"",title:"Insert Code (CTRL+<)"},on:{click:e.code}},[n("v-icon",[e._v("code")])],1),n("v-btn",{attrs:{small:"",icon:"",title:"H2 Heading (CTRL+H)"},on:{click:e.heading}},[n("v-icon",[e._v("format_size")])],1),n("v-btn",{attrs:{small:"",icon:"",title:"Numbered List (ALT+1)"},on:{click:e.ol}},[n("v-icon",[e._v("format_list_numbered")])],1),n("v-btn",{attrs:{small:"",icon:"",title:"Bulleted List (ALT+-)"},on:{click:e.ul}},[n("v-icon",[e._v("format_list_bulleted")])],1),n("v-btn",{attrs:{small:"",icon:"",title:"Strike Through (ALT+S)"},on:{click:e.strikethrough}},[n("v-icon",[e._v("format_strikethrough")])],1),n("v-btn",{attrs:{small:"",icon:"",title:"undo (CTRL+Z)"},on:{click:e.undo}},[n("v-icon",[e._v("undo")])],1),n("v-btn",{attrs:{small:"",icon:"",title:"redo (CTRL+SHIFT+Z)"},on:{click:e.redo}},[n("v-icon",[e._v("redo")])],1),n("v-btn",{attrs:{small:"",icon:"",title:"Save (CTRL+S)"},on:{click:e.save}},[n("v-icon",[e._v("save")])],1),n("a",{staticClass:"btn btn--icon btn--small",staticStyle:{float:"right"},attrs:{title:"formatting help",target:"_blank",href:"https://guides.github.com/features/mastering-markdown/"}},[n("v-icon",[e._v("help_outline")])],1)],1),n("v-text-field",{ref:"txt",attrs:{label:e.label,value:e.value,spellcheck:!e.value||-1===e.value.indexOf("```"),counter:e.counter,"multi-line":"","auto-grow":"",rows:e.rows||6,disabled:e.disabled,rules:e.rules,"error-messages":e.errorMessages},on:{input:function(t){return e.$emit("input",t)},keydown:function(t){return"button"in t||!e._k(t.keyCode,"tab",9,t.key,"Tab")?e.tab(t):null}}})],1)};i._withStripped=!0;var s={render:i,staticRenderFns:[]};t.a=s},TxlB:function(e,t,n){"use strict";var i=n("z6fj"),s=n("BVBb"),r=!1;var a=function(e){r||n("QIDw")},o=n("VU/8")(i.a,s.a,!1,a,"data-v-036beace",null);o.options.__file="src\\components\\FileInput.vue",t.a=o.exports},"aek+":function(e,t,n){"use strict";var i=n("eKwF"),s=n("TwPB"),r=!1;var a=function(e){r||n("Qtg8")},o=n("VU/8")(i.a,s.a,!1,a,null,null);o.options.__file="src\\components\\Editor.vue",t.a=o.exports},eKwF:function(e,t,n){"use strict";var i=n("Dd8w"),s=n.n(i),r=[],a=[],o={input:function(){return this.$refs.txt.$refs.input},hasSelection:function(){return this.input().selectionStart!=this.input().selectionEnd},selection:function(){var e=this.input();return e.value.substring(e.selectionStart,e.selectionEnd)||""},selectionInfo:function(){var e=this.input(),t=e.value,n=e.selectionStart,i=t.substring(n,e.selectionEnd)||"",s=t.substring(0,n),r=s.lastIndexOf("\n");return{value:t,sel:i,selPos:n,beforeSel:s,afterSel:t.substring(n),prevCRPos:r,beforeCR:r>=0?s.substring(0,r+1):"",afterCR:r>=0?s.substring(r+1):""}},replace:function(e){var t=e.value,n=e.selectionStart,i=e.selectionEnd;null==i&&(i=n);var s=this.input();this.$emit("input",t),this.$nextTick(function(){s.focus(),s.setSelectionRange(n,i)})},insert:function(e,t,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=i.selectionAtEnd,o=i.offsetStart,l=i.offsetEnd,c=i.filterValue,u=i.filterSelection,f=this.input(),d=f.value,h=f.selectionEnd;r.push({value:d,selectionStart:f.selectionStart,selectionEnd:f.selectionEnd}),a=[];var v=f.selectionStart,p=f.selectionEnd,m=d.substring(0,v),g=d.substring(p),b=e&&m.endsWith(e)&&g.startsWith(t);if(v==p){if(b?(d=m.substring(0,m.length-e.length)+g.substring(t.length),h+=-t.length):(d=m+e+n+t+g,h+=e.length,o=0,l=n.length,s&&(h+=l,l=0)),c){var k={pos:h};d=c(d,k),h=k.pos}}else{var S=d.substring(v,p);u&&(S=u(S)),b?(d=m.substring(0,m.length-e.length)+S+g.substring(t.length),o=-S.length-e.length,l=S.length):(d=m+e+S+t+g,o?h+=(e+t).length:(h=v,o=e.length,l=S.length))}this.$emit("input",d),this.$nextTick(function(){f.focus(),l=(o=h+(o||0))+(l||0),f.setSelectionRange(o,l)})},bold:function(){this.insert("**","**","bold")},italic:function(){this.insert("_","_","italics")},strikethrough:function(){this.insert("~~","~~","strikethrough")},link:function(){this.insert("[","](http://)","",{offsetStart:-8,offsetEnd:7})},quote:function(){this.insert("\n> ","\n","Blockquote",{})},image:function(){this.insert("![","](http://)","alt text",{offsetStart:-8,offsetEnd:7})},code:function(e){var t=this.selection();if(t&&!e.shiftKey)this.insert("`","`","code");else{var n=this.lang||"js";-1===t.indexOf("\n")?this.insert("\n```"+n+"\n","\n```\n","// code"):this.insert("```"+n+"\n","```\n","")}},ol:function(){if(this.hasSelection()){var e=this.selectionInfo(),t=e.sel,n=(e.selPos,e.beforeSel),i=e.afterSel,s=e.prevCRPos,r=e.beforeCR,a=e.afterCR;if(-1===t.indexOf("\n"))this.insert("\n 1. ","\n");else if(!t.startsWith(" 1. ")){var o=1;this.insert("",""," - ",{selectionAtEnd:!0,filterSelection:function(e){return" 1. "+e.replace(/\n$/,"").replace(/\n/g,function(e){return"\n "+ ++o+". "})+"\n"}})}else this.insert("","","",{filterValue:function(e,t){if(s>=0){var o=a.replace(/^ - /,"");n=r+o,t.pos-=a.length-o.length}return n+i},filterSelection:function(e){return e.replace(/^ 1. /g,"").replace(/\n \d+. /g,"\n")}})}else this.insert("\n 1. ","\n","List Item",{offsetStart:-10,offsetEnd:9})},ul:function(){if(this.hasSelection()){var e=this.selectionInfo(),t=e.sel,n=(e.selPos,e.beforeSel),i=e.afterSel,s=e.prevCRPos,r=e.beforeCR,a=e.afterCR;if(-1===t.indexOf("\n"))this.insert("\n - ","\n");else!t.startsWith(" - ")?this.insert("",""," - ",{selectionAtEnd:!0,filterSelection:function(e){return" - "+e.replace(/\n$/,"").replace(/\n/g,"\n - ")+"\n"}}):this.insert("","","",{filterValue:function(e,t){if(s>=0){var o=a.replace(/^ - /,"");n=r+o,t.pos-=a.length-o.length}return n+i},filterSelection:function(e){return e.replace(/^ - /g,"").replace(/\n - /g,"\n")}})}else this.insert("\n - ","\n","List Item",{offsetStart:-10,offsetEnd:9})},heading:function(){var e=this.selection(),t=-1===e.indexOf("\n");e?t?this.insert("\n## ","\n",""):this.insert("## ","",""):this.insert("\n## ","\n","Heading",{offsetStart:-8,offsetEnd:7})},comment:function(){var e=this.selectionInfo(),t=e.sel,n=e.selPos,i=e.beforeSel,s=e.afterSel,r=e.prevCRPos,a=e.beforeCR,o=e.afterCR,l=!t.startsWith("//")&&!o.startsWith("//");l?t?this.insert("","","//",{selectionAtEnd:!0,filterSelection:function(e){return"//"+e.replace(/\n$/,"").replace(/\n/g,"\n//")+"\n"}}):this.replace({value:a+"//"+o+s,selectionStart:n+"//".length}):this.insert("","","",{filterValue:function(e,t){if(r>=0){var n=o.replace(/^\/\//,"");i=a+n,t.pos-=o.length-n.length}return i+s},filterSelection:function(e){return e.replace(/^\/\//g,"").replace(/\n\/\//g,"\n")}})},blockComment:function(){this.insert("/*\n","*/\n","")},undo:function(){if(0==r.length)return!1;var e=this.input(),t=r.pop();return a.push({value:e.value,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd}),this.replace(t),!0},redo:function(){if(0==a.length)return!1;var e=this.input(),t=a.pop();return r.push({value:e.value,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd}),this.replace(t),!0}};t.a={props:["label","value","counter","rows","rules","errorMessages","lang","autofocus","disabled"],methods:s()({save:function(){this.$emit("save")}},o),mounted:function(){var e=this;r=[],a=[],this.$refs.txt.$refs.input.onkeydown=function(t){if("Escape"!==t.key&&27!==t.keyCode){var n=String.fromCharCode(t.keyCode).toLowerCase();if("\t"===n)!t.shiftKey?e.insert("","","    ",{selectionAtEnd:!0,filterSelection:function(e){return"    "+e.replace(/\n$/,"").replace(/\n/g,"\n    ")+"\n"}}):e.insert("","","",{filterValue:function(t,n){var i=e.selectionInfo(),s=(i.selPos,i.beforeSel),r=i.afterSel,a=i.prevCRPos,o=i.beforeCR,l=i.afterCR;if(a>=0){var c=l.replace(/\t/g,"    ").replace(/^ ? ? ? ?/,"");s=o+c,n.pos-=l.length-c.length}return s+r},filterSelection:function(e){return e.replace(/\t/g,"    ").replace(/^ ? ? ? ?/g,"").replace(/\n    /g,"\n")}}),t.preventDefault();else t.ctrlKey?"z"===n?t.shiftKey?e.redo()&&t.preventDefault():e.undo()&&t.preventDefault():"b"!==n||t.shiftKey?"h"!==n||t.shiftKey?"i"!==n||t.shiftKey?"q"!==n||t.shiftKey?"l"===n?t.shiftKey?(e.image(),t.preventDefault()):(e.link(),t.preventDefault()):","===n||"<"===t.key||">"===t.key||188===t.keyCode?(e.code(t),t.preventDefault()):"s"!==n||t.shiftKey?"/"===n||"/"===t.key?(e.comment(),t.preventDefault()):"?"!==n&&"?"!==t.key||!t.shiftKey||(e.blockComment(),t.preventDefault()):(e.save(),t.preventDefault()):(e.quote(),t.preventDefault()):(e.italic(),t.preventDefault()):(e.heading(),t.preventDefault()):(e.bold(),t.preventDefault()):t.altKey&&("1"===t.key||"0"===t.key?(e.ol(),t.preventDefault()):"-"===t.key?(e.ul(),t.preventDefault()):"s"===t.key&&(e.strikethrough(),t.preventDefault()))}else e.$emit("close")}},data:function(){return{}}}},pQMr:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[e.isAuthenticated?e._e():n("v-layout",{attrs:{fluid:""}},[n("v-flex",{staticClass:"headline",staticStyle:{"text-align":"center"}},[e._v("Authentication is Required")])],1),e.isAuthenticated?n("v-layout",{attrs:{fluid:""}},[n("v-flex",{class:e.loading?"loading-body":"",attrs:{sm10:"","offset-sm1":""}},[n("v-toolbar",[n("v-toolbar-title",{staticClass:"headline"},[e._v(e._s(e.title))]),n("v-spacer"),e.previousVersions.length>0?n("v-toolbar-items",[n("v-menu",{attrs:{"offset-y":""}},[n("v-btn",{attrs:{slot:"activator",flat:""},slot:"activator"},[e._v("\r\n                    Previous Versions  \r\n                    "),n("v-icon",[e._v("reply")])],1),n("v-list",e._l(e.previousVersions,function(t){return n("v-list-tile",{key:t.id,on:{click:function(n){e.loadVersion(t)}}},[n("v-list-tile-title",[e._v("Modified by "+e._s(t.lastModifiedBy)+" at "+e._s(e.dateFmtHM(new Date(t.lastModified))))])],1)}))],1)],1):e._e()],1),n("v-card",[n("v-card-title",{attrs:{"primary-title":""}},[n("v-form",{ref:"form",staticStyle:{width:"100%"},attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("v-container",[n("v-alert",{attrs:{outline:"",color:"error",icon:"warning",value:e.errorSummary}},[e._v(e._s(e.errorSummary))]),n("v-layout",[n("v-flex",{attrs:{xs6:""}},[n("v-text-field",{attrs:{label:"Stack Name",required:"",rules:e.nameRules,counter:e.nameCounter,"error-messages":e.errorResponse("name")},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),n("v-text-field",{attrs:{disabled:e.isUpdate,label:"Slug",required:"",rules:e.slugRules,counter:e.slugCounter,"error-messages":e.errorResponse("slug")},model:{value:e.slug,callback:function(t){e.slug=t},expression:"slug"}}),n("v-text-field",{attrs:{label:"Vendor Name",required:"",rules:e.nameRules,counter:e.nameCounter,"error-messages":e.errorResponse("vendorName")},model:{value:e.vendorName,callback:function(t){e.vendorName=t},expression:"vendorName"}})],1),n("v-flex",{staticClass:"image-upload",staticStyle:{"text-align":"right"},attrs:{xs6:""}},[n("v-layout",{staticStyle:{"text-align":"center",margin:"1em auto"}},[n("v-alert",{attrs:{outline:"",color:"error",icon:"warning",value:e.errorResponse("screenshotUrl")}},[e._v(e._s(e.errorResponse("screenshotUrl")))])],1),n("small",{staticStyle:{"margin-right":"2em",color:"#999"}},[e._v("(minimum 860 x 690)")]),n("file-input",{ref:"fileScreenshot",attrs:{value:e.screenshotUrl,accept:"image/*",selectLabel:"Add Screenshot"},on:{input:e.onFileChange}})],1)],1),n("v-text-field",{attrs:{label:"App URL",required:"",rules:e.urlRules,counter:e.urlCounter,"error-messages":e.errorResponse("appUrl")},model:{value:e.appUrl,callback:function(t){e.appUrl=t},expression:"appUrl"}}),n("v-select",{attrs:{label:"Select Technologies",autocomplete:"",loading:e.loading,multiple:"",chips:"",required:"",items:e.technologySelectItems,rules:[function(){return e.technologyIds.length>0||"You must choose at least one"}]},model:{value:e.technologyIds,callback:function(t){e.technologyIds=t},expression:"technologyIds"}}),n("v-text-field",{attrs:{label:"Summary",counter:e.descriptionCounter,"multi-line":"",rows:6,required:"",rules:e.descriptionRules,"error-messages":e.errorResponse("description")},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}}),n("Editor",{attrs:{label:"details (markdown)",rows:20,counter:8e3,rules:[function(e){return e.length<=8e3||"Max 8000 characters"}],"error-messages":e.errorResponse("details"),lang:e.getLangByOrganizationId(e.organizationId)},on:{save:e.submit,close:e.done},model:{value:e.details,callback:function(t){e.details=t},expression:"details"}}),n("v-checkbox",{directives:[{name:"show",rawName:"v-show",value:e.canChange,expression:"canChange"}],attrs:{label:"Prevent others from editing this Technology?"},model:{value:e.isLocked,callback:function(t){e.isLocked=t},expression:"isLocked"}})],1)],1)],1),n("v-card-actions",{staticStyle:{"text-align":"center"}},[n("v-layout",[n("v-flex",[n("v-btn",{attrs:{large:"",title:"Close (ESC)"},on:{click:e.done}},[e._v("Close")])],1),n("v-flex",[n("v-btn",{attrs:{large:"",disabled:!e.valid||e.loading,color:"primary",title:"Save (S)"},on:{click:e.submit}},[e._v(e._s(e.actionLabel))])],1),e.techstack&&(e.techstack.ownerId==e.user.userAuthId||e.isAdmin)?n("v-flex",{staticStyle:{margin:".5em -3em 0 3em"},attrs:{xs1:""}},[n("v-checkbox",{attrs:{large:"",label:"confirm"},model:{value:e.allowDelete,callback:function(t){e.allowDelete=t},expression:"allowDelete"}})],1):e._e(),e.techstack&&(e.techstack.ownerId==e.user.userAuthId||e.isAdmin)?n("v-flex",{attrs:{xs5:""}},[n("v-btn",{staticClass:"white--text",attrs:{large:"",disabled:!e.allowDelete,color:"red"},on:{click:e.remove}},[e._v("\r\n                      Delete TechStack\r\n                    ")])],1):e._e()],1)],1)],1)],1)],1):e._e()],1)};i._withStripped=!0;var s={render:i,staticRenderFns:[]};t.a=s},"yp0+":function(e,t,n){"use strict";var i=n("5c1x");t.a={components:{TechStackEdit:i.a}}},z6fj:function(e,t,n){"use strict";t.a={props:{value:{type:String},accept:{type:String,default:"*"},selectLabel:{type:String,default:"Select an image"},removeLabel:{type:String,default:"Remove"}},data:function(){return{imageUrl:""}},watch:{value:function(e){this.imageUrl=e}},mounted:function(){this.imageUrl=this.value},methods:{onPickFile:function(){this.$refs.image.click()},onFilePicked:function(e){var t=this,n=e.target.files||e.dataTransfer.files;if(n&&n[0]){var i=n[0].name;if(i&&i.lastIndexOf(".")<=0)return;var s=new FileReader;s.addEventListener("load",function(){t.imageUrl=s.result}),s.readAsDataURL(n[0]),this.$emit("input",n[0])}},removeFile:function(){this.imageUrl=""}}}}});