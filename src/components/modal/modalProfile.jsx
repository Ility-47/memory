import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
const ModalProfile = ({children, open}) =>{
    const parametrs = useRef()
    useEffect(() => {
        if(open){
            parametrs.current.showModal()
        }else{
            parametrs.current.close()
        }
    }, [open])
    
    return createPortal(
        <dialog ref={parametrs}>{children}</dialog>,
        document.getElementById('modalProfile'),
    )
}
export default ModalProfile