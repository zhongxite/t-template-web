import{_ as k,i as B,f as r,s as R,j as C,r as _,o as D,g as b,b as s,w as n,u as e,k as u,F as z,a as L,l as m,m as p,q as N,v as U,x as f}from"./index-8906f66a.js";import{i as A}from"./defaultImg-9e4ff219.js";const H={class:"btnList"},P={__name:"headImg",setup(F){const g=p(()=>f(()=>import("./right-641dfacc.js"),["assets/right-641dfacc.js","assets/index-8906f66a.js","assets/index-09d74362.css"])),v=p(()=>f(()=>import("./headImg_drawer-57d6b5ed.js"),["assets/headImg_drawer-57d6b5ed.js","assets/index-8906f66a.js","assets/index-09d74362.css","assets/defaultImg-9e4ff219.js","assets/user-b4b83a6b.js","assets/role-15182004.js","assets/headImg_drawer-10bdd169.css"])),w=B();let I=r(A),{userInfo:d,token:x,routerList:y}=R(C()),t=r(!1);const V=()=>{t.value=!t.value},l=r("50%"),i=r("个人信息"),h=()=>{N.confirm("是否退出系统？","提示",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then(()=>{x.value="",y.value=[],U({message:"退出成功",type:"success"}),w.replace({name:"login"})}).catch(()=>{})};return(O,a)=>{const E=_("el-image"),c=_("el-button"),T=_("el-popover");return D(),b(z,null,[s(T,{width:"auto"},{reference:n(()=>[s(E,{class:"headImg",src:e(d).avatar?e(d).avatar:e(I),fit:"cover"},null,8,["src"])]),default:n(()=>[L("div",H,[s(c,{type:"primary",onClick:V},{default:n(()=>[m("个人信息")]),_:1}),s(c,{type:"danger",onClick:h},{default:n(()=>[m("退出")]),_:1})])]),_:1}),s(e(g),{modelValue:e(t),"onUpdate:modelValue":a[0]||(a[0]=o=>u(t)?t.value=o:t=o),size:e(l),"onUpdate:size":a[1]||(a[1]=o=>u(l)?l.value=o:null),title:e(i),"onUpdate:title":a[2]||(a[2]=o=>u(i)?i.value=o:null)},{default:n(()=>[s(e(v))]),_:1},8,["modelValue","size","title"])],64)}}},q=k(P,[["__scopeId","data-v-e1fd0d28"]]);export{q as default};
