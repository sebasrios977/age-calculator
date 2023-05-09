import { useState, useEffect } from "react";

export const useLeap = ( year ) => {
  
    const [isLeapYear, setIsLeapYear] = useState(false);

    useEffect(() => {
        if((year % 4 == 0) && (year % 100 == 0) && (year % 400 == 0) || (year % 4 == 0) && (year % 100 != 0)) {
            setIsLeapYear(true);
        } else {
            setIsLeapYear(false);
        }
    }, [year])
    
    return {
        isLeapYear,
    }
}