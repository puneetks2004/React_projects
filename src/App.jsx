import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

function App() {


  //states being changes and stored are mentioned here
  const [length, setLength] = useState(10);//default length assigned is 10
  const [numberAllowed, setNumberAllowed] = useState(false);//by default not allowed
  const [charAllowed, setCharAllowed] = useState(false);//by default not allowed
  const [password, setPassword] = useState("");//currently empty because nothing set initially

  const passwordRef = useRef(null);//initially assigned as null

  const Password_Generator = useCallback(() => {

    let pass = "";//initially empty
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";//consist of all values a to z that can be used initially



    if (numberAllowed)//if number allowed than change the string
    {
      str += "123456789";
    }

    if (charAllowed)//if character allowed than change the string
    {
      str += "#$%^&*(){}";
    }

    for (let i = 0; i < length; i++)//keeps on running till value is less than length
    {
      pass += str[Math.floor(((Math.random()) * str.length))];//picks a random value from string
    }//password is being created and is being stored in pass

    setPassword(pass);//sending pass newly created to set(password) useState

  }

    , [length, charAllowed, numberAllowed]);//dependencies

  //for copy
  const copy_to_clipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99)
    window.navigator.clipboard.writeText(password);
  }, [password])


  //to run this password_Generator funnction
  useEffect(() => {
    Password_Generator()
  }, [length, charAllowed, numberAllowed])//dependencies

  return (
    <>
      <div className='border-2 border-white text-white capitalize text-2xl m-20 grid justify-center items-center p-10 w-200 place-self-center rounded-4xl'>
        <div className='flex justify-center items-center'>password generator</div>
        <div className="border-2 border-white h-10  mt-10 mb-10 flex justify-around items-center "  >
          <input type="text" readOnly placeholder='Password' className='h-full  bg-black text-white w-100 border-2 border-black pl-2' value={password} ref={passwordRef} />
          <button className='capitalize cursor-pointer bg-white text-black h-full w-20 flex justify-center items-center hover:bg-purple-300  ' onClick={copy_to_clipboard}>copy</button>
        </div>
        <div className='flex justify-between items-center m-2'>
          <input type="range" className='cursor-pointer ' min={6} max={100} value={length}
            onChange={(e) => { setLength(e.target.value) }} />
          <label className='text-xl text-white'>Length : {length}</label>
        </div>
        <div className='flex justify-between pt-3 pb-2 m-2 '>
          <input type="checkbox" id="numberAllowed" defaultChecked={numberAllowed} onClick={() => {
            setNumberAllowed((prev) =>  !prev ) 
          }} ></input>
          <label htmlFor="numberAllowed" className='text-xl'>Number Allowed</label>
          <input type="checkbox" id="charAllowed" defaultChecked={charAllowed} onClick={() => {
            setCharAllowed((prev) =>  !prev )
          }}></input>
          <label htmlFor="charAllowed" className='text-xl'>Character Allowed</label>
        </div>
      </div>
    </>
  )
}

export default App
