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
        <h1 className="Mainheading text">
            <div className='mainp'>
                <img src="/images/half_leaf.png" alt="" />
                <p>{locale?.home?.find_your_perfect_place_to} </p>
            </div>
            <span className='change_text'>
                <span className="word visible wisteria">Adventures</span>
                <span className="word belize">{locale?.home?.experiences}</span>
                <span className="word pomegranate">{locale?.home?.hospitality}</span>
                <span className="word pomegranate">Culture</span>
            </span>
        </h1>
    );
};

export default MainHeading;
