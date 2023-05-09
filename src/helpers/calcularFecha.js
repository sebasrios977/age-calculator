

export const calcularFecha = (formState) => {
    const {day, month, year} = formState;
    const birthday = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();
    const differenceTime = currentDate - birthday;
    const totalYears = Math.floor(differenceTime / (1000 * 60 * 60 * 24 * 365.25));
    const totalMonths = Math.floor((differenceTime % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const totalDays = Math.floor((differenceTime % (1000 * 60 * 60 * 24 * 365.25)) % (1000 * 60 * 60 * 24 * 30.44) / (1000 * 60 * 60 * 24));
    return {
        totalYears,
        totalMonths,
        totalDays,
    }

}