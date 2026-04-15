

import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {

  let boxes = new Array(100);
  boxes.fill(1);

  const [snake, setsnake] = useState([
    { x: 6, y: 3 },

    { x: 5, y: 3 },
    { x: 4, y: 3 }

  ])
  const[score, setscore] = useState(0);

  const [direction, setDirection] = useState("right");
  const directionRef = useRef(direction)
  const directionLockRef = useRef(false)

  const [food, setFood] = useState({ x: 2, y: 2 })
  const foodRef = useRef(food)

  const [gameOver, setgameOver] = useState(false)
  
  const [gameStart, setGameStart] = useState(false)
  const gameOverhandler = () => {
    if (gameOver) {
      console.log("Game over");

    }
  }

  const gameStartHandler = ()=> {
      setscore(0)
      setDirection("right")
       setgameOver(false)
  setGameStart(true)
      
      
      setsnake([
    { x: 6, y: 3 },

    { x: 5, y: 3 },
    { x: 4, y: 3 }

  ])
 
    

  }


  const moveSnake = () => {



    let x;
    let y;
    setsnake(prevSnake => {
      let head = prevSnake[0];
      if (gameOver || !gameStart) return;

      if (directionRef.current === "right") {
        x = head.x + 1;
        y = head.y;
      }
      else if (directionRef.current === "left") {
        x = head.x - 1;
        y = head.y;
      }
      else if (directionRef.current === "up") {
        x = head.x;
        y = head.y - 1;
      }
      else {
        x = head.x;
        y = head.y + 1;
      }
      let newHead = { x, y }
      if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
        setscore(
          prev=>{
            const newscore=prev+1;
          return newscore
        });
        let foodx = Math.floor(Math.random() * 10);
        let foody = Math.floor(Math.random() * 10);

        while ([newHead, ...prevSnake].some(segment => segment.x === foodx && segment.y === foody)) {
          foodx = Math.floor(Math.random() * 10);
          foody = Math.floor(Math.random() * 10);
        }

        setFood({ x: foodx, y: foody })
        return [newHead, ...prevSnake]
      }
      if (newHead.x > 9 || newHead.y > 9 || newHead.x < 0 || newHead.y < 0) {
        const highscore=parseInt(localStorage.getItem("highscore")) || 0
      
        console.log(highscore);
        
        if (highscore<score) {
          localStorage.setItem("highscore", score)
          console.log(score);
          
        }
        
        setgameOver(true)
      

      }
      if (prevSnake.some(body=>body.x==newHead.x && body.y==newHead.y )) { setgameOver(true);
        
        }


      const newSnake = [newHead, ...prevSnake];
      newSnake.pop();
      return newSnake;
    });
    directionLockRef.current = false


    
  }



  // useEffect(()=>{
  //   const Interval=setInterval(()=>{
  //     generateFood()
  //   },4000)
  //   return ()=>clearInterval(Interval)

  // },[])
  useEffect(()=>{
    if (gameOver) 
    {
      const highscore=parseInt(localStorage.getItem("highscore")) || 0
      
        console.log(highscore);
        
        if (highscore<score) {
          localStorage.setItem("highscore", score)
          console.log(score);
          
        }
    }
  }, [gameOver])



  useEffect(() => {
    foodRef.current = food
  }, [food])



  useEffect(() => {
    directionRef.current = direction;

  }, [direction]);


  useEffect(() => {
    if (gameOver || !gameStart) return;
    const interval = setInterval(() => { moveSnake() }, 400)
    return () => clearInterval(interval)

  }, [gameStart, gameOver])

  useEffect(() => {
    const handleKey = (event) => {
      if (directionLockRef.current) return;
      setDirection(prevDirection => {
        if (event.key === "ArrowUp" && prevDirection != "down") {
          directionLockRef.current = true;
          return ("up")
        }
        else if (event.key === "ArrowDown" && prevDirection != "up") {
          directionLockRef.current = true;
          return ("down")
        }
        else if (event.key === "ArrowLeft" && prevDirection != "right") {
          directionLockRef.current = true;
          return ("left")
        }
        else if (event.key === "ArrowRight" && prevDirection != "left") {
          directionLockRef.current = true;
          return ("right")
        }
        return prevDirection;
      })
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);



  }, [gameStart, gameOver]);





  return (

    <div className='flex flex-col justify-center mt-2 relative'>
      <div className='grid gap-0 w-100 mx-auto   grid-cols-10'>

        {!gameOver && gameStart && boxes.map((box, index) => {

          let x = index % 10;
          let y = Math.floor(index / 10);
          const head=snake[0];
          let isHead=head.x===x && head.y===y;
          let isSnake = false;
          let isFood = food.x === x && food.y === y
          isSnake = snake.some(box => box.x === x && box.y === y);
          let boxcolor;
          if (isHead) boxcolor="bg-blue-600"
          else if (isSnake) boxcolor = "bg-blue-400"
          else if (isFood) boxcolor = "bg-red-400"
          else boxcolor = "bg-green-400"


          return (<><div key={index} className={`h-10 w-10 border   border-black ${boxcolor}`}>

            {isHead && (
              <div className="flex gap-1 justify-between">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            )}
          </div>
            </>
          )

        })}
        {!gameStart && <div className='flex   flex-col justify-center mx-auto text-center'><button className='w-100 font-extrabold text-4xl bg-[#57cc99] shadow-[#38a3a5] hover:-translate-y-1 hover:duration-100   hover:bg-[#6bedb5] hover:ease-in-out shadow-lg rounded-2xl align-middle font-dynapuff py-2 mt-10' onClick={()=>gameStartHandler()}>Start game</button>
        
        <h1 className='font-medium pt-10 text-xl'><span className='text-4xl align-middle shadow-lg p-1 border border-amber-300 shadow-amber-500 rounded-full'>🏆</span> High Score: {localStorage.getItem("highscore")}<span className='align-middle px-2'>
          <button onClick={()=>{
            localStorage.setItem("highscore", 0)
            window.location.reload()

          }}><img className='w-10 align-middle my-auto  h-10' src='reset.png'/></button>
          </span></h1></div>}
        {!gameOver && gameStart && <div className='flex  mx-auto justify-center w-100'><h1 className='text-teal-600 font-bold self-center mx-auto   text-2xl '>Score: {score}</h1></div>}


      </div>
      <div className='flex p-2 m-10 justify-center w-full mx-auto'>
      {gameOver && <div className='flex flex-col p-10 h-full items-center absolute inset-0 justify-center'><h1 className='font-bold text-4xl content-center self-center  text-center  text-red-500'>GAME OVER</h1>
      
          <button className='bg-[#22577a] mx-auto shadow-md shadow-[#38a3a5]  rounded-md font-bold text-2xl px-2 hover:-translate-y-1 hover:duration-100   hover:bg-[#3fd494] hover:ease-in-out hover:text-white mt-5   text-[#80ed99]' onClick={()=>gameStartHandler()}>Restart</button>
          <div>
          <button className='bg-[#22577a] mx-auto shadow-md shadow-[#38a3a5]  rounded-md font-bold text-2xl px-2 hover:-translate-y-1 hover:duration-100   hover:bg-[#3fd494] hover:ease-in-out hover:text-white mt-5   text-[#80ed99]' onClick={()=>{window.location.reload()}}>Home</button>
          </div>


          


      </div>}
      <div className='grid gap-0 w-100 mx-auto   grid-cols-10'>
      {!gameStart && boxes.map((box, index) => {

            let boxcolor;
            let indices=[33,34,44,54,64, 65,66]
            let headindex=32
            if (indices.includes(index)) boxcolor="bg-blue-400"
            else if (index===headindex) boxcolor="bg-linear-90 from-blue-700 to-blue-400"
            else boxcolor="bg-green-400"


          return <div key={index} className={`h-10 w-10 border    border-black ${boxcolor}`}></div>

        })}</div>
      </div>

        <div className='mx-auto bottom-0 justify-center fixed font-mono font-bold'><p>Made by Tanseer Ahmad</p></div>
    </div>


  )
}

export default App
