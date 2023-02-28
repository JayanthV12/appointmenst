// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    nameInput: '',
    dateInput: '',
    isStarButton: false,
  }

  onCLickStarred = () => {
    this.setState(prevState => ({
      isStarButton: !prevState.isStarButton,
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isStarButton} = this.state

    if (isStarButton) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  onChangeName = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  onAddButton = event => {
    const {nameInput, dateInput} = this.state
    event.preventDefault()
    const newAppointment = {
      id: v4(),
      title: nameInput,
      date: dateInput,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      nameInput: '',
      dateInput: '',
    }))
  }

  starAppoint = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  render() {
    const {nameInput, dateInput, appointmentList, isStarButton} = this.state
    const filteredList = this.getFilteredAppointmentsList()
    return (
      <div className="bg-container">
        <div className="appointment-container-card">
          <div className="appointment-container">
            <form className="form-container" onSubmit={this.onAddButton}>
              <h1>Add Appointment</h1>
              <div className="title-container">
                <label htmlFor="titleEl">TITLE</label>
                <input
                  type="text"
                  id="titleEl"
                  onChange={this.onChangeName}
                  value={nameInput}
                  placeholder="Title"
                />
              </div>
              <div className="date-container">
                <label htmlFor="dateEl">DATE</label>
                <input
                  type="date"
                  id="dateEl"
                  onChange={this.onChangeDate}
                  value={dateInput}
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="separator" />
          <div className="heading-container">
            <h1>Appointments</h1>
            <button
              type="button"
              className="starred-button"
              onClick={this.onCLickStarred}
            >
              Starred
            </button>
          </div>
          <ul className="taken-appoints">
            {filteredList.map(each => (
              <AppointmentItem
                appointmentDetails={each}
                key={each.id}
                starAppoint={this.starAppoint}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
