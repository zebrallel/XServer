const router = require('express').Router();
const React = require('react')
const renderToStaticMarkup = require('react-dom/server').renderToString

class App extends React.Component{
    onClickHandler() {
        console.log('clicked!');
    }
    onErrorHandler() {
        console.log('Error!')
    }
    render(){
        return React.createElement('div', {className: 'srr-demo'}, React.createElement('img', {src: '/imgs/med.png', onError: this.onErrorHandler, onClick: this.onClickHandler}))
    }
}

router.get('/', function(req, res, next){
    const element = React.createElement(App);

    res.render('pages/ssr', {
        title : 'demo',
        html: renderToStaticMarkup(element)
    });
});

module.exports = router;