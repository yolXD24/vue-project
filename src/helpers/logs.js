export default {
    name: "Logs",
    logs: {
        user: null,
        activities: []
    },
    addLogActivity(date, activity, status) {
        this.logs.activities.push({
            activity: activity,
            status: status,
            date: date
        })
    }
}