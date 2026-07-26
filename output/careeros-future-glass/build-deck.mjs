import path from "node:path";
import PptxGenJS from "../../outputs/reference_2/careeros_cover_test/node_modules/pptxgenjs/dist/pptxgen.es.js";

const here = path.resolve(".");
const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "CareerOS";
pptx.title = "CareerOS — The Evidence Memory and Action Layer";
pptx.subject = "Asynchronous CareerOS pitch";
pptx.company = "CareerOS";
pptx.lang = "en-US";
pptx.theme = { headFontFace: "Aptos Display", bodyFontFace: "Aptos", lang: "en-US" };

const C = { bg:"071126", navy:"0A1733", blue:"3A8DFF", cyan:"54E2FF", violet:"8A6CFF", white:"FFFFFF", pale:"C9D8F3", muted:"93A8CB", glass:"172B50", line:"5E83C3", green:"61E5BB", red:"FF7996" };
const data = [
  {type:"hero", chapter:"CAREEROS", title:"The career operating system that turns potential into evidence—and evidence into action.", sub:"Connecting students, employers and universities before opportunities, talent and interventions are lost.", bg:"core.png"},
  {type:"toc", chapter:"THE JOURNEY", title:"Four chapters. One evidence-to-action story.", chapters:[["01","THE BREAKDOWN","Why today’s career ecosystem fails"],["02","EVERY STAKEHOLDER","Student, employer and university transformation"],["03","THE COMPOUNDING ECOSYSTEM","How one signal creates value across the network"],["04","THE ROAD AHEAD","Future vision, technology and closing"]]},
  {type:"timeline", chapter:"01 — THE BREAKDOWN", title:"Today’s tools solve transactions—not the journey.", items:["EDUCATION","PROJECTS","EVENTS","APPLICATIONS","INTERVIEWS","EMPLOYMENT"], note:"Each system sees one moment. None of them remembers the full journey.", bg:"breakdown.png"},
  {type:"pains", chapter:"02A — CANDIDATE", title:"Students do not lack potential. They lack proof, direction and timely feedback.", items:[["01","EXPERIENCE ≠ PROOF","Projects, activities and internships are scattered. Students struggle to explain what those experiences demonstrate."],["02","THE GAP APPEARS AFTER REJECTION","No diagnosis reveals whether the issue was skill, evidence, communication or career fit."],["03","THE DEGREE BECOMES A BOUNDARY","Students see only obvious roles and assume changing direction means starting again."]], note:"The result: random learning, mass applications and loss of confidence."},
  {type:"lifecycle", chapter:"02A — CANDIDATE", title:"CareerOS gives every student a living career intelligence system.", steps:[["REMEMBER","Career Memory"],["EXPLORE","Career Graph"],["BUILD","Gap-to-Action"],["PRACTISE","Interview Practice"],["APPLY","Opportunity Intelligence"],["IMPROVE","AI Companion"]], note:"One connected journey turns uncertainty into a ranked next action."},
  {type:"beforeafter", chapter:"02A — CANDIDATE", title:"From career anxiety to visible progress.", rows:[["“I do not know what my experience proves.”","“I have evidence of what I can do.”"],["“My degree limits my options.”","“I can see adjacent paths and bridge skills.”"],["“I keep applying without knowing what is wrong.”","“I know which weakness to improve next.”"],["“A rejection makes me stop.”","“A rejection becomes a diagnosable next step.”"]], note:"Useful before, during and after the job application."},
  {type:"pains", chapter:"02B — EMPLOYER", title:"Employers keep paying to rediscover talent they have already seen.", items:[["01","EVERY VACANCY BECOMES A COLD SEARCH","Urgent roles reopen job boards and restart screening from zero."],["02","PROMISING TALENT DISAPPEARS","Event, challenge and interview context decays inside spreadsheets and inboxes."],["03","CV CLAIMS LOOK IDENTICAL","Recruiters cannot see what was demonstrated—or what still requires validation."]], note:"The result: slower hiring, repeated acquisition cost and low confidence."},
  {type:"lifecycle", chapter:"02B — EMPLOYER", title:"CareerOS turns every talent interaction into reusable hiring intelligence.", steps:[["ENGAGE","Challenges & workshops"],["OBSERVE","Applied ability"],["REMEMBER","Campus pipeline"],["VALIDATE","Explainable profile"],["REACTIVATE","Warm candidates"],["HIRE","Action queue"]], note:"The employer product is a memory loop—not candidate browsing."},
  {type:"impacts", chapter:"02B — EMPLOYER", title:"Stop recruiting from zero.", items:[["01","FASTER ACCESS TO CREDIBLE TALENT","Begin with people and evidence already known to the organisation."],["02","HIGHER-CONFIDENCE SCREENING","See why a candidate fits and the exact questions still requiring validation."],["03","MORE VALUABLE CAMPUS INVESTMENT","Challenges and workshops create observable signals—not only attendance."]], note:"Every recruitment process becomes an asset for the next one."},
  {type:"pains", chapter:"02C — UNIVERSITY", title:"Universities are accountable for outcomes—but see the warning signs too late.", items:[["01","GOOD GRADES CAN HIDE CAREER RISK","Academic performance may coexist with weak exposure, evidence and employability activity."],["02","MARKET DEMAND MOVES FASTER","The current cohort cannot wait for the next curriculum approval cycle."],["03","EVIDENCE CANNOT BE ASSEMBLED","Readiness, alumni and partnership proof stays fragmented until a deadline."]], note:"The result: responsibility without the operational capacity to act early."},
  {type:"lifecycle", chapter:"02C — UNIVERSITY", title:"CareerOS turns graduate employability into a continuous operating process.", steps:[["DETECT","Student readiness"],["PRIORITISE","Market alignment"],["ASSIGN","Named ownership"],["INTERVENE","Current-cohort action"],["MEASURE","Outcome signals"],["REUSE","Accreditation evidence"]], note:"The AI Office prepares decisions while humans retain authority."},
  {type:"impacts", chapter:"02C — UNIVERSITY", title:"Act before the gap becomes a graduate outcome.", items:[["01","EARLIER INTERVENTION","Identify employability risk before it appears in destination reports."],["02","HELP THE CURRENT COHORT NOW","Launch targeted interventions while formal curriculum reform continues."],["03","CLEAR OWNERSHIP","Convert recommendations into named actions, deadlines and follow-through."],["04","CONTINUOUS READINESS","Reuse operational evidence across accreditation and internal review."]], note:"Move from reporting what happened to managing what happens next."},
  {type:"ecosystem", chapter:"03 — THE COMPOUNDING ECOSYSTEM", title:"One signal creates value across the entire ecosystem.", bg:"ecosystem.png", steps:["University detects a cloud-skill gap","Employer launches a targeted challenge","Students demonstrate applied ability","Results become Career Memory evidence","Employers shortlist high-signal talent","University measures and reuses outcomes"], note:"CareerOS connects the evidence required by the next decision."},
  {type:"stakeholders", chapter:"03 — THE COMPOUNDING ECOSYSTEM", title:"The ecosystem becomes more valuable every time it is used.", items:[["STUDENTS","Experiences accumulate into a portable career story."],["EMPLOYERS","Events and decisions accumulate into warm talent history."],["UNIVERSITIES","Interventions and outcomes accumulate into institutional intelligence."],["TALENTBANK","The relationship can extend beyond one listing or application cycle."]], note:"Transactions disappear. Relationships and evidence remain.", qualifier:"STRATEGIC COMPOUNDING MODEL · NOT YET MEASURED"},
  {type:"future", chapter:"04 — THE ROAD AHEAD", title:"From career platform to national talent intelligence infrastructure.", bg:"future.png", stages:[["TODAY","CONNECTED WORKSPACES","Student, employer and university workflows with shared product logic."],["NEXT","VERIFIED EVIDENCE NETWORK","Permissioned evidence, provenance, integrations and outcome tracking."],["FUTURE","HUMAN-GOVERNED INTELLIGENCE","AI monitors signals and prepares interventions while people retain authority."]], note:"The advantage is trusted longitudinal context—not simply a larger model."},
  {type:"stack", chapter:"04 — THE ROAD AHEAD", title:"Built as a modular, AI-ready ecosystem.", layers:[["EXPERIENCE","React · Vite · Tailwind CSS","Role-based student, employer and university workspaces"],["INTELLIGENCE","LLM interaction patterns","Contextual recommendations and specialist routing"],["WORKFLOW","State · handoffs · controls","Evidence handoffs, interventions and decision controls"],["BACKEND","FastAPI services","Extensible API architecture"]], note:"Current prototype: rich frontend workflows, local simulations, optional model calls and a partial backend."},
  {type:"closing", chapter:"CAREEROS", title:"Potential should not be lost because the system remembered too late.", sub:"CareerOS preserves what students can do, helps employers recognise who to trust, and enables universities to act before gaps become outcomes.", note:"Remember the signal. Prove it. Act earlier.", bg:"core.png"}
];

function tx(slide,s,x,y,w,h,size=18,color=C.white,o={}) {
  slide.addText(s,{x,y,w,h,fontFace:o.fontFace||"Aptos",fontSize:size,color,bold:!!o.bold,margin:0,fit:"shrink",valign:o.valign||"mid",align:o.align||"left",charSpacing:o.charSpacing||0,breakLine:false});
}
function glass(slide,x,y,w,h,trans=48,accent=false) {
  slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:0.12,fill:{color:accent?"254B86":C.glass,transparency:trans},line:{color:accent?C.cyan:C.line,transparency:accent?35:60,width:0.9},shadow:{type:"outer",color:"000000",blur:2,angle:45,distance:1,opacity:0.22}});
}
function bg(slide,name) {
  slide.background={color:C.bg};
  if(name) slide.addImage({path:path.join(here,"assets",name),x:0,y:0,w:13.333,h:7.5});
  slide.addShape(pptx.ShapeType.rect,{x:0,y:0,w:13.333,h:7.5,fill:{color:C.bg,transparency:name?25:0},line:{color:C.bg,transparency:100}});
}
function head(slide,d,i) {
  tx(slide,"CAREEROS",0.55,0.28,1.6,0.2,8.5,C.white,{bold:true,charSpacing:2.6});
  tx(slide,d.chapter,0.56,0.67,4.4,0.23,9,C.cyan,{bold:true,charSpacing:1.6});
  tx(slide,String(i+1).padStart(2,"0"),12.35,0.31,0.42,0.18,8,C.muted,{bold:true,align:"right"});
  slide.addShape(pptx.ShapeType.line,{x:0.55,y:7.12,w:12.25,h:0,line:{color:C.line,transparency:70,width:0.7}});
}
function title(slide,d,y=1.02,w=12.1,size=29) { tx(slide,d.title,0.56,y,w,0.78,size,C.white,{bold:true}); }
function note(slide,s,y=6.20) {
  if(!s)return;
  slide.addShape(pptx.ShapeType.line,{x:0.58,y:y+0.16,w:0.58,h:0,line:{color:C.cyan,width:2}});
  tx(slide,s,1.38,y,11.1,0.35,13.5,C.white,{bold:true});
}
function notes(slide,d) {
  slide.addNotes(`[Sources]\n- User-provided revised pitch flow: C:/Users/kinst/.codex/attachments/c3f6ac2b-f1ce-4127-a245-60a59527fce1/pasted-text.txt\n- CareerOS repository documentation and product analysis\n${d.bg?`- Generated visual: output/careeros-future-glass/assets/${d.bg}`:""}`);
}
function cards(slide,items,y=2.18,cols=3) {
  const gap=.25,w=(12.18-gap*(cols-1))/cols;
  items.forEach((it,j)=>{const x=.57+(j%cols)*(w+gap),yy=y+Math.floor(j/cols)*1.74;glass(slide,x,yy,w,1.44,52,j===0);tx(slide,it[0],x+.24,yy+.17,.5,.22,10,j===0?C.cyan:C.violet,{bold:true});tx(slide,it[1],x+.24,yy+.47,w-.48,.28,11,C.white,{bold:true,charSpacing:.5});tx(slide,it[2],x+.24,yy+.83,w-.48,.45,12,C.pale,{valign:"top"});});
}

data.forEach((d,i)=>{
  const slide=pptx.addSlide(); bg(slide,d.bg); head(slide,d,i);
  if(d.type==="hero"){
    tx(slide,"CareerOS",0.62,1.28,3.2,.55,34,C.white,{bold:true});
    tx(slide,d.title,0.62,2.08,6.1,1.5,30,C.white,{bold:true});
    tx(slide,d.sub,0.65,4.02,5.65,.72,15,C.pale);
    glass(slide,.64,5.25,4.95,.48,55,true);tx(slide,"STUDENTS  ·  EMPLOYERS  ·  UNIVERSITIES",.91,5.39,4.42,.15,9,C.cyan,{bold:true,charSpacing:.9});
  } else if(d.type==="toc"){
    title(slide,d);
    d.chapters.forEach((c,j)=>{const x=.62+(j%2)*6.14,y=2.10+Math.floor(j/2)*2.12;glass(slide,x,y,5.86,1.72,54,j===0);tx(slide,c[0],x+.25,y+.23,.65,.26,12,C.cyan,{bold:true});tx(slide,c[1],x+1.05,y+.21,4.42,.28,15,C.white,{bold:true});tx(slide,c[2],x+1.05,y+.75,4.35,.42,13,C.pale,{valign:"top"});});
  } else if(d.type==="timeline"){
    title(slide,d);
    slide.addShape(pptx.ShapeType.line,{x:.85,y:3.72,w:11.55,h:0,line:{color:C.cyan,transparency:35,width:1.5,dash:"dash"}});
    d.items.forEach((s,j)=>{const x=.65+j*2.02;slide.addShape(pptx.ShapeType.ellipse,{x:x+.47,y:3.48,w:.48,h:.48,fill:{color:j%2?C.violet:C.blue,transparency:15},line:{color:C.cyan,transparency:35,width:.8}});tx(slide,s,x,4.17,1.42,.25,9,C.white,{bold:true,align:"center",charSpacing:.5});});
    note(slide,d.note);
  } else if(d.type==="pains"||d.type==="impacts"){
    title(slide,d); cards(slide,d.items,2.22,d.items.length===4?2:3); note(slide,d.note,d.items.length===4?6.28:5.95);
  } else if(d.type==="lifecycle"){
    title(slide,d);
    d.steps.forEach((s,j)=>{const x=.62+j*2.06;glass(slide,x,2.55,1.80,2.10,54,j===0);tx(slide,String(j+1).padStart(2,"0"),x+.18,2.77,.42,.22,10,C.cyan,{bold:true});tx(slide,s[0],x+.18,3.20,1.44,.25,10,C.white,{bold:true,charSpacing:.6});tx(slide,s[1],x+.18,3.76,1.44,.48,12,C.pale,{bold:true,valign:"top"});if(j<5)tx(slide,"›",x+1.85,3.30,.20,.30,18,C.cyan,{bold:true,align:"center"});});
    note(slide,d.note,5.65);
  } else if(d.type==="beforeafter"){
    title(slide,d);
    tx(slide,"BEFORE CAREEROS",.72,2.04,4.95,.25,10,C.red,{bold:true,charSpacing:1});tx(slide,"WITH CAREEROS",6.91,2.04,4.95,.25,10,C.green,{bold:true,charSpacing:1});
    d.rows.forEach((r,j)=>{const y=2.48+j*.82;glass(slide,.62,y,5.65,.61,58);glass(slide,6.82,y,5.88,.61,50,j===0);tx(slide,r[0],.88,y+.16,5.12,.22,12,C.pale);tx(slide,r[1],7.10,y+.16,5.34,.22,12,C.white,{bold:true});});
    note(slide,d.note,6.05);
  } else if(d.type==="ecosystem"){
    title(slide,d,1.00,7.5,28);
    d.steps.forEach((s,j)=>{const x=.67+(j%2)*3.65,y=2.10+Math.floor(j/2)*1.17;glass(slide,x,y,3.35,.88,54,j===0);tx(slide,String(j+1).padStart(2,"0"),x+.20,y+.24,.42,.18,9,C.cyan,{bold:true});tx(slide,s,x+.74,y+.14,2.35,.44,11.5,C.white,{bold:true,valign:"top"});});
    note(slide,d.note,6.23);
  } else if(d.type==="stakeholders"){
    title(slide,d);
    d.items.forEach((it,j)=>{const x=.62+(j%2)*6.15,y=2.12+Math.floor(j/2)*1.75;glass(slide,x,y,5.85,1.40,52,j===0);tx(slide,it[0],x+.25,y+.25,1.55,.24,11,j===0?C.cyan:C.violet,{bold:true,charSpacing:.7});tx(slide,it[1],x+1.72,y+.22,3.72,.52,13,C.white,{bold:true,valign:"top"});});
    note(slide,d.note,5.92);tx(slide,d.qualifier,.66,6.55,5.7,.2,8,C.cyan,{bold:true,charSpacing:.7});
  } else if(d.type==="future"){
    title(slide,d,1.00,8.1,28);
    d.stages.forEach((s,j)=>{const x=.65+j*4.10;glass(slide,x,2.42,3.78,2.26,52,j===0);tx(slide,s[0],x+.23,2.68,.85,.22,10,C.cyan,{bold:true});tx(slide,s[1],x+.23,3.17,3.10,.48,13,C.white,{bold:true});tx(slide,s[2],x+.23,3.87,3.20,.52,11.5,C.pale,{valign:"top"});});
    note(slide,d.note,5.78);
  } else if(d.type==="stack"){
    title(slide,d);
    d.layers.forEach((l,j)=>{const y=2.02+j*.94;glass(slide,.67,y,12.0,.73,54,j===0);tx(slide,l[0],.92,y+.22,1.40,.20,10,C.cyan,{bold:true,charSpacing:.7});tx(slide,l[1],2.58,y+.18,3.12,.25,13,C.white,{bold:true});tx(slide,l[2],6.04,y+.17,6.1,.30,12,C.pale);});
    note(slide,d.note,6.18);
  } else if(d.type==="closing"){
    tx(slide,d.title,.65,1.45,7.6,1.25,36,C.white,{bold:true});
    tx(slide,d.sub,.68,3.18,6.30,.98,16,C.pale);
    glass(slide,.68,4.78,5.55,.78,51,true);tx(slide,d.note,.98,5.01,4.96,.28,18,C.white,{bold:true});
    tx(slide,"The evidence memory and action layer between education and employment.",.68,6.35,5.72,.28,10,C.cyan,{bold:true});
  }
  notes(slide,d);
});

await pptx.writeFile({fileName:path.join(here,"CareerOS_Future_Glass_Pitch.pptx")});
console.log(path.join(here,"CareerOS_Future_Glass_Pitch.pptx"));
