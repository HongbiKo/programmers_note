import React from 'react';
import logo from './logo.svg';
import './App.css';

// 기존의 자바스크립트 문법
/*
function App() {
	return Recate.createElement("div", null, "Hello, 리액트!!", 
	React.createElement("p", null, "반갑습니다."));
}
*/

// 리액트 JSX 문법
// 1. 반드시 최상위 부모 태그가 있어야함 -> <div></div> or <></> 사용 -> 가상 돔을 사용하기 때문에 컴포넌트로 만들어줌

// 2. 클래스는 className을 사용

// 3. 자바스크립트 코드 사용 가능 -> {} 안에서 사용 가능
// {} 안에서 조건문 사용 가능 -> if문 말고 삼항 연산자
// 4. 인라인 스타일 적용 (변수 사용) -> 컴포넌트 안에서 스타일을 지정해 그 내부에서 사용할 수 있게 함

// (인라인 스타일 :카멜 표기법 사용) -> 해당 컴포넌트 안에서만 사용하고 싶을 때
// 일반 css는 모든 컴포넌트들이 공유

// 5. 태그는 닫는 태그 꼭 써야함 -> <></> or <br />

// 6. 주석 작성 (메모 or 임시로 코드의 실행 중지시키고 싶을때)
  /* 
  작성자 : 000, 
  작성일 : 2030.06.06,
  내용 : 기능에 대한 내용
  */
function App() {
  let name = '리액트';
  const style = {
    backgroundColor : 'black',
		color : 'white',
		fontSize : '48px',
		fontWeight : 'bold',
		padding : '20px'
  }
  return (
    <div style = {style}>
      <h1 className="test">Hello, {
          name === '리액트' ? (<h1>YES</h1>) : null
        }</h1>
      <p>반갑습니다.</p>
      {/* 주석문 */}
    </div>
  );

  /*
  const port = undefined;
  return(
    <div>
      {
        port || '포트를 설정하지 않았습니다. or 디폴트값(3000)'
      }
    </div>
  );
  */
}

export default App;
