
export const changePriceFormat = (money:number) => {
    return Intl.NumberFormat().format(money);
}