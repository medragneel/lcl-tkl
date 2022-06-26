const dt=document.querySelector('#dt')
const nm=document.querySelector('#name')
const pr=document.querySelector('#pr')
const hr=document.querySelector('#hr')
const nb=document.querySelector('#nb')
const st= document.querySelector('#st')
const tl=document.querySelector('#tl')
const vrs=document.querySelector('#vrs')
const table = document.getElementById('table');
const res= document.querySelector('#reset')
let arr;


document.querySelector('#sub').addEventListener("click", function(e) {
    if(localStorage.getItem('cln') === null){
        arr=[]
    }else{
        arr= JSON.parse(localStorage.getItem('cln'))
    }
   
    newData={
        date:dt.value,
        name: nm.value,
        prenom: pr.value,
        heure: hr.value,
        num_tel:nb.value,
        status: st.value,
        total: tl.value +".DA", 
        verssement: vrs.value+".DA",
        reste: parseInt(vrs.value) - parseInt(tl.value) +".DA"

    }
    arr.push(newData)
    window.localStorage.setItem('cln',JSON.stringify([...arr]) )

    window.location.reload();
    e.preventDefault()

}, false);



let lsc= JSON.parse(window.localStorage.getItem('cln'))
objIndex = lsc.findIndex((obj => obj.name == 'med'));
console.log(objIndex)
console.log(lsc[objIndex])
lsc[objIndex].name='med'
for(const obj of lsc){
  const row = document.createElement('tr');
  for(const val of Object.values(obj)){
    const col = document.createElement('td');
      col.setAttribute('contentEditable','true')
    col.textContent = val;
    row.appendChild(col);
  }
  table.appendChild(row);
}

res.addEventListener('click',function (){
    window.localStorage.removeItem('cln')
    window.location.reload();
})


let tds = document.querySelectorAll('td');
for (var i=0; i<tds.length; i++) {
    var temp = tds[i];
    if (parseInt(temp.innerText) < 0) temp.className = "negative";
}

function download_table_as_csv(table_id, separator = ',') {
    // Select rows from table_id
    var rows = document.querySelectorAll('table#' + table_id + ' tr');
    // Construct csv
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            // Clean innertext to remove multiple spaces and jumpline (break csv)
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
            data = data.replace(/"/g, '""');
            // Push escaped string
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    var csv_string = csv.join('\n');
    // Download it
    var filename = 'export_' + table_id + '_' + new Date().toLocaleDateString() + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function openNav() {
  document.getElementById("nav").style.width = "200px";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("nav").style.width = "0%";
}



function filterData(inp,tid) {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById(inp);
  filter = input.value.toUpperCase();
  table = document.getElementById(tid);
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}










