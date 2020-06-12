import React from 'react';

import "./users.scss";

import UserCard from "./UserCard";

import UserService from '../../services/Users.service';
import SessionStorage from '../../services/SessionStorage.service';

import {
    APP_ROUTES,
    SESSION_STORAGE_ACCONTID_KEY
} from "../../constants/";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            firedAPI: false,
            filter: {},
            baseFilterTypes: UserService.getUserFilters(),
            ageFilters: UserService.getUserAgeGroups(),
            showFilter: false
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        UserService.getUsers(users => {

            users.forEach(element => {
                element.fullName = `${element.firstName} ${element.lastName}`;
                return element;
            });

            this.setState({
                users,
                userCopy: users,
                firedAPI: true
            });
        }, error => {
            this.setState({
                firedAPI: false
            });
            UserService.logout();
            this.props.history.push(APP_ROUTES.LOGIN);
        });
    }

    logout = () => {
        UserService.logout();
        this.props.history.push(APP_ROUTES.LOGIN);
    }

    onClear = () => {
        this.setState({
            filter: {},
            users: this.state.userCopy
        });
    }

    apply = () => {
        let { filter, userCopy, baseFilterTypes } = this.state;
        let filterTypes = Object.keys(filter);
        let appliedFilter = filterTypes.length;
        let newUsers = Array.from(userCopy);

        for (let i = 0; i < appliedFilter; i++) {
            let filterType = filterTypes[i];
            let filterValue = filter[filterType];

            if (filterType === baseFilterTypes.NAME) {
                newUsers = newUsers.filter(user => user.fullName.toLowerCase().indexOf(filterValue.toLowerCase()) > -1);
            } else if (filterType === baseFilterTypes.MAX_NAME_LENGTH) {
                newUsers = newUsers.filter(user => user.fullName.length <= filterValue);
            } else if (filterType === baseFilterTypes.AGE) {
                if (filterValue && filterValue.length) {
                    let min = Math.min(...filterValue);
                    let max = Math.max(...filterValue);
                    newUsers = newUsers.filter(user => user.age >= min && user.age <= max);
                }
            }

        }

        this.setState({
            users: newUsers
        });
    }

    filterChangeHandler = (e) => {
        let { filter, baseFilterTypes } = this.state;
        if (e.target.name === baseFilterTypes.AGE) {
            let filterValue = filter[e.target.name] || [];
            let newVal = e.target.value.split("-");

            // Get values
            let min = newVal[0];
            let max = newVal[1];

            // Convert to number
            min = min * 1;
            max = max * 1;

            // Default case
            min = min || 1;
            max = max || 1000;

            // Add if not present otherwise removed
            if (filterValue.indexOf(min) > -1) {
                filterValue = filterValue.filter(item => item !== min)
            } else {
                filterValue.push(min);
            }

            // Add if not present otherwise removed
            if (filterValue.indexOf(max) > -1) {
                filterValue = filterValue.filter(item => item !== max)
            } else {
                filterValue.push(max);
            }

            filter[e.target.name] = filterValue;
        } else {
            filter[e.target.name] = e.target.value;
        }
        this.setState({
            filter
        });
    }

    toggleFilterView = () => {
        this.setState({
            showFilter: !this.state.showFilter
        })
    }

    renderListHeaders = () => {
        return (<div className="users__list--headers">
            <div>AccountID</div>
            <div>Name</div>
            <div>Age</div>
        </div>)
    }

    renderUsersView = () => {
        if (this.state.users && this.state.users.length) {
            return <>
                {this.renderListHeaders()}
                <div className="users__list">{
                    this.state.users.map((user) => {
                        return <UserCard key={user.accountId} user={user} />
                    })
                }</div>
            </>
        } else if (this.state.firedAPI && this.state.users && this.state.users.length === 0) {
            return <div className="users__empty">User List is empty.</div>
        } else {
            return null;
        }
    }

    renderFilterView = () => {
        let { ageFilters } = this.state;

        let selectedAge = 0;
        if (this.state.filter.age && this.state.filter.age.length > 0) {
            selectedAge = this.state.filter.age.sort();
            selectedAge = selectedAge.join();
        }
        return (<div className="users__filters">
            <div className="users__filters--items">
                <label htmlFor="age">Age</label>
                {
                    ageFilters &&
                    ageFilters.length > 0 &&
                    <select value={selectedAge} name="age" autoComplete="off" onChange={this.filterChangeHandler}> {
                        ageFilters.map((age, index) => {
                            return selectedAge === 0 && index === 0 ?
                                <option key={index}>Select</option>
                                :
                                selectedAge && index === 0
                                    ?
                                    <option key={index}>{selectedAge}</option>
                                    :
                                    <option key={index} value={age.label}>{age.label}</option>
                        })
                    }
                    </select>
                }
            </div>
            <div className="users__filters--items">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={this.state.filter.name || ''} onChange={this.filterChangeHandler} />
            </div>
            <div className="users__filters--items">
                <label htmlFor="maxLength">Max length</label>
                <input type="number" name="length" value={this.state.filter.length || 50} onChange={this.filterChangeHandler} />
            </div>
            <div className="users__filters--actions">
                <div className="btn btn-danger" onClick={this.onClear}>Clear</div>
                <div className="btn btn-primary" onClick={this.apply}>Apply</div>
            </div>
        </div>)
    }

    render() {
        return (
            <div className="users">
                <div className="users__headers">
                    <h2>List</h2>
                </div>
                <div className="desktop-view">
                    {this.renderFilterView()}
                </div>
                <div className="mobile-view">
                    <h5 className="filter-text" onClick={this.toggleFilterView}>{this.state.showFilter ? 'Hide Filters' : 'Show Filters'}</h5>
                    {
                        this.state.showFilter
                            ?
                            this.renderFilterView()
                            :
                            null
                    }
                </div>
                <div className="divider"></div>
                {this.renderUsersView()}
            </div>
        )

    }
};

export default List;