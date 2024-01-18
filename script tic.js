const gamecell = document.querySelectorAll(".cells")
const player1 = document.querySelector(".player1")
const player2 = document.querySelector(".player2")
const restartbtn = document.querySelector("button")
const alertbox=document.querySelector(".alertbox")

/**************creating variables**************************************************** */
const playerone = "X";
const playertwo = "0";
let currentplayer = playerone;

playerone.textContent=`player 1: X}`;
playertwo.textContent=`player 2: 0}`
/*******************to start game******************************************* */
const startgame = () => {
    for (let c of gamecell) {
        c.addEventListener("click",handleclick  ) 
    }
}


/**************************************to check turn********** */
let checkturn = () => {
    currentplayer = currentplayer === playerone ? playertwo : playerone;
}

/************************************winner********************************** */
let winner = () => {
    const wincond = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < wincond.length; i++) {
        const [box1, box2, box3] = wincond[i]
        if (gamecell[box1].textContent !== '' && gamecell[box1].textContent === gamecell[box2].textContent && gamecell[box2].textContent === gamecell[box3].textContent) {

            return true;
        }
    }
    return false
}


/****************************************handleclick************** */
const handleclick=(e) => {
    if (e.target.textContent == "") {
        e.target.textContent = currentplayer;
        if (winner()) {
            console.log(`${currentplayer} is winner`);
            showalert(`${ currentplayer} is the winner`)
            disablecell();
        } else if (checktie()) {
            console.log(`tie`);
            showalert(`its a tie !`)
            disablecell();
        } else {
            checkturn()
            showalert(`turn for player :${currentplayer}`)
        }
    }
}





//   check tie***************************
const checktie = () => {
    let empty = 0;
    gamecell.forEach(cell => {
        if (cell.textContent === "") {
            empty++
        }
    })
    return empty === 0 && !winner()
}

/***************************to disable *******************/
const disablecell=()=>{
    for(let a of gamecell){
         a.removeEventListener("click",handleclick);
         a.classList.add('disabled');
    };
        
    
}
 /*******************************alert box************ */

const showalert=(msg)=>{
    alertbox.style.display="block";
    alertbox.textContent=msg;
    setTimeout(()=>{
        alertbox.style.display="none"
    },5000)
}



/*********************restart************* */

const restart=()=>{
  for (let a of gamecell){
    a.textContent=""
    a.classList.remove("disabled")
  }
  startgame()
} 

restartbtn.addEventListener("click",restart)
  

startgame()