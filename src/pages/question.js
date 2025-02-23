import React, { useEffect, useState } from 'react'
import Analysis from './analyse';

function Question({job}){

    
    const[question,setQuestion] = useState("");
    const[answer,setAnswer] = useState("");
    const[analysis,setAnalysis] = useState("");
   
    useEffect(()=>{
        
        fetch("/getQuestion",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify({"job":job}),

        }).then(
            res => res.json()
        ).then(
            data =>
                setQuestion(data.generated)
        )
        
    },[])

    function handleSubmit(e){
        e.preventDefault();
        fetch("/analyse",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify({"question":question, "answer":answer}),

        }).then(
            res => res.json()
        ).then(
            data =>
                setAnalysis(data.analysis)
        )
        
    }
    
  return (
    <div>
        <div className="question-box">
            <div className="question">{question || "Your interview question will appear here..."}</div>
        </div>
        <div className="answer-box">
            <div className="answer">
                <form>
                <input 
          type="text" 
          placeholder="Enter your answer" 
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>submit</button>
                </form>
            </div>
        </div>
        <Analysis analysis={analysis}/>
    </div>
  )
}

export default Question