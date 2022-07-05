export const getAverageScore = (list) => {
    const sum =  list.reduce((result, item) => {
        result += item.score
    }, 0);

    return  (sum / list.length).toFixed(2);
}