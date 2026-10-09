import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getFirestore,doc,collection,onSnapshot,setDoc,deleteDoc,getDoc,writeBatch} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {getAuth,onAuthStateChanged,signInWithEmailAndPassword,signOut} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import cfg from "./firebase-config.js";
var $=i=>document.getElementById(i);
if(!cfg.projectId){$("lg").style.display="flex";$("lm").textContent="ملف firebase-config.js لسه ما اتضبطش"}
else{
var app=initializeApp(cfg),db=getFirestore(app),au=getAuth(app),m=null,it=null,off=[];
function p(){if(m&&it)window.setData(Object.assign({},m,{items:it}))}
var er=e=>alert("فشل الحفظ: "+(e.code||e.message));
window.fbMeta=x=>setDoc(doc(db,"shop","main"),x).catch(er);
window.fbItem=x=>setDoc(doc(db,"items",x.id),x).catch(er);
window.fbDel=id=>deleteDoc(doc(db,"items",id)).catch(er);
window.fbOut=()=>signOut(au);
$("lb").onclick=()=>signInWithEmailAndPassword(au,$("le").value.trim(),$("lp").value).catch(()=>$("lm").textContent="الإيميل أو كلمة السر غلط");
function msg(e,st,u){$("v").innerHTML='<div class="ct"><p style="color:#b3261e;direction:ltr;text-align:left;font-size:13px;line-height:1.7">❌ '+st+': '+(e.code||e.message)+'<br>UID: '+(u?u.uid:"")+'</p></div>'}
onAuthStateChanged(au,async u=>{off.forEach(f=>f());off=[];$("lg").style.display=u?"none":"flex";if(!u)return;var st="read";
try{var s=await getDoc(doc(db,"shop","main"));
if(!s.exists()){st="seed";var d=await(await fetch("data.json")).json(),b=writeBatch(db);
b.set(doc(db,"shop","main"),{shop:d.shop,cats:d.cats,ship:d.ship});
d.items.forEach((x,i)=>b.set(doc(db,"items",x.id),Object.assign(x,{o:i+1})));await b.commit()}
st="listen";var er2=e=>msg(e,st,u);
off.push(onSnapshot(doc(db,"shop","main"),s=>{if(s.exists()){m=s.data();p()}},er2),onSnapshot(collection(db,"items"),s=>{it=s.docs.map(d=>d.data()).sort((a,b)=>(a.o||0)-(b.o||0));p()},er2))}catch(e){msg(e,st,u)}})}
