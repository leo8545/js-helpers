const BaseHelpers = {
    // Convert mysql datetime into readable date
    prettifyDatetime: function(datetime, showTime = false) {
        const d = new Date(Date.parse(datetime.replace(/[-]/g,'/')))
        let r = `${d.toLocaleString('en-us', {month: "short", year: "numeric", day: "numeric"})}`
        return !showTime ? r : `${r} ${d.getHours().toString().length === 1 ? `0${d.getHours()}` : d.getHours()}:${d.getMinutes().toString().length === 1 ? `0${d.getMinutes()}` : d.getMinutes()} ${d.getHours() >= 12 ? 'PM' : 'AM'}`
    },
    getRandomNumber: function(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    shuffleArray: function(array) {
        return array.sort(() => Math.random() - 0.5);
    },
    getQueryParameter: function(url, key) {
        const params = new URLSearchParams(url);
        return params.get(key);
    },
    getOS: function() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/windows phone/i.test(userAgent)) {
            return "windows";
        }
        if (/android/i.test(userAgent)) {
            return "android";
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "ios";
        }
        return "unknown";
    },
    isIphone: function() {
        return this.getOS() === 'ios'
    },
    isAndroid: function() {
        return this.getOS() === 'android'
    },
    roundNumber: function(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    },
    prettifyMoneyUsingCommas: function(money) {
        return new Intl.NumberFormat().format(Math.round(money*10)/10);
    },
    prettifyMoney: function(n) {
        return Intl.NumberFormat('en', { notation: 'compact' }).format(n)
    },
    buildQueryFromObject: function(obj) {
        let str = [];
        for (let p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    },
    calculateDistanceBetweenLatLngs: function(lat1, lng1, lat2, lng2, unit = 'K') {
        lat1 = parseFloat(lat1)
        lng1 = parseFloat(lng1)
        lat2 = parseFloat(lat2)
        lng2 = parseFloat(lng2)
        // Convert from degrees to radians.
        Math.radians = function(degrees) {
            return degrees * Math.PI / 180;
        }
        // Convert from radians to degrees.
        Math.degrees = function(radians) {
            return radians * 180 / Math.PI;
        }
        const theta = lng1 - lng2;
        let distance = Math.sin(Math.radians(lat1)) * Math.sin(Math.radians(lat2)) + Math.cos(Math.radians(lat1)) * Math.cos(Math.radians(lat2)) * Math.cos((Math.radians(theta)))
        distance = Math.acos(distance)
        distance = Math.degrees(distance)
        let miles = distance * 60 * 1.1515;
        unit = unit.toUpperCase()
        if(unit === 'K') {
            return (miles * 1.609344)
        } else if (unit === 'N') {
            return (miles * 0.8684)
        }
        return miles
    },
    toTitleCase: function(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }
}