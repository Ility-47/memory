import { useState, useRef } from 'react';
import s from './registration.module.css'
import {users} from '../../state/state.js'
import ModalProfile from '../modal/modalProfile';

const HeaderLk = () =>{
    const [isModal, setModal] = useState(false)
    const [isName, setName] = useState('')
    const [isStatus, setStatus] = useState('')
    const [isCity, setCity] = useState('')
    const handleName = (event) => {
        setName(event.target.value)
    }
    const handleStatus = (event) => {
        setStatus(event.target.value)
    }
    const handleCity = (event) => {
        setCity(event.target.value)
    }
    let user = {}
    users.map(item=>{
        if(item.isLogin){
            user = item
        }
    })
    
    //суета для загрузки картинки
    const [image, setImage] = useState()
    const [imageURL, setImageURL] = useState()
    const [base64String, setBase64String] = useState('');
    const fileReader = new FileReader()
    fileReader.onloadend = (event) =>{
        setImageURL(fileReader.result)
        const base64String = event.target.result;
        setBase64String(base64String);
    }

    const [selectedFiles, setSelectedFile] = useState([]);
    const handleFileChange = (event) => {
        //для вывода названия в блок
        const filesArray = Array.from(event.target.files); // Преобразуем FileList в массив
        setSelectedFile(filesArray);
        //для получения ссылки
        event.preventDefault()
        if(event.target.files && event.target.files.length){
            const file = event.target.files[0]
            setImage(file)
            fileReader.readAsDataURL(file)
           // onChange(event.target.value) было так, но теперь не так, но пусть будет
        }
    }

    //модалка для редактирования профиля


        const openModal = () => {
            setModal(true)
        }
        const onClickCreate = () =>{
            users.map((item) => {
                if(item.isLogin){
                    item.name = isName
                    item.status = isStatus
                    item.from = isCity
                    item.logo = imageURL
                }
            })
            setModal(false)
        }

    return(
        <>
        <ModalProfile open={isModal}>
            <h2>Отредактируйте свой профиль</h2>
            <h4>Загрузите аватарку</h4>
            <input  
                    type="file"  
                    onChange={handleFileChange}
               />
            <h4>Изменить имя</h4>
            <input type="text" onChange={handleName}/>

            <h4>Добавить статус</h4>
            <input type="text" onChange={handleStatus}/>

            <h4>Добавить город</h4>
            <input type="text" onChange={handleCity}/>
            <div className={s.modal__btns}>
                <button onClick={() => setModal(false)}>Close</button>
                <button className='closeModal' onClick={onClickCreate}>Create</button>
            </div>
        </ModalProfile>
        <div className={s.profile__container}>
            <div className={s.profile}>
                <div className={s.profile__wrapper}>
                    <img src={user.logo} alt="" />
                    <div className={s.profile__info__text}>
                        <h4 className={s.profile__name}>{user.name}</h4>
                        <h5 className={s.profile__status}>{user.status}</h5>
                        <h6 className={s.profile__from}>{user.from}</h6>
                    </div>
                </div>   
                <button onClick={openModal}>Редактировать профиль</button>
            </div>
             <div className={s.ribbon__btns}>
                <div className={s.ribbon__btn}>Фото</div>
                <div className={s.ribbon__line}></div>
                <div className={s.ribbon__btn}>Видео</div>
            </div>
        </div>
        </>
    )
}


const Registr = () =>{
    const refName = useRef()
    const refLogin = useRef()
    const refPassword = useRef()
    const [isActive, setActive] = useState(false)
    const handleToggle = () =>{
        setActive(!isActive);
    }
    const [isName, setName] = useState('')
    const nameChange = (event) =>{
        setName(event.target.value);
    }
    const [isLogin, setLogin] = useState('')
    const loginChange = (event) =>{
        setLogin(event.target.value);
    }
    const [isPassword, setPassword] = useState('')
    const passwordChange = (event) =>{
        setPassword(event.target.value);
    }
    let userCheck = {
        login: isLogin,
        password: isPassword,
    }

    //useState для нормальной работы кнопки

    const [userIsLogin, setUserIsLogin] = useState(false)
    const userIsLoginClick = (e) =>{
        e.preventDefault()
        users.map((item) =>{
            if(item.login === userCheck.login && item.password === userCheck.password){      
                item.isLogin = true        
                setUserIsLogin(true);
            }
        })
        
    }


    // classes
    const classes1 = s.formContainer + " " + s.signUp
    const classes2 = s.formContainer + " " + s.signIn
    const classes3 = s.togglePanel + " " + s.toggleLeft
    const classes4 = s.togglePanel + " " + s.toggleRight
     
    //создание пользователя
    const onClickAddUser = (e) =>{
        users.map(item => {item.isLogin = false})
        const newUser = {
            id: users.length + 1,
            name: isName,
            clas: "user",
            login: isLogin, 
            password: isPassword,
            isLogin: true,
            status: "",
            from: "",
            logo: ""
        }
        e.preventDefault()
        refName.current.value = '' //стираем текст из инпута
        refLogin.current.value = '' //стираем текст из текстареа
        refPassword.current.value = '' //стираем текст из текстареа
        users.push(newUser)      
        setUserIsLogin(true);
        console.log(users)
    }


    console.log(userIsLogin)
    return(
        <div className={s.wrapper} id='wrapper'>
            {userIsLogin ?(                                                 
            <div className={`${s.container} ${isActive ? s.active : ""}`} id="container">
                <div className={classes1}>
                    <form>
                        <h1>Создайте аккаунт через</h1>
                        <div className={s.socialIcons}>
                            <a href="#" className={s.icon}>
                                <i className="fa-brands fa-google"></i>
                            </a>
                            <a href="#" className={s.icon}>
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" className={s.icon}>
                                <i className="fa-brands fa-github"></i>
                            </a>
                            <a href="#" className={s.icon}>
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span>
                            либо используйте почту
                        </span>
                        <input ref={refName} type="text" placeholder='Имя' onChange={nameChange}/>
                        <input ref={refLogin} type="login" placeholder='Почта или логин' onChange={loginChange}/>
                        <input ref={refPassword} type="password" placeholder='Пароль' onChange={passwordChange}/>
                        <button onClick={onClickAddUser}>Зарегистрироваться</button>
                    </form>
                </div>

                <div className={classes2}>
                    <form>
                        <h1>Войдите через</h1>
                        <div className={s.socialIcons}>
                            <a href="#" className={s.icon}>
                                <i className="fa-brands fa-google"></i>
                            </a>
                            <a href="#" className={s.icon}>
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" className={s.icon}>
                                <i className="fa-brands fa-github"></i>
                            </a>
                            <a href="#" className={s.icon}>
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span>
                            или используйте почту и пароль
                        </span>
                        <input type="text" placeholder='Почта или логин' onChange={loginChange} />
                        <input type="password" placeholder='Пароль' onChange={passwordChange} />
                        <a href="#">Забыли пароооь?</a>
                        <button onClick={userIsLoginClick}>Войти</button>
                    </form>
                </div>
                <div className={s.toggleContainer}>
                    <div className={s.toggle}>
                        <div className={classes3}>
                            <h1>Добро пожаловать!</h1>
                            <p>Введите свои личные данные, чтобы использовать все возможности сайта</p>
                            <button className={s.hidden} id="login" onClick={handleToggle}>Войти</button>
                        </div>
                        <div className={classes4}>
                            <h1>Привет друг!</h1>
                            <p>Зарегистрируйтесь, указав свои личные данные, чтобы использовать все возможности сайта</p>
                            <button className={s.hidden} id="register" onClick={handleToggle}>Зарегистрироваться</button>
                        </div>
                    </div>
                </div>
            </div>
            ): (
                <>
                    <div className={s.wrapper__lk}>
                        <HeaderLk />
                    </div>
               </>
            )}
        </div>
    )
}

export default Registr