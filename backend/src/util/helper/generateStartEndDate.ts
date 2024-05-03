function getDateRange(date: string) {
    // Clone the date to avoid mutating the original date object
    const startDate = new Date(date);
    const endDate = new Date(date);

    // Set the time to the beginning of the day (00:00:00.000)
    startDate.setUTCHours(0, 0, 0, 0);

    // Set the time to the end of the day (23:59:59.999)
    endDate.setUTCHours(23, 59, 59, 999);

    return { startDate, endDate };
}

export default getDateRange;