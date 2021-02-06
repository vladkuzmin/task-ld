import React from 'react';
import { Validations } from '../Helpers/Validations';
import Chevron from '../Images/Chevron.svg';

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
        if (!errors) return ''
        return errors.length > 0  ? 'is-error' : ''
    }

    const getErrors = (errors) => {
        if (!errors) return null
        return (
            <ul className="form__input__errors">
                { errors.map((err, i) => {return (
                    <li key={i}>{ err }</li>
                )})}
            </ul>
        )
    }

    return (

        <>    
            
            { !submitted ? 
                <form onSubmit={ handleSubmit } className="form">
                        
                    <div className={`form__input -col ${classError(inputs.name.errors)}`}>
                        <label>
                            <span>Name</span>
                            <input 
                                name="name"
                                type="text"
                                value = { inputs.name.value }
                                onChange = { handleInput }
                                placeholder="Your name"
                            />
                        </label>
                        { getErrors(inputs.name.errors) }
                    </div>
                    
                    <div className={`form__input -col ${classError(inputs.email.errors)}`}>
                        <label>
                            <span>Email</span>
                            <input 
                                name="email"
                                type="text"
                                value = { inputs.email.value }
                                onChange = { handleInput }
                                placeholder="Your email"
                            />
                        </label>
                        { getErrors(inputs.email.errors) }
                    </div>
                    
                    <div className={`form__input ${classError(inputs.message.errors)}`}>
                        <label>
                            <span>Text message</span>
                            <textarea
                                name="message"
                                value = { inputs.message.value }
                                onChange = { handleInput }
                                placeholder="Your message"
                            ></textarea>
                        </label>
                        { getErrors(inputs.message.errors) }
                    </div>

                    <button type="submit" class="form__input _submit">
                        <span>Send Message</span>
                        <img src={ Chevron } alt=""/>
                    </button>

                </form>
                : <div className="form__message">Thank you for your message</div>
            }

        </>
        
    )
}

export default Form