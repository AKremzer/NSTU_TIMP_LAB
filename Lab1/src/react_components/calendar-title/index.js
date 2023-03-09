import React from "react";
import {MainDivStyle, TextStyle, ButtonStyle} from "./calendar-title-styles"

const CalendarTitle = ({ today, prevPageHandler, todayPageHandler, nextPageHandler }) => {
    return(
        <MainDivStyle>
            <div>
                <TextStyle><b>{today.format('MMMM')}</b></TextStyle>
                <TextStyle> {today.format('YYYY')}</TextStyle>
            </div>
            <div>
                <ButtonStyle onClick={prevPageHandler}>&lt;</ButtonStyle>
                <ButtonStyle onClick={todayPageHandler}>Today</ButtonStyle>
                <ButtonStyle onClick={nextPageHandler}>&gt;</ButtonStyle>
            </div>
        </MainDivStyle>
    );
};

export { CalendarTitle };
