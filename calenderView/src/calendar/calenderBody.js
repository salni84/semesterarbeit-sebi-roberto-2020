

export class CalenderBody {


    constructor(service, mapper){

        this.mapper = mapper;
        this.view = service;
        this.calender();
        const newEntry = document.getElementById("showModal");
        this.showModal(newEntry);
        const saveData = document.getElementById("saveData");
        this.saveEntry(saveData);
        const backToCalender = document.getElementById("back");
        this.backToCalender(backToCalender);
        const saveUser = document.getElementById("saveUser");
        this.saveUser(saveUser);
        const delMod = document.getElementById("delMod");
        this.userModal(delMod);
        const backToCalender2 = document.getElementById("back2");
        this.backToCalender2(backToCalender2);
        const  deleteUser = document.getElementById("deleteU");
        this.deleteUser(deleteUser);
    }

    calender(){

        let today = new Date();
        let dayInt = today.getDate();
        let month1 = today.getMonth();

        today = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);

        this.showMonth(month1);

        let year1 = today.getFullYear();
        let calendarBody = document.getElementById("days");
        let weekday = new Date(year1, month1).getDay();
        let months = [
            "Januar",
            "Februar",
            "März",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Dezember"
        ];

        let weekdays = [
            "Sonntag",
            "Montag",
            "Dienstag",
            "Mittwoch",
            "Donnerstag",
            "Freitag",
            "Samstag"
        ];


        let nextbtn = document.getElementById("next");
        let prevBtn = document.getElementById("prev");


        nextbtn.onclick = ()=>{
            this.removeCalender();
            let lastEnd = nextMonth();
            let user1 = document.getElementById("username1").innerHTML;
            let user2 = document.getElementById("username2").innerHTML;
            let user3 = document.getElementById("username3").innerHTML;
            let user4 = document.getElementById("username4").innerHTML;
            let user5 = document.getElementById("username5").innerHTML;
            this.showData(year1, month1+1, user1, user2, user3, user4, user5, lastEnd)
        };


        prevBtn.onclick = ()=>{
            this.removeCalender();
            let lastEnd = previousMonth();
            let user1 = document.getElementById("username1").innerHTML;
            let user2 = document.getElementById("username2").innerHTML;
            let user3 = document.getElementById("username3").innerHTML;
            let user4 = document.getElementById("username4").innerHTML;
            let user5 = document.getElementById("username5").innerHTML;
            this.showData(year1,month1+1,  user1, user2, user3, user4, user5, lastEnd)
        };

        showCalendar(month1, year1);


       function showCalendar(month, year) {
           weekday = new Date(year, month).getDay()

           let totalDays = daysInMonth(month1, year1);
           calendarBody.innerHTML = "";

           function daysInMonth(month, year) {
               return new Date(year, month + 1, 0).getDate();
           }

           for (let day = 1; day <= totalDays; day++) {

               let cell = document.createElement("li");
               let cellText = document.createTextNode(weekdays[weekday] + " " + day + ".  " + months[month1]);
               if (weekday === 0 || weekday === 6) {
                   cell.classList.add("weekend")
               }
               if (weekday > 5) {
                   weekday = 0
               } else {
                   weekday++
               }

               if (
                   dayInt === day &&
                   month === new Date().getMonth() &&
                   year === new Date().getFullYear()
               ) {
                   cell.classList.add("active");
               }

               cell.classList.add("singleDay");
               cell.appendChild(cellText);
               calendarBody.appendChild(cell);
           }

           document.getElementById("month").innerHTML = months[month1] + " " + year1;
       }

        function nextMonth() {

            today = new Date(today.getFullYear(), today.getMonth() + 2, 0, 23, 59, 59);
            let end = new Date(today);
            let lastEnd = end.getDate();
            year1 = month1 === 11 ? year1 + 1 : year1;
            month1 = (month1 + 1) % 12;
            showCalendar(month1, year1);
            return lastEnd
        }

        function previousMonth() {
            today = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59);
            let end = new Date(today);
            let lastEnd = end.getDate();
            year1 = month1 === 0 ? year1 - 1 : year1;
            month1 = month1 === 0 ? 11 : month1 - 1;
            showCalendar(month1, year1);
            return lastEnd
        }
    }

    async showMonth(monat) {
        const fetch = this.view.listUser();
        const list = await fetch;
        const users = Array.from(this.mapper.eachUser(list));

        for (let x = 0; x < users.length; x++) {
            let userx = "username" + (x + 1);
            document.getElementById(userx).innerHTML = users[x];
        }
        let user1 = document.getElementById("username1").innerHTML;
        let user2 = document.getElementById("username2").innerHTML;
        let user3 = document.getElementById("username3").innerHTML;
        let user4 = document.getElementById("username4").innerHTML;
        let user5 = document.getElementById("username5").innerHTML;
        let today = new Date();
        let year = today.getFullYear();
        today = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
        let end = new Date(today);
        let lastEnd = end.getDate();
        this.showData(year, monat + 1, user1, user2, user3, user4, user5, lastEnd);

        if(users.length === 5){
            let alert = document.getElementById("alert");
            alert.classList.toggle("hide");
            let input = document.getElementById("newUser");
            input.classList.toggle("hide");
            let save = document.getElementById("saveUser");
            save.classList.toggle("hide");
            }
    }

    saveEntry(button){

        button.addEventListener('click', async () => {

            let termin = document.getElementById("termin").value;
            let date = document.getElementById("date").value;
            let person = document.getElementById("person").value;
            if (termin === "") {
                alert("Ungültige Eingabe")
            } else if (date === "") {
                alert("Ungültige Eingabe")
            } else if (person === "") {
                alert("Ungültige Eingabe")
            } else if (person === "Für alle User") {

                const fetch = this.view.listUser();
                const list = await fetch;
                const users = Array.from(this.mapper.eachUser(list));

                for (let x = 0; x < users.length; x++) {

                    let event = {};
                    event.firstname = users[x];
                    event.appointment = termin;
                    event.eventdate = date;
                    this.view.addNewAppointment(event)
                }
            }

            else{
                let event = {};

                event.firstname = person;
                event.appointment = termin;
                event.eventdate = date;
                this.view.addNewAppointment(event);
            }

            const selectElement = document.getElementById("person");
            while (selectElement.length > 0){
                selectElement.remove(0);
            }
            document.getElementById("modal").classList.toggle("hide");
            location.reload()
        })
    }


    backToCalender(button){
        button.addEventListener('click', ()=> {
            const selectElement = document.getElementById("person");
            while (selectElement.length > 0){
                selectElement.remove(0);
            }
            document.getElementById("modal").classList.toggle("hide");
        })
    }

    backToCalender2(button){
        button.addEventListener('click', ()=> {

            const selectElement = document.getElementById("selectUser");
            while (selectElement.length > 0){
                selectElement.remove(0);
            }
            document.getElementById("userModal").classList.toggle("hide");
        })
    }


    async showData(year, monat, user1, user2, user3, user4, user5, lastEnd){

        const fetchData = function fetchedData (data) {

            const view = this.view;
            let calenderMap = this.mapper.calendarMapper(data);
            let timeArray = [];

            let row1 = document.getElementById("user1");
            let row2 = document.getElementById("user2");
            let row3 = document.getElementById("user3");
            let row4 = document.getElementById("user4");
            let row5 = document.getElementById("user5");


            for (let [key, value] of calenderMap.entries()) {

                let u1 = user1;
                let u2 = user2;
                let u3 = user3;
                let u4 = user4;
                let u5 = user5;
                let time = new Date(key);
                let tag = time.getDate();
                let mapping = value.entries();
                let a = [];
                let b = [];
                let c = [];
                let d = [];
                let dd = [];

                for (let [user, termin] of mapping) {

                    function pushItems(users) {

                        termin.forEach((val, key) => {
                            let appointment = termin[key].description;
                            let identifier = termin[key].id.id;
                            let object = {meet: appointment, nr: identifier};
                            users.push(object)
                        })
                    }

                    if (user === u1) {
                        pushItems(a)
                    }
                    if (user === u2) {
                        pushItems(b)
                    }
                    if (user === u3) {
                        pushItems(c)
                    }
                    if (user === u4) {
                        pushItems(d)
                    }
                    if (user === u5) {
                        pushItems(dd)
                    }
                }


                timeArray.push(tag);

                let date = new Date();
                let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                let today = new Date(firstDay);
                let firstOfMonth = today.getDate();
                let firstEntry = timeArray[0];
                let firstEmptyFields = firstEntry - firstOfMonth;
                let currentDate = timeArray[timeArray.length - 2];
                let nextDate = timeArray[timeArray.length - 1];
                let diffTage = nextDate - currentDate;

                if (timeArray > 0) {
                    fillIn(firstEmptyFields)
                }


                if (diffTage > 1) {

                    for (let x = 1; x < diffTage; x++) {
                        let element = createField("", "");
                        row1.appendChild(element);
                        let element1 = createField("", "");
                        row2.appendChild(element1);
                        let element2 = createField("", "");
                        row3.appendChild(element2);
                        let element3 = createField("", "");
                        row4.appendChild(element3)
                        let element4 = createField("", "");
                        row5.appendChild(element4)
                    }
                }


                let a2 = a.map(function (e) {
                    return e.nr
                });
                let b2 = b.map(function (e) {
                    return e.nr
                });
                let c2 = c.map(function (e) {
                    return e.nr
                });
                let d2 = d.map(function (e) {
                    return e.nr
                });
                let dd2 = dd.map(function (e) {
                    return e.nr
                });

                let element = createField(a, a2);
                row1.appendChild(element);
                let element1 = createField(b, b2);
                row2.appendChild(element1);
                let element2 = createField(c, c2);
                row3.appendChild(element2);
                let element3 = createField(d, d2);
                row4.appendChild(element3);
                let element4 = createField(dd, dd2);
                row5.appendChild(element4);
            }

            let lastEntry = timeArray.pop();
            let fillUp = lastEnd - lastEntry;

            if (calenderMap.size === 0) {
                fillIn(lastEnd)
            }


            fillIn(fillUp);

            function createField(data, id) {

                const element = document.createElement("li");
                let button = document.createElement("button");
                button.classList.add("button");
                button.setAttribute("id", id);
                button.innerText = "Löschen";
                button.onclick = function() {

                    view.deleteAppointment(id)
                };

                if (button.id === ""){
                    button.style.display = "none"
                }
                else {
                    let a = [];
                    for (let x =0; x < data.length; x++){

                        a.push(data[x].meet + "\n");
                    }

                    element.innerText = a.join("");
                    element.appendChild(button);
                    button.id = id
                }
                return element
            }

            function fillIn(input) {

                for (let x = 0; x < input; x++) {

                    let element = createField("", "");
                    row1.appendChild(element);
                    let element1 = createField( "", "");
                    row2.appendChild(element1);
                    let element2 = createField("", "");
                    row3.appendChild(element2);
                    let element3 = createField("", "");
                    row4.appendChild(element3);
                    let element4 = createField("", "");
                    row5.appendChild(element4)
                }
            }

        }.bind({mapper: this.mapper, view: this.view});

        const fetch = this.view.showFamilyCalendar(monat, year);
        await fetch.then(fetchData);
    }

    saveUser(button) {

        const fetch = this.view.listUser();
        const view = this.view;

        const saveUser = async function saveUsr() {
            let arr = [];
            let isNew = false;
            let event = {};
            let newUser = document.getElementById("newUser").value;

            await fetch.then(data =>{

                let names = data.map(x => Object.values(x));
                let set = new Set();
                names.map(x => set.add(x.toString()));
                arr = Array.from(set);

                let idx = arr.indexOf(newUser);

                if(newUser === ""){
                    alert("Kein User erfasst!")
                } else if(idx !== -1){
                    alert("User bereits vorhanden!")
                }else if(newUser.length >10){
                    alert("Maximal 10 Zeichen erlaubt!")
                }else {isNew = true}

                if(isNew){

                    event.firstname = newUser;
                    event.appointment = "";
                    event.eventdate = "0000-00-00";
                    view.addNewAppointment(event);
                    location.reload()
                }
            });
        };

        button.addEventListener('click',saveUser);
    }

    deleteUser(button){

        button.addEventListener('click', () => {

            let choosenOne = document.getElementById("selectUser").value;
            this.view.deleteUser(choosenOne);
            document.getElementById("userModal").classList.toggle("hide");
            location.reload()
        })
    }

    showModal(button){

        let view = this.view;
        let mapper = this.mapper;

        button.addEventListener('click', async ()=> {

            let element = document.getElementById("modal");
            element.classList.toggle("hide");

            const fetch = view.listUser();
            const users = await fetch;
            const set = mapper.eachUser(users);

            let lstName = document.getElementById("person");
            let allUser = document.createElement("OPTION");

            allUser.textContent = "Für alle User";
            lstName.options.add(allUser);

            set.forEach(function (item) {
                let lstOption = document.createElement("OPTION");
                lstName.options.add(lstOption);
                lstOption.textContent = item;
                lstOption.nodeValue = item;
                lstName.add(lstOption);
            })
        })
    }


    userModal(button) {
        let view = this.view;
        let mapper = this.mapper;

        button.addEventListener("click", async () => {

            let element = document.getElementById("userModal");
            element.classList.toggle("hide");

            const fetch = view.listUser();
            const users = await fetch;
            const set = mapper.eachUser(users);

            let lstName = document.getElementById("selectUser");
            let selUser = document.createElement("OPTION");

            selUser.textContent = "User wählen:";
            lstName.options.add(selUser);

            set.forEach(function (item) {
                let lstOption = document.createElement("OPTION");
                lstName.options.add(lstOption);
                lstOption.textContent = item;
                lstOption.nodeValue = item;
                lstName.add(lstOption);
            })
        })
    }


    removeCalender() {
        let row1 = document.getElementById("user1");
        row1.innerText = "";
        let row2 = document.getElementById("user2");
        row2.innerText = "";
        let row3 = document.getElementById("user3");
        row3.innerText = "";
        let row4 = document.getElementById("user4");
        row4.innerText = "";
        let row5 = document.getElementById("user5");
        row5.innerText = "";
    }
}
