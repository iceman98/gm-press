// Custom Tags

function Statistic(props){
    var value = props.value ? props.value : 0;
    var score = Math.floor((value - 10) / 2);

    return (
        <Box title={props.name}>
            <div style={{borderBottom:"1px solid black", textAlign:"center"}}>
                {value}
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

    if(monster.acrobatics) skills.push("Acrobatics " + sign(monster.acrobatics));
    if(monster.arcana) skills.push("Arcana " + sign(monster.arcana));
    if(monster.athletics) skills.push("Athletics " + sign(monster.athletics));
    if(monster.deception) skills.push("Deception " + sign(monster.deception));
    if(monster.history) skills.push("History " + sign(monster.history));
    if(monster.insight) skills.push("Insight " + sign(monster.insight));
    if(monster.intimidation) skills.push("Intimidation " + sign(monster.intimidation));
    if(monster.investigation) skills.push("Investigation " + sign(monster.investigation));
    if(monster.medicine) skills.push("Medicine " + sign(monster.medicine));
    if(monster.nature) skills.push("Nature " + sign(monster.nature));
    if(monster.perception) skills.push("Perception " + sign(monster.perception));
    if(monster.performance) skills.push("Performance " + sign(monster.performance));
    if(monster.persuasion) skills.push("Persuasion " + sign(monster.persuasion));
    if(monster.religion) skills.push("Religion " + sign(monster.religion));
    if(monster.stealth) skills.push("Stealth " + sign(monster.stealth));
    if(monster.survival) skills.push("Survival " + sign(monster.survival));

    if(skills.length>0){
        return (
            <div>
                <b>Skills</b> {skills.join(", ")}
            </div>
        );
    }

    return <div>&nbsp;</div>;
}

function AbilitySaves(props){
    var monster = props.monster;
    var saves = [];

    if(monster.strength_save) saves.push("Str " + sign(monster.strength_save));
    if(monster.dexterity_save) saves.push("Dex " + sign(monster.dexterity_save));
    if(monster.constitution_save) saves.push("Con " + sign(monster.constitution_save));
    if(monster.intelligence_save) saves.push("Int " + sign(monster.intelligence_save));
    if(monster.wisdom_save) saves.push("Wis " + sign(monster.wisdom_save));
    if(monster.charisma_save) saves.push("Cha " + sign(monster.charisma_save));

    if(saves.length>0){
        return (
            <div>
                <b>Saving Throws</b> {saves.join(", ")}
            </div>
        );
    }

    return <div/>;
}

function PrintMonster(props){
    var m = props.monster;

    return (
        <div key={m.index} style={{padding:"5px", width:"33%"}}>
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
                <Box title="Defenses">
                    {m.damage_vulnerabilities && <div><b>Damage Vulnerabilities</b> {m.damage_vulnerabilities}</div>}
                    {m.damage_resistances && <div><b>Damage Resistances</b> {m.damage_resistances}</div>}
                    {m.damage_immunities && <div><b>Damage Immunities</b> {m.damage_immunities}</div>}
                    {m.condition_immunities && <div><b>Condition Immunities</b> {m.condition_immunities}</div>}
                    <AbilitySaves monster={m}/>
                </Box>
            </div>
            <div>
                <Box title="Traits">
                    <Skills monster={m}/>
                    {m.special_abilities && m.special_abilities.map((s,i)=>
                        <Action key={i} action={s}/>
                    )}
                </Box>
            </div>
            <div>
                <Box title="Actions">
                    {m.actions && m.actions.map((a,i)=>
                        <Action key={i} action={a}/>
                    )}
                    {m.legendary_actions && m.legendary_actions.map((a,i)=>
                        <Action key={i} action={a}/>
                    )}
                </Box>
            </div>
        </div>
    );
}

function Action(props){
    var action = props.action;

    return (
        <div>
            <b>{action.name}</b> {action.desc}
        </div>
    );
}

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {filter: 'vampire', monsters:[], selected:[]};
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

// Functions

function sign(number){
    if(number > 0){
        return "+" + number;
    } else {
        return number;
    }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));