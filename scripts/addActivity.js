{
    let activityName = "";
    let color = "";
    let sTime = "";
    let eTime = "";
    let dragActivaty = false;

    //----------------- Add Activaty div -----------------
    function showAddActivity(){
        document.querySelector(".addActivaty").style.display = "grid";
    }
    function exitAddActivaty(){
        document.querySelector(".addActivaty").style.display = "none";
        activityName = "";
        color = "";
        sTime = "";
        eTime = "";
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
    function cancel(){
        document.querySelector(".menu2").style.display = "none";
        dragActivaty = false;
        activityName = "";
        color = "";
        sTime = "";
        eTime = "";
        document.querySelector(".menu").style.display = "grid";
    }
    function undo() {
        
    }
    function submit() {
        
    }
    function addDragedActivaty(target) {
        const id = target.split(" ");
        let day = document.querySelector(`[id~="${id[id.length - 1]}"]`);
        // console.log(day);

        // Check target child node count
        let childs = day.childNodes;
        // console.log(childs[0]);

        // Only add activaty if it's not a duplacate.
        if (childs.length > 1 && childs[childs.length - 1].innerHTML == activityName) {
            return
        }

        // If there is already 3 child nodes, dont add more.
        if (childs.length >= 3) {
            let count = childs.length - 3;
            childs[childs.length - 1].innerHTML = `+${++count}`;

        }else if (childs.length < 3) {
            // Add new activaty
            let act = document.createElement("div");
            let actText = document.createTextNode(`${activityName}`);
            act.appendChild(actText);

            // Append
            day.appendChild(act);

            let height = 50;
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