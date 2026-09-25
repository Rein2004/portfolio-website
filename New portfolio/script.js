// ---- tool logo loop (home) ----
if(document.getElementById('trackA')){
(function(){
  const BASE='https://reinoldleonida.vercel.app/Logos/';
  const N=[['n8n','n8n'],['Zapier','zapier'],['GoHighLevel','ghl'],['ChatGPT','chatgpt'],['Claude','claude'],['Funnelish','funnelish'],['systeme.io','systeme'],['Notion','notion'],['HubSpot','hubspot'],['Trello','trello'],['Asana','asana'],['Slack','slack'],['Discord','discord']];
  function build(id,seed,amp,rot){
    const set=N.map(([n,f],i)=>{const k=i+seed;
      return `<div class="tile" style="--r:${(Math.sin(k*1.9)*rot).toFixed(1)}deg;--y:${Math.round(Math.sin(k*1.1)*amp)}px"><img src="${BASE}${f}.jfif" alt="${n}" decoding="async"></div>`;}).join('');
    const clone=set.replace(/<div class="tile"/g,'<div aria-hidden="true" class="tile"').replace(/alt="[^"]*"/g,'alt=""');
    document.getElementById(id).innerHTML=set+clone+clone+clone;
  }
  build('trackA',0,32,8); build('trackB',5,6,3);
})();
}

// ---- project page ----
if(document.getElementById('pgrid')){
const IMGS={};
const projects=[
 {name:"GHL Funnel System",img:IMGS.GHLfunnel,cat:"GHL · Online Business",problem:"Businesses need a connected customer journey instead of separate pages and manual steps.",solution:"Opt-in, checkout, upsell and thank-you pages built as one connected funnel.",tools:"GoHighLevel",flow:"Opt-in → Checkout → Upsell → Thank You"},
 {name:"GHL Funnel Workflow Automation",img:IMGS.aicontent,cat:"GHL · Online Business",problem:"Customer actions and follow-ups required repetitive manual work.",solution:"Automated workflow triggered by customer actions, order events and funnel movement.",tools:"GoHighLevel",flow:"Customer action → Trigger → Automation → Follow-up → Funnel stage"},
 {name:"GHL AI Support Agent",img:IMGS.Aiagent,cat:"AI · Online Education",problem:"Repetitive customer questions were consuming support time.",solution:"AI agent with a knowledge base that answers, guides, or escalates and captures leads.",tools:"GoHighLevel AI Agent",flow:"User question → AI Agent → Knowledge Base → Answer / Escalation → Lead Capture"},
 {name:"VitaCore E-commerce Funnel, CRM & Automation",img:IMGS.VitaCore,cat:"Funnelish · E-commerce/Wellness",problem:"E-commerce needed a structured funnel and organized customer data.",solution:"Landing pages, multiple checkout offers, CRM and automation, integrated with Shopify.",tools:"Funnelish, Shopify",flow:"Landing Page → Checkout → Offer/Upsell → CRM → Automation → Customer"},
 {name:"Zenbodi E-commerce Funnel Build",img:IMGS.Zenbodi,cat:"Funnelish · E-commerce",problem:"Needed a structured, conversion-focused product funnel.",solution:"Advertorial landing page, checkout page and full funnel structure.",tools:"Funnelish",flow:"Advertorial → Product Offer → Checkout → Conversion"},
 {name:"AI Content Automation",cat:"n8n / AI · Content Marketing",problem:"Creating social content required many repetitive manual steps.",solution:"AI workflow covering strategy, captions, hashtags, visuals and publishing.",tools:"n8n, Tally, AI, Instagram",flow:"Tally Request → AI Strategist → Creative Direction → Visual Generation → Instagram"},
 {name:"Sales & Follow-Up Automation",cat:"n8n / AI · Sales",problem:"Manually tracking leads and follow-ups caused missed opportunities.",solution:"Automated lead tracking and follow-up workflow with notifications.",tools:"n8n, AI, Google Sheets, Gmail, Telegram",flow:"Lead/Webhook → AI Processing → Google Sheets → Follow-Up → Telegram → Status Update"},
 {name:"Weekly Sales Reporting & Order Management",cat:"n8n · E-commerce Ops",problem:"Collecting sales data and reports manually took time.",solution:"Automated collection, order organization and weekly report generation.",tools:"n8n, APIs",flow:"Sales Data → Automation → Organize Orders → Generate Report"},
 {name:"Automated File Organization & Notifications",cat:"Zapier · Client Management",problem:"Manually organizing files and notifying the team was repetitive.",solution:"Automated file organization, task creation and notifications.",tools:"Zapier, Google Sheets, Drive, Trello",flow:"New File → Google Sheets → Google Drive → Trello Task → Email Notification"}
];
const IMGF=['GHLfunnel','ghlmika','Aiagent','VitaCore','Zenbodi','aicontent','Leadfollowup','weeklysalesreport','clientonboarding'];
const grid=document.getElementById('pgrid');
projects.forEach((p,i)=>{
  const img=IMGF[i]?`<img src="https://reinoldleonida.vercel.app/${IMGF[i]}.png" alt="${p.name} preview" loading="lazy">`:'';
  grid.insertAdjacentHTML('beforeend',`<article class="pcard reveal">${img}<div class="pbody"><div class="cat">${p.cat}</div><h3>${p.name}</h3><div><strong>The challenge</strong><p>${p.problem}</p></div><div><strong>The system</strong><p>${p.solution}</p></div><div><strong>Tools</strong><p>${p.tools}</p></div><div class="workflow">${p.flow}</div></div></article>`);
});
}

// nav shrink
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled', window.scrollY>20);});

// scroll reveal
const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in'); io.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ---- 3D background ----
(function(){
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('bg3d');
  if(reduced || typeof THREE==='undefined'){ if(canvas) canvas.style.display='none'; return; }

  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050a14, 0.045);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.set(0,0,14);

  // particle field — nodes of a network
  const COUNT = window.innerWidth<700 ? 260 : 520;
  const positions = new Float32Array(COUNT*3);
  for(let i=0;i<COUNT;i++){
    positions[i*3]   = (Math.random()-0.5)*36;
    positions[i*3+1] = (Math.random()-0.5)*22;
    positions[i*3+2] = (Math.random()-0.5)*30 - 4;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  const mat = new THREE.PointsMaterial({color:0x00d0f5, size:0.055, transparent:true, opacity:0.85, blending:THREE.AdditiveBlending, depthWrite:false});
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // connecting lines between nearby points (sparse, for a "network" feel)
  const linePos = [];
  for(let i=0;i<COUNT;i+=1){
    for(let j=i+1;j<Math.min(i+6,COUNT);j++){
      const dx=positions[i*3]-positions[j*3], dy=positions[i*3+1]-positions[j*3+1], dz=positions[i*3+2]-positions[j*3+2];
      if(dx*dx+dy*dy+dz*dz < 12){
        linePos.push(positions[i*3],positions[i*3+1],positions[i*3+2], positions[j*3],positions[j*3+1],positions[j*3+2]);
      }
    }
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePos),3));
  const lineMat = new THREE.LineBasicMaterial({color:0x3b82f6, transparent:true, opacity:0.12});
  scene.add(new THREE.LineSegments(lineGeo, lineMat));

  // slow-rotating wireframe icosahedron as a focal "system core"
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.2, 1),
    new THREE.MeshBasicMaterial({color:0x00d0f5, wireframe:true, transparent:true, opacity:0.18})
  );
  core.position.set(4.5, -1, -6);
  scene.add(core);

  let mouseX=0, mouseY=0;
  window.addEventListener('mousemove', e=>{
    mouseX = (e.clientX/window.innerWidth - 0.5);
    mouseY = (e.clientY/window.innerHeight - 0.5);
  });

  window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate(){
    requestAnimationFrame(animate);
    points.rotation.y += 0.0009;
    points.rotation.x += 0.0002;
    core.rotation.y += 0.0025;
    core.rotation.x += 0.0012;
    camera.position.x += (mouseX*2 - camera.position.x)*0.02;
    camera.position.y += (-mouseY*1.2 - camera.position.y)*0.02;
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  }
  animate();
})();