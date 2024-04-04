import React , { useState } from 'react'
import styles from './inputTask.module.scss'

type Params = {
    id: string,
    title: string
}

interface InputTaskProps {
    id: string,
    title: string,
    onDane: (id: string) => void;
    onEdited: (data: Params) => void;
    onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
    id,
    title,
    onEdited,
    onRemoved,
    onDane,
}) => {

    const [checked, setChecked] = useState(false);
    const [isEditedMode, setIsEditedMode] = useState(false);
    const [inputValue, setInputValue] = useState(title);


    return (
            <div className={styles.inputTask}>
               <label 
               className={styles.inputTaskLabel}
               >
                   <input
                       className={styles.inputTaskCheckbox}
                       type="checkbox"
                       disabled={isEditedMode}
                       id="task"
                       checked={checked}
                       onChange={() => {
                           setChecked(!checked);
                           onDane(id);
                       }}
                   />

    
                   {isEditedMode ? (
                       <input
                           className={styles.inputTaskInput}
                           type="text"
                           value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                           onKeyDown={(e) => {
                               if(e.key === 'Enter') {
                                   onEdited({id, title: inputValue});
                                   setIsEditedMode(false);
                               }
                           }}
                       />
                   ) : (
                       <p
                           className={styles.inputTaskTitle}
                       >
                           {title}
                       </p>
                   )}
                   
               </label>

              <div>
             {isEditedMode ? (
                   <button
                       className={styles.inputTaskSave}
                       onClick={() => {
                           onEdited({id, title: inputValue});
                           setIsEditedMode(false);
                       }}
                   >
                       
                   </button>
               ) : (
                   <button
                       className={styles.inputTaskEdit}
                       onClick={() => setIsEditedMode(true)}
                   >
                       
                   </button>
               )}

               <button
                   className={styles.inputTaskRemove}
                   onClick={() => {
                    if(window.confirm('Are you sure?')) {
                        onRemoved(id);
                    }
                   }
                }
               >
                  
               </button>
              </div>
            </div>
 
    )
}