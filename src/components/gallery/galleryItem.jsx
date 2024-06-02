import s from './gallery.module.css'
import {memory} from '../../state/state'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'


const ScrollLock = ({ isLocked }) => {
    useEffect(() => {
      const body = document.querySelector('body');
      
      if (isLocked) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = 'auto';
      }
      return () => {
        body.style.overflow = 'auto'; // Убираем блокировку скроллбара при размонтировании компонента
      };
    }, [isLocked]);
    return null;
  };

  
const GallerySlider = ({onClickCustom }) =>{
    const onClickClose = () =>{
        onClickCustom(false)   //работает не трожь
    }
    return(
        <div className={s.gallery__slider}>
            <div className={s.gallery__item__wrapper}>
                <div className={s.gallery__slider__close}><button onClick={onClickClose}><i className="fa-solid fa-xmark"></i></button></div>
                <div className={s.gallery__slider__item}>
                    <button className={s.slider__btn__prev}><i className="fa-solid fa-chevron-left"></i></button>
                    {memory.map((item) => (
                        item.photo.map((item1, index1) => (
                            <img src={item1} key={index1} alt="" />
                        ))
                    ))}
                    <button className={s.slider__btn__next}><i className="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
        </div>
    )
}
//фильтры для галереи фото/видео/все
const GalleryItemFiltr = ({onChange}) =>{
    const handleFiltr = (event) => {
        onChange(event.target.value) // callback-функция
    }
    return (
        <div className={s.gallery__filtrs}>
            <div className={s.filters}>
                <select name="" id="" className={s.filtersMedia} onChange={handleFiltr}>
                    <option value="Все вместе">
                        Всё вместе
                    </option>
                    <option value="Только фото">
                        Только фото
                    </option>
                    <option value="Только видео">
                        Только видео
                    </option>
                    
                </select>
            </div>
        </div>
    )
}

const GalleryItemMedia = ({value, id}) =>{
    const [isSlider, setSlider] = useState(false)
    const onClickSlider = () => { // открывает слайдер
        setSlider(true)
    }
    const onClickCloseSlider = () => { // закрывает слайдер
        setSlider(false)
    }
    let isPhoto = true, 
        isVideo = true
    if(value === "Только фото"){
        isPhoto = true
        isVideo = false
    }if(value === "Только видео"){
        isVideo = true
        isPhoto = false
    }
    if(value === "Все вместе"){
        isPhoto = true
        isVideo = true
    }
    return(
        <div className={s.gallery__container}>      
            
                {isPhoto && 
                    memory[id - 1].photo.map((item1, index1) =>(
                        <div style={{ backgroundImage: `url(${item1})` }} key={index1}></div>
                    ))     
                }
       
                {isVideo && 
                    memory[id - 1].video.map((item2, index2) =>(
                        <ReactPlayer 
                        url={item2} 
                        key={index2}  
                        playing={false}
                        controls={true}
                        width='100%'
                        height='100%'
                        ></ReactPlayer>    
                    ))     
                }
         
            {isSlider && <GallerySlider onClickCustom={onClickCloseSlider}/>}
            <ScrollLock isLocked={isSlider}/>
        </div>
    )
}

const GalleryItem = () => {
    const { id } = useParams();
    const [isFiltr, setFiltr] = useState('');
  
    const handleFiltr = (value) => {
      setFiltr(value);
    };
  
    return (
      <div className={s.container}>
        <h1 className={s.title}>{memory[Number(id)-1].name}</h1> 
        <GalleryItemFiltr onChange={handleFiltr} />
        <GalleryItemMedia id={id} value={isFiltr} />
      </div>
    );
  };

export default GalleryItem