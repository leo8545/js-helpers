const BaseHelpers = {
    // Convert mysql datetime into readable date
    prettifyDatetime: function(datetime, showTime = false) {
        const d = new Date(Date.parse(datetime.replace(/[-]/g,'/')))
        let r = `${d.toLocaleString('en-us', {month: "short", year: "numeric", day: "numeric"})}`
        return !showTime ? r : `${r} ${d.getHours().toString().length === 1 ? `0${d.getHours()}` : d.getHours()}:${d.getMinutes().toString().length === 1 ? `0${d.getMinutes()}` : d.getMinutes()} ${d.getHours() >= 12 ? 'PM' : 'AM'}`
    }
}