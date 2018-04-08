function sign(number){
    if(number >= 0){
        return "+" + number;
    } else {
        return number;
    }
}

function challengeRating(c){
    if(c==0 || c>=1) return c;
    return "1/" + (1/c);
}

function passivePerception(m){
    var modifier = m.perception ? m.perception : statisticScore(m.wisdom);
    return 10 + modifier;
}

function filteredSenses(monster){
    var pp = passivePerception(monster);

    var senses;

    if(monster.senses){
        var senses = monster.senses.split(",").map((s)=>s.trim()).filter((s)=>s != "passive Perception " + pp).join(", ");
    }

    return (senses ? senses : "--");
}

function paginate(array, pageSize){
    var pages = [];
    var page = [];
    var count = 0;
    for(var index in array){
        if(page.length == pageSize){
            pages.push(page);
            page = [];
        }
        var element = array[index];
        page.push(element);
    }
    pages.push(page);
    return pages;
}

function hasDefenses(m){
    return m.damage_vulnerabilities || m.damage_resistances || m.damage_immunities || m.condition_immunities || m.strength_save || m.dexterity_save || m.constitution_save || m.intelligence_save || m.wisdom_save || m.charisma_save;
}

function experiencePoints(cr){
    return cr * 200;
}

function statisticScore(value){
    return Math.floor((value - 10) / 2);
}