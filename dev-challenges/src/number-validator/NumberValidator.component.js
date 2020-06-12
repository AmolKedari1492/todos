import React from 'react';
import './NumberValidator.css';

const ERRORS = {
    INVALID_NUMBER: 'Invalid number.'
};

const PATTERN = {
    RANGE: '-',
    NUMBER: /^[0-9]+$/,
    COMMA: ','
}

class NumberValidator extends React.Component {
    constructor() {
        super();
        this.state = {
            numbersMapping: {
                1: []
            }
        }
    }

    handleNumValidation = (num) => {
        let numbersPattern = PATTERN.NUMBER;
        return numbersPattern.test(num);
    }

    findNumPosition = (num, numbersMapping) => {
        for (let key in numbersMapping) {
            let foundAt = numbersMapping[key].indexOf(num);
            if (foundAt > -1) {
                return {
                    key,
                    foundAt
                }
            }
        }
        return null;
    }

    pushToLatestKey = (key, num, foundAt, numbersMapping) => {
        let newKey = (key * 1) + 1;

        numbersMapping[key].splice(foundAt, 1);

        if (numbersMapping.hasOwnProperty(newKey)) {
            numbersMapping[newKey].push(num);
        } else {
            numbersMapping[newKey] = [num];
        }

    }

    updateNumMapping = (num, numbersMapping) => {
        num = num * 1;
        if (num) {
            let result = this.findNumPosition(num, numbersMapping);
            if (result) {
                let { key, foundAt } = result;
                this.pushToLatestKey(key, num, foundAt, numbersMapping);
            } else {
                numbersMapping['1'].push(num);
            }
        }

        this.setState({
            numbersMapping
        });
    }

    handleKeyPress = (e) => {
        this.setState({
            numInputError: ''
        });

        if (e.key === 'Enter') {
            this.keyonChangeHandler(e);
        }
    }

    keyonChangeHandler = (e) => {

        // Reset error
        this.setState({
            numInputError: ''
        });

        // Format user input 
        let inputVal = e.target.value;
        inputVal = inputVal.trim();

        let lastEnterChar = inputVal[inputVal.length - 1];

        if (!lastEnterChar) {
            return;
        }

        // Dont to any computation on trailing comma and space 
        if ([PATTERN.COMMA, PATTERN.SPACE].indexOf(lastEnterChar) > -1) {
            this.setState({
                [e.target.name]: inputVal
            });
            return;
        }

        // Create list of user's inputs
        let numbers = inputVal.split(',');
        numbers = numbers.map(item => item.trim());

        let numLen = numbers.length;
        let numbersMapping = { 1: [] };

        for (let i = 0; i < numLen; i++) {
            let num = numbers[i];

            // Check for number and range
            if (num.indexOf(PATTERN.RANGE) > -1 && num.length > 2) {
                let range = num.split('-');

                // Validate both numbers
                let n1 = this.handleNumValidation(range[0]);
                let n2 = this.handleNumValidation(range[1]);

                if (n1 && n2) {

                    // Insert range in list
                    let start = Math.min(range[0], range[1]);
                    let end = Math.max(range[0], range[1]);
                    for (let j = start; j <= end; j++) {
                        this.updateNumMapping(j, numbersMapping);
                    }

                    this.setState({
                        [e.target.name]: inputVal
                    });
                }
            } else {

                // For individual number
                if (this.handleNumValidation(num)) {
                    this.updateNumMapping(num, numbersMapping);
                    this.setState({
                        [e.target.name]: inputVal
                    });
                } else {
                    this.setState({
                        numInputError: ERRORS.INVALID_NUMBER
                    })
                }
            }
        }
    }


    renderNumInputView = () => {
        return (<div className="problem-1__controls">
            <h3>Enter numbers here(supported format 7000, 6000, 8000-8005)</h3>
            <input name="userNumInput"
                type="text"
                placeholder="Enter number in 7000, 6000, 8000-8005 format"
                onKeyPress={this.handleKeyPress}
                onChange={this.keyonChangeHandler} />
            {
                this.state.numInputError &&
                <div className="problem-1__controls-errors">{this.state.numInputError}</div>
            }
        </div>);
    }

    renderView = () => {
        let {numbersMapping, userNumInput} = this.state;
        let numbersMappingCopy = Object.assign({}, numbersMapping)
        let uniqueNumbers = numbersMappingCopy['1'];
        delete numbersMappingCopy['1'];

        return (
            <div className="problem-1">
                {
                    this.renderNumInputView()
                }
                {
                    uniqueNumbers &&
                    userNumInput &&
                    userNumInput.length > 0 &&
                    uniqueNumbers.length === 0 &&
                    <div className="problem-1__unique-numbers">
                        <h4>No unique number found.</h4>
                    </div>
                }

                {
                    uniqueNumbers &&
                    uniqueNumbers.length > 0 &&
                    <div className="problem-1__unique-numbers">
                        <h4>Unique Numbers</h4>
                        <div>
                            {
                                
                                uniqueNumbers.map((number) => {
                                    return <span className="number clickable" key={ number }>{ number }</span>
                                })
                            }
                        </div>
                    </div>
                }
                {
                    Object.keys(numbersMappingCopy) &&
                    Object.keys(numbersMappingCopy).length > 0 &&
                    <div className="problem-1__repeated-numbers">
                        {
                            Object.keys(numbersMappingCopy).map((key) => {
                                let numbers = numbersMappingCopy[key];
                                if(numbers.length === 0) {
                                    return null;
                                }
                                return <>
                                            <h6>{`Number/s duplicated ${ key } times`}</h6>
                                            {
                                                numbers.map((number) => {
                                                    return <span className="number clickable" key={ number }>{ number }</span>
                                                })
                                            }
                                        </>;
                            })
                        }
                </div>
                }
                <div>
                    <h6>Problem Statement</h6>
                    <p>
                            Create a text input that accepts single, multiple and even a range of numbers and matches the entered
                            numbers with an already existing array and shows the duplicates, if any, and the final list of unique
                            numbers.
                            Eg inputs -> 7000, 6000, 8000-8005.
                            If a range is entered, or multiple ranges are entered, all the numbers falling between that range/those
                            ranges have to be considered, matched and displayed.
                            So to sum it up, if I have an existing array of [7000,7001,7002,7003,7004,7005] in the script and in the text
                            input I enter 6098-7003, I should be notified that 7000, 7001, 7002, 7003 are duplicates and will be
                            skipped, with the final list of new additions (2 in this case).
                    </p>
                </div>
            </div>)
    }

    render() {
        return (<div>
            {
                this.renderView()
            }
        </div>)
    }

}

export default NumberValidator;