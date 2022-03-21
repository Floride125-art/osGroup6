let row = 2;
let table = document.getElementById("scheduling-table");

function addRow(){
    let arrTime = document.getElementById("arrival-time-fcfs").value;
    let burTime = document.getElementById("burst-time-fcfs").value;
    if(arrTime == "" || burTime == ""){
        alert("Please enter all the fields");
    }
    else if(Number(arrTime) < 0 || Number(burTime) < 0){
        alert("Please only enter positive integers");
        return;
    }
    else if(Math.floor(Number(arrTime))!= Number(arrTime) || Math.floor(Number(burTime))!= Number(burTime)){
        alert("Please only enter positive integers");
        return;
    }
    else{
        
        let dynRow = table.insertRow(row);
        
        let C1 = dynRow.insertCell(0);
        let C2 = dynRow.insertCell(1);
        let C3 = dynRow.insertCell(2);
        let C4 = dynRow.insertCell(3);
        let C5 = dynRow.insertCell(4);
        let C6 = dynRow.insertCell(5);
        let C7 = dynRow.insertCell(6);

        C1.innerHTML = `P${row-1}`;
    	C2.innerHTML = arrTime;
    	C3.innerHTML = burTime;
        C4.innerHTML = "";
        C5.innerHTML = "";
        C6.innerHTML = "";
        C7.innerHTML = ""; 
         
        row += 1;

        document.getElementById("burst-time-fcfs").value="";
        document.getElementById("arrival-time-fcfs").value="";
    }
}

function delRow(){
	if(row==2){
    	alert("Cannot delete anymore rows");
    }
    else{
		table.deleteRow(row-1);
    	row -= 1;
    }
}

function getArrivalTimeArray(){

    let AT = []

    for(let i = 2; i < row; i++){

        AT.push(Number(table.rows[i].cells[1].innerHTML));
    }

    return AT;
}

function getBurstTimeArray(){

    let BT = []

    for(let i = 2; i < row; i++){

        BT.push(Number(table.rows[i].cells[2].innerHTML));
    }

    return BT;
}

function findCompletionTime(n, AT, BT){

    let CT = new Array (n);  
    
    CT[0] = AT[0] + BT[0];

    for(i = 1; i < n; i++){

        if(AT[i] <= CT[i-1]){

            CT[i] = CT[i-1] + BT[i];
        }
        else if (AT[i] > CT[i-1]){

            CT[i] = AT[i] + BT[i];
        }
    }

    return CT;
}

function findTurnAroundTime(n, AT, CT){

    let TAT = new Array (n);

    for (let i = 0; i < n ; i++){

        TAT[i] = CT[i] - AT[i];
    }

    return TAT;
}

function findWaitingTime(n, BT, TAT){

    let WT = new Array (n);
    for (i = 0; i < n ; i++)
    {
        WT[i] = TAT[i] - BT[i];
    }

    return WT;
}

function findResponseTime(n, WT){

    let RT = new Array (n);

    RT = WT; 

    return RT;
}

function display(n, WT, TAT, CT, RT, proNo){

    for(let i = 0; i < n; i++){

        let rowNo = proNo[i] + 1;

        table.rows[rowNo].cells[3].innerHTML = CT[i];
        table.rows[rowNo].cells[4].innerHTML = TAT[i];
        table.rows[rowNo].cells[5].innerHTML = RT[i];
        table.rows[rowNo].cells[6].innerHTML = WT[i];

    }
}

function calculateAverages(n, CT, TAT, RT, WT){

    let avgCT = 0, avgTAT = 0, avgRT = 0, avgWT = 0;

    for(i = 0; i < n; i++){

        avgCT += Number(CT[i]);
        avgTAT += Number(TAT[i]);
        avgRT += Number(RT[i]);
        avgWT += Number(WT[i]); 
    }

    avgCT = avgCT/n;
    avgTAT = avgTAT/n;
    avgRT = avgRT/n;
    avgWT = avgWT/n;


    console.log(avgCT);

    document.getElementById("avg-comp-time-fcfs").value = avgCT.toPrecision(3);
    document.getElementById("avg-turn-time-fcfs").value = avgTAT.toPrecision(3);
    document.getElementById("avg-resp-time-fcfs").value = avgRT.toPrecision(3);
    document.getElementById("avg-wt-time-fcfs").value = avgWT.toPrecision(3);
}

function processSchduler(){
    
}

function execute(){

    //FCFS Scheduling Algorithm

    let NoOfProcess = row - 2;

    let arrivalTime = getArrivalTimeArray();
    let burstTime = getBurstTimeArray()

    let processNo = new Array (NoOfProcess);

    for(i = 0; i < NoOfProcess; i++){

        processNo[i] = i+1;
    }

    let atTemp = [];
    for(i = 0; i < NoOfProcess; i++){
        
        atTemp.push(arrivalTime[i]);
    }
    
    let btTemp = [] ;
    let proTemp = [];
    atTemp.sort(function(a, b) {
        return a - b;
    });


    for(i = 0; i < NoOfProcess; i++){
        
        let temp = atTemp[i];
        
        for(j = 0; j < NoOfProcess; j++){
            
            if(arrivalTime[j] == temp){
                
                btTemp.push(burstTime[j]);
                proTemp.push(processNo[j]);
                arrivalTime[j] = -1;
            }
        }
    }
    console.log(atTemp);
    console.log(btTemp);
    console.log(proTemp);
    let completionTime = findCompletionTime(NoOfProcess, atTemp, btTemp);
    let turnAroundTime = findTurnAroundTime(NoOfProcess, atTemp, completionTime);
    let waitingTime = findWaitingTime(NoOfProcess, btTemp, turnAroundTime);
    let responseTime = findResponseTime(NoOfProcess, waitingTime);




    let psrow = 1;
    let pstable = document.getElementById("process-schedule");
    let psDynRow1 = pstable.insertRow(1);
    let psDynRow2 = pstable.insertRow(2);
    let cellCount = 0;
    let prevProcess;
    let prevCompletionTime=0;
    let psCell1;
    let psCell2;
    let no=0;
    while(no<NoOfProcess){
        if(prevCompletionTime<atTemp[no]){
            psCell1 = psDynRow1.insertCell(cellCount);
            psCell2 = psDynRow2.insertCell(cellCount);

            psCell1.innerHTML = `IDLE`;
            psCell2.innerHTML = atTemp[no]-prevCompletionTime;

            cellCount += 1;
            prevCompletionTime+=atTemp[no]-prevCompletionTime;
        }else{
            psCell1 = psDynRow1.insertCell(cellCount);
            psCell2 = psDynRow2.insertCell(cellCount);
            
            psCell1.innerHTML = `P${proTemp[no]}`;
            psCell2.innerHTML = prevCompletionTime+btTemp[no];
    
            prevCompletionTime += btTemp[no];
            cellCount += 1;
            no++;
        }
    }

    for(let i=1;i<cellCount;i++){
       if(pstable.rows[1].cells[i].innerHTML == `IDLE`){
           console.log("I am here");
           console.log(Number(pstable.rows[2].cells[i].innerHTML)+Number(pstable.rows[2].cells[i-1].innerHTML));
           pstable.rows[2].cells[i].innerHTML=Number(pstable.rows[2].cells[i].innerHTML)+Number(pstable.rows[2].cells[i-1].innerHTML);
       }
    }
    


   

    display(NoOfProcess, waitingTime, turnAroundTime, completionTime, responseTime, proTemp);

    calculateAverages(NoOfProcess, completionTime, turnAroundTime, responseTime, waitingTime);

    
    // Completion time
    let mg1 = document.getElementById("graph-container1");
    mg1.innerHTML=`
            <center>
            <canvas id="ProcessChart-ct" width="800" height="650"></canvas>
            </center>
    `;
    var ctx=document.getElementById('ProcessChart-ct');{
        var myChart=new Chart(ctx,{
            type:'bar',
            axisY: {includeZero:true},
            data:{
                labels: processNo,
                
                // backgroundColor: 'rgba(255,0,0)',
                datasets:[
                    {
                    label:'Completion Time',
                    data:completionTime,
                    pointBackgroundColor:'red',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    pointRadius:4,
                    fill:true,
                    }
            ]
            },
            options: {
                responsive:false,
                title:{
                    display:true,
                    text:'Time Graph',
                    fontColor:"white"
                },
                legend: {
                    labels: {
                        fontColor: 'white',
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: "white"
                        },
                        scaleLabel: {
                            display: true,
                            // labelString: 'No. of Faults',
                            fontColor: "white",
                            stepSize: 1
                        },
                    }]
                }
            }
        });
    }

    // Waiting time
    let mg2 = document.getElementById("graph-container2");
    mg2.innerHTML=`
            <center>
            <canvas id="ProcessChart-wt" width="800" height="650"></canvas>
            </center>
    `;
    var wtx=document.getElementById('ProcessChart-wt');{
        var myChart=new Chart(wtx,{
            type:'bar',
            axisY: {includeZero:true},
            data:{
                labels: processNo,
                // backgroundColor: 'rgba(255,0,0)',
                datasets:[
                    {
                    label:'Waiting Time',
                    data:waitingTime,
                    pointBackgroundColor:'red',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    pointRadius:4,
                    fill:true,
                    }
            ]
            },
            options: {
                responsive:false,
                title:{
                    display:true,
                    text:'Time Graph',
                    fontColor:"white"
                },
                legend: {
                    labels: {
                        fontColor: 'white',
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: "white"
                        },
                        scaleLabel: {
                            display: true,
                            // labelString: 'No. of Faults',
                            fontColor: "white",
                            stepSize: 1
                        },
                    }]
                }
            }
        });
    }

    // Turn around time
    let mg3 = document.getElementById("graph-container3");
    mg3.innerHTML=`
            <center>
            <canvas id="ProcessChart-tat" width="800" height="650"></canvas>
            </center>
    `;
    var tatx=document.getElementById('ProcessChart-tat');{
        var myChart=new Chart(tatx,{
            type:'bar',
            axisY: {includeZero:true},
            data:{
                labels: processNo,
                // backgroundColor: 'rgba(255,0,0)',
                datasets:[
                    {
                    label:'Turn around Time',
                    data:turnAroundTime,
                    pointBackgroundColor:'red',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    pointRadius:4,
                    fill:true,
                    }
            ]
            },
            options: {
                responsive:false,
                title:{
                    display:true,
                    text:'Time Graph',
                    fontColor:"white"
                },
                legend: {
                    labels: {
                        fontColor: 'white',
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: "white"
                        },
                        scaleLabel: {
                            display: true,
                            // labelString: 'No. of Faults',
                            fontColor: "white",
                            stepSize: 1
                        },
                    }]
                }
            }
        });
    }

    // Response time
    let mg4 = document.getElementById("graph-container4");
    mg4.innerHTML=`
            <center>
            <canvas id="ProcessChart-rt" width="800" height="650"></canvas>
            </center>
    `;
    var rtx=document.getElementById('ProcessChart-rt');{
        var myChart=new Chart(rtx,{
            type:'bar',
            axisY: {includeZero:true},
            data:{
                labels: processNo,
                // backgroundColor: 'rgba(255,0,0)',
                datasets:[
                    {
                    label:'Response Time',
                    data:responseTime,
                    pointBackgroundColor:'red',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    pointRadius:4,
                    fill:true,
                    }
            ]
            },
            options: {
                responsive:false,
                title:{
                    display:true,
                    text:'Time Graph',
                    fontColor:"white"
                },
                legend: {
                    labels: {
                        fontColor: 'white',
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: "white"
                        },
                        scaleLabel: {
                            display: true,
                            // labelString: 'No. of Faults',
                            fontColor: "white",
                            stepSize: 1
                        },
                    }]
                }
            }
        });
    }
}



