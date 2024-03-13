const formatMultiPrice = (amount) => {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

module.exports = { formatMultiPrice };
