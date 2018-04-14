function Statistic(props){
    var value = props.value ? props.value : 0;
    var score = statisticScore(value);

    return (
        <Box title={props.name}>
            <div className="statistic-score">
                {value}
            </div>
            <div className="statistic-modifier">
                {sign(score)}
            </div>
        </Box>
    );
}

function Box(props){
    return (
        <div className="boxed" style={{flex: props.ratio}}>
            <div className="box-title">{props.title}</div>
            <div>{props.children}</div>
        </div>
    );
}

function Skills(props){
    var monster = props.monster;
    var skills = [];

    if(monster.animal_handling) skills.push("Animal Handling " + sign(monster.animal_handling));
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
    if(monster.sleight) skills.push("Sleight of Hand " + sign(monster.sleight));
    if(monster.stealth) skills.push("Stealth " + sign(monster.stealth));
    if(monster.survival) skills.push("Survival " + sign(monster.survival));

    if(skills.length>0){
        return (
            <div>
                <b>Skills</b> {skills.join(", ")}
            </div>
        );
    }

    return <div/>;
}

function AbilitySaves(props){
    var monster = props.monster;
    var saves = [];

    if(monster.strength_save || monster.strength_save == 0) saves.push("Str " + sign(monster.strength_save));
    if(monster.dexterity_save || monster.dexterity_save == 0) saves.push("Dex " + sign(monster.dexterity_save));
    if(monster.constitution_save || monster.constitution_save == 0) saves.push("Con " + sign(monster.constitution_save));
    if(monster.intelligence_save || monster.intelligence_save == 0) saves.push("Int " + sign(monster.intelligence_save));
    if(monster.wisdom_save || monster.wisdom_save == 0) saves.push("Wis " + sign(monster.wisdom_save));
    if(monster.charisma_save || monster.charisma_save == 0) saves.push("Cha " + sign(monster.charisma_save));

    if(saves.length>0){
        return (
            <div>
                <b>Saves</b> {saves.join(", ")}
            </div>
        );
    }

    return <div/>;
}

function MonsterPage(props){
    return (
        <div className="row page-break">
            {props.page.map((m)=>
                <PrintMonster key={m.index} monster={m} app={props.app}/>
            )}
        </div>
    );
}

function PrintMonster(props){
    var m = props.monster;

    var onWidthChange = function(monster, wide){
        monster.wide = wide;
        props.app.setState(props.app.state);
    }

    return (
        <div key={m.index} className={m.wide ? "print-monster-column-wide": "print-monster-column"}>
            <div className="no-print print-monster-header">
                <div>
                    <h1>
                        {m.name}
                        <a className="delete is-pulled-right" onClick={() => props.app.onRemoveMonster(null, m)}/>
                    </h1>
                </div>
                <div className="control">
                    <label className="radio">
                        <input type="radio" name={m.index + '-width'} checked={!m.wide} onChange={()=>onWidthChange(m, false)} data/>
                        Normal
                    </label>
                    <label className="radio">
                        <input type="radio" name={m.index + '-width'} checked={m.wide} onChange={()=>onWidthChange(m, true)}/>
                        Wide
                    </label>
                </div>
            </div>
            <div className="print-monster-separator-top"/>
            <div className="print-monster-image-container">
                {m.image ?
                    <img src={m.image} onClick={() => props.app.setState({popup:m})}/>
                :
                    <div className="find-image-button">
                        <button className="no-print button is-outlined is-info" onClick={() => props.app.setState({popup:m})}>Find image</button>
                    </div>
                }
            </div>
            <div className="print-monster-image-separator"></div>
            <div className="print-monster-row">
                <Box title="Name" ratio="4">
                    <b>{m.name}</b>
                </Box>
                <Box title="CR">
                    {challengeRating(m.challenge_rating)}
                </Box>
                <Box title="XP">
                    {experiencePoints(m.challenge_rating)}
                </Box>
            </div>
            <div className="print-monster-row">
                <Box title="Size">
                    {m.size}
                </Box>
                <Box title="Type">
                    {m.type} {m.subtype ? '(' + m.subtype + ')':''}
                </Box>
                <Box title="Alignment">
                    {m.alignment}
                </Box>
            </div>
            <div className="print-monster-row">
                <Box title="AC">
                    {m.armor_class}
                </Box>
                <Box title="HP">
                    {health(m.hit_dice, m.constitution)}
                </Box>
                <Box title="Passive Perception">
                    {passivePerception(m)}
                </Box>
            </div>
            <div className="print-monster-row">
                <Box title="Speed" ratio="6">
                    {m.speed}
                </Box>
                <Box title="Initiative">
                    {sign(statisticScore(m.dexterity))}
                </Box>
            </div>
            <div className="print-monster-row">
                <Statistic name="STR" value={m.strength}/>
                <Statistic name="DEX" value={m.dexterity}/>
                <Statistic name="CON" value={m.constitution}/>
                <Statistic name="INT" value={m.intelligence}/>
                <Statistic name="WIS" value={m.wisdom}/>
                <Statistic name="CHA" value={m.charisma}/>
            </div>
            <div className="print-monster-row">
                <Box title="Senses">
                    {filteredSenses(m)}
                </Box>
            </div>
            <div className="print-monster-row">
                <Box title="Languages">
                    {m.languages ? m.languages : "--"}
                </Box>
            </div>
            <div className="print-monster-row">
                {hasDefenses(m) ?
                    <Box title="Defenses">
                        {m.damage_vulnerabilities && <div><b>Vulnerabilities</b> {m.damage_vulnerabilities}</div>}
                        {m.damage_resistances && <div><b>Resistances</b> {m.damage_resistances}</div>}
                        {m.damage_immunities && <div><b>Immunities</b> {m.damage_immunities}</div>}
                        {m.condition_immunities && <div><b>Condition Immunities</b> {m.condition_immunities}</div>}
                        <AbilitySaves monster={m}/>
                    </Box>
                :
                    <Box title="Defenses"> -- </Box>
                }
            </div>
            <div className="print-monster-row">
                <Box title="Traits">
                    <Skills monster={m}/>
                    {m.special_abilities && m.special_abilities.map((s,i)=>
                        <Action key={i} action={s}/>
                    )}
                </Box>
            </div>
            <div className="print-monster-row">
                <Box title="Actions">
                    {m.actions && m.actions.map((a,i)=>
                        <Action key={i} action={a}/>
                    )}
                    {m.legendary_actions && m.legendary_actions.map((a,i)=>
                        <Action key={i} action={a} legendary={true}/>
                    )}
                </Box>
            </div>
            <div className="print-monster-separator-bottom"/>
        </div>
    );
}

function Action(props){
    var action = props.action;
    var title = props.legendary ? <b><u>{action.name}</u></b> : <b>{action.name}</b>;
    var description = action.desc.replace(/(\r\n|\n|\r)/gm, "<br>");

    return (
        <div>
            {title} <span dangerouslySetInnerHTML={{__html:description}}></span>
        </div>
    )
}

function Results(props){
    return (
        <div className="columns is-multiline">
            {props.results.map((r)=>
                <div className="column is-3" key={r._id}>
                    <div className="card image-result-container" key={r._id}>
                        <div className="card-image">
                            <img src={r.thumbnail} onClick={()=>props.popup.setMonster(r.media_fullsize)}/>
                        </div>
                        <div className="card-content">
                            <p>{r.width} x {r.height}</p>
                            <p><a href={r.url}>{r.title}</a></p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Field(props){
    var isNumber = props.type && props.type=="number";
    var isArea = props.type && props.type=="textarea";
    var isDisabled = (props.parent==undefined);

    var getValue = function(){
        if(isDisabled){
            return props.value;
        } else {
            return props.parent.state[props.object][props.field];
        }
    };

    var setValue = function(value){
        if(value==""){
            value = null;
        }

        if(isNumber && value!=null){
            value = parseFloat(value);
        }

        var obj = props.parent.state[props.object];

        if(value!=null){
            obj[props.field] = value;
        } else {
            delete obj[props.field];
        }

        props.parent.setState({[props.object]: obj})

        if(props.parent.onUpdate){
            props.parent.onUpdate();
        }
    }

    var input;

    if(isArea){
        input = (
            <textarea disabled = {isDisabled}
                className = "textarea"
                type = {isNumber ? "number" : "text" }
                placeholder = {props.placeholder ? props.placeholder : props.title}
                value = {getValue()}
                onChange = {(e) => setValue(e.target.value)} />
        );
    } else {
        input = (
            <input disabled = {isDisabled}
                className = "input"
                type = {isNumber ? "number" : "text" }
                placeholder = {props.placeholder ? props.placeholder : props.title}
                value = {getValue()}
                onChange = {(e) => setValue(e.target.value)} />
        );
    }

    return (
        <div className="field">
            <label className="label">{props.title}</label>
            <div className="control">
                {input}
            </div>
        </div>
    );
}