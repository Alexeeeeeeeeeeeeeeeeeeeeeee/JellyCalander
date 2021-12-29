{
    let activityName = "";
    let color = "";
    let sTime = "";
    let eTime = "";

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
        activityName = document.querySelector(".addActivaty input.actName").value;
        sTime = document.querySelector(".addActivaty input.s").value;
        eTime = document.querySelector(".addActivaty input.e").value;
        
        console.log(activityName);
        console.log(sTime);
        console.log(eTime);
        console.log(color);
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
}