import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [end, setEnd] = useState(null);
    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={end}
            />
            <DatePicker
                selected={end}
                onChange={(date) => setEnd(date)}
                selectsEnd
                startDate={startDate}
                endDate={end}
                minDate={startDate}
            />
        </div>
    )
};

export default DateSelector; 