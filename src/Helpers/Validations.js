export const Validations = {
    required: {
        regex: "(^[ \\t\\n]*$)",
        message: "Can't be empty"
    },
    letters: {
        regex: "([^ a-zA-Z])",
        message: "Only letters available"
    },
    email: {
        regex: '^(([^<>()[\\]\\.,;:/\\s@"]+(\\.[^<>()[/\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
        message: "Invalid email"
    },
    testEmail: {
        regex: 'test|example|sample',
        message: "This email is not acceptable"
    }
}