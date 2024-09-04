# programmers_note

## 📍 이번주 배운것 정리

### ✏️ 자바스크립트가 이해하는 문자열과 숫자

    // params-demo.js
    
    const express = require('express');
    const app = express();
    
    app.listen(1234);
    
    app.get('/products/:n', funtion(req, res) {
	    res.json({
		    num : req.params.n
	    })
    })

app.get('/test/1', function(req, res) {
	res.json({
		test: 1
	})
})

: 저 위의 코드를 가지고 서버를 구동시키면 어떻게 화면이 출력될까?

http://localhost:1234/products/1 : {"num" : "1"}
http://localhost:1234/test/1 : {"test" : 1}

분명 숫자로 들어왔는데 문자로 인식하는 것을 볼 수 있다.

자바스크립트는 자료형을 신경 쓰는 언어가 아니다.(= 자료형을 구분하는 것을 중요하게 생각하지 않음)

만약, 연산을 하기 위해 params의 n을 이용해 if (req.params.n > 10) {console.log(”url로 전달받은 숫자가 10보다 크네요”)}라는 코드를 추가하면 콘솔창에 if문의 문구가 찍힌 것을 볼 수 있다. 화면에서는 분명 문자열이라고 출력했는데 if문에서는 숫자로 판단해 콘솔창에 문구가 찍힌다.

이 말은, 문자열 10과 숫자 10을 구분하지 못한다는 것인데, 이것은 자바스크립트의 특징 중 하나이다. 다른 언어에서는 불가능한 이야기이다. 따라서, 우리는 다른 언어를 나중에 사용할 확률도 높고 오류를 막기 위해 보수적으로 생각해야한다.

그렇기 때문에,

💡 parseInt()
: 정수로 만들어주는 함수

를 사용 해야한다.

    // params-demo.js

    const express = require('express');
    const app = express();
    
    app.listen(1234);
    
    app.get('/products/:n', funtion(req, res) {
	    let number = parseInt(req.params.n) - 10;
	    console.log(number)
	    
	    res.json({
		    num : number
	    })
    })

    app.get('/test/1', function(req, res) {
	    res.json({
		    test: 1
	    })
    })
http://localhost:1234/products/20 접속 -> 콘솔창에 { "number" : 10 }이 찍혀 숫자로 잘 인식할 수 있다는 것을 알 수 있다.

이처럼 자바스크립트는 문자열과 숫자의 데이터 타입을 확실히 구분하지 않기 때문에 parseInt()를 사용해야한다!!

✏️ req.params_파라미터
: 우리는 유튜브의 각 채널을 클릭해서 url을 보면 닉네임으로 각 채널을 나타내는 것을 볼 수 있다.

ex)
https://www.youtube.com/@DingoMusic

이를 이용해서 api를 작성해보면,

    // params-demo.js
    
    //... 생략 ...
    app.get('/:nickname', function(req, res) {
    res.json({
          channel : req.params.nickname
        })
    })

정리(고도화)해보면 -> 변수로 빼서 더 단결하게 바꿔보자
: param이라는 변수를 선언해 사용하기 편하게 만드는게 좋다.

    // params-demo.js
    
    ... 생략 ...
    app.get('/:nickname', function(req, res) {
	    const param = req.params
	    res.json({
		    channel : param.nickname
	    })
    })

### ✏️ req.query_쿼리
: https://www.youtube.com/watch?v=6RQ-bBdASvk&t=945s
위의 주소를 보면, ? 다음에 v=영상코드&t=시간 의 형태를 볼 수 있다.

*?는 쿼리스트링으로 파라미터를 받는다는 의미임

위에서 파라미터를 고도화한것처럼 쿼리도 고도화해서 작성해보면,

    // params-demo.js
    
    //... 생략 ...
    // 영상 타임 라인 주소 : https://www.youtube.com/watch?v=6RQ-bBdASvk&t=945s
    app.get('/watch', function(req, res) {
	    const q = req.query;
	    consoel.log(q);
	    
	    res.json({		
	    })
	    
    })
    
http://localhost:1234/watch?v=6RQ-bBdASvk&t=945s 접속 -> { v: ‘6RQ-bBdASvk’, t:’945s’ }를 콘솔창에서 확인할 수 있음

그런데, 이미 q는 json형태이므로, 화면에 출력하기 위해서 변수 q만 json으로 넘겨줄 수 있다. 그리고 키를 지정해서 알아보기 쉬운 json 형태를 만든다.

    // params-demo.js
    
    // ... 생략 ...
    // 영상 타임 라인 주소 : https://www.youtube.com/watch?v=6RQ-bBdASvk&t=945s
    app.get('/watch', function(req, res) {
	    const q = req.query;
	    
	    res.json({
		    video : q.v,
		    timeline : q.t	
	    })
	    
    })
    
### ✏️ 자바스크립트 객체, 배열 비구조화
💡 객체 비구조화
: const {변수이름1, 변수이름2} = 객체
의 형태

변수 이름을 사용해 객체를 비구조화 해서 사용할 수 있다
*변수 이름을 바꾸면 안되고 그대로 사용해야함
    // params-demo.js
    
    ... 생략 ...
    
    app.get('/watch', function(req, res) {
	    const {v, t} = req.query;
	    
	    res.json({
		    video : v,
		    timeline : t
	    })
	    
    })


💡 배열 비구조화
: const [변수이름1, 변수이름2] = 배열
의 형태

배열은 순서에 따라 원하는 값을 가져오면 된다
*변수 이름을 어떻게 하든 상관 없음
    // array-demo.js
    
    const array = [1, 2, 3, 4, 5];
    const [ , num2, num3, , num5] = array;
    
    console.log(num2); // 2
    console.log(num3); // 3
    console.log(num5); // 5


### ✏️ 객체 만들어서 API 테스트
비구조화하기

    // object-api-demo.js
    
    const express = require('express');
    const app = express();
    
    app.listen(1234);
    
    app.get('/:nickname', function(req, res) {
	    const {nickname} = req.params;
	    
	    res.json({
		    channel : nickname
	    })
     })

서버가 nickname에 대한 데이터를 미리 갖고 있다고 생각해보기

    // object-api-demo.js
    
    const express = require('express');
    const app = express();
    
    app.listen(1234);
    
    let youtuber1 = {
	    channelTitle : "떼껄룩",
	    subscribers : "186만명",
	    videoNumbers : "371개"
    }
    
    let youtuber2 = {
	    channelTitle : "딩고뮤직",
	    subscribers : "507만명",
	    videoNumbers : "2.5천개"
    }

    let youtuber3 = {
	    channelTitle : "원지의하루",
	    subscribers : "95.9만명",
	    videoNumbers : "308개"
    }
    
    app.get('/:nickname', function(req, res) {
	    const {nickname} = req.params;
	    
	    if(nickname == "@takealook") {
		    res.json(youtuber1)
	    } else if(nickname == "@DingoMusic") {
		    res.json(youtuber2)
	    } else if(nickname == "@im1G") {
		    res.json(youtuber3)
	    } else {
		    res.json({
			    message : "Not Found"
		    })
	    }
    })

개발자가 예상하지 못한 에러 = 예외가 발생했다
라고 함 -> 예외가 발생했을 때의 상황도 대비한 코드 넣을 것 (else문 message처럼)










### ✏️ 자바스크립트 네이밍 룰
- kebab-case
  - 폴더 ex) demo-api
  - 파일 ex) object-api-demo.js
  - 특징 : 두 개 이상의 단어를 합쳐 쓸 땐, 첫번째 단어와 두번째 단어 사이에 하이픈(-) & 알파벳 소문자

-camel-case
  - 변수, 함수 ex) channelTitle, videoNum
  - 특징 : 두 개 이상의 단어를 합쳐 쓸 땐, 두번째 단어의 첫글자를 대문자로

- pascal-case
  - 클래스 ex) Channel
  - 특징 : 첫번째 단어도 대문자로

- snake-case
  - ex) channel_name
  - 특징: 두 단어 사이를 이어 줄 때 언더바(_) 사용

각 상황에 맞게 통일해서 사용할 것

### ✏️ 자바스크립트 Map

💡 Map : 데이터 베이스 테이블 처럼 생긴 아이

map이라는 자료 구조는 key와 value를 쌍으로 가져 데이터를 저장하는 형태를 지님
key를 가지고 value를 찾을 수 있음
json이 map형태임(= json을 알면 map도 쓸 수 있음)

📍javascript + Map
    // map-demo.js

    let db = new Map();
    db.set(1, "NoteBook");
    db.set(2, "Cup");
    db.set(3, "Chair");
    
    console.log(db); // Map(3) { 1 => 'NoteBook', 2 => 'Cup', 3 => 'Chair' }
    console.log(db.get(1)); // NoteBook
    console.log(db.get(2)); // Cup
    console.log(db.get(3)); // Chair
    // 키로 밸류를 찾을 수 있는 한 쌍을 저장
    
❗️ 신입 사원 역량으로 반드시 알아야 하는 자료구조 : Map, List

### ✏️ express 구조
: app.js, www.js 파일 ... 등등 미리 다 구현 되어 있고, 우리는 이것들을 활용해 웹서비스를 만듦

참고사이트를 보고 www파일과 app.js파일을 간단히 정리하자면,

bin/www
: www파일은 http모듈에 express모듈을 연결하고, 포트를 지정
- debug모듈 : 콘솔에 로그 남기는 모듈
- app.set('port',port) : 서버 실행될 포트 설정(기본값 3000번 포트 이용)
- app.set(키, 값) : 데이터 저장
- app.get(키, 값) : 데이터 가져옴
- http.createServer : 불러온 app 모듈 넣어주고 콜백함수역할을 함
- listen : 포트 연결 및 서버 실행
app.js
- app.set : express 앱 설정
app.use : 미들웨어 연결(http 외의 것들)

### ✏️ 자바스크립트 함수 4가지 종류

    // function.js
    
    // 함수 선언식
    function add1(x, y) {
	    return x + y
    }
    
    // 함수 표현식
    let add2 = function(x, y) {
	  return x + y;
    }

    // 화살표 함수 1
    let add3 = (x, y) => {
	  return x + y
    }
    
    // 화살표 함수 2
    let add4 = (x, y) => x + y
    
    console.log(add1(1, 2)); // 3
    console.log(add2(1, 2)); // 3
    console.log(add3(1, 2)); // 3
    console.log(add4(1, 2)); // 3

### ✏️ POST

HTTP 메소드 중,
POST -> 웹브라우저가(api입장에서는) post 목적으로 데이터를 등록하려 하는 것
ex) 회원가입 = id, password, name, email, contact를 등록 해달라고 데이터를 보낼 것임

- 그럼 GET(조회)처럼 url을 이용해서 데이터를 보내면 되는 것이 아닌가?

NOPE

- 개인정보들을 url로 보내면 보안상의 문제가 있어서 데이터들을 숨겨서 보내야함

- 따라서, body에 숨겨서 보낼 예정

- 웹브라우저(정확히 api는)는 post로 요청하면 body에 정보들을 숨겨서 보낼 것이라고 알고 있음 -> 데이터가 body에 숨겨져 와야 POST인 줄 앎

- 뿐만 아니라, 웹브라우저에서 테스트를 하고 싶을 때는 url로 받을 수 있는 get방식만 쓸 수 있음
