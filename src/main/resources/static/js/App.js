function sign(number){
    if(number>0){
        return "+" + number;
    } else {
        return number;
    }
}

function Statistic(props){
    var score = Math.floor((props.value - 10) / 2);

    return (
        <Box title={props.name}>
            <div style={{borderBottom:"1px solid black", textAlign:"center"}}>
                {props.value}
            </div>
            <div style={{textAlign:"center"}}>
                {sign(score)}
            </div>
        </Box>
    );
}

function Box(props){
    return (
        <div style={{border: "1px solid black", display: "table-cell"}}>
            <div style={{textAlign: "right", fontSize: "xx-small", marginBottom: "-10px", color: "darkgray"}}>{props.title}</div>
            <div>{props.children}</div>
        </div>
    );
}

function Skills(props){
    var monster = props.monster;
    var skills = [];

    if(monster.acrobatics) skills.push(<span>acrobatics {sign(monster.acrobatics)}</span>);
    if(monster.arcana) skills.push(<span>arcana {sign(monster.arcana)}</span>);
    if(monster.athletics) skills.push(<span>athletics {sign(monster.athletics)}</span>);
    if(monster.deception) skills.push(<span>deception {sign(monster.deception)}</span>);
    if(monster.history) skills.push(<span>history {sign(monster.history)}</span>);
    if(monster.insight) skills.push(<span>insight {sign(monster.insight)}</span>);
    if(monster.intimidation) skills.push(<span>intimidation {sign(monster.intimidation)}</span>);
    if(monster.investigation) skills.push(<span>investigation {sign(monster.investigation)}</span>);
    if(monster.medicine) skills.push(<span>medicine {sign(monster.medicine)}</span>);
    if(monster.nature) skills.push(<span>nature {sign(monster.nature)}</span>);
    if(monster.perception) skills.push(<span>perception {sign(monster.perception)}</span>);
    if(monster.performance) skills.push(<span>performance {sign(monster.performance)}</span>);
    if(monster.persuasion) skills.push(<span>persuasion {sign(monster.persuasion)}</span>);
    if(monster.religion) skills.push(<span>religion {sign(monster.religion)}</span>);
    if(monster.stealth) skills.push(<span>stealth {sign(monster.stealth)}</span>);
    if(monster.survival) skills.push(<span>survival {sign(monster.survival)}</span>);

    if(skills.length>0){
        return (
            <div>
                <b>Skills</b>
                {skills}
            </div>
        );
    }

    return <div>&nbsp;</div>;
}

function AbilitySaves(props){
    var monster = props.monster;
    var saves = [];

    if(monster.strength_save) saves.push(<span key="str">Strength {sign(monster.strength_save)}</span>);
    if(monster.dexterity_save) saves.push(<span key="dex">Dexterity {sign(monster.dexterity_save)}</span>);
    if(monster.constitution_save) saves.push(<span key="con">Constitution {sign(monster.constitution_save)}</span>);
    if(monster.intelligence_save) saves.push(<span key="int">Intelligence {sign(monster.intelligence_save)}</span>);
    if(monster.wisdom_save) saves.push(<span key="wis">Wisdom {sign(monster.wisdom_save)}</span>);
    if(monster.charisma_save) saves.push(<span key="cha">Charisma {sign(monster.charisma_save)}</span>);

    if(saves.length>0){
        return (
            <div>
                <b>Saving Throws</b>
                {saves}
            </div>
        );
    }
}

function PrintMonster(props){
    var m = props.monster;

    return (
        <div key={m.index} style={{padding:"5px"}}>
            <div style={{borderBottom: "5px double black"}}>
                <img/>&nbsp;
            </div>
            <div>
                <Box title="Name">
                    {m.name}
                </Box>
            </div>
            <div style={{display:"table-row"}}>
                <Box title="Size">
                    {m.size}
                </Box>
                <Box title="Type">
                    {m.type}
                </Box>
                <Box title="Alignment">
                    {m.alignment}
                </Box>
            </div>
            <div>
                <Box title="AC">
                    {m.armor_class}
                </Box>
                <Box title="HP">
                    {m.hit_points} ({m.hit_dice})
                </Box>
            </div>
            <div>
                <Box title="Speed">
                    {m.speed}
                </Box>
            </div>
            <div>
                <Statistic name="STR" value={m.strength}/>
                <Statistic name="DEX" value={m.dexterity}/>
                <Statistic name="CON" value={m.constitution}/>
                <Statistic name="INT" value={m.intelligence}/>
                <Statistic name="WIS" value={m.wisdom}/>
                <Statistic name="CHA" value={m.charisma}/>
            </div>
            <div>
                <Box title="Senses">
                    {m.senses}
                </Box>
            </div>
            <div>
                <div>
                    <Box title="Passive Perception">
                        {10 + (m.perception? m.perception:Math.floor((m.wisdom - 10) / 2))}
                    </Box>
                    <Box title="Challenge">
                        {(m.challenge_rating == 0 || m.challenge_rating >= 1)? m.challenge_rating : "1/" + (1/m.challenge_rating)}
                    </Box>
                    <Box title="XP">
                        {m.challenge_rating * 200}
                    </Box>
                </div>
            </div>
            <div>
                <Box title="Languages">
                    {m.languages}
                </Box>
            </div>
            <div>
                <Box title="Traits">
                    <Skills monster={m}/>
                    {m.damage_vulnerabilities && <div><b>Damage Vulnerabilities</b>{m.damage_vulnerabilities}</div>}
                    {m.damage_resistances && <div><b>Damage Resistances</b>{m.damage_resistances}</div>}
                    {m.damage_immunities && <div><b>Damage Immunities</b>{m.damage_immunities}</div>}
                    {m.condition_immunities && <div><b>Condition Immunities</b>{m.condition_immunities}</div>}
                    <AbilitySaves monster={m}/>
                    {m.special_abilities.map((s)=>{
                        return (
                            <div>
                                <b>{s.name}</b> {s.desc}
                            </div>
                        );
                    })}
                    {m.actions.map((a)=>{
                        return (
                            <div>
                                <b>{a.name}</b> {a.desc}
                            </div>
                        );
                    })}
                    {m.legendary_actions.map((a)=>{
                        return (
                            <div>
                                <b>{a.name}</b> {a.desc}
                            </div>
                        );
                    })}
                </Box>
            </div>
        </div>
    );
}

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {filter: '', monsters:[], selected:[]};
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
        var monsters = [];

        this.state.monsters.map((m)=>{
            if(this.state.filter == '' || m.name.toUpperCase().includes(this.state.filter.toUpperCase())) monsters.push(m);
        });

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
                        <PrintMonster key={m.index} monster={m}/>
                    )}
                </div>
                <div className="row no-print">
                    <div className="col">
                        {monsters.map((m)=>
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