export type EntryType = 'income' | 'expense';
export type Transaction = {id:string;type:EntryType;amount:number;category:string;description:string;date:string;payment:string;note:string;recurring:boolean};
export type Goal = {id:string;name:string;target:number;saved:number;emoji:string};
export type Settings = {theme:'dark'|'light'|'system';contrast:boolean;reduceMotion:boolean;largeText:boolean;currency:string;showBalances:boolean};
export type Store = {transactions:Transaction[];budgets:Record<string,number>;goals:Goal[];settings:Settings};
export const expenseCategories=['Food & Drinks','Shopping','Housing','Transport','Entertainment','Health','Education','Bills & Utilities','Travel','Subscriptions','Other'];
export const incomeCategories=['Salary','Freelance','Investments','Gift','Refund','Other'];
export const categoryIcons:Record<string,string>={'Food & Drinks':'🍜','Shopping':'🛍️','Housing':'🏠','Transport':'🚘','Entertainment':'🎬','Health':'💊','Education':'🎓','Bills & Utilities':'⚡','Travel':'✈️','Subscriptions':'📱','Other':'🧾','Salary':'💼','Freelance':'💻','Investments':'📈','Gift':'🎁','Refund':'↩️'};
export const categoryColors=['#54d7a2','#82a6ff','#ffb77c','#c9a5fa','#ff8097','#71c4d0','#d4bf7d','#95b7ad','#9b97ff','#ef9db5','#a4aebf'];
export const defaultSettings:Settings={theme:'dark',contrast:false,reduceMotion:false,largeText:false,currency:'CAD',showBalances:true};
export const initialStore:Store={transactions:[],budgets:{},goals:[],settings:defaultSettings};
export const STORAGE_KEY='spendly.v1';
export const id=()=>typeof crypto!=='undefined'&&'randomUUID' in crypto?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const localDate=(d:Date)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const monthKey=(s:string)=>s.slice(0,7);
export const currentMonth=()=>monthKey(localDate(new Date()));
export const shiftMonth=(m:string,diff:number)=>{const [year,mon]=m.split('-').map(Number);const date=new Date(year,mon-1+diff,1);return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`};
export const monthLabel=(m:string)=>new Date(`${m}-01T12:00:00`).toLocaleDateString('en-CA',{month:'long',year:'numeric'});
export const money=(n:number,currency='CAD')=>new Intl.NumberFormat('en-CA',{style:'currency',currency}).format(n);
export const compactMoney=(n:number,currency='CAD')=>new Intl.NumberFormat('en-CA',{style:'currency',currency,notation:'compact',maximumFractionDigits:1}).format(n);
export function readStore():Store {try {const raw=localStorage.getItem(STORAGE_KEY); if(!raw)return structuredClone(initialStore);const obj:unknown=JSON.parse(raw);return validateStore(obj)}catch{return structuredClone(initialStore)}}
export function validateStore(value:unknown):Store {
 if(!value||typeof value!=='object')throw new Error('Invalid backup: expected an object.');
 const o=value as Record<string,unknown>;
 if(!Array.isArray(o.transactions)||!Array.isArray(o.goals)||!o.budgets||typeof o.budgets!=='object'||Array.isArray(o.budgets))throw new Error('Invalid Spendly backup structure.');
 const tx:Transaction[]=o.transactions.map((v:unknown)=>{const t=v as Partial<Transaction>;if(!t||typeof t.id!=='string'||!['income','expense'].includes(t.type||'')||typeof t.amount!=='number'||!Number.isFinite(t.amount)||t.amount<=0||typeof t.category!=='string'||typeof t.description!=='string'||typeof t.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(t.date)||Number.isNaN(new Date(t.date+'T12:00:00').valueOf()))throw new Error('Invalid transaction in backup.');return {id:t.id,type:t.type!,amount:t.amount,category:t.category,description:t.description,date:t.date,payment:typeof t.payment==='string'?t.payment:'Other',note:typeof t.note==='string'?t.note:'',recurring:Boolean(t.recurring)}});
 const goals:Goal[]=o.goals.map((v:unknown)=>{const g=v as Partial<Goal>;if(!g||typeof g.id!=='string'||typeof g.name!=='string'||!Number.isFinite(g.target)||!Number.isFinite(g.saved)||(g.target??0)<=0||(g.saved??0)<0)throw new Error('Invalid goal in backup.');return {id:g.id,name:g.name,target:g.target!,saved:g.saved!,emoji:typeof g.emoji==='string'?g.emoji:'🎯'}});
 const budgets:Record<string,number>={};for(const [k,v] of Object.entries(o.budgets)){if(!expenseCategories.includes(k)||typeof v!=='number'||!Number.isFinite(v)||v<0)throw new Error('Invalid budget in backup.');budgets[k]=v}
 const s=(o.settings&&typeof o.settings==='object'?o.settings:{}) as Partial<Settings>;
 const settings:Settings={theme:['dark','light','system'].includes(s.theme||'')?s.theme!:defaultSettings.theme,contrast:Boolean(s.contrast),reduceMotion:Boolean(s.reduceMotion),largeText:Boolean(s.largeText),currency:['CAD','USD','EUR','GBP','INR','AUD'].includes(s.currency||'')?s.currency!:'CAD',showBalances:s.showBalances!==false};
 return {transactions:tx,budgets,goals,settings};
}
export function demoStore():Store{
 const today=new Date();const tx:Transaction[]=[];const items:{type:EntryType;amount:number;category:string;description:string;day:number;payment:string}[]=[
 {type:'income',amount:4200,category:'Salary',description:'Monthly paycheck',day:2,payment:'Bank transfer'},
 {type:'expense',amount:1450,category:'Housing',description:'Apartment rent',day:3,payment:'Bank transfer'},
 {type:'expense',amount:68.4,category:'Food & Drinks',description:'Grocery run',day:5,payment:'Debit card'},
 {type:'expense',amount:15.75,category:'Food & Drinks',description:'Morning coffee',day:6,payment:'Credit card'},
 {type:'expense',amount:54.99,category:'Subscriptions',description:'Streaming & music',day:7,payment:'Credit card'},
 {type:'income',amount:650,category:'Freelance',description:'Website design project',day:9,payment:'Bank transfer'},
 {type:'expense',amount:128.5,category:'Shopping',description:'New sneakers',day:10,payment:'Credit card'},
 {type:'expense',amount:42.3,category:'Transport',description:'Gas station',day:11,payment:'Debit card'},
 {type:'expense',amount:85.2,category:'Entertainment',description:'Weekend outing',day:13,payment:'Credit card'},
 {type:'expense',amount:97.6,category:'Bills & Utilities',description:'Internet bill',day:14,payment:'Bank transfer'},
 {type:'expense',amount:36.9,category:'Food & Drinks',description:'Dinner with friends',day:16,payment:'Debit card'},
 {type:'expense',amount:29.5,category:'Health',description:'Pharmacy',day:18,payment:'Debit card'},
 ];
 for(let offset=3;offset>=0;offset--){const d=new Date(today.getFullYear(),today.getMonth()-offset,1);for(const item of items){if(offset===0&&item.day>today.getDate())continue; const maxDay=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();const date=localDate(new Date(d.getFullYear(),d.getMonth(),Math.min(item.day,maxDay)));tx.push({id:id(),...item,date,note:'',recurring:item.category==='Housing'||item.category==='Salary'});}}
 return {transactions:tx,budgets:{'Food & Drinks':300,Shopping:250,Housing:1600,Transport:180,Entertainment:150,Subscriptions:80,'Bills & Utilities':200},goals:[{id:id(),name:'Emergency fund',target:5000,saved:2350,emoji:'🛟'},{id:id(),name:'Summer getaway',target:1800,saved:720,emoji:'✈️'}],settings:defaultSettings};
}
export function downloadFile(filename:string,contents:string,type:string){const blob=new Blob([contents],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
export function toCSV(items:Transaction[]){const cols:(keyof Transaction)[]=['date','type','amount','category','description','payment','note','recurring'];const quote=(v:unknown)=>`"${String(v??'').replaceAll('"','""')}"`;return [cols.join(','),...items.map(t=>cols.map(k=>quote(t[k])).join(','))].join('\r\n')}
