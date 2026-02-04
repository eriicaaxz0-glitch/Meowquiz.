 let score = 0;
let round = 0;
let current = 0;
let questions = [];
let currentRoundName = "";
let cats = [
` /\\_/\\
( o.o )
 > ^ < `,
` (=^.^=)
   (   )
    ~~~`,
` /\\_/\  
( -.- )
 > ^ < `,
` /\\_/\  
( o_o )
 > ^ < `
];

// ---------- QUESTIONS ----------
const EASY = [
    {q:"Which continent has the most countries?", A:"Asia", B:"Africa", C:"Europe", D:"South America", a:"B"},
    {q:"Water boils at what temperature (°C)?", A:"90", B:"95", C:"100", D:"110", a:"C"},
    {q:"Which organ uses the most oxygen?", A:"Heart", B:"Brain", C:"Lungs", D:"Muscles", a:"B"},
    {q:"Which planet is closest to the Sun?", A:"Venus", B:"Earth", C:"Mercury", D:"Mars", a:"C"},
    {q:"Which shape has 5 sides?", A:"Square", B:"Hexagon", C:"Pentagon", D:"Triangle", a:"C"}
];

const MID = [
    {q:"Which country has the largest population?", A:"India", B:"USA", C:"China", D:"Russia", a:"C"},
    {q:"What does DNA stand for?", A:"Dynamic Network Acid", B:"Deoxyribonucleic Acid", C:"Digital Node Array", D:"Double Nitrogen Atom", a:"B"},
    {q:"Which ocean is the deepest?", A:"Atlantic", B:"Indian", C:"Pacific", D:"Southern", a:"C"},
    {q:"Which metal is liquid at room temperature?", A:"Tin", B:"Mercury", C:"Zinc", D:"Aluminum", a:"B"},
    {q:"Which year did World War II end?", A:"1943", B:"1944", C:"1945", D:"1946", a:"C"}
];

const HARD = [
    {q:"Which gas is most abundant in Earth's atmosphere?", A:"Oxygen", B:"Carbon Dioxide", C:"Nitrogen", D:"Hydrogen", a:"C"},
    {q:"Which part of the cell produces energy?", A:"Nucleus", B:"Ribosome", C:"Mitochondria", D:"Cytoplasm", a:"C"},
    {q:"Who developed the theory of relativity?", A:"Newton", B:"Einstein", C:"Galileo", D:"Tesla", a:"B"},
    {q:"What is the capital of New Zealand?", A:"Auckland", B:"Christchurch", C:"Wellington", D:"Hamilton", a:"C"},
    {q:"How many elements are in the periodic table?", A:"112", B:"116", C:"118", D:"120", a:"C"}
];

const SUBJECTS = {
    "A": ["Space 🌌", [
        {q:"Which planet has the most moons?", A:"Saturn", B:"Jupiter", C:"Uranus", D:"Neptune", a:"B"},
        {q:"Type of Milky Way?", A:"Elliptical", B:"Irregular", C:"Spiral", D:"Ring", a:"C"},
        {q:"First human in space?", A:"Armstrong", B:"Gagarin", C:"Aldrin", D:"Glenn", a:"B"},
        {q:"What keeps planets in orbit?", A:"Speed", B:"Gravity", C:"Magnetism", D:"Energy", a:"B"},
        {q:"Sun is classified as?", A:"Red Giant", B:"White Dwarf", C:"Yellow Dwarf", D:"Blue Giant", a:"C"}
    ]],
    "B": ["Technology 💻", [
        {q:"Which language is mainly used for AI?", A:"HTML", B:"Python", C:"CSS", D:"PHP", a:"B"},
        {q:"What does RAM do?", A:"Stores files", B:"Runs programs temporarily", C:"Controls internet", D:"Displays graphics", a:"B"},
        {q:"Binary system uses base?", A:"2", B:"8", C:"10", D:"16", a:"A"},
        {q:"Main function of an OS?", A:"Gaming", B:"Hardware control", C:"Internet", D:"Design", a:"B"},
        {q:"Which is NOT a programming language?", A:"Java", B:"Python", C:"Linux", D:"C++", a:"C"}
    ]]
};

const PENALTY = [
    {q:"Which country invented paper?", A:"India", B:"China", C:"Egypt", D:"Greece", a:"B"},
    {q:"Which planet rotates backwards?", A:"Mars", B:"Venus", C:"Uranus", D:"Mercury", a:"B"},
    {q:"What is the largest internal organ?", A:"Heart", B:"Liver", C:"Lungs", D:"Kidney", a:"B"},
    {q:"Which language has the most native speakers?", A:"English", B:"Spanish", C:"Mandarin", D:"Hindi", a:"C"},
    {q:"What does WWW stand for?", A:"World Web Wide", B:"Wide World Web", C:"World Wide Web", D:"Web World Wide", a:"C"}
];

// ---------- GAME ----------
const catDiv = document.getElementById("cat");
const roundName = document.getElementById("round-name");
const questionText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const scoreDiv = document.getElementById("score");
const finalDiv = document.getElementById("final");
const introDiv = document.getElementById("intro");
const startBtn = document.getElementById("start-btn");

startBtn.onclick = () => {
    introDiv.style.display = "none";
    optionsDiv.style.display = "block";
    startRound(EASY,2,"🟢 EASY ROUND");
};

function showRoundName(name){
    roundName.innerText = name;
    // Show random cat
    catDiv.innerText = cats[Math.floor(Math.random()*cats.length)];
}

function startRound(qArray, points, name, penalty=false){
    currentRoundName = name;
    showRoundName(name);
    questions = qArray.slice().sort(()=>Math.random()-0.5);
    current = 0;
    playQuestion(points, penalty);
}

function playQuestion(points, penalty=false){
    if(current >= questions.length){
        nextRound();
        return;
    }
    const q = questions[current];
    questionText.innerText = q.q;
    const btns = optionsDiv.querySelectorAll("button");
    btns[0].innerText = "A) "+q.A;
    btns[1].innerText = "B) "+q.B;
    btns[2].innerText = "C) "+q.C;
    btns[3].innerText = "D) "+q.D;
    scoreDiv.innerText = "Score: "+score;

    btns.forEach(btn=>{
        btn.onclick = ()=>{
            if(btn.innerText.charAt(0)===q.a){
                score+=points;
                feedback.innerText="✅ Correct!";
                feedback.style.color="#28a745";
            } else{
                if(penalty) score-=2;
                feedback.innerText="❌ Wrong!";
                feedback.style.color="#dc3545";
            }
            current++;
            setTimeout(()=>playQuestion(points,penalty),500);
        };
    });
}

function nextRound(){
    feedback.innerText="";
    round++;
    if(round===1) startRound(MID,3,"🟡 MID ROUND");
    else if(round===2) startRound(HARD,4,"🔴 HARD ROUND");
    else if(round===3){
        let subjectText="Choose a subject (A/B):\n";
        for(let key in SUBJECTS) subjectText+=key+") "+SUBJECTS[key][0]+"\n";
        let choice=prompt(subjectText);
        choice=choice.toUpperCase();
        if(SUBJECTS[choice]) startRound(SUBJECTS[choice][1],3,"Subject Round: "+SUBJECTS[choice][0]);
        else startRound(SUBJECTS["A"][1],3,"Subject Round: "+SUBJECTS["A"][0]);
    }
    else if(round===4) startRound(PENALTY,2,"⚠️ PENALTY ROUND",true);
    else endGame();
}

function endGame(){
    optionsDiv.style.display="none";
    roundName.innerText="🎉 You Finished! 🎉";
    questionText.innerText="Final Score: "+score;
    catDiv.innerText = `
     /\\_/\  
    ( o.o )
     > ^ <
Thanks for playing!
Made by Erica :>
    `;
    feedback.innerText="";
    scoreDiv.innerText="";
    finalDiv.innerText="";
}