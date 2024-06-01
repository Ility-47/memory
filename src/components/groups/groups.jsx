import s from './groups.module.css'
import { groups } from '../../state/state'
import { useState } from 'react'

const Group = ({logo, name}) =>{
    return(
        <div className={s.group}>
            <img src={logo} alt="" className={s.group__logo}/>
            <div className={s.group__info}>
                <h5 className={s.group__name}>{name}</h5> 
                <div className={s.group__state}>Открытое сообщество</div>
                <div className={s.group__quant}>Количество участников</div>
            </div>
            
        </div>
    )
}

const Groups = () => {
    const [isAddGroup, getAddGroup] = useState(false)
    const handleAddGroup = () =>{
        getAddGroup(true)
    }
    return(
        <div className={s.groups__container}>
            <h1 className='title'>Мои группы</h1>
            <div className={s.groups__new}></div>
            <div className={s.groups}>
                <div className={s.groups__filters}>
                    <select name="" id="">
                        <option value="">По новизне</option>
                        <option value="">По кол-ву участников</option>
                        <option value="">По кол-ву медиа</option>
                    </select>
                    {!isAddGroup &&
                        <button className={s.createGroup} onClick={handleAddGroup}>Создать группу</button>
                    }
                </div>
                {isAddGroup && 
                <div className={s.create}>
                    <h4>Добавьте название для группы</h4>
                    <input type="text" />

                    <input type="file" />

                </div>
                }
                <div className={s.groups__wrapper}>
                    {groups.map((item, index) => (
                        <Group logo={item.photo} key={index} name={item.name}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Groups