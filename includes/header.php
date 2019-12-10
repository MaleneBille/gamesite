<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Games</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/main.css" rel="stylesheet">
</head>
<body>
<header>
<div class="container-fluid">
    <div class="row justify-content-between p-4">
        <!-- LOGO -->
        <div class="col-4-sm logo">
            <a href="index.php"><img height="55" src="images/logo.png" alt="Logo"></a>
        </div>

        <div class="col-8-sm">
        <!-- USERNAME -->
        <div class="log">
            <span class="username">
            <?php 
                if (isset($_SESSION['username'])) {
                    echo $_SESSION['username'];
                }
                else {
                    echo "Log in";
                }
            ?>
            </span>
        <!-- LOGIN/LOGOUT -->
            <?php
                if (isset($_SESSION['username'])) {
                    echo "<a class='on-off' href='logout.php'><img height='40' src='images/off.png' alt='Logout'></a>";
                }
                else {
                    echo "<a class='on-off' href='login.php'><img height='40' src='images/on.png' alt='Logout'></a>";
                }
            ?>
        </div>

        <!-- NAVIGATION -->
            <ul class="nav">
                <li class="nav-item">
                <a class="nav-link" href="games.php">
                    Games
                </a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="highscore.php">
                    Highscore
                </a>
                </li> 
                <li class="nav-item">
                <a class="nav-link" href="register.php">
                    Register
                </a>
                </li> 
            </ul>

        </div>
    </div>      
</div>
</header>
<main class="main">