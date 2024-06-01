import s from './gallery.module.css'
import { CalendarFiltr } from '../calendar/calendar'
import {memory} from '../../state/state'
import { useState } from 'react'
import {
    Link,
  } from 'react-router-dom';

const GalleryFiltr = () =>{
    return (
        <div className={s.gallery__filtrs__wrapper}>
            <h2>Фильтры</h2>
            <div className={s.filters}>
                <CalendarFiltr />
            </div>
        </div>
    )
}

const GalleryCard = ({photo, name, description, onClick}) =>{
    let descriptionStr = description
    if (description.length > 100) {
        descriptionStr = description.split(' ').slice(0, 10).join(' ') + '...';
    }
    return(
        <div onClick={onClick} className={s.gallery__item}>
            <img src={photo} alt="" />
            <h3 className={s.gallery__item__name}>{name}</h3>
            <p className={s.gallery__item__description}>
                {descriptionStr}
            </p>
        </div>
    )
}


const Gallery = () =>{
    const [selectedCardId, setSelectedCardId] = useState(null);
    
    const handleCardClick = (cardId) => {
        setSelectedCardId(cardId);
        console.log(cardId)
    };


    return(
        <div className={s.container}>
            <h1 className='title' onClick={console.log(memory)}>Мои воспоминания</h1>
            <GalleryFiltr key={1488} />
            <div className={s.gallery__media}>
               {memory.map((item, index) =>(
                <Link to={`/GalleryItem/${item.id}`} key={index}>   
                  <GalleryCard onClick={() => handleCardClick(item.id)}   photo={item.photo[0]} name={item.name} description={item.description}/>    
                </Link>
               ))}
            </div>
        </div>
    )
}

export default Gallery