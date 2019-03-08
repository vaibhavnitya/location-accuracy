// get distance between two locations
function getDistanceBetweenTwoLocations (location1, location2) {
    if (!location1 || !location2) {
        return 0
    }

    const {lat: lat1, lon: lon1} = location1
    const {lat: lat2, lon: lon2} = location2

    if (lat1 === lat2 && lon1 === lon2) {
        return 0
    }

    const R = 6371 * 1000 // Metres
    var dLat = toRad(lat2-lat1)
    var dLon = toRad(lon2-lon1)
    var lat1 = toRad(lat1)
    var lat2 = toRad(lat2)

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2) 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) 
    var d = R * c
    return d
}

// get time difference between the two timestamps in seconds
function getTimeDifference (time1, time2) {
    if (!time1 || !time2) {
        return 0
    }

    const milis1 = new Date(time1).getTime()
    const milis2 = new Date(time2).getTime()

    if (milis1 === milis2) {
        return 0
    }

    return Math.abs(milis1 - milis2) / 1000
}

// remove incorrect location from locations array
function removeIncorrectLocation (locations) {
    
}

const locationAccuracy = (function locationAccuracy () {
    this.hasConfiguration = false
    this.thresholdSpeed = null
    this.numOfLocations = 5
    this.locationArray = []

    this.setConfigurations = (thresholdDistance, thresholdTime, numOfLocations) => {
        if (!thresholdDistance || !thresholdTime) {
            throw ('Distance and time have to be provided')
        }

        this.thresholdSpeed = thresholdDistance / thresholdTime
        this.numOfLocations = numOfLocations
        this.hasConfiguration = true

        return true
    }


    this.getLocationAccuracy = (locationWithTime, refresh) => {

        if (!this.hasConfiguration) {
            throw ('Configurations not set')
        }

        // refresh the location analysis, saying it is the first location to consider: start of trip
        if (refresh || !this.locationArray.length) {
            this.locationArray = []
            locationWithTime ? locationArray.push(locationWithTime) : null
            return true
        }

        // const iterations = this.locationArray.length > numOfLocations ? numOfLocations : this.locationArray.length

        const prevLocationTime = this.locationArray[this.locationArray.length - 1]
        const timeDifference = getTimeDifference(locationWithTime.time, prevLocationTime.time)
        const comparableThresholdDistance = timeDifference * this.thresholdSpeed
        const distance = getDistanceBetweenTwoLocations(locationWithTime.location, prevLocationTime.location)

        if (distance > comparableThresholdDistance) {
            return false
        }

    }
})()
