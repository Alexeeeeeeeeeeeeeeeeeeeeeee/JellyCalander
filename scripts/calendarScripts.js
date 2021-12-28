{
    function createCalendar(inputYear, inputMonth, currDay) {
        document.querySelector(".calendar").innerHTML = "";
        // consts
        const month = new Date(inputYear, inputMonth).getMonth();
        const year = new Date(inputYear, inputMonth).getFullYear();
    
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        const lastMonthEnd = new Date(year, month, 0).getDate();
        const nextMonthStart = new Date(year, month + 1, 1).getDay();
        
        const months = [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
        ]
    
        const daysArray = [];
        // Last Month
        if (firstDay != 0) {
            for (let i = firstDay - 1; i>=0; i --) {
                daysArray.push([lastMonthEnd - i, "last"]);
            }
        }
        // Current Month
        for (let i = 1; i<=lastDay; i++) {
            daysArray.push([i, "current"]);
        }
        // Next Month
        if (nextMonthStart != 0) {
            let count = 1;
            for (let i = nextMonthStart ; i < 7;i++) {
                daysArray.push([count++, "next"]);
            }
        }
        
    
        // Set manu Dates
        document.querySelector(".menu .month").innerHTML = months[month];
        document.querySelector(".menu .year").innerHTML = year;
    
        // Generate calendar
        let calendar = document.querySelector(".calendar");
    
        for (let i = 0; i < daysArray.length; i++) {
            // Create button and set attributes
            let x = document.createElement("div");
            let num = document.createTextNode(`${daysArray[i][0]}`);
            x.appendChild(num);
            // Weekend
            if (i % 7 == 0 || i % 7 == 6) x.setAttribute("class", `weekend ${daysArray[i][1]}`);
            // Four edges
            if (i == 0) x.setAttribute("class", `weekend ${daysArray[i][1]} ul`);
            if (i == 6) x.setAttribute("class", `weekend ${daysArray[i][1]} ur`);
            if (i == daysArray.length - 7) x.setAttribute("class", `weekend ${daysArray[i][1]} ll`);
            if (i == daysArray.length - 1) x.setAttribute("class", `weekend ${daysArray[i][1]} lr`);
            if (x.getAttribute("class") == null) x.setAttribute("class", `${daysArray[i][1]}`);
            // Set id
            x.setAttribute("id", `${daysArray[i][1]} ${daysArray[i][0]}`);
            // Today
            if (daysArray[i][1] == "current" && daysArray[i][0] == currDay){
                const temp = x.getAttribute("class");
                x.setAttribute("class", `${temp} today`);
            }
            // Append to calendar
            calendar.appendChild(x);
        }
    }
    
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let currDay = date.getDate();
    createCalendar(year, month, currDay);
    
    // Last/Next month
    document.querySelector(".menu button[class~=lastMonth]").addEventListener(
        "click",
        () => {createCalendar(year, --month, currDay)}
    );
    document.querySelector(".menu button[class~=nextMonth]").addEventListener(
        "click",
        () => {createCalendar(year, ++month, currDay)}
    );
    
    // Back to current date
    document.querySelector(".menu button[class~=home]").addEventListener(
        "click",
        () => {
            year = date.getFullYear();
            month = date.getMonth();
            currDay = date.getDate();
            createCalendar(year, month, currDay)}
    );
}