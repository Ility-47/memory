import React, {useState} from 'react';
import s from './calendar.module.css'

export const CalendarFiltr = ({ onChange }) =>{
    //логика для списка с годом
    let year = [],
        curentYear = new Date().getFullYear();
    
    for (let i = 1981; i < curentYear + 1; i++) {
        year[i] = i
    }

    //логика для списка с месяцами
    let month = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ]

    const handleChange = (event) => {
        onChange(event.target.value) // callback-функция
    }

    const lastYear = year[year.length - 1]

    return(
        <div className={s.filtrs}>
            <select  name="" id="year" defaultValue={lastYear}>
                {year.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
            <select className={s.month} name="" id="month" onChange={handleChange}>
                {month.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
        </div>
    )
}



const CalendarItem = ({children}) =>{
    return(
        <div className={s.calendar__item}>{children}</div>
    )
}

const CalendarTable = ({ value }) =>{
    let day = [],
        selectedValue = value,
        counter = 0
    
    if (selectedValue === "Январь" || selectedValue === "Март" || selectedValue === "май" ||
        selectedValue === "Июль" || selectedValue === "Август" || selectedValue === "Октябрь" || selectedValue === "Декабрь") {
        counter = 31
    } else if (selectedValue === "Февраль") {
        counter = 28
    } else {
        counter = 30
    }
    for (let i = 0; i < counter; i++) {
        day[i] = i + 1;
    }

    return(
        <div className={s.calendar}>
                {day.map((item, index) => (
                    <CalendarItem key={index}>{item}</CalendarItem>
                ))}
        </div>
    )
}

const Calendar = () => {
    const [value, setSelectedValue] = useState('');
    const handleChange = (value) => {
        setSelectedValue(value);
    };
    return(
        <div className={s.wrapper}>
            <h1 className='title'>Календарь</h1>
            <div className={s.calendar__wrapper}>
                <CalendarFiltr onChange={handleChange} />
                <CalendarTable value={value} />
            </div>
        </div>
    )
}

export default Calendar;

//модальное окно react portal