function Statistic(props){
    var value = props.value ? props.value : 0;
    var score = Math.floor((value - 10) / 2);

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
        <div className="box" style={{flex: props.ratio}}>
            <div className="box-title">{props.title}</div>
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
        <div key={m.index} className="print-monster-column">
            <div className="print-monster-image-container">
                {m.image ?
                    <img src={m.image} onClick={() => props.app.setState({popup:m})}/>
                :
                    <button className="no-print" onClick={() => props.app.setState({popup:m})}>Find image</button>
                }
            </div>
            <div className="print-monster-row">
                <Box title="Name" ratio="4">
                    {m.name}
                </Box>
                <Box title="CR">
                    {challengeRating(m.challenge_rating)}
                </Box>
                <Box title="XP">
                    {m.challenge_rating * 200}
                </Box>
            </div>
            <div className="print-monster-row">
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
            <div className="print-monster-row">
                <Box title="AC">
                    {m.armor_class}
                </Box>
                <Box title="HP">
                    {m.hit_points} ({m.hit_dice})
                </Box>
                <Box title="Passive Perception">
                    {passivePerception(m)}
                </Box>
            </div>
            <div className="print-monster-row">
                <Box title="Speed">
                    {m.speed}
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
                    {m.languages ? m.languages: "--"}
                </Box>
            </div>
            <div className="print-monster-row">
                <Box title="Defenses">
                    {m.damage_vulnerabilities && <div><b>Damage Vulnerabilities</b> {m.damage_vulnerabilities}</div>}
                    {m.damage_resistances && <div><b>Damage Resistances</b> {m.damage_resistances}</div>}
                    {m.damage_immunities && <div><b>Damage Immunities</b> {m.damage_immunities}</div>}
                    {m.condition_immunities && <div><b>Condition Immunities</b> {m.condition_immunities}</div>}
                    <AbilitySaves monster={m}/>
                </Box>
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

function Results(props){
    return (
        <div>
            {props.results.map((r)=>
                <div className="image-result-container" key={r._id}>
                    <img src={r.thumbnail} onClick={()=>props.popup.setMonster(r.media_fullsize)}/>
                    <div>{r.width} x {r.height}</div>
                </div>
            )}
        </div>
    );
}
