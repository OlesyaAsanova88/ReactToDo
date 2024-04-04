import React, { useState } from 'react'
import styles from './inputPlus.module.scss'

interface InputPlusProps {
    onAdd: (title: string) => void
}

export const InputPlus: React.FC<InputPlusProps> = ({
    onAdd,
}) => {

    const [inputValue, setInputValue] = useState('');

    const onAddHandler = (e?: React.KeyboardEvent<HTMLInputElement>) => {

        console.log('onAddHandler');
        
        if(e && e.key !== 'Enter') return
            onAdd(inputValue);
            setInputValue('');   
    }
  
    return (
        
            <div className={styles.inputPlus}>
                <input type="text"
                placeholder="same tasks..." 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                className={styles.input} 
                onKeyDown={(e) => onAddHandler(e)}
                />
                <button 
                onClick={() => onAddHandler()} 
                className={styles.button}> 
                </button>
            </div>
 
    )
}