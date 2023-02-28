// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, starAppoint} = props
  const {id, title, date, isStarred} = appointmentDetails
  const formattedDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''

  const onClickStar = () => {
    starAppoint(id)
  }

  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment-item-container">
      <div className="title-date">
        <p>{title}</p>
        <p>Date:{formattedDate}</p>
      </div>
      <button
        type="button"
        className="button1"
        onClick={onClickStar}
        data-testid="star"
      >
        <img src={`${imgUrl}`} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
