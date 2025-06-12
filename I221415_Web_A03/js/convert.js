const rates = {
    usd: { gbp: 0.49246, cad: 1.01941, eur: 0.88297, aud: 1.13262 },
    gbp: { usd: 2.03032, cad: 2.03032 * 1.01941, eur: 2.03032 * 0.88297, aud: 2.03032 * 1.13262 },
    cad: { usd: 1 / 1.01941, gbp: 1 / (1.01941 * 2.03032), eur: 0.72037, aud: 0.86613 },
    eur: { usd: 1 / 0.88297, gbp: 1 / (0.88297 * 2.03032), cad: 1 / 0.72037, aud: 0.62382 },
    aud: { usd: 1 / 1.13262, gbp: 1 / (1.13262 * 2.03032), cad: 1 / 0.86613, eur: 1 / 0.62382 }
};

function convertCurrency(baseCurrency) {
    const value = parseFloat(document.getElementById(baseCurrency).value);
    if (isNaN(value)) return;

    const conversions = rates[baseCurrency];

    Object.keys(conversions).forEach(currency => {
        document.getElementById(currency).value = (value * conversions[currency]).toFixed(2);
    });
}
