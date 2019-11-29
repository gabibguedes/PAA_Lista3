export class Activity{
    constructor(
        name = '',
        executionTime = null,
        deliveryTime = null,
        id = 0
    ){
        this.name = name;
        this.executionTime = executionTime;
        this.deliveryTime = deliveryTime;
        this.realDeliveryTime = null;
        this.id = id;
        this.lateness = 0;
    }
}

function buildTime( date ){
    let hour24 = date.getHours();
    let hour12 = hour24 > 12 ? hour24 - 12 : hour24;
    let minutes = date.getMinutes()
    let ampm = hour24 >= 12 ? 'pm' : 'am'

    return{
        formatted12: hour12.toString() + ":" + minutes.toString() + " " + ampm,
        formatted24: hour24.toString() + ":" + minutes.toString(),
        formattedSimple: hour24.toString() + ":" + minutes.toString(),
        hour: hour24,
        hour12: hour12,
        meridiem: ampm,
        minute: minutes
    }
};

function addZero(min){
    if(min < 10){
        return "0" + min.toString()
    }else{
        return min.toString()
    }
}

function addTime(hours, time){
    console.log('h=>',hours);
    console.log('t=>',time);
    
    let hour24 = parseInt(time.hour, 10) + parseInt(hours, 10);
    console.log(hour24);
    
    let hour12 = hour24 > 12 ? hour24 - 12 : hour24;
    console.log(hour12);
    
    let ampm = hour24 >= 12 ? 'pm' : 'am';
    return {
        hour: hour24,
        hour12: hour12,
        meridiem: ampm,
        formatted12: hour12.toString() + ":" + addZero(time.minute) + " " + ampm,
        formatted24: hour24.toString() + ":" + addZero(time.minute),
        minute: time.minute
    }
}

export function minimum_lateness(arr){
    arr = sortTimes(arr);
    let inicialTime = buildTime(new Date());
    let a = buildTime(new Date());
    let b = addTime(3, a);
    let time = inicialTime;

    arr.forEach(e => {
        time = addTime(e.executionTime, time);
        e.realDeliveryTime = time;
        let latenessH = e.realDeliveryTime.hour - e.deliveryTime.hour;
        let latenessM = e.realDeliveryTime.minute - e.deliveryTime.minute;

        if(latenessH >= 0){
            e.lateness = latenessH.toString() + "h " + latenessM.toString() + "min";
        }else{
            e.lateness = "0h";
        }
    });
    return arr;
}

function sortTimes(arr){
    arr.sort(function compareTimes(a, b){
        if(a.deliveryTime.hour > b.deliveryTime.hour){
            return 1;
        } else if (b.deliveryTime.hour > a.deliveryTime.hour){
            return -1;
        }else{
            if(a.deliveryTime.minute > b.deliveryTime.minute){
                return 1;
            }else{
                return -1;
            }
        }
    });
    return arr;
}