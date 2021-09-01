const ThingsICanDo = [
    "What's your name?",
    "What's my name?",
    "time",
    "date",
    "Good Night",
    "Good Morning",
    "Good Afternoon",
    "commands",
    "features",
    "open questions",
    "open google",
    "and many more......"
];

const ListThings = ThingsICanDo => "I can answer these questions and many other too : <br><br><br>" + ThingsICanDo.join("<br/><br/>");

const Random = list => list[Math.floor(Math.random()*list.length)]; 

const WhatCanIDo = ThingsICanDo => Random(ThingsICanDo); 


const Links = {
    "google" : "https://www.google.in",
    "youtube" : "https://www.youtube.com",

};

const getLink = siteName => `Click here to open <a href="${Links[siteName]}" target="_blank">${siteName}</a>`;


const monthNames = [
    "January",
    "February",
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October",
    "November", 
    "December"
 ]; 


const today = monthNames =>
{
  let date = new Date();
  
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  
}


const now = () =>
{
    let date = new Date();
    
    return date.toLocaleTimeString();
}

const Evaluate = expression =>
{
    try
    {
        if(isLegal(expression))
        {
            
        
            const result = eval(HtmlSpecialChars(expression));
            return result;
        
        }
        else 
        {
            return "error";
        }
    }
    
    catch(err)
    {
        return "error";
    }
}

const Answers = {
    "features" : ListThings(ThingsICanDo),
    "commands" : ListThings(ThingsICanDo),
    "who is your creator" : "DeliX",
    "creator" : "DeliX",
    "hello" : "Hello %U% 😃. How can I help ? ",
    "hi" : "Hi %U% 😃",
    "my name" : "Your name is %U%",
    "your name" : "My name is Chatbot",
    "date" : "Its "+ today(monthNames) + " today.",
    "time" : "The time is " + now(),
    "bye": "Good bye. Hope we meet soon 😀",
    "who are you" : "I am a CHATBOT created by DeliX, and am here to help. Type Your question or else type features",
    "good night" : "Good Night %U%",
    "good morning" : "Good Morning %U%",
    "good afternoon" : "Good Afternoon %U%",
    "good evening" : "Good Evening %U%",
    "how are you" : "I am great! %U%. 😃",
    "google" : getLink("google"),
    "youtube": getLink("youtube"),

};

 
const Notfound = "Sorry, I don't have answer to this question.<br/><br/>type guide for help :)";

const Invalid = "Indeed !!";

 
const D = window.document;

const element = selector => D.querySelector(selector);

const Answer = (Main,User,Text) =>
{
    let Flag = false;
    
    const Result = Evaluate(Text);
    
    text = Text.toLowerCase();
    
    Object.keys(Answers).forEach(key =>{
    
    if(!Flag)
    {
        if(text.indexOf(key) !== -1 )
        {
    
          addAnswer(
              Main,
              Answers[key].replace(
              "%U%",
              User
              )
          );
            
          Flag = true;
        
       }
   
       else if(typeof Result == "number")
       {
          
             addAnswer(
                 Main,
                 `${Text} equals ${Result}`
             );
             
             Flag = true;
        
       }
       
       }
        
    });
    
    if(!Flag)
    {
        addAnswer(Main,Notfound);
    }
    
    
};

const addQuestion = (Main,text) =>
{
    Main.innerHTML += `
        <div class="row">
            <div class="chat question shadow">${text}</div>
        </div>
    `;
}

const addAnswer = (Main,text) =>
{
    Main.innerHTML += `
    <div class="row">
        <div class="chat answer shadow">${text}</div>
    </div>
    `;
}


D.addEventListener("DOMContentLoaded",()=>{
    
    const Main = element("main");
    
    const Askbtn = element("button");
    
    const Question = element("input");
    
    const Lastdiv = element("#last");
    
    let User = prompt("Enter your name :");
    
    while(User === null || User === '')
    {
    
        User = prompt("Kindly please flll your name for fluent conversation : ");
        
    }
    
    Question.focus();
    
    const Ask = () =>{
        
        const Text = Question.value;
        
        if(Text.length)
        {
        
            addQuestion(Main, Text);
        
            Question.value = "";
            
            Answer(Main,User,Text);
             
            Lastdiv.scrollIntoView();
        
        }
    };
    
    
    Askbtn.addEventListener("click",Ask);
    
    Question.addEventListener("keyup",function(event){
        if(event.keyCode === 13)  Ask();
    });
    
    addAnswer(Main,`Hello ${User}, I am a CHATBOT created by DeliX, and am here to help. Type Your question or else type "features"`);
 
    
    
});
