(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),u=(t(19),t(3)),l=function(e){var n=e.people,t=e.delPhone;return n.map((function(e){return r.a.createElement("ul",{key:e.name},r.a.createElement("li",null,e.name," ",e.phone," ",r.a.createElement("button",{onClick:function(){return t(e.id)}},"Delete")," "))}))},i=t(2),f=t.n(i),m="http://localhost:3001/api/peps",p=function(){return f.a.get(m).then((function(e){return e.data}))},s=function(e){return f.a.post(m,e).then((function(e){return e.data}))},d=function(e){return f.a.delete(e).then((function(e){return e.data}))},h=function(e,n){return f.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){var n=e.message;return null===n?"":r.a.createElement("div",null,n)},E=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),i=Object(u.a)(c,2),f=i[0],m=i[1],E=Object(a.useState)(""),b=Object(u.a)(E,2),g=b[0],j=b[1],w=Object(a.useState)([]),O=Object(u.a)(w,2),y=O[0],k=O[1],S=function(){p().then((function(e){return o(e)}))};Object(a.useEffect)(S,[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{message:y}),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n={name:f,phone:g,id:t.length+1},a=t.find((function(e){return e.name===n.name}));if(a){if(window.confirm("Do you want to replace ".concat(n.name))){var r=a.id,c=t.filter((function(e){return e.name!==a.name}));h(r,n).then((function(e){return o(c.concat(e))})).catch((function(e){console.log(e)})).then(S)}}else s(n).then((function(e){return o(t.concat(e))})).then((function(e){return k("New phone added")})).catch((function(e){console.log(e.response.data.error);var n=e.response.data.error;k(n)})),m(""),j("")}},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:f,onChange:function(e){console.log(e.target.value),m(e.target.value)}}),"phone: ",r.a.createElement("input",{value:g,onChange:function(e){j(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))),r.a.createElement("h2",null,"Numbers"),r.a.createElement(l,{people:t,delPhone:function(e){var n="http://localhost:3001/api/peps/".concat(e),a=t.find((function(n){return n.id===e})),r=t.filter((function(n){return n.id!==e})),c=window.confirm("Are you sure you want to delete ".concat(a.name));console.log(a),!0===c&&d(n).then(o(r))}}))};c.a.render(r.a.createElement(E,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.69227cb5.chunk.js.map