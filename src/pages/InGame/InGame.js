import { useState } from 'react';

import styles from './InGame.css'
import MyButton from '../../components/MyButton/MyButton';

function InGame()
{
    
    const [gamePIN, setGamePIN] = useState('');

    function handleInputGamePIN(value)
    {
        setGamePIN(value);
    }

    return (
        <div className={styles.enterGameContainer}>
            <div className={styles.header}>
                <MyButton
                            text='Languague'
                            size='small'
                            color='blue'
                        />
            </div>

            <div className={styles.content}>
                <img src='https://assets-cdn.kahoot.it/controller/v2/assets/icn_kahoot_logo.58b66a21.svg'></img>
                <form action='#'>
                    <input type='text' placeholder='Game PIN' value={gamePIN} onChange={e => handleInputGamePIN(e.target.value)}></input>
                    <div>
                        <MyButton
                            text='Enter'
                            size='medium'
                            color='black'
                        />
                    </div>
                    
                </form>
            </div>

            <div className={styles.footer}>
                <div className={styles.footerContent}>
                    <p>Create your own Kahoot for FREE at &nbsp;</p>
                    <a>kahoot.com</a>
                </div>
                <div className={styles.footerContent}>
                    <a>Terms</a>
                    <p>&nbsp; | &nbsp;</p>
                    <a>Privacy</a>
                </div>
            </div>
        </div>
    )
}

export default InGame;