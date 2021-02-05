import React from 'react';
import './Form.scss';
import { Validations } from '../Helpers/Validations';

function Form() {

    const [inputs, setInputs] = React.useState({
        name: {
            value: '',
            validations: ['required', 'letters']
        },
        email: {
            value: '',
            validations: ['required', 'email', 'testEmail']
        },
        message: {
            value: '',
            validations: ['required']
        }
    })

    const [submitted, setSubmitted] = React.useState(false)
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const isErrors = handleValidations()

        if (!isErrors) {
            setSubmitted(true)
        }
    }

    const handleInput = (event) => {
        const items = { ...inputs } 
        const el = event.target
        items[el.name].value = el.value
        items[el.name].errors = []
        setInputs(items)
    }

    const handleValidations = () => {
        let isErrors = false
        const items = { ...inputs }
        Object.keys(items).map((item) => {
            const o = items[item]
            o.errors = []
            for (let i = 0; i < o.validations.length; i++) {
                const v = Validations[o.validations[i]]
                let regex = new RegExp(v.regex)

                if (o.validations[i] === 'email') {
                    if (!regex.test(o.value)) {
                        o.errors.push(v.message)
                        isErrors = true
                        break;
                    }    
                } else {
                    if (regex.test(o.value)) {
                        o.errors.push(v.message)
                        isErrors = true
                        break;
                    }
                }
            }
            return null
        })

        setInputs(items)

        return isErrors
    }

    const classError = (errors) => {
        if (!errors) return
        return errors.length > 0  ? 'is-error' : null
    }

    const getErrors = (errors) => {
        if (!errors) return null
        return (
            <ul className="errors">
                { errors.map((err, i) => {return (
                    <div key={i}>{ err }</div>
                )})}
            </ul>
        )
    }

    return (

        <>  

            
            
            {/* FORM */}

            <div className="form">
                { !submitted ? 
                    <form onSubmit={ handleSubmit }>
                        <div>
                            
                            <div className={`input ${classError(inputs.name.errors)}`}>
                                <label>
                                    <span>Name</span>
                                    <input 
                                        name="name"
                                        type="text"
                                        value = { inputs.name.value }
                                        onChange = { handleInput }
                                    />
                                </label>
                                { getErrors(inputs.name.errors) }
                            </div>
                            
                            <div className={`input ${classError(inputs.email.errors)}`}>
                                <label>
                                    <span>Email</span>
                                    <input 
                                        name="email"
                                        type="text"
                                        value = { inputs.email.value }
                                        onChange = { handleInput }
                                    />
                                </label>
                                { getErrors(inputs.email.errors) }
                            </div>
                            
                            <div className={`input ${classError(inputs.message.errors)}`}>
                                <label>
                                    <span>Text message</span>
                                    <textarea
                                        name="message"
                                        value = { inputs.message.value }
                                        onChange = { handleInput }
                                    ></textarea>
                                </label>
                                { getErrors(inputs.message.errors) }
                            </div>

                        </div>
                        <button type="submit">Submit</button>
                    </form>
                    : <div>Thank you for your message</div>
                }
            </div>

            {/* END form*/}
        
        </>
        
    )
}

export default Form