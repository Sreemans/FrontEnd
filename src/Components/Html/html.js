import React from 'react';

export default class HTML extends React.Component{
    state={}
    render(){
        console.log('state', this.state);
        console.log('props', this.props);
        return(
            //https://way2tutorial.com/
            <iframe title={'HTML'} frameBorder={0} height={window.innerHeight - 50}
            width='100%'
            src={'https://way2tutorial.com/html/tag/index.php'}></iframe>
        )
    }
}