//window.onload = function(){

var form = document.querySelector("form");
var input = document.querySelector("#task-input");
var ol = document.querySelector("ol");
var delAll = document.getElementById("del-all");
var search = document.getElementById("search-input");
    let err = document.querySelector("#err");
    let div = document.getElementById("div");
var li = document.createElement("li");
    

    // all event loader
    const allEventLoader = function() {
        
        // Dom load event
        document.addEventListener("DOMContentLoaded", getTasks);
        document.body.addEventListener("click", function(){
                      err.innerText = ''
                      input.style.borderBottomColor = "#aaa";
                      });
        
    // form event
    form.addEventListener("submit", addTask);
        
        
    // delete all event
    delAll.addEventListener("click", clearAll);
        
    // delete task event
     ol.addEventListener("click", deleteTask);
    // search task event    
    search.addEventListener("keyup", searchTask);
    };
    
    function getTasks(){
        var tasks;
            if(localStorage.getItem("tasks") === null){
                tasks = [];
            }
            else{
                tasks = JSON.parse(localStorage.getItem("tasks"));
            }
//            tasks.push(task);
//            localStorage.setItem("tasks", JSON.stringify(tasks));
        tasks.forEach(function(task){
            
        err.innerText = "";
        div.innerText = "";            
         var a = document.createElement("a");
         var i = document.createElement("i");
        var  li = document.createElement("li");
         li.className = " li";
         a.href = "#";
         a.className = " a";
         i.className = " fa fa-trash";
         
         a.appendChild(i);
         li.appendChild(document.createTextNode(task));
         li.append(a);
         
         ol.appendChild(li);
        delAll.style.display = "block";
        });
    }
    
    
    // Form Submittion
    const addTask = function(e) {
    e.preventDefault();
    // get error message if no letter/word is being added as task
        if(input.value === "" || input.value.startsWith("=") || input.value.startsWith("/")|| input.value.startsWith("?")|| input.value.startsWith("!")|| input.value.startsWith("]")|| input.value.startsWith("}")|| input.value.startsWith("{")|| input.value.startsWith("[")|| input.value.startsWith("<")|| input.value.startsWith(">")|| input.value.startsWith("'")|| input.value.startsWith("`")|| input.value.startsWith("|")|| input.value == " " || Number(input.value) || input.value == "0" || input.value.startsWith(".") || input.value.startsWith(";") || input.value.startsWith(",") || input.value =='"' ){
        
        
        input.style.borderBottomColor = "red";
        err.style.fontSize = "14px";
        err.style.color = "red";
        err.style.position = "relative";
        err.style.left = ".5em";    
        err.style.top = ".5em";
        err.innerText = "Please type at least a word in the text filled.";
        err.style.display = "block";
            input.onfocus = () => {
                err.style.display = "none";
                input.style.borderBottomColor = "#aaa";
                document.getElementById("add-button").style.display = "block";
            }
        }
            // if no error then trim whitespaces and add task if specified
     else if(input.value.trim()){

//         input.style.borderBottomColor = "#aaa";
        err.innerText = "";
        div.innerText = "";
        alert(" Successfully Added"); 
         
        
         var a = document.createElement("a");
         var i = document.createElement("i");
         li = document.createElement("li");
         li.className = " li";
         a.href = "#";
         a.className = " a";
         i.className = " fa fa-trash";
         
         a.appendChild(i);
         li.appendChild(document.createTextNode(input.value));
         li.append(a);
         
         ol.appendChild(li);
        input.blur();
        delAll.style.display = "block";
         
         // store in local storage
        
     }
         storeInLocalStorage(input.value);

        
        this.reset();
    }; // form event closed
    
        
        var storeInLocalStorage = task => {
            var tasks;
            if(localStorage.getItem("tasks") === null){
                if(input.value === ""){
                    
                }else{
                tasks = [];
            }
            }else{
                tasks = JSON.parse(localStorage.getItem("tasks"));
            }
            if(input.value === ""){
                
            }else{
                tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
                 }
        }
    
    
    
    // delete task icon
     const deleteTask = function(e){
        e.preventDefault();
        
        if(e.target.parentElement.classList.contains("a")){
            if(confirm("Are you sure?")){
           e.target.parentElement.parentElement.remove();
            
                deleteFromLs(e.target.parentElement.parentElement);
//                console.log(e.target.parentElement.parentElement);
            }else{
                alert("Access Denied.");
            };
            if(ol.childElementCount === 0){
                div.style.color = "#aaa";
                div.innerText = "All task has been deleted, you can add new task in the \"New Task\" filled ";
                delAll.style.display = "none";
            }else{
            delAll.style.display = "block";
            }
        }
     };
     
function deleteFromLs(items){
    var tasks;
            if(localStorage.getItem("tasks") === null){
                tasks = [];
            }
            else{
                tasks = JSON.parse(localStorage.getItem("tasks"));
            }
        tasks.forEach(function(task, index){
            if(items.textContent === task){
                tasks.splice(index, 1);
                
            }else{
                console.err("nothing to do");
            }
        })
    localStorage.setItem("task", JSON.stringify(tasks));
};


    if(ol.childElementCount == 0){
        div.style.color = "#aaa";
        div.innerText = "No task yet, you can add task in the \"New Task\" filled ";
        delAll.style.display = "none";
    }
         
    else{
        div.innerText = "";
        delAll.style.display = "block";
    };

    // Delete all button 
    const clearAll = function(e){
        if(confirm("This will erase all tasks, continue?")){
        e.preventDefault();
        while(ol.firstElementChild){
            ol.removeChild(ol.firstElementChild);
            localStorage.clear();
            }
                delAll.style.display = "none";
               div.innerText = "All task has been cleared, you can add new task in the \"New Task\" filled";
        }
            else{
                alert("Cancelled.");
        }
     
    };
    var searchTask = function(e) {
        var text = e.target.value.toLowerCase();
        console.log(text);
        document.querySelectorAll("ol .li").forEach(task => {
            var item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = "block";   
            }else{
                
                task.style.display = "none";
            }
        })
    }
    // All event loader
    allEventLoader(); 
    
      

//}; // End window.Onload()


const sideBar = document.createElement("div");
    sideBar.style.backgroundColor = "#ccc";
    sideBar.style.padding = "2%";
    sideBar.style.marginBottom = "-5em";
    sideBar.setAttribute("id","sidebar")

let btn = document.createElement("i");
    btn.style.color = "teal";
    btn.style.backgroundColor = "white";
    btn.className = "fa fa-arrow-right toggle";
    btn.style.fontSize = "2vw";
    btn.style.backgroundColor = "transparent";
    btn.style.position = "relative";
    btn.style.left = "100%";
    btn.style.bottom = "3vh";

const sideBarDiv = document.createElement("div");
        sideBarDiv.style.backgroundColor = " #eee";
        sideBarDiv.style.height = "100%";
        sideBarDiv.style.padding = "2%";

var sideBarName = document.createElement("h1");
        sideBarName.style.color = "teal";
        sideBarName.appendChild(document.createTextNode("Profile"));
        sideBarName.style.fontSize = "40px";
        sideBarName.style.marginBottom = "2%";
        sideBarName.style.marginTop = "4%";
    sideBarDiv.appendChild(sideBarName);

let imgDiv = document.createElement("div");
        imgDiv.style.borderBottom = "thin solid black";
//        imgDiv.style.backgroundColor = " #eee";
        imgDiv.style.height = "100%";
        imgDiv.style.padding = "5%";

let hr = document.createElement("hr");
let img = document.createElement("img");
        img.src = "images/author.jpg";
        img.alt = "author's pic";
        img.style.width = "20%";
        img.style.marginBottom = "-3%";
        
        img.style.height = "6%";
//        img.style.display = "inline";
        img.style.borderRadius = "100%";
    
let name = document.createElement("h4");
            name.appendChild(document.createTextNode("Remilekun Elijah"));   
            name.style.color = "#aaa";
            name.style.display = "inline";
            name.style.marginLeft = "3%";
        imgDiv.appendChild(img);
        imgDiv.appendChild(name);
//        imgDiv.style.display = "inline";
    sideBarDiv.appendChild(imgDiv);
//    sideBarDiv.appendChild(hr);

let foloDiv = document.createElement("div") ;
//            foloDiv.style.backgroundColor = " #aaa";
        foloDiv.style.height = "100%";
        foloDiv.style.padding = "5%";

let h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode("Follow Me"));
        h2.style.color = "teal";
        h2.style.marginBottom = "5%";

let ul = document.createElement("ul");
        ul.style.display = "block";
        
    ul.innerHTML = ` <a href="facebook.com/Remilekun Elijah Jnr" target="_blank" class="link"><li class="fa fa-facebook" style="display: block; order-style:none;"> Facebook </li></a>
                    <a href="twitter.com/RemilekunElijah" class="link"><li class="fa fa-twitter" style="display: block; border-style:none;"> Twitter </li></a>
                    <a href="instagram.com/Remilekun-elijah" class="link"><li class="fa fa-instagram" style="display: block; order-style:none;"> Instagram </li></a>`;

let settingsDiv = document.createElement("div");
let settings = document.createElement("h1");
        settings.appendChild(document.createTextNode("Settings"));


let Mainlabel = document.createElement("label");    
let label = document.createElement("label");    
let label1 = document.createElement("label");    
let checkbox = document.createElement("input");
let checkbox1 = document.createElement("input");

    label.style.color = "#aaa";
    label1.style.color = "#aaa";

let bg = document.createElement("h3");
    bg.appendChild(document.createTextNode("Change Bg Image"));
    bg.style.color = "gray";
    bg.style.marginLeft = "4%";

    Mainlabel.setAttribute("for","img");
Mainlabel.appendChild(bg);
    
//  1st checkbox 
    checkbox.type = "radio";
    checkbox.setAttribute("name","img");
    checkbox.setAttribute("id","img");
    checkbox.className = "bg";
    label.style.display = "block";
    label.style.marginLeft = "23%";
    checkbox.setAttribute("checked"," ");
        // 2nd checkbox
    checkbox1.type = "radio";    
    checkbox1.setAttribute("name","img");
    checkbox1.setAttribute("id","img");
    checkbox1.className = "bg1";
    label1.style.display = "block";
    label1.style.marginLeft = "6%";

label1.appendChild(document.createTextNode("Wordpress image"));
label1.appendChild(checkbox1);

label.appendChild(document.createTextNode("Default"));
label.appendChild(checkbox);


//    settingsDiv.appendChild(checkbox1);
//    label.appendChild(checkbox);
//    label.style.display = "block";
    
    settingsDiv.appendChild(settings);
    settingsDiv.appendChild(Mainlabel);
//settingsDiv.appendChild();
    settingsDiv.appendChild(label);
settingsDiv.appendChild(label1);
//    settingsDiv.appendChild(checkbox1);

var main = document.querySelector("main");
    var body = document.querySelector("body");

checkbox.addEventListener("click", function(e){
    if(e.target.className.includes("bg")){    
        var main = document.querySelector("main");
        var body = document.querySelector("body"); 
        body.style.backgroundImage = "url(images/wp-1.jpg)";
        body.style.fontFamily = "serif";
        main.style.fontFamily = "mono space"
        this.blur();
}
    else{
        alert("your browser doesn't support this feature");
    }

});

//2nd input
checkbox1.addEventListener("click", function(e){
    
    var body = document.querySelector("body");
    var main = document.querySelector("main");
    if(e.target.className.includes("bg1")){
        
        body.style.backgroundImage = "url(images/wp-2.jpg)";
        main.style.fontFamily = "cursive, serif";
        
        this.blur();
}
    else{
        alert("your browser doesn't support this feature");
    }
});

    foloDiv.appendChild(h2);
    foloDiv.appendChild(ul);
    sideBarDiv.appendChild(foloDiv);
sideBar.appendChild(sideBarDiv);
sideBar.insertBefore(btn,sideBarDiv);
sideBarDiv.appendChild(settingsDiv);
    
