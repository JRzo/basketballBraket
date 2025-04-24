// select a team in the east


// alert("Rules: Click on the team that will advance. \n Click on the team in round one every time.")
let teams = {
    "oneWest": document.querySelector('.oneSeed'),
    "twoWest": document.querySelector('.secondSeed'),
    "threeWest": document.querySelector('.thirdSeed'),
    "fourWest": document.querySelector('.fourSeed'),
    "fiveWest": document.querySelector('.fiveSeed'),
    "sixWest": document.querySelector('.sixSeed'),
    "sevenWest": document.querySelector('.sevenSeed'),
    "eightWest": document.querySelector('.eightSeed'),
}

let teamsEast = {
    "oneEast": document.querySelector('.oneSeedEast'),
    "twoEast": document.querySelector('.secondSeedEast'),
    "threeEast": document.querySelector('.thirdSeedEast'),
    "fourEast": document.querySelector('.fourSeedEast'),
    "fiveEast": document.querySelector('.fiveSeedEast'),
    "sixEast": document.querySelector('.sixSeedEast'),
    "sevenEast": document.querySelector('.sevenSeedEast'),
    "eightEast": document.querySelector('.eightSeedEast'),
}

let match = document.querySelectorAll(".match")



let westTeamFetch = async () => {
    try{
        const response = await fetch("/api/teams");
        if(!response.ok) throw new Error("Error Loading");

        const data = await response.json();
        let v = 0;
        Object.entries(teams).forEach((x) => {
            x[1].innerHTML = `${data[v]["abbreviation"]} (${data[v]['record']['wins']} -${data[v]['record']['losses']}) \n ${data[v]['seed']}`;
            v++;
        })
        
        console.log(data);
        return data;

    }
    catch(error){
        console.log(error);
    }
}

let eastTeamFetch = async () =>{
    try{
        const response = await fetch("/api/teams/east");
        if(!response.ok) throw new Error("Error Loading");

        const data = await response.json();
        let v = 0;
        Object.entries(teamsEast).forEach((x) => {
            x[1].innerHTML = `${data[v]["abbreviation"]} (${data[v]['record']['wins']} -${data[v]['record']['losses']}) \n ${data[v]['seed']}`;
            v++;
        })
        
        console.log(data);
        return data;

    }
    catch(error){
        console.log(error);
    }
}
let e = eastTeamFetch()
let v = westTeamFetch();

// Writting the possibilities
// 1 => 1 vs 8 => 1 vs (4||5) =>
// 2 => 2 vs 7 => 2 vs (3||6)
// 3 => 3 vs 6 => 3 vs (7||2)
// 4 => 4vs 5 => 4 vs (1||8)

let flagsRoundOne = {
    "flagOne": true,
    "flagTwo": true,
    "flagThree": true,
    "flagFour": true
}

let flagsRoundTwo = {
    "flagOne": true,
    "flagTwo": true
}

let flagsRoundThree = {
    "flagOne": true
}

// East flags 

function checkTeamRoundThree(team, text){
    
        // 1 || 8 vs 4 || 5
    if((team == "OKC" || team == "MEM" || team == "LAC" || team == "DEN" || team == "LAL" || team == "MIN" || team == "HOU" || team == "GSW")&& flagsRoundThree["flagOne"]){
        document.querySelector(".finalsTop").innerHTML = text;
        flagsRoundThree["flagOne"] = false
    }

    
}

function checkTeamRoundTwo(team, text){
    // 1 || 8 vs 4 || 5
    if((team == "OKC" || team == "MEM")&& flagsRoundTwo["flagOne"]){
        document.querySelector(".teamOneCofWest").innerHTML = text;
        flagsRoundTwo["flagOne"] = false
    }
    else if((team == "DEN" || team == "LAC")&& flagsRoundTwo["flagOne"]){
        document.querySelector(".teamOneCofWest").innerHTML = text;
        flagsRoundTwo["flagOne"] = false
    }

    //  6 || 3 vs 2 || 7

    if((team == "LAL" || team == "MIN")&& flagsRoundTwo["flagTwo"]){
        document.querySelector(".teamTwoCofWest").innerHTML = text;
        flagsRoundTwo["flagTwo"] = false
    }
    else if((team == "HOU" || team == "GSW")&& flagsRoundTwo["flagTwo"]){
        document.querySelector(".teamTwoCofWest").innerHTML = text;
        flagsRoundTwo["flagTwo"] = false
    }


}
function checkTeamRoundOne(team, text){
    // 1 vs 8

    if(team == "oneWest" && flagsRoundOne["flagOne"]){
        document.querySelector(".teamOneTop").innerHTML = text;
        flagsRoundOne["flagOne"]= false
    }
    else if(team == "eightWest" && flagsRoundOne["flagOne"]){
        document.querySelector(".teamOneTop").innerHTML = text;
        flagsRoundOne["flagOne"] = false
    }

    // 2 vs 7

    if(team == "twoWest" && flagsRoundOne["flagTwo"]){
        document.querySelector(".teamTwoBottom").innerHTML = text;
        flagsRoundOne["flagTwo"] = false
    }
    else if(team == "sevenWest" && flagsRoundOne["flagTwo"]){
        document.querySelector(".teamTwoBottom").innerHTML = text;
        flagsRoundOne["flagTwo"] = false
    }

    // 3 vs 6
    if(team == "threeWest" && flagsRoundOne["flagThree"]){
        document.querySelector(".teamOneBottom").innerHTML = text;
        flagsRoundOne["flagThree"] = false
    }
    else if(team == "sixWest" && flagsRoundOne["flagThree"]){
        document.querySelector(".teamOneBottom").innerHTML = text;
        flagsRoundOne["flagThree"] = false
    }

    // 4 vs 5
    if(team == "fourWest" && flagsRoundOne["flagFour"]){
        document.querySelector(".teamTwoTop").innerHTML = text;
        flagsRoundOne["flagFour"] = false
    }
    else if(team == "fiveWest" && flagsRoundOne["flagFour"]){
        document.querySelector(".teamTwoTop").innerHTML = text;
        flagsRoundOne["flagFour"]= false
    }

    // (checkTeamRoundTwo() && )
}

let confWest = document.querySelectorAll(".conFW");
let finalWest = document.querySelectorAll(".confFiW");

Object.entries(teams).forEach((x) => {
    x[1].addEventListener("click", () => {
        checkTeamRoundOne(x[0], x[1].innerHTML)
    })
})

confWest.forEach((x) =>{
    x.addEventListener("click", () => {
        if(Object.values(flagsRoundOne).every((x) => x == false)){
            checkTeamRoundTwo(x.innerHTML.split(" ")[0], x.innerHTML)
        }
    })
})


finalWest.forEach((x) =>{
    x.addEventListener("click", () => {
        if(Object.values(flagsRoundTwo).every((x) => x == false)){
            checkTeamRoundThree(x.innerHTML.split(" ")[0], x.innerHTML)
        }
    })
})



// East 

// East flags 
// East flags 
let flagsRoundOneEast = {
    "flagOne": true,
    "flagTwo": true,
    "flagThree": true,
    "flagFour": true
}

let flagsRoundTwoEast = {
    "flagOne": true,
    "flagTwo": true
}

let flagsRoundThreeEast = {
    "flagOne": true
}
// Round 3 east
function checkTeamRoundThreeEast(team, text){
    
    // 1 || 8 vs 4 || 5
if((team == "CLE" || team == "MIA" || team == "IND" || team == "MIL" || team == "NYK" || team == "DET" || team == "BOS" || team == "ORL")&& flagsRoundThreeEast["flagOne"]){
    document.querySelector(".finalsBottom").innerHTML = text;
    flagsRoundThreeEast["flagOne"] = false
}


}
// Round two east
function checkTeamRoundTwoEast(team, text){
    // 1 || 8 vs 4 || 5
    if((team == "CLE" || team == "MIA")&& flagsRoundTwoEast["flagOne"]){
        document.querySelector(".teamOneCofEast").innerHTML = text;
        flagsRoundTwoEast["flagOne"] = false
    }
    else if((team == "IND" || team == "MIL") && flagsRoundTwoEast["flagOne"]){
        document.querySelector(".teamOneCofEast").innerHTML = text;
        flagsRoundTwoEast["flagOne"] = false
    }

    //  6 || 3 vs 2 || 7

    if((team == "NYK" || team == "DET")&& flagsRoundTwoEast["flagTwo"]){
        document.querySelector(".teamTwoCofEast").innerHTML = text;
        flagsRoundTwoEast["flagTwo"] = false
    }
    else if((team == "BOS" || team == "ORL")&& flagsRoundTwoEast["flagTwo"]){
        document.querySelector(".teamTwoCofEast").innerHTML = text;
        flagsRoundTwoEast["flagTwo"] = false
    }


}

function checkTeamRoundOneEast(team, text){
    // 1 vs 8

    if(team == "oneEast" && flagsRoundOneEast["flagOne"]){
        document.querySelector(".teamOneTopEast").innerHTML = text;
        flagsRoundOneEast["flagOne"]= false
    }
    else if(team == "eightEast" && flagsRoundOneEast["flagOne"]){
        document.querySelector(".teamOneTopEast").innerHTML = text;
        flagsRoundOneEast["flagOne"] = false
    }

    // 2 vs 7

    if(team == "twoEast" && flagsRoundOneEast["flagTwo"]){
        document.querySelector(".teamTwoBottomEast").innerHTML = text;
        flagsRoundOneEast["flagTwo"] = false
    }
    else if(team == "sevenEast" && flagsRoundOneEast["flagTwo"]){
        document.querySelector(".teamTwoBottomEast").innerHTML = text;
        flagsRoundOneEast["flagTwo"] = false
    }

    // 3 vs 6
    if(team == "threeEast" && flagsRoundOneEast["flagThree"]){
        document.querySelector(".teamOneBottomEast").innerHTML = text;
        flagsRoundOneEast["flagThree"] = false
    }
    else if(team == "sixEast" && flagsRoundOneEast["flagThree"]){
        document.querySelector(".teamOneBottomEast").innerHTML = text;
        flagsRoundOneEast["flagThree"] = false
    }

    // 4 vs 5
    if(team == "fourEast" && flagsRoundOneEast["flagFour"]){
        document.querySelector(".teamTwoTopEast").innerHTML = text;
        flagsRoundOneEast["flagFour"] = false
    }
    else if(team == "fiveEast" && flagsRoundOneEast["flagFour"]){
        document.querySelector(".teamTwoTopEast").innerHTML = text;
        flagsRoundOneEast["flagFour"]= false
    }
}

let confEast = document.querySelectorAll(".conFE");
let finalEast = document.querySelectorAll(".confFiE");

Object.entries(teamsEast).forEach((x) => {
    x[1].addEventListener("click", () => {
        checkTeamRoundOneEast(x[0], x[1].innerHTML)
    })
})

confEast.forEach((x) =>{
    x.addEventListener("click", () => {
        if(Object.values(flagsRoundOneEast).every((x) => x == false)){
            checkTeamRoundTwoEast(x.innerHTML.split(" ")[0], x.innerHTML)
        }
    })
})


finalEast.forEach((x) =>{
    x.addEventListener("click", () => {
        if(Object.values(flagsRoundTwoEast).every((x) => x == false)){
            checkTeamRoundThreeEast(x.innerHTML.split(" ")[0], x.innerHTML)
        }
    })
})


// Check Finals

let flagFinals = true;
let finalTeams = document.querySelectorAll(".finalTeam")


let championTeam = async (team) =>{
    alert("Your 2024-2025 Champ is: " + team)
}
function finals(team){

    // 1 || 8 vs 4 || 5
    if((team == "CLE" || team == "MIA" || team == "IND" || team == "MIL" || team == "NYK" || team == "DET" || team ==       "BOS" ||  team == "ORL" || team == "OKC" || team == "MEM" || team == "LAC" || team == "DEN" || team == "LAL" || team == "MIN" || team == "HOU" || team == "GSW") && flagFinals){
        championTeam(team)
        flagFinals = false;

    }
}

// Final team

finalTeams.forEach((x) =>{
    x.addEventListener("click", () =>{
        if(Object.values(flagFinals).every((x) => x == false)){
            finals(x.innerHTML.split(" ")[0])
        }
    })
})

