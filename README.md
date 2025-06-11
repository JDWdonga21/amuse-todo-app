# 아뮤즈 기술 과제
## 과제내용
- 주제 : TODO 리스트 만들기
- 필수기능 : TODO CRUD, 검색기능, 우선순위 기능, Recoil을사용한 전역 상태관리
- 기타기능 : 로그인, 커뮤니티 기능, 애니메이션, 파일 업/다운로드 기능....

## 기술제한
- 프론트엔드 : React
- 백엔드 구성 유무 제한없음
- DB 구성 유무 제한없음

## 디자인
- UIUX 제한 없음

## 🔧 설치 및 실행 방법

```bash
# 1. 레포지토리 클론
git clone https://github.com/JDWdonga21/amuse-todo-app.git
cd amuse-todo-app

# 2. 의존성 설치
npm install

# 3. 앱 실행
npm start

## 주요 기능 설명
1. TODO CRUD
 할 일 추가 / 수정 / 삭제 기능

우선순위(high/medium/low) 설정

완료/미완료 전환

2. 검색 기능
입력한 키워드를 기반으로 항목 실시간 필터링

3. 우선순위 필터
드롭다운으로 우선순위 별 필터링 지원

4. 로컬스토리지 연동
useLocalStorage 커스텀 훅을 통해 TODO 리스트를 브라우저에 저장

