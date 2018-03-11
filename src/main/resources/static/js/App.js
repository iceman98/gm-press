function Statistic(props){
    var score = Math.floor((props.value - 10) / 2);

    return (
        <div className="col card">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className="text-right small">{props.name}</div>
                    <div>{props.value}</div>
                </li>
                <li className="list-group-item">
                    {score>0?'+':''}{score}
                </li>
            </ul>
        </div>
    );
}

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {filter: 'mino', monsters:[], selected:[]};
    }

    componentDidMount(){
        var me = this;
        this.updateSearch(me.state.filter, me);
    }

    updateSearch(query, me){
        $.ajax('/api/monster/find?n=' + query, {dataType:'json', success: function(data){
            me.setState({monsters:data});

            if(me.state.selected.length == 0){
                me.setState({selected:[data[0]]});
            }
        }});
    }

    render() {
        return (
            <div className="col">
                <div className="row no-print">
                    <div className="col">Filter</div>
                    <div className="col">
                        <input type="text" value={this.state.filter} onChange={(e) => this.onFilterChange(e)} />
                    </div>
                </div>
                <div className="row">
                    {this.state.selected.map((m)=>
                        <div key={m.index} className="col-4">
                            <div className="row col">
                                <img className="card-img-top"/>
                            </div>
                            <div className="row col card">
                                <div className="text-right small">Name</div>
                                <div>{m.name}</div>
                            </div>
                            <div className="row">
                                <div className="col card">
                                    <div className="text-right small">Size</div>
                                    <div>{m.size}</div>
                                </div>
                                <div className="col card">
                                    <div className="text-right small">Type</div>
                                    <div>{m.type}</div>
                                </div>
                                <div className="col card">
                                    <div className="text-right small">Alignment</div>
                                    <div>{m.alignment}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col card">
                                    <div className="text-right small">AC</div>
                                    <div>{m.armor_class}</div>
                                </div>
                                <div className="col card">
                                    <div className="text-right small">HP</div>
                                    <div>{m.hit_points} ({m.hit_dice})</div>
                                </div>
                            </div>
                            <div className="row col card">
                                <div className="text-right small">Speed</div>
                                <div>{m.speed}</div>
                            </div>
                            <div className="row">
                                <Statistic name="STR" value={m.strength}/>
                                <Statistic name="DEX" value={m.dexterity}/>
                                <Statistic name="CON" value={m.constitution}/>
                                <Statistic name="INT" value={m.intelligence}/>
                                <Statistic name="WIS" value={m.wisdom}/>
                                <Statistic name="CHA" value={m.charisma}/>
                            </div>
                        </div>
                    )}
                </div>
                <div className="row no-print">
                    <div className="col">
                        {this.state.monsters.map((m)=>
                            <div key={m.index} className="row">
                                <div className="col">{m.name}</div>
                                <div className="col">{m.type}</div>
                                <div className="col">{this.challengeRating(m.challenge_rating)}</div>
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
        this.updateSearch(e.target.value, this)
    }

    challengeRating(c){
        if(c==0 || c>=1) return c;
        return "1/" + (1/c);
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