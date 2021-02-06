import Form from './Components/Form';
import Logo from './Images/Logo.svg';
import Dots from './Images/Dots.svg';

function App() {
  return (
    <main>
      <div className="contacts__wrapper">
        
        <div className="dots">
          <img src={Dots} alt=""/>
          <img src={Dots} alt=""/>
        </div>

        <div className="contacts">
          <img src={ Logo } className="contacts__logo" alt=""/>
          <div className="contacts__desc">
            <h1 className="contacts__title">Get in touch</h1>
            <p className="contacts__paragraph -lg">
              Fill in this form and we'll get in touch soon!
              <br/>
              Alternatively, of you hate forms, please email us at <a href="mailto:...">hello@luckyduck.digital</a>
            </p>
          </div>
          <Form/>
        </div>
        
      </div>
    </main>
  );
}

export default App;
