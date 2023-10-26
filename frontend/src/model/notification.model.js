// class Notification {
//     dateEnd;
//     dateStart;
//     Everyday;
//     MCName;
//     name;
//     quantity;
//     hour;
//     minute;
//     constructor(name, quantity, hour, minute, dateStart, dateEnd) {
//         this.DateEnd = dateEnd;
//         this.DateStart = dateStart;
//         this.name = name;
//         this.quantity = quantity;
//         this.hour = hour;
//         this.minute = minute;

//     }
// }
class Notification{
    dateEnd;
    dateStart;
    Everyday;
    MCName;
    constructor(MCName, medicines, times, dateStart, dateEnd) {
        this.DateEnd = dateEnd;
        this.DateStart = dateStart;
        this.MCName = MCName;
        this.medicines = medicines;
        this.quantity = quantity;
        this.time = times;

    }
}

export default Notification;
