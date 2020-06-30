import React, { Component } from "react";
import "./login.css"

import MealService from "../services/meals.service";

class Meal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            calories: ''
        };

        if (this.props.location && this.props.location.state && this.props.location.state.mealID) {
            this.state.mealID = this.props.location.state.mealID;
        }

        if (this.props.location && this.props.location.state && this.props.location.state.userID) {
            this.state.userID = this.props.location.state.userID;
        }
    }

    componentDidMount() {
        if(this.state.mealID) {
            this.fetchMeal();            
        }
    }

    fetchMeal = () => {
        MealService.getMeal({ _id: this.state.mealID }, (resp) => {
            this.setState({
                name: resp.meal.name,
                calories: resp.meal.calories
            })
        }, error => console.error(error));
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: ''
        })
    }

    onClickHandler = () => {

        if (!this.state.name) {
            this.setState({
                error: 'Please enter Email.'
            });
            return;
        }

        if (!this.state.calories) {
            this.setState({
                error: 'Please enter calories.'
            });
            return;
        }

        if (this.state.calories < 0) {
            this.setState({
                error: 'Calories should be non zero.'
            });
            return;
        }

        if(this.state.mealID) {
            this.onSave();
        } else {
            this.onCreate();
        }

    }

    onCreate = () => {
        let meal = {
            name: this.state.name,
            calories: this.state.calories * 1,
            user_id: this.state.userID
        };

        MealService.createMeal({}, meal, () => {
            this.props.history.push('/?userID=' + meal._id, { userID: meal.user_id });
        }, (e) => {
            console.error(e)
        });
    }

    onSave = () => {
        let meal = {
            name: this.state.name,
            calories: this.state.calories * 1,
            user_id: this.state.userID,
            _id: this.state.mealID
        };

        MealService.updateMeal({}, meal, () => {
            this.props.history.push('/?userID=' + meal._id, { userID: meal.user_id });
        }, (e) => {
            console.error(e)
        });
    }

    render() {
        return (<div className="login">
            <div className="login__heading">
                <h2>Meal</h2>
            </div>
            {
                this.state.error
                    ?
                    <div className="login__error">{this.state.error}</div>
                    :
                    null
            }
            <div className="login__inputs">
                <label>Name</label>
                <input type="text" className="login__control" 
                    name="name" 
                    value={this.state.name} 
                    onChange={(e) => this.onChangeHandler(e)} />
            </div>
            <div className="login__inputs">
                <label>Calories</label>
                <input type="number" className="login__control" 
                    name="calories" 
                    value={this.state.calories} 
                    onChange={(e) => this.onChangeHandler(e)} />
            </div>
            <div className="login__actions">
                <input type="button" className="login__actions--direct" value="Save" onClick={this.onClickHandler} />
            </div>
        </div>)
    }
}

export default Meal;
