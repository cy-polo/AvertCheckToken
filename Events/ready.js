module.exports = async(client) => {

await client.user.setPresence({
    activity: {
        name: `protect your tokens`
    }
})
}
