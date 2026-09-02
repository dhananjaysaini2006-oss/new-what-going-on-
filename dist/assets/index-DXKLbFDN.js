const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index.esm-D_m3LDGF.js","assets/index.esm-CczW-omq.js","assets/index.esm-8z07djW7.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const c={ALL:"all",INDIA_POLITICS:"india-politics",INDIA:"india",WORLD:"world",GOOGLE_NEWS:"google-news",CURRENT_AFFAIRS:"current-affairs",BUSINESS:"business",TECH:"tech",SCIENCE:"science",SAVED:"saved"},A=[{id:"abp-news",name:"ABP News (ABP Live Wire)",category:c.INDIA,region:"india",rssUrl:"https://news.google.com/rss/search?q=source:%22ABP+News%22+OR+source:%22ABP+Live%22&hl=en-IN&gl=IN&ceid=IN:en",color:"#ff0033",isPolitics:!0},{id:"news18-india",name:"News18 (National & Politics Wire)",category:c.INDIA,region:"india",rssUrl:"https://www.news18.com/rss/politics.xml",color:"#16a34a",isPolitics:!0},{id:"ndtv-india",name:"NDTV National Wire",category:c.INDIA,region:"india",rssUrl:"https://feeds.feedburner.com/ndtvnews-india-news",color:"#e50914",isPolitics:!0},{id:"ndtv-top",name:"NDTV 24x7 (Top Stories)",category:c.INDIA,region:"india",rssUrl:"https://feeds.feedburner.com/ndtvnews-top-stories",color:"#e50914"},{id:"times-of-india-national",name:"The Times of India (National & Politics)",category:c.INDIA,region:"india",rssUrl:"https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",color:"#dc2626",isPolitics:!0},{id:"times-of-india-top",name:"The Times of India (Top Stories)",category:c.INDIA,region:"india",rssUrl:"https://timesofindia.indiatimes.com/rssfeedstopstories.cms",color:"#dc2626"},{id:"livemint-politics",name:"Mint (Policy & Governance)",category:c.INDIA_POLITICS,region:"india",rssUrl:"https://www.livemint.com/rss/politics",color:"#f97316",isPolitics:!0},{id:"livemint-economy",name:"Mint (Markets & Economy)",category:c.BUSINESS,region:"india",rssUrl:"https://www.livemint.com/rss/economy",color:"#ea580c"},{id:"the-hindu-national",name:"The Hindu (National & Politics)",category:c.INDIA,region:"india",rssUrl:"https://www.thehindu.com/news/national/feeder/default.rss",color:"#1e3a8a",isPolitics:!0},{id:"indian-express-politics",name:"The Indian Express (Political Pulse)",category:c.INDIA_POLITICS,region:"india",rssUrl:"https://indianexpress.com/section/political-pulse/feed/",color:"#b91c1c",isPolitics:!0},{id:"indian-express-india",name:"The Indian Express (National Wire)",category:c.INDIA,region:"india",rssUrl:"https://indianexpress.com/feed/",color:"#b91c1c"},{id:"hindustan-times",name:"Hindustan Times (India News)",category:c.INDIA,region:"india",rssUrl:"https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml",color:"#0284c7",isPolitics:!0},{id:"india-today",name:"India Today News Wire",category:c.INDIA,region:"india",rssUrl:"https://news.google.com/rss/search?q=source:%22India+Today%22&hl=en-IN&gl=IN&ceid=IN:en",color:"#e11d48",isPolitics:!0},{id:"zee-news",name:"Zee News India Wire",category:c.INDIA,region:"india",rssUrl:"https://zeenews.india.com/rss/india-national-news.xml",color:"#7c3aed",isPolitics:!0},{id:"ani-news",name:"ANI News Agency Wire",category:c.INDIA,region:"india",rssUrl:"https://news.google.com/rss/search?q=source:%22ANI+News%22&hl=en-IN&gl=IN&ceid=IN:en",color:"#0891b2",isPolitics:!0},{id:"google-india-politics",name:"Google News (India Politics & Parliament)",category:c.INDIA_POLITICS,region:"india",rssUrl:"https://news.google.com/rss/search?q=Indian+politics+parliament+cabinet+elections&hl=en-IN&gl=IN&ceid=IN:en",color:"#f59e0b",isPolitics:!0},{id:"google-india",name:"Google News India (National)",category:c.INDIA,region:"india",rssUrl:"https://news.google.com/rss/headlines/section/topic/NATION?hl=en-IN&gl=IN&ceid=IN:en",color:"#EA4335"},{id:"business-standard",name:"Business Standard India",category:c.BUSINESS,region:"india",rssUrl:"https://news.google.com/rss/search?q=source:%22Business+Standard%22&hl=en-IN&gl=IN&ceid=IN:en",color:"#2563eb"},{id:"financial-express",name:"The Financial Express India",category:c.BUSINESS,region:"india",rssUrl:"https://www.financialexpress.com/feed/",color:"#059669"},{id:"bbc-india",name:"BBC News (India Desk)",category:c.INDIA,region:"india",rssUrl:"http://feeds.bbci.co.uk/news/world/asia/india/rss.xml",color:"#bb1919"},{id:"reuters-world",name:"Reuters World Wire",category:c.WORLD,region:"global",rssUrl:"https://news.google.com/rss/search?q=source:Reuters&hl=en-US&gl=US&ceid=US:en",color:"#ff8000"},{id:"ap-world",name:"Associated Press (AP News)",category:c.WORLD,region:"global",rssUrl:"https://news.google.com/rss/search?q=source:%22Associated+Press%22&hl=en-US&gl=US&ceid=US:en",color:"#e11d48"},{id:"bbc-world",name:"BBC World News",category:c.WORLD,region:"global",rssUrl:"http://feeds.bbci.co.uk/news/world/rss.xml",color:"#bb1919"},{id:"al-jazeera",name:"Al Jazeera English Wire",category:c.WORLD,region:"global",rssUrl:"https://www.aljazeera.com/xml/rss/all.xml",color:"#ea580c"},{id:"the-guardian",name:"The Guardian World",category:c.WORLD,region:"global",rssUrl:"https://www.theguardian.com/world/rss",color:"#052962"},{id:"cnn-world",name:"CNN International",category:c.WORLD,region:"global",rssUrl:"http://rss.cnn.com/rss/edition.rss",color:"#cc0000"},{id:"france24-world",name:"France 24 Global Wire",category:c.WORLD,region:"global",rssUrl:"https://www.france24.com/en/rss",color:"#00a3e0"},{id:"dw-world",name:"Deutsche Welle (DW World)",category:c.WORLD,region:"global",rssUrl:"https://rss.dw.com/rdf/rss-en-all",color:"#004f9f"},{id:"google-top",name:"Google News (Top Stories)",category:c.GOOGLE_NEWS,region:"global",rssUrl:"https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en",color:"#4285F4"},{id:"google-world",name:"Google News World",category:c.WORLD,region:"global",rssUrl:"https://news.google.com/rss/headlines/section/topic/WORLD?hl=en-IN&gl=IN&ceid=IN:en",color:"#34A853"},{id:"techcrunch",name:"TechCrunch Wire",category:c.TECH,region:"global",rssUrl:"https://techcrunch.com/feed/",color:"#00a562"},{id:"google-tech",name:"Google News Technology",category:c.TECH,region:"global",rssUrl:"https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=en-IN&gl=IN&ceid=IN:en",color:"#FBBC05"},{id:"google-business",name:"Google News Business",category:c.BUSINESS,region:"global",rssUrl:"https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=en-IN&gl=IN&ceid=IN:en",color:"#00f0ff"},{id:"google-science",name:"Google News Science",category:c.SCIENCE,region:"global",rssUrl:"https://news.google.com/rss/headlines/section/topic/SCIENCE?hl=en-IN&gl=IN&ceid=IN:en",color:"#10b981"}],_=[{id:"all",label:"All Briefings"},{id:"national",label:"Indian Politics & Governance"},{id:"international",label:"International & Treaties"},{id:"economy",label:"Indian Economy & Banking"},{id:"defense",label:"Defense & ISRO Space"},{id:"awards",label:"Awards & Appointments"}],W=[{id:"ca-1",category:"national",title:"Parliament Winter Session: Key Bills on Digital Governance & Election Reforms Introduced",date:"Today, 08:30 AM",timestamp:Date.now()-1e3*60*35,who:"Parliament of India, Ministry of Law & Justice, Election Commission",what:"Comprehensive statutory reforms introduced in Lok Sabha focusing on electoral transparency and unified digital civil registries.",why:"Streamlining voter roll verification and establishing statutory guardrails for national public digital platforms.",impact:"Strengthens constitutional transparency and modernizes voting registration protocols across 28 states and UTs.",quiz:{question:"Which constitutional body conducts and oversees General and State Assembly elections in India?",options:["Law Commission","Election Commission of India (ECI)","NITI Aayog","Ministry of Home Affairs"],correct:1,explanation:"Under Article 324 of the Indian Constitution, the Election Commission of India exercises superintendence over elections."}},{id:"ca-2",category:"international",title:"India-EU Strategic Trade & Security Partnership Summit Concludes in New Delhi",date:"Today, 07:15 AM",timestamp:Date.now()-1e3*60*75,who:"Ministry of External Affairs (MEA) & European Commission Leadership",what:"Framework agreement advancing Free Trade Agreement (FTA) negotiations, critical raw materials supply, and clean hydrogen tech transfer.",why:"Bolstering bilateral supply chains, reducing tariff barriers, and strengthening maritime security cooperation.",impact:"Expands market access for Indian manufactured goods and accelerates European green technology investments in India.",quiz:{question:"Where was the latest India-EU Strategic Partnership Summit hosted?",options:["Brussels","New Delhi","Geneva","Berlin"],correct:1,explanation:"The strategic negotiations and ministerial summits were hosted in New Delhi."}},{id:"ca-3",category:"economy",title:"Reserve Bank of India (RBI) Monetary Policy Committee (MPC) Review",date:"Today, 06:45 AM",timestamp:Date.now()-1e3*60*110,who:"Reserve Bank of India (RBI) Governor & Monetary Policy Committee",what:"Key interest rates aligned with durable 4% inflation targets while projecting a robust 7.2% GDP expansion for the fiscal year.",why:"Balancing sustained high economic growth with food and global commodity price stability.",impact:"Anchors sovereign bond yields, sustains credit expansion for private capex, and maintains rupee foreign exchange stability.",quiz:{question:"How many members comprise the Reserve Bank of India's Monetary Policy Committee (MPC)?",options:["3 members","5 members","6 members (3 RBI + 3 External)","8 members"],correct:2,explanation:"The MPC consists of 6 members: 3 from the RBI including the Governor, and 3 external members nominated by the Government of India."}},{id:"ca-4",category:"defense",title:"ISRO & DRDO Successfully Complete Autonomous Reusable Launch Vehicle (RLV) Landing",date:"Yesterday, 18:20 PM",timestamp:Date.now()-1e3*60*240,who:"Indian Space Research Organisation (ISRO) & DRDO",what:"Autonomous pin-point landing test of the Reusable Launch Vehicle Technology Demonstrator (RLV-TD) under challenging crosswinds.",why:"Drastically cutting space launch costs for future satellite deployments and crewed missions.",impact:"Paves the way for India's orbital re-entry flights and two-stage-to-orbit reusable systems.",quiz:{question:"What is the core strategic benefit of Reusable Launch Vehicle (RLV) technology?",options:["Elimination of propellant needs","Substantial reduction in cost per kilogram to orbit","Deep sea communication","Replacing ground-based radar"],correct:1,explanation:"Reusability significantly reduces payload launch expenses per kilogram into low Earth orbit."}},{id:"ca-5",category:"awards",title:"Bharat Ratna and National Civilian Honours Announced for Distinguished Public Service",date:"Today, 05:00 AM",timestamp:Date.now()-1e3*60*160,who:"President of India & Ministry of Home Affairs",what:"Honouring visionary statesmen, grassroots social pioneers, and scientific icons for nation-building contributions.",why:"Recognizing lifetime public service and inspirational societal leadership.",impact:"Inspires national youth toward civic excellence and grassroots nation-building.",quiz:{question:"What is the highest civilian award conferred by the Republic of India?",options:["Padma Vibhushan","Bharat Ratna","Param Vir Chakra","Padma Bhushan"],correct:1,explanation:"Bharat Ratna is India's highest civilian honor, instituted in 1954."}}],L=[{id:"feat-1",title:"Parliament & National Governance: Union Cabinet Clears Landmark Infrastructure & Policy Bills",source:"The Hindu",sourceId:"the-hindu-national",category:"india-politics",region:"india",isPolitics:!0,link:"https://www.thehindu.com",image:"https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80",pubDate:new Date(Date.now()-1e3*60*10).toISOString(),snippet:"Strategic approvals for high-impact national connectivity, semiconductor manufacturing, and public sector modernization ratified in New Delhi.",content:"In a major legislative push, the Union Cabinet in New Delhi has given statutory clearance to multiple landmark bills aimed at boosting domestic manufacturing, upgrading freight corridors, and expanding national digital infrastructure.",keyPoints:["Multi-crore capital investment approved for strategic highway and freight corridors.","Sovereign incentives for domestic high-technology and electronics manufacturing.","Bipartisan consultation initiated for parliamentary committee reviews."],readTime:"3 min read"},{id:"feat-2",title:"Supreme Court of India Constitution Bench Delivers Landmark Verdict on Federal Governance",source:"The Indian Express",sourceId:"indian-express-politics",category:"india-politics",region:"india",isPolitics:!0,link:"https://indianexpress.com",image:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80",pubDate:new Date(Date.now()-1e3*60*20).toISOString(),snippet:"A five-judge Constitution bench reinforces cooperative federalism principles regarding Union and State legislative jurisdiction.",content:"In a significant constitutional jurisprudence development, the Supreme Court of India reaffirmed the doctrine of cooperative federalism, clarifying the legislative powers of state assemblies and union authorities in matters of civic governance.",keyPoints:["Upholds constitutional balance between Union and State executive powers.","Reinforces institutional autonomy and harmonious federal administration.","Establishes clear operational precedents for state civil administration."],readTime:"4 min read"},{id:"feat-3",title:"India Advances Semiconductor Ecosystem with New Mega-Fab Approvals & Global Tech Tie-ups",source:"Mint",sourceId:"livemint-economy",category:"india",region:"india",isPolitics:!1,link:"https://www.livemint.com",image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",pubDate:new Date(Date.now()-1e3*60*30).toISOString(),snippet:"Strategic approvals for silicon fabs and compound semiconductor packaging facilities mark a major leap toward global supply chain resilience.",content:"India is rapidly establishing its presence in the global microelectronics race with construction commencing on three new commercial semiconductor fabrication facilities in Gujarat and Assam.",keyPoints:["Multi-billion dollar capital expenditure approved for commercial silicon wafer fabs.","Emphasis on 28nm and specialized automotive semiconductor packaging.","Partnerships forged with top global foundry leaders and technical universities."],readTime:"3 min read"}],y={BOOKMARKS:"wgo_bookmarks_v1",THEME:"wgo_theme_v1",REFRESH_INTERVAL:"wgo_interval_v1",VIEW_MODE:"wgo_view_mode_v1",CACHED_ARTICLES:"wgo_cached_articles_v1",READ_HISTORY:"wgo_read_history_v1"};class G{constructor(){this.bookmarks=this.loadBookmarks(),this.readHistory=this.loadReadHistory()}loadBookmarks(){try{const e=localStorage.getItem(y.BOOKMARKS);return e?JSON.parse(e):[]}catch(e){return console.warn("Failed to load bookmarks from localStorage",e),[]}}saveBookmarks(){try{localStorage.setItem(y.BOOKMARKS,JSON.stringify(this.bookmarks))}catch(e){console.warn("Failed to save bookmarks",e)}}toggleBookmark(e){const t=this.bookmarks.findIndex(a=>a.id===e.id||a.link===e.link);return t>=0?(this.bookmarks.splice(t,1),this.saveBookmarks(),!1):(this.bookmarks.unshift({...e,savedAt:new Date().toISOString()}),this.saveBookmarks(),!0)}isBookmarked(e,t){return this.bookmarks.some(a=>a.id===e||t&&a.link===t)}getBookmarks(){return[...this.bookmarks]}getTheme(){return localStorage.getItem(y.THEME)||"dark"}setTheme(e){localStorage.setItem(y.THEME,e)}getRefreshInterval(){return parseInt(localStorage.getItem(y.REFRESH_INTERVAL)||"180",10)}setRefreshInterval(e){localStorage.setItem(y.REFRESH_INTERVAL,e.toString())}getViewMode(){return localStorage.getItem(y.VIEW_MODE)||"grid"}setViewMode(e){localStorage.setItem(y.VIEW_MODE,e)}getCachedArticles(){try{const e=localStorage.getItem(y.CACHED_ARTICLES);return e?JSON.parse(e):null}catch{return null}}setCachedArticles(e){try{localStorage.setItem(y.CACHED_ARTICLES,JSON.stringify(e.slice(0,100)))}catch(t){console.warn("Failed to cache articles",t)}}loadReadHistory(){try{const e=localStorage.getItem(y.READ_HISTORY);return e?JSON.parse(e):[]}catch{return[]}}markAsRead(e){if(this.readHistory||(this.readHistory=this.loadReadHistory()),!this.readHistory.includes(e)){this.readHistory.push(e),this.readHistory.length>200&&this.readHistory.shift();try{localStorage.setItem(y.READ_HISTORY,JSON.stringify(this.readHistory))}catch{}}}getCustomArticles(){try{const e=localStorage.getItem("wgo_user_articles_v1");return e?JSON.parse(e):[]}catch{return[]}}saveCustomArticle(e){const t=this.getCustomArticles(),a=[e,...t.filter(s=>s.id!==e.id)];try{localStorage.setItem("wgo_user_articles_v1",JSON.stringify(a))}catch(s){console.warn("Failed to save custom article",s)}return a}deleteCustomArticle(e){const a=this.getCustomArticles().filter(s=>s.id!==e);try{localStorage.setItem("wgo_user_articles_v1",JSON.stringify(a))}catch(s){console.warn("Failed to delete custom article",s)}return a}}const p=new G,w={parliament_governance:["https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1598555230873-10257007e056?w=1200&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1597044141243-7f28849b29bc?w=1200&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&auto=format&fit=crop&q=80"],judiciary_law:["https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80"],economy_rbi:["https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80"],defense_isro:["https://images.unsplash.com/photo-1517976487508-59a5a0da23b2?w=1200&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80"],clean_energy:["https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80"],technology:["https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80"]},$=["https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80"];class F{constructor(){this.cachedArticles=p.getCachedArticles()||[...L]}async fetchAllFeeds(e=A){const t=e.map(d=>this.fetchSingleSource(d)),a=await Promise.allSettled(t);let s=[];a.forEach(d=>{d.status==="fulfilled"&&d.value&&d.value.length>0&&s.push(...d.value)});let i=[];if(s.length>0){s.sort((h,u)=>new Date(u.pubDate).getTime()-new Date(h.pubDate).getTime());const d=L.map((h,u)=>({...h,pubDate:new Date(Date.now()-1e3*60*60*24-u*1e3*60*60).toISOString()}));i=[...s,...d]}else console.info("Using curated authentic news wire feed (offline mode)"),i=[...L];const n=new Set,o=[];for(const d of i){const h=(d.title||"").trim().toLowerCase().substring(0,45);h&&!n.has(h)&&!n.has(d.link)&&(n.add(h),d.link&&n.add(d.link),o.push(d))}o.sort((d,h)=>new Date(h.pubDate).getTime()-new Date(d.pubDate).getTime());const l=[...p.getCustomArticles(),...o];return this.cachedArticles=l,p.setCachedArticles(l),l}async fetchSingleSource(e){const t=e.rssUrl,a=`_t=${Date.now()}`;try{const s=`/api/proxy-rss?url=${encodeURIComponent(t)}&${a}`,i=await fetch(s,{signal:AbortSignal.timeout(6e3)});if(i.ok){const n=await i.text(),o=this.parseXmlFeed(n,e);if(o.length>0)return o}}catch{}try{const s=`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(t)}&${a}`,i=await fetch(s,{signal:AbortSignal.timeout(6e3)});if(i.ok){const n=await i.json();if(n.status==="ok"&&Array.isArray(n.items)&&n.items.length>0)return this.transformRss2JsonItems(n.items,e)}}catch{}try{const s=`https://corsproxy.io/?url=${encodeURIComponent(t)}&${a}`,i=await fetch(s,{signal:AbortSignal.timeout(6e3)});if(i.ok){const n=await i.text(),o=this.parseXmlFeed(n,e);if(o.length>0)return o}}catch{}try{const s=`https://api.allorigins.win/get?url=${encodeURIComponent(t)}&${a}`,i=await fetch(s,{signal:AbortSignal.timeout(6e3)});if(i.ok){const n=await i.json();if(n.contents){const o=this.parseXmlFeed(n.contents,e);if(o.length>0)return o}}}catch{}return[]}parseXmlFeed(e,t){try{const s=new DOMParser().parseFromString(e,"text/xml");return Array.from(s.querySelectorAll("item, entry")).slice(0,10).map((n,o)=>{const r=n.querySelector("title"),l=n.querySelector("link"),d=n.querySelector("pubDate, published, updated"),h=n.querySelector("description, summary, content"),u=n.getElementsByTagNameNS("*","encoded")[0],m=r?r.textContent:"Headline";let f="";l&&(f=l.getAttribute("href")||l.textContent||"");const k=(u?u.textContent:h?h.textContent:"").trim(),O=d?d.textContent:new Date().toISOString(),E=this.stripHtml(m),S=this.extractCleanSnippet(k),N=t.isPolitics||this.isPoliticalArticle(E,S),M=N&&t.region==="india"?c.INDIA_POLITICS:t.category,H=this.extractImageFromXml(n,k),q=this.resolveContextualNewsImage(H,E,S,t,o),z=this.generateSubstantiveNewsContent(E,S,k,t);return{id:`art-${t.id}-${Date.now()}-${o}`,title:E,source:t.name,sourceId:t.id,category:M,region:t.region,isPolitics:N,link:f,image:q,pubDate:this.parseDateSafe(O),snippet:S,content:z,keyPoints:this.generateKeyPoints(E,S,t),readTime:`${Math.max(2,Math.min(5,Math.ceil((S.length||220)/160)))} min read`}})}catch(a){return console.warn("XML Parse Error for source",t.name,a),[]}}transformRss2JsonItems(e,t){return e.slice(0,10).map((a,s)=>{var m;const i=this.stripHtml(a.title||""),n=a.content||a.description||"",o=this.extractCleanSnippet(n),r=t.isPolitics||this.isPoliticalArticle(i,o),l=r&&t.region==="india"?c.INDIA_POLITICS:t.category;let d=a.thumbnail||((m=a.enclosure)==null?void 0:m.link);(!d||d.includes("favicon")||d.includes("logo")||d.includes("1x1")||d.includes("feedburner"))&&(d=this.extractImageFromHtml(n));const h=this.resolveContextualNewsImage(d,i,o,t,s),u=this.generateSubstantiveNewsContent(i,o,n,t);return{id:`art-${t.id}-${Date.now()}-${s}`,title:i,source:t.name,sourceId:t.id,category:l,region:t.region,isPolitics:r,link:a.link||a.guid,image:h,pubDate:this.parseDateSafe(a.pubDate),snippet:o,content:u,keyPoints:this.generateKeyPoints(i,o,t),readTime:`${Math.max(2,Math.min(5,Math.ceil((o.length||220)/160)))} min read`}})}generateSubstantiveNewsContent(e,t,a,s){const i=this.stripHtml(a).trim();if(i.length>350&&!i.includes("Read more at")){const l=i.split(new RegExp("(?<=[.?!])\\s+"));if(l.length>=3){const d=l.slice(0,2).join(" "),h=l.slice(2,4).join(" "),u=l.slice(4).join(" ");return[d,h,u].filter(m=>m.length>20).join(`

`)}return i}return`${`In a major wire dispatch reported by ${s.name}, ${e}. According to verified reports from the scene, ${t.endsWith(".")?t:t+"."}`}

The development has prompted active reviews across relevant institutional departments and administrative bodies. Observers note that the unfolding situation holds substantial significance for regional governance, public interest, and ongoing statutory deliberations.

Official authorities and reporting correspondents on the ground continue to monitor developments closely as further communiqués and statements are anticipated in the coming hours.`}resolveContextualNewsImage(e,t,a,s,i=0){if(e&&!e.includes("1x1")&&!e.includes("pixel")&&!e.includes("favicon"))return e;const n=`${t} ${a}`.toLowerCase();return s.region==="india"||s.isPolitics||n.includes("india")||n.includes("delhi")?n.includes("supreme court")||n.includes("high court")||n.includes("judge")||n.includes("judiciary")||n.includes("verdict")||n.includes("bench")||n.includes("bail")||n.includes("cbi")||n.includes("ed")?w.judiciary_law[0]:n.includes("isro")||n.includes("space")||n.includes("satellite")||n.includes("chandrayaan")||n.includes("drdo")||n.includes("missile")?w.defense_isro[i%w.defense_isro.length]:n.includes("rupee")||n.includes("rbi")||n.includes("reserve bank")||n.includes("bank")||n.includes("sensex")||n.includes("nifty")||n.includes("gdp")||n.includes("inflation")||n.includes("finance minister")?w.economy_rbi[i%w.economy_rbi.length]:n.includes("solar")||n.includes("renewable")||n.includes("power")||n.includes("green energy")?w.clean_energy[0]:n.includes("semiconductor")||n.includes("chip")||n.includes("fab")||n.includes("hardware")?w.technology[0]:w.parliament_governance[i%w.parliament_governance.length]:$[i%$.length]}isPoliticalArticle(e,t){const a=`${e} ${t}`.toLowerCase();return["parliament","lok sabha","rajya sabha","bjp","congress","election","elections","minister","cabinet","supreme court","chief minister","prime minister","modi","rahul gandhi","governor","mla","mp","assembly","ordinance","bill","judiciary","constitution","poll","party","yogi","kejriwal","shah","niti aayog","electoral","high court"].some(i=>a.includes(i))}parseDateSafe(e){if(!e)return new Date().toISOString();const t=new Date(e);return isNaN(t.getTime())?new Date().toISOString():t.toISOString()}stripHtml(e){if(!e)return"";const t=document.createElement("DIV");return t.innerHTML=e,t.textContent||t.innerText||""}extractCleanSnippet(e){const t=this.stripHtml(e);if(!t)return"Read the complete verified story on the original publisher broadcast.";const a=t.replace(/\s+/g," ").trim();return a.length>260?a.substring(0,257)+"...":a}extractImageFromXml(e,t){const a=Array.from(e.querySelectorAll("enclosure"));for(const n of a){const o=n.getAttribute("type")||"",r=n.getAttribute("url");if(r&&(o.startsWith("image")||r.match(/\.(jpeg|jpg|png|webp)/i)))return r}const s=Array.from(e.getElementsByTagNameNS("*","content")).concat(Array.from(e.getElementsByTagNameNS("*","thumbnail")));for(const n of s){const o=n.getAttribute("url");if(o&&!o.includes("1x1")&&!o.includes("analytics")&&!o.includes("logo"))return o}const i=e.querySelector("storyimage, thumb, image > url, fullimage");if(i&&i.textContent){const n=i.textContent.trim();if(n.startsWith("http"))return n}return this.extractImageFromHtml(t)}extractImageFromHtml(e){if(e){const t=e.matchAll(/<img[^>]+(?:src|data-src|data-original)=["']([^"']+)["']/gi);for(const a of t){const s=a[1];if(s&&!s.includes("feedburner")&&!s.includes("analytics")&&!s.includes("1x1")&&!s.includes("pixel")&&!s.includes("badge")&&!s.includes("button")&&!s.includes("icon"))return s}}return null}generateKeyPoints(e,t,a){return[`Primary Development: ${e}`,`Core Briefing: ${t.length>30?t.substring(0,140)+"...":"Verified wire bulletin from "+a.name+"."}`,`Verified Media Wire: Real-time update monitored on ${a.name} editorial network.`]}}const j=new F;class V{constructor(){this.synth=window.speechSynthesis,this.currentUtterance=null,this.isPlaying=!1,this.isPaused=!1,this.currentArticleId=null,this.callbacks=[],this.voices=[],this.synth&&(this.loadVoices(),speechSynthesis.onvoiceschanged!==void 0&&(speechSynthesis.onvoiceschanged=()=>this.loadVoices()))}loadVoices(){this.voices=this.synth.getVoices()}getBestVoice(){return this.voices.length||this.loadVoices(),this.voices.find(t=>t.lang.startsWith("en")&&(t.name.includes("Natural")||t.name.includes("Google")||t.name.includes("Premium")))||this.voices.find(t=>t.lang.startsWith("en"))||this.voices[0]}speakArticle(e,t){if(!this.synth){console.warn("Speech synthesis not supported in this browser.");return}if(this.isPlaying&&this.currentArticleId===e.id){this.isPaused?this.resume():this.pause();return}this.stop();const a=e.title?e.title.replace(/<[^>]*>?/gm,""):"",s=e.snippet?e.snippet.replace(/<[^>]*>?/gm,""):"",i=e.content?e.content.replace(/<[^>]*>?/gm,""):"",n=`Story from ${e.source}. Headline: ${a}. Summary: ${s||i}`;this.currentUtterance=new SpeechSynthesisUtterance(n),this.currentUtterance.voice=this.getBestVoice(),this.currentUtterance.rate=1,this.currentUtterance.pitch=1,this.currentArticleId=e.id,this.isPlaying=!0,this.isPaused=!1,this.currentUtterance.onstart=()=>{this.notifyStateChange("playing",e)},this.currentUtterance.onend=()=>{this.isPlaying=!1,this.isPaused=!1,this.currentArticleId=null,this.notifyStateChange("ended",e),t&&t()},this.currentUtterance.onerror=o=>{console.warn("Speech synthesis error",o),this.isPlaying=!1,this.isPaused=!1,this.currentArticleId=null,this.notifyStateChange("ended",e)},this.synth.speak(this.currentUtterance)}pause(){this.synth&&this.isPlaying&&!this.isPaused&&(this.synth.pause(),this.isPaused=!0,this.notifyStateChange("paused"))}resume(){this.synth&&this.isPlaying&&this.isPaused&&(this.synth.resume(),this.isPaused=!1,this.notifyStateChange("playing"))}stop(){this.synth&&(this.synth.cancel(),this.isPlaying=!1,this.isPaused=!1,this.currentArticleId=null,this.notifyStateChange("stopped"))}subscribe(e){return this.callbacks.push(e),()=>{this.callbacks=this.callbacks.filter(t=>t!==e)}}notifyStateChange(e,t=null){this.callbacks.forEach(a=>a({state:e,article:t,articleId:this.currentArticleId,isPlaying:this.isPlaying,isPaused:this.isPaused}))}}const T=new V,K="modulepreload",J=function(g){return"/"+g},D={},C=function(e,t,a){let s=Promise.resolve();if(t&&t.length>0){let n=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),r=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=n(t.map(l=>{if(l=J(l),l in D)return;D[l]=!0;const d=l.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":K,d||(u.as="script"),u.crossOrigin="",u.href=l,r&&u.setAttribute("nonce",r),document.head.appendChild(u),d)return new Promise((m,f)=>{u.addEventListener("load",m),u.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(n){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=n,window.dispatchEvent(o),!o.defaultPrevented)throw n}return s.then(n=>{for(const o of n||[])o.status==="rejected"&&i(o.reason);return e().catch(i)})};class Y{constructor(e,t,a,s,i,n,o){this.onRefreshCallback=e,this.onSearchCallback=t,this.onThemeToggleCallback=a,this.onIntervalChangeCallback=s,this.onPublishClickCallback=i,this.onAuthClickCallback=n,this.onAdminClickCallback=o,this.remainingSeconds=p.getRefreshInterval(),this.totalSeconds=this.remainingSeconds,this.countdownTimer=null,this.clockTimer=null}init(){this.renderHeader(),this.startLiveClock(),this.startCountdown(),this.attachEventListeners(),this.updateBookmarkBadge(),this.initMobileDrawer()}renderHeader(){const e=document.getElementById("top-utility-bar"),t=document.getElementById("main-header");e&&(e.innerHTML=`
        <div class="top-bar-inner">
          <div class="top-bar-left" style="display: flex; align-items: center; gap: 14px;">
            <div class="live-time-display" style="display: flex; align-items: center; gap: 8px; font-size: 0.8rem; font-family: var(--font-sans);">
              <span style="font-weight: 700; color: var(--text-primary);" id="current-clock-date">Loading date...</span>
              <span style="color: var(--text-muted);">|</span>
              <span style="color: var(--text-secondary);">New Delhi Edition</span>
              <span style="color: var(--text-muted);">|</span>
              <a href="#hindu-top" style="color: var(--hindu-red); font-weight: 700; text-decoration: none; font-size: 0.775rem; letter-spacing: 0.05em;">e-Paper</a>
              <span style="color: var(--text-muted);">|</span>
              <div id="topbar-auth-pill" style="display: inline-flex; align-items: center;"></div>
              <span style="color: var(--text-muted);">|</span>
              <span class="badge badge-live" style="font-size: 0.675rem; padding: 2px 6px;">● LIVE WIRE</span>
            </div>
          </div>

          <div class="top-bar-right" style="display: flex; align-items: center; gap: 16px;">
            <div class="weather-snippet" style="display: flex; align-items: center; gap: 6px; font-size: 0.775rem; color: var(--text-secondary);">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
                <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
              <span><strong>New Delhi</strong> 28°C</span>
            </div>

            <div style="display: flex; align-items: center; gap: 6px; font-size: 0.725rem; font-family: var(--font-mono); color: var(--accent-emerald);">
              <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--accent-emerald); box-shadow: 0 0 6px var(--accent-emerald);"></span>
              <span id="last-sync-time">Synced: Just now</span>
            </div>

            <div class="refresh-countdown-widget" title="Auto-synchronizes news every 3 minutes">
              <svg class="countdown-progress-circle" viewBox="0 0 20 20">
                <circle class="circle-bg" cx="10" cy="10" r="7"></circle>
                <circle id="countdown-circle-bar" class="circle-progress" cx="10" cy="10" r="7"></circle>
              </svg>
              <span style="font-size: 0.725rem; color: var(--text-muted); font-weight: 600;">NEXT SYNC:</span>
              <span class="refresh-text" id="countdown-text" style="font-family: var(--font-mono); font-weight: 700; color: var(--text-primary);">03:00</span>
              <button id="btn-header-refresh" class="btn-manual-refresh" title="Synchronize News Now">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                Sync
              </button>
            </div>
          </div>
        </div>
      `),t&&(t.innerHTML=`
        <div class="header-container">
          <div class="header-left">
            <div style="font-size: 0.775rem; color: var(--text-muted); font-family: var(--font-sans); text-transform: uppercase; letter-spacing: 0.05em;">
              <strong>National Edition</strong> • Multi-Wire
            </div>
          </div>

          <div class="brand-center">
            <div class="brand-title-wrap" id="btn-brand-home">
              <h1 class="brand-title">
                WHAT'S GOING ON
              </h1>
            </div>
            <div class="brand-tagline">
              India's National Real-Time Editorial &amp; Intelligence Broadsheet
            </div>
          </div>

          <div class="header-right">
            <div class="search-box-wrapper header-search-desktop">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="global-search-input" class="search-input" placeholder="Search stories, topics..." />
              <span class="search-kbd">/</span>
            </div>

            <!-- User Auth & Admin Panel Widget -->
            <div id="header-auth-container" class="header-auth-desktop">
              <!-- Dynamically populated by updateUserAuthState -->
            </div>

            <!-- Write & Publish Story Button (Admin only: hidden by default) -->
            <button id="btn-open-publish-modal" class="action-btn header-publish-desktop" title="Write &amp; Publish News Story" style="display: none; align-items: center; gap: 6px; padding: 6px 14px; border-radius: var(--radius-sm); background: var(--hindu-navy); color: #ffffff; font-size: 0.775rem; font-weight: 800; border: 1px solid var(--hindu-navy); cursor: pointer; text-transform: uppercase; letter-spacing: 0.04em;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <span>✍️ Write Story</span>
            </button>

            <button id="btn-bookmarks-view" class="action-btn" title="Saved Bookmarks">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              <span id="header-bookmark-badge" class="bookmark-counter-badge" style="display: none;">0</span>
            </button>

            <button id="btn-theme-toggle" class="action-btn" title="Toggle Light/Dark Theme">
              <svg id="theme-icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </button>

            <!-- Hamburger: Mobile only -->
            <button id="btn-hamburger" class="action-btn btn-hamburger" title="Navigation Menu" aria-label="Open navigation menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>

          <!-- Mobile Full-Width Search Row -->
          <div class="mobile-search-bar">
            <div class="search-box-wrapper mobile-search-wrapper">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="mobile-search-input" class="search-input" placeholder="Search live news, topics, beats..." />
              <button type="button" id="mobile-search-clear" class="mobile-search-clear" style="display:none;" aria-label="Clear search">✕</button>
            </div>
          </div>
        </div>
      `)}initMobileDrawer(){const e=document.getElementById("mobile-nav-drawer"),t=document.getElementById("mobile-drawer-overlay"),a=document.getElementById("btn-mobile-drawer-close"),s=document.getElementById("btn-hamburger"),i=document.getElementById("mobile-drawer-categories"),n=()=>{e&&e.classList.add("open"),t&&(t.style.display="block"),document.body.style.overflow="hidden"},o=()=>{e&&e.classList.remove("open"),t&&(t.style.display="none"),document.body.style.overflow=""};s&&s.addEventListener("click",n),a&&a.addEventListener("click",o),window.addEventListener("keydown",l=>{l.key==="Escape"&&e&&e.classList.contains("open")&&o()});const r=[{id:"all",label:"⚡ All News (Front Page)"},{id:"india-politics",label:"🏛️ Indian Politics"},{id:"india",label:"🇮🇳 India Wire"},{id:"world",label:"🌍 Global Wire"},{id:"business",label:"📊 Markets & Economy"},{id:"google-news",label:"🌐 Google News"},{id:"current-affairs",label:"⭐ Current Affairs Hub"},{id:"tech",label:"🤖 Tech & AI"},{id:"science",label:"🚀 Science & Defense"},{id:"saved",label:"🔖 Saved Stories"}];i&&(i.innerHTML=r.map(l=>`
        <button
          class="mobile-drawer-cat-btn"
          data-cat="${l.id}"
        >${l.label}</button>
      `).join(""),i.querySelectorAll(".mobile-drawer-cat-btn").forEach(l=>{l.addEventListener("click",()=>{const d=document.querySelector(`.cat-tab[data-category="${l.dataset.cat}"]`);d&&d.click(),i.querySelectorAll(".mobile-drawer-cat-btn").forEach(h=>h.classList.remove("active")),l.classList.add("active"),o(),window.scrollTo({top:0,behavior:"smooth"})})}))}startLiveClock(){const e=()=>{const t=new Date,a=document.getElementById("current-clock-time"),s=document.getElementById("current-clock-date");a&&(a.textContent=t.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0})),s&&(s.textContent=t.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}))};e(),this.clockTimer=setInterval(e,1e3)}startCountdown(){this.countdownTimer&&clearInterval(this.countdownTimer),this.totalSeconds=p.getRefreshInterval(),this.remainingSeconds=this.totalSeconds,this.nextRefreshTime=Date.now()+this.totalSeconds*1e3;const e=document.getElementById("countdown-circle-bar"),t=document.getElementById("countdown-text"),a=2*Math.PI*7;e&&(e.style.strokeDasharray=`${a}`);const s=()=>{const i=Date.now(),n=this.nextRefreshTime-i,o=Math.max(0,Math.ceil(n/1e3));this.remainingSeconds=o;const r=Math.floor(this.remainingSeconds/60),l=this.remainingSeconds%60;if(t&&(t.textContent=`${r.toString().padStart(2,"0")}:${l.toString().padStart(2,"0")}`),e){const d=Math.min(1,Math.max(0,this.remainingSeconds/this.totalSeconds)),h=a*(1-d);e.style.strokeDashoffset=`${h}`}o<=0&&(this.resetCountdown(),t&&(t.textContent="Syncing..."),this.onRefreshCallback&&this.onRefreshCallback(!0))};s(),this.countdownTimer=setInterval(s,1e3),this.visibilityListenerAttached||(this.visibilityListenerAttached=!0,document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&s()}))}resetCountdown(){this.totalSeconds=p.getRefreshInterval(),this.remainingSeconds=this.totalSeconds,this.nextRefreshTime=Date.now()+this.totalSeconds*1e3}updateLastSyncTime(e=new Date){const t=document.getElementById("last-sync-time");if(t){const a=e.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});t.textContent=`Synced: ${a}`}}updateBookmarkBadge(){const e=document.getElementById("header-bookmark-badge"),t=p.getBookmarks().length;e&&(e.textContent=t,e.style.display=t>0?"flex":"none")}updateUserAuthState(e){var o,r,l,d,h;const t=document.getElementById("header-auth-container"),a=document.getElementById("topbar-auth-pill"),s=document.getElementById("btn-open-publish-modal"),i=e&&(e.role==="admin"||e.email&&e.email.toLowerCase()==="dhananjaysaini2006@gmail.com");if(s&&(s.style.display=i?"inline-flex":"none"),e){if(a&&(a.innerHTML=`
          <span style="color: var(--text-primary); font-weight: 800; font-size: 0.775rem; display: inline-flex; align-items: center; gap: 4px;">
            ${i?"👑 Dhananjay":`👤 ${(e.displayName||e.email).split(" ")[0]}`}
          </span>
        `),t){t.innerHTML=`
          ${i?`
            <button id="btn-header-admin-panel" class="btn-premium-admin" title="Open Executive Admin Suite">
              <span class="admin-pulse-dot"></span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Admin Suite</span>
            </button>
          `:""}

          <div class="user-auth-capsule">
            <div class="user-avatar-badge ${i?"admin-glow":""}">
              ${i?"👑":'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'}
            </div>
            <div class="user-info-col">
              <div class="user-name-line">${e.displayName||e.email.split("@")[0]}</div>
              <div class="user-role-badge ${i?"role-admin":"role-reader"}">${i?"SUPER ADMIN":"READER"}</div>
            </div>
            <button id="btn-header-signout" class="btn-premium-signout" title="Sign Out from Newsroom">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        `;const u=t.querySelector("#btn-header-admin-panel");u&&u.addEventListener("click",()=>{this.onAdminClickCallback&&this.onAdminClickCallback()});const m=t.querySelector("#btn-header-signout");m&&m.addEventListener("click",async()=>{const{firebaseService:f}=await C(async()=>{const{firebaseService:k}=await Promise.resolve().then(()=>U);return{firebaseService:k}},void 0);await f.signOut()})}}else{if(a){a.innerHTML=`
          <div style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.775rem; font-family: var(--font-sans);">
            <button id="btn-topbar-signin" class="btn-text-auth" style="background: none; border: none; padding: 0; color: var(--text-primary); cursor: pointer; font-weight: 700; font-size: 0.775rem;">Sign in</button>
            <span style="color: var(--text-muted); font-size: 0.7rem;">/</span>
            <button id="btn-topbar-signup" class="btn-text-auth" style="background: none; border: none; padding: 0; color: var(--text-primary); cursor: pointer; font-weight: 700; font-size: 0.775rem;">Sign up</button>
          </div>
        `;const u=a.querySelector("#btn-topbar-signin");u&&u.addEventListener("click",f=>{f.preventDefault(),this.onAuthClickCallback&&this.onAuthClickCallback("signin")});const m=a.querySelector("#btn-topbar-signup");m&&m.addEventListener("click",f=>{f.preventDefault(),this.onAuthClickCallback&&this.onAuthClickCallback("signup")})}if(t){t.innerHTML=`
          <div class="auth-minimal-links" style="display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-sans); font-size: 0.8rem; font-weight: 700;">
            <button id="btn-header-signin" class="btn-text-auth" style="background: none; border: none; padding: 2px 4px; color: var(--text-primary); cursor: pointer; font-weight: 700; font-size: 0.8rem; transition: color 0.15s ease;">
              Sign in
            </button>
            <span style="color: var(--text-muted); font-weight: 400; font-size: 0.75rem;">/</span>
            <button id="btn-header-signup" class="btn-text-auth" style="background: none; border: none; padding: 2px 4px; color: var(--text-primary); cursor: pointer; font-weight: 700; font-size: 0.8rem; transition: color 0.15s ease;">
              Sign up
            </button>
          </div>
        `;const u=t.querySelector("#btn-header-signin");u&&u.addEventListener("click",()=>{this.onAuthClickCallback&&this.onAuthClickCallback("signin")});const m=t.querySelector("#btn-header-signup");m&&m.addEventListener("click",()=>{this.onAuthClickCallback&&this.onAuthClickCallback("signup")})}}const n=document.getElementById("mobile-drawer-auth");n&&(e?(n.innerHTML=`
          <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="user-avatar-badge ${i?"admin-glow":""}">
                ${i?"👑":'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'}
              </div>
              <div>
                <div style="font-weight: 700; color: var(--text-primary); font-size: 0.9rem;">${e.displayName||e.email.split("@")[0]}</div>
                <div class="user-role-badge ${i?"role-admin":"role-reader"}" style="display: inline-block;">${i?"SUPER ADMIN":"READER"}</div>
              </div>
            </div>
            ${i?`
              <button id="btn-drawer-write" class="btn-drawer-admin-action">✍️ Write &amp; Publish Story</button>
              <button id="btn-drawer-admin" class="btn-drawer-admin-action">🛡️ Executive Admin Suite</button>
            `:""}
            <button id="btn-drawer-signout" class="btn-drawer-signout">Sign Out</button>
          </div>
        `,i&&((l=n.querySelector("#btn-drawer-write"))==null||l.addEventListener("click",()=>{var m;(m=document.getElementById("mobile-nav-drawer"))==null||m.classList.remove("open");const u=document.getElementById("mobile-drawer-overlay");u&&(u.style.display="none"),document.body.style.overflow="",this.onPublishClickCallback&&this.onPublishClickCallback()}),(d=n.querySelector("#btn-drawer-admin"))==null||d.addEventListener("click",()=>{var m;(m=document.getElementById("mobile-nav-drawer"))==null||m.classList.remove("open");const u=document.getElementById("mobile-drawer-overlay");u&&(u.style.display="none"),document.body.style.overflow="",this.onAdminClickCallback&&this.onAdminClickCallback()})),(h=n.querySelector("#btn-drawer-signout"))==null||h.addEventListener("click",async()=>{var f;(f=document.getElementById("mobile-nav-drawer"))==null||f.classList.remove("open");const u=document.getElementById("mobile-drawer-overlay");u&&(u.style.display="none"),document.body.style.overflow="";const{firebaseService:m}=await C(async()=>{const{firebaseService:k}=await Promise.resolve().then(()=>U);return{firebaseService:k}},void 0);await m.signOut()})):(n.innerHTML=`
          <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
            <button id="btn-drawer-signin" class="btn-drawer-auth-primary">Sign In to Newsroom</button>
            <button id="btn-drawer-signup" class="btn-drawer-auth-secondary">Create Free Account</button>
          </div>
        `,(o=n.querySelector("#btn-drawer-signin"))==null||o.addEventListener("click",()=>{var m;(m=document.getElementById("mobile-nav-drawer"))==null||m.classList.remove("open");const u=document.getElementById("mobile-drawer-overlay");u&&(u.style.display="none"),document.body.style.overflow="",this.onAuthClickCallback&&this.onAuthClickCallback("signin")}),(r=n.querySelector("#btn-drawer-signup"))==null||r.addEventListener("click",()=>{var m;(m=document.getElementById("mobile-nav-drawer"))==null||m.classList.remove("open");const u=document.getElementById("mobile-drawer-overlay");u&&(u.style.display="none"),document.body.style.overflow="",this.onAuthClickCallback&&this.onAuthClickCallback("signup")})))}attachEventListeners(){const e=document.getElementById("btn-header-refresh");e&&e.addEventListener("click",()=>{e.classList.add("spinning"),this.resetCountdown(),this.onRefreshCallback&&this.onRefreshCallback(!1).finally(()=>{setTimeout(()=>e.classList.remove("spinning"),600)})});const t=document.getElementById("select-refresh-interval");t&&(t.value=p.getRefreshInterval().toString(),t.addEventListener("change",l=>{const d=parseInt(l.target.value,10);p.setRefreshInterval(d),this.startCountdown(),this.onIntervalChangeCallback&&this.onIntervalChangeCallback(d)}));const a=document.getElementById("global-search-input"),s=document.getElementById("mobile-search-input"),i=document.getElementById("mobile-search-clear");if(a){let l=null;a.addEventListener("input",d=>{const h=d.target.value;s&&s.value!==h&&(s.value=h,i&&(i.style.display=h?"inline-flex":"none")),clearTimeout(l),l=setTimeout(()=>{this.onSearchCallback&&this.onSearchCallback(h.trim())},250)}),window.addEventListener("keydown",d=>{d.key==="/"&&document.activeElement!==a&&document.activeElement!==s&&(d.preventDefault(),window.innerWidth<=900&&s?s.focus():a.focus())})}if(s){let l=null;s.addEventListener("input",d=>{const h=d.target.value;i&&(i.style.display=h.length>0?"inline-flex":"none"),a&&a.value!==h&&(a.value=h),clearTimeout(l),l=setTimeout(()=>{this.onSearchCallback&&this.onSearchCallback(h.trim())},250)}),i&&i.addEventListener("click",()=>{s.value="",i.style.display="none",a&&(a.value=""),this.onSearchCallback&&this.onSearchCallback("")})}const n=document.getElementById("btn-brand-home");n&&n.addEventListener("click",()=>{a&&(a.value=""),s&&(s.value=""),i&&(i.style.display="none"),this.onSearchCallback&&this.onSearchCallback("");const l=document.querySelector('.cat-tab[data-category="all"]');l&&l.click()});const o=document.getElementById("btn-open-publish-modal");o&&o.addEventListener("click",()=>{this.onPublishClickCallback&&this.onPublishClickCallback()});const r=document.getElementById("btn-theme-toggle");r&&r.addEventListener("click",()=>{this.onThemeToggleCallback&&this.onThemeToggleCallback()})}}class Q{constructor(e){this.onArticleClickCallback=e,this.articles=[]}render(e){this.articles=e||[];const t=document.getElementById("breaking-news-ticker-container");if(!t)return;if(this.articles.length===0){t.style.display="none";return}t.style.display="block";const a=this.articles.slice(0,10),i=[...a,...a].map((o,r)=>`
      <div class="ticker-item" data-id="${o.id}" data-idx="${r%a.length}">
        <span class="dot"></span>
        <span class="source-tag">[${o.source}]</span>
        <span class="title-text">${o.title}</span>
      </div>
    `).join("");t.innerHTML=`
      <div class="ticker-bar">
        <div class="ticker-label">
          <span class="badge-live"></span>
          BREAKING
        </div>
        <div class="ticker-track-wrap">
          <div class="ticker-marquee" id="ticker-marquee-element">
            ${i}
          </div>
        </div>
      </div>
    `,t.querySelectorAll(".ticker-item").forEach(o=>{o.addEventListener("click",()=>{const r=o.getAttribute("data-id"),l=this.articles.find(d=>d.id===r)||this.articles[0];this.onArticleClickCallback&&l&&this.onArticleClickCallback(l)})})}}class X{constructor(e,t){this.onArticleClickCallback=e,this.onBookmarkToggleCallback=t,this.viewMode=p.getViewMode()}setViewMode(e){this.viewMode=e,p.setViewMode(e)}formatTimeAgo(e){try{const t=new Date(e),s=new Date-t,i=Math.floor(s/(1e3*60));if(i<1)return"Just now";if(i<60)return`${i}m ago`;const n=Math.floor(i/60);return n<24?`${n}h ago`:`${Math.floor(n/24)}d ago`}catch{return"Recently"}}render(e,t={}){const a=document.getElementById("main-news-feed");if(!a)return;const{category:s="all",searchQuery:i="",sourceFilter:n="all"}=t;if(!e||e.length===0){const f=t.category==="saved";a.innerHTML=f?`<div class="empty-state-premium">
            <div class="empty-state-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3>Your reading list is empty</h3>
            <p>Tap the <strong>bookmark icon</strong> on any article or story card to save it here for later reading.</p>
            <button class="empty-state-cta" onclick="document.querySelector('.cat-tab[data-category=all]')?.click()">
              Browse All News &rarr;
            </button>
          </div>`:`<div class="empty-state-premium">
            <div class="empty-state-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h3>No articles found</h3>
            <p>Try adjusting your search query or selecting a different news wire filter.</p>
            <button class="empty-state-cta" onclick="document.querySelector('.cat-tab[data-category=all]')?.click()">
              Back to Front Page &rarr;
            </button>
          </div>`;return}if(s===c.ALL&&!i&&n==="all"){this.renderHomeAllNews(e,a);return}const o=!i&&e.length>0,r=o?e[0]:null,l=o?e.slice(1):e,d=r?this.buildHeroCardHtml(r):"",h=this.buildArticlesGridHtml(l),u=s===c.BUSINESS&&!i?this.buildMarketIndicesDashboardHtml():"";let m="Latest Stories";i?m=`Search Results: "${i}"`:s===c.INDIA_POLITICS?m="🏛️ Indian Politics & National Governance":s===c.INDIA?m="🇮🇳 Indian Media Wires":s===c.WORLD?m="🌍 Global News Wires & International":s===c.BUSINESS?m="📊 Global & Indian Business Wire":s===c.GOOGLE_NEWS?m="🌐 Google News Live Wire":s===c.SAVED?m="🔖 Saved Bookmarks":m=`${s.toUpperCase()} Wire`,a.innerHTML=`
      ${u}
      <div class="section-heading-wrap">
        <h2 class="section-title">
          <span>${m}</span>
          <span class="section-count">${e.length} Stories</span>
        </h2>
      </div>
      ${d}
      ${h}
    `,this.attachCardEventListeners(e)}buildMarketIndicesDashboardHtml(){return`
      <div class="market-dashboard-banner animate-fade-in">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
          <div>
            <div style="font-size: 0.775rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em; color: var(--accent-cyan); margin-bottom: 4px;">
              Financial Intelligence Terminal
            </div>
            <h2 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--text-primary); margin: 0;">
              Global & Indian Market Indices
            </h2>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="badge badge-category">INDICATIVE DATA</span>
            <span class="badge badge-category">SENTIMENT: BULLISH (+0.45%)</span>
          </div>
        </div>

        <div class="market-dashboard-grid">
          ${[{name:"BSE SENSEX",country:"🇮🇳 India (BSE)",val:"81,450.20",change:"+0.42% (+340.50 pts)",isUp:!0},{name:"NSE NIFTY 50",country:"🇮🇳 India (NSE)",val:"24,870.50",change:"+0.38% (+95.10 pts)",isUp:!0},{name:"NIFTY BANK",country:"🇮🇳 India Banking",val:"51,280.15",change:"+0.55% (+280.20 pts)",isUp:!0},{name:"NASDAQ 100",country:"🇺🇸 US Tech",val:"19,740.10",change:"+0.64% (+125.80 pts)",isUp:!0},{name:"S&P 500",country:"🇺🇸 US Large Cap",val:"5,640.20",change:"+0.32% (+18.10 pts)",isUp:!0},{name:"DOW JONES",country:"🇺🇸 US Industrial",val:"41,210.00",change:"-0.12% (-50.40 pts)",isUp:!1},{name:"FTSE 100",country:"🇬🇧 London UK",val:"8,360.50",change:"+0.22% (+18.40 pts)",isUp:!0},{name:"NIKKEI 225",country:"🇯🇵 Tokyo Japan",val:"38,720.00",change:"+0.75% (+290.00 pts)",isUp:!0},{name:"USD / INR",country:"💱 Foreign Exchange",val:"₹83.85",change:"-0.05% Rupee Firm",isUp:!0},{name:"BRENT CRUDE",country:"🛢️ Global Energy",val:"$78.20 / bbl",change:"-0.85% (-$0.67)",isUp:!1},{name:"GOLD 24K",country:"🪙 Bullion (10g INR)",val:"₹72,450",change:"+0.30% (+₹220)",isUp:!0},{name:"BITCOIN",country:"⚡ Digital Asset (USD)",val:"$64,820",change:"+1.85% (+$1,180)",isUp:!0}].map(t=>`
            <div class="market-index-card">
              <div class="market-index-top">
                <span class="market-index-name">${t.name}</span>
                <span class="market-index-country">${t.country}</span>
              </div>
              <div class="market-index-val">${t.val}</div>
              <div class="market-index-change ${t.isUp?"market-change-up":"market-change-down"}">
                ${t.isUp?"▲":"▼"} ${t.change}
              </div>
            </div>
          `).join("")}
        </div>
        <div class="market-indicative-note">* Data shown is indicative / illustrative only. Not financial advice.</div>
      </div>
    `}renderHomeAllNews(e,t){const a=e[0],s=e.slice(1,5),i=e.filter(h=>h.region==="india"||h.category===c.INDIA||h.category===c.INDIA_POLITICS),n=e.filter(h=>h.region==="global"||h.category===c.WORLD||h.category===c.GOOGLE_NEWS),o=e.filter(h=>h.category===c.BUSINESS),r=e.filter(h=>h.category===c.TECH||h.category===c.SCIENCE),l=e.slice(5,13),d=a.region==="india"?"NEW DELHI —":a.region==="global"?"GLOBAL WIRE —":"DISPATCH —";t.innerHTML=`
      <!-- THE HINDU SIGNATURE 3-COLUMN BROADSHEET TOP FOLD (ALL NEWS FOCUS) -->
      <section class="hindu-top-fold animate-fade-in" id="hindu-top">
        <!-- Column 1: Main Lead Story (Left) -->
        <div class="hindu-lead-col" data-id="${a.id}">
          <div class="hindu-lead-image-wrap">
            <img src="${a.image}" alt="${a.title}" class="hindu-lead-img" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80'" />
            <div style="position: absolute; top: 14px; left: 14px; z-index: 2; display: flex; gap: 8px;">
              <span class="badge badge-live">● TOP LEAD STORY</span>
              <span class="badge badge-source">${a.source}</span>
            </div>
          </div>
          
          <div class="hindu-lead-tag">
            <span>${(a.category||"ALL NEWS").toUpperCase()}</span>
            <span style="color: var(--text-muted); font-weight: 500;">• ${this.formatTimeAgo(a.pubDate)}</span>
          </div>

          <h1 class="hindu-lead-title" data-action="open-article">${a.title}</h1>

          <p class="hindu-dateline-snippet">
            <span class="hindu-dateline">${d}</span>
            ${a.snippet}
          </p>

          ${a.keyPoints&&a.keyPoints.length>0?`
            <div class="modal-key-points" style="margin: 4px 0 12px; padding: 14px 18px;">
              <h4 style="font-size: 0.8rem; margin-bottom: 8px; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em;">
                ⭐ Core Intelligence Takeaways:
              </h4>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.55;">
                ${a.keyPoints.slice(0,2).map(h=>`<li>${h}</li>`).join("")}
              </ul>
            </div>
          `:""}

          <div class="hindu-lead-footer">
            <button class="audio-player-pill" data-action="speak-article" title="Listen Audio">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span>Listen</span>
              <div class="audio-waveform">
                <div class="audio-bar"></div><div class="audio-bar"></div><div class="audio-bar"></div><div class="audio-bar"></div>
              </div>
            </button>

            <div style="display: flex; gap: 8px;">
              <button class="btn-card-action ${p.isBookmarked(a.id,a.link)?"bookmarked":""}" data-action="bookmark" title="Bookmark">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="${p.isBookmarked(a.id,a.link)?"currentColor":"none"}" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Column 2: Top Stories Right Now (Middle Wire Across All Beats) -->
        <div class="hindu-wire-col">
          <div class="hindu-col-header">
            <h3>Top Stories Right Now</h3>
            <span class="badge badge-live" style="font-size: 0.65rem; padding: 2px 6px;">ALL BEATS</span>
          </div>

          ${s.map(h=>`
            <article class="hindu-wire-item" data-id="${h.id}">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="hindu-wire-tag">${(h.category||"GENERAL").toUpperCase()}</span>
                <span style="font-size: 0.725rem; color: var(--text-muted); font-family: var(--font-mono);">${this.formatTimeAgo(h.pubDate)}</span>
              </div>
              <h4 class="hindu-wire-headline" data-action="open-article">${h.title}</h4>
              <div class="hindu-wire-meta">
                <span style="font-weight: 700; color: var(--accent-cyan);">${h.source}</span>
                <span style="color: var(--text-muted);">•</span>
                <span style="color: var(--text-muted);">${h.readTime||"2 min read"}</span>
              </div>
            </article>
          `).join("")}
        </div>

        <!-- Column 3: The Editorial Desk & In-Depth Analysis (Right) -->
        <div class="hindu-editorial-col">
          <div class="hindu-col-header">
            <h3>Editorial & Perspectives</h3>
            <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-serif); font-style: italic;">The Hindu Broadsheet</span>
          </div>

          <div class="hindu-editorial-box">
            <span class="hindu-editorial-badge">THE EDITORIAL</span>
            <article class="hindu-op-card" data-action="open-article" data-id="${a.id}">
              <h4 class="hindu-op-title">"Global Trade Alignments & The New Multilateral Order"</h4>
              <span class="hindu-op-byline">By The Editorial Board • Broadsheet Special</span>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.55; margin-top: 6px;">
                Examining shifting supply corridors, sovereign manufacturing policies, and geopolitical trade dialogues across emerging economies.
              </p>
            </article>

            <article class="hindu-op-card" style="margin-top: 6px;">
              <h4 class="hindu-op-title">"Technological Sovereignty: AI Governance, Fabs & Strategic Growth"</h4>
              <span class="hindu-op-byline">By Science & Technology Editor</span>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.55; margin-top: 6px;">
                How deep tech investments and digital infrastructure are transforming public governance and industrial competitiveness.
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- SECTION 1: ALL NEWS FRONT PAGE WIRE -->
      <section class="hindu-section-band">
        <div class="hindu-section-bar">
          <h2 class="hindu-section-title">
            <span>Front Page All-News Wire</span>
          </h2>
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">${e.length} Stories</span>
        </div>
        ${this.buildArticlesGridHtml(l)}
      </section>

      <!-- SECTION 2: INDIA & NATIONAL NEWS WIRE -->
      ${i.length>0?`
        <section class="hindu-section-band">
          <div class="hindu-section-bar">
            <h2 class="hindu-section-title">
              <span>🇮🇳 India & National Governance Wire</span>
            </h2>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">${i.length} Stories</span>
          </div>
          ${this.buildArticlesGridHtml(i.slice(0,4))}
        </section>
      `:""}

      <!-- SECTION 3: WORLD & GLOBAL DIPLOMATIC WIRES -->
      ${n.length>0?`
        <section class="hindu-section-band">
          <div class="hindu-section-bar">
            <h2 class="hindu-section-title">
              <span>🌍 World & Global Affairs Wire</span>
            </h2>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">${n.length} Stories</span>
          </div>
          ${this.buildArticlesGridHtml(n.slice(0,4))}
        </section>
      `:""}

      <!-- SECTION 4: BUSINESS, ECONOMY & MARKETS WIRE -->
      ${o.length>0?`
        <section class="hindu-section-band">
          <div class="hindu-section-bar">
            <h2 class="hindu-section-title">
              <span>📈 Business, Economy & Markets Wire</span>
            </h2>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">${o.length} Stories</span>
          </div>
          ${this.buildArticlesGridHtml(o.slice(0,4))}
        </section>
      `:""}

      <!-- SECTION 5: TECHNOLOGY, AI & SCIENCE WIRE -->
      ${r.length>0?`
        <section class="hindu-section-band">
          <div class="hindu-section-bar">
            <h2 class="hindu-section-title">
              <span>🤖 Technology, Science & Space Wire</span>
            </h2>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">${r.length} Stories</span>
          </div>
          ${this.buildArticlesGridHtml(r.slice(0,4))}
        </section>
      `:""}
    `,this.attachCardEventListeners(e)}buildHeroCardHtml(e,t="LIVE LEAD STORY"){const a=p.isBookmarked(e.id,e.link),s=e.region==="india"||e.isPolitics;return`
      <div class="hero-story-card animate-fade-in" data-id="${e.id}">
        <div class="hero-image-wrap">
          <img src="${e.image}" alt="${e.title}" class="hero-img" loading="eager" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&auto=format&fit=crop&q=80'" />
          <div style="position: absolute; top: 18px; left: 18px; z-index: 2; display: flex; gap: 8px;">
            <span class="badge ${s?"badge-live":"badge-source"}">${t}</span>
            <span class="badge badge-category">${e.source}</span>
          </div>
        </div>
        <div class="hero-content">
          <div class="hero-meta-top">
            <span class="badge badge-category">${e.isPolitics?"🏛️ INDIAN POLITICS":(e.category||"NEWS").toUpperCase()}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">• ${this.formatTimeAgo(e.pubDate)}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">• ${e.readTime||"3 min read"}</span>
          </div>

          <h2 class="hero-title" data-action="open-article">${e.title}</h2>
          <p class="hero-excerpt">${e.snippet}</p>

          <div class="hero-footer">
            <button class="audio-player-pill" data-action="speak-article" title="Listen to summary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span>Listen Audio</span>
              <div class="audio-waveform">
                <div class="audio-bar"></div><div class="audio-bar"></div><div class="audio-bar"></div><div class="audio-bar"></div>
              </div>
            </button>

            <div class="hero-actions">
              <button class="btn-card-action ${a?"bookmarked":""}" data-action="bookmark" title="Bookmark article">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="${a?"currentColor":"none"}" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
              <button class="btn-card-action" data-action="share" title="Share article">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `}buildArticlesGridHtml(e){return this.viewMode==="grid"?`
        <div class="news-grid-cards">
          ${e.map(t=>{const a=p.isBookmarked(t.id,t.link);return`
              <article class="article-card animate-fade-in" data-id="${t.id}">
                <div class="card-thumb-wrap">
                  <img src="${t.image}" alt="${t.title}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&auto=format&fit=crop&q=80'" />
                  <div class="card-category-overlay">
                    <span class="badge ${t.isPolitics?"badge-live":"badge-category"}">${t.isPolitics?"🏛️ POLITICS":t.category}</span>
                  </div>
                </div>
                <div class="card-body">
                  <div class="card-meta-row">
                    <span style="font-weight: 700; color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.75rem;">${t.source}</span>
                    <span>${this.formatTimeAgo(t.pubDate)}</span>
                  </div>

                  <h3 class="card-title" data-action="open-article">${t.title}</h3>
                  <p class="card-snippet">${t.snippet}</p>

                  <div class="card-footer">
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${t.readTime||"2 min read"}</span>
                    <div class="card-actions-group">
                      <button class="btn-card-action" data-action="speak-article" title="Listen Audio">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                      </button>
                      <button class="btn-card-action ${a?"bookmarked":""}" data-action="bookmark" title="Save bookmark">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="${a?"currentColor":"none"}" stroke="currentColor" stroke-width="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            `}).join("")}
        </div>
      `:`
        <div class="compact-list-layout">
          ${e.map(t=>{const a=p.isBookmarked(t.id,t.link);return`
              <div class="compact-item animate-fade-in" data-id="${t.id}">
                <div class="compact-thumb">
                  <img src="${t.image}" alt="${t.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&auto=format&fit=crop&q=80'" />
                </div>
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; font-size: 0.775rem;">
                    <span style="color: var(--accent-cyan); font-weight: 700;">${t.source}</span>
                    <span style="color: var(--text-muted);">• ${this.formatTimeAgo(t.pubDate)}</span>
                    <span class="badge ${t.isPolitics?"badge-live":"badge-category"}" style="font-size: 0.65rem; padding: 2px 6px;">${t.isPolitics?"POLITICS":t.category}</span>
                  </div>
                  <h3 class="compact-title" data-action="open-article">${t.title}</h3>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <button class="btn-card-action ${a?"bookmarked":""}" data-action="bookmark" title="Bookmark">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="${a?"currentColor":"none"}" stroke="currentColor" stroke-width="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            `}).join("")}
        </div>
      `}attachCardEventListeners(e){const t=document.getElementById("main-news-feed");t&&t.addEventListener("click",a=>{const s=a.target.closest("[data-action]"),i=a.target.closest("[data-id]");if(!i)return;const n=i.getAttribute("data-id"),o=e.find(r=>r.id===n);if(o)if(s){const r=s.getAttribute("data-action");if(r==="open-article")this.onArticleClickCallback&&this.onArticleClickCallback(o);else if(r==="bookmark"){const l=p.toggleBookmark(o);s.classList.toggle("bookmarked",l);const d=s.querySelector("svg");d&&d.setAttribute("fill",l?"currentColor":"none"),this.onBookmarkToggleCallback&&this.onBookmarkToggleCallback(o,l)}else r==="speak-article"?T.speakArticle(o):r==="share"&&(navigator.share?navigator.share({title:o.title,text:o.snippet,url:o.link||window.location.href}).catch(()=>{}):(navigator.clipboard.writeText(o.link||window.location.href),alert("Article link copied to clipboard!")))}else a.target.closest("button")||this.onArticleClickCallback&&this.onArticleClickCallback(o)})}}class Z{constructor(){this.activeTopic="all",this.currentAffairsList=[...W]}render(){const e=document.getElementById("main-news-feed");if(!e)return;const t=this.activeTopic==="all"?this.currentAffairsList:this.currentAffairsList.filter(i=>i.category===this.activeTopic),s=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});e.innerHTML=`
      <div class="ca-hub-container">
        <!-- Hero Intelligence Banner -->
        <div class="ca-hero-banner">
          <div class="ca-banner-header">
            <span class="ca-badge">⭐ Daily Intelligence Briefing</span>
            <span class="ca-banner-date">${s}</span>
          </div>
          <h2 class="ca-banner-title">Current Affairs & Strategic Analysis</h2>
          <p class="ca-banner-desc">
            Structured daily briefings, policy breakdowns, geopolitical treaties, and competitive exam intelligence curated in high-yield formats.
          </p>
        </div>

        <!-- Subtabs -->
        <div class="ca-subtabs" id="ca-subtabs-wrap">
          ${_.map(i=>`
            <button class="ca-subtab-btn ${this.activeTopic===i.id?"active":""}" data-topic="${i.id}">
              ${i.label}
            </button>
          `).join("")}
        </div>

        <!-- Briefing Cards -->
        <div class="ca-cards-list" style="display: flex; flex-direction: column; gap: 20px;">
          ${t.map(i=>`
            <div class="ca-card" data-id="${i.id}">
              <div class="ca-card-top">
                <span class="ca-category-pill ca-cat-${i.category}">
                  ${i.category.toUpperCase()}
                </span>
                <span style="font-size: 0.775rem; color: var(--text-muted); font-family: var(--font-mono);">${i.date}</span>
              </div>

              <h3 class="ca-title">${i.title}</h3>

              <!-- 4-Box Structured Matrix -->
              <div class="ca-analysis-grid">
                <div class="ca-analysis-box">
                  <div class="ca-box-label label-what">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    What Happened
                  </div>
                  <div class="ca-box-text">${i.what}</div>
                </div>

                <div class="ca-analysis-box">
                  <div class="ca-box-label label-why">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    Why It Matters
                  </div>
                  <div class="ca-box-text">${i.why}</div>
                </div>

                <div class="ca-analysis-box">
                  <div class="ca-box-label label-impact">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                    Impact & Significance
                  </div>
                  <div class="ca-box-text">${i.impact}</div>
                </div>

                <div class="ca-analysis-box">
                  <div class="ca-box-label label-facts">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Key Stakeholders
                  </div>
                  <div class="ca-box-text">${i.who}</div>
                </div>
              </div>

              <div class="ca-card-footer">
                <button class="audio-player-pill" data-action="speak-ca" data-id="${i.id}" title="Listen to Briefing">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                  <span>Listen Audio Note</span>
                </button>

                <button class="btn-manual-refresh" data-action="copy-ca" data-id="${i.id}" title="Copy Note">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  Copy Briefing
                </button>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Daily Interactive Quiz Section -->
        <div class="ca-quiz-section">
          <div class="ca-quiz-header">
            <h3 style="font-family: var(--font-serif); font-size: 1.3rem;">🧠 Daily Current Affairs Knowledge Check</h3>
            <span class="badge badge-source">${t.length} Flashcards</span>
          </div>

          <div class="quiz-cards-container">
            ${t.map((i,n)=>`
              <div class="quiz-card" id="quiz-card-${i.id}">
                <div style="font-size: 0.75rem; color: var(--accent-amber); font-weight: 700; margin-bottom: 6px;">QUESTION 0${n+1}</div>
                <div class="quiz-question">${i.quiz.question}</div>
                
                <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
                  ${i.quiz.options.map((o,r)=>`
                    <button class="quiz-option-btn" data-ca-id="${i.id}" data-opt-idx="${r}" style="text-align: left; padding: 8px 12px; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); font-size: 0.85rem; color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast);">
                      ${String.fromCharCode(65+r)}. ${o}
                    </button>
                  `).join("")}
                </div>

                <div class="quiz-answer" id="quiz-ans-${i.id}">
                  <strong>Correct Answer: Option ${String.fromCharCode(65+i.quiz.correct)} (${i.quiz.options[i.quiz.correct]})</strong>
                  <p style="margin-top: 4px; font-size: 0.825rem; color: var(--text-secondary);">${i.quiz.explanation}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `,this.attachEventListeners()}attachEventListeners(){document.querySelectorAll(".ca-subtab-btn").forEach(i=>{i.addEventListener("click",()=>{this.activeTopic=i.getAttribute("data-topic"),this.render()})}),document.querySelectorAll('[data-action="speak-ca"]').forEach(i=>{i.addEventListener("click",()=>{const n=i.getAttribute("data-id"),o=this.currentAffairsList.find(r=>r.id===n);o&&T.speakArticle({id:o.id,source:"Current Affairs Intelligence",title:o.title,snippet:`${o.what}. Significance: ${o.impact}`})})}),document.querySelectorAll('[data-action="copy-ca"]').forEach(i=>{i.addEventListener("click",()=>{const n=i.getAttribute("data-id"),o=this.currentAffairsList.find(r=>r.id===n);if(o){const r=`*Current Affairs: ${o.title}*

• What: ${o.what}
• Why: ${o.why}
• Impact: ${o.impact}
• Stakeholders: ${o.who}`;navigator.clipboard.writeText(r),i.innerHTML='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!',setTimeout(()=>{i.innerHTML='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Briefing'},2e3)}})}),document.querySelectorAll(".quiz-option-btn").forEach(i=>{i.addEventListener("click",()=>{const n=i.getAttribute("data-ca-id"),o=parseInt(i.getAttribute("data-opt-idx"),10),r=this.currentAffairsList.find(d=>d.id===n),l=document.getElementById(`quiz-ans-${n}`);r&&l&&(l.classList.add("show"),o===r.quiz.correct?(i.style.borderColor="#10b981",i.style.background="rgba(16, 185, 129, 0.2)",i.style.color="#34d399"):(i.style.borderColor="#ef4444",i.style.background="rgba(239, 68, 68, 0.2)",i.style.color="#f87171"))})})}}class ee{constructor(e){this.onBookmarkToggleCallback=e,this.currentArticle=null,this.fontSize=17,this.init()}init(){this.renderModalContainer(),this.attachGlobalListeners()}renderModalContainer(){let e=document.getElementById("article-reader-modal");e||(e=document.createElement("div"),e.id="article-reader-modal",e.className="modal-overlay",document.body.appendChild(e))}open(e){this.currentArticle=e,p.markAsRead(e.id);const t=document.getElementById("article-reader-modal");if(!t)return;const a=p.isBookmarked(e.id,e.link),i=(e.content||e.snippet||"").split(`

`).filter(r=>r.trim().length>0);t.innerHTML=`
      <div class="reader-modal-container" role="dialog" aria-modal="true">
        <!-- Reading Progress Bar -->
        <div id="modal-read-progress-bar" style="position: absolute; top: 0; left: 0; height: 3px; width: 0%; background: linear-gradient(90deg, var(--hindu-red), var(--accent-cyan)); border-radius: 0; transition: width 0.1s linear; z-index: 10;"></div>

        <!-- Top Action Bar -->
        <div class="modal-top-bar">
          <div class="modal-controls-left">
            <span class="badge badge-source">${e.source}</span>
            <span style="font-size: 0.775rem; color: var(--text-muted); font-family: var(--font-mono);">• ${e.readTime||"3 min read"}</span>
            
            <div class="font-size-adjuster" title="Adjust Font Size">
              <button id="modal-font-dec">A-</button>
              <button id="modal-font-inc">A+</button>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <button id="modal-audio-btn" class="audio-player-pill" title="Listen Audio Summary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span>Listen</span>
            </button>

            <button id="modal-bookmark-btn" class="action-btn ${a?"bookmarked":""}" title="Bookmark Article">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${a?"currentColor":"none"}" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>

            <button id="modal-close-btn" class="action-btn" title="Close (Esc)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Scrollable Article Reader Body -->
        <div class="modal-scroll-content">
          <div class="modal-article-meta">
            <span class="badge ${e.isPolitics?"badge-live":"badge-category"}">${e.isPolitics?"🏛️ INDIAN POLITICS":e.category.toUpperCase()}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">
              Published: ${new Date(e.pubDate).toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"})}
            </span>
          </div>

          <h1 class="modal-article-title">${e.title}</h1>

          ${e.image?`
            <div class="modal-image-wrap">
              <img src="${e.image}" alt="${e.title}" class="modal-img" onerror="this.src='https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80'" />
            </div>
          `:""}

          <!-- Key Takeaways & Fact Points Box -->
          ${e.keyPoints&&e.keyPoints.length>0?`
            <div class="modal-key-points">
              <h4 style="display: flex; align-items: center; gap: 8px;">
                <span>⭐ Key Intelligence Points</span>
              </h4>
              <ul>
                ${e.keyPoints.map(r=>`<li>${r}</li>`).join("")}
              </ul>
            </div>
          `:""}

          <!-- Substantive News Story (Half News Core Briefing) -->
          <div class="modal-article-body" id="modal-article-body-text" style="font-size: ${this.fontSize}px;">
            <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-cyan); font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
              <span class="badge-live"></span>
              Core Story Briefing
            </div>

            ${i.map(r=>`<p>${r}</p>`).join("")}
          </div>

          <!-- Author or Origin Card -->
          ${e.isUserPublished?`
            <div style="background: rgba(0, 51, 102, 0.08); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 20px 24px; margin-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
              <div>
                <span class="badge-user-editorial">AUTHOR EXCLUSIVE</span>
                <p style="margin: 6px 0 0; font-size: 0.875rem; color: var(--text-secondary);">
                  This article was written and published directly by you on What's Going On.
                </p>
              </div>
              <button id="modal-delete-user-article-btn" class="btn-cancel-modal" style="color: var(--hindu-red); border-color: var(--hindu-red); font-weight: 700;">
                🗑️ Unpublish / Delete Story
              </button>
            </div>
          `:`
            <!-- Read Full Complete Story at Origin Publisher Card -->
            <div style="background: linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(59, 130, 246, 0.1) 100%); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 24px; margin-top: 24px; display: flex; flex-direction: column; gap: 14px; text-align: center; align-items: center;">
              <div style="font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent-cyan);">
                Read More on Original Publisher
              </div>
              <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary);">
                Want to read the complete in-depth coverage?
              </h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); max-width: 540px; margin: 0 auto;">
                You have read the essential news summary on What's Going On. For the complete full story, investigative records, and live broadcast, continue directly to <strong>${e.source}</strong>.
              </p>
              <a href="${e.link||"#"}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; background: var(--accent-cyan); color: #000; font-weight: 700; padding: 12px 24px; border-radius: var(--radius-full); text-decoration: none; font-size: 0.9rem; transition: transform var(--transition-fast);" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                <span>Read Full Complete Story on ${e.source}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          `}
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer-bar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button id="modal-copy-link-btn" class="btn-manual-refresh" title="Copy article link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              Copy Link
            </button>
            <button id="modal-whatsapp-btn" class="btn-manual-refresh" title="Share this article">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              Share
            </button>
          </div>

          <a href="${e.link||"#"}" target="_blank" rel="noopener noreferrer" class="badge badge-source" style="font-size: 0.8rem; padding: 6px 14px; text-decoration: none;">
            Direct Source Link: ${e.source} ↗
          </a>
        </div>
      </div>
    `,t.classList.add("active"),document.body.style.overflow="hidden",this.attachModalEvents(e);const n=t.querySelector(".modal-scroll-content"),o=document.getElementById("modal-read-progress-bar");n&&o&&n.addEventListener("scroll",()=>{const r=n.scrollTop,l=n.scrollHeight-n.clientHeight,d=l>0?Math.min(100,r/l*100):0;o.style.width=d+"%"},{passive:!0})}close(){const e=document.getElementById("article-reader-modal");e&&(e.classList.remove("active"),document.body.style.overflow="")}attachModalEvents(e){const t=document.getElementById("modal-close-btn");t&&t.addEventListener("click",()=>this.close());const a=document.getElementById("modal-article-body-text"),s=document.getElementById("modal-font-inc"),i=document.getElementById("modal-font-dec");s&&a&&s.addEventListener("click",()=>{this.fontSize<24&&(this.fontSize+=1.5,a.style.fontSize=`${this.fontSize}px`)}),i&&a&&i.addEventListener("click",()=>{this.fontSize>14&&(this.fontSize-=1.5,a.style.fontSize=`${this.fontSize}px`)});const n=document.getElementById("modal-audio-btn");n&&n.addEventListener("click",()=>{T.speakArticle(e)});const o=document.getElementById("modal-bookmark-btn");o&&o.addEventListener("click",()=>{const h=p.toggleBookmark(e);o.classList.toggle("bookmarked",h);const u=o.querySelector("svg");u&&u.setAttribute("fill",h?"currentColor":"none"),this.onBookmarkToggleCallback&&this.onBookmarkToggleCallback(e,h)});const r=document.getElementById("modal-copy-link-btn");r&&r.addEventListener("click",()=>{navigator.clipboard.writeText(e.link||window.location.href),r.textContent="Copied!",setTimeout(()=>{r.textContent="Copy Link"},2e3)});const l=document.getElementById("modal-whatsapp-btn");l&&l.addEventListener("click",async()=>{const h={title:e.title,text:e.snippet||e.title,url:e.link||window.location.href};try{if(navigator.share)await navigator.share(h);else{await navigator.clipboard.writeText(e.link||window.location.href);const u=l.innerHTML;l.textContent="Link Copied!",setTimeout(()=>{l.innerHTML=u},2e3)}}catch{}});const d=document.getElementById("modal-delete-user-article-btn");d&&d.addEventListener("click",()=>{confirm("Are you sure you want to unpublish this story from What's Going On?")&&(p.deleteCustomArticle(e.id),this.close(),window.location.reload())})}attachGlobalListeners(){window.addEventListener("keydown",t=>{t.key==="Escape"&&this.close()});const e=document.getElementById("article-reader-modal");e&&e.addEventListener("click",t=>{t.target===e&&this.close()})}}const I={apiKey:"AIzaSyDemoPlaceholderKeyForWhatsGoingOn",authDomain:"whats-going-on-news.firebaseapp.com",projectId:"whats-going-on-news",storageBucket:"whats-going-on-news.appspot.com",messagingSenderId:"123456789012",appId:"1:123456789012:web:abcdef123456"},b={CURRENT_USER:"wgo_auth_user_v1",REGISTERED_USERS:"wgo_registered_users_v1",BREAKING_ALERT:"wgo_breaking_alert_v1"},R=1440*60*1e3;function B(g){try{return btoa(encodeURIComponent(g+"_wgo_salt_2026"))}catch{return g}}function P(g,e){return B(g)===e}const x={e:"dhananjaysaini2006@gmail.com",h:B("242622")};class te{constructor(){this.currentUser=null,this.authListeners=[],this.isFirebaseLive=!1,this.firebaseApp=null,this.firebaseAuth=null,this.init()}async init(){this.loadSavedSession(),this.ensureAdminExists();try{if(I.apiKey&&!I.apiKey.includes("Placeholder")){const{initializeApp:e}=await C(async()=>{const{initializeApp:a}=await import("./index.esm-D_m3LDGF.js");return{initializeApp:a}},__vite__mapDeps([0,1])),{getAuth:t}=await C(async()=>{const{getAuth:a}=await import("./index.esm-8z07djW7.js");return{getAuth:a}},__vite__mapDeps([2,1]));this.firebaseApp=e(I),this.firebaseAuth=t(this.firebaseApp),this.isFirebaseLive=!0,console.info("Connected to live Firebase Cloud project.")}}catch{console.info("Using local Firebase Authentication adapter.")}}loadSavedSession(){try{const e=localStorage.getItem(b.CURRENT_USER);e&&(this.currentUser=JSON.parse(e))}catch{this.currentUser=null}}ensureAdminExists(){const e=this.getAllUsers();if(!e.some(a=>a.email.toLowerCase()===x.e.toLowerCase())){e.unshift({uid:"admin-ds-wgo",email:x.e,displayName:"Dhananjay Saini",role:"admin",passwordHash:x.h,createdAt:"2026-09-02T00:00:00.000Z"});try{localStorage.setItem(b.REGISTERED_USERS,JSON.stringify(e))}catch{}}}getAllUsers(){try{const e=localStorage.getItem(b.REGISTERED_USERS);return e?JSON.parse(e):[]}catch{return[]}}getCurrentUser(){return this.currentUser}isAdmin(){return this.currentUser&&(this.currentUser.role==="admin"||this.currentUser.email&&this.currentUser.email.toLowerCase()===x.e.toLowerCase())}onAuthStateChanged(e){return this.authListeners.push(e),e(this.currentUser),()=>{this.authListeners=this.authListeners.filter(t=>t!==e)}}notifyAuthChanged(){this.authListeners.forEach(e=>{try{e(this.currentUser)}catch(t){console.error("Error in auth listener:",t)}})}async signIn(e,t){const a=(e||"").trim().toLowerCase(),s=(t||"").trim();if(!a||!s)throw new Error("Please provide both email and password.");if(!a.includes("@"))throw new Error("Please enter a valid email address.");if(a===x.e.toLowerCase()){if(P(s,x.h))return this.currentUser={uid:"admin-ds-wgo",email:x.e,displayName:"Dhananjay Saini",role:"admin",photoURL:null},localStorage.setItem(b.CURRENT_USER,JSON.stringify(this.currentUser)),this.notifyAuthChanged(),this.currentUser;throw new Error("Incorrect password. Please try again.")}const n=this.getAllUsers().find(r=>r.email.toLowerCase()===a);if(!n)throw new Error("No account found with this email. Please sign up first.");if(!(n.passwordHash?P(s,n.passwordHash):n.passwordHash===s))throw new Error("Invalid password. Please try again.");return this.currentUser={uid:n.uid,email:n.email,displayName:n.displayName,role:n.role||"reader",photoURL:n.photoURL||null},localStorage.setItem(b.CURRENT_USER,JSON.stringify(this.currentUser)),this.notifyAuthChanged(),this.currentUser}async signUp(e,t,a=""){const s=(e||"").trim().toLowerCase(),i=(t||"").trim(),n=(a||"").trim()||s.split("@")[0];if(!s||!i)throw new Error("Please provide email and password.");if(!s.includes("@"))throw new Error("Please enter a valid email address.");if(i.length<8)throw new Error("Password must be at least 8 characters long.");const o=this.getAllUsers();if(o.some(l=>l.email.toLowerCase()===s))throw new Error("An account with this email already exists. Please sign in.");const r={uid:"user-"+Date.now(),email:s,displayName:n,role:"reader",passwordHash:B(i),createdAt:new Date().toISOString()};o.push(r);try{localStorage.setItem(b.REGISTERED_USERS,JSON.stringify(o))}catch(l){console.warn("Failed to save user",l)}return this.currentUser={uid:r.uid,email:r.email,displayName:r.displayName,role:r.role,photoURL:null},localStorage.setItem(b.CURRENT_USER,JSON.stringify(this.currentUser)),this.notifyAuthChanged(),this.currentUser}async signOut(){this.currentUser=null,localStorage.removeItem(b.CURRENT_USER),this.notifyAuthChanged()}getBreakingAlert(){try{const e=localStorage.getItem(b.BREAKING_ALERT);if(!e)return null;const t=JSON.parse(e);return t.timestamp&&Date.now()-new Date(t.timestamp).getTime()>R?(localStorage.removeItem(b.BREAKING_ALERT),null):t}catch{return null}}setBreakingAlert(e,t="high"){if(!this.isAdmin())throw new Error("Unauthorized. Only Admins can broadcast alerts.");const a={id:"alert-"+Date.now(),text:e,urgency:t,timestamp:new Date().toISOString(),author:this.currentUser.displayName,expiresAt:new Date(Date.now()+R).toISOString()};return localStorage.setItem(b.BREAKING_ALERT,JSON.stringify(a)),a}clearBreakingAlert(){if(!this.isAdmin())throw new Error("Unauthorized.");localStorage.removeItem(b.BREAKING_ALERT)}}const v=new te,U=Object.freeze(Object.defineProperty({__proto__:null,FIREBASE_CONFIG:I,firebaseService:v},Symbol.toStringTag,{value:"Module"}));class ie{constructor(e){this.onArticlePublishedCallback=e,this.modalEl=null,this.isOpen=!1,this.editingArticleId=null,this.presetImages=[{label:"🏛️ Parliament & Central Vista",url:"https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80"},{label:"⚖️ Supreme Court & Justice",url:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80"},{label:"🪙 Indian Rupee & RBI",url:"https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80"},{label:"🚀 ISRO Space Rocket",url:"https://images.unsplash.com/photo-1517976487508-59a5a0da23b2?w=1200&auto=format&fit=crop&q=80"},{label:"🤖 Semiconductors & AI",url:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80"},{label:"🌍 Global Summit & Diplomacy",url:"https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80"}],this.selectedImageUrl=this.presetImages[0].url}init(){this.injectModalHtml(),this.attachEventListeners()}injectModalHtml(){const e=document.getElementById("publish-studio-modal");e&&e.remove();const t=document.createElement("div");t.id="publish-studio-modal",t.className="publish-modal-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-hidden","true"),t.innerHTML=`
      <div class="publish-modal-container">
        <!-- Header -->
        <div class="publish-modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="badge badge-live" style="background: var(--hindu-navy); color: #fff;">EDITORIAL CMS</span>
            <h2 style="font-family: var(--font-serif); font-size: 1.55rem; color: var(--text-primary); margin: 0;">
              Publish News Story or Editorial
            </h2>
          </div>
          <button id="btn-close-publish-modal" class="btn-close-modal" title="Close Editorial Studio">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Form Body -->
        <form id="publish-studio-form" class="publish-modal-body">
          <!-- Headline -->
          <div class="publish-form-group">
            <label class="publish-label">Headline / Title *</label>
            <input type="text" id="pub-headline" class="publish-input" placeholder="e.g., Union Cabinet Approves Landmark Statutory Reforms for Infrastructure & Clean Energy" required />
          </div>

          <!-- Byline & Dateline Grid -->
          <div class="publish-form-grid-2">
            <div class="publish-form-group">
              <label class="publish-label">Author / Byline</label>
              <input type="text" id="pub-byline" class="publish-input" placeholder="e.g., What's Going On Bureau / Special Correspondent" value="What's Going On Editorial Desk" />
            </div>

            <div class="publish-form-group">
              <label class="publish-label">Dateline Prefix</label>
              <select id="pub-dateline" class="publish-select">
                <option value="NEW DELHI —">NEW DELHI —</option>
                <option value="MUMBAI —">MUMBAI —</option>
                <option value="BENGALURU —">BENGALURU —</option>
                <option value="CHENNAI —">CHENNAI —</option>
                <option value="KOLKATA —">KOLKATA —</option>
                <option value="WASHINGTON —">WASHINGTON —</option>
                <option value="LONDON —">LONDON —</option>
                <option value="GLOBAL WIRE —">GLOBAL WIRE —</option>
              </select>
            </div>
          </div>

          <!-- Category & Read Time -->
          <div class="publish-form-grid-2">
            <div class="publish-form-group">
              <label class="publish-label">Beat / Category *</label>
              <select id="pub-category" class="publish-select">
                <option value="${c.INDIA_POLITICS}">🏛️ Indian Politics & Governance</option>
                <option value="${c.INDIA}">🇮🇳 India National News</option>
                <option value="${c.WORLD}">🌍 World & Global Affairs</option>
                <option value="${c.BUSINESS}">📈 Business, Economy & Markets</option>
                <option value="${c.TECH}">🤖 Technology & AI</option>
                <option value="${c.SCIENCE}">🚀 Science & Space</option>
                <option value="opinion">✒️ Editorial & Opinion</option>
              </select>
            </div>

            <div class="publish-form-group">
              <label class="publish-label">Estimated Read Time</label>
              <input type="text" id="pub-readtime" class="publish-input" placeholder="e.g. 3 min read" value="3 min read" />
            </div>
          </div>

          <!-- Featured Image -->
          <div class="publish-form-group">
            <label class="publish-label">Featured Photojournalist Image</label>
            <div class="preset-photo-pills" id="pub-photo-presets">
              ${this.presetImages.map((a,s)=>`
                <button type="button" class="preset-photo-btn ${s===0?"active":""}" data-url="${a.url}">
                  ${a.label}
                </button>
              `).join("")}
            </div>
            <input type="url" id="pub-custom-image-url" class="publish-input" style="margin-top: 8px;" placeholder="Or paste custom image URL (https://...)" value="${this.presetImages[0].url}" />
            <div class="publish-image-preview-wrap" style="margin-top: 10px;">
              <img id="pub-image-preview" src="${this.presetImages[0].url}" alt="Preview" class="publish-image-preview" />
            </div>
          </div>

          <!-- Lead Excerpt -->
          <div class="publish-form-group">
            <label class="publish-label">Executive Lead Summary (1-2 sentences) *</label>
            <textarea id="pub-excerpt" class="publish-textarea" rows="2" placeholder="Brief summary displayed on front-page card..." required></textarea>
          </div>

          <!-- Full Article Content -->
          <div class="publish-form-group">
            <label class="publish-label">Full Article Story Narrative *</label>
            <textarea id="pub-content" class="publish-textarea" rows="7" placeholder="Write full news article or analysis story (paragraphs separated by blank lines)..." required></textarea>
          </div>

          <!-- Key Takeaways -->
          <div class="publish-form-group">
            <label class="publish-label">Core Takeaways (One per line)</label>
            <textarea id="pub-keypoints" class="publish-textarea" rows="3" placeholder="Key Point 1&#10;Key Point 2&#10;Key Point 3"></textarea>
          </div>

          <!-- Footer Actions -->
          <div class="publish-modal-footer">
            <button type="button" id="btn-cancel-publish" class="btn-cancel-modal">
              Cancel
            </button>
            <button type="submit" id="btn-submit-publish" class="btn-publish-submit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Publish to What's Going On</span>
            </button>
          </div>
        </form>
      </div>
    `,document.body.appendChild(t),this.modalEl=t}attachEventListeners(){if(!this.modalEl)return;const e=this.modalEl.querySelector("#btn-close-publish-modal"),t=this.modalEl.querySelector("#btn-cancel-publish");e&&e.addEventListener("click",()=>this.close()),t&&t.addEventListener("click",()=>this.close()),this.modalEl.addEventListener("click",o=>{o.target===this.modalEl&&this.close()}),window.addEventListener("keydown",o=>{o.key==="Escape"&&this.isOpen&&this.close()});const a=this.modalEl.querySelectorAll(".preset-photo-btn"),s=this.modalEl.querySelector("#pub-custom-image-url"),i=this.modalEl.querySelector("#pub-image-preview");a.forEach(o=>{o.addEventListener("click",()=>{a.forEach(l=>l.classList.remove("active")),o.classList.add("active");const r=o.getAttribute("data-url");this.selectedImageUrl=r,s&&(s.value=r),i&&(i.src=r)})}),s&&s.addEventListener("input",()=>{a.forEach(o=>o.classList.remove("active")),this.selectedImageUrl=s.value.trim(),i&&(i.src=this.selectedImageUrl)});const n=this.modalEl.querySelector("#publish-studio-form");n&&n.addEventListener("submit",o=>{o.preventDefault(),this.handleSubmit()})}open(e=null){if(!v.isAdmin()){alert("Access Restricted: Only the Admin (dhananjaysaini2006@gmail.com) has permission to write and publish news stories.");return}this.modalEl||this.injectModalHtml(),this.isOpen=!0,this.modalEl.classList.add("active"),this.modalEl.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden",e?(this.editingArticleId=e.id,this.modalEl.querySelector("#pub-headline").value=e.title||"",this.modalEl.querySelector("#pub-byline").value=e.source||"",this.modalEl.querySelector("#pub-category").value=e.category||c.INDIA_POLITICS,this.modalEl.querySelector("#pub-excerpt").value=e.snippet||"",this.modalEl.querySelector("#pub-content").value=e.content||"",this.modalEl.querySelector("#pub-custom-image-url").value=e.image||"",this.modalEl.querySelector("#pub-image-preview").src=e.image||"",e.keyPoints&&(this.modalEl.querySelector("#pub-keypoints").value=e.keyPoints.join(`
`))):this.editingArticleId=null}close(){this.modalEl&&(this.isOpen=!1,this.modalEl.classList.remove("active"),this.modalEl.setAttribute("aria-hidden","true"),document.body.style.overflow="")}handleSubmit(){const e=this.modalEl.querySelector("#pub-headline").value.trim(),t=this.modalEl.querySelector("#pub-byline").value.trim()||"What's Going On Editorial",a=this.modalEl.querySelector("#pub-dateline").value,s=this.modalEl.querySelector("#pub-category").value,i=this.modalEl.querySelector("#pub-readtime").value.trim()||"3 min read",n=this.selectedImageUrl||this.presetImages[0].url,o=this.modalEl.querySelector("#pub-excerpt").value.trim(),r=this.modalEl.querySelector("#pub-content").value.trim(),l=this.modalEl.querySelector("#pub-keypoints").value.trim(),d=l?l.split(`
`).map(u=>u.trim()).filter(Boolean):["Comprehensive on-the-ground intelligence and editorial assessment.","Analysis corroborated by verified primary sources and statutory records.","Implications reviewed by What's Going On editorial desk."],h={id:this.editingArticleId||"user-art-"+Date.now(),title:e,source:t,sourceId:"user-published",category:s,region:s===c.WORLD?"global":"india",isPolitics:s===c.INDIA_POLITICS||s===c.INDIA,isUserPublished:!0,link:"#user-story-"+Date.now(),image:n,pubDate:new Date().toISOString(),snippet:`${a} ${o}`,content:r,keyPoints:d,readTime:i};p.saveCustomArticle(h),this.close(),this.modalEl.querySelector("#publish-studio-form").reset(),this.onArticlePublishedCallback&&this.onArticlePublishedCallback(h)}}class ae{constructor(e){this.onAuthSuccessCallback=e,this.modalEl=null,this.isOpen=!1,this.currentTab="signin"}init(){this.injectModalHtml(),this.attachEventListeners()}injectModalHtml(){const e=document.getElementById("auth-modal-overlay");e&&e.remove();const t=document.createElement("div");t.id="auth-modal-overlay",t.className="auth-modal-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-hidden","true"),t.innerHTML=`
      <div class="auth-modal-container">
        <!-- Header -->
        <div class="auth-modal-header">
          <div>
            <span class="badge" style="background: var(--accent-emerald); color: #fff; font-size: 0.7rem; letter-spacing: 0.06em;">✓ SECURE SIGN IN</span>
            <h2 style="font-family: var(--font-serif); font-size: 1.45rem; color: var(--text-primary); margin: 4px 0 0;">
              What's Going On — Membership
            </h2>
          </div>
          <button id="btn-close-auth-modal" class="btn-close-modal" title="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Tab Toggle Bar -->
        <div class="auth-tabs">
          <button type="button" class="auth-tab-btn active" data-tab="signin" id="tab-auth-signin">
            Sign In
          </button>
          <button type="button" class="auth-tab-btn" data-tab="signup" id="tab-auth-signup">
            Create Reader Account
          </button>
        </div>

        <!-- Feedback Alert Box -->
        <div id="auth-alert-box" class="auth-alert" style="display: none;"></div>

        <!-- Form Body -->
        <form id="auth-form" class="auth-modal-body">
          <!-- Name Field (Sign Up Only) -->
          <div class="publish-form-group" id="group-auth-name" style="display: none;">
            <label class="publish-label">Full Name</label>
            <input type="text" id="auth-name" class="publish-input" placeholder="Your full name" />
          </div>

          <!-- Email Field -->
          <div class="publish-form-group">
            <label class="publish-label">Email Address *</label>
            <input type="email" id="auth-email" class="publish-input" placeholder="name@example.com" required />
          </div>

          <!-- Password Field -->
          <div class="publish-form-group">
            <label class="publish-label">Password *</label>
            <input type="password" id="auth-password" class="publish-input" placeholder="Min. 8 characters" required />
          </div>

          <!-- Submit Button -->
          <div style="margin-top: 10px;">
            <button type="submit" id="btn-auth-submit" class="btn-publish-submit" style="width: 100%; justify-content: center; padding: 12px;">
              <span id="auth-submit-text">Sign In to Newsroom</span>
            </button>
          </div>
        </form>

        <div class="auth-modal-footer-note">
          <span>Protected by Firebase Authentication & Secure Session Engine.</span>
        </div>
      </div>
    `,document.body.appendChild(t),this.modalEl=t}attachEventListeners(){if(!this.modalEl)return;const e=this.modalEl.querySelector("#btn-close-auth-modal");e&&e.addEventListener("click",()=>this.close()),this.modalEl.addEventListener("click",i=>{i.target===this.modalEl&&this.close()}),window.addEventListener("keydown",i=>{i.key==="Escape"&&this.isOpen&&this.close()});const t=this.modalEl.querySelector("#tab-auth-signin"),a=this.modalEl.querySelector("#tab-auth-signup");t&&t.addEventListener("click",()=>this.switchTab("signin")),a&&a.addEventListener("click",()=>this.switchTab("signup"));const s=this.modalEl.querySelector("#auth-form");s&&s.addEventListener("submit",i=>{i.preventDefault(),this.handleSubmit()})}switchTab(e){this.currentTab=e;const t=this.modalEl.querySelector("#tab-auth-signin"),a=this.modalEl.querySelector("#tab-auth-signup"),s=this.modalEl.querySelector("#group-auth-name"),i=this.modalEl.querySelector("#auth-submit-text"),n=this.modalEl.querySelector("#auth-alert-box");n&&(n.style.display="none"),e==="signin"?(t.classList.add("active"),a.classList.remove("active"),s.style.display="none",i.textContent="Sign In to Newsroom"):(a.classList.add("active"),t.classList.remove("active"),s.style.display="flex",i.textContent="Create Reader Account")}showAlert(e,t="error"){const a=this.modalEl.querySelector("#auth-alert-box");a&&(a.textContent=e,a.className=`auth-alert ${t}`,a.style.display="block")}open(e="signin"){this.modalEl||this.injectModalHtml(),this.isOpen=!0,this.modalEl.classList.add("active"),this.modalEl.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden",this.switchTab(e)}close(){this.modalEl&&(this.isOpen=!1,this.modalEl.classList.remove("active"),this.modalEl.setAttribute("aria-hidden","true"),document.body.style.overflow="")}async handleSubmit(){const e=this.modalEl.querySelector("#auth-email").value.trim(),t=this.modalEl.querySelector("#auth-password").value.trim(),a=this.modalEl.querySelector("#auth-name").value.trim(),s=this.modalEl.querySelector("#btn-auth-submit"),i=this.modalEl.querySelector("#auth-submit-text");s.disabled=!0,s.style.opacity="0.75",i&&(i.textContent=this.currentTab==="signin"?"Signing in...":"Creating account...");try{let n=null;this.currentTab==="signin"?n=await v.signIn(e,t):n=await v.signUp(e,t,a),this.showAlert(`Welcome, ${n.displayName||n.email}! ✓`,"success"),setTimeout(()=>{this.close(),this.onAuthSuccessCallback&&this.onAuthSuccessCallback(n)},600)}catch(n){this.showAlert(n.message||"Authentication failed. Please try again.","error")}finally{s.disabled=!1,s.style.opacity="1",i&&(i.textContent=this.currentTab==="signin"?"Sign In to Newsroom":"Create Reader Account")}}}class se{constructor(e,t){this.onArticleUpdatedCallback=e,this.onBreakingAlertCallback=t,this.modalEl=null,this.isOpen=!1,this.currentTab="articles",this.articlesList=[]}init(){this.injectModalHtml(),this.attachEventListeners()}injectModalHtml(){const e=document.getElementById("admin-panel-overlay");e&&e.remove();const t=document.createElement("div");t.id="admin-panel-overlay",t.className="admin-modal-overlay",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-hidden","true"),t.innerHTML=`
      <div class="admin-modal-container">
        <!-- Header -->
        <div class="admin-modal-header">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div class="admin-crown-badge">👑</div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h2 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--text-primary); margin: 0;">
                  Executive Admin Control Suite
                </h2>
                <span class="badge" style="background: var(--hindu-red); color: #fff; font-weight: 800; font-size: 0.7rem;">SUPER ADMIN</span>
              </div>
              <p style="margin: 3px 0 0; font-size: 0.8rem; color: var(--text-secondary);">
                Authenticated: <strong>Dhananjay Saini</strong> &nbsp;<span class="badge" style="background: var(--bg-tertiary); color: var(--text-muted); font-size: 0.65rem;">Super Admin</span>
              </p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <button id="btn-admin-signout" class="btn-cancel-modal" style="font-size: 0.8rem; padding: 6px 14px;">
              Sign Out
            </button>
            <button id="btn-close-admin-panel" class="btn-close-modal" title="Close Admin Panel">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="admin-tabs-bar">
          <button type="button" class="admin-tab-btn active" data-tab="articles" id="tab-admin-articles">
            📰 CMS & Articles
          </button>
          <button type="button" class="admin-tab-btn" data-tab="alerts" id="tab-admin-alerts">
            🚨 Breaking Alert Dispatcher
          </button>
          <button type="button" class="admin-tab-btn" data-tab="feeds" id="tab-admin-feeds">
            📡 Live Feeds & Wires (18+)
          </button>
          <button type="button" class="admin-tab-btn" data-tab="users" id="tab-admin-users">
            👥 Users & Analytics
          </button>
        </div>

        <!-- Admin Content Body -->
        <div class="admin-modal-body" id="admin-tab-content">
          <!-- Populated dynamically based on active tab -->
        </div>
      </div>
    `,document.body.appendChild(t),this.modalEl=t}attachEventListeners(){if(!this.modalEl)return;const e=this.modalEl.querySelector("#btn-close-admin-panel");e&&e.addEventListener("click",()=>this.close());const t=this.modalEl.querySelector("#btn-admin-signout");t&&t.addEventListener("click",async()=>{await v.signOut(),this.close(),window.location.reload()}),this.modalEl.addEventListener("click",s=>{s.target===this.modalEl&&this.close()}),window.addEventListener("keydown",s=>{s.key==="Escape"&&this.isOpen&&this.close()}),["articles","alerts","feeds","users"].forEach(s=>{const i=this.modalEl.querySelector(`#tab-admin-${s}`);i&&i.addEventListener("click",()=>this.switchTab(s))})}switchTab(e){this.currentTab=e,this.modalEl.querySelectorAll(".admin-tab-btn").forEach(s=>s.classList.toggle("active",s.getAttribute("data-tab")===e));const a=this.modalEl.querySelector("#admin-tab-content");a&&(e==="articles"?this.renderArticlesTab(a):e==="alerts"?this.renderAlertsTab(a):e==="feeds"?this.renderFeedsTab(a):e==="users"&&this.renderUsersTab(a))}open(e=[]){if(!v.isAdmin()){alert("Access Denied. This area is restricted to the Super Administrator only.");return}this.articlesList=e,this.modalEl||this.injectModalHtml(),this.isOpen=!0,this.modalEl.classList.add("active"),this.modalEl.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden",this.switchTab(this.currentTab)}close(){this.modalEl&&(this.isOpen=!1,this.modalEl.classList.remove("active"),this.modalEl.setAttribute("aria-hidden","true"),document.body.style.overflow="")}renderArticlesTab(e){const a=[...p.getCustomArticles(),...this.articlesList||[]];e.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin: 0;">
            Published Articles & Editorial Moderation
          </h3>
          <p style="margin: 3px 0 0; font-size: 0.825rem; color: var(--text-secondary);">
            Managing ${a.length} total news dispatches across all wires.
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <input type="text" id="admin-search-articles" class="publish-input" placeholder="Filter articles by title..." style="width: 240px; padding: 6px 12px; font-size: 0.85rem;" />
        </div>
      </div>

      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 45%;">Headline / Title</th>
              <th>Source / Author</th>
              <th>Category</th>
              <th>Published</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody id="admin-articles-tbody">
            ${a.slice(0,50).map(i=>`
              <tr data-id="${i.id}">
                <td>
                  <div style="font-weight: 700; color: var(--text-primary); line-height: 1.3;">
                    ${i.isUserPublished?'<span class="badge-user-editorial" style="margin-right: 6px;">AUTHOR</span>':""}
                    ${i.title}
                  </div>
                </td>
                <td>
                  <span class="badge" style="background: var(--bg-tertiary); color: var(--text-secondary); font-size: 0.75rem;">
                    ${i.source}
                  </span>
                </td>
                <td>
                  <span style="font-size: 0.775rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">
                    ${i.category}
                  </span>
                </td>
                <td style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
                  ${new Date(i.pubDate).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}
                </td>
                <td style="text-align: right;">
                  ${i.isUserPublished?`
                    <button class="btn-admin-action btn-admin-delete" data-del-id="${i.id}" title="Delete story">
                      🗑️ Unpublish
                    </button>
                  `:`
                    <span style="font-size: 0.725rem; color: var(--text-muted);">Wire Feed</span>
                  `}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;const s=e.querySelector("#admin-search-articles");s&&s.addEventListener("input",i=>{const n=i.target.value.toLowerCase().trim();e.querySelectorAll("#admin-articles-tbody tr").forEach(r=>{const l=r.textContent.toLowerCase();r.style.display=l.includes(n)?"":"none"})}),e.querySelectorAll(".btn-admin-delete").forEach(i=>{i.addEventListener("click",n=>{const o=n.target.getAttribute("data-del-id");confirm("Admin Action: Unpublish this story from What's Going On?")&&(p.deleteCustomArticle(o),this.switchTab("articles"),this.onArticleUpdatedCallback&&this.onArticleUpdatedCallback())})})}renderAlertsTab(e){const t=v.getBreakingAlert();e.innerHTML=`
      <div style="max-width: 650px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary); margin: 0;">
            Broadcast Urgent Breaking News Wire Alert
          </h3>
          <p style="margin: 4px 0 0; font-size: 0.85rem; color: var(--text-secondary);">
            Dispatches a high-priority red alert ticker across all reader screens in real time.
          </p>
        </div>

        ${t?`
          <div class="admin-active-alert-box">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span class="badge" style="background: var(--hindu-red); color: #fff;">● ACTIVE LIVE BROADCAST</span>
              <button id="btn-clear-alert" class="btn-cancel-modal" style="color: var(--hindu-red); border-color: var(--hindu-red); font-size: 0.775rem; padding: 4px 10px;">
                Revoke Alert
              </button>
            </div>
            <p style="margin: 0; font-weight: 700; font-size: 1rem; color: var(--text-primary);">
              "${t.text}"
            </p>
            <div style="margin-top: 8px; font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">
              Dispatched by ${t.author} at ${new Date(t.timestamp).toLocaleTimeString("en-IN")}
            </div>
          </div>
        `:""}

        <form id="admin-broadcast-form" style="display: flex; flex-direction: column; gap: 14px;">
          <div class="publish-form-group">
            <label class="publish-label">Urgent Alert Headline / Bullet</label>
            <textarea id="admin-alert-text" class="publish-textarea" rows="3" placeholder="e.g., BREAKING: Prime Minister addresses Parliament; new statutory bills introduced for national digital infrastructure..." required></textarea>
          </div>

          <div class="publish-form-group">
            <label class="publish-label">Urgency Priority</label>
            <select id="admin-alert-urgency" class="publish-select">
              <option value="breaking">🔴 High Urgency (Flashing Red Live Ticker)</option>
              <option value="bulletin">🟡 Editorial Flash Bulletin</option>
            </select>
          </div>

          <button type="submit" class="btn-publish-submit" style="background: var(--hindu-red); justify-content: center; padding: 12px;">
            📢 Broadcast Breaking Alert to Portal
          </button>
        </form>
      </div>
    `;const a=e.querySelector("#admin-broadcast-form");a&&a.addEventListener("submit",i=>{i.preventDefault();const n=e.querySelector("#admin-alert-text").value.trim(),o=e.querySelector("#admin-alert-urgency").value,r=v.setBreakingAlert(n,o);alert("Breaking Alert has been broadcast live to all readers!"),this.switchTab("alerts"),this.onBreakingAlertCallback&&this.onBreakingAlertCallback(r)});const s=e.querySelector("#btn-clear-alert");s&&s.addEventListener("click",()=>{v.clearBreakingAlert(),alert("Active breaking alert has been revoked."),this.switchTab("alerts"),this.onBreakingAlertCallback&&this.onBreakingAlertCallback(null)})}renderFeedsTab(e){e.innerHTML=`
      <div style="margin-bottom: 16px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin: 0;">
          Connected Media Wires & RSS Feed Health Monitor
        </h3>
        <p style="margin: 3px 0 0; font-size: 0.825rem; color: var(--text-secondary);">
          All feeds are automatically polled every 3 minutes via the local zero-cache proxy.
        </p>
      </div>

      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Outlet / Wire</th>
              <th>Beat / Category</th>
              <th>Status</th>
              <th>Endpoint / RSS URL</th>
            </tr>
          </thead>
          <tbody>
            ${A.map(t=>`
              <tr>
                <td style="font-weight: 700; color: var(--text-primary);">
                  <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${t.color||"#003366"}; margin-right: 8px;"></span>
                  ${t.name}
                </td>
                <td>
                  <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">
                    ${t.category}
                  </span>
                </td>
                <td>
                  <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); font-weight: 700; font-size: 0.725rem;">
                    ● 200 OK (Live)
                  </span>
                </td>
                <td style="font-family: var(--font-mono); font-size: 0.725rem; color: var(--text-muted); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                  ${t.rssUrl}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `}renderUsersTab(e){const t=v.getAllUsers(),a=p.getCustomArticles(),s=p.getBookmarks();e.innerHTML=`
      <div class="admin-stats-grid" style="margin-bottom: 24px;">
        <div class="admin-stat-card">
          <div class="admin-stat-val">${this.articlesList.length+a.length}</div>
          <div class="admin-stat-lbl">Aggregated Articles</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-val" style="color: var(--accent-cyan);">${a.length}</div>
          <div class="admin-stat-lbl">User Published Stories</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-val" style="color: var(--hindu-red);">${t.length}</div>
          <div class="admin-stat-lbl">Registered Accounts</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-val" style="color: var(--accent-emerald);">${s.length}</div>
          <div class="admin-stat-lbl">Saved Bookmarks</div>
        </div>
      </div>

      <div style="margin-bottom: 14px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--text-primary); margin: 0;">
          Registered Newsroom Users & Author Roster
        </h3>
      </div>

      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email Address</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(i=>`
              <tr>
                <td style="font-weight: 700; color: var(--text-primary);">
                  ${i.displayName||"Reader"}
                </td>
                <td style="font-family: var(--font-mono); font-size: 0.825rem; color: var(--text-secondary);">
                  ${i.email}
                </td>
                <td>
                  <span class="badge" style="background: ${i.role==="admin"?"var(--hindu-red)":"var(--bg-tertiary)"}; color: ${i.role==="admin"?"#fff":"var(--text-secondary)"}; font-size: 0.725rem; font-weight: 800;">
                    ${(i.role||"reader").toUpperCase()}
                  </span>
                </td>
                <td>
                  <span style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 600;">
                    ● Active
                  </span>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `}}class ne{constructor(){this.articles=[],this.currentCategory=c.ALL,this.searchQuery="",this.selectedSource="all",this.isLoading=!1,this.header=null,this.ticker=null,this.newsGrid=null,this.currentAffairs=null,this.modal=null,this.publishModal=null,this.authModal=null,this.adminPanel=null}async init(){this.applyTheme(p.getTheme()),this.initComponents(),this.renderCategoryNavigation(),await this.fetchNews(!1),this.initBackToTop()}applyTheme(e){document.documentElement.setAttribute("data-theme",e),p.setTheme(e);const t=document.getElementById("theme-icon-sun");t&&(e==="light"?t.innerHTML='<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>':t.innerHTML=`
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `)}toggleTheme(){const t=p.getTheme()==="dark"?"light":"dark";this.applyTheme(t)}initComponents(){this.authModal=new ae(i=>{this.showToast(`✨ Welcome to What's Going On, ${i.displayName||i.email}!`,"success")}),this.authModal.init(),this.adminPanel=new se(()=>{this.renderActiveView(),this.showToast("Article moderation updated.","info")},i=>{this.handleBreakingAlert(i)}),this.adminPanel.init(),this.publishModal=new ie(i=>{this.articles=[i,...this.articles.filter(n=>n.id!==i.id)],this.ticker.render(this.articles),this.renderActiveView(),window.scrollTo({top:0,behavior:"smooth"}),this.showToast("🎉 Your article has been published live to What's Going On!","success")}),this.publishModal.init(),this.header=new Y(i=>this.fetchNews(i),i=>this.handleSearch(i),()=>this.toggleTheme(),i=>this.handleIntervalChange(i),()=>this.publishModal.open(),i=>this.authModal.open(i),()=>this.adminPanel.open(this.articles)),this.header.init(),v.onAuthStateChanged(i=>{this.header.updateUserAuthState(i)});const e=v.getBreakingAlert();e&&this.handleBreakingAlert(e),this.modal=new ee((i,n)=>{this.header.updateBookmarkBadge()}),this.ticker=new Q(i=>{this.modal.open(i)}),this.newsGrid=new X(i=>this.modal.open(i),(i,n)=>{this.header.updateBookmarkBadge(),this.currentCategory===c.SAVED&&this.renderActiveView()}),this.currentAffairs=new Z;const t=document.getElementById("btn-bookmarks-view");t&&t.addEventListener("click",()=>{this.setCategory(c.SAVED)});const a=document.getElementById("btn-view-grid"),s=document.getElementById("btn-view-list");a&&s&&(a.addEventListener("click",()=>{a.classList.add("active"),s.classList.remove("active"),this.newsGrid.setViewMode("grid"),this.renderActiveView()}),s.addEventListener("click",()=>{s.classList.add("active"),a.classList.remove("active"),this.newsGrid.setViewMode("compact"),this.renderActiveView()}))}renderCategoryNavigation(){const e=document.getElementById("category-tabs-nav"),t=document.getElementById("select-source-filter"),a=[{id:c.ALL,label:"⚡ All News (Front Page)"},{id:c.INDIA_POLITICS,label:"🏛️ Indian Politics & Governance"},{id:c.INDIA,label:"🇮🇳 India Media Wires"},{id:c.WORLD,label:"🌍 Global News Wires"},{id:c.BUSINESS,label:"📊 Market Indices & Economy"},{id:c.GOOGLE_NEWS,label:"🌐 Google News"},{id:c.CURRENT_AFFAIRS,label:"⭐ Current Affairs Hub",highlight:!0},{id:c.TECH,label:"🤖 Tech & AI"},{id:c.SCIENCE,label:"🚀 Science & Defense"},{id:c.SAVED,label:"🔖 Saved Stories"}];e&&(e.innerHTML=a.map(s=>`
        <button class="cat-tab ${s.id===this.currentCategory?"active":""} ${s.highlight?"highlight-ca":""}" data-category="${s.id}">
          ${s.label}
        </button>
      `).join(""),e.addEventListener("click",s=>{const i=s.target.closest(".cat-tab");if(i){const n=i.getAttribute("data-category");this.setCategory(n)}})),t&&(t.innerHTML=`
        <option value="all">All Outlets & Wires</option>
        <optgroup label="Indian Politics & National Wires">
          ${A.filter(s=>s.region==="india").map(s=>`<option value="${s.id}">${s.name}</option>`).join("")}
        </optgroup>
        <optgroup label="Global News Wires & International">
          ${A.filter(s=>s.region==="global").map(s=>`<option value="${s.id}">${s.name}</option>`).join("")}
        </optgroup>
      `,t.addEventListener("change",s=>{this.selectedSource=s.target.value,this.renderActiveView()}))}setCategory(e){this.currentCategory=e,this.searchQuery="";const t=document.getElementById("global-search-input");t&&(t.value=""),document.querySelectorAll(".cat-tab").forEach(s=>{s.classList.toggle("active",s.getAttribute("data-category")===e)}),this.renderActiveView(),window.scrollTo({top:0,behavior:"smooth"})}handleSearch(e){this.searchQuery=e.toLowerCase(),this.renderActiveView()}handleIntervalChange(e){this.showToast(`Auto-update set to every ${Math.round(e/60)} minute(s)`,"info")}initBackToTop(){const e=document.createElement("button");e.id="btn-back-to-top",e.title="Back to top",e.setAttribute("aria-label","Back to top"),e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>',document.body.appendChild(e),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),window.addEventListener("scroll",()=>{window.scrollY>400?e.classList.add("visible"):e.classList.remove("visible")},{passive:!0})}handleBreakingAlert(e){const t=document.getElementById("admin-breaking-alert-banner");if(t&&t.remove(),!e)return;const a=document.createElement("div");a.id="admin-breaking-alert-banner",a.style.cssText=`
      background: linear-gradient(90deg, #990000 0%, #cc0000 100%);
      color: #ffffff;
      padding: 10px 20px;
      font-size: 0.85rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      box-shadow: 0 4px 12px rgba(153, 0, 0, 0.25);
      position: sticky;
      top: 0;
      z-index: 999;
      text-align: center;
    `,a.innerHTML=`
      <span style="background: #ffffff; color: #990000; padding: 2px 8px; border-radius: 2px; font-size: 0.725rem; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase;">
        🔴 BREAKING BROADCAST
      </span>
      <span>${e.text}</span>
      <button id="btn-close-alert-banner" style="background: none; border: none; color: #fff; cursor: pointer; opacity: 0.8; font-size: 1.1rem; padding: 0 4px;" title="Dismiss banner">&times;</button>
    `,document.body.prepend(a);const s=a.querySelector("#btn-close-alert-banner");s&&s.addEventListener("click",()=>a.remove())}async fetchNews(e=!1){if(this.isLoading)return;this.isLoading=!0;const t=document.getElementById("btn-header-refresh");t&&t.classList.add("spinning"),e||this.renderLoadingSkeleton();try{const a=await j.fetchAllFeeds();if(this.articles=a,p.setCachedArticles(this.articles),this.ticker.render(this.articles),this.renderActiveView(),this.header&&this.header.updateLastSyncTime(new Date),e){const s=new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});this.showToast(`🔄 Auto-refreshed: ${this.articles.length} news stories synchronized at ${s}`,"success")}}catch(a){console.error("Error fetching feeds:",a),this.showToast("Notice: Using synchronized offline intelligence feeds.","info")}finally{this.isLoading=!1,t&&setTimeout(()=>t.classList.remove("spinning"),700)}}renderLoadingSkeleton(){const e=document.getElementById("main-news-feed");e&&(e.innerHTML=`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div class="skeleton" style="height: 380px; width: 100%; border-radius: var(--radius-lg);"></div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
          <div class="skeleton" style="height: 280px; border-radius: var(--radius-md);"></div>
          <div class="skeleton" style="height: 280px; border-radius: var(--radius-md);"></div>
          <div class="skeleton" style="height: 280px; border-radius: var(--radius-md);"></div>
        </div>
      </div>
    `)}renderActiveView(){const e=document.getElementById("main-news-feed");e&&(e.classList.add("fading"),setTimeout(()=>{e.classList.remove("fading"),this._doRenderActiveView()},150))}_doRenderActiveView(){if(this.currentCategory===c.CURRENT_AFFAIRS){this.currentAffairs.render();return}let e=[...this.articles];this.currentCategory===c.SAVED?e=p.getBookmarks():this.currentCategory!==c.ALL&&(e=e.filter(t=>t.category===this.currentCategory)),this.selectedSource!=="all"&&(e=e.filter(t=>t.sourceId===this.selectedSource)),this.searchQuery&&(e=e.filter(t=>t.title&&t.title.toLowerCase().includes(this.searchQuery)||t.snippet&&t.snippet.toLowerCase().includes(this.searchQuery)||t.source&&t.source.toLowerCase().includes(this.searchQuery))),this.newsGrid.render(e,{category:this.currentCategory,searchQuery:this.searchQuery,sourceFilter:this.selectedSource})}showToast(e,t="info"){let a=document.getElementById("toast-container");a||(a=document.createElement("div"),a.id="toast-container",document.body.appendChild(a));const s=t==="success"?'<polyline points="20 6 9 17 4 12"></polyline>':t==="error"?'<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>':'<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',i=document.createElement("div");i.className=`toast toast-${t}`,i.innerHTML=`
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        ${s}
      </svg>
      <span>${e}</span>
    `,a.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateY(10px)",i.style.transition="all 0.3s ease",setTimeout(()=>i.remove(),300)},4e3)}}document.addEventListener("DOMContentLoaded",()=>{new ne().init()});
