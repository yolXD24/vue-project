let urls = () => {
    return {
        user_local_api: "http://localhost:4000/user",
        user_online_api: "http://172.16.3.12:4000/user",
        admin_local_api: "http://localhost:4000/admin",
        admin_online_api: "http://172.16.3.12:4000/admin",
    }
}

export { urls }