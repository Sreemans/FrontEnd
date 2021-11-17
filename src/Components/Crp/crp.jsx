import React from 'react';
const textBoxesR1 = ['buyPrice', 'buyQuantity', 'buyAmount'];
const textBoxesR2 = ['sellPrice', 'sellQuantity', 'sellAmount'];
const textBoxesR3 = ['profitOrLoss'];
const style = {
    'display': 'flex',
    'justifyContent': 'space-evenly',
    margin: '10px 0'
}
class Constants {
    static BUY_PRICE = 'buyPrice';
    static BUY_AMOUNT = 'buyAmount';
    static BUY_QUANTITY = 'buyQuantity';
    static SELL_PRICE = 'sellPrice';
    static SELL_AMOUNT = 'sellAmount'
    static SELL_QUANTITY = 'sellQuantity';
    static PROFIT_LOSS = 'profitOrLoss';
}
const initialState = {
    buyPrice: 10,
    sellPrice: 10,
    buyQuantity: 0,
    sellQuantity: 0,
    buyAmount: 0,
    sellAmount: 0,
    profitOrLoss: 0
};
export class CRP extends React.Component {
    state = initialState;

    calculate = (value, enteredBox) => {

        if (!value) {
            return;
        }

        const { state } = this
        const { sellQuantity, buyQuantity, buyAmount, sellAmount } = state;
        const derieveQuantity = (prop) => state[(prop + 'Amount').toString()] / state[(prop + 'Price').toString()];
        const derieveBuyAmount = () => state['buyPrice'] * buyQuantity;
        const derieveSellAmount = () => state['sellPrice'] * sellQuantity;

        const BUY = 'buy';
        if (enteredBox === Constants.BUY_AMOUNT) {
            this.setState({ buyQuantity: derieveQuantity(BUY) });
        }
        else if (enteredBox === Constants.BUY_QUANTITY) {
            this.setState({ buyAmount: derieveBuyAmount(BUY) });
        }

        if (buyAmount && buyQuantity && enteredBox === Constants.BUY_PRICE) {
            this.setState({ buyAmount: derieveBuyAmount(BUY) });
        }

        const SELL = 'sell';
        if (enteredBox === Constants.SELL_AMOUNT) {
            this.setState({ sellQuantity: derieveQuantity(SELL) });
        }
        else if (enteredBox === Constants.SELL_QUANTITY) {
            this.setState({ sellAmount: derieveSellAmount(SELL) });
        }

        if (sellAmount && sellQuantity && enteredBox === Constants.SELL_PRICE) {
            this.setState({ sellAmount: derieveSellAmount(BUY) });
        }

        if (buyAmount && sellAmount) {
            this.setState({ profitOrLoss: sellAmount - buyAmount })
        }
    }
    updateValues = (event) => {
        const value = event.target.value ? Number(event.target.value) : undefined;
        const name = event.target.name;
        this.setState({ [event.target.name]: value }, () => this.calculate(value, name));
    }
    render() {
        const { state, updateValues } = this;
        return (
            <>
                <div>
                    <button onClick={() => this.setState(initialState)}>Reset</button>
                    {renderBoxes(textBoxesR1, updateValues, state)}
                    {renderBoxes(textBoxesR2, updateValues, state)}
                    <div style={{ textAlign: 'center' }}>{state.profitOrLoss < 0 ? 'Loss' : 'Profit'}:<span style={{ background: state.profitOrLoss < 0 ? 'red' : '#44f044' }}>{state.profitOrLoss}</span></div>
                </div>
            </>
        )
    }
}

const renderBoxes = (boxes, updateValues, state) => boxes.map((textBox) => <div style={style} key={textBox}>
    <label htmlFor={textBox}>{textBox}</label>
    <input type='number' name={textBox} placeholder={textBox} onChange={updateValues} value={state[textBox]} />
</div>)