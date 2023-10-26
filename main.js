const IncomeBtn = document.getElementById('Income');
const ExpenseBtn = document.getElementById('Expense');
const popUp = document.querySelector('.modal');
const closeModal = document.querySelector('.close-btn');
const RecordBtn = document.getElementById('Recod-Btn');
const Inptamount = document.getElementById('Amount');
const InptCategory = document.getElementById('Category');
const InptDate = document.getElementById('Dat');
const  InptName = document.getElementById('Name');
const ErrorMsg = document.querySelector('.Error-msg');
const TableBody = document.getElementById('Table-body');
const tot_exp = document.getElementById('total-expense');
const tot_inc = document.getElementById('total-Income');
const tot_saving = document.getElementById('total-Saving');
const updateBtn = document.getElementById('update-Btn');
const invested = document.getElementById('invested');
const Medical = document.getElementById('Medical');
const salary = document.getElementById('salary');
const utility = document.getElementById('utility');
const Transport = document.getElementById('Transport');
const Housing = document.getElementById('Housing');
const Foods = document.getElementById('Foods');
const Entertainment = document.getElementById('Entertainment');
const balance = document.getElementById('Balance');


/*----------------------These js code of Display pop-up modal ------------------------------*/
IncomeBtn.addEventListener('click', function(){
	popUp.style.display = 'block';

});

ExpenseBtn.addEventListener('click', function(){
	popUp.style.display = 'block';

});

/*----------------------These js code of close pop-up modal ------------------------------*/
closeModal.addEventListener('click', function(){
	window.location.reload();
	popUp.style.display = 'none';
});


/*===================================This code for form handler data submition ========================*/

RecordBtn.addEventListener('click', function(e){
	e.preventDefault();
	if (Inptamount.value === '' || InptDate.value === '' || InptName.value === '') {
		ErrorMsg.style.display = 'inline';
		ErrorMsg.textContent = 'Fill all the empty filled';
	}else{
		ErrorMsg.style.display = 'none';
			let val = 0;
			AddData();
			Inptamount.value = '';
			InptName.value = '';
			InptDate.value ='';
			sumation_total();
	}
});


/*=================================This code for display data on screen are stored in local storage ===========================*/
	
let data;
const Storage = () =>{
	if (localStorage.getItem('info') == null ) {
		data = [];
	}
	else{
		data = JSON.parse(localStorage.getItem("info"))
	}
	var row = "";
	data.forEach(function(element, index){
		row += `<tr>
					<td>${element.date}</td>
					<td>${element.name}</td>
					<td>$${element.amount}</td>
					<td>${element.category}</td>
					<td>
						<img src="images/delet.png" class="operation"
						onclick="deleteData(${index})">
						<img src="images/edit.png" class="operation" onclick="UpdateData(${index})">
					</td>
				</tr>`;
	});
	TableBody.innerHTML = row;

}

/*=================================This code for sending data in local storage Get from user inputdata ===========================*/

const AddData = () =>{

	let AmtVal = Inptamount.value;
	let datval = InptDate.value;
	let Namval = InptName.value;
	let categval = InptCategory.value;
	let info = JSON.parse(localStorage.getItem('info'));
	data.push({
		name: Namval,
		amount: AmtVal,
		category: categval,
		date: datval
	});

	localStorage.setItem('info', JSON.stringify(data));
	Storage();
}

/*=================================This code for delete data on screen based on it index position located in local storage ===========================*/
	
function deleteData(index){
	data.splice(index, 1);
	localStorage.setItem('info', JSON.stringify(data));
	Storage();
	sumation_total();
}

/*=================================This code for Update data on screen are stored in local storage based on its index ===========================*/
	
function UpdateData(index){
	popUp.style.display = 'block';
	data = JSON.parse(localStorage.getItem('info'));
	Inptamount.value = data[index].amount;
	InptName.value = data[index].name;
	InptDate.value = data[index].date;
	InptCategory.value = data[index].category;
	updateBtn.style.display = 'block';
	RecordBtn.style.display = 'none';
	updateBtn.addEventListener('click',function(){
		if (Inptamount.value === '' || InptDate.value === '' || InptName.value === '') {
		ErrorMsg.style.display = 'inline';
		ErrorMsg.textContent = 'Fill all the empty filled';
		}else{
			ErrorMsg.style.display = 'none';
				data[index].name = InptName.value;
				data[index].amount = Inptamount.value;
				data[index].date = InptDate.value;
				data[index].category = InptCategory.value;
			localStorage.setItem('info',JSON.stringify(data));
			Storage();
		popUp.style.display = 'none';
		window.location.reload()
	}
	});
}

/*=================================This code for summation of total data on screen are stored in local storage ===========================*/
	
	
const sumation_total = () =>{
	let totalEnter = 0;
	let totalMed = 0;
	let totalInvst = 0;
	let totalSal = 0;
	let totalFood = 0;
	let totalTrans = 0;
	let totalUtil = 0;
	let totalHou = 0;

	data = JSON.parse(localStorage.getItem('info'));
	if (data == null) {
		data = [];
	}else{
		for (var i = 0; i < data.length; i++) {
			if (data[i].category === 'Entertainment') {
				totalEnter += parseInt(data[i].amount);
			}else if(data[i].category === 'Investment'){
				totalInvst += parseInt(data[i].amount);
			}else if(data[i].category === 'Medical'){
				totalMed += parseInt(data[i].amount);
			}else if(data[i].category === 'Salary'){
				totalSal += parseInt(data[i].amount);
			}else if(data[i].category === 'Utilities'){
				totalUtil += parseInt(data[i].amount);
			}else if(data[i].category === 'Transport'){
				totalTrans += parseInt(data[i].amount);
			}else if(data[i].category === 'Housing'){
				totalHou += parseInt(data[i].amount);
			}else{
				totalFood += parseInt(data[i].amount);
			}
		}
		Entertainment.textContent = totalEnter;
		invested.textContent = totalInvst;
		Medical.textContent = totalMed;
		salary.textContent = totalSal;
		utility.textContent = totalUtil;
		Transport.textContent = totalTrans;
		Housing.textContent = totalHou;
		Foods.textContent = totalFood;

		let TotalIncome = totalInvst + totalSal;
		let TotalExpense = totalTrans + totalUtil + totalMed + totalHou + totalFood + totalEnter;
		tot_inc.textContent = TotalIncome;
		tot_exp.textContent = TotalExpense;
		let RemainAmaount = TotalIncome - TotalExpense;

		if (RemainAmaount > 0) {
			tot_saving.textContent = RemainAmaount;	
			balance.textContent = RemainAmaount;
		}else{
			balance.textContent = RemainAmaount;
			balance.classList.add('maximize');
		}

/*=================================This code for display Visual graph ===========================*/
	const ctx = document.getElementById('myChart');
	let TotalSaving = tot_saving.innerHTML;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Income', 'Expense', 'Saving'],
      datasets: [{
        label: 'transaction',
        data: [TotalIncome, TotalExpense, TotalSaving],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
	}

}


/*=================================This code for Save data for future review on side of user ===========================*/

const GenerateReport = ()=>{
	const mainBody = document.getElementById('main');
	html2pdf().from(mainBody).save();
}

/*=================================This code for display data on screen even you refresh page start with data comes with localstorage ===========================*/

document.addEventListener('DOMContentLoaded', Storage());

document.addEventListener('DOMContentLoaded', sumation_total());