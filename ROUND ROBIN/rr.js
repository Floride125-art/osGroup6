let row = 2;
let table = document.getElementById("scheduling-table");
let tq = 1;

function addRow() {
    let arrTime = document.getElementById("arrival-time-rr").value;
    let burTime = document.getElementById("burst-time-rr").value;
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

        document.getElementById("burst-time-rr").value="";
        document.getElementById("arrival-time-rr").value="";

        // For fixing tq
        tq = Number(document.getElementById("time-quantum-rr").value);
        document.getElementById("time-quantum-rr").readOnly = true;
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

    document.getElementById("avg-comp-time-rr").value = avgCT.toPrecision(3);
    document.getElementById("avg-turn-time-rr").value = avgTAT.toPrecision(3);
    document.getElementById("avg-resp-time-rr").value = avgRT.toPrecision(3);
    document.getElementById("avg-wt-time-rr").value = avgWT.toPrecision(3);
}


// function ghennChart(NoOfProcess, processNo, completionTime){
//     let temp = 0;
//     let ghennTable = Document.getElementById("process-schedule");
//     let row1 = ghennTable.addRow(1);
//     let row2 = ghennTable.addRow(2);
//     let c1 = new Array(NoOfProcess);
//     let c2 = new Array(NoOfProcess);
//     for (let i = 0; i < NoOfProcess; i++) {   // Sort by completion time
//         c1[i] = row1.insertCell(i);
//         c2[i] =  row2.insertCell(i);
//         for (let j = i + 1; j < NoOfProcess; j++) {
//             if (completionTime[i] > completionTime[j]) {
//                 temp = completionTime[i];
//                 processNo[i] = processNo[j];
//                 processNo[j] = temp;

//                 temp= processNo[i];
//                 processNo[i] = processNo[j];
//                 processNo[j] = temp;
//             }
//         }     
//     }
//     for(let i=0;i<NoOfProcess;i++){
//         c1[i].innerHTML = `P${processNo[i]}`;
//         c2[i].innerHTML = completionTime[i];
//     }
// }

let psrow = 1;
let pstable = document.getElementById("process-schedule");
let psDynRow1 = pstable.insertRow(1);
let psDynRow2 = pstable.insertRow(2);
let cellCount = 0;
let prevCompletionTime=0;
let psCell1;
let psCell2;

function createProcessSchedule(index, CT, AT){
    
    try{
        pstable.delRow(1); 
        pstable.delRow(2);
    }
    catch(err){

    }
    //let psCell1 = psDynRow1.insertCell(cellCount);
    //let psCell2 = psDynRow2.insertCell(cellCount);

    let PNO = index + 1;

    if(prevCompletionTime < AT){

        psCell1 = psDynRow1.insertCell(cellCount);
        psCell2 = psDynRow2.insertCell(cellCount);

        psCell1.innerHTML = `IDLE`;
        psCell2.innerHTML = AT;

        cellCount += 1;

        psCell1 = psDynRow1.insertCell(cellCount);
        psCell2 = psDynRow2.insertCell(cellCount);
        
        psCell1.innerHTML = `P${PNO}`;
        psCell2.innerHTML = CT;

        prevCompletionTime = CT;
        cellCount += 1;
        
    }else{

        psCell1 = psDynRow1.insertCell(cellCount);
        psCell2 = psDynRow2.insertCell(cellCount);
        
        psCell1.innerHTML = `P${PNO}`;
        psCell2.innerHTML = CT;

        prevCompletionTime = CT;
        cellCount += 1;
    }

    // let psCell1 = psDynRow1.insertCell(cellCount);
    // let psCell2 = psDynRow2.insertCell(cellCount);

    // psCell1.innerHTML = `P${PNO}`;
    // psCell2.innerHTML = CT;

    //cellCount += 1;
}

function execute(){

    //rr Algorithm

    // pstable.delRow(1); 
    // pstable.delRow(2);
    let NoOfProcess = row - 2;
    let arrivalTime = getArrivalTimeArray();
    let burstTime = getBurstTimeArray();

    let temp, tt = 0, min=0, d=0, ct=0; // ct is current time
    let stat = 0, swt = 0;
    let completionTime = new Array(NoOfProcess);
    let turnAroundTime = new Array(NoOfProcess);
    let waitingTime = new Array(NoOfProcess);
    let responseTime = new Array(NoOfProcess);

    let processNo = new Array (NoOfProcess);
    let startTime = new Array (NoOfProcess);

    for(i = 0; i < NoOfProcess; i++){
        processNo[i] = i+1;
    }

    for (let i = 0; i < NoOfProcess; i++) {   // Sort by arrival time
        for (let j = i + 1; j < NoOfProcess; j++) {
            if (arrivalTime[i] > arrivalTime[j]) {

                temp = arrivalTime[i];
                arrivalTime[i] = arrivalTime[j];
                arrivalTime[j] = temp;

                temp = burstTime[i];
                burstTime[i] = burstTime[j];
                burstTime[j] = temp;

                temp= processNo[i];
                processNo[i] = processNo[j];
                processNo[j] = temp;
            }
        }     
    }

    let avg_turnaround_time = 0;
    let avg_waiting_time = 0;
    let avg_response_time = 0;
    let cpu_utilisation = 0;
    let total_turnaround_time = 0;
    let total_waiting_time = 0;
    let total_response_time = 0;
    let total_idle_time = 0;
    let throughput = 0;
    let burst_remaining = new Array(NoOfProcess);
    let idx=0;

    let q = [];
    let current_time = 0;
    q.push(0);
    let completed = 0;
    let mark = new Array(NoOfProcess);
    for(let i=0;i<NoOfProcess;i++){ 
        completionTime[i] = 0;
        turnAroundTime[i] = 0;
        waitingTime[i] = 0;
        responseTime[i] = 0;
        startTime[i] = 0;
        burst_remaining[i] = burstTime[i];
        mark[i] = 0;
    }
    mark[0] = 1;
    console.log("Completion Time: "+completionTime);
    while(completed != NoOfProcess) {
        idx = Number(q[0]);
        q.shift();
        console.log("q is "+q);

        if(burst_remaining[idx] == burstTime[idx]) {
            // startTime[idx] = Math.max(current_time,arrivalTime[idx]);
            if(current_time>arrivalTime[idx]) startTime[idx] = current_time;
            else startTime[idx] = arrivalTime[idx];
            total_idle_time += startTime[idx] - current_time;
            current_time = startTime[idx];
        }
        

        if(burst_remaining[idx]-tq > 0) {
            burst_remaining[idx] -= tq;
            current_time += tq;
        }
        else {
            current_time += burst_remaining[idx];
            burst_remaining[idx] = 0;
            completed++;
            
            completionTime[idx] = parseInt(current_time);
            
            turnAroundTime[idx] = completionTime[idx] - arrivalTime[idx];
            waitingTime[idx] = turnAroundTime[idx] - burstTime[idx];
            responseTime[idx] = startTime[idx] - arrivalTime[idx];

            createProcessSchedule(processNo[idx] - 1, completionTime[idx], arrivalTime[idx]);

            total_turnaround_time += turnAroundTime[idx];
            total_waiting_time += waitingTime[idx];
            total_response_time += responseTime[idx];
        }
        for(let i = 1; i < NoOfProcess; i++) {
            if(burst_remaining[i] > 0 && arrivalTime[i] <= current_time && mark[i] == 0) {
                q.push(i);
                mark[i] = 1;
            }
        }
        if(burst_remaining[idx] > 0) {
            q.push(idx);
        }
        
        if(q.length == 0) {
            for(let i = 1; i < NoOfProcess; i++) {
                if(burst_remaining[i] > 0) {
                    q.push(i);
                    mark[i] = 1;
                    break;
                }
            }
        }
    }

    display(NoOfProcess, waitingTime, turnAroundTime, completionTime, responseTime, processNo);
    calculateAverages(NoOfProcess, completionTime, turnAroundTime, waitingTime, responseTime);
    
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
