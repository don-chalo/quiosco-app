export function formatCurrency(amount: number) {
    return new Intl.NumberFormat(
        'en-US',
        {
            style: 'currency',
            currency: 'USD'
        }
    ).format(amount);
};

export function getImagePath(imagePath: string) {
    if (/^http/.test(imagePath)) {
        return imagePath;
    }
    return `/products/${imagePath}.jpg`;
};
