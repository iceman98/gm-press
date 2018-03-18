function sign(number){
    if(number > 0){
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
    var modifier = m.perception ? m.perception : Math.floor((m.wisdom - 10) / 2);
    return 10 + modifier;
}

function filteredSenses(monster){
    var pp = passivePerception(monster);
    var senses = monster.senses.split(",").map((s)=>s.trim()).filter((s)=>s != "passive Perception " + pp).join(", ");
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