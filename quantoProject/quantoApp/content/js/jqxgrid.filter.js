/*
jQWidgets v3.2.0 (2014-Feb-01)
Copyright (c) 2011-2014 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function(a){a.extend(a.jqx._jqxGrid.prototype,{_updatefilterrowui:function(f){var l=this.columns.records.length;var e=0;for(var h=0;h<l;h++){var g=this.columns.records[h];var c=g.width;if(c<g.minwidth){c=g.minwidth}if(c>g.maxwidth){c=g.maxwidth}var k=a(this.filterrow[0].cells[h]);k.css("left",e);var i=true;if(k.width()==c){i=false}if(f){i=true}k.width(c);k[0].left=e;if(!(g.hidden&&g.hideable)){e+=c}else{k.css("display","none")}if(!i){continue}if(g.createfilterwidget&&g.filtertype=="custom"){g.createfilterwidget(g,k)}else{if(g.filterable){var d=function(m,n){var j=a(n.children()[0]);j.width(c-10)};switch(g.filtertype){case"number":a(k.children()[0]).width(c);k.find("input").width(c-30);break;case"date":if(this.host.jqxDateTimeInput){a(k.children()[0]).jqxDateTimeInput({width:c-10})}else{d(this,k)}break;case"textbox":case"default":d(this,k);break;case"list":case"checkedlist":if(this.host.jqxDropDownList){a(k.children()[0]).jqxDropDownList({width:c-10})}else{d(this,k)}break;case"bool":case"boolean":if(!this.host.jqxCheckBox){d(this,k)}break}}}}var b=a(this.filterrow.children()[0]);b.width(parseInt(e)+2);b.height(this.filterrowheight)},clearfilterrow:function(){this._disablefilterrow=true;var b=this.columns.records.length;var f=0;for(var d=0;d<b;d++){var c=this.columns.records[d];var g=a(this.filterrow[0].cells[d]);if(c.filterable){var e=function(i,j){var h=a(j.children()[0]);h.val("");if(h[0]){i["_oldWriteText"+h[0].id]=""}};switch(c.filtertype){case"number":g.find("input").val("");break;case"date":if(this.host.jqxDateTimeInput){a(g.children()[0]).jqxDateTimeInput("setDate",null)}else{e(this,g)}break;case"textbox":case"default":e(this,g);break;case"list":if(this.host.jqxDropDownList){a(g.children()[0]).jqxDropDownList("clearSelection")}else{e(this,g)}break;case"checkedlist":if(this.host.jqxDropDownList){a(g.children()[0]).jqxDropDownList("checkAll",false)}else{e(this,g)}break;case"bool":case"boolean":if(!this.host.jqxCheckBox){e(this,g)}else{a(g.children()[0]).jqxCheckBox({checked:null})}break}}}this._disablefilterrow=false},_applyfilterfromfilterrow:function(){if(this._disablefilterrow==true){return}var z=this.columns.records.length;var C=this.that;for(var t=0;t<z;t++){var k=new a.jqx.filter();var u=this.columns.records[t];if(!u.filterable){continue}if(u.datafield===null){continue}var f=C._getcolumntypebydatafield(u);var d=C._getfiltertype(f);var l=1;var D=true;var e=u.filtertype;var A=function(j,K,H){var i=true;if(j._filterwidget){var F=j._filterwidget.val();if(F!=""){var I="equal";if(K=="stringfilter"){var I="contains"}if(K=="numericfilter"){if(C.gridlocalization.decimalseparator==","){if(F.indexOf(C.gridlocalization.decimalseparator)>=0){F=F.replace(C.gridlocalization.decimalseparator,".")}}}if(K!="stringfilter"){var J=0;if(F.indexOf(">")!=-1){I="greater_than";J=1}if(F.indexOf("<")!=-1){I="less_than";J=1}if(F.indexOf("=")!=-1){if(I=="greater_than"){I="greater_than_or_equal";J=2}else{if(I=="less_than"){I="less_than_or_equal";J=2}else{I="equal";J=1}}}if(J!=0){F=F.substring(J);if(F.length<1){return false}}}if(j.filtercondition!=undefined){I=j.filtercondition}if(K=="datefilter"){var G=H.createfilter(K,F,I,null,j.cellsformat,C.gridlocalization)}else{var G=H.createfilter(K,F,I)}H.addfilter(l,G)}else{i=false}}return i};switch(u.filtertype){case"date":if(u._filterwidget.jqxDateTimeInput){var p=u._filterwidget.jqxDateTimeInput("getRange");if(p!=null&&p.from!=null&&p.to!=null){var o="GREATER_THAN_OR_EQUAL";var r=new Date(0);r.setHours(0);r.setFullYear(p.from.getFullYear(),p.from.getMonth(),p.from.getDate());var q=new Date(0);q.setHours(0);q.setFullYear(p.to.getFullYear(),p.to.getMonth(),p.to.getDate());q.setHours(p.to.getHours());q.setMinutes(p.to.getMinutes());q.setSeconds(p.to.getSeconds());var y=k.createfilter(d,r,o);k.addfilter(0,y);var c="LESS_THAN_OR_EQUAL";var x=k.createfilter(d,q,c);k.addfilter(0,x)}else{D=false}}else{D=A(u,d,k)}break;case"number":if(u._filterwidget){var p=u._filterwidget.find("input").val();if(C.gridlocalization.decimalseparator==","){if(p.indexOf(C.gridlocalization.decimalseparator)>=0){p=p.replace(C.gridlocalization.decimalseparator,".")}}var h=u._filterwidget.find(".filter").jqxDropDownList("selectedIndex");var w=k.getoperatorsbyfiltertype(d)[h];if(C.updatefilterconditions){var E=C.updatefilterconditions(d,k.getoperatorsbyfiltertype(d));if(E!=undefined){k.setoperatorsbyfiltertype(d,E)}var w=k.getoperatorsbyfiltertype(d)[h]}var n=w=="NULL"||w=="NOT_NULL";var s=w=="EMPTY"||w=="NOT_EMPTY";if(p!=undefined&&p.length>0||n||s){y=k.createfilter(d,new Number(p),w,null,u.cellsformat,C.gridlocalization);k.addfilter(0,y)}else{D=false}}else{D=false}break;case"textbox":case"default":D=A(u,d,k);break;case"bool":case"boolean":if(u._filterwidget.jqxCheckBox){var p=u._filterwidget.jqxCheckBox("checked");if(p!=null){var o="equal";var m=k.createfilter(d,p,o);k.addfilter(l,m)}else{D=false}}else{D=A(u,d,k)}break;case"list":var g=u._filterwidget.jqxDropDownList("listBox");if(g.selectedIndex>0){var b=g.getItem(g.selectedIndex);var p=b.label;var o="equal";if(p===""){o="NULL"}var m=k.createfilter(d,p,o);k.addfilter(l,m)}else{D=false}break;case"checkedlist":if(u._filterwidget.jqxDropDownList){var g=u._filterwidget.jqxDropDownList("listBox");var B=g.getCheckedItems();if(B.length==0){for(var v=1;v<g.items.length;v++){var p=g.items[v].label;var o="not_equal";if(p===""){o="NULL"}var m=k.createfilter(d,p,o);k.addfilter(0,m)}D=true}else{if(B.length!=g.items.length){for(var v=0;v<B.length;v++){var p=B[v].label;var o="equal";if(p===""){o="NULL"}var m=k.createfilter(d,p,o);k.addfilter(l,m)}}else{D=false}}}else{D=A(u,d,k)}break}if(!this._loading){if(D){this.addfilter(u.displayfield,k,false)}else{this.removefilter(u.displayfield,false)}}}if(!this._loading){this.applyfilters("filterrow")}},_updatefilterrow:function(){var b=a('<div style="position: relative;" id="row00'+this.element.id+'"></div>');var f=0;var o=this.columns.records.length;var m=this.toThemeProperty("jqx-grid-cell");m+=" "+this.toThemeProperty("jqx-grid-cell-pinned");m+=" "+this.toThemeProperty("jqx-grid-cell-filter-row");var q=o+10;var r=new Array();var n=this.that;this.filterrow[0].cells=r;b.height(this.filterrowheight);this.filterrow.children().detach();this.filterrow.append(b);if(!this._filterrowcache){this._filterrowcache=new Array()}this._initcolumntypes();var g=false;var d=new Array();for(var h=0;h<o;h++){var e=this.columns.records[h];var c=e.width;if(c<e.minwidth){c=e.minwidth}if(c>e.maxwidth){c=e.maxwidth}var l=a('<div style="overflow: hidden; position: absolute; height: 100%;" class="'+m+'"></div>');b.append(l);l.css("left",f);if(this.rtl){l.css("z-index",q++);l.css("border-left-width","1px")}else{l.css("z-index",q--)}l.width(c);l[0].left=f;if(!(e.hidden&&e.hideable)){f+=c}else{l.css("display","none")}r[r.length]=l[0];var k=true;if(!this.rtl){if(this.groupable){var p=(this.showrowdetailscolumn&&this.rowdetails)?1:0;if(this.groups.length+p>h){k=false}}if(this.showrowdetailscolumn&&this.rowdetails&&h==0){k=false}}else{if(this.groupable){var p=(this.showrowdetailscolumn&&this.rowdetails)?1:0;if(this.groups.length+p+h>o-1){k=false}}if(this.showrowdetailscolumn&&this.rowdetails&&h==o-1){k=false}}if(k){if(e.filtertype=="custom"&&e.createfilterwidget){var i=function(){n._applyfilterfromfilterrow()};e.createfilterwidget(e,l,i)}else{if(e.filterable){if(this._filterrowcache[e.datafield]){g=true;l.append(this._filterrowcache[e.datafield]);e._filterwidget=this._filterrowcache[e.datafield]}else{this._addfilterwidget(e,l,c);d[e.datafield]=e._filterwidget}}}}}this._filterrowcache=d;if(a.jqx.browser.msie&&a.jqx.browser.version<8){b.css("z-index",q--)}b.width(parseInt(f)+2);this.filterrow.addClass(m);this.filterrow.css("border-top-width","1px");this.filterrow.css("border-right-width","0px");if(g){this._updatefilterrowui(true)}},_addfilterwidget:function(B,d,z){var F=this.that;var y="";for(var D=0;D<F.dataview.filters.length;D++){var w=F.dataview.filters[D];if(w.datafield&&w.datafield==B.datafield){y=w.filter.getfilters()[0].value;break}}var g=function(G,H){var f=a('<input autocomplete="off" type="textarea"/>');f[0].id=a.jqx.utilities.createId();f.addClass(G.toThemeProperty("jqx-widget"));f.addClass(G.toThemeProperty("jqx-input"));f.addClass(G.toThemeProperty("jqx-rc-all"));f.addClass(G.toThemeProperty("jqx-widget-content"));if(G.rtl){f.css("direction","rtl")}f.appendTo(H);f.width(z-10);f.height(G.filterrowheight-10);f.css("margin","4px");if(B.createfilterwidget){B.createfilterwidget(B,H,f)}B._filterwidget=f;f.focus(function(){G.content[0].scrollLeft=0;setTimeout(function(){G.content[0].scrollLeft=0},10);G.focusedfilter=f;f.addClass(G.toThemeProperty("jqx-fill-state-focus"));return false});f.blur(function(){f.removeClass(G.toThemeProperty("jqx-fill-state-focus"))});f.keydown(function(I){if(I.keyCode=="13"){G._applyfilterfromfilterrow()}if(f[0]._writeTimer){clearTimeout(f[0]._writeTimer)}f[0]._writeTimer=setTimeout(function(){if(!G._loading){if(G["_oldWriteText"+f[0].id]!=f.val()){G._applyfilterfromfilterrow();G["_oldWriteText"+f[0].id]=f.val()}}},800);G.focusedfilter=f});G.host.removeClass("jqx-disableselect");G.content.removeClass("jqx-disableselect");f.val(y)};if(B.datatype!=null){if(B.filtertype=="number"){if(B.datatype=="string"||B.datatype=="date"||B.datatype=="bool"){B.filtertype="textbox"}}if(B.filtertype=="date"){if(B.datatype=="string"||B.datatype=="number"||B.datatype=="bool"){B.filtertype="textbox"}}if(B.filtertype=="bool"){if(B.datatype=="string"||B.datatype=="number"||B.datatype=="date"){B.filtertype="textbox"}}}switch(B.filtertype){case"number":var m=a("<div></div>");m.width(d.width());m.height(this.filterrowheight);d.append(m);var z=d.width()-20;var r=function(H,I,f){var G=a('<input style="float: left;" autocomplete="off" type="textarea"/>');if(F.rtl){G.css("float","right");G.css("direction","rtl")}G[0].id=a.jqx.utilities.createId();G.addClass(F.toThemeProperty("jqx-widget"));G.addClass(F.toThemeProperty("jqx-input"));G.addClass(F.toThemeProperty("jqx-rc-all"));G.addClass(F.toThemeProperty("jqx-widget-content"));G.appendTo(H);G.width(I-10);G.height(F.filterrowheight-10);G.css("margin","4px");G.css("margin-right","2px");G.focus(function(){F.focusedfilter=G;G.addClass(F.toThemeProperty("jqx-fill-state-focus"))});G.blur(function(){G.removeClass(F.toThemeProperty("jqx-fill-state-focus"))});G.keydown(function(J){if(J.keyCode=="13"){F._applyfilterfromfilterrow()}if(G[0]._writeTimer){clearTimeout(G[0]._writeTimer)}G[0]._writeTimer=setTimeout(function(){if(!F._loading){if(F["_oldWriteText"+G[0].id]!=G.val()){F._applyfilterfromfilterrow();F["_oldWriteText"+G[0].id]=G.val()}}},800);F.focusedfilter=G});G.val(y);return G};r(m,z);var A=F._getfiltersbytype("number");var s=a("<div class='filter' style='float: left;'></div>");s.css("margin-top","4px");s.appendTo(m);if(F.rtl){s.css("float","right")}var h=0;if(B.filtercondition!=null){var e=A.indexOf(B.filtercondition);if(e!=-1){h=e}}s.jqxDropDownList({touchMode:F.touchmode,rtl:F.rtl,dropDownHorizontalAlignment:"right",enableBrowserBoundsDetection:true,selectedIndex:h,width:18,height:21,dropDownHeight:150,dropDownWidth:170,source:A,theme:F.theme});s.jqxDropDownList({selectionRenderer:function(f){return""}});s.jqxDropDownList("setContent","");s.find(".jqx-dropdownlist-content").hide();if(B.createfilterwidget){B.createfilterwidget(B,d,m)}B._filterwidget=m;var j=null;this.addHandler(s,"select",function(){var f=s.jqxDropDownList("getSelectedItem").label;if(B._filterwidget.find("input").val().length>0&&!F.refreshingfilter){F._applyfilterfromfilterrow()}else{if(B._filterwidget.find("input").val().length==0&&!F.refreshingfilter){if(j=="null"||j=="not null"||f=="null"||f=="not null"){F._applyfilterfromfilterrow()}}}j=f});break;case"textbox":case"default":default:g(this,d);break;case"none":break;case"date":if(this.host.jqxDateTimeInput){var b=a("<div></div>");b.css("margin","4px");b.appendTo(d);var n={calendar:this.gridlocalization,todayString:this.gridlocalization.todaystring,clearString:this.gridlocalization.clearstring};b.jqxDateTimeInput({localization:n,rtl:F.rtl,showFooter:true,formatString:B.cellsformat,selectionMode:"range",value:null,theme:this.theme,width:z-10,height:this.filterrowheight-10});if(B.createfilterwidget){B.createfilterwidget(B,d,b)}B._filterwidget=b;this.addHandler(b,"valuechanged",function(f){if(!F.refreshingfilter){F._applyfilterfromfilterrow();F.focusedfilter=null}})}else{g(this,d)}break;case"list":case"checkedlist":if(this.host.jqxDropDownList){var q=this._getfilterdataadapter(B);var l=false;var s=a("<div></div>");s.css("margin","4px");var t=B.datafield;var u=B.filtertype=="checkedlist"?true:false;var C=z<150?220:"auto";q.dataBind();var p=q.records;var k=p.length<8?true:false;l=k;s.appendTo(d);s.jqxDropDownList({touchMode:F.touchmode,rtl:F.rtl,checkboxes:u,dropDownWidth:C,source:q.records,autoDropDownHeight:k,theme:this.theme,width:z-10,height:this.filterrowheight-10,displayMember:B.displayfield,valueMember:t});var c=s.jqxDropDownList("listBox");if(u){s.jqxDropDownList({selectionRenderer:function(){return F.gridlocalization.filterselectstring}});var x=a('<span style="top: 2px; position: relative; color: inherit; border: none; background-color: transparent;">'+F.gridlocalization.filterselectstring+"</span>");x.addClass(this.toThemeProperty("jqx-item"));if(c!=undefined){if(!l){c.host.height(200)}c.insertAt(F.gridlocalization.filterselectallstring,0);s.jqxDropDownList("setContent",x);var i=true;var E=new Array();c.checkAll(false);F.addHandler(c.host,"checkChange",function(H){s[0]._selectionChanged=true;if(!i){return}if(H.args.label!=F.gridlocalization.filterselectallstring){i=false;c.host.jqxListBox("checkIndex",0,true,false);var f=c.host.jqxListBox("getCheckedItems");var G=c.host.jqxListBox("getItems");if(f.length==1){c.host.jqxListBox("uncheckIndex",0,true,false)}else{if(G.length!=f.length){c.host.jqxListBox("indeterminateIndex",0,true,false)}}i=true}else{i=false;if(H.args.checked){c.host.jqxListBox("checkAll",false)}else{c.host.jqxListBox("uncheckAll",false)}i=true}})}}else{c.insertAt({label:this.gridlocalization.filterchoosestring,value:""},0);s.jqxDropDownList({selectedIndex:0})}if(B.createfilterwidget){B.createfilterwidget(B,d,s)}B._filterwidget=s;var o=s.jqxDropDownList("dropdownlistWrapper");if(B.filtertype=="list"){this.addHandler(s,"select",function(f){if(!F.refreshingfilter){if(f.args&&f.args.type!="none"){F._applyfilterfromfilterrow();F.focusedfilter=null}}})}else{this.addHandler(s,"close",function(f){if(s[0]._selectionChanged){F._applyfilterfromfilterrow();F.focusedfilter=null;s[0]._selectionChanged=false}})}}else{g(this,d)}break;case"bool":case"boolean":if(this.host.jqxCheckBox){var v=a('<div tabIndex=0 style="opacity: 0.99; position: absolute; top: 50%; left: 50%; margin-top: -7px; margin-left: -10px;"></div>');v.appendTo(d);v.jqxCheckBox({enableContainerClick:false,animationShowDelay:0,animationHideDelay:0,hasThreeStates:true,theme:this.theme,checked:null});if(B.createfilterwidget){B.createfilterwidget(B,d,v)}if(y===true||y=="true"){v.jqxCheckBox({checked:true})}else{if(y===false||y=="false"){v.jqxCheckBox({checked:false})}}B._filterwidget=v;this.addHandler(v,"change",function(f){if(!F.refreshingfilter){if(f.args){F.focusedfilter=null;F._applyfilterfromfilterrow()}}})}else{g(this,d)}break}},_getfilterdataadapter:function(b){var c=this.source._source?true:false;if(!c){dataadapter=new a.jqx.dataAdapter(this.source,{autoBind:false,uniqueDataFields:[b.displayfield],autoSort:true,autoSortField:b.displayfield,async:false})}else{var e={localdata:this.source.records,datatype:this.source.datatype,async:false};var d=this;dataadapter=new a.jqx.dataAdapter(e,{autoBind:false,autoSort:true,autoSortField:b.displayfield,async:false,uniqueDataFields:[b.displayfield],beforeLoadComplete:function(f){var k=new Array();if(b.cellsformat){var j=d._getcolumntypebydatafield(b);for(var g=0;g<f.length;g++){k.push(f[g]);var h=f[g][b.displayfield];f[g][b.displayfield+"JQValue"]=h;if(j==="date"){f[g][b.displayfield]=dataadapter.formatDate(h,b.cellsformat,d.gridlocalization)}else{if(j==="number"||j==="float"||j==="int"){f[g][b.displayfield]=dataadapter.formatNumber(h,b.cellsformat,d.gridlocalization)}}}return k}else{return f}}})}if(b.filteritems&&b.filteritems.length>0){var e={localdata:b.filteritems,datatype:this.source.datatype,async:false};dataadapter=new a.jqx.dataAdapter(e,{autoBind:false,async:false})}else{if(b.filteritems){if(b.filteritems._source){b.filteritems._options.autoBind=false;b.filteritems._options.async=false;return b.filteritems}else{if(a.isFunction(b.filteritems)){return b.filteritems()}}}}return dataadapter},refreshfilterrow:function(){if(!this.showfilterrow){return}this.refreshingfilter=true;this._updatefilterrowui();this._updatelistfilters(true,true);var h=this.that;var l=this.columns.records.length;for(var d=0;d<l;d++){var c=this.columns.records[d];if(c.filterable){if(c.filter){var b=c.filter.getfilters();if(b.length>0){var k=b[0].value;var e=c._filterwidget;var f=c._filterwidget.parent();if(e!=null){switch(c.filtertype){case"number":f.find("input").val(k);if(this.host.jqxDropDownList){var i=c.filter.getoperatorsbyfiltertype("numericfilter");e.find(".filter").jqxDropDownList("selectIndex",i.indexOf(b[0].condition))}break;case"date":if(this.host.jqxDateTimeInput){var k=c.filter.getfilterat(0).filtervalue;if(k!=undefined){if(c.filter.getfilterat(1)){var g=c.filter.getfilterat(1).filtervalue}else{g=k}a(f.children()[0]).jqxDateTimeInput("setRange",new Date(k),new Date(g))}}else{e.val(k)}break;case"textbox":case"default":e.val(k);h["_oldWriteText"+e[0].id]=k;break;case"bool":case"boolean":if(!this.host.jqxCheckBox){e.val(k)}else{a(f.children()[0]).jqxCheckBox({checked:k})}break}}}}}}this.refreshingfilter=false},_destroyedfilters:function(){var g=this.that;var b=this.columns.records.length;for(var f=0;f<b;f++){var c=this.columns.records[f];if(c.filterable){var h=c._filterwidget;if(c.filtertype=="list"||c.filtertype=="checkedlist"){this.removeHandler(h,"select");this.removeHandler(h,"close");h.jqxDropDownList("destroy")}else{if(c.filtertype=="date"){this.removeHandler(h,"valuechanged");h.jqxDateTimeInput("destroy")}else{if(c.filtertype=="bool"){this.removeHandler(h,"change");h.jqxCheckBox("destroy")}else{if(c.filtertype=="number"){var d=h.find(".jqx-input");this.removeHandler(d,"keydown");var e=a(h.children()[1]);e.jqxDropDownList("destroy")}else{this.removeHandler(h,"keydown")}}}}h.remove()}}},_updatelistfilters:function(n,t){var o=this.that;var r=this.columns.records.length;for(var h=0;h<r;h++){var e=this.columns.records[h];if(e.filterable){if(e.filtertype=="list"||e.filtertype=="checkedlist"){var m=e._filterwidget;if(!n){if(e.filter==undefined){m.jqxDropDownList("renderSelection");continue}}else{var b=this._getfilterdataadapter(e);m.jqxDropDownList({source:b});var g=m.jqxDropDownList("getItems");var s=true;if(g.length!=b.records.length+1){s=false}if(s){for(var k=1;k<g.length;k++){if(g[k].label!=b.records[k-1][e.displayfield]){s=false;break}}}if(s&&!t){continue}}var l=e.filtertype=="checkedlist"?true:false;var g=m.jqxDropDownList("getItems");var c=m.jqxDropDownList("listBox");m.jqxDropDownList("dataBind");if(l){m.jqxDropDownList({selectionRenderer:function(){return o.gridlocalization.filterselectstring}});c.insertAt(this.gridlocalization.filterselectallstring,0);m.jqxDropDownList("setContent",this.gridlocalization.filterselectstring);c.checkAll(false);if(e.filter){var d=e.filter.getfilters();for(var k=0;k<c.items.length;k++){var q=c.items[k].label;a.each(d,function(){if(this.condition=="NOT_EQUAL"){if(q==this.value){c.uncheckIndex(k,false,false)}else{c.checkIndex(k,false,false)}}else{if(this.condition=="EQUAL"){if(q==this.value){c.checkIndex(k,false,false)}else{c.uncheckIndex(k,false,false)}}}})}c._updateCheckedItems();var p=c.getCheckedItems().length;if(c.items.length!=p&&p>0){c.host.jqxListBox("indeterminateIndex",0,true,false)}}}else{c.insertAt({label:this.gridlocalization.filterchoosestring,value:""},0);m.jqxDropDownList({selectedIndex:0});if(e.filter){var d=e.filter.getfilters();var f=-1;for(var k=0;k<c.items.length;k++){var q=c.items[k].label;a.each(d,function(){if(this.condition=="NOT_EQUAL"){return true}if(q==this.value){f=k;return false}})}if(f!=-1){c.selectIndex(f)}}}if(g.length<8){m.jqxDropDownList("autoDropDownHeight",true)}else{m.jqxDropDownList("autoDropDownHeight",false)}}}}},_renderfiltercolumn:function(){var b=this.that;if(this.filterable){a.each(this.columns.records,function(c,d){if(b.autoshowfiltericon){if(this.filter){a(this.filtericon).show()}else{a(this.filtericon).hide()}}else{if(this.filterable){a(this.filtericon).show()}}})}},_initcolumntypes:function(){if(this.columns&&this.columns.records){var b=this.source._source.datafields;if(b){for(var c=0;c<this.columns.records.length;c++){var d=this.columns.records[c];if(d.datatype){continue}var e="";a.each(b,function(){if(this.name==d.displayfield){if(this.type){e=this.type}return false}});if(e!=""){d.datatype=e}else{d.datatype=""}}}}},_getcolumntypebydatafield:function(f){var g=this.that;var e="string";var d=g.source.datafields||((g.source._source)?g.source._source.datafields:null);if(d){var i="";a.each(d,function(){if(this.name==f.displayfield){if(this.type){i=this.type}return false}});if(i){return i}}if(f!=null){if(this.dataview.cachedrecords==undefined){return e}var b=null;if(!this.virtualmode){if(this.dataview.cachedrecords.length==0){return e}b=this.dataview.cachedrecords[0][f.displayfield];if(b!=null&&b.toString()==""){return"string"}}else{a.each(this.dataview.cachedrecords,function(){b=this[f.displayfield];return false})}if(b!=null){if(typeof b=="boolean"){e="boolean"}else{if(a.jqx.dataFormat.isNumber(b)){e="number"}else{var h=new Date(b);if(h.toString()=="NaN"||h.toString()=="Invalid Date"){if(a.jqx.dataFormat){h=a.jqx.dataFormat.tryparsedate(b);if(h!=null){if(h&&h.getFullYear()){if(h.getFullYear()==1970&&h.getMonth()==0&&h.getDate()==1){var c=new Number(b);if(!isNaN(c)){return"number"}return"string"}}return"date"}else{e="string"}}else{e="string"}}else{e="date"}}}}}return e},_getfiltersbytype:function(b){var c=this.that;var d="";switch(b){case"number":case"float":case"int":d=c.gridlocalization.filternumericcomparisonoperators;break;case"date":d=c.gridlocalization.filterdatecomparisonoperators;break;case"boolean":case"bool":d=c.gridlocalization.filterbooleancomparisonoperators;break;case"string":default:d=c.gridlocalization.filterstringcomparisonoperators;break}return d},_updatefilterpanel:function(K,e,f){if(K==null||K==undefined){K=this}var g=K._getcolumntypebydatafield(f);var C=K._getfiltersbytype(g);if(!K.host.jqxDropDownList){throw new Error("jqxGrid: Missing reference to jqxdropdownlist.js.");return}var A=a(e);var w=A.find("#filterclearbutton"+K.element.id);var l=A.find("#filterbutton"+K.element.id);var F=A.find("#filter1"+K.element.id);var B=A.find("#filter2"+K.element.id);var D=A.find("#filter3"+K.element.id);var z=A.find(".filtertext1"+K.element.id);var y=A.find(".filtertext2"+K.element.id);z.val("");y.val("");this.removeHandler(l,"click");this.addHandler(l,"click",function(){K._buildfilter(K,e,f);K._closemenu()});this.removeHandler(w,"click");this.addHandler(w,"click",function(){K._clearfilter(K,e,f);K._closemenu()});if(this.filtermode==="default"){if(F.jqxDropDownList("source")!=C){F.jqxDropDownList({enableBrowserBoundsDetection:false,source:C});D.jqxDropDownList({enableBrowserBoundsDetection:false,source:C})}if(g=="boolean"||g=="bool"){F.jqxDropDownList({autoDropDownHeight:true,selectedIndex:0});D.jqxDropDownList({autoDropDownHeight:true,selectedIndex:0})}else{var h=false;if(C&&C.length){if(C.length<5){h=true}}F.jqxDropDownList({autoDropDownHeight:h,selectedIndex:2});D.jqxDropDownList({autoDropDownHeight:h,selectedIndex:2})}B.jqxDropDownList({selectedIndex:0});var u=f.filter;var o=new a.jqx.filter();var d="";switch(g){case"number":case"int":case"float":case"decimal":d="numericfilter";n=o.getoperatorsbyfiltertype("numericfilter");break;case"boolean":case"bool":d="booleanfilter";n=o.getoperatorsbyfiltertype("booleanfilter");break;case"date":case"time":d="datefilter";n=o.getoperatorsbyfiltertype("datefilter");break;case"string":d="stringfilter";n=o.getoperatorsbyfiltertype("stringfilter");break}if(u!=null){var H=u.getfilterat(0);var G=u.getfilterat(1);var s=u.getoperatorat(0);if(K.updatefilterconditions){var n=[];var L=K.updatefilterconditions(d,n);if(L!=undefined){for(var I=0;I<L.length;I++){L[I]=L[I].toUpperCase()}u.setoperatorsbyfiltertype(d,L);n=L}}var r=this.enableanimations?"default":"none";if(H!=null){var k=n.indexOf(H.comparisonoperator);var x=H.filtervalue;z.val(x);F.jqxDropDownList({selectedIndex:k,animationType:r})}if(G!=null){var j=n.indexOf(G.comparisonoperator);var v=G.filtervalue;y.val(v);D.jqxDropDownList({selectedIndex:j,animationType:r})}if(u.getoperatorat(0)==undefined){B.jqxDropDownList({selectedIndex:0,animationType:r})}else{if(u.getoperatorat(0)=="and"||u.getoperatorat(0)==0){B.jqxDropDownList({selectedIndex:0})}else{B.jqxDropDownList({selectedIndex:1})}}}if(K.updatefilterpanel){K.updatefilterpanel(F,D,B,z,y,l,w,u,d,n)}z.focus();setTimeout(function(){z.focus()},10)}else{var m=K._getfilterdataadapter(f);var d=K._getfiltertype(g);if(f.cellsformat){F.jqxListBox({displayMember:f.displayfield,valueMember:f.displayfield+"JQValue",source:m})}else{F.jqxListBox({displayMember:f.displayfield,valueMember:f.displayfield,source:m})}F.jqxListBox("insertAt",K.gridlocalization.filterselectallstring,0);var b=F.data().jqxListBox.instance;b.checkAll(false);var p=this;if(f.filter){b.uncheckAll(false);var t=f.filter.getfilters();for(var E=0;E<b.items.length;E++){var q=b.items[E].value;a.each(t,function(){if(this.condition=="NOT_EQUAL"){if(q!=this.value){b.uncheckIndex(E,false,false);return false}}else{if(this.condition=="EQUAL"){if(q==this.value){b.checkIndex(E,false,false);return false}}}})}b._updateCheckedItems();var J=b.getCheckedItems().length;if(b.items.length!=J&&J>0){b.host.jqxListBox("indeterminateIndex",0,true,false)}if(J===b.items.length-1){b.host.jqxListBox("checkIndex",0,true,false)}}}},_getfiltertype:function(b){var c="stringfilter";switch(b){case"number":case"int":case"float":case"decimal":c="numericfilter";break;case"boolean":case"bool":c="booleanfilter";break;case"date":case"time":c="datefilter";break;case"string":c="stringfilter";break}return c},_buildfilter:function(r,l,F){var f=a(l).find("#filter1"+r.element.id);var G=a(l).find("#filter2"+r.element.id);var J=a(l).find("#filter3"+r.element.id);var k=a(l).find(".filtertext1"+r.element.id);var j=a(l).find(".filtertext2"+r.element.id);var A=k.val();var y=j.val();var L=r._getcolumntypebydatafield(F);var t=r._getfiltersbytype(L);var I=new a.jqx.filter();var w=r._getfiltertype(L);if(r.filtermode==="default"){var E=f.jqxDropDownList("selectedIndex");var c=G.jqxDropDownList("selectedIndex");var D=J.jqxDropDownList("selectedIndex");var e=null;var d=null;if(r.updatefilterconditions){var p=r.updatefilterconditions(w,I.getoperatorsbyfiltertype(w));if(p!=undefined){I.setoperatorsbyfiltertype(w,p)}}var q=false;var K=I.getoperatorsbyfiltertype(w)[E];var J=I.getoperatorsbyfiltertype(w)[D];var v=K=="NULL"||K=="NOT_NULL";var h=K=="EMPTY"||K=="NOT_EMPTY";if(K==undefined){K=I.getoperatorsbyfiltertype(w)[0]}if(J==undefined){J=I.getoperatorsbyfiltertype(w)[0]}if(A.length>0||v||h){e=I.createfilter(w,A,K,null,F.cellsformat,r.gridlocalization);I.addfilter(c,e);q=true}var u=J=="NULL"||J=="NOT_NULL";var g=J=="EMPTY"||J=="NOT_EMPTY";if(y.length>0||u||g){d=I.createfilter(w,y,J,null,F.cellsformat,r.gridlocalization);I.addfilter(c,d);q=true}if(q){var C=F.displayfield;this.addfilter(C,I,true)}else{this._clearfilter(r,l,F)}}else{var B=this;var n=false;var x=f.data().jqxListBox.instance;var o=x.getCheckedItems();if(o.length==0){for(var H=1;H<x.items.length;H++){var m=x.items[H].value;var b="not_equal";var z=I.createfilter(w,m,b,null);I.addfilter(0,z)}n=true}else{if(o.length!=x.items.length){n=true;for(var H=0;H<o.length;H++){if(r.gridlocalization.filterselectallstring===o[H].value){continue}var m=o[H].value;var b="equal";var z=I.createfilter(w,m,b,null);var s=1;I.addfilter(s,z)}}else{n=false}}if(n){var C=F.displayfield;this.addfilter(C,I,true)}else{var C=F.displayfield;this.removefilter(C,true)}}},_clearfilter:function(e,c,d){var b=d.displayfield;this.removefilter(b,true)},addfilter:function(d,e,c){if(this._loading){throw new Error("jqxGrid: "+this.loadingerrormessage);return false}var f=this.getcolumn(d);var b=this._getcolumn(d);if(f==undefined||f==null){return}f.filter=e;b.filter=e;this.dataview.addfilter(d,e);if(c==true&&c!=undefined){this.applyfilters("add")}},removefilter:function(d,c){if(this._loading){throw new Error("jqxGrid: "+this.loadingerrormessage);return false}var e=this.getcolumn(d);var b=this._getcolumn(d);if(e==undefined||e==null){return}if(e.filter==null){return}this.dataview.removefilter(d,e.filter);e.filter=null;b.filter=null;if(c==true||c!==false){this.applyfilters("remove")}},applyfilters:function(f){var c=false;if(this.dataview.filters.length>=0&&(this.virtualmode||!this.source.localdata)){if(this.source!=null&&this.source.filter){var g=-1;if(this.pageable){g=this.dataview.pagenum;this.dataview.pagenum=0}else{this.vScrollInstance.setPosition(0);this.loadondemand=true;this._renderrows(this.virtualsizeinfo)}this.source.filter(this.dataview.filters,this.dataview.records,this.dataview.records.length);if(this.pageable){this.dataview.pagenum=g}}}if(this.dataview.clearsortdata){this.dataview.clearsortdata()}if(!this.virtualmode){var b=this.selectedrowindexes;var d=this.that;this.dataview.refresh();if(this.dataview.clearsortdata){if(this.sortcolumn&&this.sortdirection){var e=this.sortdirection.ascending?"asc":"desc";if(!this._loading){this.sortby(this.sortcolumn,e,null,false)}else{this.sortby(this.sortcolumn,e,null,false,false)}}}}else{if(this.pageable){this.dataview.updateview();if(this.gotopage){this.gotopage(0)}}this.rendergridcontent(false,false);if(this.showfilterrow){if(typeof f!="string"&&a.isEmptyObject(f)){this.refreshfilterrow()}}this._raiseEvent(13,{filters:this.dataview.filters});return}if(this.pageable){this.dataview.updateview();if(this.gotopage){this.gotopage(0);this.updatepagerdetails()}}this._updaterowsproperties();if(!this.groupable||(this.groupable&&this.groups.length==0)){this._rowdetailscache=new Array();this.virtualsizeinfo=null;this._pagescache=new Array();if(this.columns&&this.columns.records&&this.columns.records.length>0&&!this.columns.records[0].filtericon){this.prerenderrequired=true}this.rendergridcontent(true,false);this._updatecolumnwidths();this._updatecellwidths();this._renderrows(this.virtualsizeinfo);if(this.showaggregates&&this._updatecolumnsaggregates){this._updatecolumnsaggregates()}}else{this._rowdetailscache=new Array();this._render(true,true,false,false,false);if(this.showfilterrow){this._updatefocusedfilter()}this._updatecolumnwidths();this._updatecellwidths();this._renderrows(this.virtualsizeinfo)}if(this.showfilterrow){if(typeof f!="string"&&a.isEmptyObject(f)){this.refreshfilterrow()}}this._raiseEvent(13,{filters:this.dataview.filters})},getfilterinformation:function(){var d=new Array();for(var b=0;b<this.dataview.filters.length;b++){var c=this.getcolumn(this.dataview.filters[b].datafield);d[b]={filter:this.dataview.filters[b].filter,filtercolumn:c.datafield,filtercolumntext:c.text}}return d},clearfilters:function(b){var d=this.that;if(this.showfilterrow){this.clearfilterrow()}if(this.columns.records){var c=b==true||b!==false;a.each(this.columns.records,function(){d.removefilter(this.displayfield,!c)})}if(b===false){return}if(b==true||b!==false){this.applyfilters("clear")}},_destroyfilterpanel:function(){var e=a(a.find("#filterclearbutton"+this.element.id));var d=a(a.find("#filterbutton"+this.element.id));var h=a(a.find("#filter1"+this.element.id));var c=a(a.find("#filter2"+this.element.id));var g=a(a.find("#filter3"+this.element.id));var f=a(a.find(".filtertext1"+this.element.id));var b=a(a.find(".filtertext2"+this.element.id));if(f.length>0&&b.length>0){f.removeClass();b.removeClass();f.remove();b.remove()}if(e.length>0){e.jqxButton("destroy");d.jqxButton("destroy");this.removeHandler(e,"click");this.removeHandler(d,"click")}if(h.length>0){h.jqxDropDownList("destroy")}if(c.length>0){c.jqxDropDownList("destroy")}if(g.length>0){g.jqxDropDownList("destroy")}},_initfilterpanel:function(v,b,c,n){if(v==null||v==undefined){v=this}b[0].innerHTML="";var r=a("<div class='filter' style='margin-left: 7px;'></div>");b.append(r);var m=a("<div class='filter' style='margin-top: 3px; margin-bottom: 3px;'></div>");m.text(v.gridlocalization.filtershowrowstring);var s=a("<div class='filter' id='filter1"+v.element.id+"'></div>");var h=a("<div class='filter' id='filter2"+v.element.id+"' style='margin-bottom: 3px;'></div>");var q=a("<div class='filter' id='filter3"+v.element.id+"'></div>");var e=v._getcolumntypebydatafield(c);if(!s.jqxDropDownList){throw new Error("jqxGrid: jqxdropdownlist.js is not loaded.");return}var o=v._getfiltersbytype(e);var j=a("<div class='filter'><input class='filtertext1"+v.element.id+"' style='height: 20px; margin-top: 3px; margin-bottom: 3px;' type='text'></input></div>");var l=j.find("input");l.addClass(this.toThemeProperty("jqx-input"));l.addClass(this.toThemeProperty("jqx-widget-content"));l.addClass(this.toThemeProperty("jqx-rc-all"));l.width(n-15);var k=a("<div class='filter'><input class='filtertext2"+v.element.id+"' style='height: 20px; margin-top: 3px;' type='text'></input></div>");var i=k.find("input");i.addClass(this.toThemeProperty("jqx-input"));i.addClass(this.toThemeProperty("jqx-widget-content"));i.addClass(this.toThemeProperty("jqx-rc-all"));i.width(n-15);if(v.rtl){l.css("direction","rtl");i.css("direction","rtl")}var g=a("<div class='filter' style='height: 25px; margin-left: 20px; margin-top: 7px;'></div>");var f=a('<span tabIndex=0 id="filterbutton'+v.element.id+'" class="filterbutton" style="padding: 4px 12px; margin-left: 2px;">'+v.gridlocalization.filterstring+"</span>");g.append(f);var t=a('<span tabIndex=0 id="filterclearbutton'+v.element.id+'" class="filterclearbutton" style="padding: 4px 12px; margin-left: 5px;">'+v.gridlocalization.filterclearstring+"</span>");g.append(t);f.jqxButton({height:20,theme:v.theme});t.jqxButton({height:20,theme:v.theme});var u=function(x){if(x){if(x.text().indexOf("case sensitive")!=-1){var w=x.text();w=w.replace("case sensitive","match case");x.text(w)}x.css("font-family",v.host.css("font-family"));x.css("font-size",v.host.css("font-size"));return x}return""};if(this.filtermode==="default"){r.append(m);r.append(s);s.jqxDropDownList({_checkForHiddenParent:false,rtl:v.rtl,enableBrowserBoundsDetection:false,selectedIndex:2,width:n-15,height:20,dropDownHeight:150,dropDownWidth:n-15,selectionRenderer:u,source:o,theme:v.theme});r.append(j);var p=new Array();p[0]=v.gridlocalization.filterandconditionstring;p[1]=v.gridlocalization.filterorconditionstring;h.jqxDropDownList({_checkForHiddenParent:false,rtl:v.rtl,enableBrowserBoundsDetection:false,autoDropDownHeight:true,selectedIndex:0,width:60,height:20,source:p,selectionRenderer:u,theme:v.theme});r.append(h);q.jqxDropDownList({_checkForHiddenParent:false,rtl:v.rtl,enableBrowserBoundsDetection:false,selectedIndex:2,width:n-15,height:20,dropDownHeight:150,dropDownWidth:n-15,selectionRenderer:u,source:o,theme:v.theme});r.append(q);r.append(k)}else{r.append(m);r.append(s);s.jqxListBox({rtl:v.rtl,_checkForHiddenParent:false,checkboxes:true,selectedIndex:2,width:n-15,height:120,theme:v.theme});var d=true;v.addHandler(s,"checkChange",function(y){if(!d){return}if(y.args.label!=v.gridlocalization.filterselectallstring){d=false;s.jqxListBox("checkIndex",0,true,false);var w=s.jqxListBox("getCheckedItems");var x=s.jqxListBox("getItems");if(w.length==1){s.jqxListBox("uncheckIndex",0,true,false)}else{if(x.length!=w.length){s.jqxListBox("indeterminateIndex",0,true,false)}}d=true}else{d=false;if(y.args.checked){s.jqxListBox("checkAll",false)}else{s.jqxListBox("uncheckAll",false)}d=true}})}r.append(g);if(v.updatefilterpanel){v.updatefilterpanel(s,q,h,j,k,f,t,null,null,o)}}})})(jQuery);