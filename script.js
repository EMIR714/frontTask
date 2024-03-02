let usersData = [];
async function loadUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        usersData = await response.json();
        displayUsers(usersData);
    } catch (error) {
        alert('Ошибка при получении данных: ' + error);
    }
}
function displayUsers(data) {
    const table = document.getElementById('users');
    table.innerHTML = '<tr><th onclick="sortTable(0)">Имя</th><th onclick="sortTable(1)">Email</th><th onclick="sortTable(2)">Телефон</th></tr>';
    data.forEach(user => {
        const row = table.insertRow(-1);
        row.insertCell(0).innerHTML = user.name;
        row.insertCell(1).innerHTML = user.email;
        row.insertCell(2).innerHTML = user.phone;
    });
}
function sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("users");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function filterUsers() {
    let input, filter, table, tr, tdName, tdEmail, i, txtValueName, txtValueEmail;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("users");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        tdName = tr[i].getElementsByTagName("td")[0];
        tdEmail = tr[i].getElementsByTagName("td")[1];
        if (tdName) {
            txtValueName = tdName.textContent || tdName.innerText;
            txtValueEmail = tdEmail.textContent || tdEmail.innerText;
            if (txtValueName.toUpperCase().indexOf(filter) > -1 || txtValueEmail.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                tdName.innerHTML = txtValueName.replace(new RegExp(input.value, "gi"), match => `<mark>${match}</mark>`);
                tdEmail.innerHTML = txtValueEmail.replace(new RegExp(input.value, "gi"), match => `<mark>${match}</mark>`);
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
window.onload = loadUsers;
