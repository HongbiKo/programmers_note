**2024년 9월 5일**

# ✏️ 전체 조회

: 어제이 어어서 전체 조회를 해보면,

- db를 전체 보내보자

  app.get("/youtubers", function (req, res) {
  res.json(db);
  });

- 결과는 {} 만 나옴

- 실제로 db에 아무것도 없을까? console 찍어보자

  app.get("/youtubers", function (req, res) {
  console.log(db);
  });

- 콘솔창을 보면 잘 들어가 있는 것을 볼 수 있다
  : 이 말은, map은 아무리 key와 value 쌍처럼 이루어져 있어도 json으로 바로 적용 될 수 없기 때문에 db를 꺼내서 json으로 바꿔야함

  app.get("/youtubers", function (req, res) {
  let youtubers = {};
  db.forEach((vlaue, index) => {
  youtubers[index] = value;
  });

      res.json(youtubers);

  });

_\*stringify() : json을 문자열로 바꾸는 메서드_

- POSTMAN : GET + localhost:1234/youtubers → 전체 데이터 조회 가능

# ✏️ forEach

: for + each = "향상된 /개선된 for문"

    // foreach-demo.js

    // 원래는 배열에 활용할 목적으로 만들어졌었음
    // 배열에 인덱스값으로 for문을 돌리는 것을 한 번에 해결하려고 했음

    const arr = [1, 2, 3, 4, 5];

    // 콜백함수가 무엇을 할까?
    // 언제 호출될지 알면 잘 알 수 있음
    // 객체 또는 배열에서 요소를 하나 꺼낸 다음
    // 매개변수로 그 요소를 전달하여 호출되는 콜백함수
    arr.forEach(function(a, b, c) {
        console.log(`${a} , ${b}, ${c}`);
        // a : 1, b : 0, c :1,2,3,4,5
        // a : 2, b : 1, c :1,2,3,4,5
        // a : 3, b : 2, c :1,2,3,4,5
        // a : 4, b : 3, c :1,2,3,4,5
        // a : 5, b : 4, c :1,2,3,4,5
        // a는 데이터, b는 인덱스, c는 객체 통째로
    })

    // map과 forEach
    let map = new Map();
    map.set(1, "a");
    map.set(3, "c");
    map.set(2, "b");

    // 배열과 객체는 index 들어가지만
    // map은 index가 아닌 key값이 들어감
    map.forEach(function(value, key, all) {
      console.log(`value : ${value}, key : ${key}, all : ${all}`);
      // value : a, key : 1, all: [object Map]
      // value : c, key : 3, all: [object Map]
      // value : b, key : 2, all: [object Map]
    })

# ✏️ map

: map과 forEach는 돌아가는 것은 같지만 반환하는 것이 다름

    // map-demo.js

    // Map객체가 아닌 map함수(메서드)에 관한 내용
    // vs foreach 차이

    const arr = [1, 2, 3, 4, 5]

    const eachArr = arr.forEach(function(a, b, c) {
      // console.log(`${a} , ${b}, ${c}`);

      return a * 2;
    })

    const mapArr = arr.map(function(a, b, c){
      // console.log(`${a} , ${b}, ${c}`);

      return a * 2;
    })

    console.log(`foreach : ${eachArr}, map: ${mapArr}`);
    // foreach : undefined, map : 2,4,6,8,10

- 둘의 콘솔 값은 똑같이 나온다.
  : 그럼 무엇이 다를까?

❗️ 리턴(return)하는 것에 차이가 있음
: foreach로 return하면 undefined값을 못받지만, map으로 return하면 새로운 array 받을 수 있음

# ✏️ DELETE

: DELETE http 메서드를 사용해 이제 유튜버를 삭제해보자

- DELETE /youtubers/:id
  _\*다른api와 url이 같아도 http메서드가 다르면 괜찮음_ - req : params.id - res : "channelTitle님, 다음에 또 봐요!"
- url을 복수형으로 써야 좋다고 했으니 나머지 url의 youtuber -> youtubers로 수정(기존의 기능 수정)
- 이제 delete해보자 - 테스트 먼저

  // youtubers-demo.js

  app.delete('/youtubers/:id', function(req, res) {
  res.json({
  message : "delete"
  })
  })

- 이제 삭제 시켜보기

  // youtubers-demo.js

  app.delete('/youtubers/:id', function(req, res) {
  let {id} = req.parmas;
  id = parseInt(id)
  const name = db.get(id).channelTitle;

        db.delete(id);

        res.json({
            message : `${name}님, 다음에 또 봐요!`
        })

  })

# ✏️ 예외처리

: 예외처리를 위해 많은 고민은 필수!

- youtuber 객체 먼저 찾기

  // youtubers-demo.js

  app.delete("/youtubers/:id", function (req, res) {
  let { id } = req.params;
  id = parseInt(id);

        const youtuber = db.get(id);

      if (youtuber == undefined) {
        res.json({
          message: `${id}번은 가입된 유튜버가 아니에요`,
        });
      } else {
        const name = youtuber.channelTitle;
        db.delete(id);

        res.json({
          message: `${name}님, 다음에 또 봐요!`,
        });
      }

  });

- res.json({message: ~~}) : json 안에 날려줄 response는 프론트엔드와 협의 후에 잘 결정 해야 나중에 일을 덜함!
- response 뿐만 아니라, request, body에 어떤 내용을 담아서 프론트에게 보낼지 고민하는 것이 좋음 (API 문서를 얼마나 자세하게 작성해야할지 고민)

# ✏️ 리팩토링

: re + factoring = 코드를 바꾸는 것 (수정, 추가)

- 이해하기 쉽게
- 성능 향상
- 안정성
  ...
- 소프트웨어의 코드 내부(구조)를 변경하는 것
- 왜 해야함? 뭘 위해?
  : 나의 코드에 나쁜 부분이 있는지 확인해서 클린 코드를 얻을 수 있음
- 그럼 언제 리팩토링 해야할까?

  - 에러(문제점)가 n회 발견되었을 때
  - 리팩토링 하면서 에러(문제점)을 발견 할 수 도 있음
  - 기능 추가 전
  - 코드 리뷰

- 리팩토링 하면 안될 때
  : 배포, 운영 직전에는 절대 수정이 일어나면 안됨!!

# ✏️ 전체 삭제

: 전체 유튜버를 삭제해보자

- DELELETE /youtubers
  - req : X
    - res : mseeage -> "모든 유튜버들이 삭제되었어요"
