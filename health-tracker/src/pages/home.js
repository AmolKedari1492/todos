import React, { Component } from "react";
import Nav from "../components/Nav";
import "./Home.css";

import Cookies from 'universal-cookie';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import MealService from "../services/meals.service";
import usersService from "../services/users.service";
const cookies = new Cookies();

const MonthLable = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
}
class Home extends Component {
    constructor(props) {
        super(props);

        let paramsID = cookies.get('_id');
        if (this.props.location && this.props.location.state && this.props.location.state.userID) {
            paramsID = this.props.location.state.userID;
        }
        this.state = {
            paramsID,
            formattedData: {},
            meals: [],
            userDailyTarget: 10,
            userName: ''
        };
    };

    componentDidMount(resp, formattedData) {
        this.fetchUserInfo();
        this.fetchUserMeals();
    }

    fetchUserInfo = () => {
        usersService.getUser({_id: this.state.paramsID}, (resp) => {
            this.setState({
                userDailyTarget: resp.dailyTarget,
                userName: resp.name
            });
        }, error => console.error(error));
    }

    procesData = (resp, formattedData) => {
        resp.meals.forEach(item => {
            let date = new Date(item.created_at);
            let year = date.getFullYear();
            let month = date.getMonth();
            item.month = date.getMonth();
            item.year = date.getFullYear();
            formattedData[year] = formattedData[year] || {};
            formattedData[year][month] = formattedData[year][month] || [];
            formattedData[year][month].push(item);
        });

        this.setState({
            formattedData,
            meals: resp.meals
        });
    }

    fetchUserMeals = () => {
        let formattedData = {};
        MealService.getMeals({ user_id: this.state.paramsID }, (resp) => {
            this.procesData(resp, formattedData);
        }, (err) => {
            console.error(err);
        });
    }

    formattedDate = (date) => {
        const d = new Date('2010-08-05')
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
        return (`${da}-${mo}-${ye}`)
    }

    onEditItem = (e, yearItem, month, mealIndex) => {
        try {
            let { formattedData } = this.state;
            formattedData[yearItem][month][mealIndex].calories = e.target.value;
            this.setState({
                formattedData
            });
        } catch (e) {
            console.error(e)
        }
    }

    addMeal = () => {
        this.props.history.push('/meal/', { userID: this.state.paramsID })
    }

    onEdit = (yearItem, month, mealIndex, meal) => {
        this.props.history.push('/meal/', { mealID: meal._id, userID: this.state.paramsID })
    }

    onDelete = (yearItem, month, mealIndex, meal) => {
        MealService.deleteMeal(meal, (resp) => {
            this.fetchUserMeals();
        }, error => console.error(error));
    }

    clearDateRange = () => {
        this.setState({
            fromDate: undefined,
            toDate: undefined,
        }, () => {
            this.fetchUserMeals();
        });
    }

    filterByDateRange = () => {
        let query = {
            user_id: this.state.paramsID
        };

        if (this.state.toDate && this.state.fromDate) {
            query.from = this.state.fromDate;
            query.to = this.state.toDate;
        }

        MealService.getMeals(query, (resp) => {
            let formattedData = {};
            this.procesData(resp, formattedData);

        }, (e) => {
            console.error(e)
        });
    }

    handleFromChange = (fromDate) => {
        this.setState({
            fromDate
        });
    }

    handleToChange = (toDate) => {
        this.setState({
            toDate
        });
    }

    render() {
        let activePath = this.props.location.pathname;
        let { formattedData } = this.state;
        return (<div className="user-home">
            <header><Nav activePath={activePath} /></header>
            <section>
                <h2>{`${ this.state.userName }'s Meals list`}</h2>
                <div className="user-home__filter">
                    <div className="filter-item">
                        <label htmlFor="birthday">From Date:</label>
                        <DatePicker
                            selected={this.state.fromDate}
                            onChange={this.handleFromChange}
                        />
                    </div>
                    <div className="filter-item">
                        <label htmlFor="birthday">To Date:</label>
                        <DatePicker
                            selected={this.state.toDate}
                            onChange={this.handleToChange}
                        />
                    </div>
                    <div className="filter-item--actions">
                        <button className="btn btn-primary" onClick={this.filterByDateRange}>Search</button>
                        <button className="btn btn-primary" onClick={this.clearDateRange}>clear</button>
                    </div>
                    <div className="filter-item--actions">
                        <button className="btn btn-primary" onClick={this.addMeal}>Add</button>
                    </div>
                </div>
                <div className="user-home__list">
                    {
                        Object.keys(formattedData).map((yearItem, yearItemIndex) => {
                            return (<div key={yearItemIndex} className="meals-list__year">
                                <h3>{`Year- ${yearItem}`}</h3>
                                {
                                    Object.keys(formattedData[yearItem]).map((month, monthIndex) => {
                                        return <div key={monthIndex} className="meals-list__month">
                                            <h4>{`${MonthLable[month]}`}</h4>
                                            <div className="meals-list__header">
                                                <div className="meals-list__values--item">Meal</div>
                                                <div className="meals-list__values--item">Calories</div>
                                                <div className="meals-list__values--item">Date</div>
                                                <div className="meals-list__values--item">Action</div>
                                            </div>
                                            {
                                                formattedData[yearItem][month].map((meal, mealIndex) => {
                                                    return <div key={mealIndex} className="meals-list__values">
                                                        <div className="meals-list__values--item">{meal.name}</div>
                                                        <div className="meals-list__values--item">
                                                            <span>{meal.calories}</span>
                                                            {
                                                                meal.calories <= this.state.userDailyTarget
                                                                ? 
                                                                <span className="badge badge-green">Success</span>
                                                                :
                                                                <span className="badge badge-red">Exceed</span>
                                                            }
                                                        </div>
                                                        <div className="meals-list__values--item">{this.formattedDate(meal.created_at)}</div>
                                                        <div className="meals-list__values--item actions">
                                                            <span className="btn btn-primary"
                                                                onClick={(e) => this.onEdit(yearItem, month, mealIndex, meal)} >Edit</span>
                                                            <span className="btn btn-danger"
                                                                onClick={(e) => this.onDelete(yearItem, month, mealIndex, meal)} >Delete</span>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    })
                                }
                            </div>)
                        })
                    }
                </div>
            </section>
            <footer></footer>
        </div>);
    }
};

export default Home;
