import router from "./router";

export default {
    user: null,
    RegisteredUser: [],
    setUser(user) {
        this.user = user
    },
    getUser(user) {
        return user
    },
    register(username, password, firstname, lastname, email, confirmpassword) {
        if (username == '' || password == '' || firstname == '' || lastname == '' || email == '' || password != confirmpassword) {
            router.push("/register")
        } else {
            this.RegisteredUser.push({
                Username: username,
                Password: password,
                Firstname: firstname,
                Lastname: lastname,
                Email: email
            });
            router.push("/login");
        }
    },
    login(username, password) {
        for (let i = 0; i < this.RegisteredUser.length; i++) {
            if (this.RegisteredUser[i].Username === username && this.RegisteredUser[i].Password === password) {
                return this.RegisteredUser[i]
            }
        }
        return null;
    },
    logout() {
        this.user = null,
            router.push('/login')
    },
    saveInfo(fname, lname, uname, email) {
        sessionStorage.setItem("First name", fname),
            sessionStorage.setItem("Last name", lname),
            sessionStorage.setItem("Username", uname),
            sessionStorage.setItem("Email", email),
            router.push('/userinfo');
    }
}