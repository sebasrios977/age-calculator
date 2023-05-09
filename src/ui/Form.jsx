import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { calcularFecha } from '../helpers/calcularFecha';


export const Form = () => {
    const [isLeapYear, setIsLeapYear] = useState(false);
    const [errors, setErrors] = useState({
        isValid: true,
        isFilled: true,
    })
    const [isValid, setIsValid] = useState(false);
    const [dateSpent, setDateSpent] = useState({
        totalDays: '--',
        totalMonths: '--',
        totalYears: '--',
    });
    const {day, month, year, formState, onInputChange} = useForm({
        day: '',
        year: '',
        month: ''
    });


    const monthsWith31Days = ['1', '3', '5', '7', '8', '10', '12'];
    const monthsWith30Days = ['4', '6', '9', '11'];
    const monthsWith28Days = '2';


    const onSubmit = (e) => {
        e.preventDefault();

        if(day === '' || month === '' || year === ''){
            setErrors({
                ...errors,
                isFilled: false,
            })
            return;
        }

        setErrors({
            ...errors,
            isFilled: true,
        })

        if((year % 4 == 0) && (year % 100 == 0) && (year % 400 == 0) || (year % 4 == 0) && (year % 100 != 0)) {
            setIsLeapYear(true);
        } else {
            setIsLeapYear(false);
        }

        if(monthsWith31Days.includes(month) && day > 31 ||
        monthsWith30Days.includes(month) && day > 30 ||
        (month == monthsWith28Days) && (isLeapYear) && (day > 29) ||
        (month == monthsWith28Days) && (!isLeapYear) && (day > 28) ||
        month > 12 || year > new Date().getFullYear()
        ) {
            setErrors({
                ...errors,
                isValid: false,
            })
            return;
        }

        setErrors({
            isFilled: true,
            isValid: true,
        })

        setDateSpent(calcularFecha(formState));

    }
    

  return (
    <>
        <form action="submit" className="form" onSubmit={onSubmit}>
            <div className="form__contenedor">
                <div className="header__day">
                    <label htmlFor="day">Day</label>
                    <input className={`${!errors.isFilled && 'isFilled__error'} ${!errors.isValid && 'isValid__error'}`} placeholder='DD' onChange={onInputChange} type="number" id='day' name='day' min={1} max={40} />
                    <p>{!errors.isFilled && 'You must fill all the fields'}</p>
                    <p>{!errors.isValid && 'Date is not valid'}</p>
                </div>
                <div className="header__month">
                    <label htmlFor="month">Month</label>
                    <input className={`${!errors.isFilled && 'isFilled__error'} ${!errors.isValid && 'isValid__error'}`} placeholder='MM' onChange={onInputChange} type="number" id='month' name='month' min={1} max={14} />
                </div>
                <div className="header__year">
                    <label htmlFor="year">Year</label>
                    <input className={`${!errors.isFilled && 'isFilled__error'} ${!errors.isValid && 'isValid__error'}`} placeholder='YYYY' onChange={onInputChange} type="number" id='year' name='year' min={1900} max={2040} />
                </div>
            </div>

            <button type='submit' className="btn__submit"></button>
        </form>
        <hr />

        <div className="form__resultado">
            <h2 className="form__resultado"><span>{dateSpent.totalYears}</span> Years</h2>
            <h2 className="form__resultado"><span>{dateSpent.totalMonths}</span> Months</h2>
            <h2 className="form__resultado"><span>{dateSpent.totalDays}</span> Days</h2>
        </div>
    </>

  )
}
