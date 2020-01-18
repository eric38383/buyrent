export const totalCostsTableData = (rent, prop) => {
    let runningProp = 0;
    let runningRent = 0;

    const totals = rent.map((item, index) => {
        runningRent += item;
        runningProp += prop[index];
        return {
            'year': index + 1,
            'prop': prop[index],
            'rent': item,
            'diff': prop[index] - item
        }
    });

    totals.push({
        'year': 'Total',
        'prop': runningProp,
        'rent': runningRent,
        'diff': runningProp - runningRent
    })

    return totals;
}