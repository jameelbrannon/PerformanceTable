function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function addRow() {
    var tableBody = document.getElementById('calculatorBody');
    var templateRow = document.getElementById('templateRow');
    var newRow = templateRow.cloneNode(true);
    newRow.removeAttribute('id');
    newRow.style.display = ''; // Make the new row visible

// Assign random background color to the new row
newRow.style.backgroundColor = getRandomColor();



    for (var i = 0; i < newRow.cells.length; i++) {
        var cellContent = newRow.cells[i].childNodes[0];
        if (cellContent.tagName === 'INPUT') {
            cellContent.value = '';
        } else if (cellContent.tagName === 'SPAN') {
            cellContent.innerText = '0';
        }
    }

    tableBody.appendChild(newRow);
}



function calculate(inputElement) {
    try {
        var row = inputElement.closest('tr');
        var pos = parseFloat(row.querySelector('.position').value) || 0;
        var price = parseFloat(row.querySelector('.price').value) || 0;
        var cost = parseFloat(row.querySelector('.avgCostPerShare').value) || 0;
        var daysInput = row.querySelector('.dateEntered').value;

        var enteredDate = new Date(daysInput);
        var today = new Date();
        var timeDifference = today.getTime() - enteredDate.getTime();
        var diffDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        var cb = cost * pos;
        var cur = price * pos;
        var profit = cur - cb;
        var gain = (((cur / cb) - 1) * 100).toFixed(2);
        var ab = Math.abs(cur);
        var annualizedReturn = Math.pow((1 + (profit / cb)), 365 / diffDays) - 1;


        // Format numbers with commas
        function formatNumberWithCommas(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }


        row.querySelector('.costBasis').innerText = formatNumberWithCommas(cb.toFixed(2));
        row.querySelector('.currentBasis').innerText = formatNumberWithCommas(cur.toFixed(2));
        row.querySelector('.pandL').innerText = formatNumberWithCommas(profit.toFixed(2));
        row.querySelector('.absoluteBasis').innerText = formatNumberWithCommas(ab.toFixed(2));
        row.querySelector('.daysHeld').innerText = diffDays;
        row.querySelector('.percentGain').innerText = gain + '%';
        row.querySelector('.annualizedReturn').innerText = (annualizedReturn * 100).toFixed(2) + '%';


    } catch (error) {
        console.error('Error in calculate function:', error);
    }
}
