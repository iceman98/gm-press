class Monster extends React.Component {

    constructor(props){
        super(props);

        var monster;

        if(props.monster){
            monster = props.monster;
        } else {
            monster = {index:Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1)};
        }

        this.state = {monster: monster};
    }

    componentDidMount(){

    }

    render() {

        var m = this.state.monster;
        var component = this;

        var addRow = function(type){
            if(!m[type]){
                m[type] = [];
            }

            m[type].push({});
            component.setState({monster:m});
        }

        var removeRow = function(type, index){
            m[type].splice(index, 1);
            component.setState({monster:m});
        }

        return (
            <div>
                <div className="columns">
                    <div className="column"><Field title="Name" object="monster" field="name" parent={this}/></div>
                    <div className="column"><Field title="CR" object="monster" field="challenge_rating" parent={this} type="number"/></div>
                    <div className="column"><Field title="XP" value={experiencePoints(m.challenge_rating)}/></div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Size" object="monster" field="size" parent={this}/></div>
                    <div className="column"><Field title="Type" object="monster" field="type" parent={this}/></div>
                    <div className="column"><Field title="Alignment" object="monster" field="alignment" parent={this}/></div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Armor Class" object="monster" field="armor_class" parent={this} type="number"/></div>
                    <div className="column"><Field title="HP" object="monster" field="hit_points" parent={this} type="number"/></div>
                    <div className="column"><Field title="HP Die" object="monster" field="hit_dice" parent={this}/></div>
                    <div className="column"><Field title="HP" value={m.hit_points + " (" + m.hit_dice + ")"}/></div>
                    <div className="column"><Field title="Passive Perception" value={passivePerception(m)}/></div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Speed" object="monster" field="speed" parent={this}/></div>
                </div>

                <div className="columns">
                    <div className="column">
                        <Field title="Strength" object="monster" field="strength" parent={this} type="number"/>
                        <Field title="STR" value={sign(statisticScore(m.strength))}/>
                    </div>
                    <div className="column">
                        <Field title="Dexterity" object="monster" field="dexterity" parent={this} type="number"/>
                        <Field title="DEX" value={sign(statisticScore(m.dexterity))}/>
                    </div>
                    <div className="column">
                        <Field title="Constitution" object="monster" field="constitution" parent={this} type="number"/>
                        <Field title="CON" value={sign(statisticScore(m.constitution))}/>
                    </div>
                    <div className="column">
                        <Field title="Intelligence" object="monster" field="intelligence" parent={this} type="number"/>
                        <Field title="INT" value={sign(statisticScore(m.intelligence))}/>
                    </div>
                    <div className="column">
                        <Field title="Wisdom" object="monster" field="wisdom" parent={this} type="number"/>
                        <Field title="WIS" value={sign(statisticScore(m.wisdom))}/>
                    </div>
                    <div className="column">
                        <Field title="Charisma" object="monster" field="charisma" parent={this} type="number"/>
                        <Field title="CHA" value={sign(statisticScore(m.charisma))}/>
                    </div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Senses" object="monster" field="senses" parent={this}/></div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Languages" object="monster" field="languages" parent={this}/></div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Vulnerabilities" object="monster" field="damage_vulnerabilities" parent={this}/></div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Resistances" object="monster" field="damage_resistances" parent={this}/></div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Immunities" object="monster" field="damage_immunities" parent={this}/></div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Condition Immunities" object="monster" field="condition_immunities" parent={this}/></div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Strength save" object="monster" field="strength_save" parent={this} type="number"/></div>
                    <div className="column"><Field title="Dexterity save" object="monster" field="dexterity_save" parent={this} type="number"/></div>
                    <div className="column"><Field title="Constitution save" object="monster" field="constitution_save" parent={this} type="number"/></div>
                    <div className="column"><Field title="Intelligence save" object="monster" field="intelligence_save" parent={this} type="number"/></div>
                    <div className="column"><Field title="Wisdom save" object="monster" field="wisdom_save" parent={this} type="number"/></div>
                    <div className="column"><Field title="Charisma save" object="monster" field="charisma_save" parent={this} type="number"/></div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Athletics" object="monster" field="athletics" parent={this} type="number"/></div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Acrobatics" object="monster" field="acrobatics" parent={this} type="number"/></div>
                    <div className="column"><Field title="Sleight of Hand" object="monster" field="sleight" parent={this} type="number"/></div>
                    <div className="column"><Field title="Stealth" object="monster" field="stealth" parent={this} type="number"/></div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Arcana" object="monster" field="arcana" parent={this} type="number"/></div>
                    <div className="column"><Field title="History" object="monster" field="history" parent={this} type="number"/></div>
                    <div className="column"><Field title="Investigation" object="monster" field="investigation" parent={this} type="number"/></div>
                    <div className="column"><Field title="Nature" object="monster" field="nature" parent={this} type="number"/></div>
                    <div className="column"><Field title="Religion" object="monster" field="religion" parent={this} type="number"/></div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Animal Handling" object="monster" field="animal_handling" parent={this} type="number"/></div>
                    <div className="column"><Field title="Insight" object="monster" field="insight" parent={this} type="number"/></div>
                    <div className="column"><Field title="Medicine" object="monster" field="medicine" parent={this} type="number"/></div>
                    <div className="column"><Field title="Perception" object="monster" field="perception" parent={this} type="number"/></div>
                    <div className="column"><Field title="Survival" object="monster" field="survival" parent={this} type="number"/></div>
                </div>

                <div className="columns">
                    <div className="column"><Field title="Deception" object="monster" field="deception" parent={this} type="number"/></div>
                    <div className="column"><Field title="Intimidation" object="monster" field="intimidation" parent={this} type="number"/></div>
                    <div className="column"><Field title="Performance" object="monster" field="performance" parent={this} type="number"/></div>
                    <div className="column"><Field title="Persuasion" object="monster" field="persuasion" parent={this} type="number"/></div>
                </div>

                <div className="columns">
                    <div className="column">
                        <label className="label">Traits</label>
                        {m.special_abilities && m.special_abilities.map((a,i)=>(
                            <MonsterAction key={i} type="special_abilities" index={i} action={a} onUpdate={()=>this.setState(this.state)} onRemove={removeRow}/>
                        ))}
                        <button className="button" onClick={()=> addRow("special_abilities")}>Add</button>
                    </div>
                </div>

                <div className="columns">
                    <div className="column">
                        <label className="label">Actions</label>
                        {m.actions && m.actions.map((a,i)=>(
                            <MonsterAction key={i} type="actions" index={i} action={a} onUpdate={()=>this.setState(this.state)} onRemove={removeRow}/>
                        ))}
                        <button className="button" onClick={()=> addRow("actions")}>Add</button>
                    </div>
                </div>

                <div className="columns">
                    <div className="column">
                        <label className="label">Legendary Actions</label>
                        {m.legendary_actions && m.legendary_actions.map((a,i)=>(
                            <MonsterAction key={i} type="legendary_actions" index={i} action={a} onUpdate={()=>this.setState(this.state)} onRemove={removeRow}/>
                        ))}
                        <button className="button" onClick={()=> addRow("legendary_actions")}>Add</button>
                    </div>
                </div>

                <div>
                    <textarea readOnly className="textarea" id="output" value={JSON.stringify(this.state.monster, null, 2)}></textarea>
                </div>
                <div>
                    <button className="button is-primary" onClick={()=>{$('#output').select(); document.execCommand('copy')}}>Copy</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(React.createElement(Monster), document.getElementById('root'));