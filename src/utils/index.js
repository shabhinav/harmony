export const dateFormatter = (date) => {
    let hour = new Date(date).getHours()
    let min = new Date(date).getMinutes()
    let sec = new Date(date).getSeconds()

    let time = `${hour===0?'00':hour}:${min}:${sec} ${hour>12?'pm':'am'}`
    return time
}