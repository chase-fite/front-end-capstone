import React, { Component } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheckCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import APIManager from '../../modules/APIManager'
import './Workouts.css'

class WorkoutCard extends Component {
    state = {
        exercises: []
    }

    componentDidMount() {
        const tempArray = this.props.workout.exercises.map(x => x)
        this.setState({
            exercises: tempArray
        })
    }

    setActiveWorkout = () => {
        const loggedInUserId = Number(localStorage.getItem("credentials"))
        console.log("logged in user id", loggedInUserId)

        const date = new Date()
        date.toDateString()

        const newWorkout = {
            "userId": loggedInUserId,
            "workoutId": this.props.workout.id,
            "date": date,
            "active": true
        }

        APIManager.post(`completedWorkouts`, newWorkout)
        .then(() => {
            this.props.history.push(`/home`)
        })
    }

    render() {
        return (
            <Card className="workout-card border-primary mb-3">
                <Card.Header className="text-center">{this.props.workout.name}
                </Card.Header>
                <Container className="con-exercises">
                    <Row noGutters={true}>
                        {this.state.exercises.map(exercise => {
                            return (
                                <Col md={4} key={exercise.id}>
                                    <Card className="exercise-plan text-primary">
                                        <Card.Body>
                                            <div className="exercise-name underline">{exercise.name}</div>
                                            {exercise.plan.split('--').map((set, indx) => {
                                                return <div key={indx}>{set}</div>
                                            })}
                                        </Card.Body>                         
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
                <hr className="hr" />
                <div className="icon-container">
                    <FontAwesomeIcon id={this.props.workout.id} className="activate-icon"
                    icon={faCheckCircle} onClick={this.setActiveWorkout} />
                    <FontAwesomeIcon className="delete-icon" icon={faMinusCircle} />
                    <FontAwesomeIcon className="edit-icon" icon={faEdit} />
                </div>
            </Card>
        )
    }
}

export default WorkoutCard