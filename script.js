let user_score = 0;
let comp_score = 0;
const user_score_span = document.getElementById("user_score");
const comp_score_span = document.getElementById("comp_score");
const result = document.getElementById("result");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissor_div = document.getElementById("s");

rock_div.addEventListener('click', function(){
    game('r')
})

paper_div.addEventListener('click', function(){
    game('p')
})

scissor_div.addEventListener('click', function(){
    game('s')
})

function convert(input){
    if (input === 'r') return "Rock";
    if (input === 'p') return "Paper";
    else return "Scissors";
}
function win(user, comp){
    user_score++;
    console.log("WIN");
    result.innerHTML = convert(user) + " beats " +convert(comp) + ", You Win!";
    user_score_span.innerText = user_score;
    document.getElementById(user).classList.add('green');
    setTimeout(function(){document.getElementById(user).classList.remove('green');}, 300);
}

function lose(user, comp){
    comp_score++;
    console.log("LOSE");
    result.innerHTML = convert(comp) + " beats " +convert(user) + ", You Lose!";
    comp_score_span.innerText = comp_score;
    document.getElementById(user).classList.add('red');
    setTimeout(function(){document.getElementById(user).classList.remove('red');}, 300);}


function draw(user, comp){
    console.log("DRAW")
    result.innerHTML = "Both drew " + convert(user) + ", It's a Draw."
    document.getElementById(user).classList.add('gray');
    setTimeout(function(){document.getElementById(user).classList.remove('gray');}, 300);
}

function getCompChoice(){
    const comp_choice = ['r' , 'p', 's'];
    const index = (Math.floor(Math.random()*3));
    return comp_choice[index]
}
function game(choice){
    const comp_choice = getCompChoice();

    switch(choice+comp_choice){
        case "rs":
        case "sp":
        case "pr":
            win(choice, comp_choice);
            break;
        case "sr":
        case "ps":
        case "rp":
            lose(choice, comp_choice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(choice, comp_choice);
            break;
    }
}
