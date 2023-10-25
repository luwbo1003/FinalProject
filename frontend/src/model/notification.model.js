class Notification {
  dateEnd;
  dateStart;
  Everyday;
  MCName;
  name;
  quantity;
  hour;
  minute;
  constructor(name, quantity, hour, minute, dateStart, dateEnd) {
    this.DateEnd = dateEnd;
    this.DateStart = dateStart;
    this.name = name;
    this.quantity = quantity;
    this.hour = hour;
    this.minute = minute;
  }
}

export default Notification;
