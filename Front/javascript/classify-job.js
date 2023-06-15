// 체크된 요소들을 그룹별로 저장하기 위한 객체
let checkedValuesByGroup = {
    colleage: "",
    category: "",
    stack: []
};
let cnt=-1;
const data={
    "colleage": "*",
    "stack": "*",
    "category":"*"
}
requestData(data);

// 체크박스 요소들을 선택
let checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        
        let groupName = this.closest('.search-name').childNodes[0].textContent.trim();
        if(groupName=='학부') groupName='colleage';
        if(groupName=='카테고리') groupName='category';
        if(groupName=='주언어') groupName='stack';
        // 체크 상태인 경우

        if(groupName=='stack'){
            if (this.checked) {
                // value를 해당 그룹의 배열에 추가
                checkedValuesByGroup[groupName].push(this.value);
            } else {
                // 체크가 해제된 경우 배열에서 해당 value 제거
                let index = checkedValuesByGroup[groupName].indexOf(this.value);
                if (index !== -1) {
                    checkedValuesByGroup[groupName].splice(index, 1);
                }
            }
            requestData(checkedValuesByGroup);
        }
        else if(groupName=="colleage"||groupName=='category'){
            if (this.checked) {
                // value를 문자열 그 자체로 추가
                checkedValuesByGroup[groupName] += checkedValuesByGroup[groupName].length===0 ? this.value: '|'+ this.value ;
            } else {
                // 체크가 해제된 경우 문자열에서 해당 value 제거
                checkedValuesByGroup[groupName] = checkedValuesByGroup[groupName].replace(this.value , '');
                checkedValuesByGroup[groupName] = checkedValuesByGroup[groupName].replace(/(\|)+/g, '|');
                checkedValuesByGroup[groupName] = checkedValuesByGroup[groupName].replace(/^\||\|$/g, '');            }
            requestData(checkedValuesByGroup);
        }
        
    });
});

function requestData(data) {
    cnt++;
    const apiUrl = 'http://34.168.80.42:3001/classify/job';
    let postData = {
        "colleage": data.colleage.length === 0 ? "*" : data.colleage,
        "stack": data.stack.length === 0 ? "*" : data.stack,
        "category": data.category.length===0? "*" :data.category,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(postData),
    })
        .then(response => response.json())
        .then(result => {
            if (cnt != 0) clearData();

            console.log("result",result);
            let datalist = result.results;
            // console.log("datalist=",datalist);

            let container = document.getElementById(`content-mainpage-job`);

            datalist.forEach((item, index) => {
                
                let contentMain = document.createElement('div');
                contentMain.className = 'content-main';

                let image = document.createElement('div');
                let img = document.createElement('img');
                image.className = 'image-box';
                img.src = item.image;
                img.setAttribute('style', 'width:100%;height:auto;object-fit:contain');
                image.appendChild(img);


                let content_box = document.createElement('div');
                content_box.className = 'content-box';

                let nameElement = document.createElement('p');
                nameElement.textContent = item.job;
                nameElement.setAttribute('style', 'font-size:large; margin-top: 5px;margin-bottom: 1px; font-weight: bold;');
                nameElement.addEventListener('click', function () {
                    let data = {
                        "job": nameElement.textContent,
                        "category": JSON.stringify(item.category)
                    }
                    console.loog
                    let params = new URLSearchParams(data).toString();
                    window.location.href = '../pages/job-detail.html?' + params;
                });
                // let categoryElement = document.createElement('span');
                // categoryElement.textContent = "       분류: "+ item.category;
                // categoryElement.setAttribute('style', 'font-size: small; color:#979797');
                // nameElement.appendChild(categoryElement);

                let nameEngElement = document.createElement('p');
                nameEngElement.textContent = item.category;
                nameEngElement.setAttribute('style', 'margin: 0px 0px; font-size: 5px;');
                let introElement = document.createElement('p');
                introElement.textContent = item.instruction.long_script;
                introElement.setAttribute('style', 'font-size:small;margin-top: 10px;margin-bottom: 1px;');

                let content_tag = document.createElement('div');
                content_tag.className = 'content-tag';
                if (item.stack) {
                    item.stack.forEach((stack, index) => {
                        let tag = document.createElement('div');
                        tag.className = 'tag';
                        tag.textContent = "#" + stack;
                        content_tag.appendChild(tag);
                    });
                }
                

                //tag들 넘겨받아서 배열이든 뭐든 해서 반복문 써서 출력
                let allElements = document.createElement('div');
                allElements.setAttribute('style', 'display:flex; flex:8;flex-direction:column;justify-content:space-between;height:100%');
                content_box.appendChild(nameElement);
                content_box.appendChild(nameEngElement);
                content_box.appendChild(introElement);
                allElements.appendChild(content_box);
                allElements.appendChild(content_tag);
                contentMain.appendChild(image);
                contentMain.appendChild(allElements);
                container.appendChild(contentMain);
            });

            if(!result.results.length){
                container.innerHTML=`<h2>검색된 결과가 없습니다</h2>`;
            }

            function clearData(){
                let container = document.getElementById(`content-mainpage-job`);
                container.innerHTML=``;
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// let container = document.getElementById(`content-mainpage-job`);

// // 체크된 요소들을 그룹별로 저장하기 위한 객체
// let checkedValuesByGroup = {
//     colleage: [],
//     category: [],
//     stack: []
// };

// let cnt = -1;
// const data = {
//     "colleage": "*",
//     "stack": "*",
//     "category": "*"
// }
// requestData(data);

// // 체크박스 요소들을 선택
// let checkboxes = document.querySelectorAll('input[type="checkbox"]');

// checkboxes.forEach(function (checkbox) {
//     checkbox.addEventListener('change', function () {

//         let groupName = this.closest('.search-name').childNodes[0].textContent.trim();
//         if (groupName == '학부') groupName = 'colleage';
//         if (groupName == '카테고리') groupName = 'category';
//         if (groupName == '주언어') groupName = 'stack';
//         // 체크 상태인 경우

//         if (groupName == "colleage" || groupName == 'category') {
//             if (this.checked) {
//                 // value를 해당 그룹의 배열에 추가
//                 checkedValuesByGroup[groupName].push(this.value);
//             } else {
//                 // 체크가 해제된 경우 배열에서 해당 value 제거
//                 let index = checkedValuesByGroup[groupName].indexOf(this.value);
//                 if (index !== -1) {
//                     checkedValuesByGroup[groupName].splice(index, 1);
//                 }
//             }
//             requestData(checkedValuesByGroup);
//         }
//         else if (groupName == 'stack') {
//             if (this.checked) {
//                 // value를 문자열 그 자체로 추가
//                 checkedValuesByGroup[groupName] += this.value + '|';
//             } else {
//                 // 체크가 해제된 경우 문자열에서 해당 value 제거
//                 checkedValuesByGroup[groupName] = checkedValuesByGroup[groupName].replace(this.value + '|', '');
//             }
//             requestData(checkedValuesByGroup);
//         }

//     });
// });

// function requestData(data) {
//     cnt++;
//     const apiUrl = 'http://34.168.80.42:3001/classify/job';
//     console.log("data", data);
//     let postData = {
//         "colleage": data.colleage || "*",
//         "stack": data.stack || "*",
//         "category": data.category || "*",
//     };

//     fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8',
//         },
//         body: JSON.stringify(postData),
//     })
//         .then(response => response.json())
//         .then(result => {
//             if (cnt != 0) clearData();

//             console.log("postData=", postData);
//             console.log("REsult", result);
//             let datalist = result.results;

//             datalist.forEach((item, index) => {

//                 let contentMain = document.createElement('div');
//                 contentMain.className = 'content-main';

//                 let image = document.createElement('div');
//                 let img = document.createElement('img');
//                 image.className = 'image-box';
//                 img.src = item.image;
//                 img.setAttribute('style', 'width:100%;height:auto;object-fit:contain');
//                 image.appendChild(img);


//                 let content_box = document.createElement('div');
//                 content_box.className = 'content-box';

//                 let nameElement = document.createElement('p');
//                 nameElement.textContent = item.job;
//                 nameElement.setAttribute('style', 'font-size:large; margin-top: 5px;margin-bottom: 1px; font-weight: bold;');
//                 nameElement.addEventListener('click', function () {
//                     // let data = {
//                     //     "job": nameElement.textContent,
//                     //     "category": JSON.stringify(item.category)
//                     // }
//                     // loog
//                     // let params = new URLSearchParams(data).toString();
//                     // window.location.href = '../pages/job-detail.html?' + params;
//                 });

//                 let nameEngElement = document.createElement('p');
//                 nameEngElement.textContent = item.category;
//                 nameEngElement.setAttribute('style', 'margin: 0px 0px; font-size: 5px;');
//                 let introElement = document.createElement('p');
//                 introElement.textContent = item.instruction.long_script;
//                 introElement.setAttribute('style', 'font-size:small;margin-top: 10px;margin-bottom: 1px;');

//                 let content_tag = document.createElement('div');
//                 content_tag.className = 'content-tag';
//                 item.stack.forEach((stack, index) => {
//                     let tag = document.createElement('div');
//                     tag.className = 'tag';
//                     tag.textContent = "#" + stack;
//                     content_tag.appendChild(tag);
//                 })

//                 let allElements = document.createElement('div');
//                 allElements.setAttribute('style', 'display:flex; flex:8;flex-direction:column;justify-content:space-between;height:100%');
//                 content_box.appendChild(nameElement);
//                 content_box.appendChild(nameEngElement);
//                 content_box.appendChild(introElement);
//                 allElements.appendChild(content_box);
//                 allElements.appendChild(content_tag);
//                 contentMain.appendChild(image);
//                 contentMain.appendChild(allElements);
//                 container.appendChild(contentMain);
//             });


//             function clearData() {
//                 container.innerHTML = ``;
//             }

//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }
