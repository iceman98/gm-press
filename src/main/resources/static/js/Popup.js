class Popup extends React.Component {

    constructor(props){
        super(props);
        this.state = {monster: props.monster, results: [], query:'dnd ' + props.monster.name, customUrl: ''};
        this.app = props.app;
    }

    componentDidMount(){
        var me = this;
        var monster = me.state.monster;
        this.getResults(me);
    }

    render() {
        var monster = this.state.monster;

        if(this.state.monster){
            return (
                <div className="modal is-active">
                    <div className="modal-background" onClick={()=>this.app.setState({popup:null})}></div>
                    <div className="modal-card popup">
                        <header className="modal-card-head">
                            <div className="modal-card-title">{monster.name} image search</div>
                            <button className="delete" onClick={()=>this.app.setState({popup:null})}></button>
                        </header>
                        <div className="modal-card-body">
                            <div className="field has-addons">
                                <div className="control">
                                    <input id="query" className="control input" type="text" defaultValue={this.state.query}/>
                                </div>
                                <div className="control">
                                    <button className="control button is-primary" onClick={()=>this.doSearch()}>Find</button>
                                </div>
                            </div>

                            <div className="box">
                                <div className="label">
                                    Results for '{this.state.query}':
                                </div>

                                {this.state.results.length ?
                                    <Results results={this.state.results} popup={this}/>
                                :
                                    <div>No results</div>
                                }
                            </div>

                            <div className="box">
                                <label className="label">Custom image</label>
                                <div className="field has-addons">
                                    <div className="control">
                                        <input className="control input" type="text" value={this.state.customUrl} onChange={(e)=> this.onCustomUrlChange(e)}/>
                                    </div>
                                    <div className="control">
                                        <button className="control button is-primary" onClick={()=> this.setMonster(this.state.customUrl)}>Set as image</button>
                                    </div>
                                </div>
                                <img src={this.state.customUrl}/>
                            </div>
                        </div>
                        <footer className="modal-card-foot">
                            <button className="button is-danger" onClick={()=>this.app.setState({popup:null})}>Close</button>
                        </footer>
                    </div>
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

    doSearch(){
        var me = this;
        me.setState({query: $("#query").val(), results: []});
        this.getResults(me);
    }

    getResults(popup){
        var query = encodeURIComponent(this.state.query);
        $.ajax('https://cors-anywhere.herokuapp.com/https://api.qwant.com/api/search/images?count=16&offset=1&q=' + query, {dataType:'json', success: function(data){
            popup.setState({results:data.data.result.items});
        }});
    }

    onCustomUrlChange(e){
        this.setState({customUrl:e.target.value});
    }

}