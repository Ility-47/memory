import s from './add.module.css'
import { useState, useRef } from 'react';
import {memory} from '../../state/state'

const AddZone =  ({onChange, selectValue}) =>{
    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])
    const [base64Array, setBase64Array] = useState([]);
    const [selectedFiles, setSelectedFile] = useState([]);

    const fileReader = new FileReader()
    fileReader.onloadend = (event) =>{
        //setImageURL(fileReader.result)
        imageURL.map(item => {
            const base64String = item;
            setBase64Array(base64String);
            onChange(base64String)
        })
        
    }

    let results = []
    const handleFileChange = async (event) => {
        //для вывода названия в блок
        const filesArray = Array.from(event.target.files); // Преобразуем FileList в массив
        setSelectedFile(filesArray);
        try {
            results = await loadMultipleFiles(filesArray);
        } catch (error) {
            console.error(error);
        }
        setImageURL(results)                
        onChange(results)
        };
        
        function loadMultipleFiles(files) {
          const promises = [];
        
          files.forEach(file => {
            promises.push(readFile(file));
          });
        
          return Promise.all(promises);
        }
        
        function readFile(file) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
        
            reader.onload = () => {
              const base64String = reader.result;
              resolve(base64String);
            };
        
            reader.onerror = () => {
              reject(reader.error);
            };
        
            reader.readAsDataURL(file); 
          });
        }

    return(
        <div className={s.zoneContainer}>
            <div className={s.zone} >
                <input 
                    multiple 
                    type="file" 
                    className={s.fileOpen} 
                    onChange={handleFileChange}
               />
                <i className="fa-solid fa-file-import"></i>
                <h4>Загрузите свои файлы</h4>
            </div>
            <div className={s.zoneUploaded}>
                {selectedFiles.length > 0 && selectValue &&(
                    selectedFiles.map((file, index) => (
                        <div className={s.zoneFile} key={index}>
                            <img src={imageURL[index]} alt=""/>
                            <h3 className={s.fileName}>{file.name}</h3>
                        </div>
                    ))                    
                )} 
            </div>
        </div>
    )
}

const AddParams = ({value, onChange}) =>{
    const refInput = useRef()
    const refTextarea = useRef()
    const [isSelectImage, setSelectImage] = useState(false)
    const [isInputValue, setInputValue] = useState('')
    const [isInputLimit, setInputLimit] = useState(false)
    const [isTextareaValue, setTextareaValue] = useState('')
    const [isTextareaLimit, setTextareaLimit] = useState(false)

    const handleInput = (event) =>{
        setInputValue(event.target.value)
        if(isInputValue.length + 1 >= 50){
            setInputLimit(true)
        }else{
            setInputLimit(false)
        }
    }
    const handleTextarea = (event) =>{
        setTextareaValue(event.target.value)
        if(isTextareaValue.length + 1 >= 200){
            setTextareaLimit(true)
        }else{
            setTextareaLimit(false)
        }
    }

    const onClickSend = (e) =>{
        let photoValue = [], videoValue = []
        value.map(item  => {
            if(!(item.indexOf("data:video"))){
                videoValue.push(item)
                console.log('видева')
            } else {
                photoValue.push(item)
                console.log('фотова')
            }    
        })

        
       
        const newMem = {
            id:memory.length + 1,
            name:isInputValue,
            description:isTextareaValue,
            photo: photoValue,
            video: videoValue,
        }
        e.preventDefault()
        refInput.current.value = '' //стираем текст из инпута
        refTextarea.current.value = '' //стираем текст из текстареа
        onChange(false)
        memory.push(newMem)
    }

    //классы
    const cancelBtn = s.paramsBtn + " " + s.cancelBtn
    const sendBtn = s.paramsBtn + " " + s.sendBtn

    return(
        <div className={s.params}>
            <h4>Введите название мероприятия</h4>
            <div className={s.params__block__name}>   
                <input 
                    ref={refInput} 
                    id='inputName' 
                    type="text" 
                    placeholder='День рождения' 
                    style={{ border: isInputLimit ? '2px solid red' : '1px solid #cacac1' }} 
                    maxLength='50' 
                    className={s.paramsName} 
                    onChange={handleInput} 
                />
                <div className={s.counter}>{isInputValue.length}/50</div>
            </div>
            <h4>Введите описание мероприятия(необязательно)</h4>
            <div className={s.params__block__description}>                
                <textarea
                    ref={refTextarea}
                    type="text" 
                    placeholder='Тот самый день рождения когда...' 
                    style={{ border: isTextareaLimit ? '2px solid red' : '1px solid #cacac1' }} 
                    maxLength='200' 
                    onChange={handleTextarea}
                />
                <div className={s.counter}>{isTextareaValue.length}/200</div>
            </div>
            <div className={s.buttons}>
                <button className={cancelBtn}>Отмена</button>
                <button className={sendBtn} onClick={onClickSend}>Создать</button>
            </div>
        </div>
    )
}

const Add = () =>{
    const [value, setValue] = useState([])
    const handleChange = (value) => {
        setValue(value)
    }
    const [isSelectValue, setSelectValue] = useState(true)
    const handleSelectValue = (value) => {
        setSelectValue(value)
    }
    return(
        <div className={s.wrapper}>
            <h1 className='title'>Загружайте свои медиа-файлы</h1>
            <AddZone onChange={handleChange} selectValue={isSelectValue}/>
            <AddParams value={value} onChange={handleSelectValue} />
        </div>
    )
}

export default Add