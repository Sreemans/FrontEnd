export const Modules = {
    "REACTHTMLPARSER":{
        "description": `<b>React Html Parser</b> is similar to __html. This will convert the string to Html`, 
        "code": `function Test(){
    
            const createMarkup = () => {  
                var htmlString = '<b class="test">TESTING</b>';
                return {__html : htmlString}            
            }
    
            return(
                <div dangerouslySetInnerHTML={createMarkup()}></div>
            )
        }`,
        "moduleLink": `<a href='https://www.npmjs.com/package/react-html-parser' target='_blank'>react-html-parser</a>`
    },
    "RE":{
        "description": `<b>React Html Parser</b> is similar to __html. This will convert the string to Html`, 
        "code": `function Test(){
    
            const createMarkup = () => {  
                var htmlString = '<b class="test">TESTING</b>';
                return {__html : htmlString}            
            }
    
            return(
                <div dangerouslySetInnerHTML={createMarkup()}></div>
            )
        }`,
        "moduleLink": `<a href='https://www.npmjs.com/package/react-html-parser' target='_blank'>react-html-parser</a>`
    } 
    
}