const apiUrls='http://34.168.80.42:3001/classify/job/intro';
// let datas = {
//     "job": "풀스택 개발자",
//     "category": "웹 개발"
// };
let params2 = new URLSearchParams(window.location.search);

let datas = {
    "job": params2.get('job')||"*",
    "category": JSON.parse(params2.get('category')||"*")
};
console.log(datas);

fetch(apiUrls, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(datas),
})
    .then(response => response.json())
    .then(result => {
        const  jobInfo=result.job_info;
        const  stack=result.stack;
        const  subject=result.subject;

        const  header=document.getElementById(`header`);
        const  headerInfo=document.getElementById('header-info');
        const  jobName=document.getElementById('job-name');
        const  jobNameIntro=document.createElement('h1');
        const  jobDetailLink = document.querySelector('span');
            
        jobNameIntro.textContent = jobInfo.job;
        jobDetailLink.textContent=jobNameIntro.textContent;
        jobNameIntro.style.margin = '0';
        let jobCategoryIntro=document.createElement('h3');
        jobCategoryIntro.textContent = jobInfo.category;
        jobCategoryIntro.style.marginTop = '5px';
        jobName.appendChild(jobNameIntro);
        jobName.appendChild(jobCategoryIntro);
        headerInfo.appendChild(jobName);
        let jobImage = document.createElement('img');
        jobImage.setAttribute('style', 'width:500px;height:auto;object-fit: contain; margin-right:20px');
        jobImage.className = 'job-image';
        jobImage.src=jobInfo.image;

        let contentTag=document.createElement('div');
        contentTag.className='content-tag';
        stack.forEach((stacks,index)=>{
            let tag=document.createElement('div');
            tag.className='tag';
            tag.textContent="#"+stacks;
            contentTag.appendChild(tag);
        })
        headerInfo.appendChild(contentTag);
        header.appendChild(jobImage);
        header.appendChild(headerInfo);
        

        const main=document.getElementById(`mainJobDetail`);
        const jobTop=document.getElementById(`job-top`);
        const jobInfoContainer=document.getElementById(`job-info-container`);
        const jobIntroScript=document.getElementById(`job-intro-script`);
        jobIntroScript.textContent=jobInfo.instruction.long_script;
        jobIntroScript.setAttribute('style','line-height:1.8;padding-left:15px;padding-right:15px');
        
        const courseList=document.getElementById(`bottom-course-list`);
        subject.forEach((item,index)=>{
            let allElements=document.createElement('div');
            let jobCourseElement = document.createElement('div');
            let upElements=document.createElement('div');
            let semester=document.createElement('h6');
            semester.setAttribute('style','color:#979797;margin: 0;');
            let c_name=document.createElement('h2');
            c_name.setAttribute('style','margin:0;');
            let descriptionElement=document.createElement('div');
            descriptionElement.className='description';
            let courseTagContainer=document.createElement('div');
            courseTagContainer.className='content-tag';

            c_name.textContent=item.element.c_name;
            semesterSplit=item.element.semeter.split('-');
            semester.textContent=semesterSplit[0]+"학년 "+semesterSplit[1]+"학기  ";
            descriptionElement.textContent=item.element.instruction.short_script;

            item.element.stack.forEach((courseStack,index)=>{
                let ttag=document.createElement('div');
                ttag.className='tag';
                ttag.textContent="#"+courseStack;
                courseTagContainer.appendChild(ttag);
            })
            upElements.appendChild(semester);
            upElements.appendChild(c_name);
            upElements.appendChild(descriptionElement);
            jobCourseElement.appendChild(courseTagContainer);
            allElements.appendChild(upElements);
            allElements.appendChild(jobCourseElement);
            courseList.appendChild(allElements);
        })
    })
    .catch(error => {
    console.error('Error:', error);
    });
