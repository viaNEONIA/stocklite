const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
function setup(agent='Android') {
 const nodes={}; const element=()=>({style:{},value:'',disabled:false,width:1,height:1,children:[],classList:{add(){},remove(){}},replaceChildren(){this.children=[]},append(x){this.children.push(x)},focus(){},getContext(){return {drawImage(){},fillRect(){}}}});
 const get=id=>nodes[id]??=element();
 let resolveRead, terminated=0;
 const worker={setParameters:async()=>{},recognize:()=>new Promise(r=>resolveRead=r),terminate:async()=>{terminated++}};
 const context={document:{getElementById:get,createElement:element},navigator:{userAgent:agent},window:{Tesseract:{createWorker:async()=>worker}},createImageBitmap:async()=>({width:800,height:600,close(){}}),confirm:()=>true,setTimeout:()=>1,clearTimeout(){}};
 vm.runInNewContext(fs.readFileSync('ocr-name.js','utf8'),context);
 return {get,context,finish:text=>resolveRead({data:{text}}),terminated:()=>terminated};
}
const tick=()=>new Promise(r=>setImmediate(r));
async function select(s){await s.get('ocrFile').onchange({target:{files:[{type:'image/jpeg',size:100}]}})}
test('candidate selection changes only draft name; duplicate lines deduplicated',async()=>{
 const s=setup();await select(s);const job=s.get('ocrRun').onclick();await tick();
 s.finish('商品名\n商品名\n容量 100g');await job;
 assert.equal(s.get('ocrCandidates').children.length,2);
 assert.equal(s.get('name').value,'');
 s.get('ocrCandidates').children[0].onclick();assert.equal(s.get('name').value,'商品名');assert.equal(s.terminated(),1);
});
test('cancel discards late result and permits next image',async()=>{
 const s=setup();await select(s);const job=s.get('ocrRun').onclick();await tick();s.context.window.resetNameOCR();
 s.finish('古い商品');await job;assert.equal(s.get('ocrCandidates').children.length,0);await select(s);assert.equal(s.get('ocrRun').disabled,false);
});
test('range input cannot enable a concurrent job; invalid range disabled',async()=>{
 const s=setup();await select(s);const job=s.get('ocrRun').onclick();await tick();s.get('ocrTop').oninput();assert.equal(s.get('ocrRun').disabled,true);
 s.finish('');await job;s.get('ocrTop').value=90;s.get('ocrBottom').value=10;s.get('ocrTop').oninput();assert.equal(s.get('ocrRun').disabled,true);
});
test('non-Android does not bind OCR controls',()=>{assert.equal(setup('iPhone').get('ocrFile').onchange,undefined)});

test('OCR whitespace removed before display, selection and deduplication; lines stay separate',async()=>{
 const s=setup();await select(s);const job=s.get('ocrRun').onclick();await tick();
 s.finish(" 商 品　名\t ​﻿\n商品名\nGreen Tea\n 　\t");await job;
 assert.equal(s.get('ocrCandidates').children.length,2);
 assert.equal(s.get('ocrCandidates').children[0].textContent,'商品名');
 assert.equal(s.get('ocrCandidates').children[1].textContent,'GreenTea');
 s.get('ocrCandidates').children[1].onclick();assert.equal(s.get('name').value,'GreenTea');
});
