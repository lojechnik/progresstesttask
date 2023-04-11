import { useEffect, useState, useMemo  } from 'react'
import style from './style.module.css'
import fire from '../../assets/images/fire.svg'
import arrow from '../../assets/images/arrow.svg'

interface IBonuses {
    currentQuantity: number
    dateBurning: string
    forBurningQuantity: number
    typeBonusName: string
}

const Bonuses: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const [bonuses, setBonuses] = useState<IBonuses>({
    currentQuantity: 0,
    dateBurning: '',
    forBurningQuantity: 0,
    typeBonusName: '',
  })

  const accessKey: string = process.env.REACT_APP_ACCESS_KEY || ''
  const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'AccessKey': accessKey,
  }
  const headers: HeadersInit = new Headers(requestHeaders)
  const getBonuses = () => {
    fetch(
      `http://84.201.188.117:5003/api/v3/ibonus/generalinfo/${accessToken}`, {
        headers,
      }
    )
      .then((response) => response.json())
      .then((value) => setBonuses(value.data))
      .catch((e) => console.log(e))
  }
  useEffect(() => getBonuses, [])

  const expiringDate = useMemo(() => {
    const date = new Date(bonuses.dateBurning)
    let month = (date.getMonth() + 1).toLocaleString()
    if (month.length === 1) month = `0${month}`
    const day = date.getDate().toLocaleString()

    return `${day}.${month}`
  }, [bonuses.dateBurning])

  return (
    <div className={style.bonuses}>
      <div className={style.bonuses__ellipse}>
        <div className={style.bonuses__left}>
          <div className={style.bonuses__title}>{bonuses.currentQuantity} бонусов</div>
          <div className={style.bonuses__loss}>
            <span>{expiringDate} сгорит</span>
            <img className={style.bonuses__fire} src={fire} />
            <span>{bonuses.forBurningQuantity} бонусов</span>
          </div>
        </div>
        <div className={style.bonuses__right}>
          <img className={style.bonuses__btn} src={arrow} />
        </div>
      </div>
    </div>
  )
}

export default Bonuses
