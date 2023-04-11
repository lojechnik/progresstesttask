import style from './style.module.css'
import logo from '../../assets/images/info.svg'

const Header: React.FC = () => {
    return (
        <header className={style.header}>
            <div className={style.header__inner}>
                <div className={style.header__title}>логотип</div>
                <img
                    className={style.header__info}
                    src={logo}
                />
            </div>
        </header>
    )
}

export default Header