import fs from "node:fs";
import path from "node:path";
import PptxGenJS from "../../outputs/reference_2/careeros_cover_test/node_modules/pptxgenjs/dist/pptxgen.es.js";

const root = path.resolve("../..");
const outDir = path.resolve(".");
const shotDir = path.join(root, "outputs", "careeros-deck", "screenshots");
const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "CareerOS";
pptx.company = "CareerOS";
pptx.subject = "Asynchronous product pitch";
pptx.title = "CareerOS — AI-Powered Career Operating System";
pptx.lang = "en-US";
pptx.theme = { headFontFace: "Aptos Display", bodyFontFace: "Aptos", lang: "en-US" };
pptx.defineSlideMaster({
  title: "CLEAN",
  background: { color: "F8FAFD" },
  objects: [
    { line: { x: 0.48, y: 0.32, w: 0, h: 0.22, line: { color: "1267D6", width: 3 } } },
    { text: { text: "CAREEROS", options: { x: 0.63, y: 0.25, w: 1.45, h: 0.22, fontSize: 10, bold: true, charSpacing: 2.3, color: "0A1F44", margin: 0 } } },
    { text: { text: "STUDENT   EMPLOYER   UNIVERSITY", options: { x: 9.35, y: 0.27, w: 3.45, h: 0.18, fontSize: 7.5, color: "70809B", align: "right", charSpacing: 0.7, margin: 0 } } },
    { line: { x: 0.52, y: 7.18, w: 12.25, h: 0, line: { color: "DDE5EF", width: 0.7 } } },
  ],
  slideNumber: { x: 12.62, y: 7.22, w: 0.25, h: 0.12, color: "8290A6", fontSize: 7, align: "right", margin: 0 },
});

const C = { navy:"081A3A", blue:"1267D6", mid:"4B7FD8", ice:"EAF3FF", cyan:"54B7FF", gray:"64748B", pale:"DDE5EF", white:"FFFFFF", ink:"152238", lavender:"EEF0FF", green:"16856A", amber:"B26B16" };
const slides = [
  { sec:"THE SHARED FAILURE", title:"Career potential is lost when evidence and action arrive too late.", sub:"CareerOS connects student evidence, employer demand, and university action so gaps can be addressed earlier.", kind:"cover" },
  { sec:"THE SHARED FAILURE", title:"The same evidence gap appears as uncertainty, recruiting waste, and late institutional action.", cols:[["STUDENT","Chris, a Year 3 Data Science student, has real projects but weak proof of what they demonstrate—or what to do next."],["EMPLOYER","A recruiter needs talent now, while prior challenge participants and screening context have gone cold."],["UNIVERSITY","A programme team sees an MLOps or readiness gap while the current cohort cannot wait for a curriculum cycle."]], conclusion:"Different symptoms. One structural failure: useful signals are fragmented, weakly evidenced, and remembered too late." },
  { sec:"THE SHARED FAILURE", title:"Existing tools optimise transactions, not continuity.", flow:["Student activity","Resume claim","Employer event","Attendance list","Hiring feedback","Inbox / ATS","Outcome report"], conclusion:"CareerOS preserves the context between transactions—it does not try to replace every system." },
  { sec:"OPERATING MODEL", title:"CareerOS turns fragmented signals into a shared sequence of decisions.", flow:["SIGNAL","EVIDENCE","DECISION","ACTION","OUTCOME","LEARNING"], labels:["Project · challenge · demand","Source · recency · context","Gap · shortlist · priority","Practise · apply · intervene","Progress · hiring · completion","Improve the next decision"], conclusion:"The prototype demonstrates each workspace; a live cross-organisation learning network remains future-facing." },
  { sec:"STUDENT", title:"Career Memory turns “I did this” into “Here is what it proves—and what is missing.”", shot:"student-memory.png", persona:"Chris Lee · Year 3 · Bachelor of Data Science · Taylor’s University", points:["Preserve projects, internships, leadership and achievements.","Connect each experience to skills and supporting evidence.","Expose missing proof instead of hiding uncertainty."], impact:"Behaviour change: maintain reusable evidence continuously—not only when applying.", status:"DEMONSTRATED UI · EXTRACTION / VERIFICATION PARTIAL" },
  { sec:"STUDENT", title:"The Data Science degree becomes a starting signal—not a career boundary.", shot:"student-intelligence.png", points:["Interpret existing evidence against possible paths.","Reveal adjacent roles and transferable evidence.","Prioritise the next missing skill or proof."], impact:"Career browsing becomes one evidence-building next step.", status:"DEMONSTRATED INTERACTION · PATHS AND RECOMMENDATIONS ILLUSTRATIVE" },
  { sec:"STUDENT", title:"Guidance only creates value when it ends in an action.", shot:"student-opportunities.png", points:["Explain why an opportunity fits—and what is missing.","Save, prepare or apply from the same context.","Preserve the application stage and next action."], impact:"Advice becomes a visible commitment and follow-up state.", status:"DEMONSTRATED LOCAL WORKFLOW · NO LIVE JOB MARKETPLACE" },
  { sec:"STUDENT", title:"Ask from intent, then practise the moment that matters.", shot:"student-companion.png", cols:[["COMPANION","Interprets intent and routes the student to relevant CareerOS context."],["PRACTICE","Creates repeatable interview preparation around a role and company."]], conclusion:"The student moves from uncertainty to a specific preparation task without learning the product’s information architecture.", status:"DEMONSTRATED UI · OPTIONAL / SIMULATED AI · SCORING NOT VALIDATED" },
  { sec:"STUDENT", title:"CareerOS gives students reasons to return between applications.", shot:"student-community.png", points:["Community normalises rejection, doubt and skill gaps.","Mentorship or learning offers targeted support.","New activity can become future Career Memory evidence."], impact:"Support and evidence-building continue between vacancies.", status:"LOCAL COMMUNITY DEMONSTRATED · COMPOUNDING LOOP FUTURE" },
  { sec:"EMPLOYER", title:"Employers need evidence and history—not another candidate database.", flow:["HIRING NEED","EVIDENCE-BACKED DISCOVERY","TARGETED VALIDATION","DECISION HISTORY","REUSABLE PIPELINE"], conclusion:"Ask what supports fit and what must be validated—not merely whether a CV looks right.", status:"CURRENT CANDIDATES, SCORES AND HISTORIES ARE DEMO DATA" },
  { sec:"EMPLOYER", title:"A match should explain the evidence—and the uncertainty.", shot:"employer-discovery.png", points:["Start from a specific hiring need.","Surface candidates with contextual evidence.","Expose strengths, gaps and a validation question."], impact:"Shortlist with an explicit rationale and validation plan.", status:"SIMULATED MATCHING AND CANDIDATE DATA · FAIRNESS NOT VALIDATED" },
  { sec:"EMPLOYER", title:"A candidate profile becomes a decision brief, not a digital CV.", shot:"employer-candidates.png", points:["Compare fit evidence, source and recency.","See what is strong, missing or still uncertain.","Carry the rationale into the next hiring step."], impact:"Review becomes faster to explain and easier to challenge.", status:"DEMONSTRATED UI · DATA AND SCORES ILLUSTRATIVE" },
  { sec:"EMPLOYER", title:"Every engagement can become reusable talent intelligence.", shot:"employer-pipeline.png", points:["Preserve challenge, event and screening history.","Move candidates through an explicit pipeline.","Re-engage warm talent instead of restarting sourcing."], impact:"Relationships compound across hiring moments.", status:"DEMONSTRATED LOCAL PIPELINE · LIVE CRM / ATS INTEGRATION FUTURE" },
  { sec:"UNIVERSITY", title:"Universities need signals early enough to change the current cohort’s trajectory.", cols:[["READINESS","Which students or programmes need attention now?"],["MARKET ALIGNMENT","Where are employer expectations moving faster than curriculum?"],["EVIDENCE","Can interventions, partnerships and accreditation proof be reused?"]], conclusion:"CareerOS converts fragmented outcomes into governed intervention workflows.", status:"INSTITUTIONAL METRICS AND CASES ARE DEMO DATA" },
  { sec:"UNIVERSITY", title:"Readiness insight should trigger an intervention—not another report.", shot:"university-readiness.png", points:["Identify programme and cohort gaps.","Trace the signal to affected students or skills.","Assign and track a targeted intervention."], impact:"Act while the cohort can still benefit.", status:"DEMONSTRATED UI · READINESS SIGNALS ILLUSTRATIVE" },
  { sec:"UNIVERSITY", title:"Curriculum-market alignment becomes a living prioritisation workflow.", shot:"university-curriculum.png", points:["Compare curriculum coverage with demand signals.","See where gaps are emerging by programme.","Prioritise a response without claiming predictive certainty."], impact:"Programme teams can discuss one evidenced priority sooner.", status:"DEMONSTRATED UI · MARKET SIGNALS AND ANALYSIS SIMULATED" },
  { sec:"UNIVERSITY", title:"Alumni and collaboration signals can shorten the distance from insight to partnership.", shots:["university-alumni.png","university-collaboration.png"], points:["Use alumni outcomes as directional evidence.","Translate an identified gap into a collaboration brief.","Preserve partner context for future decisions."], impact:"Partnership development starts from an explicit capability need.", status:"DEMONSTRATED UI · NETWORK EFFECTS FUTURE" },
  { sec:"UNIVERSITY", title:"Accreditation evidence should be assembled continuously—not reconstructed under deadline.", shot:"university-accreditation.png", points:["Organise outcomes, activities and supporting artefacts.","Link evidence to standards and review tasks.","Keep progress and ownership visible."], impact:"Institutional memory becomes reusable and auditable.", status:"DEMONSTRATED WORKSPACE · FORMAL SUBMISSION INTEGRATIONS FUTURE" },
  { sec:"UNIVERSITY", title:"The AI Office turns signals into governed institutional action.", shot:"university-ai-office.png", points:["Coordinate cross-department operating rooms.","Align decisions with university priorities.","Track intervention ownership, progress and evidence."], impact:"AI supports decision preparation; humans retain governance.", status:"DEMONSTRATED UI · AI RECOMMENDATIONS AND OPERATIONS SIMULATED" },
  { sec:"CONNECTED SYSTEM", title:"Three workspaces create one compounding evidence loop.", flow:["STUDENT EVIDENCE","EMPLOYER VALIDATION","UNIVERSITY INTERVENTION","NEW ACTIVITY","STRONGER EVIDENCE"], conclusion:"CareerOS is more than a portal or dashboard because each decision can preserve context for the next stakeholder.", status:"SELECTED HANDOFFS DEMONSTRATED · SHARED NETWORK FUTURE" },
  { sec:"PRODUCT TRUTH", title:"The prototype is broad; its intelligence and network effects are not yet proven.", cols:[["DEMONSTRATED","Three workspaces\nEditable interactions\nLocal workflows\nRich prototype states"],["SIMULATED / PARTIAL","Candidate and market data\nRecommendations and scoring\nOptional model responses\nSelected backend paths"],["FUTURE-FACING","Live integrations\nCross-organisation memory\nValidated accuracy / fairness\nProduction governance"]], conclusion:"No adoption, customers, partnerships, measured outcomes, ROI or AI accuracy are claimed." },
  { sec:"TALENTBANK", title:"CareerOS could extend Talentbank from moments of engagement into a lifecycle of evidence and action.", cols:[["STUDENT VALUE","More continuous reasons to engage, prepare and build proof."],["EMPLOYER VALUE","Richer context before and after hiring campaigns or events."],["UNIVERSITY VALUE","A workflow layer for readiness, collaboration and evidence reuse."]], conclusion:"Strategic value is a hypothesis: it depends on consent, trust, integrations, buyer demand and operational ownership.", status:"STRATEGIC FIT TO VALIDATE · NOT AN EXISTING PARTNERSHIP" },
  { sec:"NEXT-STAGE VALIDATION", title:"The next step is to prove one consented evidence-to-action loop.", flow:["DEFINE PILOT","CONNECT MINIMUM DATA","RUN ONE LOOP","MEASURE BEHAVIOUR","REVIEW TRUST"], labels:["One cohort · role · programme","Only required evidence","Signal to intervention","Action and follow-through","Consent · fairness · governance"], conclusion:"Validate workflow value before scaling intelligence, integrations or network claims." },
  { sec:"CLOSING", title:"Remember the signal. Act before potential is lost.", sub:"CareerOS is an evidence-memory and action layer connecting students, employers and universities.", cols:[["WHAT EXISTS","A polished, editable multi-workspace prototype."],["WHAT IT TESTS","Whether preserved context improves the next decision."],["WHAT COMES NEXT","A bounded pilot with consent, measurable behaviours and explicit governance."]], conclusion:"CareerOS — AI-powered career operating system" },
];

function text(slide, value, x, y, w, h, size=18, color=C.ink, opts={}) {
  slide.addText(value, { x,y,w,h,fontFace:opts.fontFace||"Aptos",fontSize:size,color,bold:!!opts.bold,margin:0,breakLine:false,fit:"shrink",valign:opts.valign||"mid",align:opts.align||"left",charSpacing:opts.charSpacing||0,bullet:opts.bullet,paraSpaceAfterPt:opts.paraSpaceAfterPt||0 });
}
function box(slide,x,y,w,h,fill=C.white,line=C.pale,r=0.12) {
  slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:r,fill:{color:fill},line:{color:line,width:0.8},shadow:{type:"outer",color:"9AAAC0",blur:1.5,angle:45,distance:0.7,opacity:0.10}});
}
function header(slide,d,i) {
  text(slide,d.sec,0.63,0.67,3.2,0.20,8.5,C.blue,{bold:true,charSpacing:1.6});
  text(slide,d.title,0.63,0.95,11.75,0.78,d.kind==="cover"?34:26,C.navy,{bold:true});
  if(d.sub) text(slide,d.sub,0.66,d.kind==="cover"?2.05:1.78,d.kind==="cover"?5.35:10.6,d.kind==="cover"?0.78:0.45,d.kind==="cover"?15.5:14,C.gray);
  text(slide,String(i+1).padStart(2,"0"),12.34,0.69,0.42,0.18,8,C.blue,{bold:true,align:"right"});
}
function status(slide,s) {
  if(!s) return;
  slide.addShape(pptx.ShapeType.roundRect,{x:0.64,y:6.64,w:6.2,h:0.30,rectRadius:0.14,fill:{color:C.ice},line:{color:"C7DCF7",width:0.6}});
  text(slide,s,0.82,6.70,5.85,0.12,7.6,C.blue,{bold:true,charSpacing:0.5});
}
function imageFrame(slide,name,x=7.72,y=2.03,w=4.75,h=3.35) {
  box(slide,x-0.12,y-0.12,w+0.24,h+0.24,C.white,"D8E3F1");
  slide.addImage({path:path.join(shotDir,name),x,y,w,h,sizing:"contain"});
}
function columns(slide,cols,y=2.32) {
  const n=cols.length, gap=0.26, w=(12.06-gap*(n-1))/n;
  cols.forEach((c,j)=>{const x=0.64+j*(w+gap);box(slide,x,y,w,2.55,j===1&&n===3?"F1F6FF":C.white);text(slide,String(j+1).padStart(2,"0"),x+0.25,y+0.24,0.5,0.28,13,C.blue,{bold:true});text(slide,c[0],x+0.25,y+0.66,w-0.5,0.34,11,C.navy,{bold:true,charSpacing:0.8});text(slide,c[1],x+0.25,y+1.18,w-0.5,1.0,13,C.gray,{valign:"top"});});
}
function flow(slide,items,labels,y=2.55) {
  const gap=0.16,w=(12.05-gap*(items.length-1))/items.length;
  items.forEach((it,j)=>{const x=0.64+j*(w+gap);slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h:0.72,rectRadius:0.13,fill:{color:j%2?C.ice:C.white},line:{color:j===0?C.blue:C.pale,width:j===0?1.4:0.8}});text(slide,it,x+0.12,y+0.21,w-0.24,0.22,9.5,C.navy,{bold:true,align:"center"});if(labels?.[j])text(slide,labels[j],x+0.04,y+0.92,w-0.08,0.42,8.2,C.gray,{align:"center",valign:"top"});if(j<items.length-1)text(slide,"→",x+w+0.01,y+0.23,gap-0.02,0.2,12,C.blue,{bold:true,align:"center"});});
}
function bullets(slide,pts,x=0.72,y=2.35,w=6.35) {
  pts.forEach((p,j)=>{slide.addShape(pptx.ShapeType.ellipse,{x,y:y+j*0.83,w:0.28,h:0.28,fill:{color:j===0?C.blue:C.ice},line:{color:j===0?C.blue:"BDD7F7",width:0.6}});text(slide,String(j+1),x,y+j*0.83+0.07,0.28,0.10,7,j===0?C.white:C.blue,{bold:true,align:"center"});text(slide,p,x+0.46,y+j*0.83-0.02,w-0.46,0.42,13.2,C.ink,{valign:"top"});});
}
function conclusion(slide,s,y=5.52) {
  if(!s) return;
  slide.addShape(pptx.ShapeType.line,{x:0.65,y,w:0.62,h:0,line:{color:C.blue,width:2.4}});
  text(slide,s,1.45,y-0.15,10.9,0.52,14.2,C.navy,{bold:true});
}
function sources(slide,d) {
  const assets=[d.shot,...(d.shots||[])].filter(Boolean).map(x=>`- Product screenshot: outputs/careeros-deck/screenshots/${x}`);
  slide.addNotes(`[Sources]\n- CareerOS deck production blueprint: docs/pitch/CAREEROS_DECK_PRODUCTION_BLUEPRINT.md\n- CareerOS local prototype and repository documentation\n${assets.join("\n")}`);
}

slides.forEach((d,i)=>{
  const slide=pptx.addSlide("CLEAN"); header(slide,d,i);
  if(d.kind==="cover"){
    slide.addImage({path:path.join(outDir,"assets","careeros-core.png"),x:6.55,y:1.32,w:6.55,h:5.55,sizing:"contain"});
    slide.addShape(pptx.ShapeType.roundRect,{x:0.66,y:3.12,w:2.18,h:0.38,rectRadius:0.15,fill:{color:C.blue},line:{color:C.blue}});
    text(slide,"AI-POWERED CAREER OS",0.88,3.22,1.75,0.12,8,C.white,{bold:true,charSpacing:0.7});
    text(slide,"Student evidence",0.67,4.13,1.65,0.25,11,C.navy,{bold:true});
    text(slide,"Employer demand",2.54,4.13,1.75,0.25,11,C.navy,{bold:true});
    text(slide,"University action",4.48,4.13,1.75,0.25,11,C.navy,{bold:true});
    text(slide,"DEMONSTRATED PROTOTYPE  ·  SIMULATED INTELLIGENCE AND DATA",0.67,5.18,5.45,0.26,8,C.blue,{bold:true,charSpacing:0.55});
    text(slide,"Talentbank AI Hackathon · July 2026",0.67,6.42,3.2,0.22,9,C.gray);
    slide.addNotes("[Sources]\n- CareerOS deck production blueprint: docs/pitch/CAREEROS_DECK_PRODUCTION_BLUEPRINT.md\n- Hero visual: OpenAI ImageGen, generated 2026-07-25 from user-supplied visual direction");
    return;
  }
  if(d.shot){
    if(d.cols) {
      d.cols.forEach((c,j)=>{const y=2.18+j*1.25;box(slide,0.70,y,5.95,0.98,j===0?C.ice:C.white);text(slide,c[0],0.96,y+0.17,1.18,0.20,9,C.blue,{bold:true,charSpacing:0.8});text(slide,c[1],2.18,y+0.13,4.15,0.48,12.2,C.ink,{valign:"top"});});
    } else bullets(slide,d.points||[],0.72,d.persona?2.63:2.35,6.25);
    if(d.persona){slide.addShape(pptx.ShapeType.roundRect,{x:0.68,y:1.92,w:5.95,h:0.42,rectRadius:0.15,fill:{color:C.ice},line:{color:"C7DCF7",width:0.6}});text(slide,d.persona,0.91,2.04,5.45,0.16,9.5,C.blue,{bold:true});}
    imageFrame(slide,d.shot,7.72,2.05,4.72,3.16);
    conclusion(slide,d.impact||d.conclusion,5.72);
  } else if(d.shots){
    bullets(slide,d.points||[],0.72,2.35,5.55);
    imageFrame(slide,d.shots[0],6.73,2.08,2.76,2.85);
    imageFrame(slide,d.shots[1],9.75,2.08,2.76,2.85);
    conclusion(slide,d.impact||d.conclusion,5.55);
  } else if(d.cols){
    columns(slide,d.cols,2.15);
    conclusion(slide,d.conclusion,5.35);
  } else if(d.flow){
    flow(slide,d.flow,d.labels,2.48);
    conclusion(slide,d.conclusion,5.34);
  }
  status(slide,d.status); sources(slide,d);
});

fs.mkdirSync(outDir,{recursive:true});
await pptx.writeFile({fileName:path.join(outDir,"CareerOS_Clean_Blue_Redesign.pptx")});
console.log(path.join(outDir,"CareerOS_Clean_Blue_Redesign.pptx"));
