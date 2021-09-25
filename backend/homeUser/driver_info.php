<?php
$driver_id = $postData['driver_id'];
$statement = "SELECT * FROM driver WHERE driver_id = '$driver_id'";
if ($result = $conn->query($statement)) {
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $data['driver_id'] = $row['driver_id'];
        $data['fname'] = $row['fname'];
        $data['lname'] = $row['lname'];
        $data['age'] = $row['age'];
        $data['plate'] = $row['plate'];
        $data['phone'] = $row['phone'];
        $data['id_no'] = $row['id_no'];
        $data['driver_no'] = $row['driver_no'];
        $data['win_id'] = $row['win_id'];
        $data['win_name'] = $row['win_name'];
        $data['status'] = $row['status'];
        $data['username'] = $row['username'];
        $data['image'] = $row['imageData'];
        $data['rating'] = $row['rating'];
        if ($data['rating'] - (int)$data['rating'] >= 0.5) {
            $data['rating'] = (int)$data['rating'] + 1;
        } else {
            $data['rating'] = (int)$data['rating'];
        }
    } else {
        $data['message_code'] = "error";
    }
} else {
    $data['message_code'] = "error";
}
$conn->close();



//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⣤⣶⣶⣶⣶⣶⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣄⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⢠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀
//⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆
//⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣋⣩⣭⣭⣭⣉⡻⣿⣿⣿⣿⣿⣿
//⠀⣠⣴⣭⣹⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⢣⣼⣿⣿⠛⠁⠘⠿⠿⢻⣿⣿⣿⣿⣿
//⠀⠛⠛⠁⣿⣿⡯⣫⣤⣴⣶⣶⣤⣭⣛⡸⣿⣿⣇⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿
//⠀⠀⢀⣴⣷⠬⣉⣀⣈⣹⣿⣿⣿⣿⣿⣷⣮⣝⣛⣯⣤⣤⣤⣤⣭⣛⠿⣿⣿⣿
//⠀⠈⠉⣽⣶⣶⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢛⡛⠛⠿⣿⣿⣷⡌⢻⣿
//⣀⢰⣿⣦⡝⠛⢷⣮⡛⠻⣿⣿⣿⠿⢛⣫⣵⣶⣿⣿⣿⣿⣿⣿⣿⠿⠛⣣⣾⣿
//⣿⢸⣿⡿⠀⣿⣶⣝⢿⣿⣶⣶⣶⣿⣿⣿⣿⣿⣿⣿⡿⠟⣩⣵⣶⠇⣿⣿⣿⢹
//⣿⢸⣿⠀⡇⢹⣿⣿⡶⠎⣙⠿⠿⠿⠿⠿⢟⣛⣩⣴⣾⣿⣿⣿⡟⣸⣿⣿⠇⣸
//⣿⡇⠛⢠⣿⡀⣿⣿⠀⠀⠀⠈⠛⠻⠿⠿⣿⣿⠿⠿⠛⠛⠛⠁⠀⣿⡿⠃⠀⣿
//⣿⣿⣧⣿⣿⣷⡘⢿⡇⢸⣦⣤⣀⣀⡀⠀⠀⠀⠀⠀⣀⣀⣤⡄⠼⢋⣴⡇⠸⢋
//⣿⣿⣿⣿⣿⣿⣷⣮⡃⣸⣿⣿⣿⣿⣿⣿⣿⣶⣾⣿⣿⣿⣿⣷⣶⣿⡿⢀⣠⣾
