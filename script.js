const display=document.getElementById("display");let expression="";let justEvaluated=false;
function render(){display.textContent=expression||"0"}
function add(v){if(justEvaluated&&!"+-*/." .includes(v))expression="";justEvaluated=false;expression+=v;render()}
function clearAll(){expression="";justEvaluated=false;render()}
function del(){expression=expression.slice(0,-1);render()}
function percent(){if(!expression)return;const m=expression.match(/(\d+(?:\.\d+)?)$/);if(m){const n=Number(m[1])/100;expression=expression.slice(0,-m[1].length)+n;render()}}
function calculate(){if(!expression)return;try{if(!/^[0-9+\-*/.() ]+$/.test(expression))throw Error();const result=Function('"use strict";return ('+expression+')')();if(!Number.isFinite(result))throw Error();expression=String(Number(result.toFixed(12)));justEvaluated=true;render()}catch{display.textContent="Error";expression="";justEvaluated=true}}
document.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{const a=b.dataset.action,v=b.dataset.value;if(a==="clear")clearAll();else if(a==="delete")del();else if(a==="percent")percent();else if(a==="equals")calculate();else add(v)}));
document.addEventListener("keydown",e=>{if(/[0-9+\-*/.] /.test(e.key))add(e.key);else if(e.key==="Enter"||e.key==="=")calculate();else if(e.key==="Backspace")del();else if(e.key==="Escape")clearAll();else if(e.key==="%")percent()});
render();