import styles from "./App.module.css" // css의 모듈화
import { useState, useEffect } from "react"


function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange= (event) => setKeyword(event.target.value);

  useEffect(() => {
    console.log("call the API....");
  }, []); 
  // 첫번째 인자는 한번만 실행될 코드
  useEffect(()=>{
    if(keyword !== "" && keyword.length > 5){
      console.log("SEARCH FOR", keyword);
    };
  }, [keyword]);
  // 특정한 두번째 인자의 변화가 발생했을 때 첫번째 인자의 코드 재실행
  useEffect(()=> {
    console.log("i run when keyword & counter change")
  },[keyword, counter]);
  return (
    <div>
      <input 
        value={keyword}
        onChange={onChange} 
        type="text" 
        placeholder="Search here..." 
      />
      <h1 className={styles.title}>{counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

export default App;
