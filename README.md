<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->

### React, Node.js, MySQL 연동해보기
서버단은 node, 프론트는 reqact, DB는 MySQL을 사용하는 연습하기  
목표는 기본적인 CRUD를 동작할 수 있도록 하는 것  
프론트의 꾸밈에는 크게 신경쓰지 않고 진행할 예정

---

- .env파일에는 파일명을 붙이면 안 된다.

<details>
<summary>발생한 문제1. DetailPost.js에서 정적지도가 안 뜸</summary>
<p>

<h4>현재 상황</h4>
createPost페이지에서 사용자로부터 제목, 내용, 장소를 입력받으면 DB에 제목, 내용과 장소의 X.Y좌표를 저장.  
DetailPost페이지에서 해당 내용을 전부 불러와 data에 저장.  
data에 잘 저장된 것을 확인했으나, staticMapContainer의 생성 전(null값일 때)에 변수를 참조하려 해서 Cannot read properties of undefined (reading 'defaultView')에러 발생.

- useEffect에서 data가 변경되었을 때 실행될 수 있도록 수정

---

<h4>또 다른 문제 사항 : 지도가 온전히 출력되었다가도 새로고침 등을 할 경우 렌더링 멈춤 현상</h4>

- 데이터를 비동기적으로 불러오는 동안 지도 렌더링을 계속 시도하게끔 코드가 짜여져 있었음.  
데이터가 전부 로드된 다음 지도를 생성할 수 있도록 data를 가져오는 useEffect에서 setData다음으로 setIdLoading(false)코드 추가.  
이후, 지도를 가져오는 useEffect에 isLoading의 상태값도 함께 확인하도록 코드를 추가했더니 해결되었다.

---

<h4>정적 지도 컴포넌트 분리 후 문제 발생 및 해결</h4>

컴포넌트를 넣는 위치의 문제였음.

```
<div>
{isLoading ? (
    <p>Loading...</p>
 ) : (
    <>
        {blankNotice ? (
             <h2>{blankNotice}</h2>
        ) : (
            <>
                <h3>{data.title}</h3>
                <p>{data.content}</p>
                <div>
                    <StaticMaps placeX={data.placeX} placeY={data.placeY}/>
                </div>
            </>
        )}
    </>
)}
</div>
```

- StaticMaps를 isLoading 조건부 확인하는 곳의 바깥에 위치시켰기 때문에 렌더링 순서가 꼬였었다.  
위치를 올바른 곳으로 옮겨주었더니 해결되었다.

</p>
</details>