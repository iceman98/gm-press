class Popup extends React.Component {

    constructor(props){
        super(props);
        this.state = {monster: props.monster};
        this.app = props.app;
    }

    componentDidMount(){
        var me = this;

        var monster = this.state.monster;
        var query = encodeURIComponent("dnd " + monster.name);

        $.ajax('https://crossorigin.me/https://api.qwant.com/api/search/images?count=10&offset=1&q=' + query, {dataType:'json', success: function(data){
            me.setState({results:data.data.result.items});
        }});
    }

    render() {
        var monster = this.state.monster;

        if(this.state.monster){
            return (
                <div className="popup">
                    <h1>{monster.name}</h1>
                    {this.state.results && <Results results={this.state.results} popup={this}/>}
                    <button onClick={()=>this.app.setState({popup:null})}>Close</button>
                </div>
            );
        }

        return null;
    }

    setMonster(url){
        var monsters = this.app.state.monsters;
        this.state.monster.image = url;
        this.app.setState({popup: null, monsters: monsters});
    }

}