import{_ as m,s as h,j as c,i as x,f as w,o as g,g as y,a as e,z as d,P as r,u as i,E as p,v as N,p as B,e as b,l as _}from"./index-8906f66a.js";import{l as k}from"./user-b4b83a6b.js";const o=t=>(B("data-v-85f2f4e0"),t=t(),b(),t),E={class:"site"},I={class:"container"},T=o(()=>e("div",{class:"hero"},[e("h1",null,[_("T-模板"),e("br"),_("Welcome!")])],-1)),V={class:"main"},R={class:"inpBox"},S={class:"password inpBox"},L=o(()=>e("i",{class:"ri-eye-off-line"},null,-1)),M=o(()=>e("div",{href:"#"},"找回密码",-1)),U=o(()=>e("div",{class:"separator"},[e("p",null,"使用其他方式登录")],-1)),j=o(()=>e("div",{class:"btnList"},[e("i",{class:"ri-wechat-fill ri-2x"})],-1)),z={__name:"index",setup(t){let{token:u}=h(c());const f=x();let s=w({accountName:"",password:""});const v=()=>{if(s.value.accountName==""){p.error("账号名不可为空");return}if(s.value.password==""){p.error("密码不可为空");return}k(s.value).then(n=>{n.code==200&&(u.value=n.data.token,N({message:"登录成功",type:"success"}),c().getRouter(f,"index"))})};return(n,a)=>(g(),y("div",E,[e("div",I,[T,e("div",V,[e("div",R,[d(e("input",{"onUpdate:modelValue":a[0]||(a[0]=l=>i(s).accountName=l),type:"email",placeholder:"请输入账号名"},null,512),[[r,i(s).accountName]])]),e("div",S,[d(e("input",{"onUpdate:modelValue":a[1]||(a[1]=l=>i(s).password=l),type:"password",placeholder:"请输入密码"},null,512),[[r,i(s).password]]),L,M]),e("div",{class:"inpBox"},[e("input",{onClick:v,type:"submit",class:"submit",value:"登录"})]),U,j])])]))}},P=m(z,[["__scopeId","data-v-85f2f4e0"]]);export{P as default};
