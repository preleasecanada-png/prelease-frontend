import { useContext, useEffect } from 'react';
import { CreateApiContext } from '../ContextApi/CreateApiContext';

const MainHeading = () => {
    const { locale } = useContext(CreateApiContext);
    useEffect(() => {
        const words = document.querySelectorAll('.word');
        let index = 0;

        const changeWord = () => {
            words[index].classList.remove('visible');
            index = (index + 1) % words.length;
            words[index].classList.add('visible');
        };

        const interval = setInterval(changeWord, 2000); // Change word every 2 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <h1 className="Mainheading text" style={{ flexDirection: 'column', gap: '0px', alignItems: 'center', textAlign: 'center' }}>
            <div className='mainp' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                <img src="/images/half_leaf.png" alt="" style={{ height: '80px' }} />
                <p style={{ margin: 0 }}>{locale?.home?.find_your_perfect_place_to} </p>
            </div>
            <div className='change_text' style={{ position: 'relative', width: '100%', height: '1.2em', marginTop: '0px' }}>
                <span className="word visible wisteria">{locale?.home?.arriving_soon}</span>
                <span className="word belize">{locale?.home?.already_residing}</span>
                <span className="word pomegranate">{locale?.home?.a_newcomer}</span>
                <span className="word pomegranate">{locale?.home?.a_current_resident}</span>
            </div>
        </h1>
    );
};

export default MainHeading;
