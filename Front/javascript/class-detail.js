const apiUrl='http://34.168.80.42:3001/classify/subject/intro';

let params = new URLSearchParams(window.location.search);
let cnt=0;
const data = {
    "colleage":params.get('colleage')||"*",
    "stack": JSON.parse(params.get('stack'))||"*",
    "category":params.get('category')||"*",
    "semester": params.get('semester')||"*",
    "department":"*",
    "c_name": params.get('c_name')||"*"
};
// const data = {
//     "colleage":params-job.get('colleage')||"*",
//     "stack": JSON.parse(params-job.get('stack'))||"*",
//     "category":params-job.get('category')||"*",
//     "semester": params-job.get('semester')||"*",
//     "department":"*",
//     "c_name": params-job.get('c_name')||"*"
// };
console.log(data);
requestData(data);

function requestData(data,eventTarget){
    fetch(apiUrl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            console.log("result",result);
            const  classInfo=result.element;
            const  header=document.getElementById(`header`);
            const  headerInfo=document.getElementById('header-info');
            const  className=document.getElementById('job-name');
            const  classNameIntro=document.createElement('h1');
            const classDetailLink = document.querySelector('span');
            
            classNameIntro.textContent = classInfo.c_name;
            classDetailLink.textContent = classNameIntro.textContent;
            classNameIntro.style.margin = '0';
            let classCategoryIntro=document.createElement('h3');
            let semester=document.createElement('h3');
            let semesterSplit=classInfo.semeter.split('-');
            semester.textContent=semesterSplit[0]+"학년 "+semesterSplit[1]+"학기  ";
            classCategoryIntro.textContent = classInfo.collage+"  "+semester.textContent;
            classCategoryIntro.style.marginTop = '5px';
            className.appendChild(classNameIntro);
            className.appendChild(classCategoryIntro);
            headerInfo.appendChild(className);
            let jobImage = document.createElement('img');
            // jobImage.setAttribute('style','display:block;height:auto;margin-right:15px');
            jobImage.setAttribute('style', 'width:500px;height:auto;object-fit: contain; margin-right:20px');

            jobImage.className = 'job-image';
            jobImage.src=classInfo.image;
            
            // jobImage.innerHTML = `<img src="${}" style="height:200px; width:auto;margin: 0 auto;">`;
    
            let contentTag=document.createElement('div');
            contentTag.className='content-tag';
            classInfo.category.forEach((cateories,index)=>{
                let tag=document.createElement('div');
                tag.className='tag';
                tag.textContent="#"+cateories;
                if(cnt==0){ 
                    if(index==0){
                        tag.style.borderColor='red';
                    }
                }

                if(cateories==eventTarget){
                    tag.style.borderColor='red';
                }
                contentTag.appendChild(tag);
            })
            
            let selectedTag=null;
            contentTag.addEventListener('click', function(event) {
                if (event.target.tagName === 'DIV') {
                    clearData();
                    cnt++;
                    const clickedCategory = (event.target.textContent).slice(1);
                    console.log('Clicked:', clickedCategory);
                    data.category=clickedCategory;
                    requestData(data,clickedCategory);
                }
            });
            headerInfo.appendChild(contentTag);
            header.appendChild(jobImage);
            header.appendChild(headerInfo);
            
            const classIntroScript=document.getElementById(`job-intro-script`);
            classIntroScript.textContent=classInfo.instruction.long_script;
            classIntroScript.setAttribute('style','line-height:1.8;padding-left:15px;padding-right:15px');
    
            let datalist=result.element.department;
            const classRoadmapList=document.getElementById(`class-roadmap-list`);
            datalist.forEach((item,index) => {
                let jobRoadmap=document.createElement('div');
                jobRoadmap.textContent=item;
                jobRoadmap.setAttribute('style', 'margin-top: 5px; margin-left: auto; margin-right: auto; align-items: center;justify-content:center;');
                classRoadmapList.appendChild(jobRoadmap);
            });
    
    
            const jobList=document.getElementById(`bottom-course-list`);
            result.job.forEach((item,index)=>{
                let allElements=document.createElement('div');
                let upElements=document.createElement('div');
                let jobCourseElement = document.createElement('div');
                jobCourseElement.setAttribute('style','justify-content:space-between');

                let job_name=document.createElement('h2');
                job_name.setAttribute('style','margin:0;');
                let bottom_semester=document.createElement('h4');
                bottom_semester.setAttribute('style','color:#979797;margin: 0;');
                let descriptionElement=document.createElement('div');
                descriptionElement.className='description';
                let courseTagContainer=document.createElement('div');
                courseTagContainer.className='content-tag';

                job_name.textContent=item.job;
                bottom_semester.textContent=item.category;
                descriptionElement.textContent=item.instruction.short_script;

                item.stack.forEach((job_stack,index)=>{
                    let ttag=document.createElement('div');
                    ttag.className='tag';
                    ttag.textContent="#"+job_stack;
                    courseTagContainer.appendChild(ttag);
                })

                upElements.appendChild(job_name);
                upElements.appendChild(bottom_semester);
                upElements.appendChild(descriptionElement);
                jobCourseElement.appendChild(courseTagContainer);
                allElements.appendChild(upElements);
                allElements.appendChild(jobCourseElement);
                jobList.appendChild(allElements);
            
            })
            function clearData(){
                
                jobList.innerHTML = ``;
                classRoadmapList.innerHTML = ``;
                classIntroScript.innerHTML='';
                header.innerHTML = `
                    <div id="header-info">
                        <div id="job-name">
                            <!-- <h1 style="margin: 0;">안드로이드 개발자</h1>
                            <h3 style="margin-top:5px;">Android Developer</h3> -->
                        </div>
                        
                        <div class="content-tag">
                        </div>
                        <hr/>
                    </div>
                `;
            }
        })
        .catch(error => {
        console.error('Error:', error);
        });
    
}

