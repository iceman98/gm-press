class App extends React.Component {

    constructor(props){
        super(props);

        var state = JSON.parse(window.localStorage.getItem("state"));

        if(state){
            this.state = state;
        } else {
            this.state = {filter: '', typeFilter: '', crFilter: '', monsters:[], selected:[], popup: null};
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
        var typeList = [""];
        var crList = [""];

        this.state.monsters.map((m)=> {
            if(this.isValid(this.state, m)) monsters.push(m);
            if(!typeList.includes(m.type)) typeList.push(m.type);
            if(!crList.includes(challengeRating(m.challenge_rating))) crList.push(challengeRating(m.challenge_rating));
        });

        typeList = typeList.sort();
        typeList[0] = "all";
        crList = crList.sort();
        crList[0] = "all";

        var monsterPages = paginate(this.state.selected, 4);

        return (
            <div>
                <div className="no-print">
                    <h1 className="title">GM-Print</h1>
                    {this.state.popup && <Popup app={this} monster={this.state.popup}/>}
                </div>
                <div className="no-print box">
                    <h2 className="subtitle">Monsters</h2>
                    <div className="row bold-row">
                        <div className="col">Name</div>
                        <div className="col">Type</div>
                        <div className="col">CR</div>
                        <div className="col">Action</div>
                    </div>
                    <div className="row">
                        <div className="col field control">
                            <input type="text" className="input is-small" placeholder="name filter" value={this.state.filter} onChange={(e) => this.onFilterChange(e)} />
                        </div>
                        <div className="col field control">
                            <div className="select is-small">
                                <select onChange={(e) => this.onTypeChange(e)} defaultValue={this.state.typeFilter}>
                                    {typeList.map((t)=>
                                        <option value={t} key={t}>{t}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="col field control">
                            <div className="select is-small">
                                <select defaultValue={this.state.crFilter} onChange={(e) => this.onCrChange(e)}>
                                    {crList.map((cr)=>
                                        <option value={cr} key={cr}>{cr}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="scrollable">
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
                <div className="no-print box">
                    <h2 className="subtitle">Print options</h2>
                </div>
                {monsterPages.map((p,i)=>
                    <MonsterPage key={i} page={p} app={this}/>
                )}
            </div>
        );
    }

    onFilterChange(e){
        this.setState({filter:e.target.value});
    }

    onTypeChange(e){
        this.setState({typeFilter:e.target.value});
    }

    onCrChange(e){
        this.setState({crFilter:e.target.value});
    }

    addRemoveButton(selected, monster){
        var monsterSelected = false;
        for(var s in selected){
            if(selected[s].index==monster.index){
                monsterSelected = true;
            }
        }

        if(monsterSelected){
            return <button className="button is-danger is-small narrow" onClick={(e)=>this.onRemoveMonster(e, monster)}>Remove</button>
        }else{
            return <button className="button is-primary is-small narrow" onClick={(e)=>this.onAddMonster(e, monster)}>Add</button>
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

    isValid(state, monster){
        if(!(!state.filter || state.filter == '' || monster.name.toUpperCase().includes(state.filter.toUpperCase()))){
            return false;
        }

        if(!(!state.typeFilter || state.typeFilter == 'all' || monster.type == state.typeFilter)){
            return false;
        }

        if(!(!state.typeFilter || state.crFilter == 'all' || challengeRating(monster.challenge_rating) == state.crFilter)){
            return false;
        }

        return true;
    }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));