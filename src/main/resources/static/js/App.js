class App extends React.Component {

    constructor(props){
        super(props);

        var state = JSON.parse(window.localStorage.getItem("state"));

        if(state){
            this.state = state;
        } else {
            this.state = {filter: '', monsters:[], selected:[], popup: null};
        }
    }

    componentDidMount(){
        var me = this;

        $.ajax('data/monsters.js', {dataType:'json', success: function(data){
            me.setState({monsters:data});

            if(me.state.selected.length == 0){
                me.setState({selected:[data[0]]});
            }
        }});
    }

    render() {
        window.localStorage.setItem("state", JSON.stringify(this.state));

        var monsters = [];

        this.state.monsters.map((m)=>{
            if(this.state.filter == '' || m.name.toUpperCase().includes(this.state.filter.toUpperCase())) monsters.push(m);
        });

        return (
            <div className="col">
                {this.state.popup && <Popup app={this} monster={this.state.popup}/>}
                <div className="row no-print">
                    <div className="col">Filter</div>
                    <div className="col">
                        <input type="text" value={this.state.filter} onChange={(e) => this.onFilterChange(e)} />
                    </div>
                </div>
                <div className="row">
                    {this.state.selected.map((m)=>
                        <div key={m.index} className="print-monster-column print-monster-separator"/>
                    )}
                </div>
                <div className="row">
                    {this.state.selected.map((m)=>
                        <PrintMonster key={m.index} monster={m} app={this}/>
                    )}
                </div>
                <div className="row">
                    {this.state.selected.map((m)=>
                        <div key={m.index} className="print-monster-column print-monster-separator"/>
                    )}
                </div>
                <div className="row no-print">
                    <div className="col">
                        {monsters.map((m)=>
                            <div key={m.index} className="row">
                                <div className="col">{m.name}</div>
                                <div className="col">{m.type}</div>
                                <div className="col">{challengeRating(m.challenge_rating)}</div>
                                <div className="col">{this.addRemoveButton(this.state.selected, m)}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    onFilterChange(e){
        this.setState({filter:e.target.value});
    }

    addRemoveButton(selected, monster){
        var monsterSelected = false;
        for(var s in selected){
            if(selected[s].index==monster.index){
                monsterSelected = true;
            }
        }

        if(monsterSelected){
            return <button className="btn btn-danger" onClick={(e)=>this.onRemoveMonster(e, monster)}>Remove</button>
        }else{
            return <button className="btn btn-primary" onClick={(e)=>this.onAddMonster(e, monster)}>Add</button>
        }
    }

    onAddMonster(e, monster){
        var selected = this.state.selected;
        selected.push(monster);
        this.setState({selected:selected});
    }

    onRemoveMonster(e, monster){
        var selected = this.state.selected;
        var newSelected = [];
        for(var s in selected){
            if(selected[s].index!=monster.index){
                newSelected.push(selected[s]);
            }
        }
        this.setState({selected:newSelected});
    }

}

ReactDOM.render(React.createElement(App), document.getElementById('root'));