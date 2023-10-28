class Notification{
    constructor(uid, MCName, medicines, times, dateStart, dateEnd, everday) {
        this.dateEnd = dateEnd;
        this.dateStart = dateStart;
        this.uid = uid;
        this.MCName = MCName;
        this.medicines = medicines;
        this.times = times;
        this.everday = everday;
    }
}

export default Notification;
