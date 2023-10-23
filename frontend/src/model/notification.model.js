class Notification {
    DateEnd;
    DateStart;
    Everyday;
    MCName;
    name;
    quantity;
    hour;
    minute;
    constructor(nam, quantity, hour, minute, DateStart, DateEnd) {
        this.DateEnd = DateEnd;
        this.DateStart = DateStart;
        this.name = name;
        this.quantity = quantity;
        this.hour = hour;
        this.minute = minute;

    }
}

export default Notification;
