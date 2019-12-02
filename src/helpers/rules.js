let rules = () => {
    return {
        required: value => !!value || "Required.",
        usernameRules: v => (v && v.length <= 10) || "Name must be less than 10 characters",
        min: v => (v && v.length >= 8) || "Min 8 characters",
        max: v => (v && v.length <= 20) || "Name must be less than 20 characters",
        nameRules: v => (/^[A-Z a-z]+$/.test(v)) || "This field must be letters only",
        emailRules: v => /.+@.+\..+/.test(v) || "E-mail must be valid",
        passwordRules: v => (v && v.length >= 8) || "Password must be more than 8 characters",
        ageRules: v => v >= 18 || "Must be in legal age"
    }
}

export { rules }