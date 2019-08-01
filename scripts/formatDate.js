module.exports = formatDate => {
    const date = new Date();
    let today = "";

    today += (date.getMonth() + 1) + "-";
    today += (date.getDate() + 1) + "-";
    today += (date.getFullYear());

    return today;
}