import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [hasNumbers, sethasNumbers] = useState(true)
  const [hasSymbols, sethasSymbols] = useState(true)
  const [Password, setPassword] = useState('')
  // useRef is used to store the previous value of a state variable
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (hasNumbers) str += "0123456789"
    if (hasSymbols) str += "!@#$%^&*()_+~`|}{[]:;?><,./-="

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)

    // }, [length, hasNumbers, hasSymbols, Password]) // Adding Password as a dependency will cause an infinite loop because it is a state variable
  }, [length, hasNumbers, hasSymbols, setPassword]) // setPassword is a dependency because it is a function and it is used in the function named passwordGenerator, it will change when the state variable Password changes

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect(() => {
    passwordGenerator()
  }, [length, hasNumbers, passwordGenerator, hasSymbols]) // passwordGenerator is a dependency because it is a function and it is used in the function named useEffect, it will change when the state variable Password changes

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={Password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef}/>
          <button className='bg-gray-700 hover:bg-gray-600 text-white px-3 py-1' onClick={copyPassToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input onChange={(e) => { setlength(e.target.value) }} type="range" min={8} max={16} value={length} className='cursor-pointer' />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={hasNumbers} id='numberInput' onChange={() => { sethasNumbers((prev) => !prev) }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={hasSymbols} id='symbolInput' onChange={() => { sethasSymbols((prev) => !prev) }} />
            <label htmlFor="symbolInput">Symbols</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
