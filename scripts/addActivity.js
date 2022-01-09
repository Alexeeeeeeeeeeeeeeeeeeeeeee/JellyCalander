{
    let activityName = "";
    let color = "cornflowerblue";
    let sTime = "";
    let eTime = "";
    let dragActivaty = false;
    let tempInnerHTML = "";

    //----------------- Add Activaty div -----------------
    function initializeParams() {
        activityName = "";
        // color = "cornflowerblue"; // Color stays the same
        sTime = "";
        eTime = "";
        dragActivaty = false;
    }
    function showAddActivity(){
        document.querySelector(".addActivaty").style.display = "grid";
    }
    function exitAddActivaty(){
        document.querySelector(".addActivaty").style.display = "none";
        initializeParams();
    }
    function selectColor(element) {
        color = getComputedStyle(element)['backgroundColor'];
        // Clear
        colorButtons.forEach(others => {
            others.childNodes[0].style.color="transparent";
        });
        // Set Self color
        element.childNodes[0].style.color="rgb(0,0,0)";
    }
    function addActivitySubmit() {
        // Get info
        activityName = document.querySelector(".addActivaty input.actName").value;
        sTime = document.querySelector(".addActivaty input.s").value;
        eTime = document.querySelector(".addActivaty input.e").value;
        
        console.log(activityName);
        console.log(sTime);
        console.log(eTime);
        console.log(color);
        // Start next process
        document.querySelector(".addActivaty").style.display = "none"
        document.querySelector(".menu").style.display = "none"
        document.querySelector(".menu2").style.display = "grid"
        dragActivaty = true
    }

    // addEventListener
    let colorButtons = document.querySelectorAll(".addActivaty .colors > *");
    colorButtons.forEach(element => {
        element.addEventListener(
            "click",() => {selectColor(element)});
        });
    
    let submitButton = document.querySelector(".addActivaty .submit");
    submitButton.addEventListener(
        "click",() => {addActivitySubmit()}
        );
    
    //----------------- menu2 div -----------------
    function clearTemp() {
        tempDict.forEach( (value, key) => {
            // console.log(value, key)
            let temp = document.querySelector(`[id~="${key}"]`);
            // console.log(temp)

            let childs = temp.childNodes;
            // console.log(childs)

            for (let i = 1; i < childs.length; i++) {
                if (childs[i].innerHTML == value[0]) {
                    $(childs[i]).remove();
                }
            }
        });
        // Clear tempDict
        tempDict = new Map();
    }
    function cancel(){
        document.querySelector(".menu2").style.display = "none";
        initializeParams();
        document.querySelector(".menu").style.display = "grid";
        // Clear
        clearTemp();
    }
    function undo() {
        clearTemp();
    }
    function submit() {
        document.querySelector(".menu2").style.display = "none";
        initializeParams();
        document.querySelector(".menu").style.display = "grid";
        // Submit to database
        tempDict.forEach((v, k) => {
            if (databaseDict.has(k)) {
                databaseDict.get(k).push(v);
            }
            else {
                databaseDict.set(k,[v]);
            }
        });
        // Clear tempDict
        tempDict = new Map();
        console.log(databaseDict);
    }

    function addDragedActivaty(target) {
        const id = target.split(" ");
        const dateID = id[id.length - 1];
        let day = document.querySelector(`[id~="${dateID}"]`);
        // console.log(day);

        // Check target child node count
        let childs = day.childNodes;
        // console.log(childs[0]);

        // Only add activaty if it's not a duplacate.
        if (childs.length > 1 && childs[childs.length - 1].innerHTML == activityName) {
            return
        }else {
            // Save to temp dictionary
            tempDict.set(dateID,[`${activityName}`, `${color}`, `${sTime}`, `${eTime}`]);

        }
        // console.log(tempDict.entries())

        // If there is already 3 child nodes, dont add more.
        if (childs.length >= 3) {
            let count = childs.length - 2;
            tempInnerHTML = childs[childs.length - 1].innerHTML;
            childs[childs.length - 1].innerHTML = `+${++count}`;

        }else if (childs.length < 3) {
            // Add new activaty
            let act = document.createElement("div");
            act.setAttribute("class", `${activityName}-${color}-${sTime}-${eTime}`);
            let actText = document.createTextNode(`${activityName}`);
            act.appendChild(actText);

            // Append
            day.appendChild(act);

            // css
            $(act).css({
                'width': '100%',
                'background-color':`${color}`,
                'color':'#313133',
                'font-size':'100%',
                'border-radius': '5px',
            });
        }
    }

    // dragActivaty
    document.onmousedown = (e) => {
        if (dragActivaty) {
            console.log("Mouse Down!!")
            let target = e.target.id;
            if (target != "") {
                console.log(target); // first element
                addDragedActivaty(target);
            }

            // 固定的用 addEventListener, 要及時用 .attribute (不然拿不到 e)
            document.querySelector(".calendar").onmouseover = (e) => {
                let target = e.target.id;
                if (target != "") {
                    console.log(target); // element
                    addDragedActivaty(target);
                }
            };
        }
    };
    document.onmouseup = () => {
        if (dragActivaty) {
            console.log("Mouse Up!!")
            document.querySelector(".calendar").onmouseover = null;
        }
    };

    // Buttons
    let m2CancelButton = document.querySelector(".menu2 button.cancel");
    m2CancelButton.addEventListener("click", ()=>{cancel()});

    let m2Submit = document.querySelector(".menu2 button.submit");
    m2Submit.addEventListener("click", ()=>{submit()});

    let m2UndoButton = document.querySelector(".menu2 button.undo");
    m2UndoButton.addEventListener("click", ()=>{undo()});

}